---
name: so-what-stress-test
description: >-
  Fires when a fellow wants a whole idea pressure-tested fast across five business
  questions — "is this worth doing", "pressure-test this", "poke holes in this",
  "stress test my idea", "so what?". Runs So what / Who pays / What's the wedge /
  What's the moat / What kills it, then returns a per-question verdict table and an
  overall Pass / Redesign / Kill, refusing to pass any question answered on opinion.
  Do NOT fire to score a problem on the 8-dimension gate (use problem-quality-scorecard),
  for the 5-lens adversarial teardown that ends in one probe (use concept-council), or
  to deep-dive only the wedge (use wedge-five-questions).
type: interactive
supersedes: none
---

# So-What Stress Test

## What it does

Compresses "should this exist?" into five business questions and one verdict. The
fellow gives a one-liner and their best answer to each question. The skill grades
each answer on the evidence ladder, then returns Pass, Redesign, or Kill. A Redesign
comes with a concrete rewrite that fixes the weakest question. It is a fast whole-idea
gate, not a deep-dive: five minutes, one table, a decision.

## The Icarus reframe

The generic version asks the five questions and accepts the answers. This one refuses
to. Every question demands a money-or-behaviour answer; "users will love it", "it's a
huge market", "no one else does this" are graded as a fail on that question, not as a
soft pass. A single question cleared only on opinion downgrades the whole idea to
Redesign, and the skill must produce the rewrite rather than hand back a shrug. It
treats "so what" as a materiality test with a number, and "what kills it" as a question
the fellow must be able to answer — denial ("nothing kills it") is the loudest tell.

## When to use / When NOT

Use when: a one-liner needs a fast whole-idea gate before more work goes in; the fellow
asks to poke holes, pressure-test, or justify why an idea is worth doing; a concept has
survived early excitement and now needs a money check across all five fronts.

| Not this skill | Use instead | Why |
|---|---|---|
| "Score this problem on all 8 dimensions" | `problem-quality-scorecard` | That is a numeric problem gate; this scores the whole idea across five business questions, not one 8-axis problem. |
| "Run the council / give me the five-lens teardown" | `concept-council` | That is a multi-lens adversarial reading ending in one probe; this returns a five-question table and a Pass/Redesign/Kill. |
| "Pressure-test just my wedge" | `wedge-five-questions` | That deep-dives the wedge alone against five pass thresholds; here the wedge is one row of five. |

If the input is a bare one-liner with no answers, do not run the five on air. Ask the
one question that unblocks it, or return the smallest honest next step. Invent nothing.

## Method

Copy this checklist:

```
So-What Stress Test progress:
- [ ] Step 1: Restate the one-liner in the fellow's words
- [ ] Step 2: Collect the fellow's answer to each of the five questions
- [ ] Step 3: Grade each answer on the evidence ladder
- [ ] Step 4: Apply the verdict logic
- [ ] Step 5: If Redesign, write the rewrite that fixes the weakest question
- [ ] Step 6: Run the self-check (kill line) before returning
```

**Step 1–2.** Fill the five rows of [template.md](template.md). If the fellow left a
question blank, that row is graded on what is there, which is nothing — an opinion at
best.

**Step 3 — grade each row.** Score the answer on the evidence ladder, then map to a
grade.

| # | Question | What clears it (required evidence type) |
|---|---|---|
| 1 | So what? | A magnitude: money or hours saved per event, per unit, per period, tied to a countable event. Clears when someone already spends to avoid this pain. |
| 2 | Who pays? | A named role who signs the invoice, plus the budget line it comes from. The user is not the answer unless the user holds the budget. |
| 3 | What's the wedge? | The smallest action that forces adoption, plus the cost of not adopting. Clears when a design partner already runs it in a live workflow. |
| 4 | What's the moat? | One asset that compounds with use (proprietary data, switching cost, network), plus evidence it has started accruing. A plan to build a moat is opinion. |
| 5 | What kills it? | A named, credible killer, its earliest observable signal, and a mitigation that changes the odds. |

Grade bands:

| Grade | Q1–Q4 | Q5 (inverted) |
|---|---|---|
| pass | Evidence ≥ 0.7 — behaviour observed or money moved | Killer named, early signal defined, credible mitigation |
| weak | Evidence ≤ 0.5 — artefact, verbal commitment, or opinion only | No killer named (denial), or killer hand-waved with no mitigation path |
| fatal | (not applicable) | Credible killer, early signal already firing, no mitigation |

**Step 4 — verdict logic (apply in order):**

| Condition | Verdict |
|---|---|
| Any row graded `fatal` | **KILL** (overrides everything below) |
| All five rows `pass` | **PASS** |
| One or more `weak`, none `fatal` | **REDESIGN** |

**Step 5 — the rewrite (Redesign only).** Name the weakest question (the binding
constraint). When more than one row grades `weak`, the binding constraint is the
earliest-numbered weak question in the order So what → Who pays → Wedge → Moat → Kills
it, and the rewrite must fix that one first. Rewrite the one-liner so that question
would now grade `pass`. Change the idea, not the language. If the honest rewrite is
"this is a script, not a venture" or "this needs a different buyer", say that.

**Step 6 — self-check.** Run the kill line at the foot of [template.md](template.md)
before returning.

## Evidence standard

Money moved 1.0 → behaviour observed 0.7 → artefact shown 0.5 → verbal commitment 0.3
→ opinion 0.1. The pass bar for questions 1–4 is 0.7: only behaviour or money clears a
question. An artefact, a verbal "they said they'd buy", or an opinion caps the row at
`weak` and forces a Redesign. Tag every answer `[Fact]`, `[Assumption]`, or
`[Hypothesis]`. A probe exists to move an answer up the ladder; if it cannot be moved
above 0.1, the row fails. Never grade an opinion above 0.1, and never grade a question
`pass` on opinion evidence — that is the skill's own auto-fail.

## Gotchas

- **The user is not the payer.** "Factory managers love it" answers who uses, not who
  pays. Q2 fails until a budget-holding role is named. This is the most common Redesign
  trigger.
- **Denial on Q5 reads as a pass to the fellow and a fail to the skill.** "Nothing
  really kills it" is weak, not strong. Push until a credible killer is named; a founder
  who cannot name one has not looked.
- **A moat plan is not a moat.** "We'll accumulate data over time" is opinion (0.1). The
  moat row passes only if the compounding asset is already accruing from real usage.
- **Fatal overrides Pass.** Four strong rows and one unmitigated killer is a Kill, not a
  four-out-of-five Pass. Do not average the rows.
- **A one-liner with no answers is not a Redesign.** It is unanswered. Ask the one
  unblocking question instead of grading blanks.
- **Solution in disguise.** A pre-chosen solution ("we don't have a mobile app") is a
  feature, not a problem — it gives Q1 no countable event to grade. Name the trap,
  reframe to the job the feature would serve and its cost, then grade the job. Do not
  grade the feature.

## Examples

[examples/sample.md](examples/sample.md) — Azraq's data-centre incident-risk
subscription run through all five questions to a PASS, showing what money-and-behaviour
answers look like next to the opinion answers they replaced.

## Related skills

- `concept-council` — the multi-lens adversarial teardown. Run this first for a fast
  five-question gate; escalate to the council when the idea survives and needs a deeper
  read.
- `problem-quality-scorecard` — the 8-dimension problem gate. That interrogates one
  problem; this interrogates a whole idea's business case.
- `wedge-five-questions` — the wedge deep-dive. When this skill grades the wedge row
  `weak`, hand off there to rebuild it.
- Supersedes nothing. It is the entry gate to the Icarus concept-council stage.
