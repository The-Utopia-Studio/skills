# Worked example — Mentix's operator-correction dataset

Mentix builds an AI copilot for factory managers. `yoda-data-sourcing` already ran and named the operator-correction stream as the compounding moat seed: every time the copilot suggests a first action, the operator accepts, edits, or overrides it, and Mentix logs it. This is a test fixture — numbers are illustrative, not real client data.

## Input the fellow brought

"YODA says our correction stream is the moat seed. Now make it a dataset and give me golden cases so we can actually score the copilot. We've got the logs. Someone on the team already fed a public predictive-maintenance dataset in too — can we use that to bulk it up?"

Material on the table:
- 260 copilot suggestions with the operator's accept/edit/override response, across 3 lines, 5 weeks. Mentix holds the logs. [Fact]
- For ~180 of those, the line's downstream state is logged too: did an unplanned stop follow within the shift, or not. [Fact]
- A public "predictive maintenance" tutorial dataset the team downloaded. [Fact]
- ~50 suggestions where a reliability engineer wrote "that looks right" but the operator took no action and no outcome was logged. [Fact]
- The team has been few-shotting the copilot prompt on a favourite batch of ~15 hand-picked cases. [Fact]

## 1. Source

**yoda P rows feeding this dataset:** the operator-correction stream (the compounding seed) and the paired downstream line-state.
**Field artefacts on hand:** 260 suggestion+response records; 180 with a logged outcome.

The public predictive-maintenance set is a yoda R row — model-reachable. Flagged now, discarded at Step 5. It cannot bulk up a golden set; it can only contaminate it.

## 2. Label schema

**Input →** one copilot suggestion plus the sensor/context snapshot it was made on.
**Label →** the correct first action for that moment (proceed / adjust / stop-and-inspect).
**True because →** what actually happened on the line after the operator acted — an unplanned stop that the flagged action would have prevented, or a clean shift that confirmed the action. The operator's accept/override is behaviour; the downstream stop is the stronger outcome. An engineer's "looks right" with no action and no outcome is **not** the schema.

## 3–6. The labelling ledger

Representative rows (the full ledger is 26 artefacts; the tally is under §6).

| # | Input (artefact + provenance) | Label (ground truth) | Label source (ladder + tag) | Leak checks (input / label) | Inter-rater | Split | Golden? |
|---|---|---|---|---|---|---|---|
| 1 | Suggestion "proceed" on Line 2, 03:14 — operator overrode to stop-and-inspect; unplanned stop followed 20 min later (correction stream) | stop-and-inspect | behaviour + outcome 0.7 [Fact] | clear / clear (plant-specific pattern) | agreed | golden | Y |
| 2 | Suggestion "stop" on Line 1 — operator accepted; shift ran clean, no stop (correction stream) | stop was correct | behaviour 0.7 [Fact] | clear / clear | agreed | golden | Y |
| 3 | Suggestion "adjust feed rate" — operator edited the value, line held (correction stream) | the edited value | behaviour 0.7 [Fact] | clear / clear | agreed | golden | Y |
| 4 | Vibration-spike snapshot, operator overrode, outage + SLA credit paid to the plant (correction stream + billing) | stop-and-inspect | money moved 1.0 [Fact] | clear / clear | agreed | golden | Y |
| 5 | Suggestion on Line 3 — operator accepted, but no downstream state logged that shift | (accept only) | behaviour 0.3 [Assumption] — no outcome | clear / clear | agreed | hold | N |
| 6 | Engineer note "looks right", no operator action, no outcome (~1 of 50) | "safe" per engineer | opinion 0.1 [Hypothesis] | clear / label-leak risk | disagreed with #7 | hold | N |
| 7 | Same snapshot as #6, second engineer read it "stop" | "stop" per engineer | opinion 0.1 [Hypothesis] | — | disagreed with #6 | hold | N |
| 8 | Row from the public predictive-maintenance tutorial set | tutorial's label | artefact 0.5 [Fact] | **input-leak** — model memorised it | n/a | discard | N |
| 9 | Textbook "bearing failure at rising temp+vibration" pattern | stop | — | **label-leak** — model narrates this from training | n/a | discard | N |
| 10 | One of the 15 few-shot cases baked into the copilot prompt | stop-and-inspect | behaviour 0.7 [Fact] | clear / clear | agreed | train | N — build already saw it |

Routing applied:
- Rows 6 and 7 (engineer opinion, and they disagree) → **hold**. Two qualified readers disagree, so the label is not settled; and neither has an outcome behind it. They become candidates only if a later stop/clean-shift resolves them, or an adjudicator with authority settles the call.
- Row 8 (public tutorial input) → **discard**, input-leak. This is the "bulk it up" material the fellow asked about; it fails Step 5.
- Row 9 (textbook pattern) → **discard**, label-leak. A model answers it from world knowledge; it tests nothing Mentix owns.
- Row 10 and its 14 siblings → **train**. The build has been few-shotted on them, so they can no longer measure generalisation. Retired to the training pile and replaced with fresh held-out cases from the correction stream.

## 6. Golden count and coverage

**Golden cases (all four gates clear):** 22.
Arithmetic: 26 labelled artefacts shown-and-summarised → −1 public-tutorial (input-leak), −1 textbook (label-leak), −2 engineer-opinion held, −15 few-shotted retired to train, +15 fresh held-out cases pulled from the remaining correction stream to replace the burned ones = 22 golden.

**Coverage:** proceeds that held, stops that were right, edits with the corrected value, overrides that pre-empted a real stop, and one money-moved outage. Spans all three lines and the accept/edit/override spread of real operator behaviour. This is variety, not the formal eval bands — `eval-first-spec` sets those.

## 7. Verdict and handoff

**Held (label not yet ground truth):** the ~50 engineer-opinion snapshots, including the 6/7 disagreement. Each needs an outcome or an adjudicator before it can be golden.
**Discarded (contaminated):** the public predictive-maintenance set (input-leak) and the textbook pattern (label-leak). Neither can bulk up the seed; both would inflate the score and hide real failures.
**Retired to training:** the 15 few-shot cases — replaced, not reused as tests.

**Handoff:** the 22 golden cases are the seed. They go to `eval-first-spec` (section 07), which writes the job line ("at each moment on the line, the correct first action…"), composes them into the typical/edge/adversarial/must-refuse spread, and sets the autonomy level and cost-per-outcome budget. This skill stops here.

## The correction this skill forced

The fellow wanted to "bulk it up" with a public dataset and treat 50 engineer notes as labels. Both would have produced a set the copilot passes without being right: the public rows are memorised, and opinion labels grade the model against a vibe. The real seed was smaller and harder — 22 cases the model has never seen, each labelled by what the line actually did — and it is the only set that can tell Mentix whether the copilot matches reality. Twenty-two unreachable, outcome-labelled cases beat ten thousand synthetic ones.
