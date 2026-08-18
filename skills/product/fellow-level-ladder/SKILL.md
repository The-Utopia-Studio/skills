---
name: fellow-level-ladder
description: >-
  Assess where ONE fellow sits on the Icarus ladder — Literate → Practitioner →
  Operator → Frontier → Author — by checking which EXIT ARTEFACT each level
  requires actually EXISTS and can be cited, never by how ready the fellow feels.
  Fires on "how's this fellow doing", "assess a fellow", "what level am I / is
  this fellow at", "am I ready to level up", "level up this fellow". Output is a
  filled level assessment: the ladder table with a cited artefact and evidence
  rung per rung, the assigned level (highest level with an unbroken artefact
  chain beneath it), and the single next exit artefact to produce plus the skill
  that produces it. Self-assessment on feelings / confidence / tenure is banned
  and scored 0.1. NOT the build-vs-buy boundary of what Daedalus gives the fellow
  (use platform-vs-venture, sibling in section 10 — this reads that map only for
  the Author rung), NOT where a fellow should START or which stages fit their
  type (use fellow-path-router, section 00), NOT re-running an artefact's own
  gate (problem-quality-scorecard / pilot-six-term-sheet / evidence-ladder — this
  cites their verdicts, it does not re-derive them).
type: interactive
supersedes: none
---

## What it does

Places one fellow on a five-rung ladder and returns the one artefact that moves
them up. It does not grade competence, confidence, or months served. For each
level — Literate, Practitioner, Operator, Frontier, Author — it asks a single
binary question: does the level's exit artefact EXIST, right now, and can the
fellow cite it? The assigned level is the highest rung with an unbroken chain of
existing exit artefacts beneath it. The output is the filled `template.md`: the
ladder table with a cited artefact and its evidence rung on every row, the
assigned level, a banned-signal check that strips out every feeling offered as
proof, and the next exit artefact with the shipped skill that produces it. A
fellow who feels like an Operator but holds no signed pilot is a Practitioner
with a story.

## The Icarus reframe

A career ladder is normally a competency matrix graded on confidence and a
mentor's gut. This ladder is the evidence ladder pointed at the fellow instead of
the idea. Each rung is held only by an artefact that already exists and clears a
strictly higher evidence rung than the rung below it: Literate is a passed
problem-quality-scorecard (an artefact, 0.5); Practitioner is a behaviour signal
a probe actually produced (0.7); Operator is a signed paid pilot (money, 1.0);
Frontier is a launched product proven to learn in production (0.7 compounding);
Author is a defensible moat others build on (money, durable). You do not *reach* a
level by being ready for it. You *hold* a level because the artefact exists. The
only move up the ladder is to produce the next artefact — an argument for the
level, however sincere, is opinion, and opinion is 0.1 on every rung.

## When to use / When NOT

Use it to assess where one named fellow sits and what one artefact unlocks their
next rung. Trigger phrases: "how's this fellow doing", "assess a fellow", "what
level am I / is this fellow at", "am I ready to level up", "level up this fellow".

Do not use it for these — hand off instead:

| If the fellow wants… | Use instead |
|---|---|
| The line between what Daedalus builds once and what the fellow owns (build vs buy, "what does the platform give me") | `platform-vs-venture` (sibling, section 10). This skill *reads* that map only to test the Author rung; it does not draw the boundary. |
| Where to START / which Icarus stages apply to their type (blank page vs traction vs mature product) | `fellow-path-router` (section 00). It classifies and routes the flow; this grades progression against exit artefacts. |
| To score the problem / check the pilot is real / weight a discovery signal | the artefact's own skill: `problem-quality-scorecard`, `pilot-six-term-sheet`, `evidence-ladder`. This skill cites their verdicts; it never re-derives them. |

Do not assess a fellow from a description of how far along they are. If no
artefacts can be cited, the input is not ready; run Step 1 and ask for the
citations, or return the honest verdict of *pre-Literate, no artefact on file*.
Never invent an artefact, a score, or a signature to fill a rung.

## Method

Fill in `template.md`. Five steps. The whole method rests on one rule: a rung is
held only by a citation, never by a claim.

### Step 1 — Name the fellow and quarantine the claim

State the fellow, the domain, and the level they (or their mentor) *claim*. The
claim is an input to be disproven, not evidence. Write it in the claim box and do
not let it touch the ladder. If the request is a bare "how's my fellow doing" with
no artefacts attached, the one unblocking ask is: *which of the five exit
artefacts exist, and where can I see each one?* Do not proceed on a narrative.

### Step 2 — Walk the five rungs, cite or fail each

For each level, find the exit artefact, cite it (name + path/link + date), and
score the rung the cited artefact actually clears. A rung is HELD only if the
artefact **exists** and **clears its required rung**. Missing artefact, or an
artefact that only reaches a lower rung, is NOT HELD.

| Level | Exit artefact that must EXIST | Produced by | Rung it must clear | Held when… |
|---|---|---|---|---|
| **Literate** | a **passed** problem-quality-scorecard (verdict PASS, ≥ 32/40) | `problem-quality-scorecard` (01) | artefact 0.5 | the fellow has framed a problem to first principles and cleared the go/no-go gate |
| **Practitioner** | an evidence-ladder table whose load-bearing claim sits at **behaviour 0.7 or higher**, produced by a probe the fellow actually ran | `probe-matrix` (04) + `evidence-ladder` (02) | behaviour 0.7 | a real user *did* something; a claim moved up the ladder by observation, not enthusiasm |
| **Operator** | a **signed** pilot-six-term-sheet, 6/6 terms non-empty, price > 0 that moves | `pilot-six-term-sheet` (07) | money 1.0 | a validated problem converted into a paying customer commitment |
| **Frontier** | a v1-launch-bar **GO** (both gates green on tape) AND a refine-flywheel cadence doc with ≥ 1 autonomy promotion logged **as a scored eval result** | `v1-launch-bar` (07) + `refine-flywheel` (08) | behaviour 0.7, compounding in production | a shipped product provably learns from corrections and raised its own autonomy by eval, not by feel |
| **Author** | a moat-design-canvas with the **data-advantage gate cleared** (through-it signal logged) AND a platform-vs-venture map placing a specific **owned, reused** asset on the venture side | `moat-design-canvas` (06) + `platform-vs-venture` (10) | money 1.0, durable | the fellow authored defensible IP that compounds and that others build on |

Tag every citation `[Fact]` (you can see the artefact), `[Assumption]` (you were
told it exists but cannot see it), or `[Hypothesis]` (it is planned). Only `[Fact]`
counts toward a held rung.

### Step 3 — Apply the contiguity rule (no skipping)

The ladder is monotone. The assigned level is the **highest level with an
unbroken chain of existing exit artefacts beneath it.** A gap caps the fellow at
the last held rung before the gap — even if a higher artefact exists.

| Pattern | Assigned level | Why |
|---|---|---|
| Literate ✓, Practitioner ✓, Operator ✗ | Practitioner | last unbroken rung |
| Literate ✗, Practitioner ✗, Operator ✓ (signed pilot, no passed scorecard) | **pre-Literate** | the chain is broken at the bottom; money on an unframed problem is a red flag, not a promotion |
| all five ✓ | Author | full chain |

A higher artefact sitting above a gap does not raise the level. It becomes the
evidence that a lower artefact must be **backfilled** — name that missing lower
artefact as the immediate next step.

### Step 4 — Banned-signal check

List everything offered as proof that is not an artefact: "feels ready", "has been
at it six months", "the team believes in them", "very confident", "clearly talented".
Score each 0.1 (opinion) and mark it EXCLUDED. Then state, in one line, which held
rung — if any — each banned signal was standing in for, and which artefact would
replace it. Confidence never votes.

### Step 5 — Assign the level and name the ONE next artefact

Return: the assigned level and the single artefact that proves it; then the one
exit artefact the fellow must produce next — either the next rung's artefact, or,
if there is a gap, the missing lower artefact to backfill first. Name the shipped
skill that produces it and the rung it will clear. One artefact, not a plan. The
next rung is a thing that will exist, or it is not the next rung.

## Evidence standard

A level is held only by an artefact that clears its rung on the evidence ladder
(money 1.0 → behaviour 0.7 → artefact 0.5 → verbal commitment 0.3 → opinion 0.1).
Feelings, confidence, and tenure are opinion (0.1) and can hold no rung. A verbal
LOI or a "they promised to sign" is commitment (0.3) and does **not** hold Operator
— Operator needs money that moved. The bar rises every rung: an artefact that once
existed but is no longer true (a pilot signed on a wedge since abandoned) has
decayed below its rung and stops holding the level until re-validated.

## Gotchas

- **Claimed level is not held level.** Fellows and mentors will state a level with
  conviction. Treat it as a hypothesis to disprove. The only thing that raises the
  assigned level is a citation, so never grade up on how sure anyone sounds.
- **The gap trap.** A fellow can hold a higher artefact while missing a lower one —
  a signed pilot with no passed problem-quality-scorecard on file. Contiguity caps
  them at the gap. Money on a problem that was never framed to first principles is a
  flag to backfill, not a leap to Operator. Name the missing lower artefact as the
  next step.
- **Stale artefact.** An exit artefact that was produced once but whose inputs have
  changed no longer holds the rung. Check the artefact is still true today, not just
  that it was generated. A passed scorecard for a problem the fellow has since
  pivoted away from holds nothing.
- **Author inflation.** "I built a slick internal tool" is not Author. Author needs
  the asset on the **venture** side of platform-vs-venture (owned, a moat) and
  reused by others. A primitive Daedalus builds once for every fellow — router, eval
  harness, RAG, guardrails — is not the fellow's moat, however much they built of it.
- **Don't over-drama the low rungs.** A fellow with only a passed scorecard is a
  clean Literate, not "behind". State the level calmly and name the next artefact.
  The ladder measures artefacts, not worth.

## Examples

`examples/sample.md` — Mentix (industrial AI) claims Operator on six months and a
strong feeling; holds a passed scorecard and a 0.7 Wizard-of-Oz behaviour signal
but only a verbal LOI, so is assigned Practitioner, with the signed
pilot-six-term-sheet named as the next exit artefact.

## Related skills

- `platform-vs-venture` (section 10, sibling) — draws the build-vs-buy boundary
  this skill reads to test the Author rung. Compose them: assess the fellow here,
  and when Author is the open question, run platform-vs-venture to check the moat
  asset is actually owned.
- `fellow-path-router` (section 00) — routes a fellow to their starting stages by
  type; this grades where they have got to. Path-router at intake, level-ladder at
  review.
- `problem-quality-scorecard` (01), `probe-matrix` (04) + `evidence-ladder` (02),
  `pilot-six-term-sheet` (07), `v1-launch-bar` (07) + `refine-flywheel` (08),
  `moat-design-canvas` (06) — the skills that *produce* the five exit artefacts.
  This ladder cites their outputs; it never re-runs their gates.
- Supersedes nothing. There is no generic "founder maturity model" to beat; the
  proprietary move is binding each rung to an existing artefact and a rising
  evidence rung, which a competency matrix cannot do.
