# Eval log — compound-system-architecture

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Help me architect the Mentix product — how should the AI system be built?"
2. "How do we build the AI system for this? What's the stack shape?"
3. "Design the AI system: what are the components and how do they connect?"
4. "What's the system architecture — router, retrieval, all of it?"
5. "We were going to send everything to one big model. Is that the right architecture?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Write the 20 golden cases and the acceptable failure rate for our v1." → belongs to `eval-first-spec`
2. "Draw me the architecture as a dark-themed HTML/SVG diagram." → belongs to `design/architecture-diagram`
3. "Is this defensible — where does the moat come from and will it compound?" → belongs to `moat-design-canvas`

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see scored block below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire match the description's trigger verbs ("architect the product", "how do we build the AI system", "design the AI system", "what's the system architecture", + the monolith clause for #5). All 3 must-not are named in the description's explicit "Do NOT fire" clause → eval-first-spec / design/architecture-diagram / moat-design-canvas. |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 asks the one unblocking question (which workflow + its data), invents no components. 02 names the model-first / solution-in-disguise trap, reframes to data layer, flags Model>20%. 03 declines, names `eval-first-spec`, states the one-line boundary. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden-01 output leans on the evidence ladder, the "Model is only 20%" reframe, workflow-exhaust, eval-gated swap points, and the kill line — not reproducible by a generic PM prompt. Pipeline/effort/swap guidance is tabular, not prose. Diagram routed to `design/architecture-diagram` (Section F), not restated. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 — per-case scores (rubric: /25, pass ≥21 & no dim <4)

| Case | method | artifact | proprietary | challenge | evidence | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Mentix (seed) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 02 Azraq (data-dominant) | 5 | 4 | 5 | 5 | 5 | 24 | PASS |
| 03 Barrier (guardrail-critical) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 Monolith (kill-line) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 05 Durian (mundane) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |

Notes on the special checks:
- **Kill golden (04) is a genuine KILL.** The one-big-prompt design fails the kill line (one node ≠ architecture); the skill names the five missing parts (router, retrieval discipline, independent validate, data layer, swap point), exposes the ~90% Model / 10% Interface split, and decomposes into the spine rather than softening to "reasonable MVP". Correct reject.
- **Model above 20% requires a stated reason.** The method (Step 4 + template D) admits Model>20% only for the two named legit reasons (core value IS frontier reasoning; regulated model mandated) and explicitly rejects the disguised ones (great prompt / niche jargon / impressive model / fine-tune-to-fix-accuracy). Golden 02 confirms Model *below* 20% is accepted without being forced up (band floor 10).
- **40/20/30/10 + named swap points are required, not decorative.** Steps 4 and 5 make both mandatory; the kill line checks Data ≥ Model and every swap point naming a gating eval.
- **Diagram is routed, not restated.** Section F hands the filled pipeline to `design/architecture-diagram` and states "Do not restate its design system here." No design-system poaching.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Golden 02's expected-output shape cites "3 halls, ~60 incidents per the sibling YODA work" — numbers that are NOT in golden 02's own input.** A faithful application must NOT import those figures as `[Fact]`; the cross-operator scale should stay `[Assumption]`/`[Hypothesis]` unless the fellow provides instances. The skill's own evidence standard (kill-line final checkbox: "No number invented that the fellow did not provide") prevents the auto_fail, so this is a test-fixture wording risk, not a skill defect — but the golden could tempt a careless applier into a fabrication. Consider tightening the golden-02 fixture to mark those counts as sibling-sourced/assumed.
- No skill defects found. Method, template, and kill line are internally consistent and enforce the reframe rather than decorating it.

## Refine run 2 — applied judge fixes: marked golden 02's "~3 halls / ~60 incidents" as sibling-sourced (YODA) / `[Assumption]`, explicitly NOT facts present in that case's own input, so a careless applier is not tempted to import them as given.
