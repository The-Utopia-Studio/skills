---
name: qsp-exposure-triage
description: "Use when a trusted, already-compliant system or component needs its live execution behavior checked, not its configuration — e.g. \"is this anomaly noise, a bug, or something worth investigating?\", \"our monitoring shows something odd in [service] — timing, resource use, or network behavior that doesn't match baseline\", \"before we approve this for production, characterize what's actually happening at runtime, not just what's configured,\" or \"distinguish benign workload variance from a real execution anomaly.\" Produces a QSP-only Execution Anomaly Brief: baseline-vs-deviation evidence across execution-timing, resource-utilization, process/system-behavior, network/egress metadata, and cryptographic-operation-behavior telemetry (metadata only, never packet content), a gated 0-100 severity score (provisional calibration values, not validated thresholds), and a Monitor / Flag for review / Escalate for investigation / Escalate with containment recommended call. Does NOT assess identity, authentication, sessions, human or AI-agent behavioral/kinematic signals, or cryptographic algorithm/PQC compliance posture — all explicitly out of scope. Not a vulnerability scanner or compliance auditor; use this when the question is what a clean scan wouldn't show about live execution behavior."
metadata:
  status: sandbox-proposed
  author: vijay@vyaptiresonance.com
  architecture_version: 2 (QSP-only)
  supersedes: quantum-ai-exposure-triage (combined QSP+STG scoring model, deprecated — see evals/ for the superseded runs)
---

# QSP Exposure Triage

QSP (Quantum Security Probe) is a non-intrusive execution and telemetry measurement capability. This skill is QSP-only: it characterizes deviations in a system or component's own execution behavior against its own baseline, using telemetry and metadata alone. **It is completely independent of STG (Sentient TrustGraph)** — a separate product covering identity, behavioral trust, and human/AI-agent interaction kinematics. This skill contains no STG terminology, scoring, correlation, or branch logic anywhere, by design. If the question in front of you is about identity, sessions, authorization, or human/agent behavioral kinematics, this skill does not apply — that is a different product's scope entirely, not a gap in this one.

## What QSP observes

Grounding definition (unchanged from the product's own charter — see [references/definitions.md](references/definitions.md)):

> A non-intrusive security probing and measurement capability that operates primarily through available telemetry and metadata rather than inspecting packet contents or intercepting production payloads. QSP assesses security-relevant changes in system execution and infrastructure behavior... QSP should not automatically classify a deviation as an attack. Its role is to identify and characterize meaningful deviations from an appropriate baseline and provide evidence for further investigation.

Three consequences that shape everything below:

- **QSP watches behavior, not configuration.** It has no opinion on whether an algorithm is compliant, a policy is correctly set, or a control exists — only on whether live execution matches the component's own established baseline. A clean compliance/vulnerability scan and a QSP finding answer completely different questions.
- **QSP observes telemetry and metadata, never content.** Timing, size, frequency, resource consumption, a DNS query name, a process invocation — never packet payload or message content.
- **QSP characterizes; it does not verdict.** It should not auto-classify a deviation as an attack. Every score, branch, and recommendation in this skill hands off evidence for investigation — it never declares compromise confirmed or names an actor.

## Signal categories — what each can and cannot establish

| Category | Establishes | Cannot establish |
|---|---|---|
| Execution-timing | Duration/latency of an operation vs. its own baseline, per context (workload, input class, time) | *Why* it changed — cause requires correlating with other signals and the false-positive check |
| Resource-utilization | CPU, memory, I/O, file-handle, GC/allocation patterns vs. baseline | Whether resource use is malicious vs. a legitimate new workload |
| Process/system-behavior | Process creation, scheduled-task/service changes, command-invocation patterns, via logs/event telemetry | Intent behind a command — only that it ran and how it compares to baseline |
| Network/egress metadata | Connection metadata, DNS query metadata, traffic volume/shape/entropy | What was actually sent — content is out of reach by design |
| Cryptographic-operation behavior | Timing, frequency, invocation pattern of signing/encryption/key-derivation *calls* | Whether the algorithm is compliant, or what the operation's output was subsequently used for — **crypto-posture/PQC-compliance auditing is explicitly out of scope for this skill** |

**A structural lesson worth stating plainly:** a component's own self-reported telemetry is itself just another signal to baseline, never ground truth. A C2 channel can be shaped to look exactly like a product's legitimate diagnostic schema. Treat "this is what the component says it's doing" as a claim to verify against independent signals, not an authoritative source.

## When NOT to use

- The question is about identity, authentication, sessions, authorization, or human/AI-agent behavioral or kinematic signals — that's a different product's domain (not named here; this skill doesn't reference it), and this skill has nothing to say about it.
- There's no reliable baseline for the signal in question — run this only after a calibration period, or explicitly flag every finding as Insufficient Evidence for lack of baseline.
- The question is "are we compliant" (algorithm posture, PQC readiness, certificate inventory) — that's a compliance/audit skill, not this one.
- You're being asked to attribute an incident to a specific actor. This skill characterizes execution-level anomalies and recommends investigation; it does not identify who.

## The judgment model

Every finding must move through all six stages before it earns a score:

1. **Baseline** — a reliable normal for this signal, in this context. No baseline → capped at Insufficient Evidence, full stop.
2. **Deviation** — magnitude and direction vs. baseline.
3. **Reproducibility** — reproduces under replay/repeated observation, or a one-off.
4. **Trigger correlation** — tied to an identifiable condition (input pattern, deployment, dependency, config change), or diffuse and unexplained.
5. **Trajectory** — static, growing, shrinking, or intermittent over time.
6. **Benign-cause elimination** — which known benign causes (see [references/false-positive-handling.md](references/false-positive-handling.md)) were actively checked, not assumed absent.

Hypotheses stay execution-level only: bug, misconfiguration, resource exhaustion/DoS, unauthorized code execution, supply-chain-introduced behavior, hardware/infra fault. Never an identity or actor hypothesis.

## The expert tell

A compliance or vulnerability scan checks configuration and known-bad signatures — SCA passes, no CVEs, certs current. It never asks whether a component's *live* execution matches what it's declared to do. The expert's tell is a **declared-function / observed-execution discontinuity**: the same trusted, scanned-clean component, but its timing, resource, or egress behavior has materially and reproducibly changed. Immediately ask:

- Does this deviation reproduce, or was it a one-off?
- Is it trigger-specific (suspicious) or diffuse (probably benign)?
- Did it start exactly when a deployment, dependency, or config change landed?
- Is it growing, or has it plateaued?
- Have the obvious benign explanations actually been checked — or just assumed away because the scan came back clean?
- Am I trusting the component's own self-reported telemetry as ground truth, when it should be just another signal to verify?

A scan that passes tells you the component is configured correctly. It tells you nothing about whether the component is *doing* what it's configured to do — that gap is this skill's entire reason to exist.

## Evidence ladder

| State | Criteria |
|---|---|
| Insufficient Evidence | No reliable baseline, or a single unreplicated observation |
| Anomalous (Unconfirmed) | Reproducible deviation, one signal category, benign causes not yet fully checked |
| Anomalous (Corroborated) | Reproducible deviation across ≥2 independent signal categories on the same trigger/window, **or** one category with benign causes actively ruled out |
| Confirmed Execution-Compromise Indicator | Multiple independent categories deviate together, causally tied to an identifiable trigger/change, benign causes ruled out, pattern inconsistent with the component's documented function |

Named "**Indicator**," deliberately — the top rung says the evidence is confirmed, not that a compromise is confirmed.

## Scoring

**These point values are provisional calibration defaults, not scientifically validated thresholds.** Recalibrate against real QSP history before trusting them operationally. Full detail in [references/scoring-rubric.md](references/scoring-rubric.md).

**Gates** (must all pass before any score above Insufficient Evidence):
1. Reliable baseline exists.
2. Deviation is reproducible.
3. The most plausible benign causes have been checked (see false-positive handling).

**Factors** (only scored once gated):

| Factor | Points | Basis |
|---|---|---|
| Corroboration breadth | 0–40 | 1 category=10, 2 independent categories same window=25, 3+=40 |
| Magnitude | 0–30 | Per-category tiered bands below, combined by the rule below when multiple categories fire |
| Trigger specificity & trajectory | 0–30 | Diffuse+stable=5; narrow+stable=15; narrow+growing/spreading=30 |

Total 0–100.

**Magnitude bands, one tiered scale per signal category — provisional calibration defaults, not validated thresholds:**

| Category | Low (5) | Medium (15) | High (30) |
|---|---|---|---|
| Execution-timing | <2x baseline duration | 2–10x baseline duration | >10x baseline duration |
| Resource-utilization | <2x baseline (CPU/memory/I-O/handle count) | 2–10x baseline | >10x baseline, or growth not reclaimed across normal GC/cleanup cycles |
| Process/system-behavior | Single anomalous process/task/service event, not yet reproduced | Reproducible anomalous event, otherwise unexplained | Reproducible AND self-concealing/self-reverting (e.g. a task or config that reappears after being reverted), or the event sits entirely outside the component's documented function (disabling logging, modifying security tooling, spawning a shell) |
| Network/egress metadata | Contact with an endpoint outside the documented dependency list but otherwise unremarkable | Contact with a novel, undocumented endpoint, no plausible legitimate explanation found | Novel undocumented endpoint plus at least one more red flag — high query-name entropy/DGA-like pattern, or the endpoint's registration/provisioning postdates the deviation's onset by only a few days |
| Cryptographic-operation behavior | <2x baseline deviation in timing/frequency of crypto-operation calls | 2–10x baseline | >10x baseline, or invocation from a caller/context never observed at baseline for that operation |

**Combination rule when multiple categories fire (Q3):** Magnitude = the **highest** of the per-category scores among the categories that passed all three gates — never summed across categories. Corroboration breadth already rewards the *number* of independently corroborating categories; summing magnitude on top would double-count that same breadth inside a second factor. Magnitude answers "how severe is the most severe piece of evidence," not "how many severe things are there."

## Decision thresholds and overrides

QSP recommends; it does not order action. **These score bands (0–24 / 25–49 / 50–74 / 75–100) are provisional calibration defaults, exactly like the scoring factors above — not scientifically validated thresholds. They require calibration against real QSP runs before being trusted operationally**, and that uncalibrated status should be stated whenever a recommendation is presented.

| Score | QSP recommends |
|---|---|
| 0–24 | Monitor |
| 25–49 | Flag for review |
| 50–74 | Escalate for investigation |
| 75–100 | Escalate — containment recommended |

**Overrides — named, explicit, never applied silently:**

- **Trajectory override:** deviation is growing/spreading in volume, scope, or magnitude over time → justifies escalating above raw score, stated explicitly in the brief.
- **Criticality override:** the affected component is pre-designated critical (payment processing, auth-adjacent infra, safety-critical control) → same, stated explicitly.

## Playbook branches

**Pattern branches** (classify what was observed):

- **Q1 — Diffuse, environment-wide, single category.** Not trigger-specific → check the false-positive taxonomy first; if a benign cause fits, close as explained variance.
- **Q2 — Narrow, trigger-specific, single category.** Reproducible, gated on a specific condition, one category → Anomalous (Unconfirmed/Corroborated) per the benign-cause check; investigate the specific code path/config/dependency producing it.
- **Q3 — Multi-signal corroboration, same trigger/window.** ≥2 independent categories deviate together, reproducible, benign causes checked → Confirmed Execution-Compromise Indicator. QSP's strongest internally-corroborated finding — corroboration stays entirely within QSP's own signal categories.
- **Q4 — Correlates with a known change event.** Onset aligns precisely with a deployment/dependency/config change → treat the change as the primary investigative lead, regardless of signal count. Explicitly agnostic to signature/provenance validity — that determination is a different capability's job; QSP only reports that telemetry deviated after the change.
- **Q7 — Cryptographic-operation telemetry deviation.** Timing/frequency/invocation-pattern anomaly in crypto operations, via execution telemetry only → potential side-channel or unauthorized-use signal on the crypto subsystem; recommend key/cert rotation and an audit of what invoked the operation. No claim about what any operation's output was subsequently used for.

**Escalation modifiers** (apply on top of any pattern branch — not mutually exclusive with it):

- **Q5 — Trajectory** (growing/spreading) — see Decision thresholds and overrides.
- **Q6 — Designated-critical execution path** — see Decision thresholds and overrides.

Full IF/THEN logic in [references/playbook-branches.md](references/playbook-branches.md). Worked example in [references/worked-example.md](references/worked-example.md).

## False positives and insufficient evidence

Full taxonomy in [references/false-positive-handling.md](references/false-positive-handling.md). A finding cannot exceed Anomalous (Unconfirmed) until the relevant benign causes for its signal category have been actively checked, not assumed absent. Always Insufficient Evidence: no reliable baseline; a single unreplicated observation; a deviation whose only support is the component's own self-reported telemetry with no independent corroborating signal.

## Common mistakes

The load-bearing ones (full list in [references/common-mistakes.md](references/common-mistakes.md)):

1. **Anomaly = attack.** Differs from baseline ≠ why it differs.
2. **One measurement becomes the verdict.** Timing, CPU, resource, or DNS alone almost always has a benign explanation on its own.
3. **Trusting a component's own self-reported telemetry as ground truth.** It's a signal to verify, not an authority.
4. **Treating a clean compliance/vulnerability scan as proof of safety.** That gap is this skill's entire reason to exist.
5. **Manufacturing precision.** The scoring point values are provisional calibration defaults — say so when presenting a score, don't present them as validated thresholds.
6. **Declaring attribution.** Identifying an actor is out of scope; this skill characterizes execution behavior, not who caused it.

## What good looks like

**Mediocre:** "Latency spike detected. Score: 78. Investigate."

**Strong:** "Execution-timing and resource-utilization both deviate reproducibly on a specific input trigger, correlated precisely with a dependency change 9 days ago. A separate, larger fleet-wide latency increase was checked and fully attributed to a documented traffic campaign — excluded from this finding. Trigger-matching volume is growing, not static. Deliberate vs. unintentional-defect origin remains unresolved; recommending containment on the trigger-specific traffic while that's investigated, not a full-service shutdown."

Every brief should close with what a conventional compliance/vulnerability scan would have missed — that's the deliverable's reason to exist. State plainly when the scoring point values are uncalibrated for the system in question.

## Gotchas

Architecture reset from the combined QSP+STG model (see `evals/` for the three original runs, now annotated). Several gotchas surfaced under that model are resolved by this redesign, not by a rule patch:

**Resolved by this rework:**
- The old model structurally capped QSP's contribution at ~40-44 points regardless of evidence strength, because it shared a fixed weight with two other dimensions. Gone by construction — QSP now scores itself.
- The old model had an undefined boundary between QSP and STG for service-to-infrastructure signals (e.g., was an unexpected outbound connection a QSP or an STG finding?). Gone by construction — everything observable via non-intrusive telemetry about a component's own behavior is unambiguously this skill's domain now; there is no second product to draw a line against here.
- Trajectory/velocity was previously an ad hoc narrative detail. Now a named branch (Q5) and scoring factor.

**Anticipated, not yet observed under the new architecture:**
- The corroboration-breadth point values (10/25/40 for 1/2/3+ categories) haven't been tested against a real case with exactly 2 categories to check whether that breakpoint is right.
- The trajectory and criticality overrides are structural now, but still require someone to check for them explicitly — worth watching whether that's enough to prevent the "only fires if invoked deliberately" failure the old ad hoc override had.
- No case has yet tested Q7 (cryptographic-operation telemetry) on its own, in isolation from the other branches.
