#!/usr/bin/env node
/**
 * build-onepager.mjs
 *
 * Turns a content file plus a brand token file into a single self-contained
 * HTML page, with every image and font inlined as a data URI.
 *
 *   node build-onepager.mjs <onepager.json> <brand.json> <outDir>
 *
 * Type 1 renders at 1440 x 810 px (16:9) and sizes everything in px.
 * Type 2 renders at A4 landscape and sizes everything in pt, so the numbers
 * in references/type-2-layout.md map straight onto the CSS.
 */

import fs from "node:fs";
import path from "node:path";

const [, , contentArg, brandArg, outArg] = process.argv;
if (!contentArg || !brandArg) {
  console.error("usage: build-onepager.mjs <onepager.json> <brand.json> [outDir]");
  process.exit(2);
}

const contentPath = path.resolve(contentArg);
const brandPath = path.resolve(brandArg);
const outDir = path.resolve(outArg || path.join(path.dirname(contentPath), "out"));
const searchRoots = [path.dirname(contentPath), path.dirname(brandPath), process.cwd()];

const content = readJson(contentPath);
const brand = withBrandDefaults(readJson(brandPath));
const type = String(content.type || 1);

/* ------------------------------------------------------------------ utils */

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (err) {
    console.error(`Could not read JSON at ${p}: ${err.message}`);
    process.exit(1);
  }
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Escape text for HTML. Content is author-written, but never trust it into markup. */
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveAsset(rel) {
  if (!rel) return null;
  if (/^data:/.test(rel)) return rel;
  for (const root of searchRoots) {
    const p = path.resolve(root, rel);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  console.warn(`WARNING: asset not found, skipping: ${rel}`);
  return null;
}

const MIME = {
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".avif": "image/avif",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf",
};

function dataUri(rel) {
  const p = resolveAsset(rel);
  if (!p) return null;
  if (/^data:/.test(p)) return p;
  const mime = MIME[path.extname(p).toLowerCase()] || "application/octet-stream";
  const buf = fs.readFileSync(p);
  if (buf.length > 4 * 1024 * 1024) {
    console.warn(`WARNING: ${rel} is ${(buf.length / 1048576).toFixed(1)} MB. Downscale it before building.`);
  }
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/** <img> with the file inlined. Returns "" when the asset is missing, so layouts close up. */
function img(rel, cls, alt = "") {
  const uri = dataUri(rel);
  if (!uri) return "";
  return `<img class="${cls}" src="${uri}" alt="${esc(alt)}">`;
}

function withBrandDefaults(b) {
  const d = {
    name: "Company",
    canvas: "#FAF8F4", surface: "#FFFFFF", surfaceAlt: "#F3F5F8",
    ink: "#111214", body: "#3A3A3F", muted: "#6E6E76", faint: "#9BA6AE",
    accent: "#1F3A5F", accentDeep: "#1F3A5F", onAccent: "#FFFFFF",
    hairline: "#E4E0D9", warning: "#C47C48", danger: "#C76B62",
    radius: 10,
    fonts: {
      display: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      mono: "ui-monospace, 'SFMono-Regular', Menlo, monospace",
    },
    fontFiles: [],
  };
  return { ...d, ...b, fonts: { ...d.fonts, ...(b.fonts || {}) } };
}

function fontFaces(b) {
  return (b.fontFiles || [])
    .map((f) => {
      const uri = dataUri(f.path);
      if (!uri) return "";
      return `@font-face{font-family:"${f.family}";font-weight:${f.weight || 400};font-style:${f.style || "normal"};font-display:block;src:url(${uri})}`;
    })
    .filter(Boolean)
    .join("\n");
}

function vars(b) {
  return `--canvas:${b.canvas};--surface:${b.surface};--surface-alt:${b.surfaceAlt};--ink:${b.ink};--body:${b.body};--muted:${b.muted};--faint:${b.faint};--accent:${b.accent};--accent-deep:${b.accentDeep};--on-accent:${b.onAccent};--hairline:${b.hairline};--warning:${b.warning};--danger:${b.danger};--radius:${b.radius}px;--display:${b.fonts.display};--bodyfont:${b.fonts.body};--mono:${b.fonts.mono}`;
}

function doc({ title, css, bodyHtml, brand }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>
${fontFaces(brand)}
:root{${vars(brand)}}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--canvas);-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
${css}
</style></head><body>${bodyHtml}</body></html>`;
}

/* ------------------------------------------------------------- shared bits */

function wordmark(meta) {
  if (meta?.logo) {
    const el = img(meta.logo, "logo", meta.wordmark?.lead || "");
    if (el) return `<div class="wordmark">${el}</div>`;
  }
  const w = meta?.wordmark || {};
  return `<div class="wordmark"><b>${esc(w.lead || "")}</b>${w.rest ? ` <span>${esc(w.rest)}</span>` : ""}</div>`;
}

/** "Label: a · b · c" lines, used for the stakes and standing rows. */
function metaLine(label, text) {
  if (!text) return "";
  return `<p class="metaline">${label ? `<b>${esc(label)}</b> ` : ""}${esc(text)}</p>`;
}

function logoChips(logos = []) {
  const chips = logos.map((l) => {
    const el = img(l.src, "chiplogo", l.name);
    return `<div class="chip">${el || `<span class="chiptext">${esc(l.name || "")}</span>`}</div>`;
  });
  return chips.length ? `<div class="chips">${chips.join("")}</div>` : "";
}

function logoStrip(label, logos) {
  if (!logos?.length) return "";
  return `<div class="strip">${label ? `<div class="striplabel">${esc(label)}</div>` : ""}${logoChips(logos)}</div>`;
}

/* -------------------------------------------------------------- type 1 */

function renderType1(c, b) {
  const m = c.meta || {};
  const sec = (num, title, eyebrow) =>
    `<div class="sechead"><span class="badge">${esc(num)}</span><h2>${esc(title)}</h2>${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ""}</div>`;

  /* 01 challenge */
  const ch = c.challenge || {};
  const causeCards = (ch.cards || [])
    .map(
      (k) => `<div class="cause">
      ${k.label ? `<div class="causelabel">${esc(k.label)}</div>` : ""}
      <div class="causetitle">${esc(k.title || "")}</div>
      <p class="causebody">${esc(k.body || "")}${k.source ? ` <span class="src">${esc(k.source)}</span>` : ""}</p>
    </div>`,
    )
    .join("");
  const challenge = `<section class="card">
    ${sec("01", ch.title || "The challenge", ch.eyebrow)}
    <h1 class="headline">${esc(ch.headline || "")}${ch.headlineAccent ? `<em>${esc(ch.headlineAccent)}</em>` : ""}</h1>
    ${ch.body ? `<p class="lede">${esc(ch.body)}${ch.bodyEmphasis ? ` <b>${esc(ch.bodyEmphasis)}</b>` : ""}</p>` : ""}
    ${causeCards ? `<div class="causes">${causeCards}</div>` : ""}
    ${metaLine(ch.stakesLabel || "The stakes:", ch.stakes)}
  </section>`;

  /* 02 solution */
  const so = c.solution || {};
  const numbered = (items, cls) => {
    if (!items?.length) return "";
    const cells = items
      .map(
        (p, i) => `<div class="pt"><span class="nbadge">${i + 1}</span><div>
        <div class="pttitle">${esc(p.title || "")}</div>
        ${p.lead ? `<div class="ptlead">${esc(p.lead)}</div>` : ""}
        <p class="ptbody">${esc(p.body || "")}${p.bodyEmphasis ? ` <b>${esc(p.bodyEmphasis)}</b>` : ""}</p>
      </div></div>`,
      )
      .join("");
    return `<div class="${cls}">${cells}</div>`;
  };

  const figureSrc = so.figure?.src ? dataUri(so.figure.src) : null;
  const figure = figureSrc
    ? `<figure class="fig"><img src="${figureSrc}" alt="${esc(so.figure.caption || "")}">
       ${so.figure.caption ? `<figcaption>${esc(so.figure.caption)}</figcaption>` : ""}
       ${so.figure.note ? `<div class="fignote">${esc(so.figure.note)}</div>` : ""}</figure>`
    : "";
  const flow = (so.flow || []).length
    ? `<p class="flow">${(so.flow || []).map(esc).join(" &rsaquo; ")}${so.flowAccent ? ` &rsaquo; <em>${esc(so.flowAccent)}</em>` : ""}</p>`
    : "";
  const solution = `<section class="card">
    ${sec("02", so.title || "The solution", so.eyebrow)}
    ${so.lead ? `<p class="lead">${esc(so.lead)}</p>` : ""}
    ${so.sub ? `<p class="sub">${esc(so.sub)}${so.subEmphasis ? ` <b>${esc(so.subEmphasis)}</b>` : ""}</p>` : ""}
    <div class="solbody${figure ? " withfig" : ""}">
      ${numbered(so.points, "pts2")}
      ${figure}
    </div>
    ${flow}
  </section>`;

  /* 03 differentiation */
  const df = c.differentiation || {};
  const differentiation = `<section class="card">
    ${sec("03", df.title || "Differentiation", df.eyebrow)}
    ${numbered(df.points, "pts4")}
    ${metaLine(df.standingLabel || "Standing:", df.standing)}
  </section>`;

  /* founder panel */
  const f = c.founder || {};
  const banner = f.banner?.src
    ? `<figure class="banner">${img(f.banner.src, "", f.banner.caption || "")}${f.banner.caption ? `<figcaption>${esc(f.banner.caption)}</figcaption>` : ""}</figure>`
    : "";
  const creds = (f.credentials || [])
    .map(
      (k, i) => `<div class="cred"><span class="nbadge sm">${i + 1}</span>
      <div><div class="credtitle">${esc(k.title || "")}</div><div class="credbody">${esc(k.body || "")}</div></div></div>`,
    )
    .join("");
  const founder = f.name
    ? `<section class="card founder">
      <h2 class="paneltitle">${esc(f.title || "Founder Profile")}</h2>
      ${banner}
      <div class="frow">
        ${img(f.photo, "portrait", f.name) || `<div class="portrait placeholder"></div>`}
        <div class="fmain">
          <div class="fnamerow"><div class="fname">${esc(f.name)}</div>${f.role ? `<div class="frole">${esc(f.role)}</div>` : ""}</div>
          ${creds ? `<div class="creds">${creds}</div>` : ""}
        </div>
      </div>
    </section>`
    : "";

  /* 04 asks */
  const a = c.asks || {};
  const askItems = (a.items || [])
    .map(
      (it, i) => `<div class="ask"><span class="nbadge">${i + 1}</span>
      <div><div class="asktitle">${esc(it.title || "")}</div><p class="askbody">${esc(it.body || "")}</p>
      ${logoStrip(it.logosLabel, it.logos)}</div></div>`,
    )
    .join("");
  const extraStrips = (a.strips || []).map((s) => logoStrip(s.label, s.logos)).join("");
  const partners = (c.partners || []).length
    ? `<div class="strip"><div class="striplabel">Partners</div><div class="partners">${(c.partners || [])
        .map(
          (p) => `<div class="partner">${img(p.logo, "plogo", p.name)}<div><div class="pname">${esc(p.name || "")}</div><div class="prole">${esc(p.role || "")}</div></div></div>`,
        )
        .join("")}</div></div>`
    : "";
  const asks = a.title
    ? `<section class="card tinted">
      ${sec("04", a.title, a.eyebrow)}
      ${a.headline ? `<div class="askhead">${esc(a.headline)}${a.headlineAccent ? `<em>${esc(a.headlineAccent)}</em>` : ""}</div>` : ""}
      ${askItems}${extraStrips}${partners}
      ${a.note ? `<div class="disclaimer">${esc(a.note)}</div>` : ""}
    </section>`
    : "";

  const bodyHtml = `<div class="sheet">
  <header>${wordmark(m)}${m.docLabel ? `<div class="pill">${esc(m.docLabel)}</div>` : ""}</header>
  <div class="rule"></div>
  <div class="grid">
    <div class="col main">${challenge}${solution}${differentiation}</div>
    <div class="col side">${founder}${asks}</div>
  </div>
  <footer>
    <div class="fleft">${m.url ? `<a class="url">${esc(m.url)}</a>` : ""}${m.location ? ` <span class="loc">&middot; ${esc(m.location)}</span>` : ""}${m.email ? ` <span class="loc">&middot; ${esc(m.email)}</span>` : ""}</div>
    <div class="fright">${esc(m.tagline || "")}</div>
  </footer>
</div>`;

  return doc({ title: `${b.name} one pager`, brand: b, bodyHtml, css: CSS_T1 });
}

const CSS_T1 = `
@page{size:1440px 810px;margin:0}
body{font-family:var(--bodyfont);color:var(--body);font-size:9.38px;line-height:1.35}
.sheet{width:1440px;height:810px;padding:42px;display:flex;flex-direction:column;background:var(--canvas);overflow:hidden}
header{display:flex;align-items:center;justify-content:space-between}
.wordmark{font-family:var(--display);font-size:16.5px;font-weight:600;letter-spacing:-.01em;line-height:1}
.wordmark b{color:var(--accent-deep);font-weight:700}
.wordmark span{color:var(--ink);font-weight:400}
.wordmark .logo{height:24px;width:auto}
.pill{background:var(--accent-deep);color:var(--on-accent);font-size:9px;font-weight:600;padding:6px 15px;border-radius:999px;letter-spacing:.01em}
.rule{height:1px;background:var(--hairline);margin:12px 0}
.grid{flex:1 0 auto;display:grid;grid-template-columns:894px 440px;column-gap:22px;align-items:stretch}
.col{display:flex;flex-direction:column;gap:9px;justify-content:space-between}
.card{flex:0 0 auto;background:var(--surface);border:1px solid var(--hairline);border-radius:var(--radius);padding:11px 15px}
.card.tinted{background:var(--surface-alt);border-color:color-mix(in srgb,var(--accent) 22%,transparent)}
.sechead{display:flex;align-items:baseline;gap:9px;margin-bottom:8px}
.badge{display:inline-flex;align-items:center;justify-content:center;width:17px;height:17px;border-radius:5px;background:var(--accent-deep);color:var(--on-accent);font-size:8.25px;font-weight:700;flex:none;transform:translateY(2px)}
.sechead h2{font-family:var(--display);font-size:12.75px;font-weight:600;color:var(--ink);margin:0;letter-spacing:-.01em}
.eyebrow{font-size:7.88px;color:var(--muted)}
.headline{font-family:var(--display);font-size:22.5px;line-height:1.16;font-weight:600;color:var(--ink);margin:0 0 7px;letter-spacing:-.015em}
.headline em{font-style:normal;color:var(--accent)}
.lede{font-size:9.38px;color:var(--body);margin:0 0 9px}
.lede b{color:var(--ink);font-weight:600}
.causes{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
.cause{background:var(--surface-alt);border:1px solid var(--hairline);border-radius:7px;padding:8px 10px}
.causelabel{font-family:var(--mono);font-size:6.75px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:5px}
.causetitle{font-size:9.38px;font-weight:600;color:var(--ink);margin-bottom:4px}
.causebody{font-size:7.5px;margin:0;line-height:1.4}
.src{color:var(--muted)}
.metaline{font-size:7.5px;color:var(--muted);margin:9px 0 0;padding-top:7px;border-top:1px solid var(--hairline);line-height:1.4}
.metaline b{color:var(--accent);font-weight:600}
.lead{font-size:9.75px;font-weight:600;color:var(--ink);margin:0 0 5px}
.sub{font-size:8.63px;margin:0 0 10px}
.sub b{color:var(--ink);font-weight:600}
.solbody{display:block}
.solbody.withfig{display:grid;grid-template-columns:1fr 268px;gap:15px;align-items:start}
.solbody.withfig .pts2{grid-template-columns:repeat(2,1fr);gap:8px 14px}
.pts1{display:grid;grid-template-columns:1fr;gap:8px;align-content:start}
.pts2{display:grid;grid-template-columns:repeat(2,1fr);gap:8px 18px}
.pts4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pt{display:flex;gap:7px;align-items:flex-start}
.nbadge{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:4px;background:var(--accent-deep);color:var(--on-accent);font-size:6.75px;font-weight:700;flex:none;margin-top:1px}
.nbadge.sm{width:12px;height:12px;font-size:6.2px;border-radius:3px}
.pttitle{font-size:8.25px;font-weight:600;color:var(--ink);line-height:1.25}
.pts4 .pttitle{font-size:10.5px}
.ptlead{font-size:8.63px;font-weight:600;color:var(--ink);margin-top:3px}
.ptbody{font-size:7.13px;margin:2px 0 0;line-height:1.4}
.pts4 .ptbody{font-size:8.25px}
.ptbody b{color:var(--ink);font-weight:600}
.fig{margin:0}
.fig img{width:100%;height:92px;object-fit:cover;border:1px solid var(--hairline);border-radius:8px}
.fig figcaption{font-size:9.5px;color:var(--ink);margin-top:5px;line-height:1.25}
.fignote{font-size:7.5px;color:var(--muted);margin-top:2px}
.flow{font-size:7.13px;color:var(--muted);margin:9px 0 0;padding-top:7px;border-top:1px solid var(--hairline)}
.flow em{font-style:normal;color:var(--accent);font-weight:600}
.paneltitle{font-family:var(--display);font-size:12px;font-weight:600;color:var(--ink);margin:0 0 8px}
.banner{margin:0 0 9px;position:relative;border-radius:8px;overflow:hidden}
.banner img{width:100%;height:52px;object-fit:cover}
.banner figcaption{position:absolute;left:9px;bottom:7px;color:#fff;font-size:8.5px;text-shadow:0 1px 3px rgba(0,0,0,.55)}
.frow{display:grid;grid-template-columns:124px 1fr;gap:13px;align-items:start}
.portrait{width:124px;height:152px;object-fit:cover;border-radius:8px}
.portrait.placeholder{background:var(--surface-alt);border:1px solid var(--hairline)}
.fnamerow{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:9px}
.fname{font-family:var(--display);font-size:18px;font-weight:600;color:var(--ink);line-height:1.15;letter-spacing:-.015em}
.frole{font-size:9.75px;font-weight:600;color:var(--accent);text-align:right;flex:none;max-width:78px;line-height:1.2}
.creds{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 11px}
.cred{display:flex;gap:6px;align-items:flex-start}
.credtitle{font-size:10.13px;font-weight:600;color:var(--ink);line-height:1.2}
.credbody{font-size:8.63px;color:var(--body);line-height:1.3;margin-top:1px}
.askhead{font-family:var(--display);font-size:14.25px;font-weight:600;color:var(--ink);line-height:1.2;margin:0 0 9px;letter-spacing:-.01em}
.askhead em{font-style:normal;color:var(--accent)}
.ask{display:flex;gap:7px;align-items:flex-start;margin-bottom:7px}
.asktitle{font-size:9px;font-weight:600;color:var(--ink)}
.askbody{font-size:7.13px;margin:2px 0 0;line-height:1.4}
.strip{margin-top:6px}
.striplabel{font-family:var(--mono);font-size:5.63px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.chips{display:flex;gap:6px;flex-wrap:wrap}
.chip{flex:1 1 0;min-width:52px;height:27px;background:#fff;border:1px solid var(--hairline);border-radius:6px;display:flex;align-items:center;justify-content:center;padding:5px}
.chiplogo{max-height:100%;max-width:100%;width:auto;object-fit:contain}
.chiptext{font-size:6.5px;font-weight:600;color:var(--ink);text-align:center;line-height:1.1}
.partners{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
.partner{display:flex;gap:7px;align-items:center}
.plogo{height:22px;width:auto;object-fit:contain}
.pname{font-size:10.5px;font-weight:600;color:var(--ink);line-height:1.2}
.prole{font-size:8.5px;color:var(--muted)}
.disclaimer{font-size:5.63px;font-style:italic;color:var(--faint);margin-top:7px}
footer{display:flex;align-items:baseline;justify-content:space-between;padding-top:10px;margin-top:auto;border-top:1px solid var(--hairline);font-size:8.25px}
.url{color:var(--accent);font-weight:600}
.loc{color:var(--muted)}
.fright{color:var(--muted)}
`;

/* -------------------------------------------------------------- type 2 */

function renderType2(c, b) {
  const m = c.meta || {};
  const f = m.founder || {};

  const block = (blk) => {
    switch (blk.kind) {
      case "chips":
        return `<div class="t2chips">${(blk.items || []).map((i) => `<span class="t2chip">${esc(i)}</span>`).join("")}</div>`;
      case "stack": {
        const items = blk.items || [];
        const cons = blk.connectors || (blk.connector ? items.slice(1).map(() => blk.connector) : []);
        return `<div class="t2stack">${items
          .map((it, i) => {
            const con = i > 0 && cons[i - 1]
              ? `<div class="t2con ${cons[i - 1].tone === "danger" ? "danger" : ""}"><span>${esc(cons[i - 1].glyph || "▲")}</span>${esc(cons[i - 1].text || "")}</div>`
              : "";
            return `${con}<div class="t2box"><div class="t2boxlabel">${esc(it.label || "")}</div><p class="t2boxbody">${esc(it.body || "")}</p></div>`;
          })
          .join("")}</div>`;
      }
      case "grid":
        return `<div class="t2grid">${(blk.items || [])
          .map((it) => `<div><div class="t2gtitle">${esc(it.title || "")}</div><p class="t2gbody">${esc(it.body || "")}</p></div>`)
          .join("")}</div>`;
      case "note":
        return `<p class="t2note">${blk.lead ? `<b>${esc(blk.lead)}</b> ` : ""}${esc(blk.body || "")}</p>`;
      case "checks":
        return `<div class="t2checks">${blk.label ? `<div class="t2checklabel">${esc(blk.label)}</div>` : ""}
          <div class="t2checkrow">${(blk.items || []).map((i) => `<span class="t2check">&#10003; ${esc(i)}</span>`).join("")}</div>
          ${blk.body ? `<p class="t2checkbody">${esc(blk.body)}</p>` : ""}</div>`;
      case "text":
        return `<p class="t2text">${esc(blk.body || "")}</p>`;
      default:
        return "";
    }
  };

  const cols = (c.columns || [])
    .map(
      (col) => `<section class="t2col">
      ${col.eyebrow ? `<div class="t2eyebrow">${esc(col.eyebrow)}</div>` : ""}
      <h2 class="t2h">${esc(col.heading || "")}</h2>
      ${col.deck ? `<p class="t2deck">${esc(col.deck)}</p>` : ""}
      <div class="t2blocks">${(col.blocks || []).map(block).join("")}</div>
      ${col.foot ? `<p class="t2foot-note">${col.foot.lead ? `<b>${esc(col.foot.lead)}</b> ` : ""}${esc(col.foot.body || "")}</p>` : ""}
    </section>`,
    )
    .join("");

  const bodyHtml = `<div class="sheet2">
  <header class="t2head">
    <div class="t2lede"><h1>${esc(m.headline || "")}${m.headlineAccent ? `<em>${esc(m.headlineAccent)}</em>` : ""}</h1></div>
    <div class="t2right">
      ${f.name ? `<div class="t2founder">${f.eyebrow ? `<div class="t2feyebrow">${esc(f.eyebrow)}</div>` : ""}
        <p class="t2fline"><b>${esc(f.name)}</b>${esc(f.detail || "")}</p>
        ${f.geography ? `<p class="t2fgeo">${esc(f.geography)}</p>` : ""}</div>` : ""}
      ${m.standfirst ? `<p class="t2standfirst">${esc(m.standfirst)}</p>` : ""}
    </div>
  </header>
  <div class="t2rule"></div>
  <main class="t2cols">${cols}</main>
  <footer class="t2footer">
    <div class="t2closing">${(c.closing?.lines || []).map((l) => `<p>${esc(l)}</p>`).join("")}</div>
    ${m.url ? `<div class="t2url">${esc(m.url)}</div>` : ""}
  </footer>
</div>`;

  return doc({ title: `${b.name} one pager`, brand: b, bodyHtml, css: CSS_T2 });
}

const CSS_T2 = `
@page{size:A4 landscape;margin:0}
body{font-family:var(--bodyfont);color:var(--body);font-size:8pt;line-height:1.3;background:var(--canvas)}
.sheet2{width:297mm;height:210mm;padding:31pt;display:flex;flex-direction:column;background:var(--canvas);overflow:hidden}
.t2head{display:grid;grid-template-columns:1.2fr 1fr;gap:20pt;align-items:center}
.t2lede h1{font-family:var(--display);font-size:20pt;font-weight:600;line-height:1.2;color:var(--ink);margin:0;text-align:center;letter-spacing:-.015em}
.t2lede h1 em{font-style:normal;color:var(--accent)}
.t2feyebrow{font-family:var(--mono);font-size:6.3pt;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:right;margin-bottom:3pt}
.t2fline{font-size:7.5pt;margin:0;text-align:right;line-height:1.35}
.t2fline b{color:var(--ink);font-weight:600}
.t2fgeo{font-size:7.5pt;margin:1pt 0 0;text-align:right;color:var(--body)}
.t2standfirst{font-size:10pt;margin:10pt 0 0;line-height:1.4;color:var(--body)}
.t2rule{height:.6pt;background:var(--hairline);margin:11pt 0 10pt}
.t2cols{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:17pt;min-height:0}
.t2col{display:flex;flex-direction:column}
.t2eyebrow{font-family:var(--mono);font-size:7pt;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:6pt}
.t2h{font-family:var(--display);font-size:11.5pt;font-weight:600;color:var(--ink);margin:0 0 5pt;line-height:1.2;letter-spacing:-.01em}
.t2deck{font-size:7.5pt;margin:0 0 9pt;color:var(--body)}
.t2blocks{display:flex;flex-direction:column;gap:9pt;flex:1}
.t2chips{display:flex;flex-wrap:wrap;gap:5pt}
.t2chip{font-family:var(--mono);font-size:6.5pt;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);background:var(--surface-alt);border:.6pt solid var(--hairline);border-radius:3pt;padding:3pt 6pt}
.t2stack{display:flex;flex-direction:column}
.t2box{background:var(--surface-alt);border:.6pt solid var(--hairline);border-radius:3pt;padding:6pt 8pt}
.t2boxlabel{font-family:var(--mono);font-size:6.5pt;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:3pt}
.t2boxbody{font-size:8pt;margin:0;line-height:1.3}
.t2con{font-family:var(--mono);font-size:6.5pt;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);text-align:center;padding:5pt 0;display:flex;align-items:center;justify-content:center;gap:5pt}
.t2con.danger{color:var(--danger)}
.t2grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9pt 10pt}
.t2gtitle{font-family:var(--display);font-size:8.5pt;font-weight:600;color:var(--ink)}
.t2gbody{font-size:7pt;margin:2pt 0 0;line-height:1.3}
.t2note{font-size:8pt;margin:0;line-height:1.35}
.t2note b{color:var(--ink);font-weight:600}
.t2text{font-size:8pt;margin:0}
.t2checks{border-top:.6pt solid var(--hairline);padding-top:7pt}
.t2checklabel{font-family:var(--mono);font-size:6.5pt;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4pt}
.t2checkrow{display:flex;justify-content:space-between;gap:6pt;margin-bottom:5pt}
.t2check{font-family:var(--mono);font-size:6.3pt;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--accent)}
.t2checkbody{font-size:7.5pt;margin:0;line-height:1.3}
.t2foot-note{font-size:7.5pt;margin:9pt 0 0;padding-top:7pt;border-top:.6pt solid var(--hairline);line-height:1.35}
.t2foot-note b{color:var(--ink);font-weight:600}
.t2footer{display:flex;align-items:flex-end;justify-content:space-between;gap:20pt;border-top:.6pt solid var(--hairline);padding-top:9pt;margin-top:10pt}
.t2closing{flex:1;text-align:center}
.t2closing p{font-family:var(--display);font-size:12pt;font-weight:600;color:var(--ink);margin:0;line-height:1.25;letter-spacing:-.01em}
.t2url{font-size:11pt;color:var(--body);flex:none}
`;

/* ------------------------------------------------------------------- run */

fs.mkdirSync(outDir, { recursive: true });

const slug =
  content.slug ||
  slugify(content.meta?.wordmark?.lead || brand.name || "one-pager") + "-one-pager";

const html = type === "2" ? renderType2(content, brand) : renderType1(content, brand);
const outFile = path.join(outDir, `${slug}.html`);
fs.writeFileSync(outFile, html);

const emDash = html.includes("—");
console.log(`Wrote ${outFile}  (type ${type}, ${(html.length / 1024).toFixed(0)} KB)`);
if (emDash) console.warn("WARNING: the page contains an em dash. Replace it with a middot, comma or full stop.");
