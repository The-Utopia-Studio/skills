#!/usr/bin/env node
/**
 * build-lp-onepager.mjs
 *
 *   node build-lp-onepager.mjs <lp.json> <brand.json> [outDir]
 *
 * Renders an LP one pager to a single self-contained HTML file at
 * 1440 x 810, with every image and font inlined as a data URI.
 *
 * Two content options share one grid and one component set:
 *   "option": "A"   Portfolio Highlight, reported register, for a fund update
 *   "option": "B"   Investment Case, argued register, for a live round
 *
 * The page is deliberately plain: one flat canvas, no tinted bands, no
 * gradients, no decorative colour. Sections are separated by numbered kickers
 * and whitespace rather than rules, figures are set in the brand's mono with
 * tabular figures, and the accent is reserved for data, action and evidence.
 * Those are not house preferences, they are what a design language of this
 * kind asks for; see references/design-system-intake.md.
 */

import fs from "node:fs";
import path from "node:path";

const [, , contentArg, brandArg, outArg] = process.argv;
if (!contentArg || !brandArg) {
  console.error("usage: build-lp-onepager.mjs <lp.json> <brand.json> [outDir]");
  process.exit(2);
}

const contentPath = path.resolve(contentArg);
const brandPath = path.resolve(brandArg);
const outDir = path.resolve(outArg || path.join(path.dirname(contentPath), "out"));
const searchRoots = [
  path.dirname(contentPath),
  path.dirname(brandPath),
  path.resolve(path.dirname(contentPath), ".."),
  path.resolve(path.dirname(brandPath), ".."),
  process.cwd(),
];

const c = readJson(contentPath);
const b = withDefaults(readJson(brandPath));

/* ------------------------------------------------------------------ utils */

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (err) {
    console.error(`Could not read JSON at ${p}: ${err.message}`);
    process.exit(1);
  }
}
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const stripTags = (s) => s.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function resolveAsset(rel) {
  if (!rel || /^data:/.test(rel)) return rel || null;
  /* Paths are written relative to the work directory ("assets/logo.svg"), but a
     content file often sits inside that assets folder itself, so also try the
     path with its leading folder stripped and the bare basename. */
  const candidates = [rel, rel.replace(/^[^/]+\//, ""), path.basename(rel)];
  for (const root of searchRoots) {
    for (const cand of candidates) {
      const p = path.resolve(root, cand);
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
    }
  }
  console.warn(`WARNING: asset not found, skipping: ${rel}`);
  return null;
}

const MIME = {
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf",
};

function dataUri(rel) {
  const p = resolveAsset(rel);
  if (!p || /^data:/.test(p)) return p;
  const buf = fs.readFileSync(p);
  if (buf.length > 4 * 1024 * 1024) console.warn(`WARNING: ${rel} is ${(buf.length / 1048576).toFixed(1)} MB. Downscale it.`);
  return `data:${MIME[path.extname(p).toLowerCase()] || "application/octet-stream"};base64,${buf.toString("base64")}`;
}

const img = (rel, cls, alt = "") => {
  const uri = dataUri(rel);
  return uri ? `<img class="${cls}" src="${uri}" alt="${esc(alt)}">` : "";
};

function withDefaults(t) {
  const d = {
    name: "Company", tagline: null,
    canvas: "#FFFFFF", surface: "#FFFFFF", surfaceAlt: "#F2F2F2", highlight: "#E3EDF6",
    ink: "#192B39", maxContrast: "#141414", panel: "#2F3F4C",
    body: "#42515D", muted: "#7A848C", faint: "#A3AAB0",
    accent: "#3E8ECC", accentDeep: "#26689A", onAccent: "#FFFFFF",
    hairline: "rgba(25,43,57,0.14)", borderShadow: "0 0 0 1px rgba(25,43,57,0.10)",
    positive: "#398E4A", danger: "#E5484D", neutral: "#8F8F8F",
    chart: ["#3E8ECC", "#26689A", "#2F3F4C", "#B9D5EE"],
    radius: 8, radiusCard: 12,
    fonts: { display: "system-ui, sans-serif", body: "system-ui, sans-serif", mono: "ui-monospace, Menlo, monospace" },
    fontFiles: [], logo: null, logoOnDark: "#FFFFFF", neverSay: [],
  };
  const m = { ...d, ...t, fonts: { ...d.fonts, ...(t.fonts || {}) } };
  /* The design language usually states its banned words as a quoted list. */
  if (typeof m.neverSay === "string") m.neverSay = m.neverSay.match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];
  if (!m.neverSay?.length && t._kit?.neverSay) {
    m.neverSay = t._kit.neverSay.match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];
  }
  /* borderShadow may arrive as a full declaration; the CSS wants the value. */
  m.borderShadow = String(m.borderShadow).replace(/^\s*box-shadow:\s*/i, "").replace(/;\s*$/, "");
  return m;
}

const fontFaces = () =>
  (b.fontFiles || [])
    .map((f) => {
      const uri = dataUri(f.path);
      return uri
        ? `@font-face{font-family:"${f.family}";font-weight:${f.weight || 400};font-style:${f.style || "normal"};font-display:block;src:url(${uri}) format("woff2")}`
        : "";
    })
    .filter(Boolean)
    .join("\n");

const vars = () =>
  [
    `--canvas:${b.canvas}`, `--surface:${b.surface}`, `--surface-alt:${b.surfaceAlt}`, `--highlight:${b.highlight}`,
    `--ink:${b.ink}`, `--max:${b.maxContrast}`, `--panel:${b.panel}`, `--body:${b.body}`, `--muted:${b.muted}`,
    `--faint:${b.faint}`, `--accent:${b.accent}`, `--accent-deep:${b.accentDeep}`, `--on-accent:${b.onAccent}`,
    `--hairline:${b.hairline}`, `--border:${b.borderShadow}`, `--positive:${b.positive}`, `--danger:${b.danger}`,
    `--neutral:${b.neutral}`, `--radius:${b.radius}px`, `--radius-card:${b.radiusCard}px`,
    `--display:${b.fonts.display}`, `--bodyfont:${b.fonts.body}`, `--mono:${b.fonts.mono}`,
  ].join(";");

/* ------------------------------------------------------------- components */

/** Numbered kicker. The design language separates sections with these, not rules. */
const kicker = (n, label) =>
  `<div class="kicker">${n ? `<span class="kn">${esc(n)}</span>` : ""}${esc(label)}</div>`;

/**
 * Provenance chip. A brand whose product distinguishes BOUND from ILLUSTRATIVE
 * gives the LP page the right vocabulary for saying how solid a number is,
 * so every figure carries its own state rather than one footnote for the page.
 */
const chip = (state) => {
  if (!state) return "";
  const s = String(state).toUpperCase();
  const tone = s === "BOUND" ? "bound" : s === "FAIL" ? "fail" : s === "PASS" ? "pass" : "neutral";
  return `<span class="chip ${tone}"><i></i>${esc(s)}</span>`;
};

const metrics = (items = [], cols) =>
  items.length
    ? `<div class="metrics" style="grid-template-columns:repeat(${cols || items.length},1fr)">${items
        .map(
          (m) => `<div class="metric">
      <div class="mval">${esc(m.value)}${m.unit ? `<span class="munit">${esc(m.unit)}</span>` : ""}</div>
      <div class="mlabel">${esc(m.label)}</div>
      ${m.state || m.note ? `<div class="mfoot">${chip(m.state)}${m.note ? `<span class="mnote">${esc(m.note)}</span>` : ""}</div>` : ""}
    </div>`,
        )
        .join("")}</div>`
    : "";

const infoCard = (card) => {
  if (!card?.items?.length) return "";
  /* When a whole card shares one provenance state, say it once in the header
     bar. A chip on every row is noise, and noise is how a reader stops
     reading the chips at all. */
  const shared = card.state ? String(card.state).toUpperCase() : null;
  return `<section class="card">
    <div class="cardbar">${esc(card.title || "Key company information")}${shared ? `<span class="barstate">${chip(shared)}</span>` : ""}</div>
    <div class="cardgrid" style="grid-template-columns:repeat(${card.columns || 2},1fr)">
      ${card.items
        .map((i) => {
          const st = i.state && String(i.state).toUpperCase() !== shared ? ` ${chip(i.state)}` : "";
          return `<div class="cell">
        <div class="clabel">${esc(i.label)}</div>
        <div class="cvalue${i.mono === false ? "" : " mono"}">${esc(i.value)}${st}</div>
      </div>`;
        })
        .join("")}
    </div>
  </section>`;
};

const barsCard = (card) => {
  const rows = card.rows || [];
  if (!rows.length) return "";
  const max = Math.max(...rows.map((r) => Number(r.value) || 0)) || 1;
  return `<section class="card">
    <div class="cardbar">${esc(card.title || "")}</div>
    <div class="cardbody">
      ${rows
        .map(
          (r, i) => `<div class="brow">
        <div class="blabel">${esc(r.label)}</div>
        <div class="btrack"><div class="bfill" style="width:${((Number(r.value) || 0) / max) * 100}%;background:${r.color || b.chart[i % b.chart.length]}"></div></div>
        <div class="bval mono">${esc(r.display ?? r.value)}</div>
      </div>`,
        )
        .join("")}
      ${card.note ? `<div class="cardnote">${chip(card.state)}${esc(card.note)}</div>` : ""}
    </div>
  </section>`;
};

/** Monochromatic donut. A brand that reserves its accent for function does not
 *  get a categorical rainbow, so segments step down the accent ramp. */
const donutCard = (card) => {
  const segs = (card.segments || []).filter((s) => Number(s.value) > 0);
  if (!segs.length) return "";
  const total = segs.reduce((a, s) => a + Number(s.value), 0) || 1;
  const R = 52, C = 2 * Math.PI * R;
  let at = 0;
  const rings = segs
    .map((s, i) => {
      const col = s.color || b.chart[i % b.chart.length];
      const frac = Number(s.value) / total;
      const dash = `${(frac * C).toFixed(2)} ${(C - frac * C).toFixed(2)}`;
      const off = (-at * C).toFixed(2);
      at += frac;
      return `<circle cx="66" cy="66" r="${R}" fill="none" stroke="${col}" stroke-width="26" stroke-dasharray="${dash}" stroke-dashoffset="${off}" transform="rotate(-90 66 66)"/>`;
    })
    .join("");
  return `<section class="card">
    <div class="cardbar">${esc(card.title || "")}</div>
    <div class="cardbody donutwrap">
      <svg class="donut" viewBox="0 0 132 132" role="img" aria-label="${esc(card.title || "")}">${rings}</svg>
      <div class="legends">${segs
        .map(
          (s, i) =>
            `<div class="leg"><span class="dot" style="background:${s.color || b.chart[i % b.chart.length]}"></span><span class="legname">${esc(s.label)}</span><span class="legval mono">${esc(s.note ?? s.value)}</span></div>`,
        )
        .join("")}</div>
    </div>
    ${card.note ? `<div class="cardnote pad">${chip(card.state)}${esc(card.note)}</div>` : ""}
  </section>`;
};

const timeline = (tl) => {
  const items = tl?.items || [];
  if (!items.length) return "";
  return `<div class="tl">
    <div class="rail">${items
      .map(
        (i) => `<div class="tlitem${i.done ? " done" : ""}">
      <span class="tldot"></span>
      <div class="tlwhen mono">${esc(i.when)}</div>
      <div class="tlwhat">${esc(i.what)}</div>
    </div>`,
      )
      .join("")}</div>
  </div>`;
};

const claims = (points = [], variant = "") =>
  points.length
    ? `<div class="claims ${variant}">${points
        .map(
          (p, i) => `<div class="claim">
      <div class="cidx mono">${String(i + 1).padStart(2, "0")}</div>
      <div><div class="ctitle">${esc(p.title)}</div><p class="cbody">${esc(p.body || "")}</p></div>
    </div>`,
        )
        .join("")}</div>`
    : "";

const prose = (paras = []) => paras.map((t) => `<p>${esc(t)}</p>`).join("");

/**
 * Problem and solution, side by side.
 *
 * The pair is the part a finance reader uses to decide whether to keep going,
 * so it is built to be read in one pass: a claim, three evidence lines with the
 * figure carried in mono, and a bottom line that names the cost on the left and
 * what it replaces on the right. The solution side numbers its lines, because a
 * mechanism read as three steps is understood and the same mechanism read as a
 * paragraph is skimmed.
 */
const pairPanel = (panel, kind) => {
  if (!panel) return "";
  const items = (panel.points || [])
    .map(
      (pt, i) => `<li class="pt">
      <span class="ptmark mono">${kind === "solution" ? String(i + 1).padStart(2, "0") : "&mdash;"}</span>
      <span class="pttext">${pt.lead ? `<b>${esc(pt.lead)}</b> ` : ""}${esc(pt.body || pt)}</span>
    </li>`,
    )
    .join("");
  return `<section class="panel ${kind}">
    <div class="paneltitle mono">${esc(panel.title || (kind === "problem" ? "The problem" : "The solution"))}</div>
    ${panel.lead ? `<p class="panellead">${esc(panel.lead)}</p>` : ""}
    ${items ? `<ul class="pts">${items}</ul>` : ""}
    ${panel.bottomLabel || panel.bottom ? `<div class="panelfoot"><span class="pflabel mono">${esc(panel.bottomLabel || "")}</span><span class="pfbody">${esc(panel.bottom || "")}</span></div>` : ""}
  </section>`;
};

const pair = (c) =>
  c.problem || c.solution ? `<div class="pair">${pairPanel(c.problem, "problem")}${pairPanel(c.solution, "solution")}</div>` : "";

/**
 * Logo strip. Takes real marks when they exist and falls back to a text chip
 * when they do not, so the slot can be laid out and approved before anyone has
 * chased a single SVG. See references/logo-slots.md for which set to use.
 */
const logoStrip = (l) => {
  const items = l?.items || [];
  if (!items.length) return "";
  return `<div class="logos">
    ${l.label ? `<div class="logolabel mono">${esc(l.label)}${l.state ? chip(l.state) : ""}</div>` : ""}
    <div class="logorow">${items
      .map((i) => {
        const el = img(i.src, "logoimg", i.name);
        return `<div class="logochip${el ? " has-img" : ""}">${el || `<span class="logotext mono">${esc(i.name || "")}</span>`}</div>`;
      })
      .join("")}</div>
    ${l.note ? `<div class="logonote">${esc(l.note)}</div>` : ""}
  </div>`;
};

const section = (n, label, inner) => (inner ? `<section class="sec">${kicker(n, label)}${inner}</section>` : "");

const cards = (list = []) =>
  list
    .map((card) => (card.kind === "bars" ? barsCard(card) : card.kind === "donut" ? donutCard(card) : infoCard(card)))
    .join("");

/* ------------------------------------------------------------------ page */

function render(c, b) {
  const m = c.meta || {};
  const option = String(c.option || "A").toUpperCase();
  const portrait = String(c.orientation || "landscape").toLowerCase().startsWith("p");

  const lockup =
    img(m.logo || b.logo, "logo", m.company || b.name) ||
    `<div class="wordmark">${esc(m.company || b.name)}</div>`;

  const stamp = [m.docLabel || "LP brief", m.stage, m.asOf].filter(Boolean).join(" · ");

  /* The problem and solution pair leads the argument column when it exists,
     because a reader who does not understand the product cannot judge the
     position. Section numbers shift down to make room for it. */
  const hasPair = Boolean(c.problem || c.solution);
  const n = (i) => String(i).padStart(2, "0");

  const duo = (list) =>
    list.filter(Boolean).length ? `<div class="duo">${cards(list)}</div>` : "";

  /*
   * Bands are collected before they are numbered, so a block that renders
   * empty never burns a kicker. Number the survivors, then place each one by
   * its slot: the title block is always 01, everything else follows in reading
   * order regardless of which column it ends up in.
   */
  const seq = [];
  const add = (slot, label, html) => {
    if (html) seq.push({ slot, label, html });
  };

  const stripMetrics = metrics(c.metrics, portrait ? 3 : 4);

  if (portrait) {
    add("body", m.pairLabel || "The problem, and the fix", pair(c));
    add("body", m.metricsLabel || "The position", stripMetrics);
    add("body", m.recordLabel || "The record", duo((c.cards || []).slice(0, 2)));
    add("body", m.thesisLabel || "Why we backed it", claims(c.thesis?.points, "across"));
    add("body", m.timelineLabel || "Where it stands", timeline(c.timeline));
    add("body", m.returnLabel || "Round and return", duo((c.cards || []).slice(2, 4)));
    add("body", m.involvementLabel || "Our involvement", prose(c.involvement?.paragraphs));
  } else {
    add("pair", m.pairLabel || "The problem, and the fix", pair(c));
    /* Option B is making an ask, so its numbers sit under the headline where
       the reader meets them first. Option A is reporting, so its numbers close
       the page as standing. */
    if (option === "B") add("strip", m.metricsLabel || "The round", stripMetrics);
    if (option === "B") {
      add("left", m.thesisLabel || "Why we backed it", claims(c.thesis?.points));
      add("left", m.timelineLabel || "Where it stands", timeline(c.timeline));
      add("left", m.involvementLabel || "Our involvement", prose(c.involvement?.paragraphs));
    } else {
      add("left", m.positionLabel || "The position", prose(c.position?.paragraphs));
      add("left", m.thesisLabel || "Why we backed it", claims(c.thesis?.points));
      add("left", m.founderLabel || "Founder", prose(c.founder?.paragraphs));
    }
    if (option === "A") add("strip", m.metricsLabel || "Standing", stripMetrics);
  }

  seq.forEach((band, i) => {
    band.no = n(i + 2);
  });
  const bySlot = (slot) => seq.filter((band) => band.slot === slot);
  const render = (band) => section(band.no, band.label, band.html);

  const pairBand = bySlot("pair").map(render).join("");
  const left = bySlot("left").map(render).join("");
  const stripBand = bySlot("strip")[0];
  const strip = stripBand
    ? `<div class="strip ${option === "B" ? "top" : "bottom"}">${kicker(stripBand.no, stripBand.label)}${stripBand.html}</div>`
    : "";

  const portraitBody = bySlot("body").map(render).join("\n");

  const landscapeBody = `
  ${pairBand}
  ${option === "B" ? strip : ""}

  <div class="cols">
    <div class="col left">${left}</div>
    <div class="col right">${cards(c.cards)}</div>
  </div>

  ${option === "A" ? strip : ""}`;

  const bodyHtml = `<div class="sheet${portrait ? " portrait" : ""}">
  <header class="head">
    <div class="lockup">${lockup}</div>
    <div class="stamp mono">${esc(stamp)}</div>
  </header>

  <div class="title">
    ${kicker("01", m.titleLabel || "Company")}
    <h1>${esc(m.headline || "")}${m.headlineAccent ? `<em>${esc(m.headlineAccent)}</em>` : ""}</h1>
    ${m.standfirst ? `<p class="standfirst">${esc(m.standfirst)}</p>` : ""}
  </div>

  ${portrait ? portraitBody : landscapeBody}

  ${logoStrip(c.logos)}

  <footer class="foot">
    <div class="ftag">${esc(m.tagline || b.tagline || "")}</div>
    <div class="fmeta mono">${esc(m.confidential || "CONFIDENTIAL · NOT FOR REDISTRIBUTION")}${m.page ? ` · ${esc(m.page)}` : ""}</div>
  </footer>
</div>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(m.company || b.name)} LP one pager</title>
<style>
@page{size:${portrait ? "1080px 1527px" : "1440px 810px"};margin:0}
${fontFaces()}
:root{${vars()}}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--canvas);-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
${CSS}
</style></head><body>${bodyHtml}</body></html>`;
}

const CSS = `
body{font-family:var(--bodyfont);color:var(--body);font-size:12px;line-height:1.5}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}

/* One flat canvas. No bands, no gradients, no section rules. */
.sheet{position:relative;width:1440px;height:810px;background:var(--canvas);padding:30px 48px 54px;display:flex;flex-direction:column;overflow:hidden}

.head{display:flex;align-items:center;justify-content:space-between;gap:24px}
.head .logo{height:34px;width:auto}
.wordmark{font-family:var(--display);font-size:32px;font-weight:700;color:var(--ink);letter-spacing:-.02em}
.stamp{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}

/* Numbered kickers carry section separation, per the design language. */
.kicker{display:flex;align-items:baseline;gap:8px;font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
.kn{color:var(--ink)}

.title{margin-top:18px;max-width:1010px}
.title h1{font-family:var(--display);font-size:29px;font-weight:700;line-height:1.16;letter-spacing:-.02em;color:var(--ink);margin:0}
.title h1 em{font-style:normal;color:var(--accent)}
.standfirst{font-size:13px;line-height:1.5;color:var(--body);margin:9px 0 0;max-width:1000px}

.sheet:not(.portrait) > .sec{margin-top:8px}
.cols{flex:1 0 auto;display:grid;grid-template-columns:690px 1fr;column-gap:46px;padding-top:10px;align-items:start}
.col{display:flex;flex-direction:column;gap:18px;min-width:0}
.col.right{gap:14px}
.sec p{margin:0 0 7px;font-size:12px;line-height:1.5}
.sec p:last-child{margin-bottom:0}

.claims{display:flex;flex-direction:column;gap:7px}
.claim{display:grid;grid-template-columns:26px 1fr;gap:10px;align-items:start}
.cidx{font-size:11px;font-weight:500;color:var(--ink);padding-top:3px}
.ctitle{font-family:var(--display);font-size:13.5px;font-weight:600;color:var(--ink);line-height:1.25}
.cbody{font-size:11.5px;margin:2px 0 0;line-height:1.4}

.tl .rail{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:12px}
.tlitem{position:relative;padding-top:18px}
.tlitem:before{content:"";position:absolute;left:0;right:-12px;top:5px;height:1px;background:var(--hairline)}
.tlitem:last-child:before{right:0}
.tldot{position:absolute;top:0;left:0;width:11px;height:11px;border-radius:50%;background:var(--canvas);box-shadow:0 0 0 2px var(--neutral) inset}
.tlitem.done .tldot{background:var(--accent);box-shadow:none}
.tlwhen{font-size:10.5px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink)}
.tlwhat{font-size:10.5px;line-height:1.35;margin-top:3px;color:var(--body)}

/* Cards: white panels on the canvas, boundary as a shadow-border, no rules. */
.card{background:var(--surface);border-radius:var(--radius-card);box-shadow:var(--border);overflow:hidden}
.cardbar{background:var(--ink);color:var(--on-accent);font-family:var(--display);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;padding:9px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.barstate .chip{color:var(--on-accent);opacity:.8}
.barstate .chip i{background:var(--on-accent)}
.barstate .chip.bound{color:var(--highlight);opacity:1}
.barstate .chip.bound i{background:var(--highlight)}
.cardgrid{display:grid;gap:11px 18px;padding:13px 16px 15px}
.clabel{font-size:10px;font-weight:500;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
.cvalue{font-size:12.5px;color:var(--ink);line-height:1.3;margin-top:2px}
.cardbody{padding:13px 16px 14px}
.cardnote{font-size:10px;color:var(--muted);margin-top:9px;display:flex;align-items:center;gap:7px;line-height:1.4}
.cardnote.pad{padding:0 16px 13px;margin-top:0}

.brow{display:grid;grid-template-columns:126px 1fr 48px;align-items:center;gap:11px;margin-bottom:8px}
.brow:last-of-type{margin-bottom:0}
.blabel{font-size:11.5px;font-weight:500;color:var(--ink);line-height:1.2}
.btrack{height:9px;background:var(--surface-alt);border-radius:3px;overflow:hidden}
.bfill{height:100%;border-radius:3px}
.bval{font-size:12px;font-weight:500;color:var(--ink);text-align:right}

.donutwrap{display:flex;align-items:center;gap:16px}
.donut{width:112px;height:112px;flex:none}
.legends{flex:1;display:flex;flex-direction:column;gap:6px}
.leg{display:flex;align-items:baseline;gap:9px;font-size:11.5px}
.dot{width:10px;height:10px;border-radius:2px}
.legname{color:var(--ink);flex:none}
.legval{color:var(--muted);font-size:11px}

/* Provenance chips. State is a label, never a colour hint alone. */
.chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
.chip i{width:6px;height:6px;border-radius:50%;background:var(--neutral);flex:none}
.chip.bound{color:var(--accent)}
.chip.bound i{background:var(--accent)}
.chip.pass{color:var(--positive)}
.chip.pass i{background:var(--positive)}
.chip.fail{color:var(--danger)}
.chip.fail i{background:var(--danger)}

.strip{padding-top:8px}
.strip.top{padding-top:14px;padding-bottom:0}
.strip.bottom{margin-top:0}
.metrics{display:grid;gap:24px 34px}
.mval{font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:21px;font-weight:500;color:var(--ink);line-height:1;letter-spacing:-.01em}
.munit{font-size:13px;color:var(--muted);margin-left:2px}
.mlabel{font-size:10.5px;font-weight:500;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-top:5px}
.mfoot{display:flex;align-items:center;gap:8px;margin-top:4px}
.mnote{font-size:10.5px;color:var(--faint)}

/* Full-bleed footer strip in the structure colour, tagline reversed out. */
.foot{position:absolute;left:0;right:0;bottom:0;height:42px;background:var(--ink);display:flex;align-items:center;justify-content:space-between;padding:0 48px}
.ftag{font-family:var(--display);font-size:14px;font-weight:500;color:var(--on-accent);letter-spacing:.01em}
.fmeta{font-size:10.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--on-accent);opacity:.72}


/* -------------------------------------------- problem and solution pair */
/* Two panels, same geometry, distinguished by weight rather than colour: the
   solution carries the accent on its numerals and a tinted well, the problem
   stays neutral. Colour marks the fix, not the complaint. */
.pair{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}
.panel{display:flex;flex-direction:column;background:var(--surface);border-radius:var(--radius-card);box-shadow:var(--border);padding:10px 14px 11px}
.panel.solution{background:var(--surface)}
.panel .paneltitle{font-size:10px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin:0 0 6px;font-family:var(--mono)}
.panel.solution .paneltitle{color:var(--accent)}
.panellead{font-family:var(--display);font-size:13.5px;font-weight:600;color:var(--ink);line-height:1.22;margin:0 0 7px;letter-spacing:-.01em}
.pts{list-style:none;margin:0 0 8px;padding:0;display:flex;flex-direction:column;gap:5px}
.pt{display:grid;grid-template-columns:18px 1fr;gap:8px;align-items:start}
.ptmark{font-size:10px;font-weight:500;color:var(--faint);padding-top:1px}
.panel.solution .ptmark{color:var(--accent)}
.pttext{font-size:11px;line-height:1.4;color:var(--body)}
.pttext b{color:var(--ink);font-weight:600}
.panelfoot{display:flex;gap:8px;align-items:baseline;margin-top:auto;padding-top:7px;border-top:1px solid var(--hairline)}
.pflabel{font-size:9.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);flex:none}
.panel.solution .pflabel{color:var(--accent)}
.pfbody{font-size:10.5px;line-height:1.38;color:var(--ink)}

/* ------------------------------------------------------------ logo strip */
.logos{margin-top:10px}
.logolabel{display:flex;align-items:center;gap:10px;font-size:9.5px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.logorow{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:10px}
.logochip{height:30px;background:var(--surface);border-radius:var(--radius);box-shadow:var(--border);display:flex;align-items:center;justify-content:center;padding:6px 10px;text-align:center}
.logochip .logoimg{max-height:100%;max-width:100%;width:auto;object-fit:contain}
.logotext{font-size:9.5px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);line-height:1.2}
.logonote{font-size:9px;font-style:italic;color:var(--faint);margin-top:5px}

/* ------------------------------------------------------------- portrait */
/* A4 proportion at 1080 x 1527. Same components, stacked in full-width bands
   instead of two tall columns, which is what buys room for the full
   investment record. */
.sheet.portrait{width:1080px;height:1527px;padding:34px 44px 56px;display:block}
.sheet.portrait .title{margin-top:18px;max-width:none}
.sheet.portrait .title h1{font-size:30px}
.sheet.portrait .standfirst{font-size:12.5px;max-width:none}
.sheet.portrait .sec{margin-top:12px}
.sheet.portrait .sec p{font-size:12px}
.sheet.portrait .metrics{gap:14px 28px}
.sheet.portrait .mval{font-size:23px}
.sheet.portrait .duo{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
.sheet.portrait .claims.across{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.sheet.portrait .claims.across .claim{display:block}
.sheet.portrait .claims.across .cidx{display:block;margin-bottom:5px;padding-top:0}
.sheet.portrait .cardgrid{gap:10px 18px}
.sheet.portrait .donut{width:112px;height:112px}
.sheet.portrait .foot{height:44px;padding:0 44px}
.sheet.portrait .pair{gap:18px}
.sheet.portrait .panellead{font-size:14.5px}
.sheet.portrait .pttext{font-size:11.5px}
.sheet.portrait .logos{margin-top:12px}
.sheet.portrait .logochip{height:34px}

`;

/* ------------------------------------------------------------------- run */

fs.mkdirSync(outDir, { recursive: true });

const slug = c.slug || `${slugify(c.meta?.company || b.name)}-lp-${String(c.option || "a").toLowerCase()}`;
const html = render(c, b);
const outFile = path.join(outDir, `${slug}.html`);
fs.writeFileSync(outFile, html);

console.log(`Wrote ${outFile}  (option ${String(c.option || "A").toUpperCase()}, ${(html.length / 1024).toFixed(0)} KB)`);
if (html.includes("—")) console.warn("WARNING: the page contains an em dash. Use a middot, comma or full stop.");
for (const word of b.neverSay || []) {
  if (new RegExp(`\\b${word}\\b`, "i").test(stripTags(html))) {
    console.warn(`WARNING: "${word}" appears on the page and this brand's design language bans it.`);
  }
}
