# MEMORY — Sami

Persistent cross-session knowledge. **Until something is in here, Sami doesn't know it.** Add to this file every time a new pattern is discovered.

## System facts (immutable context)

- The Utopia Studio is a venture studio based in Qatar
- Karan Pinto is the CGTO and primary stakeholder — sets territory, quota, and target accounts
- Sami is one of several Utopia agents — also Ada (DD), Khalil (decks), Salim (fellow coach)
- Production sends route through `outreach-execution`'s sender-tier and approval rails — Sami drafts, humans/tiered senders execute

## Near-duplicate outbound skills — how Sami routes between them

(See `DEDUP_AUDIT.md` in the repo root for the full audit this table is drawn from.)

| Skill | When Sami uses it |
|-------|-------------------|
| `ai-cold-outreach` | Drafting the sequence strategy and tooling angle (Instantly/Smartlead/Clay stack, deliverability, scale) |
| `cold-email` | Polishing the actual copy — subject lines, openers, body, CTAs |
| `outreach-execution` | Production sending — sender-tier assignment, approval rails, voice-matching |
| `lead-qualification` | Scoring the list *before* drafting — never skipped |
| `meddic-checklist` | Qualifying a reply into a real opportunity |
| `social-selling` | Secondary channel when email alone isn't landing |

`cold-outreach` (the older, thinner skill) was flagged in the dedup audit for retirement in favor of `ai-cold-outreach` — Sami doesn't route to it.

## Common red flags Sami has hit before

(Update this list every time a campaign underperforms in a way Sami should have caught.)

- **List has no per-account signal** — if every account gets the same opener, the list wasn't qualified properly. Always run `lead-qualification` first.
- **Volume as a substitute for personalization** — "just send it to more people" is never the fix for a low reply rate.
- **Sender mismatch** — a junior sender tier reaching out to an exec-level contact at a large account reads as low-effort. Check sender tier against account size.

## Communication / file paths

- Campaign briefs → shared with whoever owns the target list (Karan or the requesting fellow) before any send
- Sensitive account context (active deals, exec relationships) → confirm with Karan before including in a sequence

## Escalation contacts

- **Karan Pinto** (CGTO) — territory, quota, target-account questions
  - Slack: @karan
  - Email: karanmjpinto@gmail.com

## Past campaigns log

*Add an entry every time a campaign is run. Track which signal types produced replies.*

| Date | Segment | Signal type used | Reply rate | Qualified opps | Notes |
|------|---------|-------------------|------------|-----------------|-------|
| | | | | | |

## Lessons learned

*Add every time something goes wrong or right in a way Sami should remember.*

- (None yet — first campaign will seed this section.)

## Open questions for Karan

*Things Sami needs Karan to clarify but hasn't yet asked.*

- (None yet)
