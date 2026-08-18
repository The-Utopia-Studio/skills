# Eval log — refine-flywheel

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What happens after we launch?"
2. "Set up the loop / improve the product now that it's shipped."
3. "The loop — ship, observe, learn, refine — how do we run it?"
4. "A new model just came out — should we upgrade the product to it?"
5. "Can we raise the autonomy level / drop the sign-off yet?"

MUST NOT fire (3, name the sibling each belongs to):
1. "What should our North Star / metrics / retention be?" → belongs to `metrics-that-matter`
2. "Turn these production traces into interviews / what unmet need do the logs reveal?" → belongs to `trace-to-interview`
3. "Write the golden cases / set the autonomy level / define what working means" → belongs to `eval-first-spec` (that creates the eval set and ladder; this re-runs them)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire phrasings are named or paraphrased in the description ("what happens after launch", "improve the product", "set up the loop", "a new model dropped, should we upgrade", "raise the autonomy / drop the sign-off"). The description carries explicit NOT clauses routing metrics/North Star→metrics-that-matter, trace→interview→trace-to-interview, write-the-eval-set→eval-first-spec, so all 3 MUST-NOT stay cold. The nearest collision — "set the autonomy level" (cold) vs "raise the autonomy level" (fire) — is disambiguated by the "in the first place" carve-out. |
| 2 Golden | PASS (5/5) | Per-case table below. Every case ≥21, no dimension <4, no auto_fail. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → Station 0 precondition gate is the Method's first move ("no eval set, no flywheel… stop and route to eval-first-spec. Do not invent an eval set here") → asks the one question / routes, fills nothing. 02 solution-in-disguise → Gotcha "model upgrade as a free win" + Station 3 "regression risk until the eval set re-scores it" → reframes to keep-quality-honest, routes through Station 3, names silent safety-mode regression. 03 out-of-scope → When-NOT table + description NOT clause decline and name metrics-that-matter, note the boundary. No fabrication, no flattery, no scope-poach. |
| 4 Head-to-head | n-a | `supersedes: none`. New skill; no prior flywheel to beat. |
| 5 Anti-generic | PASS | Golden-01 output rests on three moves a generic PM prompt cannot produce: tweak-time (edit-distance-from-traces) as the trust signal instead of an engagement dashboard, model-release-as-regression-risk (re-run the WHOLE set before prod), and eval-gated two-way autonomy ratchet. Reframe is load-bearing, not decoration. Fill-in guidance (observe bands, learn triggers, refine conditions, cadence, compounding, kill-line) is tabulated in both SKILL and template; prose is reserved for explanation. Cost is built into the loop's success test (compounding check = falling cost_per_outcome). |
| 6 Real-use | pending | Requires 5+ real fellow uses. Not executable here. |

### Gate 2 — per-case scores (rubric: 5 dims × 0–5, /25; pass ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Stand up the loop (typical) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| 02 New model dropped (learn core) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 03 Raise autonomy on a feeling | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 Set cadence + owner (mundane) | 5 | 5 | 4 | 4 | 4 | 22 | PASS |
| 05 "Usage up, loop working" | 5 | 5 | 5 | 5 | 5 | 25 | PASS |

Notes on the two docked cases: 01 challenge=4 (typical set-up needs less pushback, but still front-loads the precondition gate and the "do not invent metrics" discipline). 04 is the thinnest for proprietary_edge/challenge/evidence (4 each) — a cadence table is the most generic-adjacent artifact, but the mechanical non-discretionary triggers + "every model release before prod is non-negotiable" + monthly drift floor + named-human-not-a-group + append-only ledger schema keep it above the generic bar. All four auto_fail conditions clear on every case (no fabricated numbers — the skill tags [Assumption]/asks rather than inventing tweak-time or cost figures; no flattery; in-scope; not boilerplate).

### Kill-line verification (task-specified)
Loop is fully present and both kill conditions are unmet: ship behind sign-off (Station 1) → observe tweak-time (Station 2) → re-run WHOLE eval set on EVERY model release before prod (Station 3, trigger row 1) → promote autonomy strictly on scored eval, two-way ratchet incl. demote-on-regression (Station 4 + Icarus reframe "evidence in both directions"). Kill line in SKILL and template enforces exactly this. Not triggered.

### Scope-poach check (task-specified)
Clean on all three siblings. metrics-that-matter: Station 2 explicitly "Retention, North Star… belong to metrics-that-matter. Do not rebuild them here" — reads tweak-time/cost-per-outcome, does not pick the scorecard. trace-to-interview: "same raw feed, different question", routes qualitative discovery there. eval-first-spec: re-runs/climbs what it created, Station 0 routes to it if missing, "Do not invent an eval set here." Routing targets verified to exist in the pack.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Fixture ambiguity (not a skill defect): golden/01 lists "baseline cost-per-outcome carried from the spec" under "Numbers that must appear", but the golden-01 input supplies no cost figure. The skill's discipline resolves it correctly (tag [Assumption]/carry-placeholder, never fabricate), but the fixture invites a fabrication auto-fail. Consider having golden/01's input state the carried $ value, or note in the case that the number is a placeholder to carry.
- template.md hardcodes five failure-mode columns in the eval ledger (Miss / False alarm / Confidently wrong / Wrong format / Silent failure). A product whose eval-first-spec modes differ must relabel these. The SKILL's own ledger table uses "…" to signal modes are product-specific; the template could mirror that (a note: "columns = this product's modes from eval-first-spec") to avoid a fellow treating the five as canonical.
- Sandbox path note: the judged copy lives under `skills/sandbox/product-icarus/`, whose `07-commit-build-v1/` folder does not contain `eval-first-spec` (it holds guardrail-design, v1-launch-bar, value-based-pricing); `eval-first-spec` lives in the promoted `skills/product-icarus/07-commit-build-v1/`. Routing is to a real skill, but the sandbox 07 subset is incomplete relative to the references. Orchestrator may want the sandbox 07 to carry eval-first-spec for a self-contained pilot.

## Refine run 2 — applied judge fixes: re-tagged golden/01's carried baseline cost-per-outcome as an illustrative `[Assumption]` placeholder (never `[Fact]`, added to auto-fail), and noted in template.md that the eval-ledger's five mode columns are illustrative and must be relabelled per product.
