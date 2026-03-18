# Kapra Web AI Landing Page

This is a rebuilt Next.js 14 landing page based on the delivery documents in this workspace. It recreates the premium dark visual system, scroll-driven storytelling, glassmorphism service cards, and canvas-based journey section described in the handoff.

## Stack

- Next.js 14 with the Pages Router
- React 18 + TypeScript
- Tailwind CSS 3
- GSAP + ScrollTrigger
- Canvas API for frame scrubbing and procedural fallback

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Frames

The page works in two modes:

- Real frame sequence mode when you add JPEG files to `public/frames`
- Procedural preview mode when no frames are present

Expected naming:

```text
public/frames/frame-0000.jpg
public/frames/frame-0001.jpg
...
```

Use the helper scripts:

```bash
node scripts/extract-frames.js video.mp4
node scripts/create-sample-frames.js --count 120
```

## Important Files

- `src/pages/index.tsx`: page composition
- `src/components/CanvasSequence.tsx`: canvas animation and scrub logic
- `src/components/Journey.tsx`: scroll storytelling overlays
- `src/components/ServicesArsenal.tsx`: services cards
- `src/config/animation.ts`: timing and motion values

## Environment

Copy `.env.example` to `.env.local` if you want to customize contact details and social links.
