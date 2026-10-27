# Sources

This method merges the following. Where they disagreed, the stricter or more measurable practice won.

| Source | What it contributed |
|---|---|
| Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Vocabulary (task, trial, grader, outcome, transcript); grader hierarchy and trade-offs; capability vs regression suites; pass@k vs pass^k; 20–50 tasks from real failures; unambiguous tasks with reference solutions; balanced positive and negative sets; isolated trials; read transcripts; watch for saturation |
| Anthropic, [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Evaluation-driven development (baseline first, three evals minimum); evals.json shape; test on every model you use; frontmatter limits; body under 500 lines; references one level deep; contents list for long files; third-person descriptions with "what + when"; observe how Claude navigates the skill |
| Anthropic skill-creator plugin (its run_eval, run_loop, grader and aggregate_benchmark tools) | Trigger sets of 8–10 positives and 8–10 near-miss negatives; 3 runs per query; 60/40 train/holdout split to stop description overfitting; with-skill vs baseline runs; `grading.json` and `benchmark.json` formats |
| Phil Schmid, [Practical guide to evaluating and testing agent skills](https://www.philschmid.de/testing-skills) | Grade outcome, style and efficiency separately; deterministic checks first, LLM judge with typed output for the rest; 3–5 trials per case; clean environment per case; test in every harness; re-run with the skill unloaded to see if it's still needed |
| Minko Gechev, [Unit tests for AI agent skills](https://blog.mgechev.com/2026/02/26/skill-eval/) | One self-contained directory per task with a reference solution; Docker isolation; weighted deterministic + rubric graders; at least 5 trials; pass@k vs pass^k gap as the flakiness signal; run evals in CI on every skill change |
| mager.co, [Write, eval, iterate a skill](https://mager.co/blog/2026-03-08-write-eval-iterate-skill/) | Trigger accuracy as binary classification (precision/recall); eval-set format; the description optimisation loop with a holdout |
| Arize, [How to write effective AI agent skills](https://arize.com/blog/how-to-write-effective-ai-agent-skills/) | Paired comparison with everything held constant; lift as the ship criterion; multi-metric scorecard; evidence that compact, expert-grounded skills help most and that loading many skills dilutes them |
| Scott Spence, [Measuring Claude Code skill activation with sandboxed evals](https://scottspence.com/posts/measuring-claude-code-skill-activation-with-sandboxed-evals) | Sandboxed activation runs and the value of true-negative cases |

## Utopia-specific evidence

From the October 2026 consolidation of the Utopia skills repo (`<repo>/reports/2026-10-20-skill-consolidation/`):
- At default settings, with about 400 skills installed, Claude picked the expected skill for 58–61% of prompts. With `SLASH_COMMAND_TOOL_CHAR_BUDGET=300000` it picked it for 182 of 190 scored prompts. Most misses were skills whose descriptions weren't visible, so Gate 2 measures both settings.
- Rewriting descriptions at the default budget fixed 13 prompts and broke 10, which is noise. Re-run the whole set after any description change, and judge from repeated runs.
- Prompts that referred to an attached file that wasn't there produced false misses. Trigger prompts must be self-contained.
