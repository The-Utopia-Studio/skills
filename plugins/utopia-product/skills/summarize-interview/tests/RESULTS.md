# Eval log — summarize-interview

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Summarise this interview." (with a transcript)
2. "Here's the transcript from the call — what did we learn?"
3. "Process these interview notes into our template."
4. "Pull the jobs and action items out of this customer call."
5. "I've got three transcripts — summarise them."

MUST NOT fire (3, naming the sibling each belongs to):
1. "We have six months of production logs — summarise what users are telling us in there." → belongs to `trace-to-interview`
2. "No transcript yet — write me the questions to ask." → belongs to `interview-script`
3. "I have six summaries; build me one structure across all of them." → belongs to `continuous-discovery-engine`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically. Reproducible on the description text; not a live run.

**Before — FAIL on MUST-NOT #1 and #3.** The description read:

> "…Use when processing interview recordings or transcripts, **synthesizing
> discovery interviews**, or creating interview summaries."

Two problems. *"Synthesizing discovery interviews"* claims cross-interview
synthesis, which this skill explicitly should not do — its own template is
single-participant, so the claim invited a request it cannot serve correctly
(MUST-NOT #3, and golden 02 in this suite). And *"interview recordings"* with no
boundary invited the logs-and-session-replay request (MUST-NOT #1).

As with `interview-script`, the boundary was **one-way**:
`trace-to-interview` already routed correctly, naming this skill in its body as
structuring *"a recorded human conversation"* and marking it "absorbed and
reframed, not superseded". The Icarus side was cold; this side was silent. A
fellow entering from this skill's side had nothing to redirect them.

**After — PASS.** The description now requires *"a real transcript as input"*,
drops the synthesis claim, and carries NOT-clauses naming `interview-script`,
`trace-to-interview`, `continuous-discovery-engine` and
`tacit-knowledge-interview`. A `## Route first` table sits above the method and
states the constraint in one line: **one transcript in, one summary out** — with
the reason (patterns asserted from two data points), which is the part that
makes it stick.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static comparison. Description claimed cross-interview synthesis it cannot do, and had no boundary against logs. `trace-to-interview` routed here correctly; the reverse did not exist. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run. Single-turn and fully scorable — but needs fixture transcripts; see below. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same; all three are scorable without fixtures. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. `trace-to-interview` describes this skill as "absorbed and reframed, not superseded" — consistent, no retirement implied. |

### Why Gates 2 and 3 are unscored — and the one blocker specific to this skill

The skill is single-turn, so no facilitation harness is needed. But golden 01–05
describe transcripts rather than containing them, and **this skill cannot be
scored without the actual transcript text** — the entire test is whether each
summary line traces to something said, which is unverifiable against a
description of a transcript.

That is a real, specific blocker and it is cheap to clear:
**`tests/fixtures/` needs five transcripts**, one per golden case. They should
be written as clearly-labelled test fixtures (the studio convention used in
`metrics-that-matter/examples/sample.md`), not passed off as real calls.
Golden 01, 03 and 05 in particular are defined by exact phrasing — "honestly
it's fine, it's better than nothing", the mid-sentence truncation, "we just deal
with it as it comes in" — and need the words on the page to be scorable at all.

All three adversarial cases are scorable now, without fixtures: 01 needs no
transcript by definition, and 02 and 03 test refusal behaviour that does not
depend on transcript content.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | Read-fully-then-fill sequence, the output template, the `-`-for-unavailable rule, plain-language constraint. |
| artifact_complete | yes | Named artifact is the filled template, saved as markdown; all fields enumerated. |
| proprietary_edge | **partial** | The template is upstream and generic. Studio additions with teeth: `[inference]` marking so summariser judgment cannot be mistaken for participant speech, the evidence grading on willingness-to-pay (money spent > stated budget > "we'd probably pay"), the one-transcript-in-one-summary-out constraint with its reason, and the anonymisation prompt. Honest read: 3–4. |
| challenge | yes | Golden 02 refuses to merge and tests the fellow's "all saying the same thing"; golden 05 records enthusiasm-with-no-workaround as a negative finding; adversarial 02 refuses to filter a summary on a conclusion. |
| evidence_standard | **yes — natively, after this pass** | Before this pass the body had no evidence discipline beyond "use `-` if unavailable". It now carries a real one appropriate to the artifact: trace-to-what-was-said, mark inferences, grade WTP by what it is, and never record a compliment as satisfaction. Like `interview-script`, this is question/record discipline rather than claim-tagging, and it is the right form here. |

**Pack-level open item — RESOLVED this pass.** The rubric's
`evidence_standard` dimension was written in Icarus `[Fact]`/`[Assumption]`/
`[Hypothesis]` terms, which four of this pack's seven skills never use because
they derive from external sources. Rather than retrofit the tagging convention
onto four upstream bodies, the dimension now carries a **shared principle and a
skill-local mechanism**:

> *Principle (all seven):* weights money and behaviour over opinion, and makes
> the strength of every claim visible to a reader who was not there.
> *Mechanism (per skill):* see `evidence_standard.desc` in `rubric.json`.

For this skill the mechanism is: said-vs-inferred separation — every Problems/What-They-Like line traces to a quote, summariser inference marked `[inference]`, ungiven ratings left as `-`, and WTP graded by kind.

This unblocks Gate 2 scoring. It is the right call and not merely the
convenient one: claim-tagging is one way to expose evidence strength, not the
only one, and forcing it onto an interview script or a transcript summary would
add ceremony without adding discipline. The dimension stays weighted 5 and
comparable across skills, because the standard did not move — only the test for
it.


**Auto-fail checks (static):** none triggered by the SKILL.md. Both
skill-specific auto-fails — an unsupported line under Problems/What-They-Like,
and merging several transcripts — are exercised by golden 01/03/05 and golden
02 respectively.

**One defect fixed in the SKILL.md this pass, worth recording:** the upstream
output template used a real person's name (the source author's) as the example
action-item owner. Left as-is, that name leaks into fellow-facing summaries. It
is now called out in the gotchas as a placeholder to replace.
