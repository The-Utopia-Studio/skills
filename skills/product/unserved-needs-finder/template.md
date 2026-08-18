# Unserved needs finder — prioritised need map

Fill every section. Tag empirical claims `[Fact]` / `[Assumption]` / `[Hypothesis]`. A need that still contains a solution word or fails the tech-invariance test in §3 cannot be ranked in §5.

## 0. Candidate needs (as stated — keep the solution/tech words)
| # | Need as stated | Source | Ladder weight | Tag |
|---|---|---|---|---|
| 1 | [verbatim, solution words and all] | [observed / artefact / interview / opinion] | [1.0 · 0.7 · 0.5 · 0.3 · 0.1] | [Fact/Assumption/Hypothesis] |
| 2 | … | | | |

- Segment these needs belong to: [one segment; if "everyone", the needs will over-peel — narrow it]
- If every row = 0.1 → **STOP: input not ready.** Cheapest fix: watch one customer do the job once; note what they reach for when the current tool stops helping.

## 1. Solution-strip (onion pass 1)
Flag the words that name a thing you would build, or a property of that thing. Replace with the need beneath.

| Stated need | Solution / tech words in it | Type (solution / tech-capability) | The need beneath (stripped) |
|---|---|---|---|
| [e.g. "an AI copilot on the floor"] | copilot, AI | solution | [what the copilot would carry — a decision, a lookup] |
| [e.g. "real-time anomaly alerts"] | real-time, alerts | tech-capability | [act on the right emerging fault early enough to matter] |
| … | | | |

- Candidates that are pure solution/capability with nothing beneath yet: [list — these need harder peeling in §2, not a free pass]

## 2. Onion to core
Ladder each stripped need until it names a human decision, outcome, or state — no solution word, not yet a platitude.

| Stripped need | why? → | why? → | Core need (last discriminating layer) |
|---|---|---|---|
| [__] | [__] | [__] | [__] |
| … | | | |

Stop rule: peel until tech-invariant (§3 passes); stop before the need would fit any business on earth.

## 3. Tech-invariance test (the durability gate)
Would each core need still be a need, unchanged, if solved with paper, a clerk, or a model three generations away?

| Core need | Still a need if the tech were completely different? | If NO — the capability still hiding → peel again or discard |
|---|---|---|
| [__] | [Y/N] | [__] |
| … | | |

Any NO → not a durable need. Do not carry it into §4.

## 4. Kano classification (durable needs only)
Two questions per need. Functional: "if this were fully met, how do you feel?" Dysfunctional: "if it were not met at all, how do you feel?"

| Durable need | Functional answer | Dysfunctional answer | Kano class |
|---|---|---|---|
| [__] | [__] | [__] | [must / performance / delighter / indifferent / reverse] |

Mapping: neutral+dissatisfied = **must** · more-is-better+less-is-worse = **performance** · delighted+neutral = **delighter** · neutral+neutral = **indifferent (discard)** · worse+better = **reverse (anti-need)**.

## 5. Prioritised need map + selection
| Durable need | Kano class | Unserved-evidence weight | Currently half-met by | Verdict |
|---|---|---|---|---|
| [__] | [performance] | [0.7 workaround] | [a manual stopgap] | **WEDGE** |
| [__] | [must] | [__] | [__] | entry ticket: fix, don't differentiate |
| [__] | [delighter] | [__] | [__] | decaying: don't anchor the moat |
| [__] | [performance] | [0.3] | [__] | hypothesis: go observe before building |

Selection rule:
- **Return** the durable, **performance-class** need with **unserved evidence ≥ 0.5** → the wedge.
- Unmet **must-have** → entry ticket (fix, do not differentiate).
- **Delighter** → decaying (do not anchor the moat).
- Unserved evidence **< 0.5** → hypothesis (go observe first).
- Two needs with the same core → merge; note the merge, do not double-count.

## 6. Evidence on the top pick
- The need: [__]
- Why it is unserved (the gap): [workaround they use / money leaking to a substitute / recurring failure] · ladder weight [__] · `[Fact | Assumption]`
- If weight < 0.5 → the single cheapest observation to confirm the gap: [__]

## Read-out (one line each)
- **The useful unserved need is:** [__].
- **It is durable because:** [it survives the tech changing — state the invariance, e.g. "the go/no-go exists on paper, on radio, on any model"].
- **Table stakes (unmet musts to fix, not win on):** [__].
- **Do not anchor here (delighters):** [__].
- **Solutions/capabilities killed on the way:** [__ — the disguised needs you removed].
- **What would change this read:** [observing the workaround confirms or breaks the gap; if the "need" dissolves when the tech changes, it was a capability all along].
