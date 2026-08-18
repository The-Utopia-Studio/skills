# Worked example — Barrier Intelligence gas permit-to-work

Fellow: **Barrier Intelligence** (oil & gas safety). All numbers and details are illustrative test fixtures, not client data.

**Fellow's question:** "We want to build a product around the permit-to-work. What's the actual job under it?"

## 0. The job in the customer's words (raw)
> "Before anyone opens a gas line, a field technician checks the isolation valves and takes gas readings, fills out a permit-to-work in our app, and the site's authorised gas engineer reviews it and signs it off. Only then can work start. If it's wrong and there's a release, the engineer who signed is the one the HSE comes for."

- Source: one observed permit run on a live site, plus the completed permit artefact.  `[Fact]`
- Evidence-ladder weight: 0.7 (observed instance) reinforced by 0.5 (artefact shown). Above the 0.1 floor → input is ready.

## 1. Kill-list
| Word in §0 | Type | Replaced with (function) |
|---|---|---|
| "our app" | product | a permit record |
| "field technician" | role | a person on site capturing the hazard state |
| "authorised gas engineer" | role | an accountable signer |
| "the site's" | place | the operating site |
| "HSE" | regulator | the regulator |

- Cannot be generified without losing the job: **"authorised"** — the accreditation is not a tool, it is part of the liability mechanism. It survives into §2's liability line on purpose, as a property of the signer, not as a proper noun.

## 2. The three primitive lines (tool-free)
- **Information moved:** the physical hazard state of a task (valve isolation + gas concentration at the workface) → a bounded assertion that this specific task is safe to start right now.
- **Decisions made:** is it safe to open this line at this moment — go / no-go — given the current isolation and gas readings.
- **Liability transferred:** an accredited signer stakes their name and their licence on the go decision; if a release follows, the regulator holds that named individual personally accountable.

## 3. Invariance test
| Primitive | Invariant? | If NO |
|---|---|---|
| Information moved | Y | hazard state → safe-to-start is true with the app gone |
| Decisions made | Y | the go/no-go exists on paper, on radio, on any medium |
| Liability transferred | Y | statutory accountability sits on the person, not the tool |

All three survive the tools vanishing. Reduction holds.

## 4. What AI eats vs what stays
| Primitive | AI's reach | This job's read |
|---|---|---|
| Information moved | eats it | Table stakes. Auto-reading valve state and populating the permit is worth little on its own — anyone can build it. |
| Decisions made | eats the routine, not the tail | The wedge. A clean, well-isolated line with stable readings is a routine go the machine can pre-clear; the ambiguous case (drifting sensor, partial isolation) is the tail a human keeps. |
| Liability transferred | cannot take it | The moat. A model holds no accreditation, cannot be struck off, cannot be prosecuted. This primitive cannot move to AI at all. |

## 5. Kill-line check
- Survivors in §2: none. "Accredited signer" and "the regulator" are functions, not proper nouns; "authorised/accredited" is a property of the liability mechanism, flagged in §1.
- Result: **PASS.**

## 6. Evidence on the liability line
- Who is on the hook: the accredited signer (an individual, not the firm).
- Mechanism: statutory duty under gas-safety regulation; the observed run showed the sign-off gates whether work starts.
- Evidence it is real: observed sign-off gating work (behaviour, 0.7).  `[Fact]` Barrier's next step is to cite the specific regulation and confirm the accountability sits on the individual signer, which moves this toward `[Fact]` at 1.0.

## Read-out
- **The primitive job is:** move the hazard state of a task to a point where someone can decide it is safe to start, where an accredited signer is personally on the hook if that decision is wrong.
- **AI eats:** capturing the hazard state, populating the record, and pre-clearing the routine go.
- **Stays human / stays yours:** the ambiguous go/no-go tail, and the accredited signature — which AI cannot take.
- **The challenge to the fellow:** the instinct is "automate the permit". But the information-movement is table stakes and the signature is a primitive AI cannot move. So the product cannot be "the app replaces the signer". The defensible product is "make the accredited signer faster and give them a defensible trail, and pre-clear only the routine gos" — building anything that tries to automate away the signature attacks the one primitive that can never leave a human.
- **What would change this read:** if observation shows the ambiguous tail is rare (say <5% of permits), the wedge is thin and the product is mostly the trail; if the accountability turns out to sit on the firm, not the individual, the moat weakens and the liability line must be rewritten.
