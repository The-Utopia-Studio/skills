---
name: fellow-path-router
description: >-
  Routes a fellow through the Icarus module by situation type, not by tearing down one
  idea. Fires on "where do I start", "I already have a product / traction — which stages
  apply to me", "onboard me to Icarus", "which stages should I skip", "I have a mature
  product, what's my path". Classifies the fellow as Type A (blank page), B (traction, no
  moat), or C (mature product) on the evidence ladder, then returns a keep / trim /
  subtract / leap stage ledger and a think:build:test ratio tied to that type's dominant
  risk. Do NOT fire to tear down or grade one idea (use concept-council or
  so-what-stress-test), to assess the fellow's own skill level (use fellow-level-ladder),
  or to draw the platform build-vs-buy line (use platform-vs-venture).
type: interactive
supersedes: none
---

# Fellow Path Router

## What it does

Takes a fellow's whole situation — not an idea — and returns their route through Icarus.
It classifies them as Type A (blank page), Type B (traction, no moat), or Type C (mature
product), grades that type on the evidence ladder, and hands back two things: a stage
ledger that marks each of the nine Icarus sections KEEP / TRIM / SUBTRACT / LEAP for this
fellow, and a think:build:test ratio derived from the one risk most likely to kill this
type. It is the first thing a fellow runs at onboarding, before any single idea is torn
down. It answers "which stages are mine and in what order", not "is my idea good".

## The Icarus reframe

Generic onboarding pushes everyone down the same funnel. Icarus has an opinion: the
biggest waste is not skipping a stage, it is re-running a stage whose answer you have
already earned with behaviour or money. So the router SUBTRACTS stages you have evidenced
past and REFUSES to let you LEAP a stage you only feel you have done. The type is not
self-declared — it is graded to the highest rung of evidence the fellow can actually show,
and it rounds down, never up. A founder who says "mature product" but cannot show
flattening retention is Type B, not C, and the router says so. The ratio is not a vibe:
each type has one dominant failure mode, and the split falls straight out of it — a
blank page dies from building the wrong thing, so build is capped near zero; a traction-
without-moat product dies from being copied, so build is capped and the moat is tested.
A router that gives two types the same ledger has done no work.

## When to use / When NOT

Use it at first contact with a fellow, when they ask where to begin, which stages apply,
what to skip, or how to onboard. Use it whenever a fellow's stage is unclear and effort
could go to the wrong section.

| Not this skill | Use instead | Why |
|---|---|---|
| "Tear my idea apart / what am I missing / what should I build first" | `concept-council` | That is a five-lens teardown of one raw idea ending in a probe. This routes the fellow's path across sections; it does not judge the idea. |
| "Is this idea worth doing / pressure-test it / so what" | `so-what-stress-test` | That gates one idea across five business questions. This sequences stages, it does not grade a concept. |
| "How is this fellow doing / assess them / level them up" | `fellow-level-ladder` | That grades the person's mastery (Literate→Author). This routes the product's path. A Frontier-level fellow can still be on a Type A product. |
| "Should we build or use the platform / what does Daedalus give me" | `platform-vs-venture` | That draws the build-vs-buy line for platform primitives. This sequences the fellow's own stages. |

If the fellow gives no product signal and no problem signal, do not fabricate a type. Ask
the one classifying question (below) and stop.

## Method

Copy this checklist and work top to bottom. Fill [template.md](template.md) as you go.

```
Fellow Path Router progress:
- [ ] Step 1: Restate the situation in one line + name the highest evidence rung shown
- [ ] Step 2: Classify by the evidence gate (round down over-claims; round up under-claims)
- [ ] Step 3: Fill the stage ledger — keep/trim/subtract/leap per section, with why + tripwire
- [ ] Step 4: Name the dominant risk for this type
- [ ] Step 5: Set the think:build:test ratio from the dominant risk, with rationale
- [ ] Step 6: Name the entry point + the first artefact to produce
- [ ] Step 7: Run the kill-line self-check before returning
```

### Step 1 — Situation and evidence rung

Write the fellow's situation back in one line. Then name the single highest rung of the
evidence ladder they can show: money moved (1.0), behaviour observed (0.7), artefact shown
(0.5), verbal commitment (0.3), opinion (0.1). If they name no product and no problem, ask
**the one classifying question** — "Do real users already touch something you shipped, or
is this still a domain and a hunch?" — and stop. Invent no product, no usage, no number.

### Step 2 — Classify by the evidence gate

The type is the highest rung the fellow can **evidence**, not the one they claim.

| Highest rung the fellow can show | Type | One-line meaning |
|---|---|---|
| No shipped product; best is a problem opinion or artefact (≤0.5) | **A — blank page** | Still deciding what to build |
| A product real users touch at behaviour or money (≥0.7), but the moat is still a plan (≤0.3) | **B — traction, no moat** | Has demand, at risk of being copied |
| Product plus money AND a compounding asset with evidence it is accruing — flattening retention or a growing proprietary corpus at ≥0.7 | **C — mature product** | Has a moat forming, must keep it compounding |

Round the claim down, never up:

- Claims C, cannot show flattening retention or a compounding asset → regrade **B**.
- Claims B, product usage is free or opinion only (≤0.5) → regrade **A**.
- Claims A but already has paying users → up-grade **B**; do not waste them on a front funnel they have earned past.

State the down-grade or up-grade out loud, with the rung that forced it. The most common
correction is C→B.

### Step 3 — Fill the stage ledger

Mark each Icarus section for THIS fellow's type. Verbs: **KEEP** run in full; **TRIM** run a
light version; **SUBTRACT** skip, with the tripwire that would re-add it; **LEAP** jump ahead
and start here; **GATED** run only once a probe clears 0.7; **not yet** blocked until an earlier
stage lands.

| Section | A — blank page | B — traction, no moat | C — mature product |
|---|---|---|---|
| 00 concept-council | KEEP — entry point | SUBTRACT · tripwire: pivoting to a new problem → re-enter here | SUBTRACT · tripwire: launching a new line → that line re-enters as its own Type A |
| 01 first-principles-problem | KEEP | TRIM — traction answers "is it real"; re-run only `product-as-decision` to sharpen | SUBTRACT |
| 02 customer-discovery | KEEP | TRIM — mine your own users via `trace-to-interview`, don't cold-start | TRIM — continuous / trace-driven, not fresh interviews |
| 03 yoda-your-own-data | KEEP — start the corpus | **KEEP** — this is your missing moat piece | KEEP — the corpus is the compounding asset |
| 04 probes | KEEP — earn the right to build | KEEP — probe the moat wedge, not the next feature | SUBTRACT — you are past demand proof |
| 05 frame | TRIM — light frame + first mocks | SUBTRACT `first-mocks` (live product); KEEP `usability-test-protocol` | TRIM — frame the next bet only |
| 06 invent-wedge-moat | TRIM — sketch the moat hypothesis, don't over-build it yet | **KEEP** — the whole point for this type | KEEP — defend and deepen the moat |
| 07 commit-build-v1 | GATED — not until a probe clears 0.7 | KEEP — `eval-first-spec` + `guardrail-design` + `value-based-pricing` | KEEP — tighten guardrails and pricing |
| 08 refine-flywheel | not yet | TRIM — start the retention-flattening check now | **KEEP** — the core; the loop is where value compounds |

### Step 4 — Name the dominant risk

Each type dies one way. Name it in one sentence; the ratio in Step 5 must answer it.

| Type | Dominant risk (the thing most likely to kill it) |
|---|---|
| A | Building something nobody needs. A killed concept costs a week; a built wrong product costs a quarter. |
| B | Commoditisation. Every week shipping features is a week the moat does not compound, and a copyable product loses. |
| C | The flywheel stalls, or autonomy gets promoted by feel instead of by eval result. |

### Step 5 — Set the think:build:test ratio

Split the fellow's next 4–6 weeks of effort across three modes, summing to 10. **Think** =
deciding what to build and why it is defensible (00, 01, 02, 03, 05-frame, 06-invent).
**Build** = shipping the v1 / agent / workflow (07, 09). **Test** = getting evidence back —
probes, usability, evals, flywheel measurement (04, 05-usability, 07-eval-first, 08). The
split is not free; it must be justified by the dominant risk.

| Type | think : build : test | Why this split (must tie to the risk) |
|---|---|---|
| A | **6 : 1 : 3** | Build is capped near zero — the only expensive mistake is building. Test (probes) is how you earn each unit of build. Build stays low until a probe clears behaviour 0.7. |
| B | **4 : 2 : 4** | Think is re-pointed at the moat, not the problem (traction already answered that). Build is capped at 2 — feature-shipping is the trap that starves the moat. Test proves the moat hypothesis. |
| C | **2 : 4 : 4** | Think is cheap now (discovery is trace-driven). Build is shipping-behind-signoff. Test is re-running the whole eval set on every model release — the discipline most pilots skip. |

The **build** number is a cap, not a target. Effort above it requires a probe result at 0.7.

### Step 6 — Entry point and first artefact

| Type | Open this stage first | First artefact to produce |
|---|---|---|
| A | 00 `concept-council` | A Gap Map + one probe under a week |
| B | 03 `yoda-your-own-data`, then 06 `invent-wedge-moat` | An explicit/tacit ledger + a moat-design canvas |
| C | 08 `refine-flywheel` | A flywheel cadence doc + the re-run-evals-on-model-release schedule |

### Step 7 — Kill-line self-check

Run the checks at the foot of [template.md](template.md). If any fails, the route is wrong,
not the template.

## Evidence standard

The type itself is scored on the ladder — money 1.0 → behaviour 0.7 → artefact 0.5 →
commitment 0.3 → opinion 0.1. A fellow cannot self-declare a type; each carries an evidence
bar. B requires behaviour or money (≥0.7) on the product. C requires a compounding asset
with evidence it is accruing (≥0.7). When the evidence is missing, the default is the lower
type, never the flattering one. Tag every situation claim `[Fact]`, `[Assumption]`, or
`[Hypothesis]`; an untagged "we have traction" is an opinion until behaviour or money backs
it. Done means: type graded with the rung that set it, a ledger that differs by type, and a
ratio whose build cap is justified by the named risk. Never let an opinion promote a type or
lift a build cap.

## Gotchas

- **Type is claimed, not shown.** Fellows round up. "Mature product" often means a free
  beta with churn; "traction" often means five friends on a free tier. Grade to the highest
  rung they can evidence and name the down-grade with the rung that forced it.
- **Subtracting a stage is not skipping its evidence.** A Type B subtracts concept-council
  because the concept survived contact, not because teardown is beneath them. Every SUBTRACT
  carries a tripwire; a pivot to a new problem fires it and sends them back to 00.
- **The ratio is a cap, not a suggestion.** Type B's build:2 is the whole point. A router
  that lets a Type B spend 6 on build has failed the type — it has funded the commoditisation
  it was meant to prevent.
- **Same flow for everyone is the failure mode.** If two types come out with the same ledger
  or the same ratio, the classification did no work. Differentiation is the deliverable; a
  generic funnel is the auto-fail.
- **A working tool is not always a venture.** The mundane case — a live internal tool with
  real users — can still be a feature, not a business. When the moat section returns "nothing
  compounds here", route to `so-what-stress-test` before funding more build.

## Examples

See [examples/sample.md](examples/sample.md) for a full run on Mentix: a factory-copilot
pilot the fellow calls "traction-ready" is graded to Type B (behaviour 0.7 on usage, moat
still a plan at 0.3, so not C), routed to LEAP into YODA and the moat sections with 00/01
subtracted, and handed a 4:2:4 ratio whose build cap is justified by the commoditisation
risk.

## Related skills

- Sits in section 00 beside `concept-council` and `so-what-stress-test`. Those tear down or
  gate ONE idea; this routes the fellow's whole path across sections 00–08. Run this first at
  onboarding; run those when a specific idea needs attacking.
- Feeds every downstream section by naming the entry point and first artefact.
- Not `fellow-level-ladder` (section 10): that grades the person's mastery; this routes the
  product's path. The two are orthogonal — a fellow of any level can be on any product type.
- Not `platform-vs-venture`: that draws the build-vs-buy line for platform primitives; this
  sequences the fellow's own stages.
- Supersedes nothing. It is the module's front door.
