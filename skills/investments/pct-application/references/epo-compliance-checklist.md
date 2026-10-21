# EPO Compliance Checklist (Art. 83/84 EPC, Rules 42-49 EPC)

Use this for Euro-PCT quality checks or before EP regional phase entry. Review the claims and description yourself against each item; there is no automated analyzer. Verify article/rule/Guidelines citations against the current texts at https://www.epo.org/en/legal/epc and https://www.epo.org/en/legal/guidelines-epc.

## What to check

Performs comprehensive EPO-focused analysis:

1. **Claims Analysis** (Art. 84 EPC):
   - Clarity: identifies unclear or ambiguous terms
   - Conciseness: detects redundant or overlapping claims
   - Support: verifies all claims are supported by description
   - Two-part form (Rule 43(1) EPC): assesses applicability before checking preamble and characterising portion
   - Claim categories: product, process, apparatus, use
   - Excluded subject matter: Art. 52(2) and Art. 53 EPC

2. **Sufficiency of Disclosure** (Art. 83 EPC):
   - Reproducibility: can a person skilled in the art reproduce the invention?
   - Breadth of claims vs disclosure: is the full scope enabled?
   - Essential technical features: all present and described?
   - Working examples: at least one concrete embodiment?

3. **Formalities** (Rules 42-49 EPC):
   - Description format (Rule 42): required sections in correct order
   - Claims form (Rule 43): two-part form, numbering, references
   - Drawings (Rule 46): margins, no text, reference signs
   - Abstract (Rule 47): length recommendation and figure designation; verify current text
   - Physical requirements: A4, margins, fonts

4. **Issue Categorization**:
   - **Critical**: Material issue supported by an applicable provision; do not predict an inevitable objection
   - **Important**: May cause objection or limit scope
   - **Minor**: Best practice per EPO Guidelines

## Common EPO issues

1. **Clarity Issues (Art. 84 EPC)**:
   - Relative terms without objective reference
   - Inconsistent terminology between claims and description
   - Functional features not clearly defined
   - "Means for" language without clear structural support

2. **Support Issues (Art. 84 EPC)**:
   - Claims broader than description discloses
   - Unsupported generalizations from specific examples
   - Missing essential technical features
   - Claim scope exceeding experimental evidence

3. **Sufficiency Issues (Art. 83 EPC)**:
   - Insufficient detail for reproduction
   - Claims too broad relative to examples
   - Missing critical parameters or conditions
   - Undue burden on skilled person

4. **Formality Issues (Rules 42-49 EPC)**:
   - Missing required description sections
   - Abstract length outside the applicable recommendation (review, not automatic failure)
   - Text in drawings
   - Claims not in two-part form where that form is appropriate

## Report format

Present analysis as:

```
EPO COMPLIANCE ANALYSIS REPORT
================================

Jurisdiction: European Patent Office (EPC)
Analysis Date: [Date]

Summary:
- Total Claims: 15 (2 independent, 13 dependent)
- Compliance Score: 72/100
- Issues Found: 8 (2 critical, 4 important, 2 minor)

CLAIMS ANALYSIS (Art. 84 EPC):

  Clarity:
  [Claim 1] CRITICAL - "substantially uniform" lacks objective definition
    Art. 84 EPC / EPO Guidelines F-IV, 4.6
    Fix: Define with measurable criterion (e.g., "within 5% deviation")

  Support:
  [Claim 3] IMPORTANT - "any wireless protocol" exceeds disclosure
    Art. 84 EPC / EPO Guidelines F-IV, 6.2
    Fix: Limit to disclosed protocols (Bluetooth, Wi-Fi, NFC)

  Two-Part Form:
  [Claim 1] REVIEW - Assess whether two-part form is appropriate
    Rule 43(1) EPC / EPO Guidelines F-IV, 3.2
    Fix: Identify closest prior art, split into known + novel features

SUFFICIENCY ANALYSIS (Art. 83 EPC):

  [PASS] At least one embodiment fully described
  [WARN] Claims 8-10 cover embodiment not exemplified
    Art. 83 EPC / EPO Guidelines F-III, 3
    Consider: Add working example for thermal processing variant

FORMALITIES (Rules 42-49 EPC):

  [PASS] Description sections in correct order (Rule 42)
  [REVIEW] Abstract: 167 words; assess concision against Rule 47 recommendation, not a hard maximum
  [PASS] Drawings: no text, proper margins (Rule 46)
  [FAIL] No figure designated for abstract (Rule 47(2)(b))
```

## Cross-jurisdiction comparisons

Build comparisons from current official texts for the actual issue. Do not generalize software eligibility, medical-method protection, novelty exceptions, or claim-form rules from a one-line country table. Cite each jurisdiction separately and identify material exceptions.
