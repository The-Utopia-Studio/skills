# Physics Floor Gap — calc sheet

Fill every line. Tag every number `[Fact]` / `[Assumption]` / `[Hypothesis]`. Do not return a verdict with the floor lines blank — that is an auto-fail.

## Shared assumption block (state and date it)
- 2026 inference price: ~$5 / 1M input tokens, ~$15 / 1M output tokens `[Assumption]`
- FX: ~£1 = $1.25 `[Assumption]`
- Model / date this floor was computed against: __________  `[Assumption]`

---

## 1. Unit of work
- **Unit:** [one _____ — e.g. one site risk report]
- **Frequency:** [how often — e.g. 160 / year]  `[Fact | Assumption]`

## 2. Floor part A — token/compute cost of the automatable portion
- Automatable portion: [what the model does — retrieval / draft / match / format]
- Tokens: [___ input] + [___ output]
- Cost: input ___ × $5/1M + output ___ × $15/1M = $____ → **A = £____**  `[Assumption]`

## 3. Floor part B — irreducible human judgment
- The minutes that cannot be removed: [the call a human must sign / the exception only a person can adjudicate]
- Minutes: [___ min]  (if exception-based, amortised: ___% × ___ min = ___ min/unit)
- Loaded rate: £[___]/hr  `[Assumption]`
- **B = [___ min] ÷ 60 × £[___]/hr = £____**  `[Assumption]`

## 4. Floor
- **Floor = A + B = £____ + £____ = £______**

## 5. Current priced practice
- What one unit costs today: [loaded labour × observed time] OR [price paid]
- **Current = £______**
- Source: [invoice / rate card / timed workflow / verbal / opinion]
- Evidence-ladder weight: [1.0 money · 0.7 behaviour · 0.5 artefact · 0.3 verbal · 0.1 opinion]  `[Fact | Assumption]`
- If weight = 0.1 → **STOP: input not ready.** Cheapest way to get the real number: [pull one invoice / time one unit].

## 6. Gap ratio
- **Gap = Current ÷ Floor = £____ ÷ £____ = ____×**

## 7. Band verdict

| Gap ratio | Band | Verdict |
|---|---|---|
| < 10× | No room | Walk away |
| 10–20× | Thin | Marginal — only with volume or upmarket rate |
| 20–100× | Real prize | Build |
| > 100× | Suspicious | Stop — find the under-counted judgment or the hidden constraint |

- **This unit lands at ____× → band: ________ → verdict: ________**
- If > 100×: the hidden constraint / under-counted judgment is: ____________
- What would change this verdict: [next model release drops A / a timed workflow revises Current / B is re-counted]
