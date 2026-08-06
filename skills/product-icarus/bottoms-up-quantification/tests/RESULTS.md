# Eval log — bottoms-up-quantification

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Size this bottom-up — don't give me a TAM."
2. "Build the number from the units up."
3. "How big is this really, and I want to see the arithmetic."
4. "What's the total addressable value, built from what one unit is worth times how many there are?"
5. "Give me a defensible market size I can walk an investor through line by line."

MUST NOT fire (3, name the sibling each belongs to):
1. "Is one report a big enough prize to bother — what's the per-unit gap?" → belongs to `physics-floor-gap`
2. "Score my problem across all 8 dimensions — is it a good problem?" → belongs to `problem-quality-scorecard`
3. "Is the whole idea any good? Stress-test the concept." → belongs to `so-what-stress-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings match description triggers ("size this bottom-up / don't give me a TAM", "build the number", "how big is this really, show me the arithmetic", per-unit-value→total, "defend line by line"). The 3 must-not-fire are each carved out by the description's explicit `NOT for...` clauses → route to physics-floor-gap / problem-quality-scorecard / so-what-stress-test. Phrasing #4 ("total addressable value") is the closest-to-boundary must-fire but the per-unit→total clause + NOT-TAM framing hold it correctly inside scope. |
| 2 Golden | PASS (5/5) | Arithmetic re-verified per case; TAM last & labelled 0.1 in all five; weakest-rung (min, not average) confidence applied throughout. See per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: refuses to produce a number, asks the ONE atom+enumerable-population question, routes to physics-floor-gap — no fabrication. 02 lead-with-TAM: names the unfalsifiability trap (kill line), refuses top-down-led number, relegates TAM to labelled sanity check — no compliance-as-asked. 03 out-of-scope: declines the size model, names physics-floor-gap, explains run-order handoff, computes no per-unit floor. |
| 4 Head-to-head | n-a | `supersedes: none` |
| 5 Anti-generic | PASS | G01 output could NOT come from a generic PM prompt: evidence-ladder weight per rung, weakest-rung-caps-confidence (min not average), value rung must sit inside the physics-floor-gap gap, bottom-up÷top-down reconciliation band (Triangulated/Divergent/Broken), refusal to average a built number with an invented one, TAM demoted to last-step 0.1 sanity check. Reframe is load-bearing, not decoration. Confidence/reconciliation/when-NOT all in tables; template.md is a full worksheet. No guidance mis-cast as prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 per-case scores (dimensions: method_fidelity / artifact_complete / proprietary_edge / challenge / evidence_standard)

| Golden | MF | AC | PE | CH | ES | Total | Pass? |
|---|---|---|---|---|---|---|---|
| 01 Barrier per-permit | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| 02 Azraq risk reports | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 03 Mentix headline population | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| 04 Durian invoice reconciliation | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 05 Barrier leak-detection (money moving) | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |

All ≥ 21 and no dimension < 4. No auto_fail triggered (no fabricated numbers — G03 £576M is computed from input figures and stamped Fiction, not presented as defensible; no flattery; no scope-poaching; not generic). G03 correctly refuses to dress a market-report aggregate as a bottom-up [Fact]; G05 correctly UPWEIGHTS money-moved (1.0) and observed close-rate (0.7) instead of reflexively marking rungs soft, and still warns the 18-approach sample is small.

Routing confirmed: per-unit-prize question routes to `physics-floor-gap` (description NOT-clause, When-NOT table, adversarial 03, and the "run it first" pairing). Kill line enforced: TAM never leads, three arithmetic lines always exposed.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **No top-down anchor in the input (goldens 02 and 04).** Both goldens' `## Expected shape` ask for a reconciliation band, but neither input supplies an independent top-down figure. A faithful, non-fabricating run must therefore EITHER introduce an explicitly-labelled external market figure (tagged 0.1) OR state the anchor is unavailable and defer the reconciliation — it must NOT invent a TAM number to "complete" the band (that would trip the fabrication auto_fail). Worth a one-line note in Step 8 ("if no top-down anchor exists, name the cheapest one to fetch and defer the band rather than invent a figure") so a run doesn't feel pressure to fabricate.
- **Trigger phrasing #4 boundary.** "Total addressable value" flirts with TAM language; the description's per-unit→total clause plus the NOT-TAM carve-outs handle it, but it is the narrowest margin among the must-fire set. No failure — noted so the description's negative clauses are preserved verbatim on any future edit.

## Refine run 2 — applied judge fixes: Step 8 (and template §5) now say that when the input gives no top-down anchor, the reconciliation band is DEFERRED ("no top-down anchor supplied — band deferred") with the cheapest anchor named, never a TAM figure invented to complete the band.
