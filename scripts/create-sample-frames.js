#!/usr/bin/env node

const { mkdirSync } = require("fs");
const { resolve, join } = require("path");
const { spawnSync } = require("child_process");

function parseArgs(argv) {
  const options = {
    count: 120,
    fps: 30,
    width: 1600,
    height: 900,
    output: "public/frames"
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--count") {
      options.count = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--fps") {
      options.fps = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--width") {
      options.width = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--height") {
      options.height = Number(argv[index + 1]);
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

const options = parseArgs(process.argv.slice(2));
const outputDir = resolve(options.output);
const duration = (options.count / options.fps).toFixed(2);

mkdirSync(outputDir, { recursive: true });

const filter = [
  `drawbox=x=iw*0.08+sin(t*1.4)*180:y=ih*0.18:w=iw*0.34:h=ih*0.34:color=0x0EA5E9@0.34:t=fill`,
  `drawbox=x=iw*0.52+cos(t*1.1)*140:y=ih*0.44:w=iw*0.22:h=ih*0.24:color=0x38BDF8@0.24:t=fill`,
  `drawbox=x=iw*0.18+cos(t*0.7)*100:y=ih*0.7:w=iw*0.46:h=ih*0.1:color=0x0284C7@0.3:t=fill`,
  "boxblur=20:1"
].join(",");

const ffmpegArgs = [
  "-y",
  "-f",
  "lavfi",
  "-i",
  `color=c=#0a0a0a:s=${options.width}x${options.height}:r=${options.fps}:d=${duration}`,
  "-vf",
  filter,
  "-frames:v",
  String(options.count),
  "-q:v",
  "3",
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

console.log(`Sample frames written to ${outputDir}`);
