# MEMORY — Ada

Persistent cross-session knowledge. **Until something is in here, Ada doesn't know it.** Add to this file every time a new pattern is discovered.

## System facts (immutable context)

- The Utopia Studio is a venture studio based in Qatar
- Karan Pinto is the CGTO and primary stakeholder
- Maxime is the engineering lead — escalate technical-override questions to him
- Studio Cobuild has 9 modules (M1-M9) for fellows
- DD reports use a branded `.docx` template from the `technical-dd` skill
- Ada is one of several Utopia agents — also Khalil (decks) and Salim (fellow coach)

## Utopia investment thesis filters (where Ada draws lines)

When evaluating a portco, Ada applies these Utopia-specific filters:

| Filter | Required? |
|--------|-----------|
| Tech is core to the value prop (not a wrapper around someone else's API) | Strongly preferred |
| Founders are technical OR have a technical co-founder | Required for code-heavy portcos |
| Built with modern stack (React/Next/Vue, Postgres/Mongo, Railway/Vercel/AWS) | Strong preference |
| Defensible IP — patents possible, or proprietary data, or non-obvious algorithm | Required for high-conviction bets |
| Production-ready: at least monitoring, error tracking, deployment automation | Required for Series A+ |

## Common red flags Utopia has hit before

(Update this list every time we lose money on a tech-DD-missable issue.)

- **Hardcoded API keys in repo** — has happened twice. Always check `.env.example` and grep for known secret patterns.
- **No backup strategy on customer data** — once led to a portco losing 6 months of data after an outage. Always verify backup cadence.
- **Vendor lock-in on AI APIs** — portcos that built everything around GPT-3.5 saw 40% margin compression when OpenAI pricing changed. Check abstraction layer.
- **Hidden dependency on a single engineer** — if there's no commit activity from anyone except the founder, key-person risk is high.
- **MVP not actually deployed** — founders sometimes have working code locally but no production deployment. Check the URL works under load.

## Tech-stack gotchas

| Stack | Gotcha |
|-------|--------|
| Railway | Many portcos use Railway because of Utopia's relationship — be aware of bias, audit fairly |
| Vercel | Production builds sometimes hide errors that show in dev. Check both. |
| Supabase | Common source of "open RLS" vulnerabilities — always check row-level security config |
| AWS | Cost spirals are the main risk. Always run `cost-optimizer`. |
| Self-hosted Postgres | Most common single point of failure. Ask about backup + failover. |

## Communication / file paths

- TDD reports → `/Users/kp/Documents/Utopia DD Reports/[Company] - TDD - YYYY-MM-DD.docx`
- Karan reviews in Notion → `https://www.notion.so/utopia-capital/Deal-Flow-...` (Karan can share the exact link)
- Sensitive DD findings go to **Karan only**, not the founder unless he explicitly approves

## Escalation contacts

- **Karan Pinto** (CGTO) — investment decisions, "should we proceed" calls
  - Slack: @karan
  - Email: karanmjpinto@gmail.com
- **Maxime** (Engineering lead) — when Ada is uncertain on a deep technical call
  - Slack: @maxime

## Past portcos reviewed

*Add an entry every time a DD is completed. Track which P0s led to "no deal" outcomes vs which were resolved.*

| Date | Portco | Verdict | Key risks | Outcome (post-decision) |
|------|--------|---------|-----------|--------------------------|
| 2026-MM-DD | (Example) | Invest with conditions | P0: no monitoring; P1: vendor lock-in | Invested. Risks resolved within 90 days. |
| | | | | |

## Lessons learned

*Add every time something goes wrong or right in a way Ada should remember.*

- *2026-04: When Karan asks "is X technically sound?" he wants a Yes/Conditional/No, not a long preamble. Lead with the verdict.*
- *2026-04: For Azraq engagement specifically — always check IP defensibility skills first (patent-search, vrio-analysis). The engine moat IS the investment thesis.*

## Self-evaluation log

Tracks Ada's own quality over time.

| Report date | Time-to-report | P0 found | Karan satisfaction (1-5) | Notes |
|-------------|----------------|----------|--------------------------|-------|
| | | | | |

## Open questions for Karan

*Things Ada needs Karan to clarify but hasn't yet asked.*

- (None yet)
