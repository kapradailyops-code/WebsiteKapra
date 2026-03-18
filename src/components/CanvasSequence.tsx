import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CANVAS_SEQUENCE } from "../config/animation";
import { useIsCoarsePointer } from "../hooks/useIsCoarsePointer";
import { useIsomorphicLayoutEffect } from "../hooks/useAnimation";
import { getClosestFrame, preloadFrames } from "../utils/imageLoader";
import { GlowBox } from "./GlowBox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RenderMode = "loading" | "frames" | "procedural";

interface CanvasSequenceProps {
  frameCount?: number;
  imagePath: string;
  imagePrefix: string;
}

function getPriorityFrameIndices(frameCount: number): number[] {
  if (frameCount <= 1) {
    return [];
  }

  const lastFrameIndex = frameCount - 1;
  const coverageRatios = [1, 0.5, 0.25, 0.75, 0.125, 0.375, 0.625, 0.875];

  return coverageRatios.map((ratio) => Math.round(lastFrameIndex * ratio));
}

export function CanvasSequence({
  frameCount = CANVAS_SEQUENCE.frameCount,
  imagePath,
  imagePrefix
}: CanvasSequenceProps) {
  const isCoarsePointer = useIsCoarsePointer();
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const activeFrameRef = useRef(0);
  const scrubPercentRef = useRef(0);
  const loadPercentRef = useRef(0);
  const loadedCountRef = useRef(0);
  const [renderMode, setRenderMode] = useState<RenderMode>("loading");
  const [loadPercent, setLoadPercent] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [scrubPercent, setScrubPercent] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || typeof window === "undefined") {
      return;
    }

    let disposed = false;
    let resizeFrame = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    const scrubUpdateStep = isCoarsePointer ? 2 : 1;
    const mobileFrameStep = isCoarsePointer ? CANVAS_SEQUENCE.mobileFrameStep : 1;
    const batchSize = isCoarsePointer
      ? CANVAS_SEQUENCE.mobileBatchSize
      : CANVAS_SEQUENCE.batchSize;
    const priorityIndices = isCoarsePointer ? getPriorityFrameIndices(frameCount) : [];

    framesRef.current = new Map();
    activeFrameRef.current = 0;
    scrubPercentRef.current = 0;
    loadPercentRef.current = 0;
    loadedCountRef.current = 0;
    setRenderMode("loading");
    setLoadPercent(0);
    setLoadedCount(0);
    setScrubPercent(0);

    const drawCurrentFrame = (frameIndex: number) => {
      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);

      context.clearRect(0, 0, width, height);

      const frame = getClosestFrame(framesRef.current, frameIndex, frameCount);

      if (frame) {
        drawImageCover(context, frame, width, height);
      } else {
        drawProceduralFrame(context, width, height, frameIndex, frameCount);
      }

      drawVignette(context, width, height);
    };

    const resizeCanvas = () => {
      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        isCoarsePointer ? CANVAS_SEQUENCE.mobileMaxPixelRatio : 1.8
      );
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      drawCurrentFrame(activeFrameRef.current);
    };

    resizeCanvas();

    const tweenState = { frame: 0 };
    const scrubTween = gsap.to(tweenState, {
      frame: Math.max(frameCount - 1, 0),
      ease: "none",
      onUpdate: () => {
        const nextFrame = Math.round(tweenState.frame);

        if (nextFrame !== activeFrameRef.current) {
          activeFrameRef.current = nextFrame;
          drawCurrentFrame(nextFrame);
        }

        const nextPercent =
          frameCount > 1 ? Math.round((nextFrame / (frameCount - 1)) * 100) : 0;

        if (nextPercent !== scrubPercentRef.current) {
          const shouldCommitScrubPercent =
            nextPercent === 0 ||
            nextPercent === 100 ||
            Math.abs(nextPercent - scrubPercentRef.current) >= scrubUpdateStep;

          if (shouldCommitScrubPercent) {
            scrubPercentRef.current = nextPercent;
            setScrubPercent(nextPercent);
          }
        }
      },
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        start: CANVAS_SEQUENCE.start,
        end: () =>
          `+=${section.clientHeight * (isCoarsePointer ? CANVAS_SEQUENCE.mobilePinScrollScreens : CANVAS_SEQUENCE.pinScrollScreens)}`,
        scrub: isCoarsePointer ? CANVAS_SEQUENCE.mobileScrub : CANVAS_SEQUENCE.scrub,
        invalidateOnRefresh: true
      }
    });

    const handleResize = () => {
      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(() => {
        const nextViewportWidth = window.innerWidth;
        const nextViewportHeight = window.innerHeight;
        const widthChanged = nextViewportWidth !== viewportWidth;
        const heightDelta = Math.abs(nextViewportHeight - viewportHeight);
        const shouldRefresh =
          !isCoarsePointer || widthChanged || heightDelta > 120;

        viewportWidth = nextViewportWidth;
        viewportHeight = nextViewportHeight;

        if (!shouldRefresh) {
          return;
        }

        resizeCanvas();
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("resize", handleResize);

    void preloadFrames({
      frameCount,
      imagePath,
      imagePrefix,
      batchSize,
      frameStep: mobileFrameStep,
      priorityIndices,
      onProgress: (processedCount, totalCount, nextLoadedCount) => {
        if (disposed) {
          return;
        }

        const nextPercent =
          totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0;
        const shouldCommitProgress =
          nextPercent === 0 ||
          nextPercent === 100 ||
          Math.abs(nextPercent - loadPercentRef.current) >=
            (isCoarsePointer ? CANVAS_SEQUENCE.mobileProgressStep : 1);

        if (shouldCommitProgress) {
          loadPercentRef.current = nextPercent;
          loadedCountRef.current = nextLoadedCount;
          setLoadPercent(nextPercent);
          setLoadedCount(nextLoadedCount);
        }
      }
    }).then((result) => {
      if (disposed) {
        return;
      }

      framesRef.current = result.frames;
      loadedCountRef.current = result.loadedCount;
      loadPercentRef.current = 100;
      setLoadedCount(result.loadedCount);
      setLoadPercent(100);
      setRenderMode(result.hasRealFrames ? "frames" : "procedural");
      drawCurrentFrame(activeFrameRef.current);
      ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }
      window.removeEventListener("resize", handleResize);
      scrubTween.scrollTrigger?.kill();
      scrubTween.kill();
    };
  }, [frameCount, imagePath, imagePrefix, isCoarsePointer]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden [touch-action:pan-y] md:h-screen"
    >
      <canvas ref={canvasRef} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.16),rgba(10,10,10,0.06)_40%,rgba(10,10,10,0.65))]" />

      <div className="pointer-events-none absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-col gap-3 sm:left-10 sm:top-10 sm:max-w-sm">
        <GlowBox className="glass-panel inline-flex w-fit items-center gap-3 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_16px_rgba(56,189,248,0.75)]" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-white/70">
            {renderMode === "loading"
              ? "Loading visual sequence"
              : renderMode === "frames"
                ? "JPEG sequence active"
                : "Procedural preview active"}
          </span>
        </GlowBox>

        <GlowBox className="glass-panel p-4">
          <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.25em] text-white/55">
            <span>Load</span>
            <span>{loadPercent}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-600 via-accent-400 to-white/80 transition-[width] duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.25em] text-white/45">
            <span>{loadedCount} frames ready</span>
            <span>{scrubPercent}% scrub</span>
          </div>
        </GlowBox>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-brand-950/45 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/60 backdrop-blur-lg sm:bottom-8 sm:px-4 sm:text-[0.68rem]">
        Scroll to scrub the sequence
      </div>
    </section>
  );
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawProceduralFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  frameIndex: number,
  frameCount: number
) {
  const progress = frameCount > 1 ? frameIndex / (frameCount - 1) : 0;

  context.save();
  context.fillStyle = "#070707";
  context.fillRect(0, 0, width, height);

  const backdrop = context.createRadialGradient(
    width * 0.5,
    height * 0.42,
    width * 0.05,
    width * 0.5,
    height * 0.5,
    width * 0.78
  );
  backdrop.addColorStop(0, "rgba(56, 189, 248, 0.26)");
  backdrop.addColorStop(0.4, "rgba(14, 165, 233, 0.12)");
  backdrop.addColorStop(1, "rgba(10, 10, 10, 0)");
  context.fillStyle = backdrop;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255, 255, 255, 0.035)";
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += 72) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += 72) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  drawGlow(
    context,
    width * (0.2 + progress * 0.58),
    height * (0.38 + Math.sin(progress * Math.PI * 2) * 0.1),
    width * 0.16,
    "rgba(14, 165, 233, 0.95)"
  );

  drawGlow(
    context,
    width * (0.74 - progress * 0.22),
    height * (0.6 + Math.cos(progress * Math.PI * 3) * 0.06),
    width * 0.11,
    "rgba(125, 211, 252, 0.78)"
  );

  context.save();
  context.strokeStyle = "rgba(255, 255, 255, 0.22)";
  context.lineWidth = Math.max(2, width * 0.0028);
  context.beginPath();
  context.arc(
    width * 0.5,
    height * 0.52,
    width * (0.16 + progress * 0.08),
    Math.PI * (0.28 + progress * 0.2),
    Math.PI * (1.52 + progress * 0.2)
  );
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.88)";
  context.font = `${Math.max(18, width * 0.016)}px JetBrains Mono, monospace`;
  context.fillText(`KAPRA MOTION ${String(frameIndex + 1).padStart(4, "0")}`, width * 0.08, height * 0.86);
  context.fillStyle = "rgba(255, 255, 255, 0.46)";
  context.font = `${Math.max(14, width * 0.011)}px Space Grotesk, sans-serif`;
  context.fillText("Preview mode until real JPEG frames are added to public/frames", width * 0.08, height * 0.9);
  context.restore();

  context.restore();
}

function drawGlow(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.42, color.replace("0.95", "0.3").replace("0.78", "0.24"));
  gradient.addColorStop(1, "rgba(14, 165, 233, 0)");

  context.save();
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.45,
    width * 0.18,
    width * 0.5,
    height * 0.45,
    width * 0.78
  );
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.52)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
