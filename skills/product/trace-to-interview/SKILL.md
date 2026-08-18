---
name: trace-to-interview
description: Turns a set of production traces into discovery interviews — recovering, for each behaviour pattern, the discovery question the user answered by acting instead of talking. Fires on "learn from usage", "mine the logs", "what are our production traces telling us", "turn usage data into discovery", "what are users saying in the logs". Outputs a trace-interview log: one card per behaviour pattern with the observed behaviour [Fact, 0.7], the discovery question it answers, the inferred JTBD/satisfaction signal [Hypothesis], distinct-user weight, the confirm-the-why probe, and the cost of the scheduled interview it replaced — routed to continuous-discovery-engine as a feed-2 signal. NOT the AARRR/retention/North-Star scorecard (use metrics-that-matter — that keeps the number; this recovers the question behind it), NOT structuring a recorded human interview transcript (use summarize-interview — that is words at 0.3; this is behaviour at 0.7), NOT standing up the whole three-feed discovery loop and its cadence (use continuous-discovery-engine — this decodes one feed and hands the cards up).
type: generator
supersedes: none
---
# Trace to Interview

## What it does
Reads production traces as interviews that already happened. For each pattern of what users actually did — retried, edited before accepting, exported and left, abandoned at step three — it recovers the discovery question the behaviour answers and the job behind it, then writes it up as an interview card ([template.md](template.md)). The output is a trace-interview log: one card per pattern carrying the observed behaviour `[Fact]` at behaviour-rung 0.7, the discovery question it answers, the inferred JTBD and satisfaction signal `[Hypothesis]`, how many distinct users produced it, the probe that confirms the why, and what the equivalent scheduled interview would have cost. Each card routes to `continuous-discovery-engine` as a feed-2 signal. It is not a funnel, not a metrics dashboard, and not a transcript summary.

## The Icarus reframe
Generic log-mining counts events and draws a funnel: how many, how often, where they drop. That returns metrics, and a metric tells you *what* happened while hiding *why*. The Icarus move is that every production trace is a customer interview that already happened — the user answered a discovery question through behaviour instead of words, for free, with no calendar invite. A retry is the user saying "that wasn't what I meant." An edit-before-accept is "close, but wrong here." An export-then-leave is "I'll finish this elsewhere." The trace is both cheaper *and* more truthful than the interview it replaces: it sits at behaviour 0.7, a rung above what a person *says* they do (verbal 0.3), and its marginal cost is the triage minutes rather than a recruit, an incentive, and two weeks of lead time. That is the exact reason launch is when discovery gets cheap, not when it ends.

## When to use / When NOT
Use it post-launch (or mid-pilot) when you have real production traces and you want to turn usage into discovery findings, not into a chart.

| Situation | Use this? | Go to |
|---|---|---|
| "Mine our logs — what are users telling us?" | Yes | trace-to-interview |
| "Turn our production traces into discovery questions." | Yes | trace-to-interview |
| "What job aren't we finishing? Read it off the usage." | Yes | trace-to-interview |
| "Build the retention curve / North Star / AARRR dashboard." | No | `metrics-that-matter` (keeps the number; this recovers the question) |
| "Summarise this recorded customer interview / transcript." | No | `summarize-interview` (words at 0.3; this is behaviour at 0.7) |
| "Stand up the whole discovery loop — interviews + traces + evals, on a cadence." | No | `continuous-discovery-engine` (this decodes one feed and feeds it up) |
| "Prep and run a live tacit-knowledge interview with an operator." | No | `tacit-knowledge-interview` |

This skill decodes one feed — production traces — into interviews and stops. It does not own the tree, the cadence, or the scorecard. Name the sibling and hand off.

## Method
Fill `template.md` as you go. Do not narrate; fill the cards. Every claim carries a tag: `[Fact]` (what the trace literally shows — a behaviour, always 0.7 or higher), `[Assumption]` (a stated, defensible reading), `[Hypothesis]` (an inferred *why* not yet confirmed). The single discipline of this skill: separate what the user *did* (behaviour, 0.7) from what you think it *means* (inference, ≤ 0.3 until a probe lands).

**Step 1 — Define one trace and pull the set.** State the unit: one session, one task attempt, one agent run, one document produced. State the window and the volume. If the fellow cannot hand over real traces (even ten pasted rows), stop and ask for them. Invent no patterns.

**Step 2 — Segment by behaviour, not by event count.** Group traces by the *shape* of what the user did, not by raw counts. "Retries up 12%" is a metric; "users re-run the same input with reworded parameters until it passes" is a behaviour pattern. This regrouping is the anti-metric move — do it before anything else.

**Step 3 — Decode each pattern to the question it answers.** For every pattern, run it through the decoder. This table is the heart of the skill: it maps a trace signature to the discovery question the behaviour answers.

| Trace signature | What the user is saying `[Hypothesis]` | Discovery question it answers |
|---|---|---|
| Retry / re-run same input, reworded | "that wasn't what I meant" | Where does the product misread intent? |
| Edit-before-accept (measure the tweak-time) | "close, but wrong *here*" | Which part of the output do users not trust? |
| Accept unedited | trust earned — **or** they stopped checking (ambiguous) | Where did we earn trust — or lose their attention? |
| Abandon mid-flow | "you lost me here" | Where is the drop cliff, and what precedes it? |
| Export then leave the session | "I'll finish this elsewhere" | What job does the product not finish? |
| Paste output into another tool | "your output doesn't fit my next step" | What is the seam to the adjacent job? |
| Repeated manual override of a default | "your default is wrong for me" | Which built-in assumption is miscalibrated? |
| Long dwell then no action | stuck — **or** reading carefully (ambiguous) | needs the confirm-the-why probe before it counts |

Do not stop at "the user is saying" — that column is a `[Hypothesis]`. The finding is the *question*, and the card exists to make that question answerable.

**Step 4 — Write one interview card per pattern.** Use the card in [template.md](template.md): observed behaviour `[Fact]` + rung; recovered discovery question; inferred JTBD and desired outcome `[Hypothesis]`; satisfaction signal the trace implies; distinct-user count; the confirm-the-why probe; and the tree edit it proposes.

**Step 5 — Run the ambiguity gate.** Behaviour is 0.7 on *what*; the *why* is inferred and starts at opinion. Where a signature has two honest readings (accept-unedited = trust **or** gave-up; long-dwell = stuck **or** careful), name both and the probe that separates them. Never collapse the ambiguity into the flattering reading. The skill's job is to promote a *why* up the ladder with a probe, not to assert it.

**Why-rung mapping (state it, don't eyeball it).** An un-probed *why* behind a trace is inferred → **0.1 `[Hypothesis]`**. A *why* corroborated by a *second independent* trace or artefact, but with no probe yet landed → **0.3 `[Assumption]`**. A landed confirm-the-why probe, or a money-moved event, takes it to **0.7+**. Map the numeric rung and the word-tag together, and tag two cards resting on the same strength of evidence identically — do not stamp one `[Hypothesis]` and another `[Assumption]` for the same footing.

**Step 6 — Weight by distinct users.** A pattern's strength is its rung times its coverage of the segment. A 0.7 behaviour from one user is a power user, not a finding.

| Distinct users producing the pattern | Treat as |
|---|---|
| 1 | anecdote — name it, do not promote it |
| 2–4 or < 5% of active segment | candidate pattern — probe before acting |
| ≥ 5 and ≥ ~15% of active segment | pattern — safe to route as a finding |

State the distinct-user count on every card. A dramatic pattern from N=1 is trace worship; refuse it.

**Step 7 — Price the interview it replaced.** For each recovered question, state what the equivalent scheduled interview would have cost — recruit + incentive + session + synthesis, roughly 2 hours of effort, an incentive, and a week or two of lead time, for a verbal (0.3) answer — versus the trace, which already happened at 0.7 for the triage minutes. This line is the flywheel made concrete: it shows discovery getting cheaper *and* more truthful as usage accrues.

**Step 8 — Route.** Each card exits as a `continuous-discovery-engine` feed-2 signal (behaviour 0.7, weighted by distinct users). Any card whose *why* is still `[Hypothesis]` also names the probe and hands it to `probe-matrix`.

**Kill line: a trace read as a metric only — "retries up 12%" with no recovered discovery question — fails the skill.** The number is never the finding; the question behind the behaviour is.

## Evidence standard
A trace is behaviour observed, so *what happened* sits at 0.7 the moment it is in the log — a rung above anything a user tells you in an interview (0.3). A trace that is a spend or upgrade event is money moved, 1.0. But the *why* — the job, the intent, the dissatisfaction you read into the behaviour — is inferred, and inference starts at opinion (0.1) and only reaches behaviour-backed confidence once a confirm-the-why probe lands or a second behaviour corroborates it. So every card holds two rungs: 0.7+ on the observed behaviour, and a lower, explicit rung on the interpretation. Done means: patterns segmented by behaviour not counts; each decoded to its discovery question; each *why* tagged `[Hypothesis]` with a named probe; each pattern weighted by distinct users; the replaced-interview cost stated; and every card routed. Kill line: any card that reports a metric without recovering the question, asserts a *why* as 0.7 when only the behaviour is 0.7, or promotes an N=1 anecdote to a finding.

## Gotchas
- **Metric relapse.** The easiest failure is to slide back into counting — "abandonment is 18%" — and call it a finding. A rate is a symptom; the interview is the pattern behind it and the question it answers. If a card has a number but no recovered discovery question, it is not this skill's output.
- **Borrowing the behaviour's rung for the why.** The trace proves the user retried (0.7). It does not prove *why* they retried — that is your `[Hypothesis]` until a probe confirms it. Stamping the interpretation at 0.7 is the subtle lie this skill exists to prevent. Two rungs per card, always.
- **Trace worship.** One vivid trace is one user. A power user who runs forty exports is not forty users, and a spike is not a pattern. Weight every reading by distinct-user coverage; refuse to promote N=1.
- **Reading acceptance as trust.** A 95% accept-unedited rate is the classic flattering misread — it can mean the product is trusted, or that users stopped checking because the stakes feel low, or compliance theatre. Name both readings and the probe (inject a known error, interview five acceptors, check whether accepted outputs get silently corrected downstream) before claiming trust.
- **Optimising the number instead of answering the question.** "Reduce the retry rate" can be achieved by hiding the retry button — which suppresses the interview without ever learning what the retries were telling you. Recover the question first; only then decide whether the behaviour is a defect to remove or a demand to serve.

## Examples
- [examples/sample.md](examples/sample.md) — Azraq's post-launch data-centre risk product: three trace patterns decoded into interview cards (cooling-alert dismissals in <5s = "this alert is noise"; power-feed alerts always opened and exported = "this one goes to my next job"; report accept-unedited at 94% = trust *or* rubber-stamp, ambiguity named with its probe), each weighted by distinct operators, priced against the interview it replaced, and routed as feed-2 signals — the same loop turn `continuous-discovery-engine`'s example consumes.

## Related skills
- `continuous-discovery-engine` — consumes each card as its feed-2 (production-traces, behaviour 0.7) signal. That skill owns the tree, the three feeds, the synthesis owner, and the cadence; this one decodes the trace feed into interviews and hands the cards up. Run this to supply that.
- `summarize-interview` — absorbed and reframed, not superseded. That skill structures a *recorded human interview* (words, verbal 0.3) into JTBD, satisfaction, and action items; this one applies the same JTBD/satisfaction spine to *behaviour* (0.7), reconstructing the interview a trace already is. If the fellow has an actual transcript, route there; if they have logs, use this.
- `metrics-that-matter` — the complement, not the overlap. That skill keeps the number (AARRR, the retention curve that must flatten, cost-per-outcome); this refuses to stop at the number and recovers the discovery question underneath it. Run both: one guards the scorecard, one mines the meaning.
- `probe-matrix` — receives any card whose *why* is still `[Hypothesis]`, and routes it to the cheapest honest probe that would confirm the intent.
- `refine-flywheel` — sets the post-launch cadence (ship behind sign-off → observe → learn → refine); this is the "observe" step's decoder, turning what you observe into questions.
