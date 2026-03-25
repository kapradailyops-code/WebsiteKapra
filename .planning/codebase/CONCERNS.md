# Concerns & Technical Debt

## Known Issues and Risks
1. **Next.js 16.2.0 Turbopack Instability**: The project bumped into runtime parsing errors (`Could not parse module next/document.js`) directly related to Turbopack caching. Clearing the `.next` folder manually was required. This might repeat on the CI/CD level or local dev loops.
2. **Bundle Size**: Widespread usage of `three.js` and `framer-motion` can heavily bloat the client-side bundle. Optimization strategies like dynamic imports (`next/dynamic`) should be rigorously applied for these components off-screen.
3. **No Automated Testing**: Lack of unit and end-to-end tests means visual regressions or component breakages rely entirely on manual spotting. 
4. **Theme Toggling UX**: `_document.tsx` implements a synchronous `<script>` blocker to read `localStorage` and prevent dark/light mode FOUC (Flash of Unstyled Content). Such scripts are tricky to maintain and can cause hydration mismatches if the React tree renders contrarily.
