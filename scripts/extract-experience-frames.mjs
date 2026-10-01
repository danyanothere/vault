#!/usr/bin/env node
/**
 * Extract evenly spaced WebP frames from a vehicle film for the 360° viewer.
 * Local development tool only — never run during `npm run build`, so Vercel
 * does not need ffmpeg.
 *
 *   node scripts/extract-experience-frames.mjs public/videos/maserati.mp4 public/images/experience/maserati/exterior 18
 *
 * Requires ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg).
 * Only use the output if the camera arc really covers distinct angles —
 * never mirror frames to fake a full orbit.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [input, outDir, countArg = "18"] = process.argv.slice(2);
if (!input || !outDir) {
  console.error("usage: extract-experience-frames.mjs <video> <outDir> [frameCount]");
  process.exit(1);
}
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const count = Number(countArg);

const probe = execFileSync(ffmpeg, ["-hide_banner", "-i", input], { stdio: ["ignore", "ignore", "pipe"], encoding: "utf8" }).toString?.() ?? "";
const match = /Duration: (\d+):(\d+):([\d.]+)/.exec(probe);
const seconds = match ? Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) : 8;

mkdirSync(outDir, { recursive: true });
for (let i = 0; i < count; i++) {
  const t = ((i + 0.5) / count) * seconds;
  const name = join(outDir, `frame-${String(i + 1).padStart(2, "0")}.webp`);
  execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", t.toFixed(3), "-i", input, "-frames:v", "1", "-c:v", "libwebp", "-quality", "86", name]);
  console.log(name);
}
