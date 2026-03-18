# Deployment

## Local Verification

```bash
npm install
npm run type-check
npm run build
```

## Vercel

1. Import the project into Vercel.
2. Set any `NEXT_PUBLIC_*` variables you want to override.
3. Deploy.

## Other Hosts

This is a standard Next.js app, so any host that supports `next build` and `next start` will work.

## Production Notes

- Keep frame files optimized.
- Make sure `public/frames` contains the exact zero-padded naming format expected by the loader.
- If you do not want to ship real frames immediately, the procedural canvas mode remains a safe fallback.
