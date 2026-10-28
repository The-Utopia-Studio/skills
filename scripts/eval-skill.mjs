#!/usr/bin/env node
// Tier 2 and Tier 3 of the skill quality gate. Writes signed reports that scripts/skill_gate.py checks in CI.
//
//   npm run eval:skill -- <skill>                     Tier 2: routing (does Claude pick it, does it steal from neighbours)
//   npm run eval:skill -- <skill> --output-quality    Tier 3: output quality with the skill vs no skill, and stability
//   options: --runs N (routing, default 3)  --trials K (output, default 3)  -j N (default 2)  --model M  --no-build
//
// Needs an authenticated `claude` CLI. Routing runs with every description visible
// (SLASH_COMMAND_TOOL_CHAR_BUDGET=300000) so the result measures the skill's own name and description.
// Nothing here sends, posts, deploys or pays: side-effect tools are blocked and every run uses a fresh temp folder.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const skill = args.find((a, i) => !a.startsWith("-") && !["--runs", "--trials", "-j", "--model"].includes(args[i - 1]));
if (!skill) {
  console.error("usage: npm run eval:skill -- <skill> [--output-quality] [--runs 3] [--trials 3] [-j 2] [--model M] [--no-build]");
  process.exit(2);
}
const cfg = JSON.parse(readFileSync(join(ROOT, "scripts/skill-gate.config.json"), "utf8"));
const runs = Number(opt("--runs", cfg.routing_bars.min_runs));
const trials = Number(opt("--trials", cfg.output_bars.min_trials));
const jobs = Number(opt("-j", 2));
const model = opt("--model");

const py = (...a) => {
  const r = spawnSync("python3", ["-I", join(ROOT, "scripts/skill_gate.py"), ...a], { cwd: ROOT, encoding: "utf8" });
  if (r.status) throw new Error(r.stderr || r.stdout);
  return JSON.parse(r.stdout);
};
const info = py("hash", skill);
const skillDir = join(ROOT, info.path);
const packs = JSON.parse(readFileSync(join(ROOT, "packs.config.json"), "utf8")).packs;
const pack = packs.find((p) => p.skills.includes(skill));
if (!pack) {
  console.error(`${skill} is not in any pack in packs.config.json; add it there first (the gate evaluates packed skills).`);
  process.exit(2);
}

// Rebuild plugins/ so the local build contains the skill exactly as it is on disk.
if (!flag("--no-build")) {
  const bash = ["/opt/homebrew/bin/bash", "/usr/local/bin/bash", "bash"].find((b) => b === "bash" || existsSync(b));
  const b = spawnSync(bash, ["./build-packs.sh"], { cwd: ROOT, encoding: "utf8" });
  if (b.status) {
    console.error(`build-packs.sh failed (it needs bash 4+ and jq):\n${b.stderr || b.stdout}`);
    process.exit(1);
  }
}
const pluginDirs = readdirSync(join(ROOT, "plugins")).filter((d) => existsSync(join(ROOT, "plugins", d, ".claude-plugin/plugin.json")));
const disableInstalled = Object.fromEntries(pluginDirs.map((d) => [`${d}@skills`, false]));

const tsvRows = (text) => text.split("\n").filter((l) => l.trim() && !l.startsWith("#")).map((l) => l.split("\t")).filter((c) => c.length >= 3 && c[2].trim());
const firstAlt = (e) => e.split("|")[0].split(":").pop();

// ---------- Tier 2: routing ----------
function neighbours() {
  // Skills a new one is most likely to steal from: same GTM sub-module or group folder, skills it or they
  // name in "use X", and the closest descriptions by word overlap. Capped at 8.
  const descs = Object.fromEntries(pluginDirs.flatMap((d) => readdirSync(join(ROOT, "plugins", d, "skills")).map((s) => {
    const t = readFileSync(join(ROOT, "plugins", d, "skills", s, "SKILL.md"), "utf8");
    const fm = t.split(/^---$/m)[1] || "";
    const m = fm.match(/^description:[ \t]*(?:[>|][-+]?)?([\s\S]*?)(?=^[A-Za-z_][\w-]*:|(?![\s\S]))/m);
    return [s, (m ? m[1] : "").replace(/\s+/g, " ").trim()];
  })));
  const mine = descs[skill] || "";
  const words = (s) => new Set((s.toLowerCase().match(/[a-z]{4,}/g) || []));
  const W = words(mine);
  const score = {};
  for (const [n, d] of Object.entries(descs)) {
    if (n === skill) continue;
    const o = words(d); let inter = 0; for (const w of o) if (W.has(w)) inter++;
    score[n] = inter / (W.size + o.size - inter || 1);
    if (mine.includes(n) || d.includes(skill)) score[n] += 1;
  }
  const subs = (pack.submodules || []).find((s) => s.skills.includes(skill));
  for (const n of subs ? subs.skills : []) if (n !== skill) score[n] = (score[n] || 0) + 0.5;
  return Object.entries(score).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([n]) => n);
}

function runHarness(file, out) {
  const resume = existsSync(out) ? ["--resume", out] : [];
  if (resume.length) console.log("resuming earlier results for this skill version; only missing runs will execute");
  const r = spawnSync(process.execPath, [join(ROOT, "scripts/trigger-test.mjs"), "--file", file, "--plugins", join(ROOT, "plugins"),
    "--runs", String(runs), "-j", String(jobs), "--timeout", "240", "--output", out, ...resume, ...(model ? ["--model", model] : [])],
    { cwd: ROOT, encoding: "utf8", env: { ...process.env, SLASH_COMMAND_TOOL_CHAR_BUDGET: "300000" }, stdio: ["ignore", "inherit", "inherit"] });
  if (!existsSync(out)) throw new Error("routing harness produced no results");
  return JSON.parse(readFileSync(out, "utf8"));
}

async function routing() {
  const own = existsSync(join(skillDir, "evals/triggers.tsv")) ? tsvRows(readFileSync(join(skillDir, "evals/triggers.tsv"), "utf8")) : [];
  const central = tsvRows(readFileSync(join(ROOT, "scripts/trigger-prompts.tsv"), "utf8"));
  const positives = own.length ? own.filter((c) => c[0].split("|").map((a) => a.split(":").pop()).includes(skill))
    : central.filter((c) => firstAlt(c[0]) === skill);
  const negatives = own.filter((c) => !c[0].split("|").map((a) => a.split(":").pop()).includes(skill));
  const near = neighbours();
  const neighbourRows = central.filter((c) => near.includes(firstAlt(c[0])));
  if (!positives.length) throw new Error(`no should-fire prompts for ${skill}: add evals/triggers.tsv`);
  // Results are kept per skill version, so re-running only fills in runs that timed out or never ran.
  const tmp = join(tmpdir(), `eval-${skill}-${info.routing_hash.slice(0, 12)}`);
  mkdirSync(tmp, { recursive: true });
  const file = join(tmp, "prompts.tsv");
  const tag = (rows, g) => rows.map((c) => [c[0], g, c[2]].join("\t"));
  writeFileSync(file, [...tag(positives, "positive"), ...tag(negatives, "negative"), ...tag(neighbourRows, "neighbour")].join("\n") + "\n");
  console.log(`routing: ${positives.length} should-fire, ${negatives.length} near-miss, ${neighbourRows.length} neighbour prompts (${near.join(", ")}) × ${runs} runs`);
  const rows = runHarness(file, join(tmp, "results.json"));
  const fired = (r) => Object.entries(r.fired || {}).filter(([k]) => !k.startsWith("error:")).map(([k, n]) => [k.split(":").pop(), n]);
  const sum = (rs, f) => rs.reduce((n, r) => n + f(r), 0);
  const pos = rows.filter((r) => r.group === "positive"), neg = rows.filter((r) => r.group === "negative"), nb = rows.filter((r) => r.group === "neighbour");
  const scored = (r) => r.runs - r.errors;
  const posRuns = sum(pos, scored);
  const recall = posRuns ? sum(pos, (r) => r.hits) / posRuns : 0;
  const falseFires = sum(neg, (r) => fired(r).filter(([k]) => k === skill).reduce((n, [, c]) => n + c, 0));
  const steals = sum(nb, (r) => fired(r).filter(([k]) => k === skill).reduce((n, [, c]) => n + c, 0));
  const unscored = sum(rows, (r) => r.errors + Math.max(0, runs - r.runs));
  const b = cfg.routing_bars;
  const failures = [];
  if (recall < b.min_recall) failures.push(`recall ${recall.toFixed(2)} < ${b.min_recall}`);
  if (falseFires > b.max_false_fires) failures.push(`${falseFires} false fires > ${b.max_false_fires}`);
  if (steals > b.max_neighbour_steals) failures.push(`stole ${steals} neighbour prompts > ${b.max_neighbour_steals}`);
  if (runs < b.min_runs) failures.push(`only ${runs} runs per prompt (gate needs ${b.min_runs})`);
  if (unscored > 0) failures.push(`${unscored} runs unscored (timeouts or limits); re-run`);
  const missed = pos.filter((r) => r.hits < scored(r)).map((r) => ({ prompt: r.prompt, fired: r.fired }));
  const stolen = nb.filter((r) => fired(r).some(([k]) => k === skill)).map((r) => ({ prompt: r.prompt, expected: r.expected, fired: r.fired }));
  const report = {
    skill, pack: pack.name, kind: "routing", pass: failures.length === 0, failures,
    routing_hash: info.routing_hash, date: new Date().toISOString(), model: model || "claude CLI default",
    description_budget: 300000, runs_per_prompt: runs, neighbours: near,
    counts: { positives: positives.length, negatives: negatives.length, neighbour_prompts: neighbourRows.length },
    results: { recall: Number(recall.toFixed(3)), false_fires: falseFires, neighbour_steals: steals, unscored_runs: unscored },
    bars: b, missed, stolen,
  };
  writeFileSync(join(skillDir, "evals/routing-report.json"), JSON.stringify(report, null, 2) + "\n");
  if (report.pass) rmSync(tmp, { recursive: true, force: true });
  return report;
}

// ---------- Tier 3: output quality and stability ----------
function claude(prompt, { cwd, withSkill, timeoutMs = 600_000, judge = false }) {
  return new Promise((done) => {
    const settings = { disableAllHooks: true, enabledPlugins: disableInstalled };
    const a = ["-p", "--output-format", "json", "--no-session-persistence", "--strict-mcp-config", "--settings", JSON.stringify(settings),
      "--disallowedTools", "Bash", "WebFetch", "WebSearch", "Agent", "Task", "Workflow", "Monitor", "NotebookEdit",
      ...(withSkill ? pluginDirs.flatMap((d) => ["--plugin-dir", join(ROOT, "plugins", d)]) : ["Skill"]),
      ...(judge ? ["Read", "Write", "Edit", "Glob", "Grep"] : ["--permission-mode", "acceptEdits"]),
      ...(model ? ["--model", model] : [])];
    const child = spawn("claude", a, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    let out = "", finished = false;
    const end = (v) => { if (!finished) { finished = true; clearTimeout(t); child.kill(); done(v); } };
    const t = setTimeout(() => end({ error: "timeout" }), timeoutMs);
    child.stdout.on("data", (c) => (out += c));
    child.stderr.on("data", () => {});
    child.on("error", (e) => end({ error: e.message }));
    child.on("close", () => {
      try { const j = JSON.parse(out); end(j.is_error ? { error: String(j.result).slice(0, 200) } : { text: j.result || "" }); }
      catch { end({ error: "unparseable output" }); }
    });
    child.stdin.end(prompt);
  });
}

function filesIn(dir) {
  const out = [];
  const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else out.push(p); } };
  walk(dir);
  return out.map((p) => {
    const rel = relative(dir, p);
    const big = statSync(p).size > 40_000;
    const text = big ? null : readFileSync(p, "utf8");
    return /[\x00-\x08]/.test(text || "") || big ? `--- ${rel} (binary or large, ${statSync(p).size} bytes)` : `--- ${rel}\n${text}`;
  }).join("\n").slice(0, 60_000);
}

async function grade(evalCase, output) {
  // One judge call per trial; each assertion judged on its own, "unknown" allowed. Outcome, not path.
  const prompt = `You are grading one AI output against assertions. Judge each assertion independently and strictly from the output shown.
Grade the outcome, not the method. If the output doesn't let you decide, answer "unknown". Reply with JSON only:
{"assertions":[{"text":"...","verdict":"pass|fail|unknown","evidence":"short quote or reason"}]}

TASK:
${evalCase.prompt}

WHAT A GOOD RESULT LOOKS LIKE:
${evalCase.expected_output}

ASSERTIONS:
${evalCase.assertions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

OUTPUT TO GRADE (final reply, then any files it created):
${output}`;
  const cwd = mkdtempSync(join(tmpdir(), "judge-"));
  const r = await claude(prompt, { cwd, withSkill: false, timeoutMs: 300_000, judge: true });
  rmSync(cwd, { recursive: true, force: true });
  if (r.error) return { error: r.error };
  const m = r.text.match(/\{[\s\S]*\}/);
  try {
    const verdicts = JSON.parse(m[0]).assertions;
    const passed = verdicts.filter((v) => v.verdict === "pass").length;
    return { verdicts, score: passed / evalCase.assertions.length };
  } catch { return { error: "judge reply was not valid JSON" }; }
}

async function outputQuality() {
  const ev = JSON.parse(readFileSync(join(skillDir, "evals/evals.json"), "utf8"));
  const cases = ev.evals || [];
  if (!cases.length) throw new Error("evals/evals.json has no cases");
  // Finished trials are kept per skill version, so a re-run only repeats trials that errored or never ran.
  const cacheFile = join(tmpdir(), `eval-out-${skill}-${info.output_hash.slice(0, 12)}.json`);
  const cached = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")).filter((r) => !r.error) : [];
  const done = new Set(cached.map((r) => `${r.case}|${r.condition}|${r.trial}`));
  const tasks = [];
  for (const [ci, c] of cases.entries()) for (const cond of ["with_skill", "without_skill"]) for (let k = 0; k < trials; k++) {
    if (!done.has(`${ci}|${cond}|${k}`)) tasks.push({ ci, c, cond, k });
  }
  console.log(`output quality: ${cases.length} cases × ${trials} trials × with/without skill; ${cached.length} done earlier, ${tasks.length} to run (each graded by a judge)`);
  const results = [...cached];
  const save = () => writeFileSync(cacheFile, JSON.stringify(results));
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const t = tasks[next++];
      const cwd = mkdtempSync(join(tmpdir(), `out-${skill}-`));
      for (const f of t.c.files || []) {
        const src = join(skillDir, f);
        if (existsSync(src)) writeFileSync(join(cwd, f.split("/").pop()), readFileSync(src));
      }
      const prompt = t.cond === "with_skill" ? `Use the ${skill} skill for this.\n\n${t.c.prompt}` : t.c.prompt;
      const r = await claude(prompt, { cwd, withSkill: t.cond === "with_skill" });
      const g = r.error ? { error: r.error } : await grade(t.c, `${r.text}\n\n${filesIn(cwd)}`);
      rmSync(cwd, { recursive: true, force: true });
      results.push({ case: t.ci, condition: t.cond, trial: t.k, ...g });
      save();
      process.stderr.write(`${t.cond.padEnd(13)} case ${t.ci + 1} trial ${t.k + 1}: ${g.error ? "error " + g.error : g.score.toFixed(2)}\n`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(jobs, tasks.length) }, worker));
  const ok = results.filter((r) => !r.error);
  const mean = (rs) => (rs.length ? rs.reduce((n, r) => n + r.score, 0) / rs.length : 0);
  const withS = mean(ok.filter((r) => r.condition === "with_skill"));
  const without = mean(ok.filter((r) => r.condition === "without_skill"));
  const threshold = cfg.output_bars.min_with_skill_score;
  const perCase = cases.map((c, ci) => {
    const w = ok.filter((r) => r.case === ci && r.condition === "with_skill");
    const o = ok.filter((r) => r.case === ci && r.condition === "without_skill");
    return { case: ci + 1, prompt: c.prompt.slice(0, 120), with_skill: Number(mean(w).toFixed(3)), without_skill: Number(mean(o).toFixed(3)),
      trials: w.length, stable: w.length === trials && w.every((r) => r.score >= threshold) };
  });
  const stable = perCase.filter((p) => p.stable).length / perCase.length;
  const b = cfg.output_bars;
  const failures = [];
  if (withS < b.min_with_skill_score) failures.push(`with-skill score ${withS.toFixed(2)} < ${b.min_with_skill_score}`);
  if (!(withS - without > b.min_lift)) failures.push(`lift ${(withS - without).toFixed(2)} is not above ${b.min_lift}`);
  if (stable < b.min_stable_cases) failures.push(`only ${(stable * 100).toFixed(0)}% of cases pass every trial (need ${b.min_stable_cases * 100}%)`);
  if (trials < b.min_trials) failures.push(`only ${trials} trials (gate needs ${b.min_trials})`);
  const errors = results.length - ok.length;
  if (errors) failures.push(`${errors} runs errored (timeouts or limits); re-run`);
  const worse = perCase.filter((p) => p.with_skill < p.without_skill).map((p) => p.case);
  if (worse.length) failures.push(`skill made case(s) ${worse.join(", ")} worse than no skill`);
  const report = {
    skill, pack: pack.name, kind: "output", pass: failures.length === 0, failures,
    output_hash: info.output_hash, date: new Date().toISOString(), model: model || "claude CLI default", trials_per_case: trials,
    results: { with_skill: Number(withS.toFixed(3)), without_skill: Number(without.toFixed(3)), lift: Number((withS - without).toFixed(3)),
      stable_cases: Number(stable.toFixed(3)), errored_runs: errors },
    bars: b, cases: perCase,
    trials: results.map(({ verdicts, ...r }) => ({ ...r, failed: (verdicts || []).filter((v) => v.verdict !== "pass").map((v) => v.text) })),
  };
  writeFileSync(join(skillDir, "evals/output-report.json"), JSON.stringify(report, null, 2) + "\n");
  if (report.pass) rmSync(cacheFile, { force: true });
  return report;
}

const report = flag("--output-quality") ? await outputQuality() : await routing();
console.log(`\n${report.kind} report for ${skill}: ${report.pass ? "PASS" : "FAIL"}`);
console.log(JSON.stringify(report.results));
for (const f of report.failures) console.log(`  - ${f}`);
console.log(`written to ${relative(ROOT, join(skillDir, `evals/${report.kind}-report.json`))}; commit it with the skill.`);
process.exit(report.pass ? 0 : 1);
