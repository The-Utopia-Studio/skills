#!/usr/bin/env node
// Ad-hoc audit tool for TUS-2598: flags name/description overlap between skills
// for human review. Not part of CI — run manually when auditing the corpus.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";

const SKILLS_DIR = new URL("../skills", import.meta.url).pathname;
const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "for", "to", "of", "in", "on", "with", "use",
  "when", "this", "that", "your", "you", "is", "are", "as", "into", "from",
  "it", "be", "at", "by", "also", "user", "wants", "want", "asks", "mentions",
  "skill", "skills", "e.g", "covers", "including", "based", "not", "than",
]);

function tokens(text) {
  return new Set(
    (text || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

function jaccard(a, b) {
  let overlap = 0;
  for (const x of a) if (b.has(x)) overlap++;
  const union = a.size + b.size - overlap;
  return union === 0 ? 0 : overlap / union;
}

const entries = [];
for (const moduleName of readdirSync(SKILLS_DIR)) {
  const modulePath = join(SKILLS_DIR, moduleName);
  if (!statSync(modulePath).isDirectory()) continue;
  for (const skillName of readdirSync(modulePath)) {
    const file = join(modulePath, skillName, "SKILL.md");
    if (!existsSync(file)) continue;
    const content = readFileSync(file, "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = match ? parseYaml(match[1]) : {};
    entries.push({
      module: moduleName,
      name: skillName,
      nameTokens: tokens(skillName.replace(/-/g, " ")),
      descTokens: tokens(data.description),
    });
  }
}

const pairs = [];
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const a = entries[i], b = entries[j];
    const nameSim = jaccard(a.nameTokens, b.nameTokens);
    const descSim = jaccard(a.descTokens, b.descTokens);
    const score = nameSim * 0.6 + descSim * 0.4;
    if (score >= 0.2) pairs.push({ a, b, nameSim, descSim, score });
  }
}

pairs.sort((x, y) => y.score - x.score);
for (const { a, b, nameSim, descSim, score } of pairs) {
  console.log(
    `${score.toFixed(2)} (name ${nameSim.toFixed(2)} / desc ${descSim.toFixed(2)})  ${a.module}/${a.name}  <->  ${b.module}/${b.name}`
  );
}
console.log(`\n${pairs.length} candidate pair(s) at score >= 0.2`);
