# Report template

Use this layout for a single-skill report or a library audit. Every number needs its source: the command, the run file, or the transcript.

## Single skill

```markdown
# Skill eval: <skill-name>

**Verdict: Ship | Fix | Merge | Retire | Untested**. One sentence on why.

Run: <date> · model <id> · harness <Claude Code version> · description budget <default | 300000> · skill version/commit <sha>

| Gate | Result | Bar | Pass |
|---|---|---|---|
| 1 Static | 0 errors, 2 warnings | 0 errors | yes |
| 2 Trigger | recall 0.90, 1 false fire (k=3) | ≥0.8, ≤1 | yes |
| 3 Output | with 0.87 vs without 0.53, lift +0.34 (4 tasks × 5) | ≥0.8, lift > 0 | yes |
| 4 Stability | pass^5 0.75 | ≥0.8 | no |
| 5 Cost | +40% tokens, +20% time vs baseline | judgment | ok |

## Findings
1. <what failed, with evidence: file:line, run id, transcript quote>
2. ...

## Fixes (for Fix) / Merge target (for Merge) / Why retire (for Retire)
- <exact change, owner if known>

## Not tested
- <gate or task that couldn't run, and what's needed to run it>

Raw results: <paths to trigger.json, grading.json, benchmark.json>
```

## Library audit

```markdown
# Skill library eval: <library> · <date>

<N> skills · <M> fully tested · settings: model <id>, budget <...>, runs per prompt <k>

| Verdict | Skills |
|---|---|
| Ship | 0 |
| Fix | 0 |
| Merge | 0 |
| Retire | 0 |
| Untested | 0 |

## Routing at a glance
Default budget: <x>% correct · full budget: <y>% correct · <z> prompts unscored

## Biggest problems
1. <pattern across skills, e.g. 14 descriptions over-claim "pricing">

## Per-skill table
| Skill | Pack | Static | Recall | False fires | Lift | pass^k | Verdict | Note |
|---|---|---|---|---|---|---|---|---|

## Method and limits
What was run, what wasn't, and anything that makes results incomparable with earlier runs (model, budget, prompt set).
```

Store library audits in `reports/<YYYY-MM-DD>-skill-eval/` with `README.md` (this report) plus the raw JSON files, so later runs can resume or be compared.
