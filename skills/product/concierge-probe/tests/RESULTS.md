# Eval log — concierge-probe

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Let's do it by hand first before we build the reporting tool."
2. "Run a concierge test on Barrier Intelligence's morning alert."
3. "Concierge MVP for the Azraq quarterly risk report."
4. "I'll deliver it manually to one operator and charge them £400."
5. "Give me the founder-delivered version of the Durian digest before we automate."

MUST NOT fire (3, name the sibling each belongs to):
1. "Which probe should I run to test whether operators trust the alert?" → belongs to `probe-matrix`
2. "Let an agent run the task end to end and tell me the cost per outcome." → belongs to `agent-concierge-probe`
3. "Fake the interface and I'll play the backend by hand to see if they'd use it." → belongs to `wizard-of-oz-probe`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | 6-gate judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire hit literal trigger phrases ("do it by hand first", "concierge test", "concierge MVP", "deliver it manually", "founder-delivered … before we automate"). All 3 must-not correctly route: #1→probe-matrix, #2→agent-concierge-probe, #3→wizard-of-oz. Near-collision: #3 "play the backend by hand" shares the "by hand" token with a positive trigger; the description's explicit "fakes the interface … not whether they pay" carve-out saves it, but it is the closest call. |
| 2 Golden | PASS (5/5) | Applied method to each; scored on rubric. Per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague → Step 1 "if you cannot name the customer or the price, stop" forces the one unblocking question; invents nothing. 02 solution-in-disguise → reframes to WTP+workflow, refuses "prove we need the app" (scored as app-demand smuggling). 03 out-of-scope → declines both, routes "which probe"→probe-matrix and "worth pursuing"→problem-scoring skill. No fabrication/flattery/scope-poach. |
| 4 Head-to-head | n/a | supersedes: none. |
| 5 Anti-generic | PASS | Golden-01 output holds an unpaid-but-sent £2,500 invoice at 0.5 (not 1.0) and tags scale/self-serve [Hypothesis, not tested] — a generic concierge-MVP prompt conflates "invoice sent" with "paid" and n=1 with validated demand. Not reproducible generically. Ladder/contract/decision bands are all tables, not prose. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores (rubric: /25, pass ≥21 AND no dim <4)
| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Azraq paid — invoice sent, not cleared | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Mentix copilot £600 fortnight | 5 | 5 | 4 | 5 | 5 | 24 | ✓ |
| 03 Durian mundane £120/mo digest | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |
| 04 Barrier free trial + verbal "we'd pay" | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 05 Azraq scale over-reach | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Key discipline confirmed: G01 correctly holds an unpaid-but-sent invoice at 0.5, refusing 1.0 until the charge clears (Step 4 "money is 1.0 only when it clears"). G04 correctly scores a free-trial verbal "we'd definitely pay" at **0.3 (verbal rung)** — not 1.0, and correctly distinguished from the 0.1 "sounds useful" opinion rung — and keeps the free-week exceptions as [Fact] while marking demand unproven. No auto_fail triggered (invented minutes/exceptions would be labeled illustrative, per the skill's own example norm).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Trigger near-collision: an input that does steps "by hand" *behind a faked interface* shares the "by hand" token with a positive trigger. The negative carve-out currently disambiguates, but consider an explicit line: "not wizard-of-oz even when you do steps by hand behind a fake UI — that probe tests would-they-use-it, not pay."
- The skill relies on the applier to *name* the "solution-smuggling" trap in Adv-02; the material supports the reframe but the term itself isn't in the skill text. Optional: add a gotcha naming it.

## Refine run 2 — applied judge fixes: added Gotchas — "by hand behind a fake UI" is Wizard-of-Oz not concierge, and solution-smuggling (concierge test of a pre-chosen feature → reframe to the outcome delivered).
