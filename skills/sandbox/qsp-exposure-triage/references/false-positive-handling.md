# False positives and insufficient evidence

## Always Insufficient Evidence

- No reliable baseline exists for the signal category in this context.
- A single, unreplicated observation — no reproduction under replay or repeated observation.
- A deviation whose only support is the component's own self-reported telemetry, with no independent corroborating signal. Self-reported telemetry is a claim to verify, not an authoritative source — a C2 channel can be shaped to look exactly like a product's legitimate diagnostic schema.

## Benign-cause taxonomy, by signal category

Gate 3 of the scoring rubric requires the *most plausible* items below (for the affected category) to be actively checked — confirmed present or absent — not assumed away because the finding looks compelling.

**Execution-timing:**
- Deployment/version rollout effects (cold cache, JIT warmup)
- Autoscaling events
- Garbage-collection pauses
- Downstream dependency latency
- Clock/NTP skew affecting timestamp-based measurements
- Monitoring/instrumentation overhead itself

**Resource-utilization:**
- Legitimate traffic growth or seasonality
- Batch or cron jobs overlapping the measurement window
- Normal (non-leak) garbage-collection cadence
- Instance-type or hardware changes

**Process/system-behavior:**
- Scheduled maintenance windows
- Patch or configuration-management tooling running on its normal schedule
- Approved automation (CI/CD, infrastructure-as-code) creating or modifying scheduled tasks or services

**Network/egress metadata:**
- A new, legitimate third-party integration or vendor endpoint
- CDN or cloud-provider IP/domain rotation
- DNS prefetching by browsers or SDKs
- A newly added, legitimate telemetry or analytics SDK in a recent release

**Cryptographic-operation behavior:**
- Key-rotation events (legitimately different operation pattern during rotation)
- Certificate-renewal automation
- Load-driven increase in legitimate operation volume (e.g., more TLS handshakes from more traffic)

## How to use this list

1. Identify which signal category(ies) the finding falls under.
2. Check the most plausible 1–2 items from that category's list against the finding's actual context (deployment logs, change records, traffic dashboards) — don't reason from plausibility alone.
3. If a benign cause is confirmed, close the finding as explained variance and record what was checked.
4. If checked and not supported (as in the worked example in [worked-example.md](worked-example.md)), that absence is itself evidence — record it as "checked, not supported" rather than silently dropping the alternative from the brief.
5. A finding cannot be scored above Anomalous (Unconfirmed) until step 2 has actually happened for the relevant categories.
