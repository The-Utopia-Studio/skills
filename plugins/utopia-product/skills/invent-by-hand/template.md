# Invent by Hand — concept + rationale

Invent before the machine. The concept is a `[Hypothesis]` throughout; only the core need and the corpus anchor carry evidence. The rule that gates everything: **if a generic prompt could produce it, it isn't yours yet.**

## 1. Onion to the invariant core need

Peel the stated idea until the need underneath survives a 10x change in the underlying technology. If the need still contains a tool/model/UI word ("copilot", "dashboard", "app", "chatbot"), keep peeling.

| Layer | Statement | Tool/model/UI word in it? | Survives a 10x tech change? |
|---|---|---|---|
| 0 As stated | _[the idea in the fellow's words]_ | _[y/n]_ | _[y/n]_ |
| 1 The job | _[what work it does]_ | _[y/n]_ | _[y/n]_ |
| 2 The decision | _[the choice the user makes]_ | _[y/n]_ | _[y/n]_ |
| 3 Core need (invariant) | _[the need that does not move]_ | no | yes |

**Core need (the launchpad):** _[one sentence — no tool, no model, no UI]_

> If you cannot name a real decision a real person makes: stop. This is a domain, not an idea. Ask *what recurring decision, made by whom, do you want to change?* and go get the answer. Invent nothing.

## 2. Diverge — at least six, keep the strange child

Generate against the core need. Do not converge. Carry ≥2 forward, including ≥1 strange child (an inversion of the obvious: fewer not more, subtract not add, say-no not answer).

| # | Concept (one line) | Obvious / adjacent / strange | Carry forward? |
|---|---|---|---|
| 1 | _[the first thing everyone thinks of]_ | obvious | _[y/n]_ |
| 2 | _[…]_ | _[…]_ | _[…]_ |
| 3 | _[…]_ | _[…]_ | _[…]_ |
| 4 | _[…]_ | _[…]_ | _[…]_ |
| 5 | _[…]_ | _[…]_ | _[…]_ |
| 6 | _[the strange child — an inversion]_ | strange | _[y/n]_ |

## 3. Anchor each survivor to the YODA corpus

Every carried concept must exploit one specific band-P row from `yoda-data-sourcing`. No anchor → not eligible.

| Concept | Corpus row it exploits | Band | Evidence the corpus is real (ladder + [Fact]/[Assumption]) |
|---|---|---|---|
| _[…]_ | _[e.g. shadow-thread corrections; incident ledger; exception history]_ | P | _[≥0.5 to count — a held sample or observed flow]_ |
| _[…]_ | _[…]_ | _[…]_ | _[…]_ |

> An anchor at 0.1 ("I'm sure that data exists") is a sourcing task, not an anchor. Route to `yoda-data-sourcing` before proceeding.

## 4. The generic-prompt test

For each survivor, write the actual prompt a competitor with no proprietary data would type. Only D2 survives.

| Concept | The one-line generic prompt a competitor would type | Model's default answer | Distance (D0/D1/D2) | Why unreachable (corpus row / inversion — specific) | Survives? |
|---|---|---|---|---|---|
| _[…]_ | _["design an AI tool for X to do Y"]_ | _[the average answer]_ | _[D0/D1/D2]_ | _[the exact reason, or "—" if D0/D1]_ | _[y/n]_ |
| _[…]_ | _[…]_ | _[…]_ | _[…]_ | _[…]_ | _[…]_ |

Distance bands:
- **D0 reachable** — the prompt's default answer *is* this concept. Commodity. Kill it.
- **D1 variant** — a tweak the model would also suggest. Not yours yet; push further or anchor harder.
- **D2 unreachable** — no generic prompt reaches it, for a nameable reason (corpus / inversion). Yours.

> If nothing reaches D2, the honest output is *this isn't yours yet*. Return to §2 with the corpus in hand. Do not promote a D1.

## 5. Sketch by hand

One concrete artefact for the surviving concept — one screen, one interaction, or the thing the user holds. By hand, no code. Enough to react to, not a prototype.

```
[ sketch / described screen / described interaction ]
```

> Want a clickable prototype? That is `first-mocks` (section 05), not this step.

## 6. The invented concept + rationale

- **Concept (one sentence):** _[what it is]_
- **Invariant core need it serves:** _[from §1]_
- **Corpus row it exploits:** _[from §3 — band P, evidence ≥0.5]_
- **Why a generic prompt cannot produce it:** _[the D2 reason — the specific corpus signal or inversion]_
- **Status:** `[Hypothesis]` — unreachable by a competitor's prompt, not yet proven wanted.
- **What would change the view (cheapest kill):** _[the one probe observation that would kill this direction — e.g. "users do not change the shift-start decision on the walk-order"]_
- **Next:** run `wedge-five-questions` on the smallest adopted slice of this concept. The corpus row above is also the moat seed for `moat-design-canvas`.

## Self-check before you ship

- [ ] The core need has no tool/model/UI word and survives a 10x tech change.
- [ ] At least six concepts diverged; at least one strange child was tested, not just listed.
- [ ] The chosen concept is anchored to a real band-P corpus row (evidence ≥0.5), not an assumed one.
- [ ] The chosen concept is **D2** with a specific, nameable reason — not D0/D1.
- [ ] The concept is tagged `[Hypothesis]`; nothing here is scored as validated.
- [ ] If any check fails: the kill line fires. Name what is missing and route (§2 divergence, or `yoda-data-sourcing`).
