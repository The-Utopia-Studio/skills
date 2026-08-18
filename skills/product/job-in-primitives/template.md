# Job in primitives — spec sheet

Fill every section. Tag empirical claims `[Fact]` / `[Assumption]` / `[Hypothesis]`. A primitive line in §2 that still contains a proper noun, product, or role is an auto-fail — see §5.

## 0. The job in the customer's words (raw — keep the tool/role language)
> [Paste or describe the job exactly as the fellow/customer says it. Do not clean it up. Vendor names, team names, and steps all stay in.]

- Source of this description: [observed instance / completed artefact / interview / opinion]
- Evidence-ladder weight: [1.0 money · 0.7 observed instance · 0.5 artefact · 0.3 interview · 0.1 opinion]  `[Fact | Assumption]`
- If weight = 0.1 → **STOP: input not ready.** Cheapest fix: [observe one real run / pull one completed artefact].

## 1. Kill-list — delete every proper noun, product, tool, vendor, team, role, place
Replace each with its FUNCTION, not its category ("a CRM" is still a tool).

| Word in §0 | Type | Replaced with (function, generic) |
|---|---|---|
| [e.g. ServiceNow] | tool | [a record of open incidents] |
| [e.g. "the risk team"] | team/role | [an accountable analyst] |
| [e.g. "the HSE"] | regulator | [the regulator] |
| … | | |

- Words that cannot be generified without losing the job (usually point at the liability primitive, not a tool): [list, or none]

## 2. The three primitive lines (tool-free — no word from §1 may appear)
- **Information moved:** [from what → to what, and the transformation: raw signal → judgment / claim → verdict / two records → a match]
- **Decisions made:** [the actual choice + its branches — the irreducible go/no-go, accept/reject, stop/run]
- **Liability transferred:** [who is on the hook, for what, by what mechanism — signature / contract / statutory duty / payment released]

## 3. Invariance test
Would each line still be exactly true if every tool named in §0 vanished tomorrow?

| Primitive | Invariant? | If NO — the tool assumption still hiding in the line |
|---|---|---|
| Information moved | [Y/N] | [__] |
| Decisions made | [Y/N] | [__] |
| Liability transferred | [Y/N] | [__] |

Any NO → the line still describes the tool, not the job. Fix it before §4.

## 4. What AI eats vs what stays
| Primitive | AI's reach | This job's read |
|---|---|---|
| Information moved | eats it | [table stakes — who else already does this movement?] |
| Decisions made | eats the routine, not the tail | [the wedge — which decisions are routine, which are the exceptions a human keeps?] |
| Liability transferred | cannot take it | [the moat — is the liability real and load-bearing, or habit?] |

## 5. Kill-line check (auto-fail gate)
Scan §2 for any surviving proper noun, product name, or org-chart role.
- Survivors: [none / list them]
- If any survive → **REDUCTION FAILED.** You have restated the workflow, not the job. Re-run §1 and rewrite §2.

## 6. Evidence on the liability line
The liability primitive is the one fellows guess at. State its source.
- Who is on the hook: [named role, abstracted]
- Mechanism that makes it load-bearing: [a clause / a signature that gates money / a statutory duty]
- Evidence it is real: [contract / observed sign-off gating work / regulation cited] · ladder weight [__]  `[Fact | Assumption]`
- If the only evidence is opinion (0.1): **liability primitive UNVERIFIED** — find the sign-off, the clause, or the payment it gates before treating it as the moat.
- Moat check on a *described* (not observed) sign-off: a defensibility/"moat" claim does not count until it is money-anchored — the sign-off must gate a payment, a paid invoice, or a priced contract you can point to. A described sign-off with no money behind it is habit, not a moat.

## Read-out (one line each)
- **The primitive job is:** [move ___ so that ___ decides ___, and ___ is on the hook if it is wrong].
- **AI eats:** [the information movement + the routine decisions].
- **Stays human / stays yours:** [the liability line + the decision tail].
- **What would change this read:** [observing the job once revises the decisions/liability split; a shown contract confirms or breaks the liability line].
