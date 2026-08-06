# Compound-System Architecture — Mentix factory-manager copilot

**Fellow:** Mentix · **Date:** 2026-07-21 · **Stage:** commit-build v1

Illustrative fixtures. Numbers are plausible, not real client data.

## A. The system job (one sentence)

> Turn a factory manager's shift question ("why did line 3 slow last night?") and their
> routine paperwork (shift handover, maintenance ticket) into a grounded answer or a
> drafted document, from the plant's own operational data. `[Fact]` on the two request
> types — both observed in the tacit-knowledge interviews.

One system, two request classes (diagnose, draft). The router splits them; it is not two
products.

## B. The data layer

| Data source | What it grounds | Workflow exhaust? | Exists today? | Rung |
|---|---|---|---|---|
| SCADA / sensor history | Line-stoppage diagnostics | yes | yes, 18 months on-prem | behaviour 0.7 `[Fact]` |
| Maintenance work orders | Root-cause retrieval, ticket drafting | yes | yes, in the CMMS | behaviour 0.7 `[Fact]` |
| Shift-handover log | Draft grounding, precedent | yes | yes, free text today | behaviour 0.7 `[Fact]` |
| Plant SOP / safety corpus | Guardrail rules for validate | artefact | yes, PDFs | artefact 0.5 `[Fact]` |

Grounding verdict: the layer clears 0.7. Every source is exhaust the plant already
produces; the design partner confirmed access to a live read-only replica. `[Fact]` The
SOP corpus is only 0.5 (static PDFs, not exhaust) — acceptable for guardrail rules, but
flagged so no one mistakes it for the compounding asset.

## C. Component pipeline

```
          ┌──────────── plant data layer (SCADA · CMMS · handover · SOP) ────────────┐
          │                                                                            │
input → router →  ⟨ retrieve ∥ reason ∥ act ⟩  → validate & guardrails → output
```

| # | Component | Its one job here | Input | Output | Failure mode | Model call? |
|---|---|---|---|---|---|---|
| 1 | Input | Strip PII, validate the shift/line refs exist | Manager's message | Clean, scoped request | A bad line ref reasons on nothing | no |
| 2 | Router | Diagnose vs draft; trivial vs deep | Clean request | Path + retrieval plan | Every question hits the frontier model | small model |
| 3a | Retrieve | Pull the relevant SCADA window + past work orders | Query + time range | Grounded context | Diagnosis with no sensor data | no |
| 3b | Reason | Explain the stoppage / draft the handover | Context + request | Draft answer or document | (the model — the 20%) | yes |
| 3c | Act | File the maintenance ticket to the CMMS on approval | Approved draft | Ticket created | Read-only; manager still types it | yes (tool) |
| 4 | Validate & guardrails | Check draft against SOP safety rules + schema | Draft + action | Passed / rejected + reason | Unsafe instruction ships to the floor | rules + judge model |
| 5 | Output | Render in the shift tool; log request+outcome for eval | Passed output | Reply + eval log row | No log = no golden cases | no |

Component 4 is independent of 3b: SOP rules are a rules engine plus a separate judge
model, not the reason model grading itself. `[Fact]` on the design; `[Assumption]` that
the judge catches the safety class that matters (to be proven on the guardrail golden set).

## D. Effort allocation

| Bucket | Target | This build | Work items | Note / justification |
|---|---|---|---|---|
| Data | 40% | 42% | Read-replica pipe from SCADA/CMMS, clean the free-text handover log, build the SOP→rules glossary, permission the access | Slightly over target — the on-prem SCADA extract is the hard part. `[Assumption]` |
| Model | 20% | 18% | Prompt + tool defs for reason (3b) and the judge (4); no fine-tune at v1 | Under 20%. Jargon handled by the glossary in Data, not the model. |
| Orchestration | 30% | 30% | Router (2), retrieval over the plant corpus (3a), CMMS write (3c), validate pipeline (4) | Second-biggest bucket, as expected |
| Interface | 10% | 10% | Chat inside the existing shift-handover tool — no new app | Meets the manager where the workflow already lives |
| **Total** | **100%** | **100%** | | |

The surprise for Mentix: they arrived planning to fine-tune a model on plant data (Model
~50%). The reframe — niche jargon is a glossary in the data layer, accuracy is a
retrieval-and-validate problem — moved the work to Data and Orchestration and kept Model
at 18%. Fine-tuning stays a later option, gated by the reason-model swap eval.

## E. Model-swap points

| Swap point | Component | Current model | Swap trigger | Gating eval | Config location |
|---|---|---|---|---|---|
| Router model | 2 | Small classifier LLM | Mis-route > 5% on routing golden set | 20 routing golden cases (diagnose vs draft) | `router.model` |
| Reason model | 3b | General frontier LLM | New model beats current pass rate at ≤ cost/outcome | The `eval-first-spec` 20 golden cases | `reason.model` |
| Validator model | 4 | Rules + judge LLM | Judge disagrees with plant-safety review > 2% | Guardrail golden set (known-unsafe drafts) | `validate.judge_model` |

Every swap point names an eval, so a new model release next quarter is a config change
run through the golden cases — not a rebuild. `[Fact]` on the design intent.

## F. Diagram

Pipeline table above handed to `design/architecture-diagram` for the dark-themed render;
not drawn here.

## Kill line — self-check

- [x] Not a monolith. Real router, retrieve, independent validate, an act step with a
      real side effect (CMMS ticket).
- [x] Model 18% ≤ 20%. The fellow's fine-tune instinct was reframed, not rubber-stamped.
- [x] Data 42% ≥ Model 18%.
- [x] Data layer clears 0.7 — live exhaust on a read replica, confirmed by the design
      partner. SOP corpus flagged at 0.5 so it is not mistaken for the moat.
- [x] Component 4 (validate) is a rules engine + separate judge, independent of 3b.
- [x] All three swap points name a gating eval; none blank.
- [x] Every empirical claim tagged; no invented number — the 18-month history, the two
      request types, and the access all trace to Mentix's input and the design partner.
