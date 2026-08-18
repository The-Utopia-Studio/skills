---
name: job-in-primitives
description: Reduces a job to its three irreducible currencies — information moved, decisions made, liability transferred — after deleting every tool, vendor, product, and org-chart role name from the description. Fires on "what job is really being done here", "strip this down to the primitive", "what's the primitive job", "take the tool names out and tell me the underlying job", or when a fellow describes a workflow thick with product and team names and wants the tool-independent job beneath it. Outputs a filled primitive job spec: the customer's-words version + a kill-list of deleted proper nouns + the three primitive lines + an invariance test + an AI-eats-vs-stays split. NOT for naming the single decision and its before→after time compression (use product-as-decision), NOT for mapping and pricing each workflow step (use current-state-map), NOT for the problem-framing-canvas workshop (this absorbs its instinct, not its scaffolding).
type: generator
supersedes: none
---
# Job in Primitives

## What it does
Takes a job described in the customer's own language — full of product names, team names, and steps — and reduces it to the three things every job actually is underneath: information moved, decisions made, liability transferred. It first strips every proper noun, then fills those three lines in tool-free language, then checks with an invariance test (would the line still be true if every named tool vanished?). The output is a filled primitive job spec ([template.md](template.md)) that names, separately, what AI can eat, where the wedge is, and which primitive can never move to a machine. It finds the job that survives when the tools change.

## The Icarus reframe
The customer's words encode the customer's current solution. "We need the risk report faster" hides that the report is one implementation of "move a risk judgment to an insurer who will pay on it." Keep the vendor words and you rebuild their tool; delete them and you can rebuild the job. Underneath, every job is some mix of three currencies — information moved, decisions made, liability transferred — and AI meets them very differently: it eats information movement, it eats the routine half of decisions, and it structurally cannot take liability, because a model has no name to stake, no licence to lose, no way to be prosecuted. So the reduction is not tidy framing. It is a map of what the machine eats and what stays yours. If a tool, vendor, or role name survives the reduction, you have not found the primitive yet — you have restated the workflow.

## When to use / When NOT
Use it at the very start, on a job you can describe concretely from a real instance, when you want the tool-independent version before anyone designs a solution.

| Situation | Use this? | Go to |
|---|---|---|
| "What job is really being done under all these tools?" | Yes | job-in-primitives |
| "Strip this workflow down to the primitive." | Yes | job-in-primitives |
| "Take the product/team names out — what's the underlying job?" | Yes | job-in-primitives |
| "State this as the one decision we're changing, and how much faster it gets." | No | `product-as-decision` |
| "Map how it's done today and price every step." | No | `current-state-map` |
| "What's the riskiest assumption / how would I disprove it?" | No | `null-hypothesis-test` |
| "Is the whole idea any good?" | No | `so-what-stress-test` |

This skill isolates the job beneath the tools. It does not pick the one decision (that is `product-as-decision`, which reads off the decisions line here), and it does not re-attach tools to price them (that is `current-state-map`). Name the sibling and stop.

## Method
Fill the sheet in [template.md](template.md). Do not narrate; work the lines. Tag any empirical claim `[Fact]` (from an observed instance or a shown artefact), `[Assumption]` (a stated, defensible estimate), or `[Hypothesis]` (a guess needing evidence).

**Step 1 — Capture the job in the customer's own words (§0).**
Write it exactly as the fellow or customer says it, vendor names and all. You need the tool-laden version to strip. Record where the description came from (observed instance / artefact / interview / opinion) and its ladder weight. If the only source is the fellow's imagination, stop — see Evidence standard.

**Step 2 — Build the kill-list (§1).** For every proper noun, product, tool, vendor, team, role, and place in §0, name its type and replace it with its function, not its category. "Salesforce" becomes "a record of the customer relationship", not "a CRM" (a CRM is still a tool). If a word cannot be generified without losing the job, flag it — it is usually pointing at the liability primitive (an accreditation, a statutory duty), not a tool to delete.

**Step 3 — Fill the three primitive lines (§2), tool-free.** No word from the kill-list may appear.

| Primitive | What it names |
|---|---|
| Information moved | From what → to what, and the transformation: raw signal → judgment, claim → verdict, two records → a match |
| Decisions made | The actual choice and its branches — the irreducible go/no-go, accept/reject, stop/run |
| Liability transferred | Who is on the hook, for what, by what mechanism — a signature, a contract, a regulatory duty, a payment released |

**Step 4 — Invariance test (§3).** For each line, ask: would it still be exactly true if every tool named in §0 vanished tomorrow? A "no" means a tool assumption is still hiding in the line. Fix it before continuing.

**Step 5 — AI eats vs stays (§4).** Score each primitive against what a model can reach.

| Primitive | AI's reach | Icarus read |
|---|---|---|
| Information moved | Eats it (retrieve, transform, format) | Table stakes — everyone gets this; not a moat |
| Decisions made | Eats the routine; the exception/tail is where judgment survives | The wedge — automate the routine, keep a human on the tail |
| Liability transferred | Cannot take it — no name to stake, no licence to lose | The moat — the part that stays human, or stays yours |

**Step 6 — Kill-line check (§5), the auto-fail gate.** Scan §2 for any surviving proper noun, product name, or org-chart role. **A primitive line containing one is an auto-fail: you have described the workflow, not the job. Re-run Step 2.**

**Step 7 — Evidence the liability line (§6).** State who is on the hook and the proof it is load-bearing (a clause, a signature that gates money, a statutory duty), with its ladder weight. If the liability primitive rests only on opinion, mark it UNVERIFIED — it is the moat, and a guessed moat is not one.

## Evidence standard
Icarus weights behaviour and money over opinion. The primitives must come from a real instance of the job — one observed run, one shown artefact — not from how the fellow imagines it works. The liability line is where fellows guess hardest, so it carries the strictest bar.

| Source for the job description | Ladder weight |
|---|---|
| The sign-off gates money you can see move (a payment, a paid invoice, a priced contract) | 1.0 |
| One real instance of the job observed end to end | 0.7 |
| A completed artefact of the job shown (a signed permit, a filed report) | 0.5 |
| Someone described the job in an interview | 0.3 |
| The fellow's memory / opinion of how it works | 0.1 |

If the whole spec sits on opinion (0.1), the skill declares the input **not ready** and names the cheapest fix: observe one real instance, or pull one completed artefact. It does not reduce an imagined job and present the primitives as found. The three lines may hold `[Assumption]` tags, but the liability line must cite the mechanism (the signature, the clause, the duty) so a reader can challenge who is really on the hook.

## Gotchas
- **A category is still a tool.** Deleting "Salesforce" and writing "a CRM" is not reduction. Generify to the function ("a record of the customer relationship"), or the invariance test in Step 4 will fail.
- **The decider and the liable party are often different people.** The person who makes the call is not always the one who pays if it is wrong — that is frequently a more senior, contractual, or accredited party. Keep the decisions line and the liability line separate; collapsing them hides the moat.
- **Do not manufacture an automatable primitive.** Some jobs are almost pure liability-transfer — a sign-off, an accreditation lent. The honest read is "little to automate, strong moat", and the skill must say so rather than invent an information-movement line to make the job look buildable.
- **Pronoun-swapping is not reduction.** Replacing every tool name with "the system" leaves the workflow intact. The test is whether the primitive is still exactly true with the tool gone, not whether the sentence reads generically.
- **The comfortable primitive is usually information movement.** Fellows reduce to "we move data faster" because it is the part AI clearly eats — which is exactly why it is table stakes. If the reduction lands only on the information line, push until the decision and liability lines are filled too.

## Examples
- [examples/sample.md](examples/sample.md) — Barrier Intelligence's gas permit-to-work, reduced end to end: information moved (hazard state → a safe-to-start assertion), decisions made (go/no-go on opening the line), liability transferred (an accredited signer stakes their licence), with the honest read that the signature is a moat AI cannot take.

## Related skills
- Absorbs `discovery/problem-framing-canvas`: it keeps that canvas's one good instinct — look past the stated symptom to the job underneath — and drops the workshop scaffolding and the prose "How Might We" output. Where the canvas ends in a reframed sentence, this ends in a tool-independent spec with an automatable/liability split you can act on. It beats the canvas by being testable (the invariance test and kill-line gate either pass or they do not).
- Feeds `product-as-decision`, which lifts the one decision from this skill's decisions line and compresses its time; and `current-state-map`, which re-attaches the tools and prices each step. Run this first: primitives, then the decision, then the priced map.
- Feeds `moat-design-canvas` and `physics-floor-gap`: the liability line is the moat input, the information line is the automation floor input.
- `so-what-stress-test` scores the whole concept; this only isolates the job beneath it. Supersedes nothing — it is the reduction primitive the others read from.
