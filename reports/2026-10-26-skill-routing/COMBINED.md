# Claude and Codex routing evaluation

Claude measures native skill invocation under its default description budget. Codex measures explicit selection from the full catalog using `gpt-6-astra`, medium reasoning. These are different protocols: keep provider rates separate; do not pool them.

Each prompt has one observation per build. These runs measure routing only, not output quality or stability. The prompts were already used in the routing work, so this is not a held-out generalization test.

| Provider | Build | Scored | Correct | Rate | Errors | Pending |
|---|---|---:|---:|---:|---:|---:|
| claude | before | 328 | 193 | 58.8% | 9 | 0 |
| claude | after | 327 | 215 | 65.7% | 10 | 0 |
| codex | before | 337 | 337 | 100.0% | 0 | 0 |
| codex | after | 337 | 335 | 99.4% | 0 | 0 |

Overall rates above may cover different prompt subsets. Use the paired comparisons below.

| Provider | Paired prompts | Before | After | Fixed | Regressed |
|---|---:|---:|---:|---:|---:|
| claude | 324 | 59.6% | 65.7% | 41 | 21 |
| codex | 337 | 100.0% | 99.4% | 0 | 2 |

Across the 324 prompts scored in all four runs: 0 fixed in both providers, 0 regressed in both, and 0 changed in opposite directions.

[Prompt-level comparison](combined-routing-prompts.csv) · [Machine-readable summary](combined-routing-summary.json)

Regenerate after either provider resumes:

```sh
python3 scripts/compare-routing-evals.py
```

Codex checkpoint metadata records model, reasoning effort, CLI version, catalog/prompt/harness hashes and skill isolation settings. Installed skills, plugins from user config, hooks, shell, browser, computer-use and app tools are excluded. The runner rejects tool/error events and invalid choices, and stops on infrastructure errors. No expected answers are supplied to the model.
