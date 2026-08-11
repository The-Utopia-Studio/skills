#!/usr/bin/env node
// One-off application of the TUS-2599 dedup-audit cross-reference rewrites
// in scripts/tus-2599-descriptions.json. Only touches the description field —
// asserts every other frontmatter key is unchanged before writing.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml, dump as dumpYaml } from "js-yaml";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const jsonFile = process.argv[2] || "scripts/tus-2599-descriptions.json";
const descriptions = JSON.parse(readFileSync(join(REPO_ROOT, jsonFile), "utf8"));

let changed = 0;
for (const [skillPath, newDescription] of Object.entries(descriptions)) {
  const file = join(REPO_ROOT, "skills", skillPath, "SKILL.md");
  const content = readFileSync(file, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${file}: no frontmatter block`);

  const data = parseYaml(match[1]);
  const body = content.slice(match.index + match[0].length);

  const before = { ...data };
  delete before.description;
  data.description = newDescription;
  const after = { ...data };
  delete after.description;
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    throw new Error(`${file}: non-description fields changed, aborting`);
  }

  const frontmatter = dumpYaml(data, { lineWidth: -1, noRefs: true }).trimEnd();
  writeFileSync(file, `---\n${frontmatter}\n---${body}`);
  changed++;
  console.log(`updated: skills/${skillPath}/SKILL.md`);
}
console.log(`\n${changed} description(s) updated.`);
