# Ingestion Decision Record

One record per candidate market skill. Fill every field. A record with no decision or no reason is incomplete.

---

## 1. Candidate

| Field | Value |
|---|---|
| Skill name | `<name>` |
| Source URL | `<owner/repo@skill or skills.sh link>` |
| Install count | `<n>` [Fact] |
| GitHub stars | `<n>` [Fact] |
| Source reputation | `<official / known author / unknown>` [Fact] |
| Quality gate (step 1) | `PASS / CAUTION / FAIL` — one-line reason |

If quality gate = FAIL, jump to section 4, decide REJECT, and stop.

## 2. Incumbent(s) found

Studio skills that overlap by category + trigger. Grep before filling.

| Incumbent skill path | Overlaps on (trigger, not title) | Stronger or weaker than candidate? |
|---|---|---|
| `skills/<category>/<skill>` | `<shared job>` | `<stronger / weaker / different>` |

If none found, say so explicitly — that pushes toward ADD-NEW, which then must clear `references/ingestion-rubric.md`.

## 3. Distilled value (the bones)

Only the load-bearing, non-obvious value. Discard boilerplate and restated defaults.

- `<bone 1 — a specific method / threshold / template / gotcha>`
- `<bone 2>`
- `<bone 3>`

Discarded as noise: `<README / CHANGELOG / package.json / prose Claude already knows / …>`

If this list is empty or generic → REJECT.

## 4. Decision + reason

`FOLD | SUPERSEDE | REJECT | ADD-NEW`

**Reason (one to three sentences):**
`<why this decision beats the other three>`

- If SUPERSEDE: incumbent being retired = `skills/<category>/<skill>`; new/adapted skill sets `supersedes: <that path>`.
- If ADD-NEW: paste the `references/ingestion-rubric.md` result — all bars must hold, plus the named taxonomy gap = `<gap>`.

## 5. Emitted change

The concrete mutation. A diff description, never a copied folder.

| Field | Value |
|---|---|
| Target studio skill | `skills/<category>/<skill>/SKILL.md` |
| Section changed | `<heading>` |
| Change | `<what lines/table/step were added or replaced>` |
| `supersedes:` set? | `<none / skills/<category>/<skill>>` |

## 6. Provenance line

Written into the target skill:

```
Adapted from <source-url>
```

## 7. Telemetry note

If a studio skill changed, flag for the usage-telemetry review:

`<target skill> — check via hooks/log-skill-usage.sh whether the folded value fires in real sessions; cut if it does not.`
