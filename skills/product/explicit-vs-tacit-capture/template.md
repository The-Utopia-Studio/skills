# Explicit/Tacit Ledger

Fill top to bottom. One test decides every row: could a stranger execute it from the words alone? Everything say-able is the explicit half. What resists the words is the tacit half — the moat. Split any rule that hides a judgment inside it. Tag every claim `[Fact]` / `[Assumption]` / `[Hypothesis]`.

---

## 0. Material + decision check

| Field | Fill |
|---|---|
| Expert / role | _[whose expertise this is]_ |
| Recurring decision | _[the call this expertise produces — one a new hire gets wrong]_ |
| Material in hand | _[SOP / manual / rubric / transcript / correction log / completed tacit capture]_ |

> If you can only name a domain with no material and no specific decision, stop. Answer first: *name one recurring decision your expert gets right that a new hire gets wrong, and show me the material — or say there is none.* Do not invent the procedure. If the fellow wants to go and watch the call live, that is `tacit-knowledge-interview`, not this.

---

## 1. Every piece of know-how

Pull each discrete item from the material. Seed from the six seams so you do not stop at the obvious steps. Do not classify yet.

| Seam | Items found (name them or write "none") |
|---|---|
| Stated steps | _[...]_ |
| Thresholds | _[every number / limit / cutoff]_ |
| Checks | _[every verify / confirm / inspect]_ |
| Escalations | _[every if-unsure-escalate]_ |
| Overrides | _[every place the expert deviated from the rule]_ |
| "It depends" moments | _[every usually / unless / you-have-to-look-at]_ |

---

## 2. The ledger

One row per item. A rule that gets overridden is **two rows**: 3a (rule, E) and 3b (override cue, T). Never fold an override inside an E row.

| # | Expertise item | Tell-a-stranger: executes identically from words alone? | Class [E / T] | If T: cue read + the "it depends" condition | Evidence (ladder + tag) | Moat status |
|---|---|---|---|---|---|---|
| 1 | _[item]_ | _[Y/N]_ | _[E/T]_ | _[cue; condition — or "placeholder: you-just-know"]_ | _[e.g. logged corrections — behaviour 0.7 [Fact]]_ | _[commodity / moat piece / needs capture]_ |
| 2 | | | | | | |
| 3a | _[the rule]_ | Y | E | — | _[artefact 0.5 [Fact]]_ | commodity |
| 3b | _[the override the rule hides]_ | N | T | _[cue; condition]_ | _[...]_ | _[moat piece / needs capture]_ |
| … | | | | | | |

Moat status values:
- **commodity** — E row. A model + your published SOP reproduces it. Automate / document, do not defend.
- **moat piece** — T row scored ≥ 0.5 (observed or shown). The defensible product.
- **needs capture** — T row scored < 0.5 (recited or "you just know"). A placeholder → `tacit-knowledge-interview`.

---

## 3. The split test

Confirm the moat did not get buried in the commodity.

- T rows filed correctly (no judgment left inside an E row): _[Y/N]_
- Every rule with an override split into two rows: _[Y/N]_

> If any judgment call sits in the explicit column, or any override is folded inside its rule, the split failed. Go back to Section 2 and split it out.

---

## 4. Verdict

**The moat (captured tacit column, ≥ 0.5):**
1. _[the load-bearing judgment first — the call whose transfer moves the most value]_
2. _[...]_

**The load-bearing tacit judgment (one line):**
> The product must encode **[the call the expert makes instead of the rule]**, cued by **[the perceptible cue]**, except **[the condition that flips it]**. Basis: _[Fact / Assumption / Hypothesis, rung]_.

**The commodity (explicit column):** _[list — a model + your SOP already reproduces these. Automate and document; do not price on them.]_

**The capture backlog (placeholders, < 0.5):** _[each T row resting on "you just know" → route to `tacit-knowledge-interview` to observe.]_

**If the whole ledger is E:** there is little tacit judgment here. Say so. It is a clean automation candidate with a thin moat — do not manufacture forks to look impressive. Name the one tacit sliver, if any, worth capturing.

---

## 5. Handoff

- **Captured moat rows** → the seed for `dataset-builder` (build the labelled set around these, not the commodity) and a P-band row in `yoda-data-sourcing`.
- **Placeholders** → `tacit-knowledge-interview` to observe and lift 0.1 → 0.7.
- **Commodity** → onboarding docs / automation backlog. Not the product's differentiation.
