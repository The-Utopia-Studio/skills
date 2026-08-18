# Eval log — synthetic-users

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Can I test this concept before I book real interviews?"
2. "Simulate a user for this pitch."
3. "Dry-run the pitch / message before I take it to customers."
4. "Build me a synthetic panel from our data to pre-test the flow."
5. "Which of these two messages should I even bother interviewing about?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Shadow our expert doing the task and capture their judgment" → belongs to `tacit-knowledge-interview`
2. "Write the Mom-Test script for my discovery interview" → belongs to `interview-script` (planning it → `discovery-interview-prep`)
3. "What data can't a competitor get — build our corpus" → belongs to `yoda-data-sourcing`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire map to explicit trigger tokens in `description` ("test this before real interviews", "simulate a user", "dry-run the pitch", "pre-test the message/flow", "which of these should I even bother interviewing about"). All 3 MUST-NOT-fire are carved out by name to siblings (tacit-knowledge-interview, interview-script/discovery-interview-prep, yoda-data-sourcing). |
| 2 Golden | PASS (5/5) | Per-case totals below. No dimension < 4; no auto_fail. |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the one kill+corpus question, corrects "would they like it" premise, no invented panel. 02 "validated w/100" → refuses framing, names simulation-as-proof trap, caps at [Hypothesis], offers grounded kill screen, produces no validated claim/100-panel. 03 out-of-scope → declines without poaching, routes to tacit-knowledge-interview, restates the sharpened confirm-vs-override question, runs no shadow session. |
| 4 Head-to-head | n/a | `supersedes: none` — fully proprietary, no prior synthetic-user skill in pack. |
| 5 Anti-generic | PASS | Golden-01 output could not come from a generic prompt: the load-bearing move is discarding both enthusiastic responses as null and transferring ONLY the tacit-capture-grounded confusion/workaround, capped at [Hypothesis] below opinion (0.1) on the evidence ladder, with a fixed lie ledger. Generic "role-play a persona, does it like it?" produces the opposite ("panel loved it → go"). Guidance is tabular where it should be (kill-signal, panel cards, lie ledger, transfer table, verdict); no should-be-table-as-prose defect. |
| 6 Real-use | pending | Requires 5+ real fellow uses; not executable here. |

### Golden per-case scores (rubric: /25, pass ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix (revise→promote) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Barrier Intel (kill / free habit) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 03 Azraq (A/B → direction only) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| 04 Durian Labs (flow → revise one step) | 5 | 4 | 4 | 4 | 5 | 22 | ✓ |
| 05 Barrier Intel (panel-inflation refusal) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Notes on scoring: 04 is the deliberately mundane case; the correct run finds one nameable stall (merged-cell/extra-column column-drop), scopes REVISE to that step, treats "no drama" as a complete run — genuinely non-generic but lower ceiling on artifact spread and challenge than the dramatic cases, hence 22. 03 loses one challenge point only because the pushback (WTP discarded, inflated buyer signal named) is strong but less confrontational than 02/05's outright refusals.

Verification of the three load-bearing mechanisms (per judge brief):
- **Asymmetric logic** — CONFIRMED airtight. Step 3 marks "Yes/I'd use this"=**Null**, "I'd pay $X"=**Null and dangerous**; Evidence-standard transfer table marks enthusiasm=No, WTP=Never, confusion=Often, workaround=Often, relative-ranking=Direction-only. Template §3 ("discard = enthusiasm/WTP") and §6 ("Positive signal was discarded, not counted") enforce it. Positive signal is discarded before it is read; only negative/kill signal may transfer.
- **Lie ledger** — CONFIRMED present. Fixed 6-lie set (never-pay, never-no-show, over-rationalise, over-agree, no-org/politics, over-informed) in Step 4; every kept response gets a lie tag + transfer call; template §4 mirrors it.
- **Ladder cap** — CONFIRMED. "A synthetic response is not on the ladder; it sits below its bottom rung. Real opinion scores 0.1... best a synthetic panel can produce is a [Hypothesis]... it can never raise your confidence." "Nothing a synthetic user says is ever [Fact]."
- **Kill line** — CONFIRMED enforced. "The output must never say 'validated', and must carry the lie ledger... auto-failed" (Step 5); template §6 honesty check gates ship on both conditions.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Simulated quotes vs the fabrication auto_fail.** The skill's deliverable is, by design, invented synthetic responses (quotes). These are legitimate ONLY because every one is tagged [Hypothesis]/never [Fact] and attributed to a named corpus slice, and the sample flags "numbers and quotes are illustrative." Worth an explicit line in Gotchas: a synthetic quote must never be presented as a verbatim corpus quote or a real number — otherwise a careless run trips rubric auto_fail #1 ("fabricated a specific quote/number not in the input"). Currently implied by the [Fact]-forbidden rule but not called out as its own trap.
- No other defects. Method, template, golden set, adversarial set, and rubric are mutually consistent; the kill line the skill exists to enforce is defended in SKILL.md Step 5, the Evidence standard, and template §6.

## Refine run 2 — applied judge fixes: added a Gotcha that invented synthetic quotes must be tagged [Hypothesis] and attributed to a named corpus slice, never presented as verbatim corpus quotes or real numbers (else they trip fabrication auto_fail #1).
