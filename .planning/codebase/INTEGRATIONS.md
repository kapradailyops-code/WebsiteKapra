# External Integrations

## APIs & Services
- **Analytics / Core**: Vercel Speed Insights (`@vercel/speed-insights`)
- **Deployment**: Vercel platform (implied by the presence of `@vercel/speed-insights` and `.vercel` folder).

## Observations
- No databases or complex authentication systems are visible in the root or `src/lib`.
- Contact and Inquiry forms (`src/components/ContactForm.tsx`, `src/lib/inquiry.ts`) likely post to a simple endpoint or email handler.
