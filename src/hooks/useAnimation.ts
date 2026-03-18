import { DependencyList, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DURATIONS, EASE, SCROLL_OFFSETS } from "../config/animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationCleanup = void | (() => void) | gsap.Context;

function isGsapContext(value: AnimationCleanup): value is gsap.Context {
  return Boolean(value) && typeof value === "object" && "revert" in value;
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useScrollAnimation<T extends HTMLElement>(
  setup: (element: T) => AnimationCleanup,
  deps: DependencyList = []
) {
  const ref = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const cleanup = setup(element);

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
        return;
      }

      if (isGsapContext(cleanup)) {
        cleanup.revert();
      }
    };
  }, deps);

  return ref;
}

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

export function useParallax<T extends HTMLElement>(
  amount = 12,
  deps: DependencyList = []
) {
  const ref = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(element, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, element);

    return () => context.revert();
  }, [amount, ...deps]);

  return ref;
}

interface StaggerOptions {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export function useStaggerAnimation<T extends HTMLElement>(
  options: StaggerOptions = {},
  deps: DependencyList = []
) {
  const {
    selector = "[data-stagger]",
    y = 36,
    duration = DURATIONS.slow,
    stagger = 0.14,
    start = SCROLL_OFFSETS.cardStart
  } = options;

  const ref = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const context = gsap.context(() => {
      const targets = Array.from(element.querySelectorAll<HTMLElement>(selector));

      if (!targets.length) {
        return;
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: element,
            start,
            once: true
          }
        }
      );
    }, element);

    return () => context.revert();
  }, [selector, y, duration, stagger, start, ...deps]);

  return ref;
}
