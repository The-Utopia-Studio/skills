#!/usr/bin/env node
// One-off migration to the canonical SKILL.md frontmatter schema (see CONTRIBUTING.md).
// Fixes: name/folder mismatches, and folds version/license/author under `metadata`,
// argument-hint up to top-level. Every other frontmatter field is left untouched.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml, dump as dumpYaml } from "js-yaml";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_DIR = join(REPO_ROOT, "skills");

function findSkillFiles() {
  const files = [];
  for (const moduleName of readdirSync(SKILLS_DIR)) {
    const modulePath = join(SKILLS_DIR, moduleName);
    if (!statSync(modulePath).isDirectory()) continue;
    for (const skillName of readdirSync(modulePath)) {
      const skillPath = join(modulePath, skillName);
      const skillFile = join(skillPath, "SKILL.md");
      if (statSync(skillPath).isDirectory() && existsSync(skillFile)) {
        files.push({ name: skillName, file: skillFile });
      }
    }
  }
  return files;
}

let changed = 0;
for (const { name, file } of findSkillFiles()) {
  const content = readFileSync(file, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${file}: no frontmatter block`);

  const data = parseYaml(match[1]);
  const originalDump = JSON.stringify(data);
  const body = content.slice(match.index + match[0].length);

  const meta = data.metadata && typeof data.metadata === "object" ? { ...data.metadata } : {};
  for (const field of ["version", "license", "author"]) {
    if (data[field] !== undefined) {
      meta[field] = data[field];
      delete data[field];
    }
  }
  if (meta["argument-hint"] !== undefined) {
    data["argument-hint"] = meta["argument-hint"];
    delete meta["argument-hint"];
  }
  if (Object.keys(meta).length > 0) {
    data.metadata = meta;
  } else {
    delete data.metadata;
  }
  data.name = name;

  if (JSON.stringify(data) === originalDump) continue;

  // description must survive the round-trip unchanged (only frontmatter *shape* is migrated)
  const frontmatter = dumpYaml(data, { lineWidth: -1, noRefs: true }).trimEnd();
  const rebuilt = `---\n${frontmatter}\n---${body}`;
  const reparsed = parseYaml(rebuilt.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
  if (reparsed.description !== data.description) {
    throw new Error(`${file}: description changed during migration, aborting`);
  }

  writeFileSync(file, rebuilt);
  changed++;
  console.log(`migrated: ${file}`);
}
console.log(`\n${changed} file(s) migrated.`);
