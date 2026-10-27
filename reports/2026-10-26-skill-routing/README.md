# Skill routing optimisation

26–27 October 2026. Every packed skill was reviewed for category, name and description so that coding agents pick the right one. The review was then measured with the `skill-eval` gates 1–2.

## Why names matter most

Claude Code lists every installed skill as `name: description`. The list has a budget of about 1% of the context window. When it overflows, Claude Code drops descriptions, starting with the least-used skills, but **always keeps every name**. With 254 Utopia skills plus other plugins, the list overflows, so many skills are chosen from their name alone. That gives two levers:

1. **Names that say the job.** 54 skills had opaque, metaphorical or domain-less names (`ink`, `proof`, `audit`, `physics-floor-gap`, `ckm-design`) and were renamed.
2. **Shorter descriptions with the job first.** Every description was rewritten in third person: job first, then "Use when …", with at most one "Not for X (use Y)" boundary.

| | Before | After |
|---|---:|---:|
| Mean description length | 577 chars | 399 chars |
| Longest description | 999 chars | 480 chars |
| Full listing (all 254 names + descriptions) | 151,785 chars (~38k tokens) | 106,834 chars (~27k tokens), −30% |
| Static errors / warnings (`static_check.py --all plugins`) | 11 / 386 | 10 / 344 |
| Descriptions with no "Use when" clause | 37 | 6 |
| Descriptions under 200 chars | 11 | 0 |

## Renames and moves

The full table is in [migration.tsv](migration.tsv). Each skill's new description and the reason for each decision are in [proposals.json](proposals.json).

How the renames were chosen:
- **Kept:** the personas (`ada`, `khalil`, `salim`), names of external products and tools (`railway`, `vercel-…`, `obsidian-…`, `huggingface-…`, `last30days`, `impeccable`), and `ui-walkthrough`, which matches its external repo and the `prview` plugin.
- **Design pipeline:** all its skills now share a `ui-` prefix, so they sort together.
- **Icarus curriculum:** names were kept where fellows learn them as taught terms, and renamed only where a name was a pure metaphor. Each rationale is in proposals.json.
- **References:** references to renamed skills were updated in other skills, `agents/`, the guides, the Icarus list, the GTM sub-module map, the trigger prompts and the test scripts. Historical reports were left as they were.
- **Exceptions:** in [not-renamed-mentions.txt](not-renamed-mentions.txt), single-word names are deliberately left unchanged where the word means something else: `ink` as a colour token in diagram-design, `audit` as a skillshare CLI subcommand, `critique` as a mode argument, and `layout` as a config key.

| Old name | New name | Pack change |
|---|---|---|
| `adapt` | `ui-responsive` |  |
| `agent-dx-cli-scale` | `cli-agent-dx-score` |  |
| `animate` | `ui-animation` |  |
| `auction-first-price-shading` | `auction-sealed-bid-pricing` |  |
| `audit` | `ui-audit` |  |
| `bolder` | `ui-bolder` |  |
| `bottoms-up-quantification` | `bottoms-up-market-sizing` |  |
| `business-narrative-builder` | `valuation-narrative` | gtm → investments |
| `ckm-brand` | `brand-guidelines` |  |
| `ckm-design` | `brand-graphics` |  |
| `ckm-design-system` | `design-tokens` |  |
| `ckm-ui-styling` | `shadcn-tailwind-ui` |  |
| `clarify` | `ui-microcopy` |  |
| `code-structure` | `service-layer-refactor` |  |
| `colorize` | `ui-color` |  |
| `company-moc` | `obsidian-company-map` | gtm → founder-productivity |
| `cost-optimizer` | `cloud-cost-optimizer` |  |
| `critique` | `ui-critique` |  |
| `defuddle` | `defuddle-web-extract` |  |
| `delight` | `ui-delight` |  |
| `design-of-experiments` | `design-of-experiments` | investments → product |
| `devops-advisor` | `infra-scaling-review` |  |
| `distill` | `ui-simplify` |  |
| `earned-autonomy` | `agent-autonomy-levels` |  |
| `efecto-social-media` | `efecto-social-media` | gtm → product |
| `email-sequence` | `email-sequence` | sub-module → Marketing & Comms |
| `environmental-scanning-foresight` | `trend-scanning-foresight` |  |
| `evidence-driven-testing` | `pr-test-evidence-video` |  |
| `four-lenses-test` | `concept-four-lenses-test` |  |
| `greploop` | `greptile-review-loop` |  |
| `growth-strategy` | `fellow-growth-strategy` |  |
| `hypotheticals-counterfactuals` | `what-if-scenario-analysis` |  |
| `identify-assumptions-new` | `identify-risky-assumptions` |  |
| `ink` | `ink-terminal-ui` |  |
| `integration-linker` | `dev-tool-integrations` |  |
| `interface-craft` | `ui-animation-storyboard` |  |
| `invent-by-hand` | `invent-product-concept` |  |
| `layout` | `ui-layout-spacing` |  |
| `manifesto` | `manifesto` | sub-module → Marketing & Comms |
| `null-hypothesis-test` | `falsify-plan-assumptions` |  |
| `optimize` | `ui-performance` |  |
| `overdrive` | `ui-advanced-effects` |  |
| `pct-application` | `patent-pct-application` |  |
| `physics-floor-gap` | `unit-cost-floor-gap` |  |
| `platform-vs-venture` | `build-vs-buy-boundary` |  |
| `polish` | `ui-polish` |  |
| `ppt-template-creator` | `ppt-template-to-skill` |  |
| `press-release` | `working-backwards-press-release` | gtm → product |
| `prioritization` | `prioritization` | founder-productivity → product |
| `product-frame-stack` | `product-strategy-stack` |  |
| `prompt-engineer` | `agents-md-writer` |  |
| `proof` | `proofeditor-docs` |  |
| `quieter` | `ui-quieter` |  |
| `recommendation-canvas` | `ai-solution-proposal-canvas` |  |
| `refine-flywheel` | `post-launch-refine-loop` |  |
| `repo-scanner` | `repo-readiness-scan` |  |
| `shape` | `ui-design-brief` |  |
| `typeset` | `ui-typography` |  |
| `yoda-data-sourcing` | `proprietary-data-sourcing` |  |

**Breaking change for installed users:** renamed skills are called by their new name (for example `/utopia-product:ui-audit` instead of `/utopia-product:audit`). Moved skills change prefix (for example `prioritization` moves from Founder Productivity to Product). All four packs move to version 3.0.0 to signal the breaking change; `/plugin marketplace update skills` picks it up.

## Routing evaluation (Gate 2)

Updated 27 October 2026. All 337 prompts were run once through headless `claude -p` at the **default** description budget, sequentially with `-j 2`, against two builds:
- **Before:** the build at commit `325292b`.
- **After:** the renamed and re-described build, with the prompts' expected skill names migrated to match.

| Run | Scored | Correct | Hit rate | Errors (timeouts) |
|---|---:|---:|---:|---:|
| Before | 328 | 193 | 58.8% | 9 |
| After | 327 | 215 | 65.7% | 10 |
| **Same 324 prompts scored in both** | 324 | 193 → 213 | **59.6% → 65.7% (+6.1 pts)** | |

**Paired result:** 41 prompts changed from miss to hit and 21 changed from hit to miss, for a net gain of 20 correct routes. The other 262 were unchanged. Misses where Claude picked no skill at all fell from 81 to 69, which fits the idea that clearer names make skills recognisable even when their descriptions are dropped from the listing. Rows are matched by exact prompt text, because skill names changed between the two builds.

**Limits:**
- **One observation per prompt per build.** The 21 regressions show that single runs are noisy, so treat +6 points as a direction, not a precise effect size. Re-run the misses 3–5 times (`--runs 3`) before tuning individual skills.
- **Not a held-out test.** These prompts were used during the routing work.
- **Machine-specific.** Both runs had this machine's other plugins and personal skills installed, so results reflect that listing budget.
- **Gates 3–4 not run.** Output quality against a no-skill baseline, and repeated-run stability, remain open.

### Saved scoring and comparison

- [routing-before.json](routing-before.json) and [routing-after.json](routing-after.json): raw harness checkpoints.
- [scores-before.json](scores-before.json) and [scores-after.json](scores-after.json): per-skill recall, false fires and "stolen by" counts from `score_triggers.py --json`.
- [COMBINED.md](COMBINED.md), [combined-routing-prompts.csv](combined-routing-prompts.csv) and [combined-routing-summary.json](combined-routing-summary.json): prompt-level comparison across both builds and the separate Codex evaluation. Regenerate with `python3 scripts/compare-routing-evals.py`.

To re-run the misses for stability:

```sh
python3 skills/founder-productivity/skill-eval/scripts/score_triggers.py reports/2026-10-26-skill-routing/routing-after.json
node scripts/trigger-test.mjs --file <misses.tsv> --plugins plugins --runs 3 -j 2 --output /tmp/misses-3x.json
```

## Separate Codex evaluation

The Codex before-and-after run is complete: **337/337 correct before (100%) and 335/337 after (99.4%)**, with two regressions, no fixes and no infrastructure errors. Both regressions are GTM near-neighbor selections: an `expansion-retention` request selected `gtm-strategy`, and a `customer-research` request selected `market-segments`. This single-observation, full-catalog selection test is at a baseline ceiling; it does not establish a repeatable degradation or measure native skill invocation.

Download the [Codex handoff ZIP](codex-routing-evaluation.zip), or read [the handoff and changed prompts](codex/HANDOFF.md). The archive includes raw JSON results, scores, paired CSV/JSON, catalogs, prompt files, metadata, reproduction scripts and verified checksums. The Claude runs have since been completed (see above).

The protocol is documented in [codex/README.md](codex/README.md). The [combined report](COMBINED.md) and [prompt-level CSV](combined-routing-prompts.csv) align the available provider results by prompt. Provider rates remain separate because Codex uses full-catalog selection while Claude measures native skill invocation under its default description budget. Refresh with `python3 scripts/compare-routing-evals.py` after any new run.

## Remaining static errors

All 10 remaining static errors are in skills this change didn't otherwise touch. Fix them separately:
- `ui-walkthrough` refers to `examples/github-action.yml`, which isn't in the skill.
- `ada`, `khalil` and `salim` link to the repo's `agents/README.md`, which doesn't ship in the plugin.
- `revops-forecasting` names another skill's file as if it were its own (`resources/cohort-diagnostics.md` belongs to `saas-revenue-growth-metrics`).
- `agent-prd`, `ppt-template-to-skill` and `brand-guidelines` mention example or output files that need a human call: they are either missing or are created in the user's project.
