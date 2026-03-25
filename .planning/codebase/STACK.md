# Technology Stack

## Core Technologies
- **Framework**: Next.js 16.2.0 (using Pages router with Turbopack enabled `next dev`)
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.5.3 (Types via `@types/*`)
- **Styling**: Tailwind CSS 3.4.4 with PostCSS & Autoprefixer
- **Package Manager**: npm (Node >=18.17.0 required)

## Key Dependencies
- `framer-motion` (v12.37.0): Core animation library.
- `three` (v0.183.2): 3D graphics rendering (used in components like `Globe.tsx`, `NetworkGlobe.tsx`).
- `lucide-react`: Iconography.

## Tooling & Configuration
- **Build**: Next.js compiler (Turbopack for dev)
- **Type Checking**: `tsc --noEmit`
