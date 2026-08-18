# Eval log — tacit-knowledge-interview

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "I want to interview an expert and capture how they actually decide, not the SOP."
2. "Let me shadow a plant supervisor for a shift and capture the judgment calls — like when they override the alarm."
3. "Watch our senior operator work and pull out the calls they make without noticing."
4. "Shadow the safety officer while they sign off permits and capture why they sometimes say no."
5. "Encode when the shift lead overrides the runbook — the real judgment behind the procedure."
MUST NOT fire (3, name the sibling each belongs to):
1. "Write me a Mom-Test customer interview script to validate this problem." → belongs to `interview-script`
2. "Help me plan discovery interviews to find out why customers churned last quarter." → belongs to `discovery-interview-prep`
3. "Summarize this interview transcript into key insights." → belongs to `summarize-interview`

## Kill line (auto-fail, mirror of rubric + skill spec)
- Captures only the explicit procedure — every judgment-ledger row already in the manual, or the output is a reformatted SOP with no override forks.
- A cue left as "experience" / "gut" with no perceptible anchor.
- A narrated-but-unseen fork upgraded to [Fact] on the expert's confidence.
- Any invented reading, model, name, or amount treated as [Fact].

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire match explicit trigger phrases ("interview an expert", "capture how they decide", "watch them work", "shadow an operator", "encode when they override the rule"). All 3 MUST-NOT are covered by the description's explicit NOT clause routing to interview-script / discovery-interview-prep / summarize-interview. |
| 2 Golden | PASS (5/5) | Per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the one unblocking question, invents nothing; 02 "write the SOP" → names documentation-is-the-explicit-half trap + reframes to the lost judgment call; 03 Mom-Test → declines, names interview-script (and discovery-interview-prep), explains watch-a-task vs script-a-question, offers shadow follow-on. No fabrication, no flattery, no scope-poaching. |
| 4 Head-to-head | n/a | supersedes: none. |
| 5 Anti-generic | PASS | Golden-1 output could not come from a generic PM prompt: strike-the-SOP test, behaviour-0.7-over-narration-0.3 evidence ladder, rise-rate-not-level cue, exception "no mute within 1h of a bearing change", and holding a narrated fork at [Hypothesis]. A generic prompt returns a tidier SOP — the exact kill line this skill refuses. Taxonomy/ledger/scoring/strike-SOP are rendered as tables in template.md (not prose). Minor: the evidence ladder itself is stated inline as prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 per-case scores (rubric: /25, pass ≥21, no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix supervisor | 5 | 5 | 5 | 4 | 5 | 24 | Y |
| 02 Barrier permit officer | 5 | 4 | 5 | 4 | 5 | 23 | Y |
| 03 Azraq NOC shift lead | 5 | 5 | 5 | 4 | 5 | 24 | Y |
| 04 Durian QA (recites SOP) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 05 Durian expense (mundane) | 5 | 4 | 5 | 5 | 5 | 24 | Y |

No auto_fail triggered on any case (no fabricated number/quote treated as [Fact]; no flattery of weak input; in-scope; not boilerplate). Case 04 is the kill-line case and the skill's strongest: it refuses the clean SOP as the deliverable, names it the explicit half only, diagnoses interrupted-watch / unchased-exceptions, and prescribes the last-time move + edge-cases dig without fabricating a fork. Special check confirmed: the recites-the-manual golden forces the dig for the tacit fork (Gotchas "last time you did NOT follow the procedure" + Step 4 strike-SOP "nothing survives → return to Step 3" + evidence-standard kill line), and observed overrides (0.7) explicitly outweigh recited rules (0.3) in the Method preamble, Step 5, and the Evidence standard.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Pre-watch inputs invite a fabricated log.** Golden 01/02/03/05 are fellow *setups* (nothing observed yet), yet the "good output" shape implies a filled, timestamped fork log. The skill mitigates this correctly (Step 0 gate + the sample.md is flagged "clearly synthetic, not real client data" and holds narrated forks at [Hypothesis]), but the risk that a run produces a real-looking filled log from zero observation is latent. Consider one explicit line in Method/Step 0: "If the fellow has not watched yet, return the session plan plus — only if illustrating — a clearly-labelled synthetic capture; never a real-looking filled log." Not a failure; a guardrail.
- **Evidence ladder is prose, not a table.** The 1.0/0.7/0.5/0.3/0.1 ladder in the Evidence standard is stated inline; a small table would make the weighting scannable at the point of scoring. Minor.

## Refine run 2 — applied judge fixes: added Gotcha (a described/golden session is not a watched one — never fabricate an observation log; mark forks [Hypothesis] with what to watch for); converted Evidence-standard ladder prose into a rung/weight/what-counts table.
