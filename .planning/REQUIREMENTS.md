# Requirements

## Functional Requirements
- **Next.js 16 App**: Pages router handling `index`, `services`, `contact`, and `careers`.
- **Canvas Sequence**: A scroll-driven image sequence or procedural 3D fallback playing natively in a canvas block.
- **HubSpot Integration**: Serverless API route (`/api/contact`) interacting with HubSpot forms API, handling scopes and fallback logic.
- **Theme**: Light and dark mode support with instant script injection to prevent FOUC.

## Non-Functional Requirements
- **Performance**: Smooth 60fps scrolling, deferring heavy 3D assets to prevent main thread blocking.
- **Responsive**: Full responsiveness across mobile, tablet, and desktop breakpoints using Tailwind CSS boundaries.
- **Typescript**: Strict typing for data models and component props.
