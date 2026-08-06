---
name: problem-quality-scorecard
description: >-
  Numeric go/no-go gate that scores ONE product problem 1-5 on eight
  evidence-backed dimensions (frequency, budgeted pain, severity, data exhaust,
  structural persistence, buyer clarity, wedge sharpness, founder asymmetry),
  sums to /40, and returns pass (>=32) / redesign (28-31) / kill (<28). Fires on
  "should I build this", "score this problem", "go or no-go", "is this problem
  good enough", "rate this problem". Output is a filled 8-row scorecard with a
  money-or-behaviour citation on every row. NOT for broad risk mapping across
  GTM/strategy/team (use identify-assumptions-new), NOT the five qualitative
  whole-idea questions (so-what-stress-test), NOT the per-unit size ratio
  (physics-floor-gap), NOT the wedge-only deep dive (wedge-five-questions).
type: generator
supersedes: skills/discovery/identify-assumptions-new
---

## What it does

Compresses "should we build this?" into one number and one verdict. It scores a
single, named problem on eight dimensions, forces a money-or-behaviour citation
behind each score, sums to /40, and returns a gate: build, redesign the wedge, or
kill. It is the go/no-go at the top of the Icarus funnel — nothing downstream
(wedge, prototype, PRD) should start until a problem clears this gate.

## The Icarus reframe

Most problem-scoring rates a problem on how good it *feels*. This inverts that:
the evidence you hold sets a hard ceiling on the score a dimension can earn.
Money-moved evidence lets a dimension reach 5; behaviour observed caps it at 4;
an artefact at 3; a verbal "yes" at 2; opinion at 1. The only way to raise a
score is to move a claim up the evidence ladder, not to argue for it. The eight
dimensions are chosen so a high total can only come from a problem that recurs
often, already has money bleeding against it, and hands *this* founder a moat —
not from a clever pitch. The result is a gate, not a vibe: 32/40 or you do not
build.

## When to use / When NOT

Use it when a fellow has ONE problem in hand and needs a build/no-build decision
backed by evidence.

Do not use it for these — hand off instead:

| If the fellow wants… | Use instead |
|---|---|
| Every risky assumption mapped across value, GTM, strategy, team | `identify-assumptions-new` (the skill this supersedes) — a risk inventory, not a gate |
| The five qualitative whole-idea business questions | `so-what-stress-test` |
| The per-unit size ratio / does the physics floor leave margin | `physics-floor-gap` |
| A deep dive on the wedge alone | `wedge-five-questions` |
| To turn a solution back into a problem before scoring | `problem-statement`, then return here |

This skill scores one problem on eight axes and gates it. It is not a risk map
and not a single-axis deep dive.

## Method

Fill in `template.md`. Five steps.

**Step 1 — State the one problem in one sentence.** It must name a pain, not a
feature. If it names a feature ("we need an AI copilot"), stop: you would score
the feature, not the pain. Reframe with `problem-statement` first, then return.

**Step 2 — For each of the 8 dimensions, write the evidence you actually hold and
tag its rung.** No evidence means opinion. A verified *absence* of money (you
checked, there is no budget line) is behaviour-grade evidence for a low score —
it is not an opinion cap. A dimension the fellow simply never mentioned is
**unexamined**: default it to opinion-grade (ceiling 1, flag it) and count it toward
the "3+ opinion-only" trigger in Step 5 — do not confuse it with a verified-low. An
unexamined dimension only escapes the opinion cap if the fellow asserted a verified
absence.

**Step 3 — Apply the evidence ceiling.** The rung of your best evidence caps the
score, regardless of how strong the pain feels:

| Best evidence you hold | Ladder weight | Max score this dimension can earn |
|---|---|---|
| Money moved (invoice, PO, spend, headcount redirected) | 1.0 | 5 |
| Behaviour observed (logs, usage, a repeated action) | 0.7 | 4 |
| Artefact shown (a doc, a spreadsheet, a workaround they built) | 0.5 | 3 |
| Verbal commitment ("yes, I'd pay / I'd switch") | 0.3 | 2 |
| Opinion only ("I think", "surely", "everyone knows") | 0.1 | 1 (flag it) |

`score = min(substance anchor, evidence ceiling)`. Flag any dimension where the
ceiling, not the substance, set the score.

**Step 4 — Score each dimension against its 1-vs-5 anchor.**

| Dimension | What it measures | Looks like 1 | Looks like 5 |
|---|---|---|---|
| Frequency | How often the target actually hits the pain | Once a year or less | Multiple times per shift/day, unprompted |
| Budgeted pain | Money already spent against it today | No spend; "would be nice" | A live line item / salary / vendor invoice you can redirect |
| Severity | Cost of one unresolved instance | Mild annoyance, no measurable cost | Six-figure loss, shutdown, injury, or fine per instance |
| Data exhaust | Proprietary data normal use throws off | None, or data anyone can buy/scrape | Each use logs hard-to-replicate data that compounds into a moat |
| Structural persistence | Will it still exist and matter in 3-5 years | Transient: a fad, a subsidy, one repealable rule | Rooted in physics, unit economics, or durable regulation |
| Buyer clarity | One reachable person with budget who says yes | No clear buyer; committee; "the market" | A named role you can reach, with budget, who has bought comparables |
| Wedge sharpness | A narrow first slice you can own completely | Broad, undifferentiated "platform for X" | One painful task, one segment, where you can be unambiguously best |
| Founder asymmetry | THIS fellow's unfair, hard-to-copy edge | None; anyone could do this | Proprietary access / data rights / distribution / lived domain scar tissue |

Add a confidence and a cheapest-test-to-raise to each row (see template). Confidence:
High = two-plus independent money/behaviour data points; Med = one artefact or one
behaviour source; Low = verbal only; capped rows = n/a, flagged.

**Step 5 — Sum and gate.** Apply this precedence, top to bottom:

| Condition | Verdict |
|---|---|
| 3 or more dimensions are opinion-only | NOT READY TO SCORE — emit no total; list the cheapest test per capped dimension |
| Total < 28 | KILL |
| Total 28-31 | REDESIGN the wedge within two weeks, then re-score |
| Total >= 32 with 1-2 opinion-capped dimensions | REDESIGN — the number is real but rests on air; get the evidence, re-score |
| Total >= 32 and zero opinion caps | PASS — build |

**Band-edge tie-break.** When the total lands within ±1 of a band edge (27-28 at the
KILL/REDESIGN seam, 31-32 at the REDESIGN/PASS seam) AND any dimension is
opinion-capped, resolve DOWN to the stricter verdict, and name the two cheapest tests
that would move the capped dimensions up and lift the total clear of the seam.

Write the verdict with the reason: name the binding low scores, not just the total.

## Evidence standard

Behaviour and money outrank opinion, enforced structurally by the ceiling in
Step 3. A PASS requires all eight dimensions resting on verbal-or-higher evidence
and a total of 32+. Opinion never scores above 1, and a problem carrying three or
more opinion-only dimensions is returned as "not ready to score" with the tests
that would fix that — it is never passed on partial evidence. Tag every empirical
claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. If you catch yourself typing
"obviously" or "clearly", you are at rung 0.1: that dimension caps at 1.

## Gotchas

- **Frequency inflation.** Scoring how often the pain *could* occur, not how
  often it is *observed* to. Cap frequency by logs, ticket counts, or timestamps,
  never by intuition.
- **Wish in the money column.** "They said they'd pay" is verbal (ceiling 2), not
  money (ceiling 5). Budgeted pain measures money spent *today*, not money
  promised. Keep the two rungs apart or the whole card inflates.
- **Wedge / founder double-count.** When the founder's unfair asset *is* the
  wedge, do not bank it twice. Founder asymmetry is the advantage; wedge sharpness
  is the narrow first slice. Score each on its own evidence.
- **Scoring a solution.** If the "problem" is a pre-chosen feature, every row
  scores the feature's appeal, not the pain's size. Reframe before scoring.
- **Verified-low is not opinion.** A dimension scored 1 because you checked and
  there is genuinely no spend / no data / no edge is honest behaviour-grade
  evidence, scored with High confidence. Do not flag it as an opinion cap.

## Examples

`examples/sample.md` — a worked Barrier Intelligence scorecard: eight rows, each
with its evidence rung and cheapest test, total 34/40, gate PASS with the two
soft spots named as the two-week priorities.

## Related skills

Supersedes `identify-assumptions-new`. That skill lists risky assumptions across
eight categories and asks you to "rate confidence and suggest a test" — a soft
inventory that never gates and never enforces evidence, so an opinion can sit in
it unchallenged and the fellow still gets no go/no-go. This skill keeps its two
useful bones (per-item confidence, per-item cheapest test) and converts them into
a hard numeric gate with evidence ceilings: opinion caps at 1, a pass is
impossible on opinion, and the output is a decision, not a list.

Composes with: `physics-floor-gap` (its unit ratio feeds severity and structural
persistence), `wedge-five-questions` (run it when wedge sharpness is the binding
low score), `so-what-stress-test` (qualitative whole-idea pass before or after
this gate), `problem-statement` (reframe a solution-in-disguise before scoring).
Hand broad risk mapping back to `identify-assumptions-new`.
