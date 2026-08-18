# Eval log — wedge-five-questions

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Is this a wedge?"
2. "What's the smallest thing that forces adoption?"
3. "Is my wedge sharp enough?"
4. "What's my wedge?"
5. "Will this actually get adopted?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Map our defensibility and moat over the next three years" → belongs to `moat-design-canvas`
2. "Score the whole idea across all its dimensions" → belongs to `problem-quality-scorecard`
3. "Give me the one-glance so-what on this idea" → belongs to `so-what-stress-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | see judge run below | GRADUATE-READY |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings are verbatim in the `description` ("is this a wedge", "the smallest thing that forces adoption", "is my wedge sharp enough", "what's my wedge", "will this actually get adopted"). All 3 must-not-fire are explicitly excluded by name+sibling ("Not for defensibility over years → moat-design-canvas", "…eight dimensions → problem-quality-scorecard", "…one-glance so-what → so-what-stress-test"). |
| 2 Golden | PASS (5/5) | Per-case table below. Kill-line refusal case (G03) verified: Q3 fails → 4/5 → NOT A WEDGE. |
| 3 Adversarial | PASS (3/3) | 01 vague: skill stops, asks the one wedge-sentence (Step 1 / template §1), invents nothing. 02 solution-in-disguise: reframe + Step 1 example ("An AI copilot for planners… is an engine, not a wedge") refuses the tech-as-wedge framing, asks for the output+trigger. 03 out-of-scope: When-NOT table + Related skills decline and route to `moat-design-canvas`, offer adoption-first ordering, produce no moat plan. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | G01 output depends on the evidence ladder + hard ≥0.5 pass bar, non-users-only travel count, structural-expansion-vs-upsell test, and binary AND w/ kill line — a generic PM prompt would emit a soft "wedge score" and round up / count teammate shares as travel. Guidance is correctly tabular (5 thresholds, ladder, routing); no table-as-prose. |
| 6 Real-use | pending | requires 5+ real fellow uses. |

### Golden per-case scores (dims: method_fidelity / artifact_complete / proprietary_edge / challenge / evidence_standard)

| Case | MF | AC | PE | CH | ES | Total /25 | Result |
|---|---|---|---|---|---|---|---|
| 01 Durian (stockout digest) | 5 | 5 | 5 | 5 | 5 | 25 | PASS — 5/5 REAL WEDGE; rejects the 0.3 "they said they'd like it" Q4, upgrades to observed 40 min/wk ERP retyping; names already-collected number (exports/account/Monday). |
| 02 Azraq (month-end risk digest) | 5 | 5 | 5 | 5 | 5 | 25 | PASS — 5/5 with caveat; counts only the 1 operator's observed 2 non-users, explicitly refuses the assumed 2nd forward (0.1), flags n=1 travel to reconfirm. |
| 03 Mentix (shift copilot) | 5 | 5 | 5 | 5 | 5 | 25 | PASS (refusal case) — Q3 travel = 0 non-users → 4/5 → NOT A WEDGE; refuses "managers could share it" (0.1); names the flip (native shift-handover note to supervisors' channel). Kill line honored. |
| 04 Barrier (gas-safety digest) | 5 | 5 | 5 | 4 | 5 | 24 | PASS — 5/5; regulated shift-handover = gold-standard Q2; crew (6–10) + regulator clear Q3; flags 2-rig sample. Challenge lighter (clean pass, little to push on). |
| 05 Timesheet-gap digest | 5 | 5 | 5 | 4 | 5 | 24 | PASS — 5/5 on a deliberately mundane workflow; exactly-2 non-users (payroll admin + AM) clears Q3; flags n=3. Challenge modest (clean pass). |

All cases ≥21, no dimension <4, no `auto_fail` triggered (no fabricated numbers; the weak idea in G03 was failed, not flattered; no scope-poaching; not boilerplate). Gate 2 PASS 5/5.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **"/week" and "week 1" are hardcoded to a weekly cadence.** Q1 ("alone in week 1") and Q3 ("≥2 non-users **per week**") read literally as weekly, but the skill is applied to non-weekly wedges (G02 month-end, G03/G04 per-shift). G02 only works by silently reading "≥2 non-users/**week-equivalent**." A month-end wedge reaching 2 non-users per month-end still travels but scores <2/week on a literal read. Recommend restating Q1 as "the first cycle" and Q3 as "≥2 non-users **per cadence cycle**" so non-weekly wedges are not penalized by the unit.
- **Q4 evidence type is ambiguous when the expansion demand is only verbal.** In G02 the user's *request* for continuous alerting is verbal (0.3, below the ≥0.5 bar), yet Q4 passes. The correct reading is that Q4 passes on the *structural fact* of the mid-month blind spot (factual), not on the ask. The skill's Gotchas cover "expansion mistaken for upsell" but not this: a careless fellow could either fail Q4 (treating the 0.3 ask as the evidence) or pass it while smuggling the 0.3 ask under the bar. Recommend a line: "For Q4, cite the structural gap the wedge creates (a fact), not the user's request to fill it (opinion/verbal)."
- Both are minor and changed no verdict; the core hard-AND / kill-line mechanic is sound and correctly forces NO at 4/5.

## Refine run 2 — applied judge fixes: generalised Q1/Q3 to the workflow's own cadence ("first cycle" / "per cadence cycle") and clarified Q4 passes on the structural gap, not a verbal ask.
