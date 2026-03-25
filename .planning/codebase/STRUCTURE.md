# Directory Structure

## Layout
- `.next/`: Next.js build cache and output (ignored).
- `public/`: Static assets (images, fonts, vector SVGs like favicon).
- `src/`
  - `components/`: Atomic UI and complex sections (`Hero.tsx`, `AnimatedCarousel.tsx`, `Footer.tsx`).
  - `api/`: Backend Next.js API routes (if any).
  - `pages/`: Route definitions (`index.tsx`, `services.tsx`, `careers.tsx`, `contact.tsx`).
  - `lib/`: Business logic or external service wrappers (`inquiry.ts`).
  - `utils/`: Reusable pure functions (`graphicsScale.ts`, `utils.ts`).
  - `hooks/`: Custom React hooks.
  - `config/`: Configuration objects and hardcoded constants.
  - `styles/`: Global CSS imports.

## Naming Conventions
- React Components: PascalCase (`NavBar.tsx`, `ChatWidget.tsx`).
- Utilities & Lib: camelCase (`inquiry.ts`, `utils.ts`).
- Pages: lowercase standard Next.js routing patterns.
