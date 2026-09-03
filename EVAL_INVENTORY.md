# Eval inventory — every skill in the marketplace

Generated 2026-09-03 from this checkout. Regenerate with `./scripts/eval-inventory.sh`.

The canonical test shape is the one the 45 Icarus product skills already carry
(see [`skills/product/agent-design/tests/`](./skills/product/agent-design/tests/)):

```
tests/
├── golden/01.md … 05.md        # 5 cases: typical, edge, diagnosis, mundane, evidence-floor
├── adversarial/01.md … 03.md   # vague one-liner · solution-in-disguise · out-of-scope sibling
├── rubric.json                 # 5 dimensions × 5 · max 25 · pass 21 · min 4/dimension
└── RESULTS.md                  # Gate 1 trigger precision (5 MUST fire / 3 MUST NOT) + scored run
```

## Counts

| | Count |
|---|---|
| Canonical skills (`skills/**/SKILL.md`, duplicates excluded) | **350** |
| Full suite (5 golden + 3 adversarial + rubric.json + RESULTS.md) | **45** |
| Partial suite | **0** |
| No tests at all | **305** |

Every one of the 45 tested skills is an Icarus skill (`scripts/icarus-skills.json`), and every
Icarus skill is tested. The two sets match exactly — no Icarus skill is untested, and nothing
outside Icarus has ever been tested.

### Missing tests, by pack

| Pack | Skills | Tested | Missing |
|---|---|---|---|
| product | 173 | 45 | 128 |
| gtm | 86 | 0 | 86 |
| investments | 60 | 0 | 60 |
| founder-productivity | 30 | 0 | 30 |
| meta | 1 | 0 | 1 |
| **Total** | **350** | **45** | **305** |


## The 45 existing suites are mostly unscored

Having a `tests/` directory is not the same as having been run. Reading every `RESULTS.md`
Runs table:

| State | Count | What it means |
|---|---|---|
| **SEEDED-UNSCORED** | 23 | Runs table literally reads `\| (pending judge) \| \| \| \|`. Cases authored, never judged. |
| **GRADUATE-READY** | 13 | Six-gate judge run recorded, all executable gates PASS. |
| **PASS** | 9 | Rubric-scored run recorded (25/25 or 24/25), several with a `Refine run 2` that applied judge fixes back into SKILL.md. |
| **FAIL** | 0 | — |

So of 350 skills, **22 have ever been scored** — 6.3%. Nothing in `gtm`,
`investments`, or `founder-productivity` has ever been scored at all.

No suite records a failure. That is worth reading as a warning rather than a
result: the author and the judge were the same pipeline, and a 22-for-22 pass
rate on a first pass is the signature of a rubric that is not yet
discriminating. The three suites whose verdict cell says only "see block below"
(`evidence-ladder`, `metrics-that-matter`, `paper-sketch-probe`) each carry a
"Gotchas surfaced" section listing real defects the judge found — including
`metrics-that-matter`'s example tagging a **fabricated plateau as `[Fact]`** —
and then a `Refine run 2` that fixed them. Those are the honest runs. They
should have been scored below 25 before the refine, and the log should show it.
## Blockers found while taking inventory

These are defects in the checkout, not eval gaps. They are listed here because they change what
"run every skill through evals" can honestly mean.

1. **84 duplicated GTM skill directories.** Commit `edc6b9f` ("Reorganize GTM skills into seven
   sub-modules") copied every flat `skills/gtm/<skill>/` into `skills/gtm/<NN-submodule>/<skill>/`
   but did not delete the originals. All 84 pairs are byte-identical (`diff -rq` clean). Only
   `growth-strategy` and `company-moc` exist solely in a sub-module.
   `build-packs.sh` keys `SKILL_PATH_MAP` by directory basename, so for each duplicated pair the
   copy that `find` happens to emit last silently wins — which of the two identical trees gets
   packed is filesystem-order-dependent. Harmless while they are identical; a silent divergence
   trap the moment anyone edits one side. **Delete the 84 flat directories.**
2. **`prd-development` ships an unresolved authoring placeholder** —
   `skills/product/prd-development/SKILL.md:648` reads `- [If Dean has PRD templates, link here]`.
3. **`prd-development` has 3 dangling skill references** — `customer-journey-mapping-workshop`,
   `epic-hypothesis`, `epic-breakdown-advisor` do not exist anywhere in `skills/`. Its other
   cross-references use a pre-module `skills/<skill>/SKILL.md` path shape that no longer resolves.
4. **`impeccable` points at an attribution file that does not exist** — its frontmatter says
   `See NOTICE.md for attribution`; there is no `NOTICE.md` in the skill directory or the repo.
5. **`DESIGN_GUIDE.md` links to a `skills/taste/` module that does not exist** — all 7 Taste
   skills live at `skills/product/`. Same for the Impeccable and Efecto tables.

## Full checklist

`tests` = has the full 5+3+rubric+RESULTS suite. `RESULTS` = the verdict recorded in
`tests/RESULTS.md`, or `missing` where there is no suite. `provenance` per
[PROVENANCE.md](./PROVENANCE.md).

| Skill | Pack | Icarus | tests | RESULTS | provenance |
|---|---|---|---|---|---|
| `agent-persona-builder` | founder-productivity | — | **no** | missing | found-outside |
| `agent-prd` | founder-productivity | — | **no** | missing | unknown |
| `alignment-values-north-star` | founder-productivity | — | **no** | missing | unknown |
| `defuddle` | founder-productivity | — | **no** | missing | unknown-vendor-wrapper |
| `draft-nda` | founder-productivity | — | **no** | missing | unknown |
| `executive-onboarding-playbook` | founder-productivity | — | **no** | missing | unknown |
| `find-skills` | founder-productivity | — | **no** | missing | unknown |
| `full-output-enforcement` | founder-productivity | — | **no** | missing | found-outside |
| `grammar-check` | founder-productivity | — | **no** | missing | unknown |
| `json-canvas` | founder-productivity | — | **no** | missing | unknown-vendor-wrapper |
| `last30days` | founder-productivity | — | **no** | missing | unknown |
| `market-segments` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `market-sizing` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `obsidian-bases` | founder-productivity | — | **no** | missing | unknown-vendor-wrapper |
| `obsidian-cli` | founder-productivity | — | **no** | missing | unknown-vendor-wrapper |
| `obsidian-markdown` | founder-productivity | — | **no** | missing | unknown-vendor-wrapper |
| `pestel-analysis` | founder-productivity | — | **no** | missing | found-outside |
| `porters-five-forces` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `prioritization` | founder-productivity | — | **no** | missing | unknown |
| `prioritization-frameworks` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `privacy-policy` | founder-productivity | — | **no** | missing | unknown |
| `proof` | founder-productivity | — | **no** | missing | unknown |
| `review-resume` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `role-switch` | founder-productivity | — | **no** | missing | unknown |
| `salim` | founder-productivity | — | **no** | missing | built-inside |
| `skillshare` | founder-productivity | — | **no** | missing | unknown |
| `stakeholder-map` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `swot-analysis` | founder-productivity | — | **no** | missing | unknown |
| `tam-sam-som-calculator` | founder-productivity | — | **no** | missing | found-outside-NO-LINE |
| `workshop-facilitation` | founder-productivity | — | **no** | missing | unknown |
| `account-tier-scoring` | gtm | — | **no** | missing | found-outside |
| `activation-map` | gtm | — | **no** | missing | unknown |
| `ad-creative` | gtm | — | **no** | missing | unknown |
| `ai-cold-outreach` | gtm | — | **no** | missing | unknown |
| `ai-sdr` | gtm | — | **no** | missing | unknown |
| `beachhead-segment` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `brand-narrative-playbook` | gtm | — | **no** | missing | built-inside |
| `business-narrative-builder` | gtm | — | **no** | missing | built-inside |
| `call-scorecards` | gtm | — | **no** | missing | found-outside |
| `churn-prevention` | gtm | — | **no** | missing | unknown |
| `cold-email` | gtm | — | **no** | missing | unknown |
| `cold-email-personalization` | gtm | — | **no** | missing | unknown |
| `cold-offer-architect` | gtm | — | **no** | missing | found-outside |
| `cold-outreach` | gtm | — | **no** | missing | unknown |
| `company-moc` | gtm | — | **no** | missing | unknown |
| `competitive-battlecard` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `content-strategy` | gtm | — | **no** | missing | unknown |
| `content-to-pipeline` | gtm | — | **no** | missing | unknown |
| `copy-editing` | gtm | — | **no** | missing | unknown |
| `copywriting` | gtm | — | **no** | missing | unknown |
| `customer-research` | gtm | — | **no** | missing | unknown |
| `deal-desk` | gtm | — | **no** | missing | unknown |
| `deal-review` | gtm | — | **no** | missing | unknown |
| `deal-velocity-engineer` | gtm | — | **no** | missing | found-outside |
| `discovery-calls` | gtm | — | **no** | missing | unknown |
| `earned-autonomy` | gtm | — | **no** | missing | found-outside |
| `efecto-social-media` | gtm | — | **no** | missing | found-outside |
| `email-deliverability` | gtm | — | **no** | missing | found-outside |
| `email-sequence` | gtm | — | **no** | missing | unknown |
| `escalation-framework` | gtm | — | **no** | missing | unknown |
| `expansion-playbook` | gtm | — | **no** | missing | unknown |
| `expansion-plays` | gtm | — | **no** | missing | unknown |
| `expansion-retention` | gtm | — | **no** | missing | unknown |
| `growth-loops` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `growth-strategy` | gtm | — | **no** | missing | built-inside |
| `gtm-engineering` | gtm | — | **no** | missing | unknown |
| `gtm-metrics` | gtm | — | **no** | missing | unknown |
| `gtm-motions` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `gtm-strategy` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `ideal-customer-profile` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `kmjp-social` | gtm | — | **no** | missing | built-inside |
| `launch-strategy` | gtm | — | **no** | missing | unknown |
| `lead-enrichment` | gtm | — | **no** | missing | unknown |
| `lead-magnets` | gtm | — | **no** | missing | unknown |
| `lead-qualification` | gtm | — | **no** | missing | unknown |
| `manifesto` | gtm | — | **no** | missing | built-inside |
| `marketing-ideas` | gtm | — | **no** | missing | unknown |
| `marketing-psychology` | gtm | — | **no** | missing | unknown |
| `meddic-checklist` | gtm | — | **no** | missing | unknown |
| `member-insights` | gtm | — | **no** | missing | unknown |
| `multi-platform-launch` | gtm | — | **no** | missing | unknown |
| `onboarding-cro` | gtm | — | **no** | missing | unknown |
| `outbound-plays` | gtm | — | **no** | missing | unknown |
| `outreach-execution` | gtm | — | **no** | missing | found-outside |
| `page-cro` | gtm | — | **no** | missing | unknown |
| `paid-ads` | gtm | — | **no** | missing | unknown |
| `partner-affiliate` | gtm | — | **no** | missing | unknown |
| `positioning` | gtm | — | **no** | missing | unknown |
| `positioning-icp` | gtm | — | **no** | missing | unknown |
| `positioning-workshop` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `pql-framework` | gtm | — | **no** | missing | unknown |
| `press-release` | gtm | — | **no** | missing | found-outside |
| `product-marketing-context` | gtm | — | **no** | missing | unknown |
| `product-name` | gtm | — | **no** | missing | unknown |
| `referral-program` | gtm | — | **no** | missing | unknown |
| `renewal-playbooks` | gtm | — | **no** | missing | unknown |
| `retention-dashboard` | gtm | — | **no** | missing | unknown |
| `retention-ltv-playbook` | gtm | — | **no** | missing | unknown |
| `revops` | gtm | — | **no** | missing | unknown |
| `revops-forecasting` | gtm | — | **no** | missing | found-outside |
| `sales-enablement` | gtm | — | **no** | missing | unknown |
| `sales-motion-design` | gtm | — | **no** | missing | unknown |
| `sentiment-analysis` | gtm | — | **no** | missing | unknown |
| `sentiment-feedback-loop` | gtm | — | **no** | missing | unknown |
| `signal-anchored-message` | gtm | — | **no** | missing | found-outside |
| `signal-scoring` | gtm | — | **no** | missing | unknown |
| `signup-flow-cro` | gtm | — | **no** | missing | unknown |
| `social-content` | gtm | — | **no** | missing | unknown |
| `social-selling` | gtm | — | **no** | missing | unknown |
| `solo-founder-gtm` | gtm | — | **no** | missing | unknown |
| `stakeholder-ops` | gtm | — | **no** | missing | unknown |
| `suppression-logic` | gtm | — | **no** | missing | unknown |
| `value-prop-statements` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `value-proposition` | gtm | — | **no** | missing | found-outside-NO-LINE |
| `voice-of-customer` | gtm | — | **no** | missing | unknown |
| `warm-intro-intelligence` | gtm | — | **no** | missing | found-outside |
| `3-statement-model` | investments | — | **no** | missing | unknown |
| `ada` | investments | — | **no** | missing | built-inside |
| `adverse-selection-prior` | investments | — | **no** | missing | unknown |
| `auction-first-price-shading` | investments | — | **no** | missing | unknown |
| `auction-winners-curse-haircut` | investments | — | **no** | missing | unknown |
| `audit-xls` | investments | — | **no** | missing | unknown |
| `bayesian-reasoning-calibration` | investments | — | **no** | missing | unknown |
| `bond-futures-basis` | investments | — | **no** | missing | unknown |
| `bond-relative-value` | investments | — | **no** | missing | unknown |
| `capital-structure-optimizer` | investments | — | **no** | missing | unknown |
| `causal-inference-root-cause` | investments | — | **no** | missing | unknown |
| `clean-data-xls` | investments | — | **no** | missing | unknown |
| `competitive-analysis` | investments | — | **no** | missing | unknown |
| `comps-analysis` | investments | — | **no** | missing | unknown |
| `cost-of-capital-estimator` | investments | — | **no** | missing | unknown |
| `datapack-builder` | investments | — | **no** | missing | unknown |
| `dcf-model` | investments | — | **no** | missing | unknown |
| `decision-matrix` | investments | — | **no** | missing | unknown |
| `deck-refresh` | investments | — | **no** | missing | unknown |
| `deliberation-debate-red-teaming` | investments | — | **no** | missing | unknown |
| `design-of-experiments` | investments | — | **no** | missing | unknown |
| `earnings-analysis` | investments | — | **no** | missing | unknown |
| `earnings-preview-single` | investments | — | **no** | missing | unknown |
| `environmental-scanning-foresight` | investments | — | **no** | missing | unknown |
| `epc-search` | investments | — | **no** | missing | unknown |
| `epo-patent-analyzer` | investments | — | **no** | missing | unknown |
| `equity-research` | investments | — | **no** | missing | unknown |
| `estimation-fermi` | investments | — | **no** | missing | unknown |
| `expected-value` | investments | — | **no** | missing | unknown |
| `fixed-income-portfolio` | investments | — | **no** | missing | unknown |
| `forecast-discipline` | investments | — | **no** | missing | unknown |
| `forecast-modeling` | investments | — | **no** | missing | unknown |
| `forecast-premortem` | investments | — | **no** | missing | unknown |
| `fsi-strip-profile` | investments | — | **no** | missing | unknown |
| `funding-digest` | investments | — | **no** | missing | unknown |
| `fx-carry-trade` | investments | — | **no** | missing | unknown |
| `hypothesis-library` | investments | — | **no** | missing | unknown |
| `hypotheticals-counterfactuals` | investments | — | **no** | missing | unknown |
| `ib-check-deck` | investments | — | **no** | missing | unknown |
| `ib-pitch-deck` | investments | — | **no** | missing | unknown |
| `initiating-coverage` | investments | — | **no** | missing | unknown |
| `intrinsic-valuation-dcf` | investments | — | **no** | missing | unknown |
| `khalil` | investments | — | **no** | missing | built-inside |
| `kill-criteria-exit-ramps` | investments | — | **no** | missing | unknown |
| `lbo-model` | investments | — | **no** | missing | unknown |
| `macro-rates-monitor` | investments | — | **no** | missing | unknown |
| `option-vol-analysis` | investments | — | **no** | missing | unknown |
| `pct-application` | investments | — | **no** | missing | unknown |
| `pitch-deck` | investments | — | **no** | missing | built-inside |
| `pitch-deck-web` | investments | — | **no** | missing | built-inside |
| `ppt-template-creator` | investments | — | **no** | missing | unknown |
| `reference-class-forecasting` | investments | — | **no** | missing | unknown |
| `relative-valuation-multiples` | investments | — | **no** | missing | unknown |
| `research-claim-map` | investments | — | **no** | missing | unknown |
| `scout-mindset-bias-check` | investments | — | **no** | missing | unknown |
| `swap-curve-strategy` | investments | — | **no** | missing | unknown |
| `tear-sheet` | investments | — | **no** | missing | unknown |
| `technical-dd` | investments | — | **no** | missing | built-inside |
| `valuation-reconciler` | investments | — | **no** | missing | unknown |
| `variance-strategy-selector` | investments | — | **no** | missing | unknown |
| `market-skill-ingestion` | meta | — | **no** | missing | found-outside |
| `ab-test-analysis` | product | — | **no** | missing | found-outside-NO-LINE |
| `adapt` | product | — | **no** | missing | found-outside |
| `agent-concierge-probe` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `agent-design` | product | yes | yes | PASS 25/25 | built-inside |
| `agent-dx-cli-scale` | product | — | **no** | missing | unknown |
| `ai-pricing` | product | — | **no** | missing | unknown |
| `analytics-tracking` | product | — | **no** | missing | unknown |
| `animate` | product | — | **no** | missing | found-outside |
| `architecture-diagram` | product | — | **no** | missing | found-outside |
| `audit` | product | — | **no** | missing | found-outside |
| `bolder` | product | — | **no** | missing | found-outside |
| `bottoms-up-quantification` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `brainstorm-experiments-new` | product | — | **no** | missing | found-outside-NO-LINE |
| `business-model` | product | — | **no** | missing | found-outside-NO-LINE |
| `ckm-banner-design` | product | — | **no** | missing | built-inside |
| `ckm-brand` | product | — | **no** | missing | built-inside |
| `ckm-design` | product | — | **no** | missing | built-inside |
| `ckm-design-system` | product | — | **no** | missing | built-inside |
| `ckm-slides` | product | — | **no** | missing | built-inside |
| `ckm-ui-styling` | product | — | **no** | missing | built-inside |
| `clarify` | product | — | **no** | missing | found-outside |
| `code-structure` | product | — | **no** | missing | unknown |
| `cohort-analysis` | product | — | **no** | missing | unknown |
| `colorize` | product | — | **no** | missing | found-outside |
| `compound-system-architecture` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `concept-council` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `concierge-probe` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `continuous-discovery-engine` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `cost-optimizer` | product | — | **no** | missing | unknown |
| `create-prd` | product | — | **no** | missing | found-outside-NO-LINE |
| `critique` | product | — | **no** | missing | found-outside |
| `current-state-map` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `data-rights-clause` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `dataset-builder` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `delight` | product | — | **no** | missing | found-outside |
| `deploy-to-vercel` | product | — | **no** | missing | unknown-vendor-wrapper |
| `deployment-engineer` | product | — | **no** | missing | unknown |
| `design-critique` | product | — | **no** | missing | unknown |
| `design-taste-frontend` | product | — | **no** | missing | found-outside |
| `devops-advisor` | product | — | **no** | missing | unknown |
| `diagram-design` | product | — | **no** | missing | found-outside |
| `discovery-interview-prep` | product | — | **no** | missing | found-outside-NO-LINE |
| `discovery-process` | product | — | **no** | missing | found-outside-NO-LINE |
| `distill` | product | — | **no** | missing | found-outside |
| `efecto-graphic-design` | product | — | **no** | missing | found-outside |
| `efecto-web-design` | product | — | **no** | missing | found-outside |
| `emil-design-eng` | product | — | **no** | missing | found-outside |
| `eval-first-spec` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `evidence-driven-testing` | product | — | **no** | missing | unknown |
| `evidence-ladder` | product | yes | yes | PASS +refine | built-inside |
| `explicit-vs-tacit-capture` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `fellow-level-ladder` | product | yes | yes | PASS 25/25 | built-inside |
| `fellow-path-router` | product | yes | yes | PASS +refine | built-inside |
| `finance-metrics-quickref` | product | — | **no** | missing | found-outside |
| `financial-unit-economics` | product | — | **no** | missing | unknown |
| `first-mocks` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `four-lenses-test` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `greploop` | product | — | **no** | missing | unknown |
| `guardrail-design` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `hallmark` | product | — | **no** | missing | found-outside |
| `hf-cli` | product | — | **no** | missing | unknown-vendor-wrapper |
| `high-end-visual-design` | product | — | **no** | missing | found-outside |
| `huggingface-community-evals` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-datasets` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-gradio` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-llm-trainer` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-paper-publisher` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-papers` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-tool-builder` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-trackio` | product | — | **no** | missing | unknown-vendor-wrapper |
| `huggingface-vision-trainer` | product | — | **no** | missing | unknown-vendor-wrapper |
| `identify-assumptions-existing` | product | — | **no** | missing | found-outside-NO-LINE |
| `identify-assumptions-new` | product | — | **no** | missing | found-outside-NO-LINE |
| `impeccable` | product | — | **no** | missing | found-outside |
| `industrial-brutalist-ui` | product | — | **no** | missing | found-outside |
| `ink` | product | — | **no** | missing | unknown |
| `integration-linker` | product | — | **no** | missing | unknown |
| `interface-craft` | product | — | **no** | missing | unknown |
| `interview-script` | product | — | **no** | missing | found-outside-NO-LINE |
| `invent-by-hand` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `job-in-primitives` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `job-stories` | product | — | **no** | missing | found-outside-NO-LINE |
| `jobs-to-be-done` | product | — | **no** | missing | found-outside |
| `layout` | product | — | **no** | missing | found-outside |
| `lean-canvas` | product | — | **no** | missing | found-outside-NO-LINE |
| `lean-ux-canvas` | product | — | **no** | missing | unknown |
| `metrics-dashboard` | product | — | **no** | missing | found-outside-NO-LINE |
| `metrics-that-matter` | product | yes | yes | PASS 24/25 +refine | built-inside |
| `minimalist-ui` | product | — | **no** | missing | found-outside |
| `moat-design-canvas` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `monetization-strategy` | product | — | **no** | missing | found-outside-NO-LINE |
| `monitoring-setup` | product | — | **no** | missing | unknown |
| `north-star-metric` | product | — | **no** | missing | found-outside-NO-LINE |
| `null-hypothesis-test` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `one-pager-prd` | product | — | **no** | missing | unknown |
| `opportunity-solution-tree` | product | — | **no** | missing | found-outside-NO-LINE |
| `optimize` | product | — | **no** | missing | found-outside |
| `overdrive` | product | — | **no** | missing | found-outside |
| `paper-sketch-probe` | product | yes | yes | PASS +refine | built-inside |
| `physics-floor-gap` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `pilot-six-term-sheet` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `platform-vs-venture` | product | yes | yes | PASS +refine | built-inside |
| `polish` | product | — | **no** | missing | found-outside |
| `prd-development` | product | — | **no** | missing | found-outside-NO-LINE |
| `pricing-strategy` | product | — | **no** | missing | unknown |
| `probe-matrix` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `problem-framing-canvas` | product | — | **no** | missing | found-outside-NO-LINE |
| `problem-quality-scorecard` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `problem-statement` | product | — | **no** | missing | found-outside |
| `product-as-decision` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `product-frame-stack` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `product-manager-skills` | product | — | **no** | missing | unknown |
| `prompt-engineer` | product | — | **no** | missing | unknown |
| `proto-persona` | product | — | **no** | missing | found-outside |
| `prototyping-pretotyping` | product | — | **no** | missing | unknown |
| `quieter` | product | — | **no** | missing | found-outside |
| `railway-central-station` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-database` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-deploy` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-deployment` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-domain` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-environment` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-metrics` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-new` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-projects` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-railway-docs` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-service` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-status` | product | — | **no** | missing | unknown-vendor-wrapper |
| `railway-templates` | product | — | **no** | missing | unknown-vendor-wrapper |
| `recommendation-canvas` | product | — | **no** | missing | found-outside |
| `redesign-existing-projects` | product | — | **no** | missing | found-outside |
| `refine-flywheel` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `repo-scanner` | product | — | **no** | missing | unknown |
| `repo-structurer` | product | — | **no** | missing | unknown |
| `roadmap-planning` | product | — | **no** | missing | found-outside-NO-LINE |
| `saas-economics-efficiency-metrics` | product | — | **no** | missing | found-outside |
| `saas-revenue-growth-metrics` | product | — | **no** | missing | found-outside |
| `security-auditor` | product | — | **no** | missing | unknown |
| `shape` | product | — | **no** | missing | found-outside |
| `sketch-prompt` | product | — | **no** | missing | built-inside |
| `so-what-stress-test` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `sql-queries` | product | — | **no** | missing | found-outside-NO-LINE |
| `startup-canvas` | product | — | **no** | missing | found-outside-NO-LINE |
| `stitch-design-taste` | product | — | **no** | missing | found-outside |
| `summarize-interview` | product | — | **no** | missing | found-outside-NO-LINE |
| `synthetic-users` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `tacit-knowledge-interview` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `tdd-red-green-refactor` | product | — | **no** | missing | unknown |
| `trace-to-interview` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `transformers-js` | product | — | **no** | missing | unknown-vendor-wrapper |
| `typed-service-contracts` | product | — | **no** | missing | unknown |
| `typeset` | product | — | **no** | missing | found-outside |
| `ui-polish` | product | — | **no** | missing | unknown |
| `ui-ux-pro-max` | product | — | **no** | missing | found-outside |
| `unserved-needs-finder` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `usability-test-protocol` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `user-buyer-decider-map` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `user-stories` | product | — | **no** | missing | found-outside-NO-LINE |
| `user-story` | product | — | **no** | missing | found-outside |
| `user-story-mapping` | product | — | **no** | missing | found-outside |
| `user-story-mapping-workshop` | product | — | **no** | missing | found-outside-NO-LINE |
| `user-story-splitting` | product | — | **no** | missing | found-outside |
| `v1-launch-bar` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `value-based-pricing` | product | yes | yes | SEEDED-UNSCORED | built-inside |
| `vercel-cli-with-tokens` | product | — | **no** | missing | unknown-vendor-wrapper |
| `vercel-composition-patterns` | product | — | **no** | missing | unknown-vendor-wrapper |
| `vercel-react-best-practices` | product | — | **no** | missing | unknown-vendor-wrapper |
| `vercel-react-native-skills` | product | — | **no** | missing | unknown-vendor-wrapper |
| `web-design-guidelines` | product | — | **no** | missing | unknown |
| `wedge-five-questions` | product | yes | yes | GRADUATE-READY +refine | built-inside |
| `wizard-of-oz-probe` | product | yes | yes | PASS +refine | built-inside |
| `workflow-design` | product | yes | yes | PASS +refine | built-inside |
| `yoda-data-sourcing` | product | yes | yes | GRADUATE-READY +refine | built-inside |
