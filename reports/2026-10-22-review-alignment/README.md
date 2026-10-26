# Reconciliation of the coworker and Codex reviews

22 October 2026. Compared the supplied **Skills Marketplace Review.xlsx** (357 skills at commit `16599fd`) with the Codex review at `a3229f2` and the current canonical sources. The original workbook is unchanged. Its instructions and AI scores were treated as source material, not authorization or human decisions.

## Reconciled catalog

All **357 original rows** are mapped in [alignment.json](alignment.json), with exact source sheet/row references, current destinations, recommendation assessments and unresolved evidence requirements.

| Original entries | Current disposition after alignment |
|---:|---|
| 250 | Still packed under the original name |
| 85 | Merged into surviving skills, including two content-preservation repairs below |
| 19 | Retained in the sandbox, outside default packs |
| 3 | Removed without a successor |
| **357** | **All original rows reconciled** |

One new canonical entry, `railway`, brings the current packed total to **251**. Many rows share a successor, so merged-row counts must not be added to packed-skill counts. Original source hash and ranges are in [source-manifest.json](evidence/source-manifest.json).

## Why the result labels differ

The coworker workbook reports 105 Verified, 233 Failed and 19 Blocked. Our previous review covered 254 entrypoint bodies, selected resources, deterministic helper tests and authored scenarios. These are different populations and different methods. Neither the prior 23-test pass nor a corrected source instruction turns a reported coworker failure into a behavioral pass.

**Twenty rows are internally inconsistent:** they state Verified / 6 passed / 0 failed / 0 blocked while also naming a First failed check. Preserve both fields until the original result is recovered. See [the exact cells and assertions](evidence/workbook-inconsistencies.json). The two AI decision systems are also distinct: 49 original merge proposals versus 91 AI “Merge review” queue outcomes are not interchangeable decision counts.

The first-failure fields classify as 90 selector-routing assertions, 39 harness/artifact/side-effect assertions, 115 substantive behavior assertions, 20 status conflicts, eight blocked rows without failure details and 85 rows without a reported failure. This classification is a triage of text, not a diagnosis of root cause.

The workbook contains assertion summaries and counts, but no full prompts, fixture files, model/environment settings, response outputs or tool traces. **Zero original coworker cases were replayed.** Every row preserves that distinction and states the next evidence needed. Some assertions are truncated. All human review scores/decisions are blank and Agreed action remains Pending; this reconciliation does not fill those fields on either person's behalf.

## Decisions retained after comparison

- Preserve implemented merges where their meaningful workflow survives, updating old canonical destinations through both retirement maps. Examples include DCF/multiples references and the situation-first story mode.
- Retain `agent-prd` separately from `prd-development`: engineering eval gates, durability and work orders are distinct from a general product requirements document.
- Retain `ai-sdr` and `outreach-execution` separately from `cold-email`: system design and authorized execution are distinct from writing copy.
- Retain revenue/retention analysis separately from unit economics, and automated-agent probes separately from human concierge probes.
- Retain intentional internal personas and the fellow router. An opaque name or an old routing miss alone does not establish uselessness; the persona removal proposals were low confidence and several also reported 6/6 passes.
- Do not enforce unsupported test rules such as fixed probability deductions, a universal three-tier pricing answer, or a universal risk severity without case context. The original prompts may justify narrower requirements; they are needed before rejecting a case itself.

Each of the 357 rows contains its own rationale rather than silently forcing both reviewers to agree.

## Two preservation repairs

Comparison with the original source revealed useful content omitted by earlier selector deletion. The historical maps remain unchanged; [migration-repairs.tsv](migration-repairs.tsv) records the correction.

1. **`cohort-analysis` → `saas-revenue-growth-metrics`**, with a `revops-forecasting` route for pipeline/bookings. Preserved definitions, inclusion/exclusion filters, entity IDs, deduplication, maturity/censoring, currency/mix/seasonality normalization and diagnostic outputs in `resources/cohort-diagnostics.md`.
2. **`stakeholder-ops` → `stakeholder-map`**. Preserved approval checkpoints, decision rights/RACI, required artifacts, accountable owners, action tracking and escalation in `references/feedback-program-operations.md`. An independent reviewer checked all five original framework elements. Approvals remain unassessed until evidence exists; no sends or reminders were performed.

These repair content preservation without adding selectors or claiming behavioral qualification. The catalog remains 251 skills.

## Six focused source corrections

- `agent-persona-builder`: unknown facts/contacts stay unknown; a new agent may have empty memory rather than an invented “gotcha.”
- `role-switch`: ask for a materially missing decision/constraint or clearly label an authorized hypothetical.
- `market-sizing`: the 1–20% SOM range is illustrative, not an enforced rule or a reason to clip supported values.
- `draft-nda`: remedies are proposed for jurisdiction-specific review; availability and enforceability are not promised.
- `trace-to-interview`: distinguish measured avoided effort from a modeled interview-cost counterfactual; do not claim every trace canceled a two-hour interview.
- `huggingface-vision-trainer`: replace stale missing Jobs-skill links with the actual `hf-cli` capability. This link repair does not claim to fix the workbook's job-timeout assertion.

Evidence includes [Founder counterexamples](evidence/founder-followup-cases.json), [Product boundary/resource checks](evidence/product-followup-cases.json), and [independent stakeholder preservation checks](evidence/stakeholder-recovery-check.json). Authored examples are explicitly identified; they are not historical model outputs.

## Validation and remaining work

Pack membership remains unchanged. GTM, Product and Founder patch versions advance for the corrected packaged content. Marketplace validation, canonical-to-plugin build consistency, the existing 23-test offline suite, static helper syntax audit and Ceramic doctor are checked after regeneration; the final outcomes are recorded in `validation.json`.

Behavioral qualification still requires the original case bundle and traces, particularly for selector selection, `answer.md`/outbox assertions, blocked external integrations and disputed numerical oracles. The old failures remain visible in the aligned workbook. No new live-provider, legal, financial, deployment or outbound execution was performed.
