#!/usr/bin/env node
// Generates a significance/adoption report from usage-server events (TUS-2604).
// Source, in priority order:
//   1. $SKILL_USAGE_ENDPOINT/events (the shared usage-server, hooks/usage-server/)
//   2. $SKILL_USAGE_LOG or ~/.claude/skill-usage.log (local-only JSONL fallback)
// Cross-references skill names against docs/skills-index.json for module
// breakdown. Always frames output as a baseline snapshot, never a trend —
// there isn't enough history yet for one.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const REPO_ROOT = new URL("..", import.meta.url).pathname;
const NOW = new Date(process.env.ADOPTION_REPORT_NOW || Date.now());

async function fetchEvents() {
  const endpoint = process.env.SKILL_USAGE_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(`${endpoint}/events?limit=1000`);
      if (res.ok) return { source: `${endpoint}/events`, events: await res.json() };
    } catch {
      // fall through to local file
    }
  }
  const logPath = process.env.SKILL_USAGE_LOG || join(homedir(), ".claude", "skill-usage.log");
  if (!existsSync(logPath)) return { source: logPath, events: [] };
  const lines = readFileSync(logPath, "utf8").trim().split("\n").filter(Boolean);
  return { source: logPath, events: lines.map((l) => JSON.parse(l)) };
}

function loadModuleMap() {
  const indexPath = join(REPO_ROOT, "docs", "skills-index.json");
  const index = JSON.parse(readFileSync(indexPath, "utf8"));
  return new Map(index.skills.map((s) => [s.name, s.module]));
}

const { source, events } = await fetchEvents();
const moduleOf = loadModuleMap();

const countBySkill = new Map();
const countByModule = new Map();
const countByUser = new Map();
const lastSeenBySkill = new Map();

for (const e of events) {
  countBySkill.set(e.skill, (countBySkill.get(e.skill) || 0) + 1);
  countByUser.set(e.user, (countByUser.get(e.user) || 0) + 1);
  const mod = moduleOf.get(e.skill) || "unknown";
  countByModule.set(mod, (countByModule.get(mod) || 0) + 1);
  const ts = new Date(e.ts).getTime();
  if (!lastSeenBySkill.has(e.skill) || ts > lastSeenBySkill.get(e.skill)) lastSeenBySkill.set(e.skill, ts);
}

const topSkills = [...countBySkill.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);

const DAY_MS = 24 * 60 * 60 * 1000;
const allSkillNames = [...moduleOf.keys()];
const zeroUsage30d = allSkillNames.filter((name) => {
  const last = lastSeenBySkill.get(name);
  return !last || NOW.getTime() - last > 30 * DAY_MS;
});
const zeroUsage60d = allSkillNames.filter((name) => {
  const last = lastSeenBySkill.get(name);
  return !last || NOW.getTime() - last > 60 * DAY_MS;
});

const report = {
  generatedAt: NOW.toISOString(),
  source,
  totalEvents: events.length,
  uniqueSkillsUsed: countBySkill.size,
  uniqueUsers: countByUser.size,
  topSkills: topSkills.map(([name, count]) => ({ name, count, module: moduleOf.get(name) || "unknown" })),
  countByModule: Object.fromEntries(countByModule),
  countByUser: Object.fromEntries(countByUser),
  zeroUsage30dCount: zeroUsage30d.length,
  zeroUsage60dCount: zeroUsage60d.length,
  zeroUsage60d,
};

console.log(JSON.stringify(report, null, 2));
