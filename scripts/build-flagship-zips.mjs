#!/usr/bin/env node
// Generates docs/downloads/<skill>.skill — a zip of each flagship skill's
// folder, for fellows on Claude.ai (web or desktop) to upload directly under
// Settings -> Capabilities -> Skills, no /plugin or npx required (TUS-2603).
//
// Scoped to the docs site's existing "Flagships" list only, not all 302
// skills — see FELLOWS.md for why. The flagship list is parsed out of
// docs/index.html itself so there's one source of truth, not two lists to
// keep in sync.
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_DIR = join(REPO_ROOT, "skills");
const OUT_DIR = join(REPO_ROOT, "docs", "downloads");

function skillDirFor(name) {
  for (const moduleName of ["gtm", "product", "investments", "founder-productivity"]) {
    const dir = join(SKILLS_DIR, moduleName, name);
    if (existsSync(join(dir, "SKILL.md"))) return dir;
  }
  return null;
}

const html = readFileSync(join(REPO_ROOT, "docs", "index.html"), "utf8");
const flagshipsSection = html.match(/<div class="skill-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
if (!flagshipsSection) throw new Error("Could not find #flagships skill-list in docs/index.html");
const names = [...flagshipsSection[1].matchAll(/<h3 class="skill__name">([^<]+)<\/h3>/g)].map((m) => m[1].trim());
if (names.length === 0) throw new Error("No flagship skill names parsed from docs/index.html");

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

for (const name of names) {
  const dir = skillDirFor(name);
  if (!dir) throw new Error(`Flagship skill "${name}" not found under skills/<module>/`);
  const zipPath = join(OUT_DIR, `${name}.skill`);
  execFileSync("zip", ["-rq", zipPath, ".", "-x", ".*"], { cwd: dir });
  console.log(`  zipped: docs/downloads/${name}.skill`);
}
console.log(`\n${names.length} flagship .skill file(s) generated.`);
