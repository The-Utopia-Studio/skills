#!/usr/bin/env node
// Usage: node render.mjs <spec.json> <outdir> [--still] [--video] [--gif]   (no flag = still + video)
// Writes <outdir>/<slug>.png (1080x1350, 4:5), <outdir>/<slug>.mp4 (1080x1920, 9:16, 30fps)
// and, with --gif, <outdir>/<slug>.gif (720x900, 4:5, 12fps, loops) for LinkedIn image posts.
// Motion files open on the finished composition (so the first frame, which platforms use as the
// preview, is the final image), fade to the empty page, build, then hold.
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { readFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, basename, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [specPath, outDir = "."] = process.argv.slice(2).filter(a => !a.startsWith("--"));
if (!specPath) { console.error("usage: node render.mjs <spec.json> <outdir> [--still] [--video] [--gif]"); process.exit(2); }
const flags = new Set(process.argv.filter(a => a.startsWith("--")));
const none = !["--still", "--video", "--gif"].some(f => flags.has(f));
const wantStill = none || flags.has("--still");
const wantVideo = none || flags.has("--video");
const wantGif = flags.has("--gif");

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

// Intro: 1s on the finished frame, 0.4s fade of the content to the empty page, then the timeline from 0.
const HOLD = 1, FADE = 0.4;
async function encode(page, out, fps, args) {
  const dur = spec.duration || await page.evaluate(() => window.DURATION);
  const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", ...args, out], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, fail) => ff.on("close", c => c === 0 ? ok() : fail(new Error(`ffmpeg exited ${c}`))));
  for (let f = 0; f < fps * (HOLD + FADE + dur); f++) {
    const t = f / fps, intro = t < HOLD + FADE;
    await seek(page, intro ? 60 : t - HOLD - FADE);
    await page.evaluate(o => { document.querySelector(".frame").style.opacity = o; }, intro ? Math.min(1, (HOLD + FADE - t) / FADE) : 1);
    const jpg = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await done;
  console.log(resolve(out));
}

if (wantVideo) {
  const page = await open("story", 1080, 1920);
  await encode(page, join(outDir, `${slug}.mp4`), 30, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart"]);
}

if (wantGif) {
  // Grain off: per-pixel noise defeats GIF compression and dithers into mush. Small palette keeps it near LinkedIn's ~2MB.
  const page = await open("post", 1080, 1350);
  await page.evaluate(() => document.querySelector(".grain").remove());
  const out = join(outDir, `${slug}.gif`);
  await encode(page, out, 12, ["-vf", "scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=48:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle", "-loop", "0"]);
  const mb = statSync(out).size / 1e6;
  if (mb > 2) console.warn(`warning: ${out} is ${mb.toFixed(1)}MB; LinkedIn may reject GIFs over ~2MB. Shorten "duration" or simplify the figure.`);
}

await browser.close();
