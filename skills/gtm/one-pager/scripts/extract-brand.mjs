#!/usr/bin/env node
/**
 * extract-brand.mjs
 *
 * Resolves a company's design theme from one of the two acceptable sources
 * and writes a draft token file plus copies of the logo and font assets.
 *
 *   node extract-brand.mjs <brand.zip>                 work/
 *   node extract-brand.mjs <path/to/brand-repo>        work/
 *   node extract-brand.mjs https://github.com/org/repo work/
 *   node extract-brand.mjs --pdf <guidelines.pdf>
 *
 * Writes work/brand.json and work/assets/*.
 *
 * The output is a DRAFT. The script can find hex values and font files; it
 * cannot know which colour is the accent and which is a chart tint. Read
 * work/brand.json afterwards and assign the roles yourself. See
 * references/brand-intake.md.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";

const argv = process.argv.slice(2);

if (argv[0] === "--pdf") {
  rankPdfColours(path.resolve(argv[1]));
  process.exit(0);
}

const source = argv[0];
const outDir = path.resolve(argv[1] || "work");
if (!source) {
  console.error("usage: extract-brand.mjs <zip|dir|git-url> [outDir]   |   extract-brand.mjs --pdf <file.pdf>");
  process.exit(2);
}

const assetsDir = path.join(outDir, "assets");
fs.mkdirSync(assetsDir, { recursive: true });

const root = materialise(source, outDir);
console.log(`Reading brand source: ${root}`);

const files = walk(root).filter((f) => !/[\\/](node_modules|\.git)[\\/]/.test(f));

/* ------------------------------------------------------------ named tokens */

const named = {};
const namedFonts = new Set(); // from `family: "Clash Grotesk"` style declarations, most reliable
const cssFonts = new Set(); // from CSS font-family declarations, noisier
let name = null;

const GENERIC_FONT = /^(inherit|initial|unset|sans-serif|serif|monospace|system-ui|ui-[\w-]+|-apple-system|blinkmacsystemfont|segoe ui|roboto|helvetica.*|arial.*|times.*|courier.*|brush script.*|comic sans.*|emoji|cursive|fantasy)$/i;

function noteFontStack(raw) {
  for (const part of String(raw).split(",")) {
    const fam = part.trim().replace(/["']/g, "");
    if (!fam || /^var\(/.test(fam) || GENERIC_FONT.test(fam)) continue;
    cssFonts.add(fam);
  }
}

for (const f of files) {
  const base = path.basename(f).toLowerCase();
  const isTokenFile =
    /^(brand|tokens|theme)\.(ts|js|mjs|json)$/.test(base) ||
    /^(globals|theme|tokens|brandbook)\.css$/.test(base) ||
    /^tailwind\.config\./.test(base) ||
    /^(typography)\.(ts|js)$/.test(base) ||
    /^theme-.*\.json$/.test(base);
  if (!isTokenFile) continue;
  const text = safeRead(f);
  if (!text) continue;
  console.log(`  token file: ${path.relative(root, f)}`);

  /* key: "#RRGGBB" in TS/JS objects, JSON and CSS custom properties alike */
  for (const m of text.matchAll(/(?:--)?([A-Za-z][\w-]{1,40})\s*:\s*["']?(#[0-9a-fA-F]{3,8})\b/g)) {
    named[m[1]] = m[2].toUpperCase();
  }
  for (const m of text.matchAll(/\bfamily\s*:\s*["']([^"']+)["']/g)) {
    const fam = m[1].trim();
    if (!/^var\(/.test(fam) && !GENERIC_FONT.test(fam)) namedFonts.add(fam);
  }
  for (const m of text.matchAll(/font-family\s*:\s*([^;}]+)/g)) noteFontStack(m[1]);
  const n = text.match(/\bname\s*:\s*["']([^"']+)["']/);
  if (n && !name) name = n[1];
}

/* --------------------------------------------------- frequency-ranked hexes */

const counts = new Map();
for (const f of files) {
  if (!/\.(ts|tsx|js|jsx|mjs|css|scss|json|svg|md|txt|html)$/i.test(f)) continue;
  const text = safeRead(f);
  if (!text) continue;
  for (const m of text.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    const hex = m[0].toUpperCase();
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
}
const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24);

/* ------------------------------------------------------------ copy assets */

const copied = { logos: [], fonts: [] };
for (const f of files) {
  const ext = path.extname(f).toLowerCase();
  const base = path.basename(f);
  if ([".woff2", ".woff", ".ttf", ".otf"].includes(ext)) {
    fs.copyFileSync(f, path.join(assetsDir, base));
    copied.fonts.push(base);
  } else if ([".svg", ".png"].includes(ext) && /logo|wordmark|mark|lockup/i.test(f)) {
    fs.copyFileSync(f, path.join(assetsDir, base));
    copied.logos.push(base);
  }
}

/* ------------------------------------------------------------- draft tokens */

/* Families declared in a typography token file are trustworthy; CSS stacks are a fallback. */
const families = [...new Set([...namedFonts, ...cssFonts])];

const pick = (...keys) => {
  for (const k of keys) {
    const hit = Object.keys(named).find((n) => n.toLowerCase() === k.toLowerCase());
    if (hit) return named[hit];
  }
  return null;
};

/* SVG beats PNG, and a standard lockup beats a reversed one for the light header. */
const byPreference = [...copied.logos].sort(
  (a, b) => (path.extname(b).toLowerCase() === ".svg") - (path.extname(a).toLowerCase() === ".svg"),
);
const isReversed = (l) => /revers|white|on-?dark|knockout/i.test(l);
const logoLight = byPreference.find((l) => !isReversed(l)) || byPreference[0] || null;
const logoRev = byPreference.find(isReversed) || null;

const draft = {
  name: name || path.basename(root),
  canvas: "#FAF8F4",
  surface: "#FFFFFF",
  surfaceAlt: "#F3F5F8",
  ink: pick("ink", "matteBlack", "black", "foreground") || "#111214",
  body: "#3A3A3F",
  muted: "#6E6E76",
  faint: "#9BA6AE",
  accent: pick("accent", "oceanBlue", "primary", "brand") || (ranked[0]?.[0] ?? "#1F3A5F"),
  accentDeep: pick("darkBlue", "deepTeal", "primaryDark", "navy", "accentDeep") || (ranked[1]?.[0] ?? "#1F3A5F"),
  onAccent: "#FFFFFF",
  hairline: "#E4E0D9",
  warning: "#C47C48",
  danger: "#C76B62",
  radius: 10,
  fonts: {
    display: stack(families[0]),
    body: stack(families[1] || families[0]),
    mono: "ui-monospace, 'SFMono-Regular', Menlo, monospace",
  },
  fontFiles: copied.fonts.map((f) => ({
    family: guessFamily(f),
    weight: guessWeight(f),
    style: /italic|oblique/i.test(f) ? "italic" : "normal",
    path: `assets/${f}`,
  })),
  logo: logoLight ? `assets/${logoLight}` : null,
  logoReversed: logoRev ? `assets/${logoRev}` : null,
  _draft: {
    note: "Roles below were guessed. Read references/brand-intake.md and correct them before building.",
    namedTokensFound: named,
    rankedHexes: ranked.map(([hex, n]) => `${hex} x${n}`),
    fontFamiliesFound: families,
  },
};

const outFile = path.join(outDir, "brand.json");
fs.writeFileSync(outFile, JSON.stringify(draft, null, 2));

console.log(`\nWrote ${outFile}`);
console.log(`  named tokens : ${Object.keys(named).length}`);
console.log(`  logos copied : ${copied.logos.length}${copied.logos.length ? "  (" + copied.logos.slice(0, 6).join(", ") + ")" : ""}`);
console.log(`  fonts copied : ${copied.fonts.length}`);
console.log(`  top colours  : ${ranked.slice(0, 8).map(([h, n]) => `${h} x${n}`).join("  ")}`);
console.log(`\nThis is a draft. Assign the colour roles by hand before building.`);
if (!copied.logos.length) console.log(`No logo file found. Set meta.wordmark in onepager.json and the header will be set as type.`);

/* ------------------------------------------------------------------ helpers */

function materialise(src, out) {
  if (/^https?:\/\/|^git@/.test(src)) {
    const dest = path.join(out, "_brand-src");
    if (fs.existsSync(dest)) return dest;
    console.log(`Cloning ${src} ...`);
    execFileSync("git", ["clone", "--depth", "1", src, dest], { stdio: "inherit" });
    return dest;
  }
  const abs = path.resolve(src);
  if (!fs.existsSync(abs)) {
    console.error(`No such file or directory: ${abs}`);
    process.exit(1);
  }
  if (fs.statSync(abs).isDirectory()) return abs;
  if (/\.zip$/i.test(abs)) {
    const dest = path.join(out, "_brand-src");
    fs.mkdirSync(dest, { recursive: true });
    try {
      execFileSync("unzip", ["-o", "-q", abs, "-d", dest], { stdio: "inherit" });
    } catch {
      console.error("unzip failed. Extract the archive by hand and pass the directory instead.");
      process.exit(1);
    }
    return dest;
  }
  console.error(`Unsupported source: ${abs}. Pass a zip, a directory, or a git URL.`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".git") continue;
      walk(p, acc);
    } else acc.push(p);
  }
  return acc;
}

function safeRead(f) {
  try {
    if (fs.statSync(f).size > 2 * 1024 * 1024) return null;
    return fs.readFileSync(f, "utf8");
  } catch {
    return null;
  }
}

function stack(family) {
  if (!family) return "system-ui, -apple-system, 'Segoe UI', sans-serif";
  if (/,/.test(family)) return family;
  return `'${family}', system-ui, -apple-system, sans-serif`;
}

function guessFamily(file) {
  return path
    .basename(file, path.extname(file))
    .replace(/[-_](thin|extralight|light|regular|book|medium|semibold|bold|extrabold|black|italic|oblique|variable|vf)\b/gi, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function guessWeight(file) {
  const map = { thin: 100, extralight: 200, light: 300, regular: 400, book: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const m = path.basename(file).toLowerCase().match(/thin|extralight|light|regular|book|medium|semibold|bold|extrabold|black/);
  return m ? map[m[0]] : 400;
}

/**
 * Rank the fill colours actually used in a PDF, most frequent first.
 * Useful when the only brand source is a guidelines PDF whose swatches
 * carry no text labels.
 */
function rankPdfColours(file) {
  const d = fs.readFileSync(file);
  const counts = new Map();
  let at = 0;
  while (true) {
    const i = d.indexOf("stream", at);
    if (i < 0) break;
    let s = i + 6;
    while (d[s] === 13 || d[s] === 10) s++;
    const e = d.indexOf("endstream", s);
    at = e < 0 ? d.length : e + 9;
    if (e < 0) break;
    let c;
    try {
      c = zlib.inflateSync(d.subarray(s, e));
    } catch {
      continue;
    }
    const text = c.toString("latin1");
    if (!text.includes("BT")) continue;
    for (const m of text.matchAll(/([\d.]+) ([\d.]+) ([\d.]+) (rg|RG)\b/g)) {
      const hex =
        "#" +
        [m[1], m[2], m[3]]
          .map((v) => Math.round(parseFloat(v) * 255).toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase();
      counts.set(hex, (counts.get(hex) || 0) + 1);
    }
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (!ranked.length) {
    console.log("No text-layer fill colours found. The PDF may be a flattened image.");
    return;
  }
  console.log(`Fill colours in ${path.basename(file)}, most used first:\n`);
  for (const [hex, n] of ranked.slice(0, 24)) console.log(`  ${hex}   x${n}`);
  console.log(`\nAssign these to roles by hand. See references/brand-intake.md.`);
}
