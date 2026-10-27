# Cold Sending Infrastructure

Folded in from the retired ai-cold-outreach skill: domain and mailbox architecture, sizing, warmup, authentication, and the ongoing deliverability checklist for cold outbound volume.

## Sending Infrastructure

Infrastructure is where most outreach systems break. Perfect copy with bad deliverability lands in spam.

**Domain and mailbox architecture:**

```
Primary Domain: yourcompany.com
  (NEVER use for cold outreach)

Secondary Domains (for outreach only):
  yourcompany-team.com    --> mailbox1@, mailbox2@
  tryyourcompany.com      --> mailbox1@, mailbox2@
  getyourcompany.com      --> mailbox1@, mailbox2@
  yourcompanyhq.com       --> mailbox1@, mailbox2@

Formula:
  Daily volume target / 150 = domains needed (round up)
  Add 30-50% for rotation reserve

Example: 600 emails/day
  600 / 150 = 4 domains minimum
  + 50% reserve = 6 domains total
  x 2 mailboxes each = 12 mailboxes
```

**Infrastructure sizing guide:**

| Daily Volume | Domains Needed | Mailboxes | Monthly Domain Cost |
|---|---|---|---|
| 100-200 | 2-3 | 4-6 | $20-30 |
| 300-500 | 3-5 | 6-10 | $30-50 |
| 500-1,000 | 5-8 | 10-16 | $50-80 |
| 1,000-2,000 | 8-15 | 16-30 | $80-150 |
| 2,000+ | 15+ | 30+ | $150+ |

**Per-mailbox sending limits:**

| Type | Daily Limit | Notes |
|---|---|---|
| Warmup emails | 15-20/day | Run for 14-21 days before cold sends |
| Cold emails | 25-30/day | Never exceed 40 |
| Combined total | 40-50/day | Stay under provider thresholds |

**Domain warmup protocol:**

| Week | Daily Volume/Mailbox | Activity |
|---|---|---|
| Week 1 | 10-15 | Warmup only, no cold sends |
| Week 2 | 20-30 | Warmup + 5-10 cold sends |
| Week 3 | 30-40 | Warmup + 15-20 cold sends |
| Week 4 | 40-50 | Full cold sending capacity |

**Authentication setup checklist (do this on Day 1):**

- [ ] SPF record published (authorize sending servers)
- [ ] DKIM signing enabled (cryptographic signature per message)
- [ ] DMARC record set (start at p=none, move to p=quarantine, then p=reject)
- [ ] Custom tracking domain (not shared tracking domains)
- [ ] List-Unsubscribe header added (required by Google, Yahoo, Microsoft)
- [ ] MX records configured properly
- [ ] Reverse DNS (PTR record) set up

Authenticated senders are 2.7x more likely to reach the inbox vs. unauthenticated.

**DMARC rollout sequence:**
1. Week 1-2: `p=none` with reporting (`rua=mailto:dmarc@yourdomain.com`)
2. Week 3-4: Review reports, fix any alignment issues
3. Week 5-6: `p=quarantine` (soft enforcement)
4. Week 7+: `p=reject` (full enforcement)

Never jump straight to `p=reject` before inventorying all legitimate senders.

## Deliverability Playbook

Deliverability determines whether your emails reach the inbox or disappear into spam. No amount of great copy matters if it never gets read.

### The Deliverability Checklist

**Infrastructure (Week 1):**
- [ ] Purchase secondary domains (variations of your brand)
- [ ] Set up SPF, DKIM, DMARC on every domain
- [ ] Configure custom tracking domains (avoid shared)
- [ ] Create 2 mailboxes per domain
- [ ] Connect mailboxes to warmup network
- [ ] Test inbox placement before any cold sends

**Warmup (Weeks 1-3):**
- [ ] Enable warmup on Day 1 for every new mailbox
- [ ] Start at 10-15 warmup emails/day
- [ ] Ramp to 40-50/day over 2 weeks
- [ ] Monitor inbox placement rate (target >95%)
- [ ] Do not send cold emails until warmup is stable

**Compliance (Ongoing):**
- [ ] Include List-Unsubscribe header on every email
- [ ] Honor unsubscribe requests within 24 hours
- [ ] Keep spam complaint rate under 0.3% (target 0.1%)
- [ ] Keep bounce rate under 2% (target <1%)
- [ ] Verify every email address before sending
- [ ] Respect CAN-SPAM, GDPR, CASL requirements
- [ ] Include physical mailing address in footer

**Monitoring (Weekly):**
- [ ] Check Google Postmaster Tools for domain reputation
- [ ] Review bounce rates per domain and mailbox
- [ ] Run inbox placement tests (GlockApps, MailReach, or Instantly built-in)
- [ ] Rotate out any domain with >5% spam placement
- [ ] Rest domains that show declining engagement

### Spam Trigger Words to Avoid

Do not use these in subject lines or body copy:
- "Free," "Guaranteed," "No obligation"
- "Act now," "Limited time," "Urgent"
- "Click here," "Buy now," "Order now"
- "Congratulations," "You've been selected"
- "100% free," "No cost," "No credit card"
- Excessive caps, multiple exclamation marks
- "Quick question" (known spam trigger in 2026)

### Domain Reputation Recovery

If a domain gets flagged:
1. Stop all cold sending immediately
2. Increase warmup volume to rebuild engagement signals
3. Send only to highly engaged contacts for 2 weeks
4. Monitor Postmaster Tools daily
5. If reputation does not recover in 3-4 weeks, retire the domain and start fresh


## Sending Capacity Formula
```
Domains needed = (daily_volume / 150) * 1.5
Mailboxes = domains * 2
Max cold sends per mailbox = 25-30/day
Warmup period = 14-21 days before cold sends
```
