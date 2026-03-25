# Coding Conventions

## Style & Patterns
- **React Components**: Functional components with hooks mapping out state and side effects.
- **Styling**: Extensive use of utility classes directly inline via Tailwind CSS. Class merging tools likely used for dynamic states.
- **TypeScript**: Strict typing where possible (interfaces/types usually defined within the same file or a dedicated types `.ts` file).
- **Animations**: Prefer `framer-motion` `<motion.div>` primitives for declarative animations over direct CSS keyframes unless highly specialized.

## Error Handling
- Minimal visible error boundary setup in `_app.tsx` based on initial architectural overview. Most error handling is likely component-scoped.
