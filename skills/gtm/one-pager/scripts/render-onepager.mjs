#!/usr/bin/env node
/**
 * render-onepager.mjs
 *
 * Renders a built one-pager HTML file to a PDF and a PNG at the exact page box,
 * and fails loudly if the content does not fit on a single page.
 *
 *   node render-onepager.mjs <page.html> [--type 1|2] [--scale-to-fit]
 *
 * Writes <page>.pdf and <page>.png beside the input.
 *
 * Chromium is pre-installed in this environment (PLAYWRIGHT_BROWSERS_PATH is set),
 * so there is no need to run "playwright install".
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const input = path.resolve(args.find((a) => !a.startsWith("--")) || "");
const scaleToFit = args.includes("--scale-to-fit");
const typeArg = args[args.indexOf("--type") + 1];

if (!input || !fs.existsSync(input)) {
  console.error("usage: render-onepager.mjs <page.html> [--type 1|2] [--scale-to-fit]");
  process.exit(2);
}

const html = fs.readFileSync(input, "utf8");
const type = typeArg || (html.includes("sheet2") ? "2" : "1");

/* Page boxes. Type 1 is 16:9 in CSS px; type 2 is A4 landscape in mm. */
const BOX = type === "2"
  ? { width: 1123, height: 794, pdf: { format: "A4", landscape: true } }
  : { width: 1440, height: 810, pdf: { width: "1440px", height: "810px" } };

const { chromium } = await importPlaywright();

const executablePath = findChromium();
const browser = await chromium.launch(executablePath ? { executablePath, headless: true } : { headless: true });
const page = await browser.newPage({ viewport: { width: BOX.width, height: BOX.height }, deviceScaleFactor: 2 });

await page.goto(pathToFileURL(input).href, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });

/* Overflow check: the sheet must fit its own box, and nothing may escape it. */
const fit = await page.evaluate(() => {
  const sheet = document.querySelector(".sheet, .sheet2");
  if (!sheet) return { error: "no .sheet element found" };
  const box = sheet.getBoundingClientRect();
  let worstOverflow = 0;
  let worstEl = null;
  for (const el of sheet.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    const over = Math.max(r.bottom - box.bottom, r.right - box.right);
    if (over > worstOverflow) {
      worstOverflow = over;
      worstEl = `${el.tagName.toLowerCase()}.${el.className || ""}`.slice(0, 80);
    }
  }
  return {
    scrollHeight: sheet.scrollHeight,
    clientHeight: sheet.clientHeight,
    scrollWidth: sheet.scrollWidth,
    clientWidth: sheet.clientWidth,
    worstOverflow: Math.round(worstOverflow),
    worstEl,
  };
});

if (fit.error) {
  console.error(fit.error);
  await browser.close();
  process.exit(1);
}

const spill = Math.max(fit.scrollHeight - fit.clientHeight, fit.scrollWidth - fit.clientWidth, fit.worstOverflow);

if (spill > 2) {
  if (scaleToFit) {
    /* Last resort. Shrinking type is worse than cutting copy, so this is opt-in only. */
    const scale = fit.clientHeight / fit.scrollHeight;
    await page.evaluate((s) => {
      const sheet = document.querySelector(".sheet, .sheet2");
      const wrap = document.createElement("div");
      wrap.style.transformOrigin = "top left";
      wrap.style.transform = `scale(${s})`;
      wrap.style.width = `${100 / s}%`;
      while (sheet.firstChild) wrap.appendChild(sheet.firstChild);
      sheet.appendChild(wrap);
    }, scale);
    console.warn(`WARNING: content overflowed by ${spill}px and was scaled to ${(scale * 100).toFixed(1)}%. Cut copy instead.`);
  } else {
    console.error(
      `FAILED: content overflows the page by ${spill}px (worst offender: ${fit.worstEl}).\n` +
        `Cut copy or drop an optional element, then rebuild. Pass --scale-to-fit only as a last resort.`,
    );
    await browser.close();
    process.exit(1);
  }
}

const base = input.replace(/\.html?$/i, "");
await page.screenshot({ path: `${base}.png`, fullPage: false });
await page.pdf({ path: `${base}.pdf`, printBackground: true, pageRanges: "1", ...BOX.pdf });
await browser.close();

console.log(`Wrote ${base}.pdf`);
console.log(`Wrote ${base}.png   <- open this and actually look at it`);

/* ------------------------------------------------------------------ helpers */

async function importPlaywright() {
  for (const mod of ["playwright-core", "playwright"]) {
    try {
      return await import(mod);
    } catch {
      /* try the next one */
    }
  }
  console.error(
    "playwright-core is not installed. Run:  npm i -D playwright-core\n" +
      "Chromium itself is already present, so do not run 'playwright install'.",
  );
  process.exit(1);
}

function findChromium() {
  const candidates = [
    process.env.CHROME_PATH,
    "/opt/pw-browsers/chromium",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);
  const hit = candidates.find((c) => fs.existsSync(c));
  if (hit && fs.statSync(hit).isDirectory()) {
    /* /opt/pw-browsers/chromium is a directory in some images; let playwright resolve it. */
    return null;
  }
  return hit || null;
}
