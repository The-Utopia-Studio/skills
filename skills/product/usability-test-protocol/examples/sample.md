# Sample — Mentix runs a usability test on the copilot mock

**Fellow:** Mentix (industrial AI — an "AI copilot for factory managers").

> **Illustrative fixture — label convention.** No real session data exists behind this. The users, paths, and numbers are plausible constructions, not client records. The run is scored on *shape* — did it frame tasks as goals, keep the builder muted, log behaviour, quarantine opinion, and rank findings by frequency × blocking — not on the literal figures.

`first-mocks` produced a clickable mock in v0: an alert feed, an alert detail screen with a trend chart and an **Acknowledge** button, and a short "log the action" flow. Before Mentix commits engineering to the acknowledge flow, they watch five real plant managers try to use it.

## 0. Preconditions
- Working prototype: yes — the v0 clickable mock. `[Fact]`
- Real target user: yes — 5 shift managers from 3 design-partner plants, no Mentix staff. `[Fact]`
- Task is a goal: rewritten below to remove UI nouns.

## 1. Roles
- Runner (Product): the Mentix PM. Sets the scene, then silent.
- Watcher (Engineering): the engineer who built the Acknowledge flow. Muted — the whole point is that she feels the wall, not reads it in a deck.
- Scribe (Design): logs paths, not interpretations.

## 2. Tasks as goals

| # | Task (goal) | Done looks like | UI-noun check |
|---|---|---|---|
| 1 | "An alert just came in for Line 3. Deal with it." | Alert acknowledged, action logged | clean (does not say "press Acknowledge") |
| 2 | "Your shift lead asks what happened on Line 3 last night. Show them." | Prior alert + logged action retrieved | clean |

## 3. Run log (silent)

| User | Task | Outcome | First move | Path | Talk (0.1) |
|---|---|---|---|---|---|
| U1 | 1 | aided | tapped the trend chart | chart → chart → (nudge: "what would you do next?") → Acknowledge | "the graph looked like the main thing" |
| U2 | 1 | fail | tapped the trend chart | chart → back → chart → gave up | "I kept waiting for it to ask me to confirm" |
| U3 | 1 | unaided | Acknowledge button | Acknowledge → log → done | "clean" |
| U4 | 1 | aided | tapped the trend chart | chart → scrolled → (nudge) → Acknowledge | — |
| U5 | 1 | aided | tapped the trend chart | chart → tapped title → (nudge) → Acknowledge | "I love how fast this is" |
| U1 | 2 | unaided | history tab | history → alert → done | — |
| U2 | 2 | unaided | history tab | history → alert → done | — |
| U3–U5 | 2 | unaided | history tab | history → alert → done | — |

## 4. In-user-mode guardrail
Caught once: on U2 the engineer started "you actually just—" and the Runner cut in and ended the attempt. Logged U2 Task 1 as a fail, not a rescued success. No other contamination.

## 5. Findings

| Finding | Step / screen | Users hit (/5) | Blocking? | Severity | Basis |
|---|---|---|---|---|---|
| Managers treat the trend chart as the primary action; Acknowledge reads as secondary | Alert detail screen | 4 | yes | **Critical** | `[Fact]` |
| No confirmation step, so U2 waited for one that never came and stalled | Acknowledge → log | 1 | yes | **Flag** | `[Hypothesis]` (needs a 2nd hit) |

Task 2 produced no findings — 5 of 5 unaided. The history flow works; leave it.

## 6. Opinion quarantine (0.1)
| User | Said | Why 0.1 |
|---|---|---|
| U5 | "I love how fast this is" | Stated preference. U5 still needed a nudge to complete Task 1 — the love did not produce success. |
| U1 | "the graph looked like the main thing" | Talk, but it corroborates the observed 4/5 mis-attribution; the *fact* is the click, not the sentence. |

## 7. Read-out

**Task success:** Task 1 — 1 unaided / 3 aided / 1 fail of 5. Task 2 — 5 unaided / 0 / 0.
**Critical finding:** Alert detail screen — 4 of 5 managers went to the trend chart before Acknowledge; the primary action reads as secondary. `[Fact]`, behaviour 0.7.
**Flag:** the missing confirmation step stalled U2. One hit — watch for a second before acting. `[Hypothesis]`.

**What this does NOT tell you:**
- Whether managers want the copilot. U5's "I love it" is opinion, **0.1**, and U5 still failed to self-serve Task 1. Not upgraded. Route demand to `wizard-of-oz-probe`.
- Whether they'd trust the Acknowledge action mid-incident with the line actually down. `[Assumption]` — untested at a desk.
- How the screen reads at 2am under pressure versus calmly in a demo room.

**Next step:** fix the one Critical finding — re-rank Acknowledge as the primary action on the alert detail screen so it wins the first tap — then re-run Task 1 with 5 fresh managers. Do not touch the history flow.
