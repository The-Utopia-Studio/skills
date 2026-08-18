# Eval log — usability-test-protocol

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "We've got a clickable v0 — run a usability test with five plant managers and see where they get stuck."
2. "Watch a user try the new alert flow and tell me if they can complete it without help."
3. "I need a usability protocol — who runs it, who watches, what do we measure?"
4. "Can a first-time rig supervisor renew the expiring permit on our prototype unaided?"
5. "Sit one person in front of the 3-screen settings flow and check they can change their notification prefs." (mundane)

MUST NOT fire (3, name the sibling each belongs to):
1. "Shadow our senior gas engineer on his rounds and capture how he decides which readings to trust." → belongs to `tacit-knowledge-interview` (mines an expert's judgment; not a user testing our prototype)
2. "Mock up a clickable version of the alert flow so we have something to test." → belongs to `first-mocks` (builds the artefact this skill tests)
3. "Test whether operators would actually pay for the copilot." → belongs to `wizard-of-oz-probe` / `concierge-probe` (demand and willingness-to-pay, not task success)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire match verbatim triggers or the semantic core ("watch a user complete a task on a working prototype"). #5 mundane ("check they can change notification prefs") maps to "can a first-time user complete X". All 3 MUST-NOT are explicitly excluded in the description by name: shadow-expert→`tacit-knowledge-interview`, mock-up→`first-mocks`, would-pay→`wizard-of-oz`/`concierge`. |
| 2 Golden | PASS (5/5) | see per-case table below |
| 3 Adversarial | PASS (3/3) | 01 vague → Step 0 forces the one unblocking question, "never fabricate a run log"; no invented users/tasks. 02 tooltip → reframes to "observe WHERE users get lost", tooltips=one hypothesis, refuses confirmation framing (via challenge posture + findings-locate-the-defect ethos). 03 gas-engineer → declines, names `tacit-knowledge-interview`, draws the "same verb watch, opposite object" distinction (When-NOT table + Related skills), offers handoff. |
| 4 Head-to-head | n/a | `supersedes: none` |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: muted-builder discipline (builder does not run the session), finding attributed to the prototype not the person, behaviour-0.7-vs-opinion-0.1 quarantine on the evidence ladder, goal-not-instruction task rewrite, ≥2/5=[Fact] / 1=[Hypothesis]. A generic prompt would report "users liked the new layout" — which this skill bans at the kill line. No mis-placed prose: severity map, task-success scale, roles, banned moves, evidence ladder all correctly tabular. |
| 6 Real-use | pending | not executable here (needs 5+ real fellow uses) |

### Gate 2 — per-case scores (rubric: /25, pass ≥21 AND no dim <4, no auto_fail)

| Case | method | artifact | proprietary | challenge | evidence | Total | Verdict |
|---|---|---|---|---|---|---|---|
| G01 Mentix copilot (canonical) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| G02 Barrier permit (safety) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| G03 Durian email→PO | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| G04 Azraq dashboard (weak) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| G05 mundane 3-screen flow | 5 | 4 | 5 | 5 | 5 | 24 | PASS |

Notes on the harder cases:
- **G02 safety**: Step 3 scale directly rewards the safety-critical read — "completed wrong without noticing" = Fail, "silent-wrong is worse than a visible give-up". Safety framing is explicitly resisted as a coaching temptation (kill line + Gotcha "Leading by relief"), which is exactly the trap the case sets.
- **G04 weak input**: the "like … better" preference ask is challenged on both counts (preference≠usability; A/B-preference is the wrong instrument) via Gotcha "Chasing a preference verdict" + When-NOT row; reframed to a behaviour-scored task; no fabricated "operators preferred the new one" (would be an auto_fail). Challenge is explicit, not softened.
- **G05 proportionality**: served by the 1=[Hypothesis]/flag machinery and the sample-size note; honest about the 1-user evidence limit (flag not fact). Artifact scored 4 because "scale the protocol to the flow" is achieved through the flag machinery rather than a named instruction (see gotcha below).
- **Auto_fail check**: none triggered. Following the skill's own fixture-label convention (see `examples/sample.md`), illustrative run numbers are labelled constructions, not client records — so filling the sheet is not fabrication. No flattery, no scope-poach, not boilerplate.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Confirmation-test in disguise (hardens Adversarial 02).** The Method has no explicitly named guardrail for "run a test to *confirm* we need X". Adv-02 currently passes on the general challenge posture + the "findings locate the defect, not validate a fix" ethos. Add a Gotcha, e.g.: *"'Run a test to confirm we need [tooltips/X]' is a solution stated as a problem plus a confirmation test — it hunts for support, not for where the design breaks. Reframe: observe WHERE users get lost; the pre-chosen fix is one hypothesis among the label, the flow order, and the information scent."*
- **Scale the protocol to the flow (makes Golden 05 explicit).** "Don't over-engineer a 3-screen settings change into a 5-segment study" is currently only *implied* by the flag/[Hypothesis] machinery and the Step-5 sample-size note. Consider a one-liner in Step 0 or Step 5: *"Run at the weight of the flow — a 3-screen settings change is not a 5-segment study; one real user is a flag, a second turns any wall into a [Fact]."*

## Refine run 2 — applied judge fixes: added a named "confirmation test in disguise" Gotcha (a session built to confirm the design works, or offering only happy-path tasks, is invalid) and a Step-0 line to scale the session to the flow rather than force the full ceremony on a trivial flow.
