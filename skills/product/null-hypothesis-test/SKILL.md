---
name: null-hypothesis-test
description: >-
  Falsification pass for the load-bearing beliefs under a chosen plan or wedge.
  Restates each assumption as a null hypothesis (the belief is FALSE), designs the
  single cheapest observation whose failure would disprove it, and ranks every
  assumption by P(wrong) x impact-if-wrong so the fellow shoots at the most-likely-
  fatal belief first. Fires on "what has to be true", "how would I disprove this",
  "what's the riskiest assumption", "what could kill this", "which belief do I test
  first". Output is an Assumption -> Null -> Disproof table with a pre-committed kill
  signal on every row. NOT the go/no-go on whether the problem is worth building at
  all (problem-quality-scorecard), NOT bottom-up sizing (bottoms-up-quantification),
  NOT the priced workflow map (current-state-map), NOT a narrative failure story
  (pre-mortem).
type: generator
supersedes: none
---

## What it does

Takes the beliefs a plan silently depends on and turns each into a falsifiable
bet: its null form (the belief is false), the single cheapest observation that
could kill it, and the exact result that counts as death — written down before
you run it. It then ranks the beliefs by how likely each is to be wrong times how
much dies if it is, and tells the fellow which one to shoot at this week. The
output is a ranked disproof table, not a risk list.

## The Icarus reframe

Generic assumption work lists beliefs and "suggests a test" — and the test almost
always goes looking for support, so it can only ever pass. This inverts it. You
write the null (your belief is false) and the only admissible test is one that
could make the null win. A belief you cannot imagine disproving cheaply is not an
assumption, it is a hope, and the skill names it as one. Then it spends the
cheapest disproof on the belief most likely to be both wrong and fatal — because
that is where a week of testing buys the most.

## When to use / When NOT

Use it once a fellow has a plan, wedge, or concept in hand and needs to know which
of its underlying beliefs to falsify, in what order, with what test.

Do not use it for these — hand off instead:

| If the fellow wants… | Use instead |
|---|---|
| A go/no-go on whether the problem is worth building at all | `problem-quality-scorecard` (8-dimension gate) — this skill runs *after* a problem clears it, or on the dimensions it opinion-capped |
| To build magnitude from the smallest verifiable units | `bottoms-up-quantification` |
| To map how the workflow is done today and price each step | `current-state-map` |
| A narrative "imagine it failed, tell the story" exercise | `pre-mortem` — that generates failure modes as prose; this designs the one cheapest observation that disproves a specific belief and ranks it |
| To turn a solution back into a problem first | `problem-statement`, then return here |

This skill falsifies and ranks the beliefs under a chosen plan. It is not a
build/no-build gate and not a sizing tool.

## Method

Fill in `template.md`. Seven steps.

**Step 1 — Surface only the load-bearing beliefs.** Read the plan from four seats
(PM: will they pay; designer: will they use it; engineer: can we build it; legal/
GTM: are we allowed to and can we reach them). Keep only the beliefs the plan
*dies* without. Delete every nice-to-know. If the fellow gave you a solution
("we need a mobile app") rather than a belief about the world, reframe it to the
underlying claim first ("users abandon because the task can't be done on mobile")
— you cannot falsify a feature.

**Step 2 — Write the null for each belief.** The null H0 is the flat denial: the
boring world where the effect is absent. "Operators will grant us log access"
becomes H0: "operators will not grant access." You will not test to confirm the
belief; you will run the observation that gives H0 its best fair chance to win.

**Step 3 — Score P(wrong) 1-5.** How likely is the belief actually false, given
the evidence you hold today.

| P(wrong) | When |
|---|---|
| 5 | No evidence it's true; it cuts against base rates or against how the incumbent already behaves |
| 4 | Plausible but unverified; rests on opinion, analogy, or a friendly anecdote |
| 3 | Genuinely mixed — one weak signal each way |
| 2 | One behaviour or artefact data point supports it |
| 1 | Money or repeated behaviour already supports it (rarely still a live assumption) |

Two anti-overconfidence rules, both enforced:
- Opinion-only support caps you at **P(wrong) >= 4**. You do not get to call a
  belief probably-true because you feel sure of it.
- Any belief with Impact 5 (venture-fatal, Step 4) resting below behaviour-grade
  evidence has **P(wrong) floored at 3** — so a fatal belief can never be parked on
  confidence; it always lands in the "test first" band.

**Step 4 — Score Impact-if-wrong 1-5.** If the belief is false, how much of the
plan dies.

| Impact | If the belief is false… |
|---|---|
| 5 | Venture-fatal: no business exists (legality, core data access, anyone paying at all) |
| 4 | Wedge-fatal: the first slice dies; forced pivot |
| 3 | Costs a quarter or a major rebuild |
| 2 | Costs a sprint |
| 1 | Cosmetic; routed around in a day |

**Step 5 — Rank = P(wrong) x Impact (max 25), and set the order.**

| P x Impact | Action |
|---|---|
| >= 15 | Load-bearing wall. Test THIS WEEK, before any build. |
| 8-14 | Test this month, before the build stage it gates. |
| <= 7 | Park. Note it; do not spend a *costly* test yet — but a ~zero-cost disproof (piggybacked on work already happening, or a quick check before an imminent rollout) may still run. Parking means "don't buy an expensive test", not "never observe". |

Ties break toward the higher Impact; for equal-Impact rows, toward the higher P(wrong), then toward the cheaper disproof. Test order is descending rank, top first.

**Step 6 — For each belief above the park line, design the single cheapest
disproof.** The observation must clear three gates or it is theatre:

1. **Can-fail** — there is a realistic result that kills the belief.
2. **Pre-committed kill signal** — you write the exact result that = death *before*
   running, so no post-hoc rationalising a bad result into a good one.
3. **Behaviour-or-money** — the observation produces evidence at behaviour rung or
   higher (see Evidence standard), not an opinion.

A test is a **confirmation test** — banned, this is the kill line — if any of these
is true: it can only return support (friendly sample, hypothetical question); its
success criterion is "they said yes / they liked it"; it has no pre-committed
failure result. Rewrite every confirmation test into its disproof twin:

| Confirmation test (banned) | Disproof twin (required) — with pre-committed kill signal |
|---|---|
| "Interview 10 operators: would you share logs?" | Ask ONE operator for sandbox read-access to one real log this week. Kill = access not granted, or it routes to legal and stalls past 5 days. (behaviour/artefact) |
| "Survey managers: would you use an AI copilot?" | Concierge one recommendation into one live shift by hand. Kill = the manager ignores or overrides it, or does not ask for it again next shift. (behaviour) |
| "Show the mock to 5 users, ask if it's clear." | Give 5 users the task cold, no help. Kill = 2 or more fail the core step or ask what to do. (behaviour) |

**Step 7 — Write the test order and what would change the view.** Name the top one
or two beliefs, their disproof, cost, and kill signal. For each, state in one line
what result would make you abandon the belief and what would let it climb one rung
of the evidence ladder.

## Evidence standard

A disproof only counts if it produces behaviour or money evidence. The ladder:

| Evidence the disproof produces | Ladder weight |
|---|---|
| Money moved (paid, refused to pay, switched spend) | 1.0 |
| Behaviour observed under real stakes | 0.7 |
| Artefact shown | 0.5 |
| Verbal commitment | 0.3 |
| Opinion | 0.1 |

A verbal "no" is weak disproof — people are polite and answer
hypotheticals loosely. A behavioural non-action under real stakes ("we gave them
free access and they never pulled a log") is strong disproof. Money is strongest.
The cheapest test that produces behaviour-grade-or-better evidence wins; a cheaper
test that only produces opinion does not count as a disproof and must be rewritten.
Tag every empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. Never invent
a frequency, cost, or quote the fellow did not give you.

## Gotchas

- **Confirmation dressed as rigour.** "Run 10 interviews to validate demand" feels
  like a test and is not — it is built so the belief can only survive. If the
  observation has no result you would accept as death, it is theatre. Force the
  pre-committed kill signal.
- **Parking the fatal belief.** The one belief that would end the venture is the one
  a fellow is most tempted to declare "obviously fine" and skip. The Impact-5 floor
  (Step 3) exists to stop that: a venture-fatal belief on opinion evidence lands in
  the test-first band whether the fellow likes it or not.
- **Ranking by fear, not by wrong x impact.** The scariest-sounding risk is not
  always the highest-ranked. A belief that is terrifying but you already have money
  evidence for (P=1) ranks below a dull-sounding belief that is probably wrong and
  wedge-fatal. Rank on the product, not on the adrenaline.
- **Falsifying a solution.** If the "assumption" is a chosen feature ("we assume we
  need X"), every test scores the feature, not a belief about the world. Reframe to
  the underlying claim before writing the null.
- **Cheap-but-empty disproof.** A test can be cheap and still worthless if its
  output is opinion (a survey). Cheapness is necessary, not sufficient; the output
  rung is the other half of the gate.

## Examples

`examples/sample.md` — a worked Azraq disproof table: six load-bearing beliefs,
each with its null, P(wrong) x impact rank, cheapest disproof, evidence rung, cost
and pre-committed kill signal; the data-rights belief ranks top at 20/25 and is
shot at first; one of the fellow's proposed tests is caught as a confirmation test
and rewritten.

## Related skills

Absorbs the useful bones of `identify-assumptions-new` and
`identify-assumptions-existing` — multi-perspective surfacing of beliefs (PM /
designer / engineer) and a per-item test — and beats them: those skills stop at
listing assumptions, rating confidence, and "suggesting a test" that is usually a
confirmation test with no ranking. This skill converts that soft inventory into
falsifiable nulls, forbids confirmation tests, forces a pre-committed kill signal,
and ranks by P(wrong) x impact so the fellow knows what to test first.
`identify-assumptions-new` is already superseded by `problem-quality-scorecard`;
this skill does not re-supersede it, it takes its bones.

Composes with: `problem-quality-scorecard` — run the scorecard first to gate the
problem; its opinion-capped dimensions and the plan's load-bearing beliefs are the
exact inputs to this skill's disproof table, and this skill supplies the rigour
behind the scorecard's "cheapest test to raise it" column. Hand a unit-economics
belief ("does the physics floor leave margin") to `physics-floor-gap`, a sizing
belief to `bottoms-up-quantification`, and a workflow-cost belief to
`current-state-map`. Not `pre-mortem`: that narrates failure; this designs the one
observation that disproves a named belief and ranks it.
