# Compound-System Architecture — <product name>

**Fellow:** <name> · **Date:** <date> · **Stage:** commit-build v1

## A. The system job (one sentence)

> <what the whole system turns into what, for whom> `[Fact/Assumption/Hypothesis]`

If this needs "and" three times, it is more than one system. Split it or pick one.

## B. The data layer

The corpus / state / memory the system reasons over. Score its grounding on the ladder.

| Data source | What it grounds | Workflow exhaust? | Exists today? | Rung (0.1–1.0) |
|---|---|---|---|---|
| <e.g. maintenance logs> | <retrieval for diagnostics> | yes / no | yes / no | <e.g. behaviour 0.7> `[Fact]` |
| <source 2> | ... | ... | ... | <rung> |

Ladder: money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1.
Bar: the data layer must clear **0.7** — real workflow exhaust the target already
produces, pointable-to today. A layer scored `[Hypothesis]` is deferred, not designed.

## C. Component pipeline

Spine is fixed. A node may be collapsed (write "n/a — rules" and why); it may not be
deleted silently.

```
          ┌──────────── data layer (B) ────────────┐
          │                                          │
input → router →  ⟨ retrieve ∥ reason ∥ act ⟩  → validate & guardrails → output
```

| # | Component | Its one job here | Input | Output | Failure mode | Model call? |
|---|---|---|---|---|---|---|
| 1 | Input | <normalise + validate request> | <raw request> | <clean request> | <injection / malformed> | no |
| 2 | Router | <classify + dispatch> | <clean request> | <path choice> | <one path for all> | rules / small model |
| 3a | Retrieve | <pull grounding facts> | <query> | <context> | <ungrounded> | no |
| 3b | Reason | <plan / synthesise> | <context + request> | <draft> | <the model — 20%> | yes |
| 3c | Act | <tool calls / writes> | <plan> | <side effect> | <read-only toy> | maybe |
| 4 | Validate & guardrails | <schema/rule/policy check> | <draft + action> | <passed or rejected> | <ships wrong/unsafe> | rules / judge model |
| 5 | Output | <format + deliver + log> | <passed output> | <delivered + logged> | <can't score> | no |

Rule: component 4 must be independent of component 3b. The model cannot guard its own
output. If validate is "the model checks itself", the guardrail does not exist.

## D. Effort allocation

Map real build work into the four buckets. Percentages must sum to 100.

| Bucket | Target | This build | Work items in this bucket | Note / justification |
|---|---|---|---|---|
| Data | 40% | <__%> | <pipe, clean, label, permission the layer in B> | must be ≥ Model |
| Model | 20% | <__%> | <prompt, tool defs, the reason step> | if > 20%, state the legitimate reason here or push it down |
| Orchestration | 30% | <__%> | <router + retrieve + act + validate> | usually the second-biggest bucket |
| Interface | 10% | <__%> | <the surface the user already uses> | a new app is rarely the wedge |
| **Total** | **100%** | **<100%>** | | |

Legitimate reasons for Model > 20%: core value *is* frontier reasoning; a regulated model
is mandated. Not legitimate (Data/Orchestration in disguise): "great prompt", "niche
jargon", "impressive new model", "we'll fine-tune to fix accuracy".

## E. Model-swap points

Every model call is a swap point. A swap point is real only if a named eval gates it.

| Swap point | Component | Current model | Swap trigger | Gating eval (golden cases) | Config location |
|---|---|---|---|---|---|
| Router model | 2 | <e.g. small/cheap> | <mis-route rate > X% on golden> | <N routing golden cases> | <router.model> |
| Reason model | 3b | <e.g. general frontier LLM> | <new model beats current pass rate at ≤ cost> | <the eval-first-spec golden set> | <reason.model> |
| Validator model | 4 | <e.g. rules + judge> | <judge/human disagreement > X%> | <guardrail golden set> | <validate.judge_model> |

If any "Gating eval" cell is blank, the swap is a gamble and the model-agnostic claim
fails. Fill it or delete the swap point.

## F. Diagram

Do not draw it here. Once C is filled, route to `design/architecture-diagram` with the
component table and hand off the render. This skill decides the shape; that skill draws it.

## Kill line — self-check before returning

- [ ] Not a monolith. There is a real router, retrieve, and an independent validate —
      not "one big prompt does everything". A one-node design is an automatic KILL.
- [ ] Model ≤ 20%, OR a legitimate stated reason is written in bucket D. "Great prompt"
      and "niche jargon" are not legitimate reasons.
- [ ] Data ≥ Model. If Model > Data, stop and rebalance.
- [ ] The data layer (B) clears 0.7 — real exhaust that exists today, not a hope.
- [ ] Component 4 (validate) is independent of component 3b (the model).
- [ ] Every swap point in E names a gating eval. No blank eval cells.
- [ ] Every empirical claim (data, cost, latency, accuracy) is tagged
      `[Fact]`/`[Assumption]`/`[Hypothesis]`. No number invented that the fellow did
      not provide.
