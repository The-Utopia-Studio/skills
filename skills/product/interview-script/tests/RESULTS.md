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
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static comparison. Description claimed "planning discovery research" (the sibling's job); the `tacit-knowledge-interview` boundary was one-way. Passes after the patch. |
| 2026-09-03 | 2 — Golden 01–05 (run 1) | **4 PASS / 1 FAIL** | golden 02 scored **20/25**. Per-case table below. |
| 2026-09-03 | 3 — Adversarial 01–03 (run 1) | **PASS (3/3)** | 22 / 25 / 23. |
| 2026-09-03 | 2 — Golden 02 (run 2, after fix) | **PASS 24/25** | Diagnose mode added to SKILL.md; re-run scored below. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |
| 2026-09-03 | 5 — Mechanical auto-fails | **PASS (8/8)** | `tests/checks.sh` clean on all 8 outputs. The checker itself failed first — see below. |

### How this was run

`./scripts/eval-run.sh interview-script <case>` assembles the prompt: the
patched `SKILL.md` plus the case's `## Input` section, **and nothing else**. The
runner is not shown the expected shape, the auto-fail list, or the rubric —
showing it those would be teaching to the test, and the question is whether the
SKILL.md *alone* produces the expected shape.

Every produced artifact is committed under `tests/runs/2026-09-03/`, so each
score below is auditable against a real output rather than asserted. `tests/checks.sh`
runs the four judgment-free auto-fails as a gate before the rubric.

**Judge and author were the same agent.** That is the studio protocol for this
pass, and it is a real limitation: the scores below should be read as a
self-assessment against a written rubric, not as an independent verdict. The
FAIL is the part worth trusting — a self-scoring pass that finds nothing is
worth very little.

### Gate 2/3 — run 1 per-case scores

Rubric: `rubric.json`, 5 × 5, pass ≥ 21 **and** no dimension < 4.
MF = method_fidelity · AC = artifact_complete · PE = proprietary_edge ·
CH = challenge · ES = evidence_standard.

| Case | MF | AC | PE | CH | ES | Total | Verdict |
|---|---|---|---|---|---|---|---|
| golden 01 — script for a settled plan | 4 | 5 | 5 | 4 | 5 | **23** | PASS |
| golden 02 — compliments diagnosis | 3 | 3 | 4 | 5 | 5 | **20** | **FAIL** |
| golden 03 — no plan behind it | 5 | 4 | 4 | 5 | 4 | **22** | PASS |
| golden 04 — 10-minute booth intercept | 5 | 5 | 5 | 5 | 5 | **25** | PASS |
| golden 05 — product doesn't exist yet | 4 | 5 | 5 | 5 | 4 | **23** | PASS |
| adversarial 01 — vague one-liner | 5 | 4 | 4 | 5 | 4 | **22** | PASS |
| adversarial 02 — refuse to polish | 5 | 5 | 5 | 5 | 5 | **25** | PASS |
| adversarial 03 — route to tacit-knowledge | 5 | 4 | 5 | 5 | 4 | **23** | PASS |

**7 pass, 1 fail. Mean 22.9.** The spread (20–25) is the useful part: the rubric
separated cases, which is what it exists to do. Two cases at 25 and one below
threshold is a credible distribution; eight at 25 would not have been.

### Why golden 02 failed — a skill gap, not a bad run

The run-1 output for golden 02 was *good*. It named the mechanism, gave four
ordered fixes, named what would not fix it, and pointed at existing workarounds
as the missing signal. Read on its own it looks like a pass.

It scored 20 because **the SKILL.md did not instruct any of it.** There was no
diagnosis mode anywhere in the file — the Instructions section only covered
"create the interview script". `method_fidelity` asks whether the method was
followed; there was no method to follow, so the output was the model's general
competence wearing the skill's name. `artifact_complete` asks for the named
artifact; the named artifacts are the script and the note template, and a
diagnosis is neither.

That distinction is the whole point of the gate. A skill that scores well only
because the underlying model is capable is not carrying its weight — swap in a
weaker model and the behaviour disappears, with nothing in the file to hold it
up.

**Fix applied:** `SKILL.md` now opens with an explicit **Two modes** section —
write mode (the default) and **diagnose mode**, with a 5-step branch: name the
mechanism not just the rule · go question by question against four tests ·
name what is missing (the absent disconfirming answer) · name what will not fix
it (more interviews, a different segment) · point at the signal they are
missing (an existing workaround). The description now carries diagnose-mode
trigger phrasings, so those requests route here at all.

**Run 2: 24/25 (PASS).** MF 5 · AC **4** · PE 5 · CH 5 · ES 5.

`artifact_complete` stays at 4 on purpose. **Residual gap:** diagnose mode still
names no artifact. Write mode names two (script + note template); the diagnose
branch produces a diagnosis whose required shape is implied by its 5 steps but
never stated as a deliverable. A judge scoring a future diagnose run has nothing
to check completeness against. Worth closing next pass; not closed here, and not
scored as if it were.

### Two defects this run found in the tests themselves

Both are recorded because a suite that only ever finds skill bugs is not being
read carefully.

**1. `tests/checks.sh` was wrong on 5 of 8 outputs on its first run.** It applied
script-shape checks (note-taking template present, no pitch, no hypothetical
question) to *every* output. But several of this skill's correct answers contain
no script at all — a routing response, a diagnosis, a refusal. golden 02/03/04
and all three adversarial cases were flagged, every one a false positive. It
also failed adversarial 02 for *quoting* the four banned questions in order to
condemn them.

Rewritten to be **case-aware** (script-shape checks run only when a script is
present, detected from section headings or question-line count) and **scoped to
question lines** (`- "..."` — the words actually said in the room), so prose and
was→now rewrite tables can name a banned form without tripping. Regression held:
still fails on the raw bad input from adversarial 02.

**2. `adversarial/02`'s Fail-if clause would have failed a correct answer.** It
read *"keeps any of them in the output"*. The passing output quotes each banned
question in the left column of a was→now rewrite table — the clearest possible
way to show what was replaced. Corrected to *"carries any of the four forward as
a question to actually ask"*, with the change noted in the case file.

**One near-miss worth recording rather than waving through.** golden 05's run-1
output contained *"You'd come back with '8 of 10 said they'd want it and would
pay around $200/month'"* — a counterfactual illustration of what the bad script
would produce. Correct in framing, and it cost a point on `evidence_standard`,
because a figure like that reads as a finding if quoted one sentence out of
context. `golden/05.md` now auto-fails an illustrative number left unlabelled as
illustrative. The `metrics-that-matter` suite hit the same class of defect (its
example tagged a fabricated plateau `[Fact]`), which suggests this is a
marketplace-wide pattern rather than a one-off.

### One thing to watch

The description is now **1011 characters** against the validator's 1024 limit.
Carrying both modes' trigger phrasings plus three sibling NOT-clauses costs
nearly the whole budget. Any further addition needs something removed first, and
five skills in this repo already exceed the limit.

### Static SKILL.md audit against rubric.json (document review)

Superseded by the run scores above as the primary evidence; kept because it
records *where in the file* each dimension lives, which the per-case scores do
not. Updated after the diagnose-mode patch.

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | **Two modes** gate, then five script sections with timings, probing techniques, the Mom Test rules as explicit constraints, note-taking template. Diagnose mode adds a 5-step branch. |
| artifact_complete | **write mode yes, diagnose mode no** | Write mode names two artifacts — the script and the note-taking template — both required, saved as markdown. **Diagnose mode names none**; its 5 steps imply a shape but nothing states the deliverable. This is why golden 02's run-2 `artifact_complete` is 4 and not 5, and it is the one open item left on this skill. |
| proprietary_edge | **partial → improved** | Upstream gives the section structure and the Mom Test rules (both widely published). The studio additions with real teeth: the disconfirmation requirement (write the answer that would kill the hypothesis at the top of the script), the 80/20 speaking split as a *structural* constraint on question length rather than a hope, and the note-taking template designed so a compliment has nowhere to go. Honest read: 4. |
| challenge | yes | Golden 02 diagnoses the fellow's own script as the cause rather than blaming the sample; golden 05 refuses both requested question types and reframes; adversarial 02 refuses to polish four leading questions and says why polishing makes them worse. |
| evidence_standard | **yes — natively** | This is the one skill in the pack that carries a real evidence position in its own body: past over future, behaviour over opinion, "compliments are noise", WTP asked about the past. It does not use the `[Fact]`/`[Assumption]`/`[Hypothesis]` tags, but unlike the other four it does not need them retrofitted — its discipline is question-type discipline, which is the right form for this artifact. |

**Pack-level open item — RESOLVED this pass.** The rubric's
`evidence_standard` dimension was written in Icarus `[Fact]`/`[Assumption]`/
`[Hypothesis]` terms, which four of this pack's seven skills never use because
they derive from external sources. Rather than retrofit the tagging convention
onto four upstream bodies, the dimension now carries a **shared principle and a
skill-local mechanism**:

> *Principle (all seven):* weights money and behaviour over opinion, and makes
> the strength of every claim visible to a reader who was not there.
> *Mechanism (per skill):* see `evidence_standard.desc` in `rubric.json`.

For this skill the mechanism is: question-type discipline — every core question past-tense and specific-instance, no hypothetical survives, WTP asked about money already spent, and a note-taking template that gives compliments nowhere to be recorded.

This unblocks Gate 2 scoring. It is the right call and not merely the
convenient one: claim-tagging is one way to expose evidence strength, not the
only one, and forcing it onto an interview script or a transcript summary would
add ceremony without adding discipline. The dimension stays weighted 5 and
comparable across skills, because the standard did not move — only the test for
it.


**Auto-fail checks (static):** none triggered by the SKILL.md. Both
skill-specific auto-fails — a hypothetical core question, and a script with no
research design behind it — are exercised directly (golden 05 and adversarial
02 for the first; golden 03 and adversarial 01 for the second).
