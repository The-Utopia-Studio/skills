# Worked example — Mentix, factory-manager needs

Fellow: **Mentix** (industrial AI, factory/plant operations). All numbers and details are illustrative test fixtures, not client data.

**Fellow's question:** "Here's what plant managers need. Which one do we build first?"

## 0. Candidate needs (as stated)
| # | Need as stated | Source | Ladder weight | Tag |
|---|---|---|---|---|
| 1 | "An AI copilot on the floor they can ask anything" | fellow's pitch | 0.1 | `[Hypothesis]` |
| 2 | "Real-time anomaly alerts on every machine" | fellow's pitch | 0.1 | `[Hypothesis]` |
| 3 | "To reduce unplanned downtime" | two shift managers, interview | 0.3 | `[Assumption]` |
| 4 | "When three alarms fire at once, to know which machine gets the one technician on shift" | observed on a live floor; managers keep a hand-written 'which alarm matters' whiteboard | 0.7 | `[Fact]` |
| 5 | "An auto-generated shift report for the plant director" | one manager | 0.3 | `[Assumption]` |

- Segment: shift managers on discrete-manufacturing lines with more machines than on-shift maintenance staff.
- Not all 0.1 → row 4 is observed behaviour. Input is ready, but rows 1–2 are pitch, not need.

## 1. Solution-strip (onion pass 1)
| Stated need | Solution / tech words | Type | The need beneath |
|---|---|---|---|
| 1 "AI copilot" | copilot, AI, "ask anything" | solution | nothing specific beneath yet — it names an interface, not a job. Peel hard in §2. |
| 2 "real-time anomaly alerts" | real-time, alerts, anomaly-detection | tech-capability | act on the right emerging fault early enough to prevent a stop |
| 3 "reduce unplanned downtime" | — (an outcome, not a solution) | outcome | keep the line running through the faults that would otherwise stop it |
| 4 "which machine gets the technician" | — (already a decision) | need | allocate scarce maintenance attention across simultaneous faults |
| 5 "auto-generated shift report" | auto-generated, report | solution | give the director a trusted account of the shift without the manager writing it |

- Pure solution with nothing beneath: #1. A "copilot" is an interface; it carries whatever the real need is. It is not itself a need.

## 2. Onion to core
| Stripped need | why? → | why? → | Core need |
|---|---|---|---|
| act on the right emerging fault early | so a small fault doesn't become a stop | but you can't chase all of them — staff is limited | decide which emerging fault is worth the scarce technician's time now |
| keep the line running through faults | downtime costs output and gets the manager blamed | can't prevent every fault | lose the fewest line-hours given the faults you can't all fix |
| allocate scarce maintenance attention | one tech, several faults, one shift | guessing wrong stops the line | choose where to send limited attention so the costliest stop is the one you prevent |

Rows 2, 3, 4 all ladder into the same core: **choose where to send limited maintenance attention across simultaneous faults so the line-hours you lose are the cheapest ones.** Merge (noted in §5). Row 5 cores to: the manager owns a defensible account of what happened and why they chose as they did.

## 3. Tech-invariance test
| Core need | Still a need if the tech were completely different? | If NO |
|---|---|---|
| Choose where to send limited attention across simultaneous faults | Y — a manager with a clipboard and three ringing alarms has this need exactly | — |
| "Real-time anomaly detection" (row 2, before merge) | N | the *detection speed* is a capability; the next model release does it too. The durable need is the *choice*, not the speed. Discarded as a standalone need. |
| Defensible account of the shift (row 5 core) | Y — a director always wants to know why the line stopped and who decided what | — |

## 4. Kano classification (durable needs only)
| Durable need | Functional (fully met) | Dysfunctional (not met) | Kano class |
|---|---|---|---|
| Alerts they can trust (low false-positive) | neutral — expected | dissatisfied — they ignore the whole system | **must** |
| Choose where to send limited attention (the allocation) | more is better — every good call saves line-hours | worse — a wrong call stops the line | **performance** |
| Defensible account of the shift | delighted — nice to hand up | neutral — they'll write it by hand as always | **delighter** |

## 5. Prioritised need map + selection
| Durable need | Kano class | Unserved-evidence weight | Currently half-met by | Verdict |
|---|---|---|---|---|
| Choose where to send limited attention across simultaneous faults | performance | 0.7 (the hand-written whiteboard) | the manager's gut + a tribal-knowledge whiteboard | **WEDGE** |
| Alerts they can trust | must | 0.3 (managers say current SCADA over-alarms) | SCADA thresholds, ignored when noisy | entry ticket: fix, don't differentiate |
| Defensible account of the shift | delighter | 0.3 | manager writes it by hand | decaying: don't anchor the moat |

Merged: rows 2, 3, 4 → one performance need (noted). Killed: #1 "AI copilot" (interface, not a need); #2 "real-time anomaly detection" as a standalone (capability, fails §3).

## 6. Evidence on the top pick
- The need: choose where to send limited maintenance attention across simultaneous faults so the cheapest line-hours are the ones lost.
- Why it is unserved: the managers maintain a hand-written "which alarm matters" whiteboard because no tool ranks the alarms by cost-of-stop — observed behaviour, 0.7. `[Fact]` The whiteboard is a workaround for exactly the gap.
- Above 0.5 → actionable. To move toward 1.0: price one shift's whiteboard decisions against actual line-hours lost, to show money leaking to wrong calls.

## Read-out
- **The useful unserved need is:** deciding which of several simultaneous emerging faults gets the one available technician, so the line-hours lost are the cheapest ones.
- **It is durable because:** a manager with a clipboard and three alarms has this need with no software at all; a better model changes how well you meet it, not whether it exists.
- **Table stakes (unmet musts):** alerts accurate enough to trust — fix it, but it will not win the account.
- **Do not anchor here (delighters):** the auto-generated shift report — pleasant, copied fast, decaying.
- **Solutions/capabilities killed:** "an AI copilot" (an interface, not a need) and "real-time anomaly detection" (a capability the platform commoditises).
- **The challenge to the fellow:** your two headline needs are the two fake kinds. "Copilot" is a solution and "real-time anomaly detection" is a capability that fails the durability test — build either and you have built something the next model release erodes. The need you can own is the one you did not pitch: the allocation call, evidenced by a whiteboard the managers built themselves. Build the ranked-by-cost allocation, not the copilot.
- **What would change this read:** if pricing the whiteboard shows wrong calls cost little (the faults are cheap, or the tech is rarely the bottleneck), the wedge is thin and the real need may be the trusted alert after all; if managers turn out to trust their gut over any ranking, the allocation need is served by habit and unserved-evidence drops below 0.5.
