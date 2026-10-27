#!/usr/bin/env node
// Skill trigger test: runs each prompt through `claude -p` and reports which skill fired.
// Usage: node scripts/trigger-test.mjs [--group gtm] [--runs 5] [-j 4] [--model sonnet] [--json] [--plugins plugins]
// --plugins <dir>: test the local build in <dir> instead of the installed packs (installed copies are disabled for the run).
// --output <json>: save a checkpoint after each result; --resume <json>: reuse scored observations.
// Resume only with the same model, description budget, plugin build and personal-skill environment.
// Claude Code only lists skill descriptions up to a character budget. With hundreds of skills installed most are
// listed by name only, so run with SLASH_COMMAND_TOOL_CHAR_BUDGET=300000 to measure the descriptions themselves.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const group = opt("--group");
const jobs = Number(opt("-j", 4));
const runs = Number(opt("--runs", 1));
const model = opt("--model");
const asJson = args.includes("--json");
const file = opt("--file", join(dirname(fileURLToPath(import.meta.url)), "trigger-prompts.tsv"));
const output = opt("--output");
const resume = opt("--resume");
if (![jobs, runs].every((n) => Number.isInteger(n) && n > 0)) {
  throw new Error("-j and --runs must be positive integers");
}

const cases = readFileSync(file, "utf8")
  .split("\n")
  .filter((l) => l.trim() && !l.startsWith("#"))
  .map((l) => {
    const [expected, grp, prompt] = l.split("\t");
    return { expected, group: grp, prompt };
  })
  .filter((c) => !group || c.group === group);
if (!cases.length) {
  console.error(`No cases${group ? ` in group "${group}"` : ""} in ${file}`);
  process.exit(1);
}

// Local build: load each pack via --plugin-dir and switch off the installed copy of the same name.
const pluginsDir = opt("--plugins");
const localPacks = pluginsDir
  ? readdirSync(pluginsDir).filter((d) => existsSync(join(pluginsDir, d, ".claude-plugin/plugin.json")))
  : [];
const settings = { disableAllHooks: true, enabledPlugins: Object.fromEntries(localPacks.map((d) => [`${d}@skills`, false])) };

// Empty cwd so no project CLAUDE.md steers routing; no hooks, no MCP, no side-effect tools.
const cwd = mkdtempSync(join(tmpdir(), "trigger-test-"));
const baseArgs = [
  "-p", "--output-format", "stream-json", "--verbose",
  "--max-turns", "4",
  "--no-session-persistence",
  "--strict-mcp-config",
  "--settings", JSON.stringify(settings),
  ...localPacks.flatMap((d) => ["--plugin-dir", resolve(pluginsDir, d)]),
  "--disallowedTools", "Bash", "Edit", "Write", "NotebookEdit", "WebFetch", "WebSearch", "Agent", "Task", "Glob", "Grep", "Read", "Workflow", "Monitor",
  // Neutral context: stops Claude hunting for files in the empty cwd, without nudging it toward skills.
  "--append-system-prompt", "The working directory is empty; there are no project files to inspect.",
  ...(model ? ["--model", model] : []),
];

function run(prompt) {
  return new Promise((resolve) => {
    // Prompt goes on stdin: --disallowedTools is variadic and would swallow a positional prompt.
    const child = spawn("claude", baseArgs, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    child.stdin.end(prompt);
    let buf = "";
    let done = false;
    let textChars = 0;
    // Drain stderr so a verbose child cannot block on a full pipe.
    child.stderr.resume();
    child.stdin.on("error", () => {});
    const finish = (r) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      child.kill();
      resolve(r);
    };
    const timer = setTimeout(() => finish({ error: "timeout" }), 120_000);
    child.on("error", (error) => finish({ error: error.message }));
    child.stdout.on("data", (chunk) => {
      buf += chunk;
      let nl;
      while ((nl = buf.indexOf("\n")) !== -1) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        let ev;
        try { ev = JSON.parse(line); } catch { continue; }
        // Stop at the first Skill call: that's the routing decision, the rest is spend.
        for (const part of ev.message?.content ?? []) {
          if (part.type === "tool_use" && part.name === "Skill") {
            return finish({ skill: part.input?.skill ?? part.input?.name ?? JSON.stringify(part.input) });
          }
          // A long direct answer before any tool call means no skill was chosen; don't pay for the rest.
          if (ev.type === "assistant" && part.type === "text" && (textChars += part.text.length) > 400) {
            return finish({ skill: null });
          }
        }
        // Running out of turns without a Skill call is a routing miss, not an infrastructure error.
        if (ev.type === "result") finish(ev.is_error && ev.subtype !== "error_max_turns" ? { error: String(ev.result ?? ev.subtype).slice(0, 120) } : { skill: null });
      }
    });
    child.on("close", () => finish({ error: "exited without result" }));
  });
}

const matches = (expected, skill) =>
  expected.split("|").some((alt) =>
    alt === "none" ? skill === null
      : alt.includes(":") ? skill === alt
      : skill === alt || (skill ?? "").endsWith(`:${alt}`));

const keyOf = (c) => JSON.stringify([c.expected, c.group, c.prompt]);
const previous = new Map((resume ? JSON.parse(readFileSync(resume, "utf8")) : [])
  .map((t) => [keyOf(t), t]));
// Retain scored observations, retry infrastructure errors and untouched cases.
const tally = cases.map((c) => {
  const old = previous.get(keyOf(c));
  const scored = old ? old.runs - old.errors : 0;
  if (scored > runs) throw new Error("--runs is smaller than the resumed scored run count");
  return {
    ...c, runs: scored, hits: old?.hits ?? 0, errors: 0,
    fired: Object.fromEntries(Object.entries(old?.fired ?? {}).filter(([k]) => !k.startsWith("error:"))),
  };
});
const tasks = tally.flatMap((t) => Array.from({ length: runs - t.runs }, () => t));
const label = (t) => {
  const got = Object.entries(t.fired).sort((a, b) => b[1] - a[1]).map(([k, n]) => (runs > 1 ? `${k} x${n}` : k)).join(", ");
  const ok = t.runs - t.errors;
  t.status = !t.runs ? "PENDING" : !ok ? "ERROR" : t.hits < ok ? "FAIL" : t.runs < runs || t.errors ? "INCOMPLETE" : "PASS";
  return `${t.status.padEnd(5)} ${`${t.hits}/${ok}`.padEnd(5)} ${t.group.padEnd(14)} want ${t.expected}  got ${got}`;
};
const checkpoint = () => {
  if (!output) return;
  tally.forEach(label);
  writeFileSync(`${output}.tmp`, JSON.stringify(tally, null, 2) + "\n");
  renameSync(`${output}.tmp`, output);
};
let next = 0;
let limited = false;
async function worker() {
  while (next < tasks.length && !limited) {
    const t = tasks[next++];
    const r = await run(t.prompt);
    const key = r.error ? `error: ${r.error}` : r.skill ?? "none";
    t.fired[key] = (t.fired[key] ?? 0) + 1;
    if (r.error) t.errors++;
    // Usage limit: every later run would fail too, so stop scheduling and report what we have.
    if (/limit|out of.*credits|not logged in|authentication/i.test(r.error ?? "")) limited = true;
    if (!r.error && matches(t.expected, r.skill)) t.hits++;
    if (++t.runs === runs && !asJson) process.stderr.write(label(t) + "\n");
    checkpoint();
  }
}
await Promise.all(Array.from({ length: Math.min(jobs, tasks.length) }, worker));

tally.forEach(label);
checkpoint();
if (limited) console.error("Stopped early: usage or authentication blocked the run. Resume unfinished prompts later.");
if (asJson) console.log(JSON.stringify(tally, null, 2));
const count = (s) => tally.filter((t) => t.status === s).length;
const hits = tally.reduce((n, t) => n + t.hits, 0);
const scored = tally.reduce((n, t) => n + t.runs - t.errors, 0);
console.error(`\n${count("PASS")}/${tally.length} prompts always hit, ${count("FAIL")} miss, ${count("ERROR")} error, ${count("PENDING")} pending, ${count("INCOMPLETE")} incomplete · hit rate ${hits}/${scored}`);
process.exit(count("PASS") === tally.length ? 0 : 1);
