# Output and stability evals (Gates 3 and 4)

Does the skill make the result better than Claude alone, and does it do so every time?

## Contents
- Vocabulary
- Writing tasks
- The baseline comparison
- Graders
- Stability: pass@k and pass^k
- Isolation and safety
- Reading transcripts
- Keeping suites useful
- Tooling

## Vocabulary

- **Task**: one test with its inputs and success criteria.
- **Trial**: one attempt at a task. Outputs vary between trials, so run several.
- **Grader**: logic that scores one aspect of a trial. A task can have several.
- **Outcome**: the final state (the file, the numbers, the document), not what the agent says it did.
- **Transcript**: the full record of a trial, including tool calls.

## Writing tasks

- Start with **3–5 tasks per skill**, drawn from real requests and real past failures. Twenty to fifty tasks is a strong suite for a library-wide audit. Early on, effects are large, so small samples are enough to see them.
- Each task gets inputs as fixture files, and a reference answer or explicit success criteria. The test: two domain experts reading the criteria would give the same pass/fail verdict.
- Prove each task is solvable. Write or keep a known-good output and check that your graders pass it. A task that scores 0% across many trials usually has a broken task or grader, not a broken skill.
- Cover the skill's main job, its secondary modes (including anything merged into it) and one known failure mode it is supposed to prevent.
- Store tasks in the skill's `evals/evals.json`:

```json
{
  "skill_name": "dcf-model",
  "evals": [
    {
      "id": 1,
      "prompt": "Build a 5-year DCF for the company in files/acme-financials.csv. WACC 11%, terminal growth 3%.",
      "expected_output": "An xlsx with projections, WACC, terminal value and a sensitivity table; equity value per share stated with assumptions.",
      "assertions": [
        "Terminal value uses the Gordon growth formula with g = 3%",
        "Terminal value is under 75% of enterprise value, or the share is flagged",
        "Sensitivity table varies WACC and g",
        "Formulas recalculate without errors"
      ],
      "files": ["evals/files/acme-financials.csv"]
    }
  ]
}
```

## The baseline comparison

Hold everything constant except the skill: same task, model, harness, tools, permissions, budget and graders.

- **New or unproven skill**: compare with-skill against **no skill**.
- **Edited skill**: compare the new version against the **previous version**.
- **Lift** = with-skill pass rate − baseline pass rate. Report it per task and overall.

What lift means:
- **Positive on every task**: the skill earns its place.
- **Zero**: Claude already does this without help. Retire it, or merge it into a skill that adds something, unless it exists to enforce a house standard (format, voice, compliance). In that case, grade those standards explicitly.
- **Negative on any task**: the skill makes things worse there. Find out why before shipping. Common causes are a heavy workflow replacing a better default, bloated instructions, or a tool the agent can't debug.

Published results suggest compact, procedural skills written from real expert practice give the biggest lift. Comprehensive documentation dumps give almost none. Loading many skills at once dilutes all of them.

## Graders

Use the cheapest grader that can answer the question, in this order:

1. **Code-based**: file exists, schema validates, totals reconcile, tests pass, formula recalculates, regex on extracted values. These are fast, objective and repeatable. Write them as small scripts that return pass or fail, and reuse them across iterations.
2. **Model-based**: a rubric for judgment calls (clarity, correctness of reasoning, following house style).
   - Judge **one dimension per call**, not everything at once.
   - Allow the judge to answer **"unknown"** instead of guessing.
   - Give it the reference answer when there is one.
   - **Calibrate** it: have a human grade 10–20 trials and compare. Where they disagree, fix the rubric before trusting the judge.
3. **Human**: spot-check a sample of transcripts every run, and fully review anything high-stakes (legal text, financial numbers, anything sent to other people).

Grading rules:
- **Grade outcomes, not steps.** Don't fail a trial because it took a valid route you didn't expect. If the route itself matters (it must use the bundled script, it must ask before sending), make that an explicit assertion.
- **Allow reasonable variation.** "96.12" against an expected "96.124991" is a pass unless precision is the point.
- **Give partial credit** on multi-part tasks: score each assertion, then set a threshold.
- **Make graders hard to game.** Passing should require actually solving the task.

Record grading in skill-creator's format (`grading.json` with `expectations[]` of `text`, `passed`, `evidence`), so its viewer and benchmark tools work on the results.

## Stability: pass@k and pass^k

Run each task k times with the skill (k = 5 for a release, 3 for a quick check):

- **pass@k**: at least one of k trials passed. This measures capability.
- **pass^k**: all k trials passed. This measures reliability, which is what users experience.

They diverge quickly. A skill that passes 75% of single trials has pass^3 ≈ 42%. A big gap between pass@k and pass^k means the skill is flaky, so read the failing transcripts.

Also re-run on every model the skill will be used with. What works on a large model can be under-specified for a small one, and over-explained for a large one.

Temperature 0 doesn't make runs repeatable, so judge a distribution of runs, never a single one.

## Isolation and safety

- **Fresh environment per trial**: a new temp folder or container, with no leftover files, caches or git history. Shared state produces correlated failures or inflated scores.
- **Same interface as real use**: run through the CLI or harness people actually use, and capture structured output (`--output-format stream-json`).
- **No live side effects.** Block send, post, deploy and payment tools, or point them at sandbox accounts and recorded fixtures. A skill whose core job is an external action gets tested up to the confirmation step; the rest is marked "blocked: needs sandbox".
- **Watch for shared limits.** Rate limits and usage caps fail many trials at once. Treat those as infrastructure errors, not skill failures, and resume later.

## Reading transcripts

Scores alone mislead. For each run, read a few passing and all failing transcripts:
- Did it fail fairly, or did the grader miss a correct answer?
- Did Claude find and follow the right reference file, or skip it?
- Did it never open a bundled file? That file may be unnecessary, or badly signposted.
- Did it read the same file every time? That content may belong in SKILL.md.

## Keeping suites useful

- **Capability suite**: tasks the skill can't yet do reliably. It starts with a low pass rate and should climb.
- **Regression suite**: tasks it passes about 100% of the time. Run it on every edit to catch backsliding.
- When a capability task reaches about 100%, graduate it to the regression suite and add a harder one. A suite at 100% gives no signal.
- Every real failure a user reports becomes a new task.

## Tooling

- **Utopia skills repo**: `<repo>/scripts/trigger-test.mjs` handles routing. For output runs, have subagents execute each task with and without the skill in separate temp folders, then grade with code checks plus a rubric judge.
- **Anthropic skill-creator** (installed with the official plugins) has a full output-eval loop. It runs with-skill and baseline trials, grades them against `<skill-creator>/agents/grader.md`, aggregates with `<skill-creator>/scripts/aggregate_benchmark.py` into `benchmark.json` (pass rate, time and tokens, with mean ± stddev and delta), and shows a side-by-side review in `eval-viewer/generate_review.py`. Use its formats so results stay comparable.
