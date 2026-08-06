# Ingestion Rubric — the bar for ADD-NEW

ADD-NEW is the rare decision: a market skill enters the studio set as *new surface* rather than being folded into an incumbent. It costs context for every fellow, forever. So the bar is high and conjunctive.

## The gate: all five must hold

If any single bar fails, the decision is not ADD-NEW. Downgrade to FOLD (into the closest incumbent) or REJECT.

| # | Bar | Passes when | Fails when |
|---|---|---|---|
| 1 | **Fills a named taxonomy gap** | Maps to a gap SKILL_TAXONOMY.md names explicitly (Data Retrieval, Code Templates, Runbooks) | It lands in a category the repo already covers well |
| 2 | **Non-obvious** | A generic prompt could not reproduce its value; it encodes real method, thresholds, or hard-won gotchas | It restates defaults Claude already knows |
| 3 | **No trigger duplication** | No existing studio skill fires on the same phrases/job (grep the descriptions, not the titles) | An incumbent already triggers on this job |
| 4 | **Ships a tool, not just prose** | Includes a `template.md`, a script, or a scored table that does deterministic work | It is a wall of advice with nothing to run or fill in |
| 5 | **Worth the recurring context cost** | The value is used often enough to justify loading it for every fellow on every session | It is a rare edge case better left to `find-skills` on demand |

## How to score

- Judge each bar `PASS` / `FAIL` with a one-line reason. No partial credit — bars are binary and all must pass.
- Bar 2 and bar 5 are the ones most candidates fail. Be honest: "interesting" is not "non-obvious", and "nice to have" is not "worth the cost".
- Bar 5 is a [Hypothesis] at decision time. `hooks/log-skill-usage.sh` telemetry is what later confirms or kills it — an ADD-NEW that never fires in real sessions should be cut in the next curation pass.

## Result block (paste into the Decision Record, section 4)

```
Bar 1 (taxonomy gap):      PASS/FAIL — <gap named, or why not>
Bar 2 (non-obvious):       PASS/FAIL — <reason>
Bar 3 (no trigger dup):    PASS/FAIL — <incumbent checked>
Bar 4 (ships a tool):      PASS/FAIL — <template/script/table, or none>
Bar 5 (worth the cost):    PASS/FAIL — <usage expectation>
→ ALL PASS  = ADD-NEW (route via CONTRIBUTING sandbox → graduate)
→ ANY FAIL  = FOLD or REJECT
```

## Default outcome

[Fact] Most candidates fail at least one bar. The correct, boring, premium-preserving outcome is FOLD or REJECT. ADD-NEW is the exception you can defend against all five bars — not the one you reach for because the skill looked cool.
