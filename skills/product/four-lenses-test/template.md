# Four-Lens Scorecard — fill-in

One concept, four build-risk lenses, each graded ONLY by its named tool, then ANDed.
Two auto-fails: (a) a lens given a PASS with no tool run / on opinion; (b) an overall GO while any lens sits at FAIL.
Tag every claim `[Fact]` / `[Assumption]` / `[Hypothesis]`.

## 0. The concept (exactly one, as the fellow said it)
> [one concrete line — if there is no concept yet, STOP and ask; do not lens a fog]

## 1. Tool + owner per lens (fill before scoring)

| Lens | Question | Tool that grades it | Track / owner | Tool run yet? |
|---|---|---|---|---|
| Desirability | Want it enough to change behaviour / pay? | Onion + JTBD + Kano | Discovery — Product leads, Design pairs | [Y / N] |
| Usability | Get the outcome without help? | Usability observation (watch a user on a prototype) | Discovery — Design leads, Product observes | [Y / N] |
| Feasibility | Build it at the accuracy / latency / cost needed? | Dev spike on the riskiest slice | Delivery — Engineering leads | [Y / N] |
| Viability | Value captured > cost to serve? | ICE, Impact = measured value, Confidence = evidence weight | Business — Product / founder leads | [Y / N] |

Discovery track (D, U) and delivery track (F) run in parallel. Any "N" above → that lens is UNGRADED until the tool runs.

## 2. Score each lens (0–3; a lens with no tool run = 0)

### Desirability
- **Tool output:** core need = [___]; JTBD = [___]; Kano class = [must / performance / delighter / indifferent]
- **Evidence + weight:** [behaviour / money / artefact / verbal / opinion] → [1.0 / 0.7 / 0.5 / 0.3 / 0.1]  `[Fact | Assumption | Hypothesis]`
- **Score:** [3 PASS / 2 CONDITIONAL / 1 FAIL / 0 UNGRADED]

### Usability
- **Tool output:** task observed = [___]; result = [succeeded / failed / needed help]
- **Evidence + weight:** [observed 0.7 / stated preference 0.3 / opinion 0.1]  `[Fact | Assumption | Hypothesis]`
- **Score:** [3 / 2 / 1 / 0]

### Feasibility
- **Tool output:** riskiest slice = [___]; spike result vs the floor = [hit / missed / not built]
- **Evidence + weight:** [spike on real data 0.7 / spike shown 0.5 / engineer opinion 0.1]  `[Fact | Assumption | Hypothesis]`
- **Score:** [3 / 2 / 1 / 0]

### Viability
- **Tool output (ICE):** Impact = [measured value, sourced]; Confidence = [evidence weight of that value]; Ease = [from spike]
- **Price check:** proposed price = [___] = [__]% of measured value (target 10–20%)
- **Evidence + weight:** [money 1.0 / artefact 0.5 / verbal 0.3 / opinion 0.1]  `[Fact | Assumption | Hypothesis]`
- **Score:** [3 / 2 / 1 / 0]

## 3. The gate (AND, never average)

| Any lens at… | Verdict |
|---|---|
| 1 (FAIL) | **NO-GO** — kill or reframe; the failing lens names the fix |
| 0 (UNGRADED) | **BLOCKED** — run the missing tool |
| 2 (CONDITIONAL) | **NOT-YET** — name the probe that lifts it to 3 |
| all four = 3 | **GO** |

- **Scores: D_ · U_ · F_ · V_**
- **Overall verdict:** [GO / NOT-YET / BLOCKED / NO-GO]
- **Weakest lens (what blocks the go):** [___]
- Averaging check — did any strong lens get used to excuse a weak one? [no; the gate is AND]

## 4. Next probe per lens (every lens below 3)
- Desirability → [the behaviour/money to observe]
- Usability → [the session to run]
- Feasibility → [the spike to build]
- Viability → [the value number to price]

## 5. One-line verdict
> [Concept]: D_ U_ F_ V_ → [GO / NOT-YET / NO-GO] — blocked by [weakest lens], next probe: [___].

## 6. What would change this verdict
- [the single result — a passed usability re-test, a spike that hits the floor, a priced value number, an observed behaviour — that would flip the blocking lens]
