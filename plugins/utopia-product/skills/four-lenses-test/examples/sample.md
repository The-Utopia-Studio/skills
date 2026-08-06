# Worked example — Barrier Intelligence, gas-alert prioritiser

Fellow: **Barrier Intelligence** (oil & gas safety). All numbers are illustrative test fixtures, not client data.

**Fellow's pitch:** "We should build the gas-alert prioritiser — rank the day's alerts so field crews inspect the real leaks first. It's obviously worth building. Run the four lenses."

Three of the four lenses read strong. The gate still returns NO-GO, because one lens fails and lenses are ANDed, not averaged.

## 0. The concept (exactly one)
> A ranked shortlist that orders the day's gas-safety alerts so a field crew inspects the highest-risk sites first, on a rugged tablet.

## 1. Tool + owner per lens

| Lens | Tool that grades it | Track / owner | Tool run yet? |
|---|---|---|---|
| Desirability | Onion + JTBD + Kano | Discovery — Product leads, Design pairs | Y |
| Usability | Usability observation on the tablet mock | Discovery — Design leads, Product observes | Y |
| Feasibility | Dev spike: rank 200 labelled historical alerts | Delivery — Engineering leads | Y |
| Viability | ICE anchored to the cost of one missed leak | Business — founder leads | Partial |

## 2. Score each lens

### Desirability — 3 PASS
- **Tool output:** core need = catch the true leak before it escalates, not read the whole queue. JTBD = "when alerts stack up, decide which site to drive to first so I don't reach a real leak last." Kano = **performance** (more ranking accuracy = more value) with a **must-have** floor: never bury a true leak.
- **Evidence + weight:** field logs show crews inspect alerts in log order, and on one recorded day a confirmed leak sat 4th in the queue behind three false alarms — behaviour observed, 0.7.  `[Fact]` (observed) · rate `[Assumption]`
- **Score: 3** — the need is real and sits on observed behaviour, not a survey.

### Usability — 1 FAIL
- **Tool output:** task = "open the shortlist and mark the top site inspected" on the tablet mock, gloves on, as in the field. Result = **failed**: 3 of 4 gloved techs mis-tapped the dense rows and opened the wrong site.
- **Evidence + weight:** observed in session, 0.7.  `[Fact]`
- **Score: 1** — the concept as mocked cannot be used by the actual user in the actual conditions.

### Feasibility — 3 PASS
- **Tool output:** riskiest slice = rank real leaks above false alarms. Spike ranked 200 labelled historical alerts; recall on the confirmed-leak subset was ~0.85 against a floor of 0.80 the safety case needs.
- **Evidence + weight:** spike on real data, 0.7.  `[Fact]` (spike result) · the 0.80 floor `[Assumption]`
- **Score: 3** — built, not estimated; cleared the floor. (Autonomy note: a signed, liable inspector still owns every go/no-inspect call, so the machine ranks but does not decide — feasibility is about the ranking, not automation.)

### Viability — 2 CONDITIONAL
- **Tool output (ICE):** Impact = the cost of one missed or late-found leak — large, but not yet priced from Barrier's own numbers. Confidence = 0.3 (the founder's verbal estimate, no invoice). Ease = high (the spike passed).
- **Price check:** no value number yet, so no 10–20% price can be set.  `[Hypothesis]`
- **Score: 2** — plausibly strong, but riding a 0.3 verbal; not a graded pass.

## 3. The gate (AND, never average)
- **Scores: D3 · U1 · F3 · V2**
- **Overall verdict: NO-GO.**
- **Weakest lens:** Usability (FAIL). A concept that gloved field techs cannot operate is not rescued by strong desirability and a passing spike. Three good lenses do not outvote one fatal one.
- Averaging check: "D3+F3+V2 is plenty, ship it" is rejected — the U1 is a NO-GO on its own.

## 4. Next probe per lens
- Usability → redesign for gloved, high-contrast, large-target use; re-run the observation with 5 field techs, gloves on, before anything else.
- Viability → pull one real incident cost (a priced invoice or a settled claim) to lift Impact from a 0.3 verbal to a 1.0 money figure; then set price at 10–20%.
- Desirability, Feasibility → hold at PASS; no further probe needed now.

## 5. One-line verdict
> Gas-alert prioritiser: D3 U1 F3 V2 → NO-GO — blocked by Usability, next probe: re-run the gloved-tablet observation after the large-target redesign.

## 6. What would change this verdict
- A repeat usability session where gloved techs open the correct site unaided flips Usability from 1 to 3. Only then does the gate move off NO-GO — and even then it lands at NOT-YET until Viability's value number is priced. Do not let "it's obviously worth building" paper over either gap; the desirability being strong is exactly why the usability failure is easy to miss.
