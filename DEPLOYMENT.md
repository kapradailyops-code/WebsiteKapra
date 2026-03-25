# Deployment

## Local Verification

```bash
npm install
npm run type-check
npm run build
```

## Vercel

1. Import the project into Vercel.
2. Add `GROQ_API_KEY` if you want the chat endpoint enabled.
3. Add `HUBSPOT_PORTAL_ID` and `HUBSPOT_FORM_ID` for the contact form.
4. Optionally add `HUBSPOT_ACCESS_TOKEN` to try the secure HubSpot submit endpoint before falling back to the public forms endpoint.
5. Set any `HUBSPOT_FIELD_*` variables needed to match your HubSpot property names.
6. Set any `NEXT_PUBLIC_*` variables you want to override.
7. Deploy.

## Other Hosts

This is a standard Next.js app, so any host that supports `next build` and `next start` will work.

## Production Notes

- Keep frame files optimized.
- Make sure `public/frames` contains the exact zero-padded naming format expected by the loader.
- If you do not want to ship real frames immediately, the procedural canvas mode remains a safe fallback.
- The contact API returns HubSpot validation errors directly when possible, so incorrect portal, form, or field mappings usually show up quickly during smoke testing.
