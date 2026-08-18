# Eval log — product-as-decision

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "What's the product here?"
2. "Frame the problem for me."
3. "What decision are we actually changing?"
4. "State this as a decision, not a feature."
5. "In one line, what are we changing for the user?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Strip this down to the primitive job — what's really being done?" → belongs to `job-in-primitives`
2. "Map the workflow and tell me what each step costs today." → belongs to `current-state-map`
3. "Score this problem across the eight dimensions — go or no-go?" → belongs to `problem-quality-scorecard`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description enumerates all 5 must-fire phrasings verbatim ("what's the product here", "frame the problem", "what decision are we changing", "state this as a decision", "what are we actually changing for the user"). All 3 must-not-fire are explicitly routed away in the NOT-clauses: primitives→job-in-primitives, price-the-workflow→current-state-map, 8-dimension go/no-go→problem-quality-scorecard. No leakage. |
| 2 Golden | PASS (5/5) | Per-case table below. All ≥21, no dimension <4, no auto_fail tripped. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: Method Step 1 ("if the fellow cannot name the decision, stop and ask; invent none") yields the single unblocking question (which decision / which human), emits no statement/band/rung. 02 solution-in-disguise: "Feature smuggling" gotcha + Step 1 noun-strike name the trap ("copilot for which decision?"), reframe to the decision, refuse "build a copilot", ask for current cost. 03 out-of-scope: When-NOT table + adversarial expectation align — declines the priced map, names current-state-map, offers to compress one decision, invents no step costs. |
| 4 Head-to-head | n/a | `supersedes: none`. Skill "absorbs" discovery/problem-statement inside the module but deliberately does not delete it; Gate 4 not applicable. |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: it strikes the product nouns, forces a judgment verb, weights the before on the evidence ladder (0.7 timed behaviour, [Fact]), forces the after to [Hypothesis], places L0→L1 with a liability-based autonomy cap, and reads 12× against the compression band with an explicit negative-compression kill condition. A generic prompt returns persona/pain/solution narrative, not a decision + quantified compression. Guidance is properly tabularised (autonomy ladder, compression band, evidence ladder) — no table-as-prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses; not executable here. |

### Golden per-case scores (rubric: /25, pass ≥21, no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix (12×, L0→L1) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 02 Barrier hot-work (autonomy capped L2 by liability) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Azraq SLA data-rights (~12×, L0→L2) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 Durian ticket-triage (autonomy axis, earned-rung) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 05 mundane invoices (7.5× = step change, not OOM) | 5 | 5 | 5 | 5 | 5 | 25 | Y |

Notes per case:
- 01: Correctly recovers the triage verb, strikes "copilot"/"AI", holds L1 with the intervention-liability cap, names the probe (time a real supervisor) and the negative-compression kill. Discriminating test passed.
- 02: The crux — after-rung correctly capped at **L2** because a signed, liable human owns the permit; "automated permitting" flagged as over-claiming the ladder. Before ~50 min derived from "the better part of an hour" is correctly tagged [Assumption] (0.3) with an ask-to-time.
- 03: Compresses the **decision** (does the data-rights position hold), not the artefact ("faster contract review" avoided). ~2 hr held as verbal [Assumption], cheapest-real-number named.
- 04: Correctly selects **autonomy** as the moving axis (L0→L2/L3 ≥2-rung jump), and — critically — refuses to promote L2→L3 at framing time, calling it an earned (eval) move, and refuses L4. 90 s/ticket tagged [Assumption].
- 05: Honest calibration — 15÷2 = **7.5× held as step change**, explicitly NOT inflated to order-of-magnitude; L0→L1 named as a ranking aid; downstream cash-flow claim NOT manufactured ("if collection timing doesn't move, this is 13 saved minutes and little else"). This is the anti-flattery test and it passes.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **The "after" value is frequently absent from the fellow's input** (Golden 01 gives no 30 s; Golden 05 gives no 2 min), yet the Method needs an after to compute the compression ratio. The skill handles this correctly via mandatory `[Hypothesis]` tagging, and it does NOT trip the "fabricated a number" auto_fail (that guard targets asserted facts/citations, not a target the build must earn). Still, template Step 4 should say explicitly: **the after target comes from the fellow's own claim ("we think we can cut it to X"); where the fellow gives none, label it an illustrative/assumed target, do not silently mint a specific figure.** Otherwise a careless fellow can misread a minted after (30 s, 2 min) as a commitment rather than an unproven hypothesis. Minor; does not block graduation.
- Sibling targets `problem-quality-scorecard` and `physics-floor-gap` are named in the description/routing but not yet present in the module folder (only `job-in-primitives` and `current-state-map` exist alongside). Trigger precision is unaffected (the NOT-clauses still correctly decline), but the "go to X" routes will dangle until those Wave skills land.

## Refine run 2 — applied judge fixes: template Step 4 and Method Step 4 now state the after value comes from the fellow's own stated target; where absent, it is labelled an illustrative `[Hypothesis]`, never a silently minted figure.
