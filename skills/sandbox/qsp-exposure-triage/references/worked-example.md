# Worked example: input-triggered execution/resource/egress anomaly

QSP-only re-narration of the scenario originally evaluated under the deprecated combined QSP+STG model (see `evals/qsp-heavy-service-decision-brief.md` for the historical run). Rebuilt here using only this skill's gates, ladder, scoring, and branches — no cross-product framing anywhere.

## Scenario

`RankSvc`, an internal production recommendation-ranking microservice, called ~50k times/minute.

**Baseline (10-day window):** P50 latency 8ms, P99 22ms, CPU ~35%/pod, RSS ~600MB/pod stable, no GC-pause anomalies.

**9 days ago:** `RankSvc`'s feature-serialization dependency (`featurepack`) was bumped v3.2 → v3.4 through the normal internal package registry, passing the standard automated dependency vulnerability scan with no CVEs flagged.

**Since the bump, three signals, all co-occurring on the same trigger condition:**

1. **Execution-timing:** requests carrying `legacy_cohort_id` in the range 12000–12050 take ~340ms instead of the 8ms baseline — a 40x spike. Reproducible under controlled replay. Absent before the bump.
2. **Resource-utilization:** on the same trigger, CPU on the serving pod spikes to 98% for the request's duration, and RSS memory grows ~40MB per triggered request, not fully reclaimed after GC.
3. **Network/egress metadata:** pods that processed a triggering request make a single outbound DNS resolution 60–90 seconds later to `telemetry-aggregate-sync.net` — a domain absent from `RankSvc`'s documented dependencies, registered 11 days ago (2 days before the `featurepack` bump). Metadata only (query name + timing) — no packet content inspected.

**Trend:** traffic matching the trigger condition is growing over the 9-day window on a field with no cohort currently mapped to it.

**Separately, not correlated with the trigger:** fleet-wide P99 latency rose 15% over the same window — fully attributed to a documented, ticketed 22% traffic increase from a marketing campaign. This cohort shows none of the CPU/memory/DNS signature and is excluded below.

## Walking the gates

1. **Baseline reliable?** Yes — 10-day pre-bump window, stable.
2. **Reproducible?** Yes — confirmed under controlled replay.
3. **Benign causes checked?**
   - General traffic scaling → checked, not supported (the campaign-driven latency increase is a separate, uncorrelated cohort with none of this signature).
   - Documented new functionality in v3.4 → checked, not supported (the published changelog describes nothing matching this profile).
   - Legitimate current use of the `legacy_cohort_id` range → checked, not supported (no cohort is mapped to it).

All three gates pass.

## Branch classification

- **Q4 applies:** onset aligns precisely with the `featurepack` v3.4 bump — the dependency change is the primary lead, independent of whether it was signed or passed its vulnerability scan.
- **Q3 applies:** three independent signal categories (timing, resource, egress metadata) deviate together, same trigger, same window, benign causes checked → Confirmed Execution-Compromise Indicator.
- **Q5 applies:** trigger-matching traffic is growing, not static → trajectory override.

No criticality override applied in this example (component not pre-designated critical) — noted explicitly rather than left ambiguous.

## Score

**Magnitude, per category, before combining:**

| Category | Reading | Band |
|---|---|---|
| Execution-timing | 40x baseline duration | High (30) — >10x band |
| Resource-utilization | CPU 98% vs. ~35% baseline (~2.8x), memory not reclaimed across GC cycles | High (30) — the non-reclaimed-growth clause, not the raw CPU ratio alone |
| Network/egress metadata | Contact with a novel, undocumented endpoint (`telemetry-aggregate-sync.net`); no entropy/DGA pattern observed in this scenario, and no evidence its registration postdates the deviation by only days | Medium (15) — novel undocumented endpoint, but the two High-tier extra red flags aren't present here |

**Combination rule applied:** Magnitude = highest of the three = **30** (execution-timing and resource-utilization tie at High; network stays at Medium and doesn't add on top).

| Factor | Points | Why |
|---|---|---|
| Corroboration breadth | 40 | 3 independent categories, same trigger/window |
| Magnitude | 30 | Highest per-category band among the three (execution-timing and resource-utilization both High) — see derivation above |
| Trigger specificity & trajectory | 30 | Narrow, specific trigger + growing volume |
| **Total** | **100** | |

**Evidence state:** Confirmed Execution-Compromise Indicator — for "this is a real, security-relevant execution anomaly." **Not established:** whether the underlying cause is deliberate (a conditional backdoor introduced via the dependency) or an unintentional defect/debug hook left in `featurepack` by its own maintainers. Both remain consistent with the evidence; this skill does not pick one.

**Recommendation:** Escalate — containment recommended, with the trajectory override (Q5) stated as an independent, additional reason.

## What a conventional scan would have missed

The dependency bump passed the standard SCA/vulnerability scan — no CVEs. A standard APM dashboard would show "P99 latency up 15%," fully and correctly explainable by the documented marketing campaign in the same window. The real anomaly is narrower, reproducible, and hidden underneath that legitimate explanation rather than instead of it — a scan or dashboard reviewed at the aggregate level never isolates the trigger-specific signature underneath.
