# Eval log — discovery-process

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Retention dropped 18 points and nobody knows why — run us through a discovery cycle."
2. "Take us from hypothesis to validated solution before roadmap planning."
3. "How do we validate this properly before we commit the quarter?"
4. "Investigate this churn problem systematically."
5. "We have four weeks — frame it, research it, and come back with a build-or-kill."

MUST NOT fire (3, naming the sibling each belongs to):
1. "We want to get better at discovery generally — set up discovery for us." → belongs to `continuous-discovery-engine`
2. "We built the prototype; get 8 users in front of it and see where they get stuck." → belongs to `usability-test-protocol`
3. "Just tell me who to interview and how many — I'll write the questions myself." → belongs to `discovery-interview-prep`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically against the sibling descriptions. Reproducible; not a live run.

**Before — FAIL on MUST-NOT #1.** The description read only:

> "Run a full discovery cycle from problem hypothesis to validated solution. Use
> when a team needs a structured path through framing, interviews, synthesis, and
> experiments."

`continuous-discovery-engine`'s description fires on *"set up discovery"* and
*"continuous discovery"*. This skill's said *"a full discovery cycle"* and named
no sibling — and "full" reads as *more complete*, which is exactly the wrong
signal: it invites the fellow who wants a permanent practice to pick the bounded
one. Its `best_for` also claimed *"Setting up continuous discovery as an ongoing
practice"* — **directly claiming `continuous-discovery-engine`'s job.**

MUST-NOT #2 was partly guarded: the body's Anti-Patterns said *"Not user
testing"* but named no skill, and the `When NOT to Use This` list had no
destinations at all. MUST-NOT #3 was unguarded.

**After — PASS.** The description now leads with *"one bounded 3-4 week
discovery cycle… with three explicit go/no-go decision points"* and carries
NOT-clauses naming `continuous-discovery-engine`, `discovery-interview-prep`
and `trace-to-interview`. The body's `When NOT to Use This` is a routing table
with a destination or an explicit "nothing — do X" for every row, and closes on
the bounded-cycle vs standing-practice boundary.

**Not fixed in this pass, flagged instead:** `best_for` still contains
*"Setting up continuous discovery as an ongoing practice"*, which contradicts
the new description. `best_for` is not part of the Agent Skills frontmatter
contract and is not read by the router, so it does not fail Gate 1 — but it will
mislead a human reading the file. It belongs in the next pass along with the
other `intent:`/`theme:`/`best_for:` skills inherited from the same upstream.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static comparison against `continuous-discovery-engine`. MUST-NOT #1 fired before this pack's patch — and `best_for` claimed the sibling's job outright. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run. Multi-turn, same limitation as `prd-development` — see below. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |

### Why Gates 2 and 3 are unscored

Like `prd-development`, this is a facilitated multi-turn workflow: a correct
response to golden 01 is Phase 1 plus a stop, not a completed cycle. Scoring it
needs a multi-turn harness with a simulated fellow, which does not exist here.

**Single-turn-scorable subset** (routing and diagnosis, no facilitation
required): **golden 02, 03, 04 and all three adversarial cases.** Golden 01 and
05 need the harness. Score the subset and record the coverage rather than a
total that hides which half ran.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | 6 phases with durations and per-phase outputs, **three explicit decision points** with exit criteria, `workshop-facilitation` as the interaction protocol, end-to-end workflow tree. |
| artifact_complete | yes | Named artifact is the filled `template.md`; `examples/` present; the cycle's end state is a decision, which the description now states. |
| proprietary_edge | **partial** | The three decision points with real exit criteria are the non-generic part — most discovery advice has no kill gate. The frame → research → synthesise → experiment sequence itself is standard. Honest read: 3–4. |
| challenge | yes | 5 named Pitfalls (leading questions, saturation, analysis paralysis, discovery-as-one-time); `When NOT to Use This` explicitly excludes pre-committed stakeholders; golden 03 refuses the theatre run and golden 04 refuses an already-validated problem. |
| evidence_standard | **partial** | DP2 (saturation) and Pitfall 3 are real evidence discipline. But the body has no `[Fact]`/`[Assumption]`/`[Hypothesis]` convention — it enters only through the golden cases and the rubric. Same open item as `one-pager-prd` and `prd-development`. |

**Pack-level open item — RESOLVED this pass.** The rubric's
`evidence_standard` dimension was written in Icarus `[Fact]`/`[Assumption]`/
`[Hypothesis]` terms, which four of this pack's seven skills never use because
they derive from external sources. Rather than retrofit the tagging convention
onto four upstream bodies, the dimension now carries a **shared principle and a
skill-local mechanism**:

> *Principle (all seven):* weights money and behaviour over opinion, and makes
> the strength of every claim visible to a reader who was not there.
> *Mechanism (per skill):* see `evidence_standard.desc` in `rubric.json`.

For this skill the mechanism is: conclusions pass the three decision points rather than skipping them, saturation is actually reached before DP2 closes, and a cycle whose DP3 cannot come back negative is named as theatre.

This unblocks Gate 2 scoring. It is the right call and not merely the
convenient one: claim-tagging is one way to expose evidence strength, not the
only one, and forcing it onto an interview script or a transcript summary would
add ceremony without adding discipline. The dimension stays weighted 5 and
comparable across skills, because the standard did not move — only the test for
it.


**Auto-fail checks (static):** none triggered by the SKILL.md. The
skill-specific auto-fails — reaching a decision without passing the three
decision points, and running the cycle to justify a committed solution — are
exercised by golden 03 and adversarial 02.
