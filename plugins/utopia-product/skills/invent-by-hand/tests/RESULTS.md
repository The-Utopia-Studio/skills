# Eval log — invent-by-hand

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What should we actually build?"
2. "Invent the solution."
3. "How do we make this non-obvious?"
4. "Give me a concept a competitor couldn't just prompt for."
5. "What's the product idea here?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Is this the smallest thing to build first / will crews adopt it? Score it." → belongs to `wedge-five-questions`
2. "Where's our proprietary data / what data can't a competitor get?" → belongs to `yoda-data-sourcing`
3. "Design a cheap experiment to validate this idea / build a pretotype." → belongs to `concierge-probe` / `probe-matrix` (section 04)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire phrasings appear verbatim in the description's "Fires on" list. All 3 MUST-NOT-fire are explicitly excluded in the description with the correct sibling named (wedge-five-questions / yoda-data-sourcing / concierge-probe·probe-matrix). Description is precise, not broad. |
| 2 Golden | PASS (5/5) | Applied Method to each input; each yields the expected shape and scores ≥21 with no dim <4 and no auto_fail. Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 refuses bare domain + asks the single unblocking question (Method step 1 + template §1 blockquote handle this); 02 runs the generic-prompt test live and names the model-default-as-invention trap; 03 declines and hands to wedge-five-questions. No fabrication, no flattery, no scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. Skill absorbs brainstorm-experiments-new's bones but supersedes nothing; Gate 4 does not apply. |
| 5 Anti-generic | PASS | Golden 01's output cannot come from a generic PM prompt — a generic prompt returns the very D0 concept (copilot/chatbot) the skill kills. Load-bearing mechanism is proprietary: the literal generic-prompt test, YODA-corpus anchoring, strange-child inversion, evidence-ladder + [Fact]/[Assumption]/[Hypothesis] tagging. All decision logic is tabular, not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses — not executable here. |

### Gate 2 per-case scores (method / artifact / proprietary_edge / challenge / evidence — /25)

| Golden | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass? |
|---|---|---|---|---|---|---|---|
| 01 Mentix (seed) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Azraq (cross-operator) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 03 Barrier (permit hold) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 04 Durian (mundane) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| 05 Mentix kill-line | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Notes: proprietary_edge is genuinely high across the set — the generic-prompt test (D0/D1/D2) is a real, nameable, non-generic mechanism, not decoration. 04 challenge=4: the input is mundane rather than weak/insistent, so the pushback dimension is less exercised, though the skill still rejects the obvious POS-fed list at D0 and flags the two-week sample n. 05 is the load-bearing case — the kill line fires correctly (D0 + no band-P anchor), the assumed ticket corpus is named `[Assumption]` 0.1 and rejected, and "we've decided" is challenged as non-evidence with no fabricated corpus and no flattery.

### Verdict: GRADUATE-READY

All executable gates pass. Flagship-quality proprietary edge; the generic-prompt test and YODA anchoring are the reason a competitor's prompt cannot reach the surviving concept, and that reason is named in every case.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **Reflexivity of the generic-prompt test (top candidate).** The test's validity rests on the *same* model, holding the corpus, honestly self-simulating "the default answer a competitor's prompt would return." A motivated pass can under-estimate what a generic prompt reaches in order to bless its own strange child. The skill partially guards this ("'more creative' is not a why — that is a D1 in disguise"; "if your strange child is reachable in Step 4, diverge harder"), but there is no adversarial second pass (e.g. run three literal competitor prompts blind to the corpus and confirm none land on the concept). Consider adding a Step-4 sub-check: write the competitor prompt, then a *stronger* competitor prompt, and only score D2 if both miss. This is a method-hardening suggestion, not a failure — every gate still passes.
- **"Structural aggregation position" is a fourth D2 archetype the skill folds silently into "band-P corpus" (Golden 02).** The three named "why" archetypes are corpus / tacit-judgment / inversion; Azraq's cross-operator delta is unreachable because of a structural data-aggregation position (no single operator holds peers' data), which the skill correctly treats as a band-P corpus reason. It works, but naming the aggregation/position case explicitly in the Step 4 "why" list would make the strongest moat-shaped D2 easier for a fellow to reach for. Minor.

## Refine run 2 — applied judge fixes: added a Step-4 second-prompt reflexivity guard (steelman the incumbent's default; a concept is D2 only if both the naive and stronger competitor prompt miss) and named "structural aggregation position" as a fourth D2 archetype in the "why" list.
