# Eval log — four-lenses-test

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Is this desirable, usable, feasible, and viable?"
2. "Should we build it? Go or no-go on this concept."
3. "Run the four lenses on this idea."
4. "Score this idea across desirability, feasibility, and viability."
5. "Is this worth building?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Walk me from validated problem to vision, strategy, North Star, and roadmap." → belongs to `product-frame-stack`
2. "Score this problem across the eight dimensions — is it worth solving?" → belongs to `problem-quality-scorecard`
3. "Give me the five-question so-what gut check on the whole idea." → belongs to `so-what-stress-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description fires explicitly on "is this desirable/usable/feasible/viable", "should we build it", "run the four lenses", "go or no-go", "is this worth building" → all 5 MUST-fire hit. Three NOT-fire phrasings are named-and-excluded in the description itself (problem→vision→roadmap → product-frame-stack; PROBLEM on 8 dimensions → problem-quality-scorecard; five-question so-what → so-what-stress-test) → 0 misfire. |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: Method Step 0 + "Lensing a fog" gotcha force ask-the-one-concept, invent nothing → ask-the-one-question satisfied. 02 solution-in-disguise: evidence ladder scores "everyone wants an app" as 0.1 opinion → Desirability UNGRADED; AND gate forbids scoring only F+V; names channel-not-a-need trap → reframe-and-name-the-trap. 03 out-of-scope spine: When-NOT table + description exclusion decline and route to product-frame-stack → decline-and-name-the-sibling. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n-a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01 output could not come from a generic PM prompt: tool-per-lens binding (onion+JTBD+Kano / watched observation / dev spike / ICE anchored to measured value), evidence ladder (money 1.0, behaviour 0.7, opinion 0.1→ungraded), AND-not-average gate, [Fact]/[Assumption]/[Hypothesis] tagging, dual-track owners. A generic prompt averages and passes on opinion. Guidance is tabular (tool/owner, scoring, gate, ladder) — no should-be-a-table prose found. |
| 6 Real-use | pending | Requires 5+ real fellow uses — not executable here. |

### Golden per-case scores (5 dims × 0–5, /25; pass ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Azraq data-rights checker | 4 | 5 | 5 | 5 | 5 | 24 | PASS — NOT-YET; Desirability PASS on the one observed slip (behaviour 0.7 [Fact]); Feasibility/Viability held pending spike + priced bad-renewal cost ([Hypothesis]). Gate never GO with a conditional/ungraded lens. No auto_fail. |
| 02 Mentix feasibility-on-opinion | 5 | 5 | 5 | 5 | 5 | 25 | PASS — Feasibility scored 0 UNGRADED on "engineer is confident" (0.1 opinion), green-light explicitly refused → BLOCKED. Hits the kill line squarely. No auto_fail. |
| 03 Barrier permit-risk flagger | 5 | 5 | 5 | 5 | 5 | 25 | PASS — Viability PASS on the £40k invoice (money 1.0 [Fact]) does NOT carry the concept to GO while Usability sits CONDITIONAL (mock unobserved) → NOT-YET. Anti-average on the money side. No auto_fail. |
| 04 Durian auto-status-draft | 5 | 5 | 5 | 5 | 5 | 25 | PASS — Kano read = indifferent; "people say they'd use it" = 0.3 verbal, not a pass → Desirability 1 FAIL → NO-GO despite F/V strong. Anti-average. No auto_fail. |
| 05 Azraq runbook search (mundane) | 5 | 5 | 5 | 5 | 5 | 25 | PASS — small prize sized honestly, no manufactured value number, internal-tool "price" framed as cost-justification → NOT-YET on a small prize. Refuses to inflate. No auto_fail. |

All 5 ≥ 21, no dimension < 4. Kill line held in every case: no lens passed on opinion; no GO returned while any lens sat at FAIL/UNGRADED. Each of Desirability/Usability/Feasibility/Viability is graded only by its named tool, and the AND gate lets one fatal lens (U1 in the sample, D1 in golden 04) override three strong ones with no averaging.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **CONDITIONAL(2) vs UNGRADED(0) for an unrun-but-unclaimed tool is under-specified.** The score table row for 0 reads "No named tool run; only opinion behind it" while 2 reads "Tool run OR a credible artefact/commitment exists." A lens that is simply not-yet-run with no artefact and no one claiming it passes falls between the two. Golden 01/03 expected shapes treat such lenses as CONDITIONAL (→ NOT-YET); golden 02 treats an unrun lens as UNGRADED (→ BLOCKED). The distinguishing signal is really *whether someone is asserting a pass on opinion* (→ 0) versus *the tool just hasn't run yet, no claim made* (→ 2, pending probe). This only shifts the verdict LABEL (NOT-YET vs BLOCKED); it never breaches the kill line (never GO, never an opinion-pass). Worth one clarifying clause in the Step-2 score table so two judges grade golden 01 the same way. Not a blocker.

Overall: **GRADUATE-READY.**

## Refine run 2 — applied judge fixes: added a Step-2 clause distinguishing CONDITIONAL(2) (tool in play but inconclusive → NOT-YET) from UNGRADED(0) (no tool run / opinion-pass → BLOCKED), making the verdict label deterministic across judges.
