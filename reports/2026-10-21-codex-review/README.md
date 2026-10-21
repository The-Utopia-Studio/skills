# Codex review, replication and consolidation

Date: 21 October 2026. Baseline: `1d2695d` (254 packaged skills). All 254 entrypoint bodies received a Codex review; 103 surviving skills were refined, 148 retained, and three merged into existing survivors. The rebuilt marketplace contains **251 skills in four packs**. No Claude requests were made for this review.

This completes the catalog review and targeted offline verification. It does **not** certify every referenced resource, external integration, legal/financial application, or end-to-end agent workflow. The earlier Claude routing run remains incomplete; these checks are not a replacement routing-success percentage.

## What changed

| Pack | Before | After | Version |
|---|---:|---:|---|
| GTM | 55 | 54 | 2.3.0 |
| Product | 129 | 128 | 2.2.0 |
| Investments | 43 | 42 | 2.2.0 |
| Founder Productivity | 27 | 27 | 2.0.1 |

The [per-skill ledger](per-skill-review.json) records the decision, rationale, scope, limitations and source hashes for every original entry. Counts describe source-level changes, including supporting resources. Selected companions were inspected when investigating a defect or overlap; the review is not a claim that every bundled reference was read in full.

## Merges supported by replication

| Retired entry | Survivor | Preserved capability and checks |
|---|---|---|
| `adverse-selection-prior` | `bayesian-reasoning-calibration` | Selection-evidence questions and worked method retained in a new resource. Two reviewers independently checked three prior/likelihood cases. The arbitrary default prior, below-50% constraint and ungrounded numerical haircut were rejected. Neutral evidence now leaves the prior unchanged. |
| `social-selling` | `outreach-execution` | Engagement playbook and checklist retained; explicit planning mode. Two reviewers independently authored outputs for three concrete scenarios: cold public engagement, a community with invitation-only DMs, and an existing opportunity with a draft already present. Public/private evidence boundaries and no-duplicate behavior preserved. |
| `job-stories` | `user-story` | Situation-first Mode C and original method retained as a reference. Two reviewers independently checked offline submission, payroll-cutoff and role-first negative-control scenarios. No forced acceptance-criteria quota or fabricated design link. |

See [migration map](retire-map.tsv), [Bayesian independent calculations](evidence/founder-bayesian-independent-fixtures.json), [social independent outputs](evidence/product-social-independent-walkthroughs.json), and [story independent outputs](evidence/founder-story-independent-walkthroughs.json). These are independent reviewer comparisons, not randomized repeated runtime invocations. No outbound messages were sent.

Other apparent overlaps were retained where methods or deliverables differed, including stakeholder mapping versus role switching and market sizing versus evidence-based bottom-up quantification. Exact duplicate helper/license/template files were retained for standalone package operation and attribution; none of the final 251 entrypoint bodies is byte-identical to another.

## Demonstrated defects corrected

- **Executable helpers:** the investor fact checker previously returned success for an empty ledger, empty required value and a fact with no target. It now rejects malformed inputs. Market sizing rejects negative/nonfinite inputs and overflow while preserving small percentages. Auction bidding now has a scoped, executable uniform-private-value benchmark with explicit reserve and abstention cases.
- **Arithmetic and units:** corrected A/B sample planning, per-million token cost, CAC payback periods, stock-compensation equity treatment, gross-debt WACC weights, EBITDA and PEG definitions, retained buyer ROI, cash versus revenue, ARPA/ARPU examples, and RICE reach double counting. Formula fixtures use synthetic inputs, not real investment recommendations.
- **Probability and evidence:** overlapping failure causes no longer add as if disjoint; conditional funnel probabilities no longer require independence. Removed arbitrary bias deductions, unjustified priors and numeric confidence adjustments. Retention shape and synthetic-user responses are diagnostics, not proof of PMF or human behavior. A single observed defect remains a factual event without establishing prevalence.
- **Workflow consistency:** fixed conflicting outreach setup/approval rules, private-signal leakage, unsupported factual embellishment, launch-gate boolean logic, buying-role overlap, unverified quote/invoice-as-payment claims, contradictory motion examples, stale pack/resource paths, credential-printing examples and malformed webhook instructions.
- **Narrow source checks:** corroborated changed financial/probability/API rules and selected patent provisions with primary documentation. Removed unsupported hardcoded patent deadline/fee tables in favor of current office-specific lookup. This was not an exhaustive legal or provider-documentation audit. See [source verification](evidence/gtm-primary-source-verification.md).

## Verification performed

| Check | Result | What it establishes |
|---|---|---|
| Node offline suite | **23/23 pass** | Actual fact-checker, market-sizing and auction-helper executions; routing-harness plumbing uses a stub rather than a live model. |
| Pack build and marketplace validation | **Pass: 251 skills** | Membership, required metadata and generated packs. |
| Static helper audit | **129 syntax checks pass** | Python AST, shell parse and Node syntax only; no runtime dependency guarantee. |
| Exact entrypoint duplicate audit | **0 pairs** | Byte equality only; semantic consolidation required separate review. |
| Formula reproductions | **Pass** | Numerical counterexamples and boundary checks documented in evidence, including independent reviewer calculations. |
| Ceramic doctor | **Pass** | Installed design-system tooling/configuration; no new UI was generated. |
| Whitespace validation | **Pass** | `git diff --check`. |

The raw [static audit](evidence/static-audit.json) flags 12 Markdown and one inline-path candidate. They were adjudicated: ten literal `url` examples, an Excel number format, a mathematical integral misparsed as Markdown, and an explicitly cross-skill pitch-deck reference. No confirmed missing local dependency remains among these candidates. This heuristic does not validate every remote URL or dynamically constructed path.

Examples of numerical replication are in [Product formulas](evidence/product-numeric-fixtures.json), [investment formulas](evidence/gtm-executable-investment-results.json), [root calculations](evidence/investments-root-independent-calculations.json), [SaaS/boundary cases](evidence/investments-root-product-fixtures.json), and [launch/pricing cases](evidence/founder-tail-fixtures.json). Reviewer-authored scenarios are labeled separately inside their evidence files. Old skill-level RESULTS reports affected by changed criteria are marked historical/superseded rather than represented as newly rerun.

## Reproduce locally

From the repository root, using Node, Python 3, jq and Bash 4+:

```sh
node --test scripts/trigger-test.test.mjs scripts/skill-behavior.test.mjs
python3 scripts/audit-skills.py --output /tmp/skills-static-audit.json
python3 reports/2026-10-21-codex-review/evidence/product-fixtures.py
python3 reports/2026-10-21-codex-review/evidence/founder-tail-fixtures.py
python3 reports/2026-10-21-codex-review/evidence/gtm-verify-investment-fixtures.py
python3 reports/2026-10-21-codex-review/evidence/root-product-fixtures.py
npm run build:packs
npm run docs:sync
npm run validate
npm run ceramic:doctor
git diff --check
```

On macOS with Homebrew Bash, use `PATH=/opt/homebrew/bin:$PATH npm run build:packs`. Formula scripts reproduce calculations, not agent behavior. After committing generated outputs, `npm run validate:drift` checks build consistency against HEAD. Neither the review nor these commands invokes Claude.

## Remaining qualification limits

Live CRM/email execution, paid research APIs, model training, browser/slide rendering, Office recalculation, deployment and real legal/financial deliverables were not run. Current third-party prices, benchmarks and platform capabilities outside the targeted source checks remain unverified. Per-skill limitations identify this scope; “retained” means no demonstrated reason to merge/delete, not certified operational reliability.
