import { DependencyList, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DURATIONS, EASE } from "../config/animation";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { root, rootMargin = "0px", threshold = 0.2 } = options;
  const thresholdKey = Array.isArray(threshold) ? threshold.join(",") : String(threshold);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof window === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [root, rootMargin, threshold, thresholdKey]);

  return [ref, inView] as const;
}

interface StaggerOptions {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

/**
 * Hook for stagger animations using Framer Motion.
 * Animates children elements marked with selector when they come into view.
 */
export function useStaggerAnimation<T extends HTMLElement>(
  options: StaggerOptions = {},
  deps: DependencyList = []
) {
  const {
    selector = "[data-stagger]",
    y = 36,
    duration = DURATIONS.slow,
    stagger = 0.14
  } = options;

  const ref = useRef<T | null>(null);
  const animatedRef = useRef(new Set<HTMLElement>());

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const targets = Array.from(element.querySelectorAll<HTMLElement>(selector));
          
          targets.forEach((target, index) => {
            // Skip if already animated
            if (animatedRef.current.has(target)) return;
            
            animatedRef.current.add(target);

            // Use CSS animations for performance
            const delay = index * (stagger * 1000);
            target.style.animation = `none`;
            target.style.opacity = "0";
            target.style.transform = `translateY(${y}px)`;
            
            setTimeout(() => {
              target.style.transition = `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }, delay);
          });

          // Stop observing after animation
          observer.unobserve(element);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [selector, y, duration, stagger, ...deps]);

  return ref;
}
