---
name: agent-concierge-probe
description: Runbook for having an AGENT run a real task end to end, to measure the automation frontier (which steps it does unaided vs which need a human) and the cost-per-outcome to the cent (input+output tokens + tool calls + human-fix minutes, all priced). Fires on "agent does the task", "measure cost per outcome", "agent concierge", "automation frontier", "price it to the cent", "what can the agent not do unaided". Output: a cost-per-outcome read with the full breakdown, plus a frontier map. Not probe-matrix (that picks the probe); not concierge-probe (the founder, not an agent, runs it, and it tests willingness to pay); not wizard-of-oz-probe; not paper-sketch-probe (that tests whether a workflow reads on paper). It is honest about cost and frontier and says nothing about self-serve UX or trust/adoption — it lies about those.
type: generator
supersedes: none
---

# Agent Concierge Probe

## What it does
You hand a real, already-mapped task to an agent, let it run the task end to end across several outcomes, and instrument every run. Output is two things: the cost-per-outcome priced to the cent, and a frontier map showing which steps the agent does unaided and which a human has to take over. It compresses "is this automatable, and what does one outcome cost" into measured numbers instead of a hunch.

## The Icarus reframe
A generic "can an agent do it?" demo shows one happy-path run and a vibe. This runbook refuses a cost claim without its parts: the read-out must show input tokens, output tokens, tool calls, and human-fix minutes separately, each priced, before it states a cost-per-outcome — a bare "$2/task" is not a result. And it treats the red steps (where a human had to intervene) as the actual finding: those steps *are* the automation frontier, the line the product cannot yet cross. The probe is honest about cost-per-outcome and the frontier. It lies about self-serve UX and about trust/adoption, and it says so in every read-out.

## When to use / When NOT
Use it when the workflow is already mapped (ideally by a concierge run, so you know the exceptions) and you need to know what an agent can do unaided and what one outcome costs.

Do not use it when:
- You have not chosen a probe — that is `probe-matrix`.
- You want to test willingness to pay, or you (the founder) will do the task by hand — that is `concierge-probe`.
- You want to know whether people would *use* or *trust* the thing — this probe lies about both. Adoption and trust need a concierge or field probe.
- You want to fake an interface to test would-they-use-it — that is `wizard-of-oz-probe`.
- You want to test whether a workflow reads / is legible on paper before anyone builds it — that is `paper-sketch-probe`.

## Method
Follow the runbook. Fill `template.md` as you go.

**Step 1 — Take a mapped workflow.** Break the task into discrete steps. If a concierge run already exposed the exceptions, carry them in — the agent will hit them.

**Step 2 — Instrument before you run.** Set the meters and the rates *first*:

| Meter | Unit | Rate (set now) |
|---|---|---|
| Input tokens | per 1M | $__ |
| Output tokens | per 1M | $__ |
| Tool / API calls | per call | $__ |
| Human-fix time | per minute | $__ (loaded rate) |

If you cannot capture human-fix minutes, you cannot run this probe — the human-fix column is where the cost hides.

**Step 3 — Run N outcomes.** N ≥ **5**. One run is anecdote; cost-per-outcome needs a denominator. Log every run, including the ones that failed (a failed run still spent tokens).

**Step 4 — Price it to the cent.** Show the breakdown, then the number.

```
CPO = [ (in_tokens × rate_in) + (out_tokens × rate_out)
        + (tool_calls × rate_call)
        + (human_fix_min × human_rate) ] ÷ successful_outcomes
```

Reporting a cost-per-outcome without the token / tool / human-fix breakdown is the kill line. Expected band from the honesty contract is ~$0.50–5 / task; if your CPO exceeds what a concierge customer paid, flag the inverted economics.

**Step 5 — Map the frontier.** Colour every step:

| Colour | Meaning |
|---|---|
| Green | agent did it unaided, every run |
| Amber | agent did it but needed a retry, reprompt, or verification |
| Red | a human had to take over |

Red steps are the automation frontier. If a red step sits on the critical path, the task is not automatable yet — that is a finding, not a failure.

**Step 6 — Read out against the honesty contract.**

| Honest about | Must NOT claim |
|---|---|
| Cost-per-outcome, to the cent, with breakdown | Self-serve UX — you drove the agent |
| The automation frontier (green / amber / red) | Trust / adoption — not tested here |

## Evidence standard
Done means: ≥5 logged runs, a cost-per-outcome with all four cost components shown and priced, and a frontier map with every step coloured. The measured CPO is `[Fact]`; the claim that it will fall with prompt tuning is `[Hypothesis]`; a green step observed over 5 runs is `[Fact]` for those runs, `[Assumption]` at higher volume. Behaviour beats opinion: the agent actually completing a step (0.7, behaviour observed) outranks a belief that it "should be able to." Trust and adoption are untested and must be tagged `[Hypothesis, not tested]`, never asserted.

## Gotchas
- **The invisible human.** The founder quietly re-runs, edits the output, or fixes a tool call and does not log the minutes. That erases the true cost and paints a red step green. Log every intervention.
- **N=1 costing.** Pricing off one lucky clean run. Failed and retried runs spend real tokens; exclude them and the CPO is fiction.
- **Bare-number costing.** "About $2 a task" with no breakdown is the kill line — it hides where the cost lives and cannot be acted on.
- **Frontier drift into adoption.** "The agent handled 8/10 steps, so operators will trust it." This probe says nothing about trust. Report the frontier; send trust to a concierge or field probe.

## Examples
See `examples/sample.md` — Mentix runs an agent to triage plant maintenance work orders end to end, prices each triaged order to the cent with the full token/tool/human-fix breakdown, and maps the frontier where ambiguous fault codes force a human takeover.

## Related skills
- `../probe-matrix` — the router that sends you here; run it first if unsure.
- `../concierge-probe` — run this first: it gives you the real workflow (and its exceptions) plus the price a customer actually paid, which you compare the CPO against.
- `../wizard-of-oz-probe` — use instead when the question is would-they-use-it-if-it-worked, not what-does-it-cost.
- `../../02-customer-discovery/evidence-ladder` — the rungs the read-out scores against.
- Supersedes nothing. It absorbs the concierge idea and beats the "can an agent do it?" demo by forcing a priced, itemised cost-per-outcome and a frontier map instead of one happy-path run.
