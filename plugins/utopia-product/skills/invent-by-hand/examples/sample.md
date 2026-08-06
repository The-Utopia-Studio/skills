# Worked example — Mentix, "AI copilot for factory managers"

Mentix builds industrial AI for plant operations. This is a test fixture: numbers and quotes are illustrative, not real client data.

## Input the fellow brought

"Our idea is an AI copilot for factory managers — they can ask it anything about the plant and it answers. What should we actually build?"

Corpus already mapped by a prior `yoda-data-sourcing` run:
- The plant's alarm-acknowledgement logs: every alarm, who acknowledged it, how long it sat. [Fact] — already flows into Mentix's system. Band P, 0.7.
- The shadow WhatsApp thread where the senior night-shift lead tells the two junior managers which alarms to ignore and which line to walk first ("leave the 9 on line 2, that sensor's been noisy since Tuesday; go to line 4"). [Fact] — Mentix holds 300 exported messages. Band P, 0.5, and it compounds every shift.

## 1. Onion to the invariant core need

| Layer | Statement | Tool/UI word? | Survives 10x tech change? |
|---|---|---|---|
| 0 As stated | "AI copilot for factory managers" | yes ("copilot") | no |
| 1 The job | Answer managers' questions about the plant faster | no | partly |
| 2 The decision | At shift start, decide which of the overnight alarms matter and which line to walk first | no | yes |
| 3 Core need (invariant) | Spend the first 30 minutes of the shift on the right line, before it falls behind | no | yes |

**Core need:** a shift manager must spend the first 30 minutes on the line that matters, before the plant falls behind. That need does not move if the model, the UI, or the sensor stack changes tenfold.

Note what the onion killed: "copilot" and "ask it anything" are a UI, not a need. A Q&A box answers questions; the manager's real problem is *where to walk first*, and they will not stop to type a question at 06:00.

## 2. Diverge — six concepts, keep the strange child

| # | Concept | Type | Carry? |
|---|---|---|---|
| 1 | A chatbot that answers "what's wrong with line 3?" | obvious | no |
| 2 | A ranked digest of overnight alarms by severity | adjacent | no — severity is in the vendor's manual; a competitor ranks the same list |
| 3 | A dashboard of live line status | obvious | no |
| 4 | Predictive-maintenance alerts on the noisiest sensors | adjacent | no |
| 5 | A shift-handover summary auto-drafted from the logs | adjacent | maybe |
| 6 | **A shift-start walk order** that tells the junior manager the exact route the best night lead would walk — and which alarms to ignore — learned from the shadow WhatsApp corrections | **strange** | **yes** |

Concept 6 inverts the obvious. Every other concept *adds* information (more answers, more alerts, more dashboards). The walk order *subtracts*: its main value is telling the junior which nine alarms to ignore. That is the senior lead's tacit triage, and it is the opposite of a copilot that answers everything.

## 3. Anchor to the YODA corpus

| Concept | Corpus row it exploits | Band | Evidence real |
|---|---|---|---|
| 6 Walk order | Shadow WhatsApp corrections (senior lead's ignore-list + walk-first calls) | P | 300 exported messages held. Behaviour observed 0.7 [Fact]. Compounds every shift. |
| 5 Handover summary | Alarm-acknowledgement logs | P | Already ingested. 0.7 [Fact] — but see Step 4 |

## 4. The generic-prompt test

| Concept | The prompt a competitor would type | Model's default answer | Distance | Why unreachable | Survives? |
|---|---|---|---|---|---|
| 1 Chatbot | "Design an AI copilot for factory managers" | A Q&A chatbot over manuals + telemetry | **D0** | — the machine returns exactly this | no |
| 5 Handover summary | "Summarise overnight plant alarms for the next shift" | A severity-sorted summary from the logs | **D1** | the logs alone are structured data a model summarises for anyone; no tacit signal | no |
| 6 Walk order | "Design an AI copilot for factory managers" / "rank plant alarms" | A chatbot, or a severity ranking | **D2** | the walk order encodes *which alarms the senior lead ignores* — a judgment that lives only in the shadow-thread corrections. No public prompt reaches "skip these nine, they're known-noise"; that pattern is in Mentix's 300 messages and nowhere a model can see. | **yes** |

The chatbot the fellow started with is the model's default answer — D0, dead. The walk order survives at D2 for a nameable reason: the senior's ignore-list is tacit, corpus-trapped, and a generic prompt cannot produce "leave the 9 on line 2."

## 5. Sketch by hand

One phone screen at 06:00, before the manager reaches the floor:

```
SHIFT START · Line walk (2 min read)

1 → LINE 4     2 alarms the night lead would act on
2 → LINE 7     1 alarm — bearing temp climbing since 03:00
   SKIP LINE 2  9 alarms, known-noise (sensor flagged Tue)
   SKIP LINE 5  3 alarms, auto-cleared

Tap a line to see why.
```

The manager does not ask a question. They read a route and start walking. The value is as much in the two SKIP rows as in the two walk rows.

## 6. The invented concept + rationale

- **Concept:** at shift start, a manager gets a ranked walk order — which lines to walk first and which alarms to ignore — encoding the best night lead's tacit triage, learned from the shadow-thread corrections.
- **Invariant core need:** spend the first 30 minutes on the right line, before the plant falls behind.
- **Corpus row:** shadow WhatsApp corrections (band P, 0.7, compounds every shift).
- **Why a generic prompt cannot produce it:** the ignore-list is tacit judgment held only in Mentix's 300-message corpus; a competitor's prompt reaches a chatbot (D0) or a severity ranking (D1), never "skip the 9 known-noise alarms on line 2."
- **Status:** `[Hypothesis]`. Unreachable by a competitor's prompt, not yet proven wanted.
- **What would change the view:** if, in a concierge run, junior managers do not change their first-30-minutes route on the walk order — or walk the SKIP lines anyway — the concept is wrong however non-obvious it is.
- **Next:** run `wedge-five-questions` on the smallest adopted slice (the shift-start walk order for one plant's night shift). The shadow-thread corpus is the moat seed for `moat-design-canvas`.

## The lesson the skill enforces

The fellow arrived with the model's default answer — a copilot — and the model would hand the same answer to every competitor. The invention was not more cleverness; it was refusing the D0 concept and mining the one corpus a competitor cannot prompt for. "If a generic prompt could produce it, it isn't yours yet" killed the copilot and kept the strange child.
