#!/usr/bin/env node
// Usage: node render.mjs <spec.json> <outdir> [--still] [--video]   (neither flag = both)
// Writes <outdir>/<slug>.png (1080x1350, 4:5) and <outdir>/<slug>.mp4 (1080x1920, 9:16, 30fps).
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join, basename, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [specPath, outDir = "."] = process.argv.slice(2).filter(a => !a.startsWith("--"));
if (!specPath) { console.error("usage: node render.mjs <spec.json> <outdir> [--still] [--video]"); process.exit(2); }
const flags = new Set(process.argv.filter(a => a.startsWith("--")));
const wantStill = flags.has("--still") || !flags.has("--video");
const wantVideo = flags.has("--video") || !flags.has("--still");

const spec = JSON.parse(readFileSync(specPath, "utf8"));
if (!spec.headline) throw new Error("spec.headline is required");
const slug = spec.slug || basename(specPath, ".json");
const template = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "template.html")).href;
mkdirSync(outDir, { recursive: true });

// System Chrome, so no browser download. Override with CHROME_PATH.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });

async function open(format, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(s => { window.SPEC = s; }, { ...spec, format });
  await page.goto(template, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.READY, null, { timeout: 15000 });
  if (errors.length) throw new Error(`template error: ${errors.join("; ")}`);
  const fonts = await page.evaluate(() => [document.fonts.check('800 40px "Bricolage Grotesque"'), document.fonts.check('24px "Departure Mono"')]);
  if (!fonts.every(Boolean)) throw new Error(`fonts did not load (Bricolage, Departure Mono): ${fonts}`);
  return page;
}
const seek = (page, s) => page.evaluate(ms => document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; }), s * 1000);

if (wantStill) {
  const page = await open("post", 1080, 1350);
  await seek(page, 60); // past every animation: the settled composition
  await page.screenshot({ path: join(outDir, `${slug}.png`) });
  console.log(resolve(outDir, `${slug}.png`));
}

if (wantVideo) {
  const page = await open("story", 1080, 1920);
  const fps = 30, dur = spec.duration || await page.evaluate(() => window.DURATION);
  const out = join(outDir, `${slug}.mp4`);
  const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, fail) => ff.on("close", c => c === 0 ? ok() : fail(new Error(`ffmpeg exited ${c}`))));
  for (let f = 0; f < fps * dur; f++) {
    await seek(page, f / fps);
    const jpg = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await done;
  console.log(resolve(out));
}

await browser.close();
