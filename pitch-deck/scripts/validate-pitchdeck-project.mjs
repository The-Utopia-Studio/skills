#!/usr/bin/env node
// Pre-deploy validator for a scaffolded pitch-deck project.
// Run from the deck project root: `node <skill>/scripts/validate-pitchdeck-project.mjs`
// or pass a path: `node validate-pitchdeck-project.mjs /path/to/deck`.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import process from "node:process";

const root = resolve(process.argv[2] ?? process.cwd());
const errors = [];
const warnings = [];

function must(path, label) {
  if (!existsSync(join(root, path))) errors.push(`missing: ${label} (${path})`);
}
function should(path, label) {
  if (!existsSync(join(root, path))) warnings.push(`missing: ${label} (${path})`);
}

// Required scaffolding
must("package.json", "package.json");
must("vite.config.ts", "vite config");
must("tailwind.config.js", "tailwind config");
must("index.html", "index.html");
must("brand.json", "brand.json (Phase 1 output)");
must("deck-brief.md", "deck-brief.md (Phase 2 output)");
must("src/App.tsx", "App.tsx");
must("src/brand.ts", "brand.ts (typed brand import)");
must("src/assets.ts", "assets.ts (image manifest)");
must("src/index.css", "index.css");
must("src/components/Loader.tsx", "Loader component");
must("src/components/Navbar.tsx", "Navbar component");
must("src/components/Reveal.tsx", "Reveal component");
must("public/assets", "public/assets/ dir");

// brand.json shape
if (existsSync(join(root, "brand.json"))) {
  try {
    const b = JSON.parse(readFileSync(join(root, "brand.json"), "utf8"));
    for (const k of ["name", "tone", "colors", "fonts", "logo"]) {
      if (!(k in b)) errors.push(`brand.json missing field: ${k}`);
    }
    if (b.tone && !["investor", "sales"].includes(b.tone)) {
      errors.push(`brand.json.tone must be "investor" or "sales", got "${b.tone}"`);
    }
  } catch (e) {
    errors.push(`brand.json is not valid JSON: ${e.message}`);
  }
}

// At least one slide must ship
const slidesDir = join(root, "src/components/slides");
if (!existsSync(slidesDir)) {
  errors.push("missing: src/components/slides/ (no slides scaffolded)");
} else {
  const slides = readdirSync(slidesDir).filter((f) => f.endsWith(".tsx"));
  if (slides.length === 0) errors.push("no .tsx slides in src/components/slides/");
  // Cover + Ask are mandatory
  if (!slides.includes("Cover.tsx")) errors.push("missing slide: Cover.tsx");
  if (!slides.includes("Ask.tsx")) errors.push("missing slide: Ask.tsx");
}

// Logo present
const logoCandidates = ["public/assets/logo.svg", "public/assets/logo.png"];
if (!logoCandidates.some((p) => existsSync(join(root, p)))) {
  warnings.push("no logo at public/assets/logo.{svg,png} — placeholder will render");
}

// Tailwind reads brand
if (existsSync(join(root, "tailwind.config.js"))) {
  const tw = readFileSync(join(root, "tailwind.config.js"), "utf8");
  if (!tw.includes("brand")) warnings.push("tailwind.config.js: no `brand` color extension found");
}

// motion dep present
if (existsSync(join(root, "package.json"))) {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!deps.motion && !deps["framer-motion"]) {
    warnings.push("package.json: motion / framer-motion not installed");
  }
  if (!deps.tailwindcss) errors.push("package.json: tailwindcss missing");
  if (!deps.react) errors.push("package.json: react missing");
  if (!deps.vite) errors.push("package.json: vite missing");
}

// Report
const fmt = (arr, tag) => arr.map((m) => `  ${tag} ${m}`).join("\n");
if (errors.length) console.error(`pitch-deck validation FAILED (${errors.length} error${errors.length === 1 ? "" : "s"}):\n${fmt(errors, "✗")}`);
if (warnings.length) console.warn(`warnings (${warnings.length}):\n${fmt(warnings, "!")}`);
if (!errors.length && !warnings.length) console.log("pitch-deck validation OK");

process.exit(errors.length ? 1 : 0);
