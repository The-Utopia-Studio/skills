# Eval log — interview-script

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Write me the interview script — 6 supervisors, JTBD, Tuesday."
2. "What questions should I ask?"
3. "Give me an interview guide for the churn calls."
4. "My interviews keep going well but I learn nothing — people just say it sounds great."
5. "Here's my script — the questions feel wrong but I can't say why."

MUST NOT fire (3, naming the sibling each belongs to):
1. "Who should we interview and how many? We only get 5 calls." → belongs to `discovery-interview-prep`
2. "Here's the transcript — pull out the jobs and the action items." → belongs to `summarize-interview`
3. "She can't explain how she decides — I need to watch her work." → belongs to `tacit-knowledge-interview`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically. Reproducible on the description text; not a live run.

**Before — FAIL on MUST-NOT #1, and unguarded on #2 and #3.** The description
ended:

> "…Use when preparing for user interviews, creating interview guides, or
> **planning discovery research**."

That last clause claims `discovery-interview-prep`'s entire job. Meanwhile that
skill's description said *"Use when preparing interviews for problem validation,
churn research…"* — so both claimed "preparing interviews" and this one
additionally claimed the planning. Neither named the other.

The collision was **not symmetric in consequence**, which is what made it worth
fixing first: `tacit-knowledge-interview` already routed *to* this skill
correctly (its body carries a row: *"A Mom-Test script to learn a customer's
problem or JTBD → `interview-script`"*), so the Icarus side of the boundary was
cold and this side was not. One-way routing means the fellow lands correctly
only if they enter from the Icarus skill.

**After — PASS.** A `## Route first` table now sits above the method with six
rows, and the description carries NOT-clauses for
`discovery-interview-prep`, `tacit-knowledge-interview` and
`summarize-interview`. The dependency direction is stated — *"a script without a
research design behind it is a list of good questions pointed at the wrong
people"* — so the plan/script boundary now reads the same from both sides.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static comparison. Description claimed "planning discovery research" (the sibling's job); the `tacit-knowledge-interview` boundary was one-way. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run. Single-turn skill — fully scorable once run; see below. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |

### Why Gates 2 and 3 are unscored — and why this one is the cheapest to close

Unlike the four workflow skills in this pack, **this skill is single-turn**: one
input, one script out. There is no facilitation protocol and no multi-turn
harness needed. Gates 2 and 3 are unscored here only because no run was
executed in this pass, not because scoring is blocked.

It also has the most **mechanically checkable** pass criteria in the pack. A
judge can verify two of them without judgment:

1. **No future-tense or hypothetical core question.** Grep the produced script
   for `would you`, `do you think`, `if we`, `sound useful`, `like to see`. Any
   hit in a core question is the skill-specific auto-fail.
2. **The note-taking template is present** and every field asks for a
   behaviour, number, or past event — no free-text impression field.

Golden 01 adds a third: the script must fit the stated 30 minutes.

**This is the recommended first skill to score live in the next pass.** It is
single-turn, its auto-fails are greppable, and it has a genuine
`evidence_standard` position of its own (past-behaviour over stated intent),
which the four upstream-derived skills in this pack do not.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | Five script sections with timings, probing techniques, the Mom Test rules as explicit constraints, note-taking template. |
| artifact_complete | yes | Two named artifacts — the script and the note-taking template — both required in the output, saved as markdown. |
| proprietary_edge | **partial → improved** | Upstream gives the section structure and the Mom Test rules (both widely published). The studio additions with real teeth: the disconfirmation requirement (write the answer that would kill the hypothesis at the top of the script), the 80/20 speaking split as a *structural* constraint on question length rather than a hope, and the note-taking template designed so a compliment has nowhere to go. Honest read: 4. |
| challenge | yes | Golden 02 diagnoses the fellow's own script as the cause rather than blaming the sample; golden 05 refuses both requested question types and reframes; adversarial 02 refuses to polish four leading questions and says why polishing makes them worse. |
| evidence_standard | **yes — natively** | This is the one skill in the pack that carries a real evidence position in its own body: past over future, behaviour over opinion, "compliments are noise", WTP asked about the past. It does not use the `[Fact]`/`[Assumption]`/`[Hypothesis]` tags, but unlike the other four it does not need them retrofitted — its discipline is question-type discipline, which is the right form for this artifact. |

**Note on the pack-level open item:** this skill is the exception. The
`evidence_standard` mismatch flagged on `one-pager-prd`,
`prd-development`, `discovery-process` and `discovery-interview-prep` does not
apply here — the dimension is satisfiable as written, by a different and
appropriate mechanism. When resolving the pack-level rubric question, do not
force claim-tagging onto this skill; it would add ceremony to an artifact that
already enforces the underlying standard.

**Auto-fail checks (static):** none triggered by the SKILL.md. Both
skill-specific auto-fails — a hypothetical core question, and a script with no
research design behind it — are exercised directly (golden 05 and adversarial
02 for the first; golden 03 and adversarial 01 for the second).
