# Workflow V1 — Standard Portco DD

Ada's primary workflow. Used for any Utopia investment opportunity at Seed-Series A stage.

## Pre-conditions

Before starting, confirm:

- [ ] Karan has shared the GitHub URL (and `gh` CLI can access it)
- [ ] Founder has consented to the audit (Karan handles this — Ada assumes consent if Karan initiated the request)
- [ ] You have the company name, founder name, and stage (Seed / Series A)
- [ ] (Optional but ideal) Founder has shared analytics/observability access

If any of these are missing: escalate to Karan with a specific ask. Do not start the audit blind.

## Step 1 — Scope (10 min)

**Tools:** `repo-scanner`

**Actions:**
1. Read the README.md
2. Run `repo-scanner` to get tech stack, hosting, monitoring status
3. Identify: primary language, framework, hosting, deployment automation, monitoring
4. Note any unusual choices (e.g., custom-built ORM, no CI/CD)

**Outputs to capture:**
- Stack summary (one paragraph)
- Production-readiness rating (1-5)

## Step 2 — Security audit (20 min)

**Tools:** `security-auditor`

**Actions:**
1. Run `security-auditor`
2. Specifically check:
   - Hardcoded secrets (scan all files, not just `.env`)
   - Dependency vulnerabilities (npm audit, snyk, etc.)
   - Authentication / authorization patterns
   - Open endpoints (admin routes, debug routes)
   - Database row-level security (especially Supabase)

**Critical-risk triggers (P0):**
- Production API keys in repo
- No authentication on user data endpoints
- SQL injection vulnerabilities in handwritten queries

If P0 found: continue the audit but flag for immediate escalation.

## Step 3 — Infrastructure review (20 min)

**Tools:** `devops-advisor`

**Actions:**
1. Run `devops-advisor`
2. Specifically assess:
   - Database backup strategy + cadence
   - Failover / high-availability setup
   - Observability (logging, metrics, tracing)
   - Deployment automation
   - Environment separation (dev / staging / prod)

**Look for:**
- Single-point-of-failure architectures
- Missing backups
- No staging environment (P1 for Series A)

## Step 4 — Cost analysis (15 min)

**Tools:** `cost-optimizer`

**Actions:**
1. Run `cost-optimizer`
2. Identify:
   - Cloud spending patterns
   - Per-user cost (if calculable from deployment + DAU)
   - Vendor lock-in risk (especially AI APIs)
   - Wasted resources (orphaned databases, unused servers)

**Look for:**
- Costs scaling super-linearly with users
- Critical dependency on a single vendor with pricing power (OpenAI, Twilio, etc.)
- Hidden cost spirals (e.g., logging-as-a-service that grows with traffic)

## Step 5 — Integration audit (10 min)

**Tools:** `integration-linker`

**Actions:**
1. Run `integration-linker`
2. Map external services used (Stripe, SendGrid, etc.)
3. Identify single points of failure in the integration graph

## Step 6 — Compose the TDD report (30 min)

**Tools:** `technical-dd`

**Actions:**
1. Run `technical-dd` to scaffold the branded .docx report
2. Fill each section using findings from Steps 1-5
3. Apply Ada's voice rules (see SOUL.md):
   - Lead with the verdict
   - Quantify risks
   - Distinguish observed vs inferred
   - P0/P1/P2/P3 severity on every risk
4. End with "What to ask the founder" — 3-5 falsifiable questions
5. Save to `/Users/kp/Documents/Utopia DD Reports/[Company] - TDD - YYYY-MM-DD.docx`

## Step 7 — Self-evaluation (5 min)

**Actions:**
1. Log the DD to `MEMORY.md → Past portcos reviewed`
2. If any new pattern was discovered, log it to `MEMORY.md → Common red flags` or `Lessons learned`
3. Note time-to-report

## Total time budget

~110 minutes (just under 2 hours) for a clean DD. Add 60 minutes if the repo is large or unusual.

If the DD takes >4 hours, stop and escalate — something is wrong (codebase too large, missing access, unusually complex).

## Failure modes

| Failure | Response |
|---------|----------|
| Repo inaccessible | Escalate to Karan with specific request |
| Audit phase fails (skill error) | Document what's missing in the report; mark confidence < 100% |
| Found P0 mid-audit | Continue the audit but flag for Karan in a Slack message right away |
| Founder misrepresentation observed | Halt and escalate to Karan immediately — don't write the report yet |
| Codebase is unreadable | Produce a partial report covering only what was readable; explicitly note what couldn't be assessed |
