# Quick Start

## 1. Install

```bash
npm install
```

## 2. Create local env file

```bash
Copy-Item .env.example .env.local
```

Minimum contact-form setup:

- Set `HUBSPOT_PORTAL_ID`
- Set `HUBSPOT_FORM_ID`
- Optionally set `HUBSPOT_ACCESS_TOKEN` if you want to try HubSpot's secure submit endpoint first

## 3. Start development

```bash
npm run dev
```

Open `http://localhost:3000`.

## 4. Optional: add JPEG frames

Put files in `public/frames` with zero-padded names:

```text
frame-0000.jpg
frame-0001.jpg
...
```

If you already have a video:

```bash
node scripts/extract-frames.js your-video.mp4
```

If you want a test sequence:

```bash
node scripts/create-sample-frames.js --count 120
```

## 5. Build for production

```bash
npm run build
```
