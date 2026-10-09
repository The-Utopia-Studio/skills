# The Pipeline

Eighteen stages, target-hypothesis to expansion/referral. Each stage is "done" when its exit criteria are met — never when it merely feels done. A stage entered but not exited is **stalled**, not "in progress"; log it as stalled rather than quietly advancing it.

Roles referenced below (buyer, champion, technical evaluator, blocker) are defined once, fully, at the end of this file — map them per opportunity, don't assume one person fills more than one.

---

### 1. Target/account hypothesis
- **Objective:** name a specific account or account-type worth pursuing, with a checkable reason.
- **Entry condition:** a market or segment hypothesis exists (from whatever layer owns market strategy).
- **Required inputs:** the segment hypothesis; any named relationship or lead.
- **Operator actions:** write the specific, checkable reason this account fits — not a category ("banks"), a name you could email tomorrow.
- **Decision points:** is this a named account, or still a category? If still a category, this stage isn't exited.
- **Exit criteria:** a named account with a one-sentence, checkable reason.
- **Evidence generated:** `Hypothesis` — account fit is asserted, not yet tested.
- **Failure modes:** naming a category and treating it as if it were an account.
- **Expert notices first:** whether the "reason" is falsifiable. If nothing could prove it wrong, it isn't a real reason.
- **Novice mistake:** listing many accounts instead of committing to the strongest few with real reasons.

### 2. Account qualification
- **Objective:** confirm the account is real enough to invest further effort in.
- **Entry condition:** stage 1 exited.
- **Required inputs:** any public/known signal about the account (size, mandate, recent event).
- **Operator actions:** check for a plausible trigger, a plausible buyer role, and reachability (do we have or can we get access).
- **Decision points:** is there a path to a real person, or only a company name?
- **Exit criteria:** a specific role or person identified as the entry point.
- **Evidence generated:** `Hypothesis`, sharpened.
- **Failure modes:** qualifying the company but never identifying a person.
- **Expert notices first:** whether reachability is real or assumed.
- **Novice mistake:** spending qualification effort on firmographics instead of reachability.

### 3. Buyer/problem hypothesis
- **Objective:** state who the economic buyer is and what problem they have, in a testable form.
- **Entry condition:** stage 2 exited.
- **Required inputs:** the product's core problem statement; any role-mapping done for prior accounts.
- **Operator actions:** write the buyer hypothesis and the problem hypothesis separately — they are not the same claim.
- **Decision points:** does the problem hypothesis match the product's actual, demonstrated capability, or does it overreach?
- **Exit criteria:** both hypotheses stated in one sentence each, falsifiable.
- **Evidence generated:** `Hypothesis` (two, tracked separately).
- **Failure modes:** conflating "who we're talking to" with "who signs" — a champion is not automatically the economic buyer.
- **Expert notices first:** whether the problem hypothesis is stated in the buyer's likely language or in the vendor's.
- **Novice mistake:** skipping this stage and going straight to outreach with an assumed problem statement.

### 4. Trigger identification
- **Objective:** identify why this account would act now rather than later.
- **Entry condition:** stage 3 exited.
- **Required inputs:** any public signal (regulatory deadline, funding event, incident, leadership change).
- **Operator actions:** name a specific trigger, or explicitly log that none is known yet.
- **Decision points:** is the trigger real and dated, or aspirational ("they probably care about this")?
- **Exit criteria:** a named, dated trigger, or an explicit "no known trigger" (both are valid exits — the second just changes the outreach approach).
- **Evidence generated:** `Hypothesis` until confirmed in a real conversation, then `Observed`.
- **Failure modes:** inventing a trigger to justify outreach timing.
- **Expert notices first:** whether the trigger is dated or vague.
- **Novice mistake:** treating "PQC/security is important generally" as a trigger — that's a category, not an event.

### 5. Access/entry
- **Objective:** get a real path to the identified person.
- **Entry condition:** stage 2's entry point identified.
- **Required inputs:** existing relationships, warm paths, or a cold outbound capability.
- **Operator actions:** prefer warm access; use cold outbound only where no warm path exists.
- **Decision points:** is this genuinely warm, or a weak/stale connection being treated as warm?
- **Exit criteria:** a specific, confirmed channel to reach the person (an intro made, a direct contact found).
- **Evidence generated:** `Known` (the channel exists) once confirmed.
- **Failure modes:** treating "someone we vaguely know knows someone there" as warm access.
- **Expert notices first:** how recently the relationship was actually active.
- **Novice mistake:** over-investing in cold outbound before exhausting warm paths.

### 6. First conversation
- **Objective:** get the prospect to engage with the problem framing.
- **Entry condition:** stage 5 exited.
- **Required inputs:** the problem hypothesis from stage 3; a next-commitment ask ready before the call.
- **Operator actions:** state the problem, listen for whether they recognize it in their own words, ask for a specific next commitment.
- **Decision points:** did they engage with the problem, redirect to a different problem, or show no recognition at all?
- **Exit criteria:** either outcome — engagement or disengagement — both are informative and both exit this stage.
- **Evidence generated:** `Observed` — the buyer/problem hypothesis is confirmed, corrected, or rejected in their own words.
- **Failure modes:** treating politeness as engagement.
- **Expert notices first:** whether they restate the problem unprompted, in their own words, or only agree when it's stated for them.
- **Novice mistake:** ending the call without a dated next commitment.

### 7. Discovery
- **Objective:** confirm the pain is real, understand the current process, and surface the cost of not knowing.
- **Entry condition:** stage 6 exited with engagement.
- **Required inputs:** the roles model (buyer, champion, evaluator, blocker) to map as the conversation reveals them.
- **Operator actions:** ask what they do today, who owns the problem, what happens when it goes wrong.
- **Decision points:** is a real owner emerging, or is this one enthusiastic individual with no organizational backing?
- **Exit criteria:** the problem stated in the prospect's own words, plus at least one role beyond the initial contact identified.
- **Evidence generated:** `Observed`.
- **Failure modes:** discovery that never leaves the initial contact — no champion, no economic buyer surfaced.
- **Expert notices first:** whether the prospect can describe the cost of the status quo concretely, or only abstractly.
- **Novice mistake:** pitching the solution during discovery instead of listening.

### 8. Qualification
- **Objective:** decide, on evidence, whether to invest further effort.
- **Entry condition:** stage 7 exited.
- **Required inputs:** the qualification rubric (`references/qualification-and-evidence.md`).
- **Operator actions:** score against the rubric; check the score against qualitative evidence before acting on it.
- **Decision points:** does the qualitative read agree with the score? If not, the qualitative read wins.
- **Exit criteria:** a qualification decision made and logged — proceed, hold, or deprioritize.
- **Evidence generated:** `Decision rule` applied; the outcome itself is `Observed`.
- **Failure modes:** chasing a high score after the real conversation has gone cold.
- **Expert notices first:** contradictions between the score and the transcript.
- **Novice mistake:** treating qualification as a one-time gate instead of revisiting it as new evidence arrives.

### 9. Technical validation
- **Objective:** resolve whether the product's actual, demonstrated capability answers the prospect's real technical objections.
- **Entry condition:** stage 8 exited toward "proceed."
- **Required inputs:** an honest list of what the product can and cannot currently prove.
- **Operator actions:** surface objections directly; do not paper over a capability gap with confident language.
- **Decision points:** is the objection answerable with what exists today, or does it require a capability that's still a hypothesis?
- **Exit criteria:** no unresolved technical blocker, or a specifically named one.
- **Evidence generated:** `Observed` (the objection); `Known` or `Hypothesis` (whatever resolves it).
- **Failure modes:** overclaiming to get past this stage — costs far more later.
- **Expert notices first:** which objections keep recurring across different prospects (see stage-13 branch on repeated rejection).
- **Novice mistake:** treating every technical question as needing a new feature, instead of a clearer explanation of what already exists.

### 10. Demo
- **Objective:** show a real, working measurement — not a mockup or a slide.
- **Entry condition:** stage 9 has no unresolved blocker.
- **Required inputs:** a working demonstration the prospect can actually see run.
- **Operator actions:** run it live where possible; narrate what's real versus illustrative as you go.
- **Decision points:** did they see something real happen, or were they told a story about what would happen?
- **Exit criteria:** the prospect has witnessed a real measurement.
- **Evidence generated:** `Known` (the demo capability) delivered as `Observed` (their reaction to it).
- **Failure modes:** a demo that quietly substitutes illustrative content for real output without saying so.
- **Expert notices first:** whether the prospect asks "is this really happening right now" — a good sign — versus nodding passively.
- **Novice mistake:** over-rehearsing the demo into something that no longer resembles what a real user would see.

### 11. Pilot design
- **Objective:** scope the smallest pilot that could produce a real, decision-useful answer.
- **Entry condition:** stage 10 exited.
- **Required inputs:** the product's actual tested capability boundary; the prospect's real environment constraints.
- **Operator actions:** design the smallest scope that still produces evidence — one system, one environment, a defined observation window, agreed success criteria.
- **Decision points:** does the prospect have a real environment to test against, or only interest?
- **Exit criteria:** a written pilot scope both sides would recognize as the same document.
- **Evidence generated:** `Decision rule` (the design itself).
- **Failure modes:** scoping a pilot broader than the product's actual tested capability.
- **Expert notices first:** whether success criteria are the prospect's own words or the vendor's assumption of what would impress them.
- **Novice mistake:** designing a pilot with no independently-kept ground truth to compare against.

### 12. Pilot approval
- **Objective:** get organizational sign-off to actually run it.
- **Entry condition:** stage 11 exited.
- **Required inputs:** the written pilot scope; identification of who can approve it.
- **Operator actions:** confirm who the approver is — often not the champion.
- **Decision points:** is there a real approver, or is the champion assuming authority they don't have?
- **Exit criteria:** explicit approval from someone with actual authority to grant environment access.
- **Evidence generated:** `Observed` (approval) or a named blocker.
- **Failure modes:** proceeding on champion enthusiasm without real approval — see the branching logic's "technical champion, no economic buyer" rule.
- **Expert notices first:** how long approval takes relative to how the prospect described their own process — a mismatch is informative.
- **Novice mistake:** treating a verbal "sounds good" as approval.

### 13. Pilot execution
- **Objective:** run the pilot exactly as scoped.
- **Entry condition:** stage 12 exited.
- **Required inputs:** the approved scope; an independently-kept log of ground truth to compare against.
- **Operator actions:** run only what was scoped; resist expanding scope mid-pilot without renegotiating it explicitly.
- **Decision points:** is the pilot producing real signal, or has it drifted from the original design?
- **Exit criteria:** the observation window completes, or is explicitly stopped early with a stated reason.
- **Evidence generated:** `Experiment` outcome, becoming `Observed`.
- **Failure modes:** letting scope drift silently.
- **Expert notices first:** whether the independent ground truth is actually being kept independently, or informally merged with the product's own output.
- **Novice mistake:** treating "the pilot is running" as itself a success signal.

### 14. Pilot evidence
- **Objective:** produce an honest read of what the pilot showed.
- **Entry condition:** stage 13 exited.
- **Required inputs:** the pilot's raw output; the independent ground truth log.
- **Operator actions:** compare honestly, including false positives/negatives; write the finding in the stakeholder's own words where possible.
- **Decision points:** does the evidence support continuation, require refinement, fail to support the hypothesis, or come back inconclusive? All four are legitimate outcomes.
- **Exit criteria:** a written finding, reviewed by the real stakeholder, explicitly labeled as pilot output.
- **Evidence generated:** `Known` (technical/analyst usefulness) — separately from buyer usefulness, which this stage does not resolve by itself.
- **Failure modes:** reporting a technically successful pilot as if it settles buyer usefulness too (see worked example 5).
- **Expert notices first:** whether the stakeholder's language changed between discovery and this review — that shift, or its absence, is the real signal.
- **Novice mistake:** treating "inconclusive" as a failure to hide rather than a legitimate, informative result.

### 15. Commercial proposal
- **Objective:** convert validated evidence into a specific commercial ask.
- **Entry condition:** stage 14 exited toward continuation, with a real economic buyer identified.
- **Required inputs:** pricing/business-model decisions owned upstream (not invented at this stage); the pilot evidence.
- **Operator actions:** propose to the actual economic buyer, referencing the pilot's real findings, not aspirational claims.
- **Decision points:** is there budget and urgency, or only technical enthusiasm? If the latter, this is not yet a commercial-stage opportunity — see the branching logic.
- **Exit criteria:** a specific proposal in front of a named economic buyer with a stated timeline.
- **Evidence generated:** `Hypothesis` until a response is `Observed`.
- **Failure modes:** proposing before budget/urgency is confirmed, out of momentum rather than evidence.
- **Expert notices first:** whether the buyer engages with the price or only the technical findings.
- **Novice mistake:** treating "please send a proposal" as itself a buying signal — sometimes it's procurement process, sometimes it's a polite close.

### 16. Procurement
- **Objective:** clear whatever organizational process stands between a verbal yes and a signed agreement.
- **Entry condition:** stage 15 exited with buyer interest.
- **Required inputs:** whatever legal, security, or compliance material the process requires.
- **Operator actions:** ask early what their procurement process actually requires — don't assume it mirrors your own.
- **Decision points:** is this real process, or a stall being described as process?
- **Exit criteria:** a signed agreement, or an explicit, named reason procurement stalled.
- **Evidence generated:** `Observed`.
- **Failure modes:** letting a stall go uninvestigated for so long that the trigger from stage 4 expires.
- **Expert notices first:** how the prospect answers "who else needs to see this" — a vague answer is a warning sign.
- **Novice mistake:** treating procurement as purely administrative rather than a stage that can kill a deal.

### 17. Deployment
- **Objective:** get the product genuinely running in the customer's real use.
- **Entry condition:** stage 16 exited with a signed agreement.
- **Required inputs:** whatever technical access or integration the agreement specifies.
- **Operator actions:** confirm deployment actually happened — a signed contract is not the same as a live deployment.
- **Decision points:** is the product actually in use, or signed-but-shelved?
- **Exit criteria:** confirmed real usage, not just contractual access granted.
- **Evidence generated:** `Observed`.
- **Failure modes:** counting a signed deal as done before confirming real usage — the point where "traction" claims get overstated most often.
- **Expert notices first:** whether usage is being actively confirmed or just assumed from the contract date.
- **Novice mistake:** moving on to the next opportunity before deployment is confirmed, losing the thread on whether the deal is actually healthy.

### 18. Expansion / renewal / referral
- **Objective:** turn one real customer into the next opportunity, made easier by the first.
- **Entry condition:** stage 17 confirmed, with real usage sustained.
- **Required inputs:** whatever loop the business model defines as the expansion mechanism.
- **Operator actions:** ask directly for referral or expansion once value is confirmed — don't assume it happens on its own.
- **Decision points:** is expansion/referral organic, or does it require a specific ask?
- **Exit criteria:** a new opportunity opened that is measurably easier than the first (shorter cycle, warmer intro, less discovery needed).
- **Evidence generated:** `Known`, once it happens more than once; `Hypothesis` on the first instance.
- **Failure modes:** assuming a happy customer will refer without being asked.
- **Expert notices first:** whether the second deal is actually faster, or just felt easier because it was more recent.
- **Novice mistake:** treating one successful expansion as proof of a repeatable flywheel.

---

## Roles, defined once

| Role | Cares about | Evidence they need | Genuine sponsorship looks like | Polite interest looks like | Ask them |
|---|---|---|---|---|---|
| **Economic buyer** | Budget, risk accountability | Proof of value against a cost they can defend | Naming a budget line or timeline unprompted | Vague enthusiasm with no timeline | "Whose budget would this come from, and when's the next cycle?" |
| **Champion** | Looking good for backing this internally | Enough proof to stake their own credibility on it | Introducing you to others unprompted | Agreeing in meetings but never introducing anyone | "Who else internally should see this?" |
| **Technical evaluator** | Whether it actually works as claimed | A real, working demonstration; access to test it | Asking hard, specific technical questions | Generic praise with no probing questions | "What would make you personally trust this result?" |
| **Blocker** | Risk, compliance, precedent | Whatever their function requires as proof (legal, security, audit) | Naming the specific bar that must be cleared | Silence, or deferring the question indefinitely | "What's the actual bar your function needs to see cleared?" |
| **End user** | Whether it makes their job easier or harder | Direct experience using it | Using it unprompted, reporting real friction | Saying it's "fine" without detail | "Walk me through using this in your actual workflow." |

Not every deal has all five distinctly. The mistake is assuming one person fills all of them rather than checking.
