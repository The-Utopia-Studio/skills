// Walkthrough recorder: drives a real Chrome with Playwright, captures every
// painted frame over CDP, narrates each scene with TTS, and assembles a smooth
// constant-frame-rate MP4 with the voiceover laid on scene by scene.
//
// Most people run it through record.mjs, which reads walkthrough-video.config.json:
//
//   const { run } = await import("./walkthrough.mjs");
//   await run({ baseUrl, profile, outDir, scenes, voice, ttsKey, pwFrom, brand });
//
// A scene is { say: "narration", act: async (h) => { ...drive the page... } }.
// The scene lasts as long as the longer of its narration and its actions.

import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { mkdirSync, existsSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const DEFAULT_BRAND = { background: "#f4f1ec", text: "#1d1a18", muted: "#6b6460", accent: "#3b5bdb" };

const rgb = (hex) => { const n = parseInt(hex.replace("#", ""), 16); return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`; };

/** Cursor, click ripple and dev-overlay hiding, injected into every document. */
const overlay = (accent) => `(() => {
  if (window.__wtOverlay) return; window.__wtOverlay = true;
  const style = document.createElement('style');
  style.textContent = 'nextjs-portal{display:none!important}' +
    '#__wt_cursor{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;width:24px;height:32px;transform:translate(-200px,-200px);will-change:transform;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))}' +
    '.__wt_ripple{position:fixed;z-index:2147483646;pointer-events:none;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:2px solid rgba(${rgb(accent)},.75);background:rgba(${rgb(accent)},.14);animation:__wt_r .55s ease-out forwards}' +
    '@keyframes __wt_r{from{transform:scale(.35);opacity:1}to{transform:scale(1.25);opacity:0}}';
  const mount = () => {
    document.head.appendChild(style);
    const c = document.createElement('div'); c.id = '__wt_cursor';
    c.innerHTML = '<svg width="24" height="32" viewBox="0 0 24 32"><path d="M3 2 L3 25 L9 19.5 L13.2 29 L17 27.4 L12.8 18 L21 18 Z" fill="#1d1a18" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    const last = window.__wtLast; if (last) c.style.transform = 'translate(' + last[0] + 'px,' + last[1] + 'px)';
  };
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  // Links to other sites (docs, Slack, a calendar) would open a tab, and a new tab in headless Chrome
  // shrinks the recorded page's viewport mid-take. Their own click handlers still run.
  document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href]'); if (a && (a.target === '_blank' || new URL(a.href, location.href).origin !== location.origin)) e.preventDefault(); }, true);
  window.open = () => null;
  document.addEventListener('mousemove', (e) => { const c = document.getElementById('__wt_cursor'); window.__wtLast = [e.clientX, e.clientY]; if (c) c.style.transform = 'translate(' + (e.clientX - 3) + 'px,' + (e.clientY - 2) + 'px)'; }, true);
  document.addEventListener('mousedown', (e) => { const r = document.createElement('div'); r.className = '__wt_ripple'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; document.body.appendChild(r); setTimeout(() => r.remove(), 600); }, true);
})();`;

/** Helpers a scene uses to drive the page like a person would. */
function makeHelpers(page, { width, height, zoom: zoomLevel = 1.32, brand }) {
  const pos = { x: 1100, y: 700 };
  // Camera track for the post-production zoom: "focus" eases in on a point,
  // "wide" eases back out to the whole screen. Times are wall-clock seconds.
  const camera = [];
  let focused = false;
  const wide = () => { if (focused) { camera.push({ t: Date.now() / 1000, z: 1, cx: 0.5, cy: 0.5 }); focused = false; } };
  const focus = (x, y, z = zoomLevel) => { camera.push({ t: Date.now() / 1000, z, cx: x / width, cy: y / height }); focused = true; };
  // Centre of the first ancestor wide enough to be the form's column, so a zoom keeps the whole field row in frame.
  const columnCentre = (locator) => locator.evaluate((el) => {
    for (let n = el; n; n = n.parentElement) { const r = n.getBoundingClientRect(); if (r.width >= 560) return r.left + r.width / 2; }
    return innerWidth / 2;
  }).catch(() => width / 2);
  const isControl = (locator) => locator.evaluate((el) => {
    const role = el.getAttribute("role");
    return ["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName) || role === "radio" || role === "checkbox";
  }).catch(() => false);
  const h = {
    page,
    sleep,
    camera,
    wide,
    focus,
    async move(x, y, duration = 650) {
      const from = { ...pos };
      const steps = Math.max(8, Math.round(duration / 16));
      for (let i = 1; i <= steps; i++) {
        const t = ease(i / steps);
        await page.mouse.move(from.x + (x - from.x) * t, from.y + (y - from.y) * t);
        await sleep(duration / steps);
      }
      pos.x = x; pos.y = y;
    },
    /** Smoothly scroll whatever contains the target so it sits comfortably in view. */
    async reveal(locator, { block = "center", duration = 900 } = {}) {
      const handle = await locator.elementHandle();
      const scrolled = await page.evaluate(async ([el, block, duration]) => {
        const scroller = (() => { for (let n = el.parentElement; n; n = n.parentElement) { const s = getComputedStyle(n); if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 2) return n; } return document.scrollingElement; })();
        const r = el.getBoundingClientRect();
        const view = scroller === document.scrollingElement ? { top: 0, h: innerHeight } : (() => { const b = scroller.getBoundingClientRect(); return { top: b.top, h: b.height }; })();
        const inView = r.top >= view.top + 90 && r.bottom <= view.top + view.h - 90;
        if (inView && block !== "start") return false;
        const want = block === "start" ? view.top + 110 : view.top + view.h / 2 - r.height / 2;
        const from = scroller.scrollTop, to = Math.max(0, Math.min(scroller.scrollHeight - scroller.clientHeight, from + (r.top - want)));
        if (Math.abs(to - from) < 4) return false;
        const e = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const d = Math.min(1600, Math.max(450, duration * Math.abs(to - from) / 600));
        const t0 = performance.now();
        await new Promise((done) => { const step = (now) => { const t = Math.min(1, (now - t0) / d); scroller.scrollTop = from + (to - from) * e(t); t < 1 ? requestAnimationFrame(step) : done(); }; requestAnimationFrame(step); });
        return true;
      }, [handle, block, duration]);
      await sleep(150);
      return scrolled;
    },
    /** Glide down (or up) through a page so its content can be read. */
    async scrollBy(dy, { duration = 2500, within } = {}) {
      wide();
      await page.evaluate(async ([dy, duration, within]) => {
        const scroller = within ? document.querySelector(within) : document.scrollingElement;
        const from = scroller.scrollTop, to = Math.max(0, Math.min(scroller.scrollHeight - scroller.clientHeight, from + dy));
        const e = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        const t0 = performance.now();
        await new Promise((done) => { const step = (now) => { const t = Math.min(1, (now - t0) / duration); scroller.scrollTop = from + (to - from) * e(t); t < 1 ? requestAnimationFrame(step) : done(); }; requestAnimationFrame(step); });
      }, [dy, duration, within ?? null]);
    },
    async scrollTop({ duration = 1200, within } = {}) {
      const at = await page.evaluate((within) => (within ? document.querySelector(within) : document.scrollingElement).scrollTop, within ?? null);
      if (at > 0) await h.scrollBy(-at, { duration, within });
    },
    async hover(locator, { duration } = {}) {
      await h.reveal(locator);
      const box = await locator.boundingBox();
      await h.move(box.x + Math.min(box.width / 2, 70), box.y + box.height / 2, duration);
      return box;
    },
    /** Click like a person. Form controls get the camera; buttons and links pull it back out. */
    async click(locator, { pause = 220, zoom } = {}) {
      const control = zoom ?? (await isControl(locator));
      const box = await h.hover(locator);
      if (control) focus(await columnCentre(locator), box.y + box.height / 2);
      await sleep(pause);
      await page.mouse.down(); await sleep(70); await page.mouse.up();
      if (!control) wide();
      await sleep(250);
    },
    async type(locator, text, { delay = 38 } = {}) {
      await h.click(locator, { zoom: true });
      await page.keyboard.press("ControlOrMeta+a"); await page.keyboard.press("Backspace");
      for (const ch of text) { await page.keyboard.type(ch); await sleep(delay * (0.55 + Math.random() * 0.9)); }
      await sleep(200);
    },
    async fill(locator, value) { await h.click(locator, { zoom: true }); await locator.fill(value); await sleep(250); },
    async select(locator, label) { await h.click(locator, { zoom: true }); await locator.selectOption({ label }); await sleep(300); },
    async upload(locator, file) {
      const label = locator.locator("xpath=ancestor-or-self::*[self::label or self::div][1]");
      try { const box = await h.hover(label.first()); focus(await columnCentre(label.first()), box.y + box.height / 2); } catch {}
      await locator.setInputFiles(file); await sleep(400);
    },
    /** A full-screen title card drawn in the app's own font, faded in over the page. */
    async card({ eyebrow = "", title, subtitle = "", media }) {
      wide();
      await page.evaluate(([eyebrow, title, subtitle, media, brand]) => {
        document.getElementById("__wt_card")?.remove();
        const card = document.createElement("div");
        card.id = "__wt_card";
        const font = getComputedStyle(document.body).fontFamily;
        card.style.cssText = `position:fixed;inset:0;z-index:2147483640;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:${brand.background};color:${brand.text};font-family:${font};opacity:0;transition:opacity .9s ease`;
        card.innerHTML = (media ? `<video src="${media}" autoplay muted loop playsinline style="width:560px;max-width:60vw;margin-bottom:6px"></video>` : "") +
          (eyebrow ? `<div style="letter-spacing:.14em;text-transform:uppercase;font-size:13px;color:${brand.accent}">${eyebrow}</div>` : "") +
          `<div style="font-size:52px;letter-spacing:-.02em;font-weight:500;text-align:center;max-width:900px;line-height:1.1">${title}</div>` +
          (subtitle ? `<div style="font-size:19px;color:${brand.muted};text-align:center;max-width:640px;line-height:1.5">${subtitle}</div>` : "");
        document.body.appendChild(card);
        requestAnimationFrame(() => requestAnimationFrame(() => { card.style.opacity = "1"; }));
      }, [eyebrow, title, subtitle, media ?? null, brand]);
      if (media) {
        // A renamed or missing asset would leave an empty card in the video, so stop the take instead.
        const ok = await page.evaluate(() => new Promise((done) => {
          const v = document.querySelector("#__wt_card video");
          if (!v) return done(false);
          if (v.readyState >= 2) return done(true);
          v.addEventListener("loadeddata", () => done(true), { once: true });
          v.addEventListener("error", () => done(false), { once: true });
          setTimeout(() => done(v.readyState >= 2), 8000);
        }));
        if (!ok) throw new Error(`Title card media did not load: ${media}`);
      }
      await sleep(950);
    },
    async uncard() {
      await page.evaluate(() => { const c = document.getElementById("__wt_card"); if (c) { c.style.opacity = "0"; setTimeout(() => c.remove(), 950); } });
      await sleep(950);
    },
  };
  return h;
}

/** ffmpeg expression for a value that eases (smoothstep) from keyframe to keyframe. `in` is the frame index. */
function easedExpr(keys, field, start, duration, fps) { // `n` is the frame index
  let expr = `${start}`;
  let prev = start;
  for (const key of keys) {
    const delta = key[field] - prev;
    if (Math.abs(delta) > 1e-4) {
      const u = `clip((n/${fps}-${key.at.toFixed(3)})/${duration},0,1)`;
      expr += `+(${delta.toFixed(4)})*${u}*${u}*(3-2*${u})`;
    }
    prev = key[field];
  }
  return expr;
}

/** Text to speech through Deepgram, cached by text. */
async function speak(text, { voice, key, dir }) {
  const file = join(dir, createHash("sha1").update(voice + text).digest("hex").slice(0, 16) + ".mp3");
  if (!existsSync(file)) {
    const res = await fetch(`https://api.deepgram.com/v1/speak?model=${voice}&encoding=mp3`, {
      method: "POST", headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  const seconds = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
  return { file, seconds };
}

export async function run({ dry = false, baseUrl, profile, outDir, scenes, voice, ttsKey, pwFrom, prepare, brand: brandIn, width = 1420, height = 799, scale = 2, zoom = 1.32, fps = 30, output, outWidth = 1920, outHeight = 1080 }) {
  const brand = { ...DEFAULT_BRAND, ...brandIn };
  if (!dry && scenes.some((s) => s.say) && !ttsKey) throw new Error("No TTS key: set DEEPGRAM_API_KEY in the environment (never paste it into a chat).");
  const require = createRequire(pwFrom + "/package.json");
  const { chromium } = require("playwright");
  const framesDir = join(outDir, "frames"), audioDir = join(outDir, "audio");
  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true }); mkdirSync(audioDir, { recursive: true });

  // Narration first, so every scene knows how long it should last.
  if (!dry) for (const scene of scenes) if (scene.say) scene.voice = await speak(scene.say, { voice, key: ttsKey, dir: audioDir });
  console.log(`narration ready: ${scenes.reduce((s, x) => s + (x.voice?.seconds ?? 0), 0).toFixed(1)}s`);

  // Chrome draws at exactly the output resolution: the page lays out at width x height CSS pixels and
  // renders at outWidth / width device pixels each. (Playwright's deviceScaleFactor does not reach the
  // screencast, which then delivers CSS-sized frames that have to be enlarged and look soft.)
  const context = await chromium.launchPersistentContext(profile, {
    channel: "chrome", headless: true, viewport: { width, height }, reducedMotion: "no-preference",
    args: [`--force-device-scale-factor=${(outWidth / width).toFixed(6)}`],
  });
  await context.addInitScript(overlay(brand.accent));
  const page = context.pages()[0] ?? (await context.newPage());
  context.on("page", (p) => { if (p !== page) p.close().catch(() => {}); }); // links that open new tabs
  const h = makeHelpers(page, { width, height, zoom, brand });
  if (prepare) await prepare(h);

  if (dry) {
    for (const [index, scene] of scenes.entries()) {
      console.log(`dry scene ${index + 1}/${scenes.length}`);
      try { await scene.act?.(h); } catch (error) { await page.screenshot({ path: join(outDir, "dry-fail.png") }); console.log("FAILED at scene", index + 1, error.message.split("\n")[0]); await context.close(); process.exit(1); }
    }
    await page.screenshot({ path: join(outDir, "dry-end.png") });
    await context.close();
    console.log("DRY RUN OK");
    return;
  }
  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    const name = String(frames.length).padStart(6, "0") + ".jpg";
    writeFileSync(join(framesDir, name), Buffer.from(data, "base64"));
    frames.push({ name, t: metadata.timestamp, w: Math.round(metadata.deviceWidth), h: Math.round(metadata.deviceHeight) });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 100, maxWidth: outWidth * 2, maxHeight: outHeight * 2, everyNthFrame: 1 });
  await sleep(600);
  const t0 = Date.now() / 1000;
  const marks = [];
  for (const [index, scene] of scenes.entries()) {
    const start = Date.now() / 1000;
    marks.push({ at: start - t0, voice: scene.voice });
    const minMs = (scene.voice?.seconds ?? 0) * 1000 + (scene.gap ?? 450);
    console.log(`scene ${index + 1}/${scenes.length}: ${(scene.say ?? "").slice(0, 60)}`);
    await Promise.all([scene.act ? scene.act(h) : null, sleep(minMs)]);
  }
  await sleep(1200);
  const end = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await context.close();
  const sizes = [...new Set(frames.map((f) => `${f.w}x${f.h}`))];
  if (sizes.length > 1) {
    const first = frames.find((f) => `${f.w}x${f.h}` !== sizes[0]);
    throw new Error(`The page changed size during the take (${sizes.join(", ")}), first at ${(first.t - t0).toFixed(1)}s. Something resized the viewport; the video would be distorted.`);
  }

  const session = {
    t0, end, framesDir, fps, outWidth, outHeight, output, background: brand.background,
    frames,
    marks: marks.map((m) => ({ at: m.at, voice: m.voice ? { file: m.voice.file, seconds: m.voice.seconds } : null, say: scenes.find((x) => x.voice === m.voice)?.say ?? null })),
    camera: h.camera.map((c) => ({ at: c.t - t0, z: c.z, cx: c.cx, cy: c.cy })),
  };
  writeFileSync(join(outDir, "session.json"), JSON.stringify(session));
  assemble(session, outDir);
  console.log(`frames captured: ${frames.length}; video: ${output} (${(end - t0).toFixed(1)}s)`);
  return session;
}

/** Turns a recorded session into the finished 1080p video, captions and all. Safe to re-run. */
export function assemble(session, outDir) {
  const { t0, end, framesDir, frames, fps, outWidth, outHeight, output } = session;
  const pad = "0x" + (session.background ?? DEFAULT_BRAND.background).replace("#", "");
  // Frames arrive only when something paints; hold each until the next one.
  const list = [];
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length ? frames[i + 1].t : end;
    const from = Math.max(frames[i].t, t0 - 0.05);
    if (next <= t0) continue;
    list.push(`file '${join(framesDir, frames[i].name)}'\nduration ${Math.max(0.001, next - from).toFixed(4)}`);
  }
  list.push(`file '${join(framesDir, frames[frames.length - 1].name)}'`);
  writeFileSync(join(outDir, "frames.txt"), "ffconcat version 1.0\n" + list.join("\n") + "\n");

  // The camera: keep the last move of any burst, and never start a move before the previous one lands.
  const keys = [];
  for (const c of session.camera) {
    if (c.at < 0) continue;
    if (keys.length && c.at - keys[keys.length - 1].at < 0.35) keys[keys.length - 1] = { ...c, at: keys[keys.length - 1].at };
    else keys.push({ ...c });
  }
  const D = 0.9;
  const Z = easedExpr(keys, "z", 1, D, fps), CX = easedExpr(keys, "cx", 0.5, D, fps), CY = easedExpr(keys, "cy", 0.5, D, fps);

  // Pass 1: a constant-rate, near-lossless master at capture resolution.
  // (zoompan miscounts frames on the variable-rate concat input, so it never sees it directly.)
  const master = join(outDir, "master.mp4");
  // Frames arrive at output resolution (give or take a rounding pixel), so this crops rather than resamples.
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(outDir, "frames.txt"),
    "-vf", `fps=${fps},crop='min(iw,${outWidth})':'min(ih,${outHeight})':0:0,scale=${outWidth}:${outHeight}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${outWidth}:${outHeight}:(ow-iw)/2:(oh-ih)/2:color=${pad},setsar=1,format=yuv444p`,
    "-c:v", "libx264", "-preset", "veryfast", "-qp", "0", master], { stdio: "inherit" });

  // Pass 2: the camera (eased zoom and pan), fades, narration, 1080p encode.
  const zoom = `zoompan=z='${Z.replaceAll("n/", "in/")}':x='max(0,min(iw-iw/zoom,iw*(${CX.replaceAll("n/", "in/")})-iw/zoom/2))':y='max(0,min(ih-ih/zoom,ih*(${CY.replaceAll("n/", "in/")})-ih/zoom/2))':d=1:s=${outWidth}x${outHeight}:fps=${fps}`;
  const voiced = session.marks.filter((m) => m.voice);
  const inputs = voiced.flatMap((m) => ["-i", m.voice.file]);
  const delays = voiced.map((m, i) => `[${i + 1}:a]adelay=${Math.round(m.at * 1000)}|${Math.round(m.at * 1000)}[a${i}]`).join(";");
  // A silent take (no narration yet) still gets an audio track, so players and the length check behave the same.
  const mix = voiced.length
    ? voiced.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${voiced.length}:normalize=0:dropout_transition=0,loudnorm=I=-16:TP=-1.5:LRA=11[aout]`
    : `anullsrc=r=48000:cl=stereo,atrim=0:${(end - t0).toFixed(3)}[aout]`;
  // No camera moves: leave the frames untouched instead of passing them through zoompan's resampler.
  const zoomed = keys.some((k) => Math.abs(k.z - 1) > 1e-3);
  const graph = `[0:v]${zoomed ? zoom + "," : ""}setsar=1,format=yuv420p,fade=t=in:st=0:d=0.6,fade=t=out:st=${(end - t0 - 0.8).toFixed(2)}:d=0.8[vout];${delays ? delays + ";" : ""}${mix}`;
  writeFileSync(join(outDir, "graph.txt"), graph);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", master, ...inputs, "-filter_complex", graph,
    "-map", "[vout]", "-map", "[aout]", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-tune", "stillimage", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-movflags", "+faststart", "-shortest", output], { stdio: "inherit" });

  // Captions from the narration, timed to the scenes.
  const ts = (x) => new Date(Math.max(0, x) * 1000).toISOString().slice(11, 23);
  const vtt = ["WEBVTT", ""];
  for (const m of voiced) {
    const parts = m.say.match(/[^.!?]+[.!?]+/g) ?? [m.say];
    const total = parts.reduce((n, p) => n + p.length, 0);
    let at = m.at;
    for (const part of parts) { const d = (m.voice.seconds * part.length) / total; vtt.push(`${ts(at)} --> ${ts(at + d)}`, part.trim(), ""); at += d; }
  }
  writeFileSync(output.replace(/\.mp4$/, ".en.vtt"), vtt.join("\n"));
}
