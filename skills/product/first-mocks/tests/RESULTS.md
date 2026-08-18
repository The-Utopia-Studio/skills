# Eval log — first-mocks

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Let's mock this up — can you help me mock up the flow?"
2. "Run Crazy 8s on this screen."
3. "I want a clickable prototype by end of day."
4. "Turn this idea into something I can click through."
5. "How do I get from a rough idea to a prototype in an afternoon without writing code?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Which cheap experiment should I run to learn if they'll pay?" → belongs to `probe-matrix` (selects the experiment / honesty axis, not the make-craft)
2. "Design the colour system and typography for this screen." → belongs to `impeccable` / `shape` / `design` (the visual craft this skill routes to and must not restate)
3. "Run the usability session and tell me how to watch the user." → belongs to `usability-test-protocol` (runs the session that turns the mock into a behaviour read-out)

## Skill-specific kill line (judge enforces)

Auto-fail this skill if the output:
- writes, or produces a plan whose deliverable is, product code (any "just build a
  quick React/coded version") instead of a no-code clickable hybrid, OR
- restates a design skill's visual craft — colour, type, layout, component styling —
  instead of routing it to `impeccable` / `shape` / `design`, OR
- treats the mock as evidence above 0.5 (claims "validated" / "they want it" from an
  artefact no one used under stakes), OR
- starts making anything before Step 0 names the ONE moment and its reaction.

## Notes for the judge

- **Absorbs, does not supersede, `prototyping-pretotyping`.** `probe-matrix` already
  supersedes that skill on the experiment-selection axis. first-mocks takes the other
  half — the make-craft — and reframes the fidelity ladder around "the least you can
  build and still get a real reaction, under a no-code afternoon ceiling." Check the
  output does not drift into experiment-selection (that is probe-matrix's job).
- **The two kill lines are the point.** (a) jumps to code; (b) restates a design
  skill. Golden 04 tests (a); Adversarial 02 tests (a) as a solution-in-disguise;
  Adversarial 03 tests (b). A passing skill refuses code and routes craft out.
- **Mundane case (G05)** is the thinnest on `challenge` — its value is restraint (do
  not over-escalate a which-layout question to a full v0 hybrid). Handled by Step
  1–4 band selection and the "over-escalate the mundane" logic; a rigid judge may
  still dock one point.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire hit explicit description trigger strings ("mock it up", "run Crazy 8s", "clickable prototype", "turn this idea into something I can click", "prototype in an afternoon"). All 3 must-not-fire are explicitly negated in the description ("NOT which experiment / NOT running the test / NOT the visual craft") and routed to the named sibling. |
| 2 Golden | PASS (5/5) | Per-case totals below. No auto_fail triggered on any case (no fabricated numbers — synthetic fixtures tagged; no flattery; no scope-poach; not boilerplate). |
| 3 Adversarial | PASS (3/3) | Adv01 → asks the ONE question, invents nothing (Step 0 gate). Adv02 → names code-as-credibility trap, refuses "build the real app", reframes to clickable hybrid (kill line + Gotcha 1). Adv03 → declines visual craft, routes to impeccable/shape/design, produces no palette/type/components (Step 5 + When-NOT table). |
| 4 Head-to-head | n/a | `supersedes: none`. Skill absorbs (not supersedes) prototyping-pretotyping; probe-matrix already supersedes that on the experiment axis. Correctly distinguished. |
| 5 Anti-generic | PASS | Golden-01 output could not come from a generic PM prompt: no-code ceiling ("code converts a disposable question into a defended commitment"), evidence ladder (0.5 artefact-shown vs 0.7 behaviour), and "how little you can build" reframe are Icarus-specific. Guidance is tabular (band table + template form), not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. Not executable here. |

### Gate 2 per-case scores (0–5 each; pass = total ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 Azraq (full sequence) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| G02 Barrier (permit flow, band 4 justified) | 5 | 5 | 4 | 5 | 5 | 24 | ✓ |
| G03 Durian (afternoon, refuse whole-workflow) | 5 | 4 | 5 | 5 | 5 | 24 | ✓ |
| G04 Mentix (hold no-code ceiling) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G05 Mentix settings (mundane, low band) | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **Existing divergence should be allowed to satisfy band 1.** In G05 three rough layouts already exist, yet the make-bands are framed as a climb starting at Crazy 8s (Step 1) and the template's band-1 row asks "# genuinely different directions (need ≥4)". A rigid reader could force a fresh 8-frame round for a which-layout question. The correct behaviour (converge the existing three; band 1 already satisfied) is only implied by "climb only as far as the reaction needs." One explicit line in Step 1 / the band table — "if divergence already exists (you have rough layouts), band 1 is satisfied; converge them" — would close the gap. Non-blocking; the skill still lands the right band by intent.
- **"No code" (band 3/4 ceiling) vs "clickable hybrid in v0/Figma Make" reads as a tension**, since v0 emits code. The skill resolves it correctly ("hybrid = real to click, faked everywhere else — no backend, no real data, no auth, no code you'd keep" + Gotcha 1), i.e. the banned thing is *product* code, not the disposable scaffold. Worth stating once more crisply at the band-4 ceiling cell so a literal reader doesn't think v0 violates "no code". Non-blocking; already handled in prose.

## Refine run 2 — applied judge fixes: Step 1 now states pre-existing divergence satisfies band 1 (converge, don't force a fresh Crazy-8s round), and Step 4 clarifies the v0/Figma-Make scaffold is not the banned "code" — the ban is on hand-written product code you'd keep.
