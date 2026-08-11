#!/usr/bin/env node
// Generates docs/skills-index.json — a machine-readable index of every
// shipped skill (TUS-2601). Derived from skills/**/SKILL.md + packs.config.json,
// never hand-edited. Re-run via ./build-packs.sh, which calls this script.
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_DIR = join(REPO_ROOT, "skills");
const CONFIG_PATH = join(REPO_ROOT, "packs.config.json");
const OUT_PATH = join(REPO_ROOT, "docs", "skills-index.json");

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const packForSkill = new Map();
for (const pack of config.packs) {
  for (const skillName of pack.skills) packForSkill.set(skillName, pack.name);
}

const skills = [];
for (const moduleName of readdirSync(SKILLS_DIR)) {
  if (moduleName === "sandbox") continue; // experimental, not shipped in any pack
  const modulePath = join(SKILLS_DIR, moduleName);
  if (!statSync(modulePath).isDirectory()) continue;
  for (const skillName of readdirSync(modulePath)) {
    const file = join(modulePath, skillName, "SKILL.md");
    if (!existsSync(file)) continue;
    const content = readFileSync(file, "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = match ? parseYaml(match[1]) : {};
    skills.push({
      name: skillName,
      module: moduleName,
      pack: packForSkill.get(skillName) || null,
      description: data.description || "",
      version: data.metadata?.version || null,
      url: `https://github.com/The-Utopia-Studio/skills/blob/main/skills/${moduleName}/${skillName}/SKILL.md`,
    });
  }
}
skills.sort((a, b) => a.name.localeCompare(b.name));

const index = {
  $schema: "./skills-index.schema.json",
  generatedBy: "scripts/build-skills-index.mjs",
  count: skills.length,
  skills,
};

writeFileSync(OUT_PATH, JSON.stringify(index, null, 2) + "\n");
console.log(`  Wrote docs/skills-index.json (${skills.length} skills)`);
