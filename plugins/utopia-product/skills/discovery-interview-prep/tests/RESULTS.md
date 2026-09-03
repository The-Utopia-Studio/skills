# Eval log — discovery-interview-prep

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Who should we interview and how many?"
2. "We only get 5 customer calls this quarter — how do we spend them?"
3. "What method should we use for this research — JTBD, churn interviews, something else?"
4. "Plan the churn interviews for the 40 accounts we lost."
5. "We want to interview procurement managers but have no contacts — how do we run this?"

MUST NOT fire (3, naming the sibling each belongs to):
1. "I know who I'm interviewing and the method — write me the questions." → belongs to `interview-script`
2. "Here's the transcript from yesterday's call — pull out the findings." → belongs to `summarize-interview`
3. "The expert can't explain how they decide — I need to watch them work." → belongs to `tacit-knowledge-interview`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically against `interview-script`'s description. Reproducible; not a
live run.

**Before — FAIL on MUST-NOT #1.** The two descriptions collided head-on:

| Skill | Old description (extract) |
|---|---|
| `discovery-interview-prep` | "…**Use when preparing interviews** for problem validation, churn research, or new product ideas." |
| `interview-script` | "…**Use when preparing for user interviews**, creating interview guides, or planning discovery research." |

Both claimed "preparing interviews". `interview-script` additionally claimed
*"planning discovery research"* — which is this skill's entire job — while this
skill's `best_for` claimed *"Designing a customer discovery interview plan"*.
Neither named the other. A fellow saying "help me prepare for these interviews"
— the single most likely phrasing, and golden 03 in this suite — hit a coin
flip, and the two skills return non-overlapping halves of the work. Getting the
wrong half is not a partial answer; it is the wrong artifact.

**After — PASS.** The split is now stated as *plan vs script* in both
directions:

| Skill | Owns | Routes away to |
|---|---|---|
| `discovery-interview-prep` | goal · segment · sample · method · access · bias | `interview-script`, `summarize-interview`, `tacit-knowledge-interview`, `trace-to-interview`, `discovery-process`, `usability-test-protocol` |
| `interview-script` | the questions asked in the room | `discovery-interview-prep` (**run first**), `summarize-interview`, `tacit-knowledge-interview`, `trace-to-interview`, `discovery-process` |

`interview-script` now also states the dependency direction — that a script
without a research design behind it is *"a list of good questions pointed at the
wrong people"* — so the two skills agree on their order rather than merely
avoiding each other.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static two-way comparison with `interview-script`. Both claimed "preparing interviews"; `interview-script` also claimed "planning discovery research". Neither named the other. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run. `type: interactive` — see below. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same, except all three are single-turn-scorable. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |

### Why Gates 2 and 3 are unscored

The skill declares `type: interactive` and uses `workshop-facilitation`'s
one-question-per-turn protocol, so a correct response to golden 01 is the first
question, not a finished plan. Same multi-turn limitation as `prd-development`
and `discovery-process`.

**Single-turn-scorable subset:** **golden 03, 04 and all three adversarial
cases** — routing and diagnosis responses. Golden 01, 02 and 05 need a
multi-turn harness with a simulated fellow.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | Adaptive question set across goal / segment / constraints / method; `workshop-facilitation` as protocol; methodology options (JTBD and others) enumerated with selection criteria. |
| artifact_complete | yes | Named artifact is the interview plan — goal, segment, sample, method with reason, recruiting, biases. |
| proprietary_edge | **partial** | The genuinely non-generic parts are the access-constraint-first framing and the plan/script split. The method catalogue is standard research practice. Honest read: 3–4. |
| challenge | yes | Anti-Patterns reject sales-demo and survey-at-scale framings; routing table has a destination or an explicit "nothing" per row; golden 04 refuses to call n=3 validation and names friendship bias; adversarial 02 rejects hypothetical WTP. |
| evidence_standard | **partial** | Bias and sample-size discipline are present and real. No `[Fact]`/`[Assumption]`/`[Hypothesis]` convention in the body — enters only via the golden cases and rubric. **Fourth occurrence of this note in this pack.** |

**Pack-level open item — RESOLVED this pass.** The rubric's
`evidence_standard` dimension was written in Icarus `[Fact]`/`[Assumption]`/
`[Hypothesis]` terms, which four of this pack's seven skills never use because
they derive from external sources. Rather than retrofit the tagging convention
onto four upstream bodies, the dimension now carries a **shared principle and a
skill-local mechanism**:

> *Principle (all seven):* weights money and behaviour over opinion, and makes
> the strength of every claim visible to a reader who was not there.
> *Mechanism (per skill):* see `evidence_standard.desc` in `rubric.json`.

For this skill the mechanism is: the plan states what the achieved sample can and cannot support, names the biases the design is exposed to, and never assumes a response rate or sample size as if measured.

This unblocks Gate 2 scoring. It is the right call and not merely the
convenient one: claim-tagging is one way to expose evidence strength, not the
only one, and forcing it onto an interview script or a transcript summary would
add ceremony without adding discipline. The dimension stays weighted 5 and
comparable across skills, because the standard did not move — only the test for
it.


**Auto-fail checks (static):** none triggered by the SKILL.md. The
skill-specific auto-fails — writing questions instead of the design, and
setting a sample size without naming the access constraint — are exercised by
adversarial 03 and golden 01/05 respectively.
