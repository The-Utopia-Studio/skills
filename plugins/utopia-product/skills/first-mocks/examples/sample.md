# Clickable-Prototype Plan — Mentix (copilot shift-handover card)

**Fellow / venture:** Mentix — AI copilot for factory managers
**Date:** 2026-07-21

> Numbers below are illustrative test fixtures, clearly synthetic — not real plant
> data. Tagged so.

## Step 0 — The ONE thing the mock must provoke a reaction to

**The moment:** the copilot's shift-handover card — the single screen a plant
manager opens mid-shift that summarises what the outgoing shift flagged and what to
do next.

**The reaction I am hunting:** can a plant manager, cold, read the card and state
the one action to take on the flagged line — without anyone explaining it.

**Mock question or probe question?**
☑ Mock — this is comprehension / legibility of a recommendation moment. A mock can
answer it (ceiling 0.5). It is NOT "will plant managers pay for the copilot" —
that is a probe question and goes to `probe-matrix`. [Fact — from the definitions]

**Solution-in-disguise?** ☑ No. It names a moment and an unknown, not a feature to
justify.

## Steps 1–4 — Top band needed

**Top band needed:** 4 (clickable hybrid). **Why:** the fellow needs a manager to
*act* on the card, and acting means clicking the flagged line to see why and marking
it done or escalated — a static frame cannot show whether the path is followable.
Not higher: no backend is needed to test whether the card reads and the flow
follows. [Assumption — the unknown is legibility-of-flow, not data correctness]

### Step 1 — Crazy 8s

Eight frames of the handover card, 8 minutes:

1. dense table of every flagged parameter
2. one big number (overall plant risk) + drill-down
3. chat thread the copilot "narrates"
4. alert-first: the single worst item, full-bleed
5. checklist of handover items
6. timeline of the shift
7. map/plant-overlay of where the flags sit
8. one sentence ("Bearing 4 trending hot; hold the line change") + tap to expand

**# genuinely different directions:** 6 (frames 3 and 5 collapsed into 1; 6 and 7
were near-duplicates). ≥ 4 ✓
**The strange frame I kept:** #8 — one sentence + expand. It was not the first
instinct (that was the dense table, #1), and it is the one that forces the copilot
to commit to a single recommendation instead of dumping state. [Hypothesis]
☑ Did NOT skip to the dense table I already had in mind.

### Step 2 — Converge to one flow

**Through-line:** #8's single-recommendation card, because the reaction we are
hunting is "state the one action," and a card that shows one action tests that
directly. The dense table tests reading stamina, not decision legibility.
**Flow:** open app → handover card (one flagged line, plain sentence) → tap the
line → "why" panel (the trend + the rule it touches) → mark **Done** or **Escalate**.

### Step 3 — Digital mock (no code)

**Frames:** 4 static Figma frames — card, expanded "why" panel, Done confirmation,
Escalate confirmation.
☑ Did not open a code editor. These frames are disposable.

### Step 4 — Clickable hybrid

**Tool:** ☑ v0
**What is real (clickable):** the one flow — card → tap line → why → Done/Escalate.
**What is faked:** the flagged item ("Bearing 4, 78 °C, trending +3 °C/hr"), the
handover history, any auth. All illustrative, no live plant feed. [Assumption —
synthetic fixture data, not from any plant]
**Built in:** ~3.5 hours ☑ ≤ one afternoon.

## Step 5 — Route the visual craft OUT

**UX/UI plan → :** ☑ `shape` — to plan the card's information hierarchy and the
expand interaction properly before any polish.
**Distinctive UI build → :** ☑ `impeccable` — to build a non-generic card UI (a
control-room product should not look like a default SaaS dashboard).
☑ This plan contains NO colour / type / layout advice of its own. The v0 hybrid uses
whatever defaults it ships with; the look is `impeccable`'s job, not first-mocks'.
[Fact — routing, not restating, is the rule]

## Step 6 — Hand to the reaction (pre-registered)

Set before any manager sees it.

| | |
|---|---|
| **Hand off to:** | ☑ `usability-test-protocol` — watch 3 plant managers |
| **Reaction that = pass (behaviour):** | shown the card cold, the manager states the correct next action (hold the line change) and reaches it via Done/Escalate, unprompted |
| **Threshold + sample:** | 4 of 5 trials across 3 managers, next action stated in < 20 s [Hypothesis — threshold set pre-test, not a measured result] |
| **A pass moves the claim to rung:** | 0.7 (behaviour — comprehension under a real task) |
| **What I will NOT count as a pass:** | "the card looks clear" / "I'd use this" (verbal, 0.3) |

**Evidence log:** the v0 clickable hybrid = **artefact shown, 0.5**. Mentix may not
claim managers understand the card until `usability-test-protocol` returns the
behaviour read-out. The mock's whole value was making that test possible in an
afternoon instead of after a build. [Fact]

## What a generic prototyping answer would have missed

- It would have offered a fidelity ladder and let Mentix pick "clickable" by taste,
  not because the reaction (act on the line) requires clicking.
- It would not have banned code, so "just build a quick React version" would have
  slipped through — and Mentix would now be defending a half-app.
- It would have described how to style the card; first-mocks routes that to
  `impeccable` and keeps its own hands off the pixels.
- It would have let "the prototype looked great" stand as progress; here the mock is
  logged at 0.5 and nothing above it is claimed until a manager acts.
