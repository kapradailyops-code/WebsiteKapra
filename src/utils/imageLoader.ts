export interface FrameLoadOptions {
  frameCount: number;
  imagePath: string;
  imagePrefix: string;
  extension?: string;
  batchSize?: number;
  frameStep?: number;
  priorityIndices?: number[];
  onProgress?: (processedCount: number, totalCount: number, loadedCount: number) => void;
}

export interface FrameLoadResult {
  frames: Map<number, HTMLImageElement>;
  loadedCount: number;
  failedCount: number;
  hasRealFrames: boolean;
}

const inflightRequests = new Map<string, Promise<HTMLImageElement | null>>();
const resolvedImages = new Map<string, HTMLImageElement | null>();

function buildLoadPlan(
  frameCount: number,
  frameStep: number,
  priorityIndices: number[] = []
): number[] {
  if (frameCount <= 0) {
    return [];
  }

  const safeStep = Math.max(1, Math.floor(frameStep));
  const seen = new Set<number>();
  const plan: number[] = [];

  const pushIndex = (index: number) => {
    const normalizedIndex = Math.max(0, Math.min(frameCount - 1, Math.round(index)));

    if (seen.has(normalizedIndex)) {
      return;
    }

    seen.add(normalizedIndex);
    plan.push(normalizedIndex);
  };

  pushIndex(0);
  priorityIndices.forEach(pushIndex);

  for (let frameIndex = safeStep; frameIndex < frameCount; frameIndex += safeStep) {
    pushIndex(frameIndex);
  }

  pushIndex(frameCount - 1);

  return plan;
}

export function buildFrameUrl(
  imagePath: string,
  imagePrefix: string,
  index: number,
  extension = "jpg"
): string {
  const normalizedPath = imagePath.endsWith("/") ? imagePath.slice(0, -1) : imagePath;
  return `${normalizedPath}/${imagePrefix}-${String(index).padStart(4, "0")}.${extension}`;
}

async function loadImage(src: string): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (resolvedImages.has(src)) {
    return resolvedImages.get(src) ?? null;
  }

  if (inflightRequests.has(src)) {
    return inflightRequests.get(src) ?? null;
  }

  const request = new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      resolvedImages.set(src, image);
      inflightRequests.delete(src);
      resolve(image);
    };
    image.onerror = () => {
      resolvedImages.set(src, null);
      inflightRequests.delete(src);
      resolve(null);
    };
    image.src = src;
  });

  inflightRequests.set(src, request);
  return request;
}

export async function preloadFrames(options: FrameLoadOptions): Promise<FrameLoadResult> {
  const {
    frameCount,
    imagePath,
    imagePrefix,
    extension = "jpg",
    batchSize = 12,
    frameStep = 1,
    priorityIndices = [],
    onProgress
  } = options;

  if (frameCount <= 0) {
    return {
      frames: new Map(),
      loadedCount: 0,
      failedCount: 0,
      hasRealFrames: false
    };
  }

  const frames = new Map<number, HTMLImageElement>();
  const loadPlan = buildLoadPlan(frameCount, frameStep, priorityIndices);
  const totalCount = loadPlan.length;
  let processedCount = 0;
  let loadedCount = 0;
  let failedCount = 0;

  if (totalCount === 0) {
    onProgress?.(0, 0, 0);
    return {
      frames,
      loadedCount,
      failedCount,
      hasRealFrames: false
    };
  }

  let sourceOffset = 0;
  const firstFrameIndex = loadPlan[0] ?? 0;
  let firstFrame = await loadImage(
    buildFrameUrl(imagePath, imagePrefix, firstFrameIndex, extension)
  );

  if (!firstFrame) {
    sourceOffset = 1;
    firstFrame = await loadImage(
      buildFrameUrl(imagePath, imagePrefix, firstFrameIndex + sourceOffset, extension)
    );
  }

  if (!firstFrame) {
    onProgress?.(0, totalCount, loadedCount);
    return {
      frames,
      loadedCount,
      failedCount: totalCount,
      hasRealFrames: false
    };
  }

  processedCount += 1;
  frames.set(firstFrameIndex, firstFrame);
  loadedCount += 1;
  onProgress?.(processedCount, totalCount, loadedCount);

  for (let startIndex = 1; startIndex < totalCount; startIndex += batchSize) {
    const frameIndexes: number[] = [];

    for (
      let frameIndex = startIndex;
      frameIndex < Math.min(startIndex + batchSize, totalCount);
      frameIndex += 1
    ) {
      frameIndexes.push(loadPlan[frameIndex]);
    }

    const batchResults = await Promise.all(
      frameIndexes.map(async (frameIndex) => {
        const image = await loadImage(
          buildFrameUrl(imagePath, imagePrefix, frameIndex + sourceOffset, extension)
        );
        return { frameIndex, image };
      })
    );

    batchResults.forEach(({ frameIndex, image }) => {
      processedCount += 1;

      if (image) {
        frames.set(frameIndex, image);
        loadedCount += 1;
      } else {
        failedCount += 1;
      }

      onProgress?.(processedCount, totalCount, loadedCount);
    });
  }

  return {
    frames,
    loadedCount,
    failedCount,
    hasRealFrames: loadedCount > 0
  };
}

export function getClosestFrame(
  frames: Map<number, HTMLImageElement>,
  targetIndex: number,
  frameCount: number
): HTMLImageElement | undefined {
  const exactMatch = frames.get(targetIndex);

  if (exactMatch) {
    return exactMatch;
  }

  for (let offset = 1; offset < frameCount; offset += 1) {
    const previousFrame = frames.get(targetIndex - offset);

    if (previousFrame) {
      return previousFrame;
    }

    const nextFrame = frames.get(targetIndex + offset);

    if (nextFrame) {
      return nextFrame;
    }
  }

  return undefined;
}
