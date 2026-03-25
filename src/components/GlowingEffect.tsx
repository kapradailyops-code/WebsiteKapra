"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import {
  animate,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const angleAnimationRef = useRef<AnimationPlaybackControls | null>(null);
    const idleOpacity = glow ? "0.52" : "0.18";

    const updateGlowOpacity = useCallback((element: HTMLDivElement, value: string) => {
      element.style.setProperty("--glow-opacity", value);
    }, []);

    const handleMove = useCallback(
      (event?: MouseEvent | PointerEvent | { x: number; y: number }) => {
        if (!containerRef.current) {
          return;
        }

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;

          if (!element) {
            return;
          }

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = event?.x ?? lastPosition.current.x;
          const mouseY = event?.y ?? lastPosition.current.y;

          if (event) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            updateGlowOpacity(element, idleOpacity);
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          updateGlowOpacity(element, isActive ? "1" : idleOpacity);

          if (!isActive) {
            return;
          }

          const currentAngle =
            Number.parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          targetAngle = currentAngle + angleDiff;

          angleAnimationRef.current?.stop();
          angleAnimationRef.current = animate(currentAngle, targetAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [idleOpacity, inactiveZone, movementDuration, proximity, updateGlowOpacity]
    );

    useEffect(() => {
      if (disabled) {
        return;
      }

      if (containerRef.current) {
        updateGlowOpacity(containerRef.current, idleOpacity);
      }

      const handleScroll = () => handleMove();
      const handlePointerMove = (event: PointerEvent) => handleMove(event);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        angleAnimationRef.current?.stop();
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [disabled, handleMove, idleOpacity, updateGlowOpacity]);

    if (disabled) {
      return null;
    }

    const baseMaskStyle = {
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      maskComposite: "exclude",
    } as CSSProperties;

    const whiteGradient = `conic-gradient(
      from calc((var(--start) - ${spread}) * 1deg),
      rgba(255, 255, 255, 0) 0deg,
      rgba(255, 255, 255, 0.95) ${Math.max(spread * 0.85, 12)}deg,
      rgba(255, 255, 255, 0.2) ${Math.max(spread * 1.7, 24)}deg,
      rgba(255, 255, 255, 0) ${Math.max(spread * 2.4, 34)}deg,
      transparent 360deg
    )`;

    // Theme-aware gradient colors — gold only
    const defaultGradient = theme === "dark" ? `conic-gradient(
      from calc((var(--start) - ${spread}) * 1deg),
      rgba(229, 168, 75, 0) 0deg,
      #E5A84B ${Math.max(spread * 0.38, 10)}deg,
      #C68A36 ${Math.max(spread * 0.9, 20)}deg,
      #F0C060 ${Math.max(spread * 1.4, 30)}deg,
      rgba(198, 138, 54, 0) ${Math.max(spread * 2.45, 52)}deg,
      transparent 360deg
    )` : `conic-gradient(
      from calc((var(--start) - ${spread}) * 1deg),
      rgba(198, 138, 54, 0) 0deg,
      #C68A36 ${Math.max(spread * 0.38, 10)}deg,
      #A87023 ${Math.max(spread * 0.9, 20)}deg,
      #E5A84B ${Math.max(spread * 1.4, 30)}deg,
      rgba(168, 112, 35, 0) ${Math.max(spread * 2.45, 52)}deg,
      transparent 360deg
    )`;


    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--start": "0",
            "--glow-opacity": idleOpacity,
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--gradient": variant === "white" ? whiteGradient : defaultGradient,
          } as CSSProperties
        }
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      >
        {blur > 0 ? (
          <div
            style={
              {
                ...baseMaskStyle,
                background: "var(--gradient)",
                opacity: "calc(var(--glow-opacity) * 0.42)",
              } as CSSProperties
            }
            className="absolute -inset-px rounded-[inherit] p-[var(--glowingeffect-border-width)] blur-[var(--blur)] transition-opacity duration-300"
          />
        ) : null}
        <div
          style={
            {
              ...baseMaskStyle,
              background: "var(--gradient)",
              opacity: "var(--glow-opacity)",
            } as CSSProperties
          }
          className="absolute -inset-px rounded-[inherit] p-[var(--glowingeffect-border-width)] transition-opacity duration-300"
        />
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
export type { GlowingEffectProps };
