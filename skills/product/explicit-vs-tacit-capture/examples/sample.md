# Worked example — Azraq's data-centre risk assessor

Azraq builds static risk reports on data-centre operators. This is a test fixture: numbers are illustrative, not real client data.

## Input the fellow brought

"We want to product-ise our senior assessor's work. She grades an operator's outage risk from their incident history and site data. We have her scoring rubric written down, and a transcript where she talked through three past assessments. Which part of this is actually our product, and which part could anyone build?"

Material on the table:
- A written risk-scoring rubric: pull the operator's 24-month incident log, count logged incidents, weight by severity band, apply the uptime formula, output a 1–5 risk grade. [Fact]
- A transcript of the senior assessor reasoning through three past assessments, including two where she graded an operator riskier than the rubric score. [Fact]
- Her stated habit: "when the numbers look too clean, I get suspicious." [Fact]
- Two junior assessors produce different grades from the same operator data. [Fact]

## 0. Material + decision check

| Field | Fill |
|---|---|
| Expert / role | Senior data-centre risk assessor |
| Recurring decision | Grade an operator's outage risk 1–5 from incident history + site data |
| Material in hand | Written scoring rubric + transcript of three worked assessments |

Watchable material in hand, and a specific decision two juniors get wrong differently from the same inputs. The gap between the juniors and the senior is exactly what to isolate.

## 1. Every piece of know-how

| Seam | Items found |
|---|---|
| Stated steps | Pull 24-month incident log; count incidents; apply uptime formula; output grade |
| Thresholds | Severity bands (SEV-1/2/3 weights); the 99.9% uptime cutoff |
| Checks | "Verify the incident log is complete"; "sanity-check the grade" |
| Escalations | "If data is missing, flag for review" |
| Overrides | Twice in the transcript she graded riskier than the rubric said |
| "It depends" moments | "when the numbers look too clean, I get suspicious"; "a clustered set of SEV-3s worries me more than one SEV-1" |

## 2. The ledger

| # | Expertise item | Executes identically from words alone? | Class | If T: cue + condition | Evidence (ladder + tag) | Moat status |
|---|---|---|---|---|---|---|
| 1 | Pull 24-month incident log; count; apply uptime formula; output 1–5 grade | Y | E | — | Rubric in hand — artefact 0.5 [Fact] | commodity |
| 2 | SEV-1/2/3 severity weights; 99.9% uptime cutoff | Y | E | — | In the rubric — artefact 0.5 [Fact] | commodity |
| 3a | "Sanity-check the grade before issuing" | Y | E | — | In the rubric — artefact 0.5 [Fact] | commodity |
| 3b | The override: grade riskier than the rubric when a set of SEV-3s is **clustered in time**, not spread | N | T | Cue: incidents bunched in a short window, not the count. Condition: flips only when clustering is tight; spread-out SEV-3s take the rubric grade | Seen twice in the transcript — behaviour 0.7 [Fact] | **moat piece** |
| 4 | "When the numbers look too clean, I get suspicious" → grade up | N | T | Cue: an incident log that is *too* clean for the operator's size/age. Condition: unstated | Only recited; no case shown — opinion 0.1 [Hypothesis] | needs capture |
| 5 | "Flag for review if data is missing" then decide whether the gap itself is a risk signal | N | T | Cue: which missing field is benign vs which absence is itself the warning. Condition: unstated | Recited, not shown — verbal 0.3 [Assumption] | needs capture |

## 3. The split test

- T rows filed correctly: Y — the override (3b) was pulled out of the "sanity-check" step (3a) instead of being left folded inside it.
- Every rule with an override split: Y — item 3 became 3a (rule, E) and 3b (override, T).

The fatal error here would have been filing "sanity-check the grade" as a tell-able explicit step. It reads like one. The judgment — *what makes her look twice* — was hiding inside it. That buried judgment is the moat.

## 4. Verdict

**The moat (captured tacit column, ≥ 0.5):**
1. Row 3b — the clustering override. She grades riskier when SEV-3 incidents bunch in time, regardless of the count the rubric weighs. Observed twice (0.7), the only tacit row captured above the bar.

**The load-bearing tacit judgment:**
> The product must encode **grading an operator riskier when their incidents cluster in a short window**, cued by **the time-density of SEV-3s (not the count)**, except **when the cluster is spread out, where the rubric grade stands**. Basis: [Fact], behaviour 0.7.

**The commodity (explicit column):** rows 1, 2, 3a — the incident count, the severity weights, the uptime formula, the sanity-check instruction. A model with the published rubric reproduces every one. This is what the juniors already do correctly; it is not the product. Automate it and use it for onboarding.

**The capture backlog (placeholders, < 0.5):**
- Row 4 — "too clean to be true" (0.1, opinion). A real seam, but she named no perceptible cue for what "too clean" is. Route to `tacit-knowledge-interview`: watch her assess a suspiciously clean operator and log what she actually reads.
- Row 5 — missing-data-as-signal (0.3, recited). She distinguishes a benign gap from a telling absence, but named no case. Route to `tacit-knowledge-interview`.

## The correction this skill forced

The fellow assumed the rubric was the product — it is the artefact they were proudest of. The rubric is the commodity: a model plus the published rubric grades operators as well as a junior does. The product is the three judgment calls the rubric cannot hold, and only one of them (the clustering override) is captured today. The other two are the reason two juniors disagree, and they are still trapped in the senior's head. The split moved Azraq's attention from documenting the rubric to observing the three overrides — and told them which one is already theirs and which two they still have to go and watch.
