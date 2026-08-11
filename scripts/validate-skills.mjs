#!/usr/bin/env node
// CI check for SKILL.md frontmatter + pack integrity. See CONTRIBUTING.md.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { load as parseYaml } from "js-yaml";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_DIR = join(REPO_ROOT, "skills");
const CONFIG_PATH = join(REPO_ROOT, "packs.config.json");

const errors = [];
// Trigger-condition phrasing is a corpus-wide rewrite (see TUS-2599, Week 2) —
// warn on it here so CI is informative now without blocking on a separate issue's scope.
const warnings = [];

function findSkillDirs() {
  const dirs = [];
  for (const moduleName of readdirSync(SKILLS_DIR)) {
    const modulePath = join(SKILLS_DIR, moduleName);
    if (!statSync(modulePath).isDirectory()) continue;
    for (const skillName of readdirSync(modulePath)) {
      const skillPath = join(modulePath, skillName);
      if (statSync(skillPath).isDirectory() && existsSync(join(skillPath, "SKILL.md"))) {
        dirs.push({ module: moduleName, name: skillName, path: skillPath });
      }
    }
  }
  return dirs;
}

function parseFrontmatter(content, label) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { error: `${label}: no --- frontmatter block found` };
  try {
    const data = parseYaml(match[1]);
    return { data };
  } catch (e) {
    return { error: `${label}: frontmatter did not parse as YAML (${e.message})` };
  }
}

function checkSkill({ module: moduleName, name, path }) {
  const label = `skills/${moduleName}/${name}/SKILL.md`;
  const content = readFileSync(join(path, "SKILL.md"), "utf8");
  const { data, error } = parseFrontmatter(content, label);
  if (error) {
    errors.push(error);
    return;
  }
  if (!data || typeof data !== "object") {
    errors.push(`${label}: frontmatter is not a mapping`);
    return;
  }
  if (data.name !== name) {
    errors.push(`${label}: frontmatter name "${data.name}" does not match folder name "${name}"`);
  }
  const description = typeof data.description === "string" ? data.description : "";
  if (!description.trim()) {
    errors.push(`${label}: missing or empty description`);
  } else if (!/use when|use this|use for|use to|use whenever|use if|used when/i.test(description)) {
    warnings.push(`${label}: description reads as a summary, not a trigger condition (no "Use when/this/to/if" phrasing)`);
  }
}

function checkPackIntegrity() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  for (const pack of config.packs) {
    for (const skillName of pack.skills) {
      const hit = ["gtm", "product", "investments", "founder-productivity"].some((m) =>
        existsSync(join(SKILLS_DIR, m, skillName, "SKILL.md"))
      );
      if (!hit) {
        errors.push(`packs.config.json: pack "${pack.name}" references skill "${skillName}" which does not exist under skills/<module>/`);
      }
    }
  }
}

function checkBuildDrift() {
  try {
    execFileSync("./build-packs.sh", { cwd: REPO_ROOT, stdio: "pipe" });
    const diff = execFileSync(
      "git",
      ["status", "--porcelain", "--", "plugins", ".claude-plugin", "docs/skills-index.json", "docs/downloads"],
      { cwd: REPO_ROOT }
    ).toString();
    if (diff.trim()) {
      errors.push(`build-packs.sh produced drift against committed build output:\n${diff}`);
    }
  } catch (e) {
    errors.push(`build-packs.sh failed to run: ${e.message}`);
  }
}

const skillDirs = findSkillDirs();
for (const skill of skillDirs) checkSkill(skill);
checkPackIntegrity();
checkBuildDrift();

console.log(`Checked ${skillDirs.length} skills.`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s) (non-blocking, tracked by TUS-2599):\n`);
  for (const w of warnings) console.log(`- ${w}`);
}
if (errors.length) {
  console.log(`\n${errors.length} failure(s):\n`);
  for (const e of errors) console.log(`- ${e}`);
  process.exit(1);
} else {
  console.log("\nAll blocking checks passed.");
}
