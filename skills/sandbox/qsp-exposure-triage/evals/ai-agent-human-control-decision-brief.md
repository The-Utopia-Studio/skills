> **⚠️ SUPERSEDED — entirely out of scope for the current skill.** This entire run tested Branches E/F and STG's identity, behavioral, contextual, and kinematic concepts. QSP and STG are now treated as independent products; `qsp-exposure-triage` covers QSP only and contains no identity, session, human/AI-agent behavioral, or kinematic logic anywhere. Nothing in this document — the scenario, the branch logic, the score, the Gotchas — carries forward into the QSP-only skill. Kept here purely as historical record of the combined-model experiment that led to the architecture reset.

# Quantum × AI Exposure Triage — Decision Brief (historical, combined QSP+STG model — this run is entirely STG, no QSP content)

**Scenario (composite, built to test Branch E/F and STG's identity/behavioral/contextual/kinematic dimensions):** A finance-ops AI agent ("OpsAgent") automates routine invoice matching, expense categorization, and sub-$500 reimbursement approval. Vendor bank-account/routing-number changes are explicitly designated the high-risk human-control boundary — OpsAgent may draft and queue them but may never approve one; only a named human approver can release it.

**Run type:** Second real sandbox test of `quantum-ai-exposure-triage`. Read-only evaluation — no skill changes made as part of this run.

---

## Scenario detail

A request arrives via the vendor portal to change **Meridian Supply Co.'s** bank routing number, submitted under the vendor's known AP contact login. OpsAgent correctly does **not** auto-approve it — it drafts the record and queues it for human approval, per its designated boundary.

40 minutes later, an approval action for that exact change is submitted under the account of **Dana Whitfield**, the designated approver, with valid SSO and valid MFA.

Telemetry on the approval session:

- **Timing:** 2:47am local time. Dana's 90-day baseline shows zero prior activity outside 8am–6pm weekdays.
- **Device:** a fingerprint not matching any of Dana's enrolled devices (corporate or BYOD).
- **Kinematics:** near-zero variance in time-to-click across the multi-field confirmation dialog, and uniform inter-keystroke timing on the "type CONFIRM to proceed" field — no natural pauses, re-reads, or hesitation. Dana's established baseline shows normal human variance (she reliably re-reads routing numbers before confirming).
- **Context:** 12 minutes before the approval, a "password reset assistance" ticket touching Dana's account was opened and closed by a helpdesk service account. That same helpdesk account independently shows an anomalous pattern of its own — it has touched MFA settings for three other unrelated users in the past week, outside its normal support-ticket volume.

---

## Observation → Interpretation → Hypothesis → Evidence → Confidence

### Finding — Human/device kinematic and contextual mismatch on a designated high-risk action (Branch F, under Branch E's gate)

| Stage | Content |
|---|---|
| **Observation** | Identity valid (correct account), authorization valid (correct approver role, MFA passed). But: off-hours action with no precedent, unrecognized device, kinematic profile inconsistent with baseline, and immediately preceded by an unrequested-looking credential-touching event on the same account. |
| **Interpretation** | Every individual check a conventional access-control review would run — right user, right role, MFA green — passes. The mismatch only shows up one layer down, in *how* the action was performed, not *whether* it was permitted. |
| **Hypothesis** | The session is not actually being driven by Dana in real time — candidates include session-token theft plus scripted/replayed input, remote-access-trojan control of an already-unlocked session, or a helpdesk-mediated credential reset used to hijack the account, rather than a legitimate but unusual late-night approval. |
| **Evidence for** | Four independent facts converge on the same session: timing anomaly, device anomaly, kinematic anomaly, and a suspicious antecedent event (the helpdesk touch) — not one measurement doing all the work. |
| **Evidence against / benign alternatives checked** | Checked and not supported: no scheduled emergency payment run on Dana's calendar or from her manager; the device doesn't match any device she has ever enrolled (rules out "new personal device, still her"); the helpdesk ticket's requester identity doesn't match Dana's own self-service reset pattern, and the same helpdesk account independently touched three unrelated users' MFA settings this week — not an isolated, explainable IT interaction. |
| **Confidence** | High that trust conditions are not satisfied for this specific action. **Not** established: the exact mechanism (credential theft vs. malware vs. insider-assisted helpdesk abuse) — that remains open. |

---

## Where Branch E and Branch F meet

**Branch E** is why this event exists to be evaluated at all: OpsAgent correctly kept the bank-account-change *approval* outside its own automation and routed it to a human gate — the boundary held on the AI-agent side. **Branch F** is the analysis of what happened when that gate fired: identity and authorization were both valid, but STG's behavioral/contextual/kinematic layer didn't match the expected authorized human.

---

## Score

| Dimension | Score | Basis |
|---|---|---|
| Cryptographic Exposure | 8/100 | No signature, token, or key-material forgery evidence — SSO/MFA functioned as designed. Not the operative dimension here. |
| Behavioral Trust Deviation (STG) | 84/100 | Four independent, corroborating facts (timing, device, kinematics, antecedent helpdesk anomaly) on the account performing the explicitly-designated high-risk action. |
| Execution / Side-Channel Anomaly (QSP) | Insufficient Evidence (nominal 10/100) | No system/agent execution-timing or resource-utilization telemetry applies to a human clicking through a browser approval dialog — this dimension isn't meaningfully instrumented for this interaction type. |
| **Initial Exposure Priority Score (raw)** | ≈ 39/100 (0.2×8 + 0.4×84 + 0.4×10) | Top of the CONTINUE/Monitor band. |

**Evidence state: Corroborated Exposure** (for the purpose of gating this action) — four independent facts, benign explanations actively checked and not supported. **Not corroborated:** the underlying mechanism of compromise, which stays an open question.

**Threshold override applied, stated explicitly:** the raw score sits in Continue/Monitor, but the flagged action is the system's own designated highest-risk boundary — a vendor bank-routing change, i.e. a direct payment-redirection fraud path. Attack-path criticality justifies acting above what the raw score alone would recommend.

---

## Uncertainties — what this brief does not conclude

1. No mechanism established (credential theft / session hijack / helpdesk-assisted takeover all remain consistent with the evidence; none confirmed).
2. The helpdesk account's own anomaly is a separate, not-yet-resolved thread — corroborates the Dana finding but hasn't itself been fully investigated.
3. Kinematic evidence is probabilistic, not proof — the call rests on convergence of four signals, not the kinematic mismatch alone.
4. Meridian Supply Co.'s original change request is not itself evaluated here — only the internal approval action. The vendor-side request needs its own out-of-band verification before any resubmission.

---

## Recommended action

**Immediate (Branch E gate, this specific action):** DENY / HOLD the bank-account-change approval. Do not let it proceed on the strength of a passed MFA check. Re-verify the vendor change out-of-band before any resubmission is considered.

**Broader (score-and-context-driven):** INVESTIGATE — override applied above the raw-score default given attack-path criticality. Scope: Dana's account (force re-authentication from a known device, review session for other actions taken), and independently, the helpdesk account's MFA-touching pattern across all three other affected users this week.

---

## What a conventional access-control review would have missed

Every gate an identity/access review checks passed: correct user, correct role, MFA green, request came from the properly designated approver for a properly designated high-risk action. Nothing in a standard IAM audit flags "successful MFA at an unusual hour from an unfamiliar device with mechanically uniform click timing" — that finding only exists at the behavioral/kinematic layer, and only because a per-user baseline existed to deviate from.
