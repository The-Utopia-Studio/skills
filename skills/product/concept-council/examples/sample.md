# Sample run — Mentix

Illustrative fixture. Numbers are plausible and clearly synthetic, not real client data.

**Fellow input (verbatim):** "Here's my idea — an AI copilot for factory managers. Tear it apart. What should I build first?"

---

## 0. Concept in one sentence

> Mentix wants factory plant managers to run their shift by asking an AI copilot what to do next, instead of reading dashboards and radioing the floor.

Named user (plant manager), job (decide the next shift action), change (ask an AI instead of reading dashboards). Clear enough to attack.

---

## 1. Gap Map — the five-lens teardown

| Lens | Its one hardest attack | L | D | Score | Basis |
|---|---|---|---|---|---|
| Skeptic | Managers already know the next action from twenty years on the floor; the copilot answers a question they don't ask. | 0.6 | 0.7 | 0.42 | [Assumption] |
| Buyer | Plant budget buys machines and maintenance contracts, not manager software; the copilot has no line item. | 0.5 | 0.6 | 0.30 | [Assumption] |
| Incumbent | The MES/SCADA vendor already sitting on the plant data bolts a chat box onto its console and Mentix is a feature, not a product. | 0.5 | 0.7 | 0.35 | [Hypothesis] |
| Engineer | Every plant's tag names, PLCs, and line layout differ; each install is a bespoke data-integration project, not a signup. | 0.7 | 0.6 | 0.42 | [Assumption] |
| Regulator | A wrong copilot instruction during a hazardous process is a safety-liability event; plants gate any advice system through slow HSE sign-off. | 0.4 | 0.7 | 0.28 | [Hypothesis] |

Two attacks tie at 0.42: Skeptic (managers won't act on it) and Engineer (every install is bespoke).

Parked: Buyer 0.30, Incumbent 0.35, Regulator 0.28. Noted, not probed yet — the Incumbent attack matters and should be re-scored after the first probe.

---

## 2. The one load-bearing gap

Tie-break: the Skeptic attack is cheaper to test in a week (watch behaviour) than the Engineer attack (needs a real integration). Cheapest honest test wins.

> This idea dies if **plant managers will not change their next shift action based on an AI recommendation delivered mid-shift** is false — i.e. if they ignore it, the whole copilot is decoration.

- Highest score: Skeptic, 0.42 (tie broken on testability)
- Today's basis: [Assumption] — no observed manager has yet acted on a Mentix suggestion
- Everything else waits until this clears

---

## 3. First-Probe Brief

| Field | Fill |
|---|---|
| What it tests | Will a plant manager take a floor action they would not otherwise have taken, because a recommendation told them to? |
| Method | Concierge Wizard-of-Oz. For three shifts at one friendly plant, a Mentix operator watches the same live data feed and sends the manager 3–5 plain-text "next action" suggestions per shift by the tool they already use (radio/WhatsApp). No product built. |
| Cost | 3 shifts, one operator shadowing, ~0 dollars. Under one week. |
| Ladder rung it reaches | Behaviour (0.7) — we watch what the manager actually does, not what they say about the idea. |
| Pass looks like | Manager acts on ≥ 1 suggestion per shift that they confirm they would not have taken on their own. |
| Fail looks like | Manager acknowledges suggestions politely but changes no action, or only acts on things they were already about to do. |
| Decision on pass | Re-score the Engineer and Incumbent attacks; those become the next gaps. Now a pretotype set is worth designing (`brainstorm-experiments-new`). |
| Decision on fail | Pivot away from "copilot that tells managers what to do." The value, if any, is elsewhere (e.g. informing the maintenance crew, not the manager). |

---

## 4. One-line handoff

> Run the 3-shift concierge suggestion test at the pilot plant next week. If the manager acts on a suggestion they'd otherwise have missed, the concept clears its first gap. If they nod and change nothing, pivot the user.

---

## Why this beats a generic answer

A default prompt would list ten risks and suggest "talk to some factory managers." This run does three things it would not: it forces each lens to one attack and scores them, so "managers won't act" (0.42) is ranked above "no budget line" (0.30) rather than treated as equal bullets; it names one load-bearing gap as a falsifiable sentence; and it hands back one probe that produces a 0.7 behaviour signal in three shifts for zero dollars, instead of an opinion survey. One idea in, one test out.
