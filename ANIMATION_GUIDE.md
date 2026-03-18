# Animation Guide

## Core Motion Patterns

- `Hero.tsx` uses staggered entrance animation for the hero eyebrow, headline, copy, and actions.
- `CanvasSequence.tsx` scrubs a frame sequence against scroll. If no JPEG frames are available, it renders a procedural cinematic scene so the page still feels alive.
- `Journey.tsx` stacks multiple `ScrollText` panels over the sticky canvas region.
- `ServicesArsenal.tsx` reveals its cards with staggered motion and hover depth.

## Configuration

Motion values live in `src/config/animation.ts`.

- `DURATIONS`: shared timing tokens
- `EASE`: easing presets
- `CANVAS_SEQUENCE`: frame count defaults and scrub speed
- `SCROLL_OFFSETS`: section trigger positions

## Hooks

`src/hooks/useAnimation.ts` exposes:

- `useScrollAnimation`
- `useInView`
- `useParallax`
- `useStaggerAnimation`

These keep GSAP setup and cleanup centralized.

## Working With Real Frames

Add JPEGs to `public/frames`, then adjust `frameCount` in `src/pages/index.tsx` to match your actual sequence.

## Performance Notes

- Canvas drawing is resized to the device pixel ratio.
- Image preloading is batched to reduce jank.
- Scroll-triggered animations clean up on unmount.
- The procedural fallback avoids a blank hero while waiting for assets.
