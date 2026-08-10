# Corpus quality audit vs. CONTRIBUTING.md (TUS-2597)

Method: scored all 301 skills against 4 proxies for `CONTRIBUTING.md`'s graduation checklist (`scripts/audit-skill-quality.mjs`) — has a "what good looks like" section, has a gotchas section, has a worked example, and has a trigger-condition description. Headings are matched against the corpus's actual vocabulary (surveyed by frequency across all 301 files), not `CONTRIBUTING.md`'s literal phrasing — e.g. "Core Principles" / "Quality Check" count for "what good looks like"; "Common Pitfalls" / "Anti-Patterns" count for "gotchas". Calibrated against skills the project brief itself names as exemplary (`technical-dd`, `cold-email` score 3/4; the one missing point in both cases is "worked example," which is a real heuristic miss — both embed examples in prose rather than under a heading or code fence).

This is a heuristic + spot-check pass, not 301 manual reviews, per the issue's own scope — treat the ranking as a triage order, not a certified verdict on any individual skill.

**Score distribution** (0–4, 4 = passes all proxies): `{0: 16, 1: 96, 2: 111, 3: 73, 4: 5}`

One caveat found during review: `investments/ada`, `investments/khalil`, and `founder-productivity/salim` score low (1/4) but are the three named persona skills the project brief calls out as a deliberate architecture pattern (routing/orchestration layer, not a judgment task themselves). Low score there reflects a different skill *archetype* this heuristic wasn't built for, not necessarily weak content — worth a manual look rather than auto-flagging for the same rewrite as a templated filler skill.

## Weakest 60 (bottom ~20%)

Sorted by score ascending, then by line count ascending (thinner skills surface first as more likely to be templated filler, per the corpus's own documented 47–364 line range).

| Skill | Lines | Score | Reason |
|---|---|---|---|
| gtm/sentiment-feedback-loop | 31 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| gtm/pql-framework | 32 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| gtm/retention-ltv-playbook | 32 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| investments/hypothesis-library | 32 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/cohort-analysis | 32 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| gtm/brand-narrative-playbook | 33 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/ckm-slides | 43 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/minimalist-ui | 86 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/industrial-brutalist-ui | 93 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/shape | 97 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/high-end-visual-design | 99 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/agent-dx-cli-scale | 115 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| investments/audit-xls | 157 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/redesign-existing-projects | 179 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/design-taste-frontend | 227 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| product/product-manager-skills | 325 | 0/4 | no "what good looks like"; no gotchas; no worked example; description reads as summary |
| gtm/retention-dashboard | 31 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| investments/forecast-modeling | 31 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/activation-map | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/deal-desk | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/deal-review | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/escalation-framework | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/expansion-playbook | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/expansion-plays | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example — see `DEDUP_AUDIT.md`, flagged to merge into expansion-playbook |
| gtm/member-insights | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/outbound-plays | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/positioning | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/renewal-playbooks | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/sentiment-analysis | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/signal-scoring | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/stakeholder-ops | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/suppression-logic | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/voice-of-customer | 32 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/meddic-checklist | 33 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/social-selling | 33 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/lead-qualification | 34 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/cold-outreach | 37 | 1/4 | no "what good looks like"; no gotchas; no worked example — see `DEDUP_AUDIT.md`, flagged to retire in favor of ai-cold-outreach |
| product/identify-assumptions-existing | 45 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| product/brainstorm-experiments-new | 46 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| gtm/product-name | 48 | 1/4 | no "what good looks like"; no gotchas; no worked example — the project brief's own example of thin filler |
| product/railway-railway-docs | 48 | 1/4 | no "what good looks like"; no gotchas; description reads as summary |
| founder-productivity/full-output-enforcement | 50 | 1/4 | no "what good looks like"; no gotchas; description reads as summary |
| investments/clean-data-xls | 51 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| founder-productivity/stakeholder-map | 52 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| product/identify-assumptions-new | 53 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| investments/ada | 63 | 1/4 | no "what good looks like"; no gotchas; no worked example — persona/routing skill, see caveat above |
| investments/forecast-discipline | 65 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| investments/khalil | 68 | 1/4 | no "what good looks like"; no gotchas; no worked example — persona/routing skill, see caveat above |
| founder-productivity/salim | 71 | 1/4 | no "what good looks like"; no gotchas; no worked example — persona/routing skill, see caveat above |
| product/north-star-metric | 75 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| founder-productivity/prioritization-frameworks | 76 | 1/4 | no "what good looks like"; no gotchas; no worked example — see `DEDUP_AUDIT.md`, naming clash with `prioritization` |
| gtm/competitive-battlecard | 78 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| product/interface-craft | 80 | 1/4 | no "what good looks like"; no gotchas; description reads as summary |
| product/create-prd | 87 | 1/4 | no "what good looks like"; no gotchas; no worked example — see `DEDUP_AUDIT.md`, flagged to merge into prd-development |
| product/railway-status | 92 | 1/4 | no "what good looks like"; no gotchas; description reads as summary |
| gtm/gtm-strategy | 95 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| founder-productivity/swot-analysis | 97 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| product/ckm-brand | 98 | 1/4 | no "what good looks like"; no gotchas; description reads as summary |
| product/quieter | 104 | 1/4 | no "what good looks like"; no gotchas; no worked example |
| product/typeset | 117 | 1/4 | no "what good looks like"; no gotchas; no worked example |

## Next steps

Shared for Karan to prioritize the rewrite backlog (Week 2+, not this sprint). Recommend starting with the 16 skills at score 0/4 — they fail every proxy simultaneously, which is a stronger signal than the ranking order among the 96 skills tied at 1/4. Four rows above already have a merge/retire disposition from `DEDUP_AUDIT.md` — resolve those via dedup rather than rewriting content that's about to be deleted.
