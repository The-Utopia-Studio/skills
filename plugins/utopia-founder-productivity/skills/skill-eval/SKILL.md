---
name: skill-eval
description: >-
  Tests and evaluates Claude skills through five gates (static checks, trigger routing, output
  quality vs a no-skill baseline, run-to-run stability, cost) and gives each a ship, fix, merge or
  retire verdict with evidence. Use when the user asks to test, QA, audit or benchmark a skill or
  skill library, check whether a skill triggers, compare two versions, or decide which skills to
  keep. Not for writing a new skill (use skill-creator).
---

# Skill evaluation

A skill is only as good as three things: Claude can see it and picks it for the right requests, it makes the result better than Claude would do alone, and it does so every time. This skill measures all three and ends in a verdict per skill.

Two rules hold throughout:

- **Evidence or it didn't happen.** Every verdict cites results: a command's output, a scored run, a transcript line. A skill that wasn't run is "untested", not "passing".
- **Evals never touch the outside world.** No real emails, posts, payments, deployments, trades or messages. Run with side-effect tools blocked and use fixtures or dry-run modes. If a skill can't be tested without a live side effect, test up to that step and mark the rest "blocked: needs a sandbox".

## Pick the scope first

| The user wants | Run |
|---|---|
| "Is this one skill OK?" | All five gates on that skill |
| "Did my edit help or break it?" | Gates 2–4, comparing the old version with the new one as the baseline |
| "Audit the whole library" | Batch mode (below): Gate 1 on everything, Gate 2 on everything, Gates 3–4 on a ranked sample |
| "Should we keep it?" | Gate 3 with the no-skill baseline. No lift means it's a retire candidate |

Copy this checklist into your reply and tick it off as you go:

```
Skill eval: <skill or library>
- [ ] Gate 1 Static checks
- [ ] Gate 2 Trigger routing
- [ ] Gate 3 Output quality vs baseline
- [ ] Gate 4 Stability (pass^k)
- [ ] Gate 5 Cost
- [ ] Verdict + report
```

Gates run cheapest first. Stop at the first gate that fails hard: there's no point grading the outputs of a skill whose frontmatter doesn't parse or that never fires.

## Gate 1: Static checks (deterministic, seconds)

Run the bundled checker on one skill folder, several, or a whole tree. Paths below are relative to this skill's folder:

```bash
python3 scripts/static_check.py path/to/skill-folder            # one skill
python3 scripts/static_check.py --all skills/                    # every SKILL.md under a tree
python3 scripts/static_check.py --all skills/ --json > static.json
```

It checks the frontmatter rules (name format and length, matching folder, description present and at most 1024 characters), that the body is under 500 lines, that every relative path mentioned exists, nesting depth of references, tables of contents in long reference files, script syntax, hard-coded personal or sandbox paths, and likely secrets. Errors block. Warnings go in the report. See [references/static-checks.md](references/static-checks.md) for what each check means and how to fix it.

In the Utopia skills repo, also run `npm run validate` (pack membership and evals.json schema).

## Gate 2: Trigger routing (does Claude pick it?)

Write a trigger set per skill, following [references/trigger-evals.md](references/trigger-evals.md):

- **8–10 should-trigger requests:** realistic, varied phrasing, some that never name the skill, and some where a neighbouring skill competes and this one should win.
- **8–10 should-not-trigger near misses:** requests that share its keywords but need a different skill or no skill.

Run each request at least 3 times in a clean, headless session. The Utopia skills repo already has a harness for this. Run it from the repo root (`<skill-dir>` is this skill's folder):

```bash
SLASH_COMMAND_TOOL_CHAR_BUDGET=300000 node scripts/trigger-test.mjs \
  --plugins plugins --file my-trigger-set.tsv --runs 3 -j 4 --output trigger.json
python3 <skill-dir>/scripts/score_triggers.py trigger.json
```

Outside that repo, use skill-creator's `run_eval.py` (see [references/trigger-evals.md](references/trigger-evals.md)), or any runner that records which skill fired, and convert its output to the same row format.

`score_triggers.py` reports, per skill: recall (fired when it should), false-fire count (fired when it shouldn't), the skills that stole its requests, and per-request pass^3.

Measure twice when the library is large: once with the description budget raised (are the descriptions good?) and once at default settings (what users actually get). A big gap between them means descriptions are being cut off, not that they're badly written.

**Pass bar:** recall at least 0.8 and no more than 1 false fire across the negatives, both with the full budget. Below that, fix the description, using the rules in [references/trigger-evals.md](references/trigger-evals.md), and re-run the whole set, not only the cases that failed.

## Gate 3: Output quality against a baseline (does it help?)

Follow [references/output-evals.md](references/output-evals.md). In short:

1. **Write 3–5 realistic tasks** with any input files as fixtures, and a reference answer or clear success criteria for each. Two experts should agree on pass or fail. Store them in the skill's `evals/evals.json` (`prompt`, `expected_output`, `assertions`, `files`).
2. **Run each task with the skill and without it**, same model, same tools, same budget, each trial in a fresh session and folder.
3. **Grade the outcome, not the path.** Use code checks first (file exists, schema valid, numbers reconcile, tests pass), then a rubric judged one dimension at a time by an LLM that may answer "unknown", then a human spot-check of a few transcripts. Give partial credit for multi-part tasks.
4. **Compute lift** as the with-skill pass rate minus the without-skill pass rate, per task and overall.

**Pass bar:** with-skill pass rate at least 0.8 and lift above 0, with no task where the skill makes things worse. Zero or negative lift means Claude already does this well alone, so the skill is a retire or merge candidate unless it exists to enforce a house standard; say which.

If a task scores 0% in every trial, suspect the task or grader before the skill: check that the task is solvable and the grader agrees with a known-good answer.

## Gate 4: Stability (does it work every time?)

Re-run the Gate 3 tasks with the skill at k = 5 trials (k = 3 for a quick pass). Report:

- **pass@k**: at least one trial passed, so the skill *can* do it.
- **pass^k**: every trial passed, so the skill *reliably* does it.

A large gap (for example pass@5 = 100% but pass^5 = 40%) means flaky. Read the failing transcripts and look for an instruction that's ambiguous, a step that's optional when it shouldn't be, or a dependency (network, tool, file) that sometimes fails. If the skill will be used on more than one model, run Gates 2–4 on each (at least the smallest one you support).

**Pass bar:** pass^k at least 0.8 for regression tasks.

## Gate 5: Cost

From the same runs, compare with-skill against baseline on tokens, wall time, tool calls and retries. Also note the skill's always-on cost: its name and description load into every session. Flag a skill that more than doubles cost for little lift, or a description that is long without improving Gate 2.

## Verdict

| Verdict | When |
|---|---|
| **Ship** | Gates 1–4 pass and cost is reasonable |
| **Fix** | Useful lift, but fails a static check, a trigger bar or stability. List the exact fixes |
| **Merge** | Most of its requests route to (or are won by) another skill, or it duplicates another skill's job. Name the target and what content to carry over |
| **Retire** | No lift against the baseline, or depends on something users can't get (a paid data feed, a personal setup). Move it to a sandbox rather than deleting it |
| **Untested** | A gate couldn't run (missing fixture, usage limit, needs a live system). Say what's needed |

Write results with [references/report-template.md](references/report-template.md). In this repo, save library audits under `reports/<date>-skill-eval/`, including the raw JSON from each run, so results can be resumed and compared over time.

## Batch mode (whole library)

1. **Gate 1 on everything.** It's free. Fix errors in bulk first.
2. **Gate 2 on everything**, using one prompt per skill (in the Utopia repo, `<repo>/scripts/trigger-prompts.tsv`), then the full 8–10 + 8–10 set for overlap clusters and any skill that misses.
3. **Rank skills for Gates 3–4** by usage and risk: most-used first, then skills that produce numbers, legal text or anything sent to other people, then the rest. Spread a budget across packs rather than exhausting it on one.
4. **Keep it resumable.** Save checkpoints (`--output`, `--resume`), and stop cleanly on usage limits rather than logging the rest as failures.
5. **Turn results into suites.** Tasks that reach about 100% move to a regression suite run on every edit. Keep adding harder capability tasks so the suite never saturates.

## When this skill's own advice runs out

- Skill has no obvious "correct" output (style, brainstorming): use pairwise blind comparison (with-skill vs without-skill, judge doesn't know which is which) plus a human check.
- Skill drives a live external system: test against a sandbox account or recorded fixtures. Never point evals at production.
- Results contradict an earlier review: keep both, note what differs (model, harness, budget, prompts), and replay the original case if you can get it.

Sources this method is built from are listed in [references/sources.md](references/sources.md).
