#!/usr/bin/env node

const { existsSync, mkdirSync } = require("fs");
const { resolve, join } = require("path");
const { spawnSync } = require("child_process");

function parseArgs(argv) {
  const options = {
    input: "",
    fps: 30,
    quality: 85,
    output: "public/frames"
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--") && !options.input) {
      options.input = token;
      continue;
    }

    if (token === "--fps") {
      options.fps = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--quality") {
      options.quality = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--output") {
      options.output = argv[index + 1];
      index += 1;
    }
  }

  return options;
}

function qualityToQScale(quality) {
  const clamped = Math.min(100, Math.max(1, quality));
  return Math.max(2, Math.round(31 - (clamped / 100) * 29));
}

function printUsage() {
  console.log("Usage: node scripts/extract-frames.js <video-file> [--fps 30] [--quality 85] [--output public/frames]");
}

const options = parseArgs(process.argv.slice(2));

if (!options.input) {
  printUsage();
  process.exit(1);
}

const inputPath = resolve(options.input);
const outputDir = resolve(options.output);

if (!existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const ffmpegArgs = [
  "-y",
  "-i",
  inputPath,
  "-vf",
  `fps=${options.fps},scale=min(1920\\,iw):-2:flags=lanczos`,
  "-q:v",
  String(qualityToQScale(options.quality)),
  "-start_number",
  "0",
  join(outputDir, "frame-%04d.jpg")
];

const result = spawnSync("ffmpeg", ffmpegArgs, { stdio: "inherit" });

if (result.error) {
  console.error("Unable to start ffmpeg. Install FFmpeg and make sure it is in your PATH.");
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status || 1);
}

console.log(`Frames written to ${outputDir}`);
