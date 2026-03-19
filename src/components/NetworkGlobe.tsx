import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "../lib/utils";
import { useIsCoarsePointer } from "../hooks/useIsCoarsePointer";

interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  arcColor?: string;
  markerColor?: string;
  autoRotateSpeed?: number;
  connections?: { from: [number, number]; to: [number, number] }[];
  markers?: { lat: number; lng: number; label?: string }[];
}

const DEFAULT_MARKERS = [
  { lat: 37.78, lng: -122.42, label: "San Francisco" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 55.76, lng: 37.62, label: "Moscow" },
  { lat: -23.55, lng: -46.63, label: "Sao Paulo" },
  { lat: 19.43, lng: -99.13, label: "Mexico City" },
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 36.19, lng: 44.01, label: "Erbil" }
];

const DEFAULT_CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [37.78, -122.42], to: [51.51, -0.13] },
  { from: [51.51, -0.13], to: [35.68, 139.69] },
  { from: [35.68, 139.69], to: [-33.87, 151.21] },
  { from: [37.78, -122.42], to: [1.35, 103.82] },
  { from: [51.51, -0.13], to: [28.61, 77.21] },
  { from: [37.78, -122.42], to: [-23.55, -46.63] },
  { from: [1.35, 103.82], to: [-33.87, 151.21] },
  { from: [28.61, 77.21], to: [36.19, 44.01] },
  { from: [51.51, -0.13], to: [36.19, 44.01] }
];

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number
): [number, number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

export function NetworkGlobe({
  className,
  size,
  dotColor = "rgba(100, 180, 255, ALPHA)",
  arcColor = "rgba(100, 180, 255, 0.5)",
  markerColor = "rgba(100, 220, 255, 1)",
  autoRotateSpeed = 0.002,
  connections = DEFAULT_CONNECTIONS,
  markers = DEFAULT_MARKERS
}: GlobeProps) {
  const isCoarsePointer = useIsCoarsePointer();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.3);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotY: 0,
    startRotX: 0
  });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dotsRef = useRef<[number, number, number][]>([]);
  const canvasMetricsRef = useRef({ width: 0, height: 0, dpr: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = isCoarsePointer ? 450 : 900;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let index = 0; index < numDots; index += 1) {
      const theta = (2 * Math.PI * index) / goldenRatio;
      const phi = Math.acos(1 - (2 * (index + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi)
      ]);
    }

    dotsRef.current = dots;
  }, [isCoarsePointer]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (!isVisibleRef.current || document.hidden) {
      animRef.current = 0;
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.25);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const nextWidth = Math.max(1, Math.floor(width * dpr));
    const nextHeight = Math.max(1, Math.floor(height * dpr));
    const needsResize =
      canvasMetricsRef.current.width !== nextWidth ||
      canvasMetricsRef.current.height !== nextHeight ||
      canvasMetricsRef.current.dpr !== dpr;

    if (needsResize) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvasMetricsRef.current = { width: nextWidth, height: nextHeight, dpr };
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.38;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += autoRotateSpeed;
    }

    timeRef.current += 0.015;
    const time = timeRef.current;

    context.clearRect(0, 0, width, height);

    const glowGradient = context.createRadialGradient(
      cx,
      cy,
      radius * 0.8,
      cx,
      cy,
      radius * 1.5
    );
    glowGradient.addColorStop(0, "rgba(60, 140, 255, 0.03)");
    glowGradient.addColorStop(1, "rgba(60, 140, 255, 0)");
    context.fillStyle = glowGradient;
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.strokeStyle = "rgba(100, 180, 255, 0.06)";
    context.lineWidth = 1;
    context.stroke();

    const rotY = rotYRef.current;
    const rotX = rotXRef.current;

    for (const dot of dotsRef.current) {
      let [x, y, z] = dot;
      x *= radius;
      y *= radius;
      z *= radius;
      [x, y, z] = rotateX(x, y, z, rotX);
      [x, y, z] = rotateY(x, y, z, rotY);

      if (z > 0) {
        continue;
      }

      const [screenX, screenY] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
      const dotSize = 1 + depthAlpha * 0.8;

      context.beginPath();
      context.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
      context.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
      context.fill();
    }

    for (const connection of connections) {
      const [lat1, lng1] = connection.from;
      const [lat2, lng2] = connection.to;

      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rotX);
      [x1, y1, z1] = rotateY(x1, y1, z1, rotY);
      [x2, y2, z2] = rotateX(x2, y2, z2, rotX);
      [x2, y2, z2] = rotateY(x2, y2, z2, rotY);

      if (z1 > radius * 0.3 && z2 > radius * 0.3) {
        continue;
      }

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLength = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
      const arcHeight = radius * 1.25;
      const controlX = (midX / midLength) * arcHeight;
      const controlY = (midY / midLength) * arcHeight;
      const controlZ = (midZ / midLength) * arcHeight;
      const [arcX, arcY] = project(controlX, controlY, controlZ, cx, cy, fov);

      context.beginPath();
      context.moveTo(sx1, sy1);
      context.quadraticCurveTo(arcX, arcY, sx2, sy2);
      context.strokeStyle = arcColor;
      context.lineWidth = 1.2;
      context.stroke();

      const travel = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
      const travelX =
        (1 - travel) * (1 - travel) * sx1 +
        2 * (1 - travel) * travel * arcX +
        travel * travel * sx2;
      const travelY =
        (1 - travel) * (1 - travel) * sy1 +
        2 * (1 - travel) * travel * arcY +
        travel * travel * sy2;

      context.beginPath();
      context.arc(travelX, travelY, 2, 0, Math.PI * 2);
      context.fillStyle = markerColor;
      context.fill();
    }

    for (const marker of markers) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rotX);
      [x, y, z] = rotateY(x, y, z, rotY);

      if (z > radius * 0.1) {
        continue;
      }

      const [screenX, screenY] = project(x, y, z, cx, cy, fov);
      const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;

      context.beginPath();
      context.arc(screenX, screenY, 4 + pulse * 4, 0, Math.PI * 2);
      context.strokeStyle = markerColor.replace("1)", `${0.2 + pulse * 0.15})`);
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      context.arc(screenX, screenY, 2.5, 0, Math.PI * 2);
      context.fillStyle = markerColor;
      context.fill();

      if (marker.label) {
        context.font = "10px system-ui, sans-serif";
        context.fillStyle = markerColor.replace("1)", "0.6)");
        context.fillText(marker.label, screenX + 8, screenY + 3);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [arcColor, autoRotateSpeed, connections, dotColor, isCoarsePointer, markerColor, markers]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const startAnimation = () => {
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    const stopAnimation = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      if (isVisibleRef.current) {
        startAnimation();
      }
    };

    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startAnimation();

    return () => {
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAnimation();
    };
  }, [draw]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;
    rotYRef.current = dragRef.current.startRotY + deltaX * 0.005;
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + deltaY * 0.005));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full touch-none cursor-grab active:cursor-grabbing", className)}
      style={size ? { width: size, height: size } : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}
