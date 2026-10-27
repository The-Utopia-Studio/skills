# Codex routing evaluation — handoff to Claude

Both runs are complete: 337 matched prompts, one scored observation per build, no infrastructure errors in the final checkpoints.

| Build | Correct | Scored | Accuracy |
|---|---:|---:|---:|
| Before | 337 | 337 | 100.0% |
| After | 335 | 337 | 99.4% |

Paired changes: 0 fixes and 2 regressions.

The baseline is already at 100% on this suite. This test can expose regressions, but cannot demonstrate an accuracy gain; harder held-out near-miss requests and native invocation tests are needed to discriminate further.

## Changed outcomes to review

- **regressed — expected `expansion-retention`**
  - Request: We just defined three new customer segments from our usage data (power teams, solo admins, dormant accounts). Map each to GTM and CS plays with owners, timing and KPIs so marketing, sales and CS know who does what.
  - Before: `utopia-gtm:expansion-retention`; after: `utopia-gtm:gtm-strategy`.

- **regressed — expected `customer-research`**
  - Request: Analyze our loyalty program members: we have 42K members across Silver, Gold and Platinum tiers, Gold members redeem 3x more but churn faster after month 6. Segment them, identify the insights behind the behavior and design experiments to test.
  - Before: `utopia-gtm:customer-research`; after: `utopia-founder-productivity:market-segments`.

Treat these as single-observation findings. Review the expected label and neighboring skill boundaries before changing descriptions; do not rerun only the misses to replace these observations.

## What was measured

Codex CLI, gpt-6-astra, medium reasoning. Each request ran in a fresh session with the complete catalog of skill names and descriptions, a structured choice of one pack-qualified skill or none, and no expected answer. Installed skills and tools were excluded. Two sessions ran concurrently; the baseline finished before the updated build began. The baseline uses commit 325292b's plugin build. Exact catalog snapshots and metadata hashes are included.

This is explicit full-catalog selection, NOT native skill invocation. Claude's existing evaluation uses native invocation with its default description budget. Do not pool accuracy rates across these different protocols, and do not describe a Codex selection as proof that a skill would be invoked or produce good work. One observation per condition does not measure stability. These are existing suite prompts, not a held-out set.

## Files

- `routing-before.json`, `routing-after.json`: raw scored rows in the existing trigger-test format, with usage and duration observations.
- `scores-before.json`, `scores-after.json`: existing score_triggers.py output.
- `paired-comparison.csv`, `paired-comparison.json`: prompt-aligned Codex results, including fixed/regressed labels.
- `catalog-before.json`, `catalog-after.json`: the exact full catalogs supplied to Codex.
- `routing-before.meta.json`, `routing-after.meta.json`: model, effort, CLI version, protocol and input fingerprints.
- `prompts-before.tsv`, `prompts-after.tsv`: the exact evaluation requests and expected routes.
- `scripts/`: runner, tests, scorer and comparison/export helpers from the repository.
- `SHA256SUMS`: checksums for all other archive members.

## Instructions for Claude when your runs finish

1. Score your own before/after checkpoints with the existing trigger scorer.
2. Join the four runs by exact `prompt` text. Expected skill names and groups can change across builds, so do not use them as the join key. Validate uniqueness and identical prompt sets first.
3. Show separate Claude and Codex before/after tables. For each provider, compare only prompts scored in both of its runs; exclude infrastructure errors and pending rows.
4. On prompts scored in all four runs, count fixes/regressions shared by both providers and changes in opposite directions. Keep provider and protocol labels in every result.
5. Preserve these Codex results as a completed, separate experiment. Do not append Claude observations to the Codex checkpoints or rerun them with a different model under the same metadata.

If using the original repository layout, place this bundle's Codex data under `reports/2026-10-26-skill-routing/codex/`, retain Claude checkpoints in the parent directory, and run `python3 scripts/compare-routing-evals.py` from the repository root. The standalone CSV and JSON can also be joined without the repository.
