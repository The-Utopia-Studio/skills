# Eval log — continuous-discovery-engine

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Set up discovery for our product."
2. "Keep learning after launch."
3. "Build me an opportunity tree." / "opportunity tree"
4. "I want continuous discovery."
5. "How do we run discovery after launch?"

MUST NOT fire (3, name the sibling each belongs to):
1. "What rung is 'they said they'd buy it' on the evidence ladder?" → belongs to `evidence-ladder` (scores one signal, not a tree)
2. "Pick the cheapest honest test to check whether operators trust the alert." → belongs to `probe-matrix` (routes one question to one probe)
3. "Prep me for / write my customer interview script." → belongs to `tacit-knowledge-interview` (runs one interview, which this skill only consumes as a feed)

## Kill line (auto-fail, mirror of the SKILL.md)
- Returns a static one-shot tree with NO live-input loop, NO named synthesis owner, or NO cadence.
- Lets the machine auto-edit the tree instead of a human owning synthesis.
- Fabricates a trace or eval number to fill a dark feed (esp. pre-launch, Golden 02).
- Ranks the POC on raw score alone, ignoring the evidence rung (that is the old OST).

## Head-to-head vs. opportunity-solution-tree (Gate 4)
This skill sets `supersedes: skills/discovery/opportunity-solution-tree` and must beat it on the same input.

| Dimension | opportunity-solution-tree (static) | continuous-discovery-engine (this) |
|---|---|---|
| Inputs | one workshop, whatever is in the room | three live feeds: interviews + production traces + eval telemetry |
| Freshness | drawn once, goes stale | updates on a cadence; nodes stamped with feed + rung + date |
| Who decides | facilitator, one time | named human owns synthesis; machine only surfaces candidates |
| Evidence | opportunities asserted, unranked by proof | every node carries an evidence rung; POC = Raw × rung |
| Cost of discovery over time | rises (need new workshops) | falls after launch (traces at 0.7 are nearly free) |
| Kill condition | n/a | fails if it returns a static tree with no loop/owner/cadence |

The head-to-head: on Golden 01, the static OST would keep "add more cooling-anomaly alerts" as a live solution (backed by 0.3 interviews). This skill's loop kills it with a 0.7 production trace three months post-launch — the beat the static tree structurally cannot make, because it has no feed and no cadence to carry the trace back in.

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

---

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings are literally enumerated in the `description` ("set up discovery", "keep learning after launch", "opportunity tree", "continuous discovery", "discovery after launch"). All 3 must-not are named as sibling redirects in the same line (evidence-ladder / probe-matrix / tacit-knowledge-interview). Clean. |
| 2 Golden | PASS (5/5) | per-case table below; all ≥21, no dimension <4, no auto_fail triggered |
| 3 Adversarial | PASS (3/3) | 01 vague → method Step 1/2 forces "has it shipped? which feeds live? / what metric?" and builds nothing. 02 solution-in-disguise → the Icarus core inversion + "Interview-only inflation" gotcha arm the reframe (job = keep tree current with highest-rung feed, not maximise interviews; post-launch traces 0.7 beat interviews 0.3). 03 out-of-scope → description + When-NOT table decline and name `probe-matrix`, no probe designed. No fabrication/flattery/poaching. |
| 4 Head-to-head | PASS | new vs superseded on this rubric (3 inputs): new ≈24–25 each; opportunity-solution-tree ≈7–8 each. New wins on TOTAL and on both named dims: proprietary_edge 5 vs 1, challenge 5 vs 2. |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: Raw×rung weighting mechanically demotes opinion-backed solutions, and the loop turn kills an interview-backed 0.3 solution (A1 cooling alerts) with a 0.7 trace — moves a generic OST cannot make. All load-bearing mechanics are tabular, not prose. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores (dims: method_fidelity / artifact_complete / proprietary_edge / challenge / evidence_standard)

| Case | MF | AC | PE | CH | ES | Total | Pass? |
|---|---|---|---|---|---|---|---|
| G01 Azraq post-launch | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| G02 Durian pre-launch (1 feed) | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| G03 Mentix copilot (eval≠demand) | 5 | 5 | 5 | 5 | 4 | 24 | ✅ |
| G04 Barrier rigs (trace worship) | 5 | 4 | 5 | 5 | 4 | 23 | ✅ |
| G05 mundane expense-approval | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |

Notes on Gate 2:
- **G02 pre-launch handled honestly (special check).** Step 2 forces traces + eval marked DARK with the reason, states the 0.3 ceiling, and names the thinnest slice to ship to reach 0.7. Step 7 draws its loop turn from a *live* feed (interviews) — so no trace/eval is fabricated to fake a turn. The pre-launch case is handled by honest marking, not pretending.
- **G03/G04 evidence discipline held.** The "Eval telemetry mistaken for demand" and "Trace worship" gotchas + evidence standard keep a green eval from promoting a solution and force weighting a trace by distinct users. Both scored ES 4 (not 5) only because that weighting lives in prose/gotchas, not in the Step-6 table (see gotcha 1).
- No auto_fail across any case: no fabricated Fact, no flattery, no misfire, not boilerplate.

### Special-check verdict
- Three-live-input loop: **required** (Step 2 inventory, Step 3 wiring, Step 6 cadence, kill line).
- Named synthesis owner: **required** ("a name, not a role" in Step 3; kill line fails without it).
- Cadence: **required** (Step 3 + Step 6; kill line fails without it).
- Kill line present and enforced; the static-poster relapse is named as failure, not softened.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas / template.md)
- **Trace-worship weighting is not structurally enforced in the template.** The "distinct users producing the signal" rule lives only in the Gotchas prose + evidence standard. The Step-6 loop-turn table (`Signal | Feed + rung | Node | Tree action | ...`) has no "distinct users / N" field, so a fast applier could log one crew member's dismiss as a 0.7 finding (exactly the Golden-04 trap) while still "filling the template." Recommend adding a **distinct-users column** to the loop-turn table so the guard is enforced by the artifact, not just by reading the gotcha.
- **Pre-launch loop turn is structurally thin and could be mistaken for poster-relapse.** With only interviews live (Golden 02), Step 7's demonstrated turn can only refine an interview-backed node within 0.3 (interview→interview, no rung movement). It is honest, but the template should add a one-line note that pre-launch the demonstrated turn is a 0.3 interview refinement and the rung-moving turn arrives when the thin slice ships — otherwise a reviewer may read the thin turn as a missing loop.
- (Non-defect) The `description` is long, but it fires precisely and scopes cleanly — no change needed.

## Refine run 2 — applied judge fixes: added distinct-users/N field to the loop-turn table (trace-worship guard); added note that a pre-launch interview→interview loop at 0.3 is a real loop, not a missing one.
