# Testing Practices

## Current State
- **Automated Tests**: No framework like Jest, Vitest, or Cypress is currently installed or configured within `package.json`. No `__tests__` or `*.test.ts` directories spotted in the core structure.
- **Manual QA**: Relies on Next.js dev server previews and visual confirmation, especially due to the heavy reliance on canvas elements (`three.js`) and complex framer-motion sequences which are traditionally difficult to unit test effectively.

## Recommendations
- Adding Playwright or Cypress for E2E tests capturing critical conversion funnels (like inquiry submissions and multi-page routing).
