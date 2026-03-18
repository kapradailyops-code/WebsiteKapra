# Quick Start

## 1. Install

```bash
npm install
```

## 2. Start development

```bash
npm run dev
```

Open `http://localhost:3000`.

## 3. Optional: add JPEG frames

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

## 4. Build for production

```bash
npm run build
```
