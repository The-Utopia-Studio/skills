> **⚠️ SUPERSEDED — historical record; content re-derived under the current architecture.** This run's scenario and evidence were already QSP-native (STG was reported clean throughout, not correlated against), but the scoring (Crypto/Behavioral/Execution weighted composite) and branch language (Branch D, Branch C) refer to the deprecated combined QSP+STG model. The three Gotchas this run surfaced directly drove the architecture reset: the ~40-point structural cap on QSP's contribution, the undefined QSP/STG boundary for network/egress signals, and trajectory not being a first-class factor. All three are resolved by construction in the current QSP-only skill — see `SKILL.md`'s Gotchas section. **The canonical, current version of this scenario is [../references/worked-example.md](../references/worked-example.md)**, re-scored under the QSP-only gates/factors model with no cross-product framing. Kept here as historical evidence of the run that prompted the redesign.

# Quantum × AI Exposure Triage — Decision Brief (historical, combined QSP+STG model)

**Scenario (composite, built to test whether QSP evidence can independently drive the decision, and whether the skill distinguishes benign workload variance from a meaningful execution anomaly):** `RankSvc`, an internal production recommendation-ranking microservice, called ~50k times/minute behind an internal API gateway. No SolarWinds-pattern facts reused — different mechanism, different telemetry, different trigger logic.

**Run type:** Third real sandbox test of `quantum-ai-exposure-triage`. Read-only evaluation — no skill changes made as part of this run.

---

## Scenario detail

**Baseline (10-day window):** P50 latency 8ms, P99 22ms, CPU ~35%/pod, RSS ~600MB/pod stable, no GC-pause anomalies.

**9 days ago:** `RankSvc`'s feature-serialization dependency (`featurepack`) was bumped v3.2 → v3.4 through the normal internal package registry. The update passed the standard automated SCA/dependency vulnerability scan with no CVEs flagged.

**Since the bump, three reproducible QSP signals, all co-occurring on the same trigger condition:**

1. **Execution-time anomaly:** requests carrying the (nominally deprecated) `legacy_cohort_id` field with a value in the narrow range 12000–12050 take ~340ms instead of the 8ms baseline — a 40x spike. Reproducible under controlled replay. Not present before the dependency bump.
2. **Resource-utilization anomaly:** on the same trigger, CPU on the serving pod spikes to 98% for the request's duration, and RSS memory grows ~40MB per triggered request, not fully reclaimed after GC — a slow, trigger-gated leak.
3. **Egress metadata anomaly:** pods that processed at least one triggering request make a single outbound DNS resolution 60–90 seconds later to `telemetry-aggregate-sync.net` — a domain absent from `RankSvc`'s documented dependency list, registered 11 days ago (2 days before the `featurepack` bump), with no legitimate registrant information on record. Metadata only (query name + timing) — no packet content inspected, consistent with the non-intrusive-telemetry principle.

**Trend:** traffic matching the trigger condition is not static — it has been slowly ramping over the 9-day window, on a field with no current legitimate cohort mapped to it (the field is deprecated; no documented reason live traffic should be hitting that value range at all, let alone a growing amount of it).

**Separately, and not correlated with the trigger:** fleet-wide P99 latency crept up 15% over the same 9 days. Investigated and attributed in full to a documented, ticketed 22% traffic increase from a legitimate marketing campaign — this cohort shows none of the CPU/memory/DNS signature and is excluded from the finding below. Named explicitly so it isn't mistaken for corroborating evidence.

**Identity/authorization/crypto layer, checked and clean throughout:** service mTLS certs current and unchanged, IAM roles unchanged, no forged tokens, no anomalous service-account or session behavior anywhere in the environment.

---

## Observation → Interpretation → Hypothesis → Evidence → Confidence

### Finding — Input-triggered execution/resource/egress anomaly, dependency-correlated

| Stage | Content |
|---|---|
| **Observation** | Three signals co-occur only when `legacy_cohort_id` falls in 12000–12050: a 40x execution-time spike, a CPU/memory profile inconsistent with the service's documented function, and a single covert DNS resolution to an undocumented, recently-registered domain. All three appeared together starting immediately after the `featurepack` v3.4 bump; none existed before it. |
| **Interpretation** | A narrow, specific input value is triggering behavior `RankSvc` was never designed to perform — extra computation, memory retention, and an outbound signal to infrastructure the service has no legitimate reason to know about. The trigger condition sits on a deprecated field with no mapped legitimate use, and matching traffic is growing, not static — consistent with probing or a gradual, deliberate rollout rather than an artifact of normal usage. |
| **Hypothesis** | A conditional backdoor or undocumented capability was introduced via the `featurepack` v3.4 dependency, activating extra computation and covert egress on a specific trigger value. |
| **Evidence for** | Three independently reproducible signals, causally linked (same trigger, same time window), tied precisely to the dependency bump's timing; the domain's registration (11 days ago, 2 days pre-bump, no legitimate registrant) is consistent with attacker-controlled infrastructure staged ahead of the update; the deprecated field's traffic pattern (ramping, unmapped to any real cohort) has no organic explanation. |
| **Evidence against / benign alternatives checked** | Checked and not supported: general traffic scaling (the marketing-campaign latency increase is a separate, uncorrelated cohort with none of this signature); documented new functionality in v3.4 (the published changelog describes nothing matching this CPU/memory/DNS profile); legitimate current use of the `legacy_cohort_id` range (no cohort is mapped to it). **Not ruled out:** an unintentional defect or a leftover debug/telemetry hook left in `featurepack` by its own maintainers rather than a deliberately malicious backdoor. |
| **Confidence** | High that the anomaly is real, reproducible, and security-relevant. Medium-to-high that it reflects deliberately introduced behavior rather than an unintentional defect, given the staged-domain timing. Not established: attribution to any specific actor, or whether data has actually left the environment via the DNS channel. |

---

## Score

| Dimension | Score | Basis |
|---|---|---|
| Cryptographic Exposure | 5/100 | Genuinely clean, not merely unexamined — certs, keys, and TLS posture checked and unchanged throughout. |
| Behavioral Trust Deviation (STG) | 8/100 | No identity, session, credential, or human/AI-agent-kinematic anomaly anywhere in the environment. (See Gotcha 2.) |
| Execution / Side-Channel Anomaly (QSP) | 90/100 | Three independently reproducible, causally-linked signals, dependency-timing correlation, benign explanations checked and discounted. |
| **Initial Exposure Priority Score (raw)** | ≈ 40/100 (0.2×5 + 0.4×8 + 0.4×90) | Bottom edge of the INVESTIGATE band. |

**Evidence state: Corroborated Exposure** for "this is a real, security-relevant anomaly, not workload noise." **Suspected, not corroborated,** for "this is deliberately malicious" specifically — the unintentional-defect alternative remains open.

**Threshold override applied, stated explicitly:** raw score (40) sits barely inside Investigate, driven almost entirely by QSP since Crypto and STG are both near-zero. Given a live production service, a growing (not static) trigger pattern, and an outbound channel to attacker-shaped infrastructure staged ahead of the deploy, attack-path criticality justifies escalating to CONTAIN/Escalate rather than accepting the raw-score default.

---

## Branch taken

Enters via Branch D (trusted artifact — passed the standard SCA scan, provenance appeared legitimate — but behavior materially deviates from baseline; the scan result is not treated as exculpatory). Does not escalate via Branch C, because Branch C requires independent STG corroboration in the same window, and STG is clean here by this run's classification — instead, the three QSP signals corroborate each other, within the same dimension. No branch in the current set (A–G) names "QSP-internal self-corroboration without an STG partner" as its own path — D is the closest fit, but the escalation logic that got this brief to CONTAIN isn't the mechanism any existing branch actually describes. See Gotcha 1.

---

## Uncertainties — what this brief does not conclude

1. Intent is not established — deliberate backdoor vs. unintentional defect/debug hook in `featurepack` remains open.
2. No confirmation of data exfiltration — only the DNS resolution itself was observed (metadata, non-intrusive); whether any data left via that channel is unknown.
3. No actor attribution — domain-registration timing is suggestive, not proof of who controls it.
4. The unintentional-defect alternative hasn't been fully closed out — would require contacting `featurepack`'s maintainers or diffing v3.2→v3.4 source, neither performed in this evaluation.

---

## Recommended action

**Immediate:** Pin `RankSvc` to `featurepack` v3.2 (last known-clean version) or isolate pods currently serving traffic in the 12000–12050 `legacy_cohort_id` range; block egress to `telemetry-aggregate-sync.net` at the network layer; preserve the affected pods' memory/process state before remediation destroys it.

**Broader (score-and-context-driven, override applied):** CONTAIN/Escalate — diff `featurepack` v3.2 vs v3.4 source, check for other services sharing the dependency, and resolve the intent question before deciding whether this is a supply-chain incident or a vendor bug report.

---

## What a conventional review would have missed

A standard APM/monitoring dashboard would show "P99 latency up 15%" and a standard SCA/dependency scan would show "no CVEs" — both technically true, and both explainable by the real, documented, legitimate marketing-driven traffic increase happening in the same window. The actual anomaly is narrower, reproducible, and hidden underneath that legitimate explanation rather than instead of it — a conventional review stops at the aggregate number and never isolates the trigger-specific signature underneath it.
