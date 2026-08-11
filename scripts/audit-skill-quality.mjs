#!/usr/bin/env node
// Ad-hoc audit tool for TUS-2597: scores every skill against CONTRIBUTING.md's
// graduation checklist so the weakest ~20% can be flagged for rewrite.
// Not part of CI — run manually when auditing the corpus.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";

const SKILLS_DIR = new URL("../skills", import.meta.url).pathname;

// Headings are the corpus's actual vocabulary for these ideas (surveyed via
// `find skills -name SKILL.md` + heading frequency), not CONTRIBUTING.md's
// literal phrasing — e.g. "Core Principles"/"Quality Check" for "what good
// looks like", "Common Pitfalls"/"Anti-Patterns" for "gotchas".
const CHECKS = [
  {
    key: "what-good-looks-like",
    reason: "no \"what good looks like\" section",
    test: (body) =>
      /^#{1,4}\s*(what good looks like|good output|quality bar|quality check|core principles|key principles|best practices|guardrails|standards)/im.test(
        body
      ),
  },
  {
    key: "gotchas",
    reason: "no gotchas section",
    test: (body) =>
      /^#{1,4}\s*(gotchas|common mistakes|common pitfalls|pitfalls|anti-patterns|edge cases|troubleshooting|what to avoid|what.*does not cover)/im.test(
        body
      ),
  },
  {
    key: "worked-example",
    reason: "no worked example",
    test: (body) =>
      /^#{1,4}\s*(examples?|worked example|sample|walkthrough|case study)/im.test(body) || /```/.test(body),
  },
  {
    key: "trigger-condition",
    reason: "description reads as summary, not trigger condition",
    test: (_body, description) => /use when|use this|use for|use to|use whenever|use if|used when/i.test(description || ""),
  },
];

const results = [];
for (const moduleName of readdirSync(SKILLS_DIR)) {
  const modulePath = join(SKILLS_DIR, moduleName);
  if (!statSync(modulePath).isDirectory()) continue;
  for (const skillName of readdirSync(modulePath)) {
    const file = join(modulePath, skillName, "SKILL.md");
    if (!existsSync(file)) continue;
    const content = readFileSync(file, "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = match ? parseYaml(match[1]) : {};
    const body = match ? content.slice(match.index + match[0].length) : content;

    const failedChecks = CHECKS.filter((c) => !c.test(body, data.description));
    results.push({
      module: moduleName,
      name: skillName,
      lines: content.split("\n").length,
      score: CHECKS.length - failedChecks.length,
      reasons: failedChecks.map((c) => c.reason),
    });
  }
}

// Weakest first: lowest score, then fewest lines (thinner = more likely templated filler)
results.sort((a, b) => a.score - b.score || a.lines - b.lines);

const cutoff = Math.round(results.length * 0.2);
const weakest = results.slice(0, cutoff);

console.log(`${results.length} skills scored. Weakest ${cutoff} (bottom 20%):\n`);
for (const r of weakest) {
  console.log(`${r.module}/${r.name} (${r.lines} lines, score ${r.score}/4) — ${r.reasons.join("; ") || "borderline"}`);
}

const scoreHist = {};
for (const r of results) scoreHist[r.score] = (scoreHist[r.score] || 0) + 1;
console.log("\nScore distribution:", scoreHist);
