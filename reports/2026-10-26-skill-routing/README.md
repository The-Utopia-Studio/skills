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

## Routing evaluation (Gate 2), incomplete

Every prompt in `scripts/trigger-prompts.tsv` (337 rows, one per skill plus rows for merged skills' original intents) was run once through headless `claude -p` at the **default** description budget. The "before" run used the build from before this change. The "after" run used the new build and the prompts with renamed skills' expected names updated.

| Run | Scored | Correct | Hit rate | Timeouts | Not reached |
|---|---:|---:|---:|---:|---:|
| Before | 138 | 89 | 64.5% | 155 | 40 |
| After | 111 | 82 | 73.9% | 134 | 88 |
| Prompts scored in both runs | 55 | 39 → 39 | no change | | |

**Read this carefully:**
- **The totals are not comparable.** Each run scored a different subset of prompts.
- **The fair comparison shows no change.** On the 55 prompts scored in both runs, results were identical: 6 fixed and 6 broken. That is within single-run noise, so this evaluation shows neither a gain nor a loss yet.
- **Why most prompts are unscored.** Both runs went in parallel (8 Claude sessions at once), which pushed many sessions past the harness's 120-second limit. Then the usage limit stopped both runs. Results are checkpointed.
- **Not run:** Gates 3–4 (output quality against a no-skill baseline, and pass^k stability). These need fixtures per skill and are the next step for a ranked sample.

Finish both runs, one at a time and with lower concurrency, using the same settings:

```sh
node scripts/trigger-test.mjs --file reports/2026-10-26-skill-routing/prompts-before.tsv \
  --plugins <checkout-of-the-previous-commit>/plugins --runs 1 -j 2 \
  --resume reports/2026-10-26-skill-routing/routing-before.json --output reports/2026-10-26-skill-routing/routing-before.json
node scripts/trigger-test.mjs --file reports/2026-10-26-skill-routing/prompts-after.tsv \
  --plugins plugins --runs 1 -j 2 \
  --resume reports/2026-10-26-skill-routing/routing-after.json --output reports/2026-10-26-skill-routing/routing-after.json
python3 skills/founder-productivity/skill-eval/scripts/score_triggers.py reports/2026-10-26-skill-routing/routing-after.json
```

## Remaining static errors

All 10 remaining static errors are in skills this change didn't otherwise touch. Fix them separately:
- `ui-walkthrough` refers to `examples/github-action.yml`, which isn't in the skill.
- `ada`, `khalil` and `salim` link to the repo's `agents/README.md`, which doesn't ship in the plugin.
- `revops-forecasting` names another skill's file as if it were its own (`resources/cohort-diagnostics.md` belongs to `saas-revenue-growth-metrics`).
- `agent-prd`, `ppt-template-to-skill` and `brand-guidelines` mention example or output files that need a human call: they are either missing or are created in the user's project.
