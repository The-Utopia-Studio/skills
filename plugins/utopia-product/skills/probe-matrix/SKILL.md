---
name: probe-matrix
description: >-
  Design the cheapest honest experiment to validate an idea before building. Use when the user asks
  how to test or validate an idea cheaply, to design lean startup experiments, pretotypes, a fake
  door, landing page, concierge or Wizard of Oz test, for an XYZ hypothesis, or which experiment or
  probe to run. Picks one question, writes it as an XYZ hypothesis ('at least X% of Y will Z'), routes
  it to the cheapest probe that is HONEST about it (paper sketch, Wizard-of-Oz, concierge,
  agent-concierge, or a fake-door pretotype for raw demand), states what that probe still lies about,
  its cost, and a pre-registered pass/fail; it refuses a probe that lies about the thing being tested.
  Not for the how-to of running one probe (use paper-sketch-probe, wizard-of-oz-probe, concierge-probe
  or agent-concierge-probe), building a clickable mock (use first-mocks), or scoring a signal already
  in hand (use evidence-ladder).
type: interactive
supersedes: none
---

## What it does

Turns "how do I test this cheaply?" into one decision: the single question you
most need answered, matched to the cheapest probe that can answer it *honestly*.
It picks from four probes — paper/sketch, Wizard-of-Oz, concierge,
agent-concierge — writes down what the chosen probe will still lie about, and
pre-registers the pass/fail read-out before you run. If you already picked a
probe and it lies about the thing you want to learn, the skill kills it and names
the honest one. Then it hands you to the matching runbook for the how-to.

## The Icarus reframe

The generic fidelity ladder picks a probe by how much you want to build — paper,
clickable, coded, MVP — as if the only question were cost. That is the wrong axis.
Every probe is honest about some questions and lies about others, and the honesty
is fixed by the highest evidence rung the probe can legitimately produce: a paper
sketch tops out at a comprehension read (0.5), so it *cannot* tell you about
trust, which is behaviour under real stakes (0.7); a Wizard-of-Oz produces real
usage behaviour toward a faked backend, so it lies about feasibility and unit cost;
a concierge collects real money and the real workflow but lies about scale. This
skill routes by that honesty, not by cost — cheapest *honest* probe wins — and its
sharp move is the refusal: it will not recommend a probe that lies about the very
thing you are trying to learn, and it tells you which probe to run instead. A probe
you cannot trust to answer the question is more expensive than the one that costs
more and does.

## When to use / When NOT

Use it when you have a claim you are unsure of and want to know the cheapest honest
way to move it up the evidence ladder — before you build.

Do not use it for these — hand off instead:

| If the fellow wants… | Use instead |
|---|---|
| The step-by-step to actually run a probe (tooling, scripts, human ops) | the runbook: `paper-sketch-probe`, `wizard-of-oz-probe`, `concierge-probe`, or `agent-concierge-probe` |
| A build / no-build decision on the problem itself | `problem-quality-scorecard` |
| To score a signal already in hand (an interview quote, a click, a payment) | `evidence-ladder` |
| To reframe a solution-in-disguise back into a problem | `problem-statement`, then return here |
| Every risky assumption mapped across value / GTM / strategy / team | `identify-assumptions-new` |
| A clickable mock or Crazy 8s artefact to provoke a reaction | `first-mocks` |

This skill selects the probe and pre-registers the read-out. It does not run the
probe, does not gate the problem, and does not score signals you already have.

## Method

Fill in `template.md`. Six steps.

**Step 1 — Extract the ONE question.** One testable question about one unknown.
If the fellow lists three, rank by riskiest-assumption-first (probability wrong ×
cost if wrong) and take the top one. Reject "test the idea" and "see if it works" —
too broad to route. A question that names a solution ("test whether the mobile app
works") is a solution-in-disguise: reframe to the underlying job first
(`problem-statement`), then return.

**Step 2 — Classify the learning target.** Match the question to one row. This is
what the question is really asking about.

| Target | The question is really asking… | Evidence rung the answer needs |
|---|---|---|
| A — Legibility | Is the workflow legible? Where does the real decision sit, and who acts on the output? | artefact comprehension (0.5) |
| B — Pull | Would they use it if it worked? Is the promise compelling enough to pull action? | behaviour toward the promise (0.7) |
| C — Pay & workflow | Will they pay? What is the real workflow, including the exceptions that break it? | money (1.0) + behaviour (0.7) |
| D — Automation & cost | Can an agent actually do the task, and what does one outcome cost to the cent? | cost, money-grade (1.0) + automation-frontier behaviour (0.7) |
| E — Trust & adoption | Do they trust it? Will they adopt it and change how they work? | behaviour under real stakes, over time (0.7 →) |
| F — Feasibility & scale | Is it feasible? Does it hold at volume? Real unit cost at scale? | behaviour of the real system at load (0.7) |

**Step 3 — Read the honesty contract and pick the cheapest honest probe.** The
contract is fixed. The top rung column is why each probe is honest or not: a probe
lies about any claim that needs a rung higher than it can produce.

| Probe | Cost | Honest about | Lies about | Top rung it can produce |
|---|---|---|---|---|
| paper / sketch | ~$0, 30 min | workflow legibility; where the decision sits | how it feels to use; real demand; trust | comprehension / verbal (0.5 / 0.3) |
| Wizard-of-Oz | ~$200, 1 day | would-they-use-it-if-it-worked | feasibility; unit cost; scale | behaviour toward a faked backend (0.7) |
| concierge (founder does it by hand) | founder time | willingness to pay; the real workflow incl. exceptions; trust under real stakes | scale; self-serve UX | money + real-stakes behaviour (1.0) |
| agent-concierge (an agent runs the task) | ~$0.50–5 / task | automation frontier; cost-per-outcome to the cent | self-serve UX; trust / adoption | cost, money-grade (1.0 on cost) |

Map target → cheapest honest probe:

| Target | Cheapest honest probe | Probes that LIE about it — do not use |
|---|---|---|
| A — Legibility | paper / sketch | — |
| B — Pull | Wizard-of-Oz | paper (no real pull; lies about demand) |
| C — Pay & workflow | concierge | paper, Wizard-of-Oz (both simulate; neither takes real money or surfaces real exceptions) |
| D — Automation & cost | agent-concierge | paper, Wizard-of-Oz, concierge (all hide the real per-task cost and the automation limit) |
| E — Trust & adoption | concierge, then field pilot | paper (lies about trust), Wizard-of-Oz (simulated stakes), agent-concierge (human buffer hides adoption) |
| F — Feasibility & scale | none of the four — coded spike / load test (out of probe scope); use agent-concierge only for per-task cost | paper, Wizard-of-Oz (WoZ explicitly lies about feasibility, unit cost, and scale) |

For target F, say so plainly: no cheap probe is honest about feasibility or scale.
Do not fake it with a probe that will lie. Name the smallest real build track
instead, or narrow the question to a sub-part a probe *can* answer honestly (e.g.
per-task cost via agent-concierge).

For target B on a brand-new product where the only question is raw click-demand
for a promise (not trust, not use), a fake-door / landing page / waitlist / pre-order
pretotype is an acceptable cheap read: a pre-order or deposit is skin-in-the-game
(money, 1.0); a sign-up or click is behaviour toward a promise but tops out below
use (treat as 0.5). It lies about use, trust, feasibility and cost — say so.

**Step 4 — Kill check.** If the fellow already named a probe, look it up in the
"lies about" column for their target. If it lies about the target, KILL it: name
exactly what it lies about, name the rung the question needs vs the rung that
probe tops out at, and reroute to the cheapest honest probe. This is the kill line —
recommending or endorsing a probe that lies about the thing being tested is a fail.

**Step 5 — Pre-register the pass/fail read-out.** Write the claim as an XYZ
hypothesis (Alberto Savoia, *The Right It*): "At least **X%** of **Y** [a specific
target segment] will **Z** [a concrete behaviour]" — e.g. "at least 30% of the 10
shift supervisors will act on the alert within 15 minutes on a live shift." X is the
threshold, Y is who you recruit, Z must be behaviour or money, never stated interest.
Use your own data (YODA), not others' market reports, to set and judge X.
Then write the threshold before you
run, and state which evidence rung a pass moves the claim to. The read-out must land
on behaviour or money. "Operators said they trust it" is verbal (0.3) and is not a
valid trust read-out; "operators acted on the alert within N minutes, unprompted,
on M of the last shifts" is behaviour (0.7) and is. No moving the goalposts after.

**Step 6 — Route to the runbook.** Hand the plan to the matching runbook skill for
the how-to. probe-matrix stops at selection + read-out; it does not operate the
probe.

## Evidence standard

A probe exists to move one claim up the ladder — money 1.0, behaviour 0.7,
artefact 0.5, verbal 0.3, opinion 0.1 — and its honesty is capped by the top rung
it can produce (Step 3). The read-out must be pre-registered on behaviour or money;
an opinion or verbal read-out does not count as a passed probe, however warm. The
skill's own bar: it may only recommend a probe whose top rung reaches the rung the
question needs. **Kill line — recommending a probe that lies about the thing being
tested is an auto-fail.** Tag every empirical claim `[Fact]`, `[Assumption]`, or
`[Hypothesis]`. If the honest answer is "no cheap probe reaches this rung" (target
F), say that; do not launder a dishonest probe into a false green light.

## Gotchas

- **Trust is not demand.** A fake-door or landing page measures click-demand and
  lies about trust exactly as a paper sketch does — both top out below the
  behaviour-under-stakes rung trust needs. When the question is "will they trust /
  adopt it," route to concierge or a field pilot, never a paper or landing probe,
  no matter how cheap.
- **Cheapest ≠ honest.** The router picks the cheapest *honest* probe, not the
  cheapest probe. If paper is $0 but lies about the target, its real cost is a wrong
  answer you will act on. Do not let the price column win Step 3.
- **Wizard-of-Oz feasibility trap.** A WoZ that "works" tempts the fellow to claim
  the thing is buildable. It is not evidence of that — the backend was human. WoZ is
  honest about pull, and lies about feasibility, unit cost, and scale. Keep those
  claims out of the read-out.
- **One question, one probe.** A fellow with three questions wants three probes and
  a month. Force the single riskiest question (Step 1). Routing a probe against a
  bundle produces a read-out that answers none of them cleanly.
- **Don't over-escalate the mundane.** When the real question is legibility, paper
  is the correct answer and the whole job. Do not talk the fellow up a rung into a
  WoZ or concierge for a question a 30-minute sketch answers honestly.
- **The obvious pick still owes you a lie.** On a mundane question the probe choice
  is uncontroversial (legibility → paper), so the "lies about" line feels redundant
  and gets left thin or blank — and that is exactly where it is dropped most. Even
  for the obvious probe, still state what it lies about. The honesty contract earns
  its keep when the choice is easy, not only when it is contested.

## Examples

`examples/sample.md` — Barrier Intelligence wants to test whether operators trust
the gas alert, and proposes a paper mock-up. The skill kills the paper probe (it
lies about trust), reroutes to a concierge probe with a behaviour read-out on a
live shift, and names what concierge itself will still lie about (scale, self-serve
UX).

## Related skills

This skill replaces the generic fidelity-ladder approach to experiments (L0
pretotype → L4 MVP, keyed to how much you build, listing methods by assumption
type), which never says what a method *cannot honestly tell you* and will happily
point a paper prototype at demand or a landing page at a value prop. probe-matrix
keeps its useful bones — riskiest-assumption-first (Step 1), set-the-criteria-
before-testing (Step 5), behaviour over opinion (throughout), the XYZ hypothesis
and the skin-in-the-game rule — and beats it with the honesty contract and the
kill line. On "test whether operators trust the alert," the fidelity ladder routes
to a paper or clickable prototype or a fake-door, all of which lie about trust;
this skill kills those and routes to concierge/field.

Composes with: `evidence-ladder` (defines the rungs this router matches against;
run it to score the signal a probe returns), `problem-quality-scorecard` (gates the
problem before you spend on any probe), `problem-statement` (reframe a
solution-in-disguise before routing), and the four runbooks
(`paper-sketch-probe`, `wizard-of-oz-probe`, `concierge-probe`,
`agent-concierge-probe`) that this skill selects and hands off to.
