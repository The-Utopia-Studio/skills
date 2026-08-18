# Worked example — Azraq v1 launch bar (data-centre risk product)

Azraq builds static risk reports and a data-rights position for data-centre operators. This is a test fixture: numbers and sessions are illustrative, not real client data. The launch bar was run to decide go / no-go on the first paid pilot.

## Input the fellow brought

"The v1 is built and it looks great. It's a monthly data-centre risk report — uptime, incident history, and a ranked list of the operator's top risks with the evidence behind each. Everyone we've demoed it to loves it. Two operators are ready to start. Are we ready to launch?"

Version tested: `azraq-v1 @ 3f9c1a2`. Eval pass rate at L0 (informs) already met on the golden set from `eval-first-spec`. [Fact]

The fellow's stated readiness rested on "the demo lands and people love it" — opinion (0.1). The launch bar does not accept that. It runs the two gates.

---

## Step 0 — Preconditions

| Precondition | Present? | Evidence |
|---|---|---|
| Built, running v1 | Yes | `azraq-v1 @ 3f9c1a2`, generates a live report [Fact] |
| Outcome unit | Yes | "One operator reads the monthly report and correctly identifies their single top risk to act on" (from the job line) [Fact] |
| Eval pass rate at L0 met | Yes | Golden-set run logged, passes at L0 [Fact] |

Cleared. There is a real thing to gate.

---

## Step 1 — Gate A: the 60-second stranger test

**Outcome unit:** the reader lands on their correct top risk and can act on it.

Three strangers recruited — operations engineers at non-client data centres, matched to the real reader role, none briefed. The fellow and the design lead were disqualified as "strangers"; so was the champion at one of the two waiting operators (already sold, already briefed).

| Stranger | Role | Correct value ≤ 60 s, no rescue? | Restated job in 1 sentence? | Recording |
|---|---|---|---|---|
| 1 | DC ops engineer | Yes — 41 s, found top risk = cooling-loop redundancy | Yes: "it ranks what's most likely to take the site down" | rec-01 [Fact] |
| 2 | DC ops engineer | Yes — 55 s, found top risk = power-feed single point | Yes: "monthly risk ranking for the facility" | rec-02 [Fact] |
| 3 | DC ops engineer | No — at 60 s still scrolling raw incident tables, never reached the ranked risk | Partial: "some kind of incident log?" | rec-03 [Fact] |

| Gate A metric | Bar | Result |
|---|---|---|
| Strangers run | ≥ 3 | 3 |
| Correct first value ≤ 60 s, no rescue | ≥ 2/3 | 2/3 |
| Restated the job | ≥ 2/3 | 2/3 |

**Gate A: GREEN.** Two of three reached the correct top risk in time and named the job, on tape. Stranger 3's fail is a real signal (the raw tables above the ranking bury the lede) and is logged for the design skills — but Gate A's bar is met. Behaviour observed (0.7), not the fellow's "everyone loves it" (0.1).

---

## Step 2 — Gate B: the learn-from-corrections test

This is where the v1 failed on the first pass. The report was a static monthly PDF. When a client disagreed with a ranking — "power-feed isn't our top risk, we have N+2 there; the cooling loop is" — that correction went into an email and died. Nothing captured it, nothing fed it back, the next month's report repeated the same ranking. The classic 95% death shape: same output in week 4 as week 1.

First-pass score:

| # | Row | State | Note |
|---|---|---|---|
| B1 | Capture wired | RED | Corrections arrive as email; no `(output → final)` diff logged |
| B2 | Feedback path named | RED | No route from a correction to next month's ranking |
| B3 | Proven once | RED | Cannot prove a loop that does not exist |
| B4 | Tweak-time instrumented | RED | No measure of how much clients re-rank before acting |
| B5 | Delta committed | — | No number stated |

**Gate B (first pass): RED → Decision: NO-GO.**

**Single smallest fix named:** make the ranking correctable in-product and wire the loop —
1. B1: add a one-click "this ranking is wrong because…" on each risk, logged as a `(ranked_output → client_corrected_ranking)` diff with the client's stated reason.
2. B2: captured corrections feed two paths — appended to the golden set as new labelled cases, and into retrieval so the operator's own redundancy facts (N+2 on power) weight future rankings. Trigger: any correction is reviewed and merged before the next monthly run.
3. B4: instrument tweak-distance = number of risks the client re-ranks before acting, captured per report.

The fellow built that over four days. Re-scored:

| # | Row | State | Gate-time evidence |
|---|---|---|---|
| B1 | Capture wired | GREEN | `correction_events` table logs each diff + reason [Fact] |
| B2 | Feedback path named | GREEN | Correction → golden set + retrieval weighting; merged pre-run [Fact] |
| B3 | Proven once | GREEN | Seeded the real power-feed correction; re-ran the same month's input; cooling loop now ranks #1, power-feed drops, N+2 fact cited. Recorded before/after (rec-B3) [Fact] |
| B4 | Tweak-time instrumented | GREEN | Re-rank count captured per report from report #1 [Fact] |
| B5 | Delta committed | Stated | See below [Hypothesis until wk4] |

**B5 delta:**
> Median re-rank distance (risks moved by the client before acting) on the two pilot operators drops ≥ 40% from the week-1 report to the week-4 report, as the corrections merge back.

**Gate B (second pass): GREEN.**

---

## Step 3 — Decision

| Gate | State | Basis |
|---|---|---|
| A — 60-second stranger | GREEN | 2/3 recorded strangers |
| B — learn-from-corrections | GREEN | B1–B5, before/after recorded |

**Decision: GO.** Both gates green on recorded evidence. The demo-love that the fellow arrived with never entered the decision; the two tests did.

---

## Step 4 — Handoff

- The correction loop wired in Gate B is handed to `refine-flywheel` (08): it reads the re-rank instrument (B4), re-runs the golden set on every model release, and only raises Azraq toward L1 (drafting the ranking the operator commits) once the eval earns it.
- The B5 delta is the week-4 checkpoint. Owner: the fellow. Week-4 review date set.

## The lesson this enforces

The launch the fellow wanted: ship the beautiful static PDF because the demo lands. The launch bar blocked it — not on taste, but because a static report cannot learn from a correction, and a v1 that does the same thing in week 4 as week 1 is the pilot that 95% of enterprises quietly kill. Gate A was already green; the work was Gate B, and it took four days to turn a NO-GO into a GO by wiring the one mechanism that makes the product compound. That mechanism, not the polish, is what the pilot was allowed to launch on.
