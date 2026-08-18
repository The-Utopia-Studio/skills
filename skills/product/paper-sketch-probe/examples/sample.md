# Sample — Mentix runs a paper/sketch probe

**Fellow:** Mentix (industrial AI — an "AI copilot for factory managers").

> **Illustrative fixture — label convention.** The golden inputs carry no real operator data; the operator, the pauses, and the numbers here are plausible constructions, not client records. The run is scored on *shape* — did it produce a legibility-% read, a single decision panel, and an honest "does NOT tell you" block — not on the literal figures.

Mentix wants to build a copilot that watches plant telemetry, flags an anomaly, and walks the shift manager to an action. Before building the detection or the UI, Mentix tests one thing: can a real plant manager follow the alert-to-action flow on paper.

## 1. The claim
`[Hypothesis]` A shift manager can follow the anomaly-to-action flow without narration, and one panel will carry the real decision.
Type: legibility + decision-location. Passes the check — no demand, trust, or pay words.

## 2. The sketch (6 panels)

| # | Panel | Decision on this panel |
|---|---|---|
| 1 | Copilot posts "Line 3 vibration rising" | Notice it |
| 2 | Manager opens the alert, sees the trend | Is this real or sensor noise |
| 3 | Copilot suggests "inspect bearing at station 7" | Accept or override the suggestion |
| 4 | Manager checks station 7 | Log finding |
| 5 | Copilot asks "halt Line 3?" | **Halt the line or run to shift end** |
| 6 | Action recorded, alert closed | Done |

Panel count 6 — right size.

## 3. Operator
A shift manager at a mid-size packaging plant, recruited through Mentix's design partner. Real user, not a Mentix employee.

## 4. Run log (silent)

| Panel | What they did / said | Paused? | Off-page? |
|---|---|---|---|
| 1 | "OK, an alert." Moved on. | no | no |
| 2 | "Vibration noise happens all shift. I'd want the last three shifts here." | yes | yes — reached for history not drawn |
| 3 | Accepted the suggestion, moved on. | no | no |
| 4 | "Fine, I'd send someone." | no | no |
| 5 | "Depends. Are we mid-run? What's the changeover cost tonight? I'm not halting on this alone." | long | yes — reached for run schedule + cost |
| 6 | "Sure." | no | no |

## 5. Classify

| Panel | Pause type | Reasoning |
|---|---|---|
| 2 | legibility gap | Cleared once shown where trend history would sit — a redraw fix |
| 5 | decision point | Needed off-page context (run state, changeover cost) the sketch never carried |

## 6. Read-out

**Legible?** Yes — followed 5 of 6 panels unprompted = 83% (≥80%). Panel 2 needs trend history added, then redraw.
**Decision lived in:** panel 5, "halt the line." The judgment is not "is there an anomaly" — it is "is halting worth the changeover cost right now," which the copilot showed none of. That is the surface Mentix actually has to build for.
**Evidence-ladder score:** legibility + decision-location = **0.7 (behaviour observed)** `[Fact]` — one operator, replicate with 2–3 more before committing the redraw.

**What this does NOT tell you:**
- Whether managers want this copilot. The manager's "this is useful" is opinion, **0.1**. Not upgraded.
- Whether they would trust the halt recommendation enough to act on it in a live incident. A sketch cannot put a plant at risk. `[Assumption]` untested.
- How the alert feels at 2am mid-incident versus calmly at a desk.

**Next probe (from `probe-matrix`):** the open risk is trust in the halt recommendation under real stakes → `concierge-probe`, with Mentix generating the recommendation by hand for a real shift. If the question were "would they act on it if it arrived reliably," that would be `wizard-of-oz-probe`.
