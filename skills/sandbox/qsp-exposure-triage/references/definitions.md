# Definitions

## QSP — Quantum Security Probe

A non-intrusive security probing and measurement capability that operates primarily through available telemetry and metadata rather than inspecting packet contents or intercepting production payloads.

QSP assesses security-relevant changes in system execution and infrastructure behavior using observable signals such as cryptographic operations, execution timing, resource utilization, system behavior, and other measurable characteristics that may reveal anomalous or potentially exploitable behavior.

QSP should not automatically classify a deviation as an attack. Its role is to identify and characterize meaningful deviations from an appropriate baseline and provide evidence for further investigation.

## Core architectural principle

QSP operates through non-intrusive telemetry, metadata, execution characteristics, and system behavior wherever possible. It should not require packet-content inspection or invasive modification of production traffic.

This is a design constraint, not a marketing claim: any finding or recommendation this skill produces should stay within what's observable through telemetry/metadata/execution signals. If a proposed investigative step would require packet-content inspection or intercepting production payloads, flag that explicitly as a departure from the non-intrusive default rather than folding it silently into the recommendation.

## Scope note

QSP is one of several independent capabilities in its product family. This skill covers QSP only. It does not reference, score, correlate with, or depend on any other capability — including identity, behavioral-trust, or human/AI-agent interaction analysis. Where a finding would require that kind of evidence to fully resolve, this skill says so explicitly and stops, rather than reaching for it.

## Cryptographic-operation behavior — scope boundary

QSP can observe the *execution behavior* of cryptographic operations: timing, frequency, and invocation pattern of signing, encryption, or key-derivation calls, exactly as it observes any other execution signal. QSP does **not** assess cryptographic *posture* — algorithm choice, PQC readiness, certificate/key inventory, or compliance status. That is a configuration/audit question, not a telemetry-observable execution-behavior question, and is out of scope for this skill.
