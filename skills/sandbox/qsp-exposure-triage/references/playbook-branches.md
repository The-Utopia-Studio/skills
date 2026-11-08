# Playbook branches

Pattern branches classify what was observed. Escalation modifiers apply on top of any pattern branch — they are not alternatives to it, and a single finding can trigger a pattern branch plus both modifiers at once.

## Pattern branches

### Q1 — Diffuse, environment-wide deviation, single signal category

**IF:**
- Deviation is not tied to a specific, identifiable trigger condition — it shows up broadly across traffic, instances, or time;
- Only one signal category is affected;
- A plausible benign cause (see [false-positive-handling.md](false-positive-handling.md)) fits the pattern and has not yet been ruled out.

**THEN:**
- Check the false-positive taxonomy first, before any further investigation.
- If a benign cause fits and is confirmed (not just plausible), close the finding as explained variance — record what was checked and how it was confirmed.
- If no benign cause fits, or a claimed benign cause doesn't hold up under check, re-open as Q2.

### Q2 — Narrow, trigger-specific deviation, single signal category

**IF:**
- Deviation is gated on a specific, identifiable condition (an input value, a request type, a specific host/pod) rather than diffuse;
- Reproducible under replay;
- Only one signal category is affected so far.

**THEN:**
- Classify as Anomalous (Unconfirmed) or Anomalous (Corroborated) depending on whether benign causes have been checked (see evidence ladder).
- Investigate the specific trigger logic — the code path, configuration, or dependency that produces the gated behavior — as the primary lead.
- Actively look for a second, independent signal category on the same trigger before concluding the investigation; absence of a second signal is itself worth noting, not just silence.

### Q3 — Multi-signal corroboration, same trigger/window

**IF:**
- ≥2 independent signal categories deviate together;
- On the same trigger condition or time window;
- Against a reliable baseline for each category involved;
- Benign causes for each affected category have been checked.

**THEN:**
- Classify as Confirmed Execution-Compromise Indicator.
- This is QSP's strongest internally-corroborated finding type — corroboration stays entirely within QSP's own signal categories; no external product's evidence is needed or referenced to reach this state.
- Escalate per the score and any applicable overrides (Q5/Q6).

### Q4 — Correlates with a known change event

**IF:**
- The deviation's onset aligns precisely with an identifiable change — a deployment, a dependency version bump, a configuration change;
- Regardless of how many signal categories are affected.

**THEN:**
- Treat the change itself as the primary investigative lead — diff or audit that specific change before broader investigation.
- This branch is explicitly agnostic to signature or provenance validity. Whether the change was signed, from a trusted registry, or passed a vulnerability scan is a different capability's determination — QSP's contribution is only that telemetry deviated after the change, and that fact holds regardless of the change's trust status.
- Often the fastest path to root cause — check this correlation early, not as a last resort.

### Q7 — Cryptographic-operation telemetry deviation

**IF:**
- Timing, frequency, or invocation-pattern anomaly is observed specifically in cryptographic operations (signing, key derivation, encryption/decryption calls);
- Observed via execution telemetry only — never packet content;
- Independent of any claim about algorithm compliance or key/certificate posture (out of scope — see [definitions.md](definitions.md)).

**THEN:**
- Treat as a potential side-channel or unauthorized-use signal on the crypto subsystem itself.
- Recommend key/certificate rotation and an audit of what process or caller invoked the operation.
- Do not claim what the operation's output was subsequently used for, or by whom — that requires evidence outside this skill's scope. Report the execution-telemetry finding and stop there.

## Escalation modifiers

Apply on top of any pattern branch above.

### Q5 — Trajectory override

**IF:**
- The deviation's volume, scope (e.g., spreading to more instances or trigger values), or magnitude is increasing over time, rather than static or intermittent.

**THEN:**
- Treat the trajectory itself as an aggravating factor, justifying a recommendation above what the raw score alone would indicate.
- State the override explicitly in the brief — name it as an override, don't fold it silently into a higher score.

### Q6 — Criticality override

**IF:**
- The affected component is pre-designated by the operator as critical (e.g., payment processing, authentication-adjacent infrastructure, safety-critical control).

**THEN:**
- Escalate the recommendation above raw score, stated explicitly.
- This override is about system topology and business criticality — it requires no evidence about identity, behavior, or trust; only where the component sits.
