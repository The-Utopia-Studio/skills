> **⚠️ SUPERSEDED — historical record only.** This run used the deprecated combined QSP+STG scoring model (crypto/behavioral/execution weighting, Branches A–G). The skill has since been split: QSP and STG are independent products, and `qsp-exposure-triage` now covers QSP only. **Finding 2 below (forged SAML tokens, DCSync, domain-trust reconfiguration, "impossible travel") is entirely STG/identity material and is out of scope for the current QSP-only skill.** Finding 1 (signed-artifact-but-deviant-execution-behavior) and the DGA/dormancy/disguised-telemetry evidence remain QSP-relevant and were carried forward — see `references/worked-example.md` and `references/common-mistakes.md` (mistake #3, self-reported telemetry as ground truth). The ~90/100 score and BLOCK/Emergency call in this document relied on the STG finding for its strongest corroboration; a QSP-only assessment of this same scenario would land at a lower-confidence, lower-urgency call. Kept here as historical evidence per the architecture-reset decision, not as a current QSP output.

# Quantum × AI Exposure Triage — Decision Brief (historical, combined QSP+STG model)

**Target scenario:** SolarWinds Orion / SUNBURST supply-chain compromise → Azure AD/M365 follow-on activity (CISA, March 17 2021, updated April 15 2021)
**Run type:** First real sandbox test of `quantum-ai-exposure-triage`
**Framing:** Evaluated as a defender would have, working from the observable telemetry in the CISA writeup — not from the later government attribution, so the brief can be judged on whether cross-layer correlation alone gets to the right call.

---

## Observation → Interpretation → Hypothesis → Evidence → Confidence (top findings)

### Finding 1 — Signed artifact, deviant runtime behavior (Branch D entry point)

| Stage | Content |
|---|---|
| **Observation** | Orion DLL containing SUNBURST is signed with a valid SolarWinds code-signing certificate; distributed through the normal update channel; provenance and vendor identity check out. Runtime behavior deviates: an engineered 12–14 day dormancy period, then a pre-beacon check (`fsutil volume diskfree c:`) before writing artifacts, then C2 traffic shaped as `HTTP PUT`/`POST` carrying a JSON payload (`userId`, `sessionId`, `steps`) with `EventType` hardcoded to `"Orion"` and `EventName` to `"EventManager"` — i.e., disguised as Orion's own legitimate telemetry. |
| **Interpretation** | A validly signed, vendor-distributed component is doing something its signature says nothing about: waiting out analysis windows, checking disk conditions before staging, and exfiltrating over a channel deliberately shaped to look like the product's own diagnostics. |
| **Hypothesis** | Trusted-component / supply-chain compromise — the build or distribution pipeline itself was subverted, not just a single deployed instance. |
| **Evidence for** | Reproducible artifact (CISA + Microsoft + FireEye + Volexity converge on the same behavioral chain); dormancy + disk-check + disguised-telemetry pattern has no benign explanation in Orion's documented functionality. |
| **Evidence against / unresolved** | Per the source doc's own caveat: "not all techniques have been used in every incident" — this composite is drawn from multiple victim environments, not confirmed present in full in any single one. A specific environment being triaged still needs to confirm which of these artifacts actually fired locally. |
| **Confidence** | High that the behavior is anomalous and inconsistent with legitimate Orion function. High that signature/provenance are not exculpatory here — this is the textbook Branch D case. |

### Finding 2 — Forged identity, absent expected relationship (STG cross-layer discontinuity)

| Stage | Content |
|---|---|
| **Observation** | Forged SAML tokens (T1606.002), built from a stolen ADFS token-signing private key (T1552.004), used to impersonate arbitrary users and bypass MFA (T1550). Detection signature: SSO logins to service providers with **no corresponding on-prem Kerberos events (4769, 1200, 1202)** — the authentication chain that should precede a legitimate federated login is missing. Separately: DCSync replication requests (T1003.006) from an IP not on the domain-controller allow-list, and a domain trust reconfiguration (T1484.002) pointing federation at a new signing cert. |
| **Interpretation** | Every one of these is a case of valid-looking trust with an absent or wrong upstream relationship: a login says "authenticated user," but the identity infrastructure that should have produced that login didn't; a DCSync request says "domain controller," but comes from a host that isn't one. This is the STG "expected relationship" model — not a stolen password, a **forged relationship**. |
| **Hypothesis** | Identity-infrastructure compromise enabling persistent, MFA-bypassing impersonation across the AD/M365 estate. |
| **Evidence for** | Multiple independent artifacts converge on the same hypothesis (missing Kerberos chain, DCSync source mismatch, federation trust modification, "impossible travel" on privileged/service accounts, added Azure service-principal credentials, mailbox delegation/export abuse). |
| **Evidence against / unresolved** | The "impossible travel" and multi-ASN signals alone have a known benign explanation (legitimate VPN use) — the source doc flags this explicitly. Kept as corroborating, not load-bearing, evidence for that reason. |
| **Confidence** | High — the strongest-corroborated finding in the set; five-plus independent artifacts on privileged identity infrastructure in the same operational window. |

### Where Finding 1 and Finding 2 correlate → Branch C

Both findings sit on the same attack path (build/update pipeline → privileged execution → identity/federation infrastructure → mailbox/data access) and their windows overlap. That satisfies Branch C's requirement: independent STG and QSP-style signals, same relevant time window, benign explanations checked and largely ruled out (VPN/geolocation noise explicitly discounted, not ignored).

---

## Score

| Dimension | Score | Basis |
|---|---|---|
| Cryptographic Exposure | **88/100** | Not weak/outdated crypto — strong cryptography whose **private key material was stolen and actively weaponized** (ADFS signing key → forged SAML tokens; SolarWinds signing cert → trusted malware). See Branch G. |
| Behavioral Trust Deviation (STG) | **92/100** | Forged identity impersonation bypassing MFA, DCSync from non-DC source, domain trust reconfiguration, mailbox/service-principal manipulation — all on privileged paths. |
| Execution / Side-Channel Anomaly (QSP) | **88/100** | Engineered dormancy, DGA-based DNS beaconing (high subdomain entropy), disguised-as-telemetry C2 schema, self-reverting scheduled-task manipulation, timestomping, audit-log/firewall tampering. |
| **Initial Exposure Priority Score** | **≈ 90/100** (0.2×88 + 0.4×92 + 0.4×88) | |

**Evidence state: Corroborated Exposure.** Independent signals from two different layers (identity/behavioral and execution/telemetry) on the same privileged path, with plausible benign explanations for the weaker individual signals (VPN geolocation) explicitly checked and discounted.

---

## Branch taken

**Branch G → Branch D → Branch C.** The stolen SolarWinds signing certificate and ADFS token-signing key are strong-crypto-with-stolen-key-material (Branch G, added as a result of this run — not crypto technical debt, Branch A). Branch D applies directly to the signed-but-deviant Orion update (signature not treated as exculpatory). Escalates to Branch C once independent STG corroboration (forged SAML/identity layer) is found in the same window. Branch E (AI human-control boundary) and Branch F (human/device kinematic mismatch) are **not directly evaluable from this document** — the intrusion is carried out almost entirely through automated tooling (WMI, PowerShell, service-principal credentials), not a live human operator at a keyboard whose typing/mouse kinematics could be baselined. Flagged as an explicit scope limit, not silently skipped.

---

## Uncertainties — what this brief does not conclude

1. **No actor attribution.** The evidence here supports "identity infrastructure and a trusted build pipeline were compromised" — it does not establish who. (The U.S. Government's attribution to the Russian SVR, noted on page 2 of the source document, came from a separate intelligence process weeks later — not from this telemetry correlation alone. Deliberately excluded per Common Mistake #15.)
2. **No confirmed universal footprint.** The composite picture spans multiple victim organizations; a specific environment being triaged needs its own confirmation of which artifacts are actually present locally before this exact 90/100 applies to it.
3. **Kinematic/STG human-behavioral coverage is out of scope for this case** — nearly all attacker action here is programmatic, not live interactive sessions, so the skill's keystroke/mouse-kinematic dimension has nothing to baseline against in this scenario.
4. **"Impossible travel" alone is not load-bearing** — kept as corroborating context only, per the source document's own caveat about VPN false positives.

---

## Recommended action

**BLOCK / Emergency response.** Score ≈90 sits in the top band on its own; independently, the attack path (build pipeline → privileged identity infrastructure → mailbox/data access, MFA bypassed) would justify containment even below threshold. Isolate affected Orion deployments, rotate/revoke the ADFS token-signing certificate and all SAML trust relying on it, audit and reissue Azure service-principal credentials, preserve DNS/PowerShell/Azure sign-in/UnifiedAuditLogs telemetry before remediation destroys it, and treat every "trusted" signal (signature, MFA pass, SSO login) in the affected estate as needing independent behavioral corroboration going forward.

*(For calibration: this matches the real-world outcome — CISA's Emergency Directive 21-01 ordered immediate disconnection of affected SolarWinds Orion instances. The skill's score and call converge with what was actually done, without having used the later attribution to get there.)*

---

## What a conventional audit would have missed

Every gate a compliance scan checks passed: valid SolarWinds signature, valid TLS, expected vendor endpoint, expected update schedule, MFA "enabled," clean vulnerability scan. The exposure was only visible by (a) not letting a valid signature vouch for runtime behavior, (b) noticing that a missing expected artifact (the Kerberos event chain that should precede a federated login) is as much a signal as a present anomalous one, and (c) refusing to trust a component's own telemetry schema as ground truth — SUNBURST's C2 was deliberately shaped to look like Orion's legitimate diagnostics.
