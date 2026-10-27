# Codex before-and-after catalog evaluation

Completed 27 October 2026: **337/337 correct before, 335/337 after**, two regressions and no infrastructure errors. See [the exportable handoff](HANDOFF.md) or [the ZIP](../codex-routing-evaluation.zip). This Codex evaluation did not resume Claude; its results can be synced later, then compared with `python3 scripts/compare-routing-evals.py`.

This is a separate, full-catalog classification experiment: select one pack-qualified skill or `none` for each of the existing 337 requests. The expected skill and category are never sent to the model. It does not execute skills or evaluate their output quality. Do not pool its rates with Claude's native invocation/default-description-budget results.

Configuration: `gpt-6-astra`, medium reasoning, one fresh session per prompt, two concurrent sessions, before build followed by after build. The before plugin build is commit `325292b`; the after build is this branch's plugin build. Catalog JSON and SHA-256 hashes are saved alongside checkpoints. The runner disables installed skills (including symlink targets), bundled skills, hooks, app connections, shell, browser, computer use and multi-agent tools. User config is ignored. An explicit JSON schema restricts choices to the supplied catalog. Unexpected tool/error events fail closed.

The isolation preflight rendered Codex's prompt locally and confirmed no available-skills catalog remained. Earlier diagnostic pilots that still included personal skills were excluded and kept outside these results. The accepted run uses the fingerprints in `routing-before.meta.json` and `routing-after.meta.json`.

## Run or resume

Requires the authenticated Codex CLI and Python with PyYAML. Locate the existing baseline checkout with `git worktree list`, then run:

```sh
python3 scripts/codex-routing-eval.py \
  --before-plugins <checkout-of-325292b>/plugins \
  --after-plugins plugins \
  --output reports/2026-10-26-skill-routing/codex
python3 scripts/compare-routing-evals.py
```

Do not launch a second runner while one is active. The same command resumes only unscored/error rows and refuses metadata mismatches. A timeout or other infrastructure error stops scheduling after the current two-session batch. The default timeout is 180 seconds. A `FAIL` is a valid scored routing miss; `ERROR` is not scored.

The comparison script regenerates separate provider scoring files, the combined summary, and a CSV aligned by exact prompt text. Run it again after Claude resumes. One observation per condition is preliminary evidence, not a stability or release-quality verdict.

Validation:

```sh
python3 scripts/codex-routing-eval.test.py
npm run ceramic:doctor
git diff --check
```
