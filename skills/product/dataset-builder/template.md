# Labelled Dataset + Golden Seed — dataset-builder

Fill every field. The golden column is not for cases a model could reproduce or that carry an opinion label. If you land below 20 golden cases, say so and name the next artefacts to go get — do not pad.

## 1. Source — where the artefacts come from

> Do not re-source. Start from the moat-seed rows `yoda-data-sourcing` already produced.

**yoda P rows feeding this dataset:** _[which proprietary sources — field logs, correction stream, incident timelines]_
**Field artefacts on hand:** _[what you actually hold — count and shape, e.g. "260 copilot suggestions + operator responses"]_

If the only material is model-reachable (yoda's R rows — public standards, tutorials, a Kaggle set), stop. A model has memorised it; a dataset on it measures nothing. Go back to the workflow-trapped pile.

## 2. Label schema — fix it before labelling

State the one label and its ground-truth authority. Ban opinion labels here, not case by case.

**Input →** _[the artefact]_
**Label →** _[the one thing each case is labelled with]_
**True because →** _[what actually happened / the agreed adjudicator that settles it — NOT "an expert thinks so"]_

## 3–5. The labelling ledger

One row per artefact. Golden = **Y only if** provenance present **AND** label ≥ 0.5 on the ladder (§Evidence) **AND** both leak checks clear **AND** held out **AND** label agreed or adjudicated.

**Leak checks (input / label)** records the two Step 5 checks: input-leak (is the input public/memorised?) and label-leak (could a model narrate the label from world knowledge?). Both must be clear — a golden case shows `clear / clear`.

| # | Input (artefact + provenance: yoda row) | Label (ground truth) | Label source (ladder + [Fact]/[Assumption]/[Hypothesis]) | Leak checks (input / label) | Inter-rater (agreed?) | Split (golden / train / hold / discard) | Golden? |
|---|---|---|---|---|---|---|---|
| 1 | _[artefact + which P row]_ | _[what actually happened]_ | _[e.g. behaviour 0.7 [Fact]]_ | _[clear / clear]_ | _[n/a or agreed / adjudicated]_ | _[golden]_ | _[Y]_ |
| 2 | | | | | | | |
| 3 | | | | | | | |
| … | | | | | | | |

Route on gate failure:
- No provenance → **discard** (not a case).
- Label < 0.5 or contested → **hold** (a hypothesis; resolve the outcome or adjudicate first).
- Input-leak or label-leak → **discard** (reproducible; pull an unreachable case instead).
- Already seen by the build (few-shot / tuned) → **train** (it is training data now, not a test); replace it.

## 6. Golden count and coverage

**Golden cases (all four gates clear):** _[N]_
**Coverage in plain terms:** _[the real variety the golden set spans — input types, conditions, edge shapes. Not the formal eval bands; that is eval-first-spec's job.]_

**If N < 20:** This is the finding, not a rounding error. You have _[N]_ real golden cases. Go get _[20 − N]_ more from _[named next probe / yoda row / artefact batch]_. Do not label synthetic rows to reach 20 — a case the model wrote is a mirror, not a test.

**If N = 0 (whole input model-reachable):** nothing is golden and there is no dataset to ship — every artefact failed Gate 3 (reproducible). The finding is that there is nothing to test against yet. Route the whole set back to `yoda-data-sourcing` for workflow-trapped data; do not manufacture cases to fill the ledger.

## 7. Verdict and handoff

**Held (label not yet ground truth):** _[cases + what would settle each — an outcome, an adjudication]_
**Discarded (contaminated / reproducible):** _[cases + which leak]_
**Retired to training (build already saw them):** _[cases]_

**Handoff:** the _[N]_ golden cases are the seed. They go to `eval-first-spec` (section 07), which writes the job line, composes them into the typical/edge/adversarial/must-refuse spread, and sets the autonomy level and cost-per-outcome budget. This skill stops at the clean, ground-truth-labelled, unreachable seed; it does not write the spec.
