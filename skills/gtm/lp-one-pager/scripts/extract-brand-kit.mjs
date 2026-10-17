#!/usr/bin/env node
/**
 * extract-brand-kit.mjs
 *
 * Resolves a fellow's brand kit into the token file the LP one pager builds from.
 *
 *   node extract-brand-kit.mjs <kit.zip|kit-dir|git-url> work/
 *
 * A brand kit in this house is not a folder of logos. It is a small design
 * system, and the three files that matter are:
 *
 *   *-design-language.md   the authoritative spec: palette with named roles,
 *                          type system, component rules, do's and don'ts,
 *                          and usually a "Quick Reference Tokens" block
 *   *.assets.json          the machine-readable manifest: every asset with an
 *                          id, kind, src, usage and placements
 *   Design assets/Logo/    the actual marks
 *
 * This script reads all three, in that order of authority, and writes
 * work/brand.json plus copies of the usable assets into work/assets/.
 *
 * It reports what the manifest promises but the kit does not contain, which is
 * common and is the single most useful thing it tells you.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [, , source, outArg] = process.argv;
if (!source) {
  console.error("usage: extract-brand-kit.mjs <kit.zip|kit-dir|git-url> [outDir]");
  process.exit(2);
}

const outDir = path.resolve(outArg || "work");
const assetsDir = path.join(outDir, "assets");
fs.mkdirSync(assetsDir, { recursive: true });

const root = materialise(source, outDir);
const files = walk(root).filter((f) => !/[\\/](node_modules|\.git)[\\/]/.test(f));
console.log(`Reading brand kit: ${root}  (${files.length} files)`);

/* ------------------------------------------------- 1. the design language */

const langFile = files.find((f) => /design-language\.md$/i.test(f)) || files.find((f) => /brand-?(guide|language|system)\.md$/i.test(f));
const lang = langFile ? fs.readFileSync(langFile, "utf8") : "";
if (langFile) console.log(`  design language : ${path.relative(root, langFile)}`);

/* The "Quick Reference Tokens" fenced block is the highest-signal thing in the
   file when it exists: one role per line, already disambiguated by the author. */
const quick = {};
const quickBlock = lang.match(/Quick Reference Tokens[\s\S]*?```([\s\S]*?)```/i);
if (quickBlock) {
  for (const line of quickBlock[1].split("\n")) {
    const m = line.match(/^\s*([A-Za-z][\w /()-]*?)\s*:\s*(.+?)\s*$/);
    if (m) quick[m[1].trim().toLowerCase()] = m[2].trim();
  }
}

/* Role tables: | Role | `#HEX` | Name | Usage | in any column order. */
const namedColours = [];
for (const row of lang.split("\n")) {
  if (!row.trim().startsWith("|")) continue;
  const hex = row.match(/`(#[0-9a-fA-F]{6})`/);
  if (!hex) continue;
  const cells = row.split("|").map((c) => c.trim().replace(/`/g, "").replace(/\s*★\s*/g, ""));
  const role = cells[1] || "";
  const name = cells.find((c, i) => i > 1 && c && !c.startsWith("#") && c.length < 24 && c !== role) || "";
  namedColours.push({ role, name, hex: hex[1].toUpperCase() });
}

const findColour = (...patterns) => {
  for (const p of patterns) {
    const re = new RegExp(p, "i");
    const hit = namedColours.find((c) => re.test(c.role) || re.test(c.name));
    if (hit) return hit.hex;
  }
  return null;
};
const fromQuick = (...keys) => {
  for (const k of keys) {
    const hit = Object.entries(quick).find(([q]) => q.includes(k));
    if (hit) {
      const hex = hit[1].match(/#[0-9a-fA-F]{6}/);
      if (hex) return hex[0].toUpperCase();
    }
  }
  return null;
};

/* Typefaces. The quick-reference block assigns faces to duties explicitly, so
   trust it first; the prose and the type-hierarchy table are the fallback. A
   layout table ("Page margin | 24px") looks identical to a type table to a
   regex, so anything that is plainly a layout term is dropped. */
const LAYOUT_TERM = /^(page|content|grid|section|column|row|margin|padding|gutter|radius|spacing|width|height|max|min|border|range|level|status|state|element|value|role|usage|name)\b/i;
const cleanFace = (v) =>
  String(v || "")
    .split(/[,;]/)[0]
    .replace(/\b\d{3}(\s*\/\s*\d{3})*\b/g, "")
    .replace(/\b(tabular-nums|uppercase|tracked|italic)\b/gi, "")
    .trim();

const faces = [];
for (const key of ["display", "heading", "body", "data", "figures", "mono"]) {
  const hit = Object.entries(quick).find(([q]) => q.includes(key));
  if (hit) faces.push(cleanFace(hit[1]));
}
for (const m of lang.matchAll(/\*\*([A-Z][A-Za-z0-9 ]{2,30}?)\*\*\s*[—-]\s*(display|data|body|heading)/gi)) faces.push(m[1].trim());
for (const m of lang.matchAll(/\|[^|]*\|\s*([A-Z][A-Za-z0-9 ]{2,28}?)\s*\|\s*[\d–-]+\s*(?:px|pt)\b/g)) faces.push(m[1].trim());

const uniqueFaces = [...new Set(faces.map((f) => f.replace(/\s+/g, " ").trim()))].filter(
  (f) => f && f.length > 2 && !LAYOUT_TERM.test(f),
);
const monoFace = uniqueFaces.find((f) => /mono/i.test(f)) || null;
const displayFace = uniqueFaces.find((f) => !/mono/i.test(f)) || null;

/* Radius, and the brand's own border treatment, which is often a shadow-border. */
const radius = Number((lang.match(/Radius:?\s*(\d+)px/i) || [])[1]) || 8;
const borderShadow = (lang.match(/box-shadow:\s*0 0 0 1px rgba\([^)]*\)/i) || [])[0] || null;
const tagline = (lang.match(/Tagline:\s*(.+)/) || [])[1]?.trim() || null;
const neverSay = (lang.match(/Never say:\s*(.+)/) || [])[1]?.trim() || null;

/* -------------------------------------------------- 2. the asset manifest */

const manifestFile = files.find((f) => /\.assets\.json$/i.test(f));
let manifest = null;
const missing = [];
const present = [];
if (manifestFile) {
  console.log(`  asset manifest  : ${path.relative(root, manifestFile)}`);
  try {
    manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  } catch (err) {
    console.warn(`  WARNING: manifest did not parse: ${err.message}`);
  }
}
const byId = {};
for (const a of manifest?.assets || []) {
  const abs = findInKit(a.src);
  (abs ? present : missing).push(a);
  if (abs) byId[a.id] = { ...a, abs };
}

/* ------------------------------------------------------- 3. copy what exists */

const copied = { logos: [], fonts: [], images: [] };
const copy = (abs, name) => {
  const dest = path.join(assetsDir, name);
  fs.copyFileSync(abs, dest);
  return `assets/${name}`;
};

for (const f of files) {
  const ext = path.extname(f).toLowerCase();
  const safe = path.basename(f).replace(/[^\w.() -]/g, "").replace(/\s+/g, "-").toLowerCase();
  if ([".woff2", ".woff", ".ttf", ".otf"].includes(ext)) copied.fonts.push(copy(f, safe));
  else if ([".svg", ".png"].includes(ext) && /logo|wordmark|mark|lockup/i.test(f)) copied.logos.push(copy(f, safe));
  else if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext) && /preview|hero|banner|photo/i.test(f)) copied.images.push(copy(f, safe));
}

/* Prefer the manifest's own opinion about which logo is primary. */
const manifestLogo = (id) => {
  const a = byId[id];
  if (!a) return null;
  const safe = path.basename(a.abs).replace(/[^\w.() -]/g, "").replace(/\s+/g, "-").toLowerCase();
  return `assets/${safe}`;
};
const primaryLogo =
  (manifest?.assets || []).filter((a) => a.kind === "logo" && byId[a.id]).map((a) => manifestLogo(a.id))[0] ||
  copied.logos.find((l) => l.endsWith(".svg")) ||
  copied.logos[0] ||
  null;
const taglineLogo = copied.logos.find((l) => /tagline/i.test(l)) || null;

/* --------------------------------------------------------- 4. write tokens */

const canvas = fromQuick("canvas") || findColour("^canvas$", "canvas") || "#FFFFFF";
/* Panels on a light ground are white. The brand's named "reading surface"
   (Timid White and friends) is a step down from white and is the right fill
   for chips and inner wells, not for the card itself. */
const readingSurface = fromQuick("reading surface") || findColour("light reading|reading surface|timid") || "#FFFFFF";
const surface = "#FFFFFF";
const ink = fromQuick("structure") || findColour("^structure", "dark blue") || "#192B39";
const maxContrast = fromQuick("max contrast") || findColour("maximum contrast|matte black") || "#141414";
const panel = fromQuick("panel") || findColour("secondary surface|charcoal") || "#2F3F4C";
const accent = fromQuick("^accent$", "accent:") || findColour("brand accent") || "#3E8ECC";
const accentDeep = fromQuick("accent pressed") || findColour("pressed|deep accent") || accent;
const soft = fromQuick("soft highlight") || findColour("soft highlight|ocean 200") || "#B9D5EE";
const logoOnLight = fromQuick("logo on light") || findColour("logo on light|deep teal") || ink;

const brand = {
  name: (manifest?.assets?.[0]?.credit) || path.basename(root).replace(/[-_]/g, " "),
  tagline,
  canvas,
  surface,
  surfaceAlt: readingSurface,
  highlight: soft,
  ink,
  maxContrast,
  panel,
  body: mix(ink, 0.82),
  muted: mix(ink, 0.58),
  faint: mix(ink, 0.4),
  accent,
  accentDeep,
  onAccent: readingSurface,
  hairline: `rgba(25,43,57,0.14)`,
  borderShadow: borderShadow || "0 0 0 1px rgba(25,43,57,0.10)",
  positive: "#398E4A",
  danger: "#E5484D",
  neutral: "#8F8F8F",
  /* Monochromatic by design: a brand that reserves its accent for function
     does not get a rainbow chart ramp. Deepest first. */
  chart: [accent, accentDeep, panel, soft],
  logoOnDark: readingSurface,
  radius,
  radiusCard: radius + 4,
  fonts: {
    display: stack(displayFace),
    body: stack(displayFace),
    mono: stack(monoFace, "ui-monospace, 'SFMono-Regular', Menlo, monospace"),
  },
  fontFiles: copied.fonts.map((p) => ({
    family: guessFamily(p),
    weight: guessWeight(p),
    style: /italic/i.test(p) ? "italic" : "normal",
    path: p,
  })),
  logo: primaryLogo,
  logoTagline: taglineLogo,
  logoOnLight,
  _kit: {
    designLanguage: langFile ? path.relative(root, langFile) : null,
    namedColours,
    quickTokens: quick,
    typefacesFound: uniqueFaces,
    neverSay,
    manifestPresent: present.map((a) => a.id),
    manifestMissing: missing.map((a) => ({ id: a.id, src: a.src })),
  },
};

fs.writeFileSync(path.join(outDir, "brand.json"), JSON.stringify(brand, null, 2));

console.log(`\nWrote ${path.join(outDir, "brand.json")}`);
console.log(`  palette roles   : ${namedColours.length} named, ${Object.keys(quick).length} quick tokens`);
console.log(`  typefaces       : ${uniqueFaces.join(", ") || "none named"}`);
console.log(`  logos copied    : ${copied.logos.length}`);
console.log(`  font files      : ${copied.fonts.length}`);
if (!copied.fonts.length && uniqueFaces.length) {
  console.log(`\n  The kit names ${uniqueFaces.join(" and ")} but ships no font files.`);
  console.log(`  Source them, or embed a licensed substitute and say so in your reply.`);
}
if (missing.length) {
  console.log(`\n  The manifest lists ${missing.length} asset(s) this kit does not contain:`);
  for (const a of missing) console.log(`    - ${a.id}  (${a.src})`);
  console.log(`  Ask for them before claiming the kit is complete.`);
}
if (neverSay) console.log(`\n  Banned words in this brand's voice: ${neverSay}`);

/* ------------------------------------------------------------------ helpers */

function findInKit(relSrc) {
  if (!relSrc) return null;
  const base = path.basename(relSrc);
  return files.find((f) => f.endsWith(relSrc.split("/").join(path.sep))) || files.find((f) => path.basename(f) === base) || null;
}

function materialise(src, out) {
  if (/^https?:\/\/|^git@/.test(src)) {
    const dest = path.join(out, "_kit");
    if (!fs.existsSync(dest)) execFileSync("git", ["clone", "--depth", "1", src, dest], { stdio: "inherit" });
    return dest;
  }
  const abs = path.resolve(src);
  if (!fs.existsSync(abs)) {
    console.error(`No such file or directory: ${abs}`);
    process.exit(1);
  }
  if (fs.statSync(abs).isDirectory()) return abs;
  if (/\.zip$/i.test(abs)) {
    const dest = path.join(out, "_kit");
    fs.mkdirSync(dest, { recursive: true });
    execFileSync("unzip", ["-o", "-q", abs, "-d", dest], { stdio: "inherit" });
    /* Unwrap a single top-level folder so paths in the manifest still resolve. */
    const entries = fs.readdirSync(dest);
    if (entries.length === 1 && fs.statSync(path.join(dest, entries[0])).isDirectory()) return path.join(dest, entries[0]);
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

/** Lighten a hex toward white by `t`, used to derive body and muted from ink. */
function mix(hex, t) {
  const n = parseInt(hex.slice(1), 16);
  const f = (sh) => Math.round(((n >> sh) & 255) * t + 255 * (1 - t));
  return `#${[f(16), f(8), f(0)].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function stack(family, fallback = "system-ui, -apple-system, 'Segoe UI', sans-serif") {
  return family ? `'${family}', ${fallback}` : fallback;
}

function guessFamily(file) {
  return path
    .basename(file, path.extname(file))
    .replace(/[-_](latin|latin-ext|cyrillic|greek|vietnamese)/gi, "")
    .replace(/[-_](\d{3})[-_](normal|italic)/gi, "")
    .replace(/[-_](thin|extralight|light|regular|book|medium|semibold|bold|extrabold|black|italic|variable|vf)\b/gi, "")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function guessWeight(file) {
  const byNumber = path.basename(file).match(/[-_](\d{3})[-_]/);
  if (byNumber) return Number(byNumber[1]);
  const map = { thin: 100, extralight: 200, light: 300, regular: 400, book: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const m = path.basename(file).toLowerCase().match(/thin|extralight|light|regular|book|medium|semibold|bold|extrabold|black/);
  return m ? map[m[0]] : 400;
}
