# Architecture

## System Design
- **Core Pattern**: React-based SPA/SSG using Next.js Pages Router.
- **Data Flow**: Primarily static or client-side rendered with interactive 3D and animated experiences.
- **Entry Points**: 
  - Routing handled via `src/pages/*.tsx`.
  - Global `_app.tsx` wraps all pages with `<Layout>`.
  - Global `_document.tsx` handles initial document structure and light/dark mode flashing prevention script.

## Presentation Layer
- **Component Strategy**: Highly modular React functional components inside `src/components/`. 
- **Animation Strategy**: Complex layouts utilize `framer-motion` for page transitions and element reveals, alongside `three.js` for complex webgl canvases (e.g. `NetworkGlobe.tsx`, `Globe.tsx`).
- **Styling**: Tailwind CSS utility classes are used globally alongside a custom design system mapped in `tailwind.config.js`.
