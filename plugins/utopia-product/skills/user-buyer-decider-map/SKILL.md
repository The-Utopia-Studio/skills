---
name: user-buyer-decider-map
description: >-
  Splits a buying situation into four distinct people — user (feels the pain,
  touches the product), buyer (owns the budget line), decision-maker (final
  signature / veto), champion (spends internal capital to push it) — each pinned
  to ONE title, ONE budget (or an explicit none), ONE why-now. Fires on "who's
  the actual buyer", "who decides", "map the stakeholders", "map the buying
  committee", "the user loves it but who signs the cheque", "who's our champion
  and who can veto us". Output is a filled Stakeholder-Role Map that feeds the
  buyer-clarity row of problem-quality-scorecard. NOT the 8-dimension go/no-go
  (problem-quality-scorecard), NOT ranking which unmet need to build first
  (unserved-needs-finder), NOT a demographic day-in-the-life persona
  (proto-persona), NOT simulating users before interviews (synthetic-users).
type: generator
supersedes: none
---
# User / Buyer / Decider Map

## What it does
Forces four names where the fellow wants one. Enterprise deals die because the fellow sold the user and never found the budget. This map separates the person who feels the pain from the person who pays, the person who signs, and the person who carries it inside the account — one title each, one budget each (users get an explicit "no budget," which is correct, not a gap), one why-now each. It also names the fifth face the happy-path map hides: whoever loses if the product ships. The output is a filled Stakeholder-Role Map ([template.md](template.md)). A buyer with no budget line and no why-now is not a buyer, and the map says so out loud, capping the buyer-clarity row of `problem-quality-scorecard` at 1.

## The Icarus reframe
A generic prompt hands back one portrait — a `proto-persona` with demographics and quotes, or an `ideal-customer-profile` with firmographics and LTV cohorts. Both describe "the customer" as a single person. Icarus asks the harder question: of the people around this purchase, exactly one owns the budget line the money leaves, and in a plant, a rig, or a data centre that person almost never feels the pain. The operator who suffers the workflow cannot sign a PO; the VP who signs never sees the workflow. So the artefact is not a cast list with attributes — it is a money-and-motion trace: who pays, from which line, and what makes each of them move *this quarter*. Miss the why-now and you have four people who nod and never act. Collapse user into buyer and you have a B2C fantasy pasted over an enterprise sale. The map exists to make both mistakes impossible to hide.

## When to use / When NOT
Use it when a fellow has a problem worth pursuing and needs to know who actually buys it, and how a deal through that account moves.

| Situation | Use this? | Go to |
|---|---|---|
| "Who's the actual buyer? Who decides?" | Yes | user-buyer-decider-map |
| "Map the stakeholders / the buying committee." | Yes | user-buyer-decider-map |
| "The user loves it — but who signs the cheque?" | Yes | user-buyer-decider-map |
| "Who's our champion, and who can quietly veto us?" | Yes | user-buyer-decider-map |
| "Score the problem across 8 dimensions — go or no-go?" | No | `problem-quality-scorecard` |
| "Which unmet need do we build for first?" | No | `unserved-needs-finder` |
| "Write a demographic persona / a day-in-the-life." | No | `proto-persona` (absorbed — see Related) |
| "Define the firmographic ICP with LTV cohorts." | No | `ideal-customer-profile` (absorbed — see Related) |
| "Dry-run the pitch on a simulated user first." | No | `synthetic-users` |

This skill maps who buys and how the deal moves. It does not gate the problem, rank needs, or draw a persona.

## Method
Fill the sheet in [template.md](template.md). Do not narrate; fill the lines. Tag every empirical claim `[Fact]` (invoice or observed behaviour), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a guess or an unobserved claim).

**Step 0 — No product, no map.** If the input names no product and no pain — nothing for anyone to buy — do not fill the sheet. Ask the one anchoring question: *what is the one pain, and who feels it daily?* Emit no map and invent no stakeholders until it is answered. Four roles named around an unnamed product are four fictions.

**Step 1 — Name the four roles, one title each.**

| Role | The one question it answers | Passes the test only if… |
|---|---|---|
| User | Who feels the pain and touches the product? | they would notice within a day if it vanished |
| Buyer | Whose budget line does the money leave? | they can name the line item and its size |
| Decision-maker | Who can still say no after everyone says yes? | they hold the final signature or veto |
| Champion | Who spends their own capital to push it through? | they take it to their boss unprompted |

Exactly one title per role. "The ops team" is not a title — name the role that owns the call. If you cannot name a role, mark it **UNFOUND**. An unfound buyer is a hole in the map, not a blank to fill with a guess.

**Step 2 — Pin the budget to the buyer only.**
Only the buyer carries a budget. For the buyer, write the line item, its size, and the evidence rung. For the other three, write "no budget" — correct, not missing. A user with a budget is a buyer wearing a user's coat; re-file them. If the buyer's budget rests on rung 0.1, stop: this is not a buyer yet (see Evidence standard).

**Step 3 — Give each role its own why-now.**
Different roles move for different reasons. One why-now per role, each with an evidence rung.

| Role | Its why-now is usually… |
|---|---|
| User | a pain spike — a new rule, a recent incident, a volume jump |
| Buyer | a budget cycle, a cost target, a redirectable vendor spend |
| Decision-maker | a mandate from above — board, regulator, strategy |
| Champion | a personal win — a number they can own, a fire they got burned by |

A role with no why-now will not move this quarter. Write "none found" — do not invent one to fill the cell.

**Step 4 — The fifth face: who loses if this ships.**
Name the person whose job, status, or judgment the product threatens — often the veteran whose tacit expertise you are codifying. They appear on no "stakeholder" list and they kill deals quietly. One title, what they lose, how they block (procurement delay, security review, silent non-adoption). If every named stakeholder wants the product, you have not found the one who doesn't.

**Step 5 — Collapse check.**
Are any two roles the same person?
- User = buyer is allowed ONLY in a genuine self-serve or prosumer motion — a sole trader, a solo practitioner. Say so explicitly and delete the roles that do not exist above them. Do not mint a "decision-maker" above a one-person business.
- Everywhere else, user = buyer is the classic error: you sold the person who feels the pain and never found the money. Split them.
State, for each collapse, whether it is real (self-serve) or an error (enterprise fantasy), with the reason.

**Step 6 — Path to yes.**
One line: the sequence that closes the deal — champion → buyer (budget line) → decision-maker (signature) — with the fifth face neutralised at a named step. No champion means the path has no first step; name that as the gap, do not paper over it.

**Step 7 — Buyer-clarity feed and verdict.**
Write the one-line input for `problem-quality-scorecard`: the named buyer, reachable in N steps, budget line on rung ___, has or has not bought comparables. Then gate:

| Condition | Verdict |
|---|---|
| Four roles named; buyer has a budget line + why-now on artefact/behaviour/money; champion found; fifth face named | MAP HOLDS |
| Roles named but the buyer's budget or why-now rests on verbal/opinion | THIN MAP — name the cheapest probe to verify the line item and the trigger; buyer-clarity capped at 2 until then |
| User and buyer collapsed with no self-serve justification, OR the "buyer" has no budget line and no why-now | COLLAPSED MAP — not a buyer; buyer-clarity caps at 1; fix before scoring |

**Kill line: a map that collapses user and buyer without a self-serve justification, or names a buyer with no budget line and no why-now, is an auto-fail. A buyer is a budget plus a trigger, not a title.**

## Evidence standard
The budget line and the why-now are where fellows flatter themselves. Weight both on the ladder.

| Signal that "this buyer has budget" | Rung |
|---|---|
| An existing invoice / PO / line item you can redirect (money moved) | 1.0 |
| Observed spend on a comparable (behaviour) | 0.7 |
| A shown budget doc / last year's PO (artefact) | 0.5 |
| "We have budget for this" (verbal) | 0.3 |
| "They can surely find the money" (opinion) | 0.1 |

A buyer whose budget rests only on opinion (0.1) is a `[Hypothesis]`, not a buyer — the map flags it and names the cheapest verification (ask for the line item; ask what they pay the incumbent). The why-now takes the same treatment: a dated, verifiable trigger (a regulation's effective date, an incident report, a budget-cycle month) is behaviour or artefact; "they seem motivated" is opinion (0.1). A *verified absence* — you asked, there is no line item — is honest behaviour-grade evidence for a COLLAPSED verdict, not an opinion cap. Tag every claim `[Fact]`/`[Assumption]`/`[Hypothesis]`. If you catch yourself writing "obviously the CFO would pay," that buyer sits at rung 0.1.

## Gotchas
- The enthusiastic user mistaken for a buyer. The operator who loves the demo holds no budget; their excitement is a 0.3 verbal signal about the pain, not evidence of a buyer. Enthusiasm flows uphill slowly and often dies at the budget line.
- The highest title assumed to be the buyer. "We'll sell to the CFO" names a decision-maker, not a buyer. The budget usually sits a level or two down, on whoever's number the spend actually hits. Trace the line item, not the seniority.
- Champion counted as budget. A champion spends political capital, not money. A loud champion with no budget line is a deal that stalls in procurement. Keep the two rows apart.
- Four fake roles forced onto a solo buyer. The inverse error. On a genuine self-serve sale, inventing a "decision-maker" above a sole trader is as wrong as collapsing user and buyer in an enterprise one. Match the map to the real motion, not to the template's row count.

## Examples
- [examples/sample.md](examples/sample.md) — Barrier Intelligence, worked end to end: rig gas-safety alerts, four distinct roles (permit-issuing operator / HSE manager holding a named process-safety line / offshore installation manager with sign-off / a field safety lead as champion), the fifth face named (the veteran gas tester whose judgment is being codified), buyer budget on the artefact rung, why-now a dated regulator directive, verdict MAP HOLDS, buyer-clarity fed as a 4.

## Related skills
- Absorbs `proto-persona` and `ideal-customer-profile`. Both build one rich portrait of "the customer" — demographics, quotes, JTBD, firmographics. This skill's quarrel: in an enterprise sale the customer is four people with opposed incentives, and the one who feels the pain is not the one who pays. It keeps their single useful bone — name a real, reachable human, never "the market" — and drops the one-portrait fiction. `supersedes: none`: those skills live outside the module and still serve B2C and single-actor cases; this replaces their role inside Icarus for any multi-stakeholder sale.
- Feeds `problem-quality-scorecard`: the Buyer row and its why-now are the direct input to that gate's buyer-clarity dimension. A COLLAPSED map here forces buyer-clarity to 1 there; a MAP HOLDS on a live redirected invoice supports a 5.
- Composes with `unserved-needs-finder` (what the user needs, once you know who the user is), `synthetic-users` (rehearse the pitch against each role before real meetings), and `tacit-knowledge-interview` (the fifth face is usually the tacit-knowledge holder). Hand persona depth or firmographic segmenting back to `proto-persona` / `ideal-customer-profile`.
