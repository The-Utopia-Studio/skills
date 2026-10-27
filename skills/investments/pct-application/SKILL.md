---
name: pct-application
description: >-
  International and European patent work for portfolio companies: preparing or reviewing
  a PCT application (PCT Rules 3-13 formalities, unity of invention, claims and abstract),
  deadline and fee planning from the priority date, national/regional phase strategy, Euro-PCT
  and EP quality checks (Art. 84 claim clarity and support, Art. 83 sufficiency, Rules 42-49
  formalities, converting US-style claims to EPO two-part form), and researching EPC articles,
  EPO Guidelines or PCT rules with citations. Use when the user mentions PCT, international
  patent application, priority year, national phase, EPO, EP filing, EPC, Euro-PCT, unity
  objection, two-part claims or Article 83/84.
  Not for drafting a US provisional or US prosecution only, freedom-to-operate opinions, or
  valuing IP in a deal (use technical-dd for the IP section of diligence).
allowed-tools: Read, Write, Bash, WebSearch, WebFetch
---

# PCT Application Skill

Preparation and validation of Patent Cooperation Treaty (PCT) international applications under PCT Rules 5-12.

## When to Use

Invoke this skill when users ask to:
- Prepare a PCT international application
- Check PCT formalities compliance
- Assess unity of invention under Rule 13 PCT
- Plan national/regional phase entry strategy
- Calculate PCT fees and deadlines
- Convert a national application to PCT format
- Understand PCT procedure and timelines

## What This Skill Does

Provides comprehensive PCT application support:

1. **Application Preparation** (Rules 3-12 PCT):
   - Request form (PCT/RO/101) guidance
   - Description format (Rule 5 PCT)
   - Claims structure (Rule 6 PCT)
   - Abstract requirements (Rule 8 PCT)
   - Drawings standards (Rule 11 PCT)
   - Physical requirements (Rule 11 PCT)
   - Sequence listings: verify the applicable current PCT provisions and WIPO ST.26 requirements

2. **Unity of Invention** (Rule 13 PCT):
   - Single general inventive concept assessment
   - Special technical feature identification
   - Linking technical feature analysis
   - Unity objection risk assessment
   - Claim grouping strategy

3. **Formalities Validation** (Rules 3-12 PCT):
   - All formal requirements checking
   - Fee calculation per Receiving Office
   - Language requirements per RO
   - Physical document requirements

4. **National Phase Strategy**:
   - 30/31 month deadline tracking
   - Country selection guidance
   - Translation requirements per country
   - National phase fee estimates
   - Strategic filing considerations

## Sources (no special tools needed)

There is no patent-law database connected. Work from the user's documents and the official texts, fetched with web search / web fetch, and cite the provision and the date you read it:

- PCT Articles, Rules, Administrative Instructions and fee tables: https://www.wipo.int/pct/en/texts/ and the PCT Applicant's Guide https://www.wipo.int/pct/en/guide/
- EPC articles and rules: https://www.epo.org/en/legal/epc ; EPO Guidelines for Examination: https://www.epo.org/en/legal/guidelines-epc ; Board of Appeal case law: https://www.epo.org/en/legal/case-law
- Prior art for unity / novelty sanity checks: Espacenet https://worldwide.espacenet.com and WIPO PATENTSCOPE https://patentscope.wipo.int (search by keywords and CPC class; report what you searched)

Quick provision map: `references/epc-pct-provisions.md`. EPO quality checklist and report format: `references/epo-compliance-checklist.md`.

Fees and deadlines below are estimates; confirm current amounts on the WIPO/EPO fee schedules before quoting them. This skill gives procedural guidance, not legal advice; flag anything that needs a registered patent attorney.

## How to Use

When this skill is invoked:

1. **Determine user's stage**:
   - New PCT filing from scratch
   - Converting national application to PCT
   - Reviewing existing PCT draft
   - Planning national phase entry

2. **For new applications, guide through**:
   - Invention disclosure review
   - Unity of invention assessment
   - Description drafting (Rule 5 format)
   - Claims structuring (Rule 6 format)
   - Abstract preparation (Rule 8)
   - Formalities checklist

3. **For review, analyze**:
   - All Rule 5-12 requirements
   - Unity of invention
   - Generate compliance report
   - Suggest fixes

## PCT Application Structure

### Request (Rule 4 PCT)

Form PCT/RO/101 requires:
- Applicant details (name, address, nationality, residence)
- Title of invention
- Priority claim(s) (if any, within 12 months)
- Designation of states (automatic for all since 2004)
- Choice of International Searching Authority (ISA)
- Agent/representative details

### Description (Rule 5 PCT)

Required sections in order:
```
1. Title of the Invention
2. Technical Field
3. Background Art
4. Disclosure of the Invention
   - Technical problem
   - Technical solution
   - Advantageous effects
5. Brief Description of Drawings
6. Best Mode for Carrying Out the Invention
7. Industrial Applicability
8. Sequence Listing (if applicable)
```

### Claims (Rule 6 PCT)

Structure requirements:
- Numbered consecutively in Arabic numerals
- Independent claims: define essential features of the invention
- Dependent claims: refer back and further limit
- Clear, concise, fully supported by description
- Multiple claim categories allowed (product, process, apparatus, use)
- Unity of invention required (Rule 13)

### Abstract (Rule 8 PCT)

- Confirm the current Rule8 abstract length guidance and language-specific counting requirements from WIPO before assessing compliance
- Indicate technical field
- Clear summary of technical problem, solution, and principal use
- Designate most illustrative figure
- Not used for interpreting claim scope

### Drawings (Rule 11 PCT)

- A4 paper (29.7cm x 21cm)
- Usable area: 26.2cm x 17cm
- Margins: top 2.5cm, left 2.5cm, right 1.5cm, bottom 1cm
- Black, dense, well-defined lines
- No text except single words
- Reference signs matching description

## Unity of Invention (Rule 13 PCT)

### Assessment Framework

Unity requires claims to relate to **one invention only** or a **group of inventions linked to form a single general inventive concept**.

**Test**: Do all claims share a **special technical feature** that:
1. Makes a contribution over the prior art, AND
2. Is present in all independent claims (or links them)

### Common Unity Patterns

**Unity Maintained**:
- Product + process for making product
- Product + use of product
- Process + apparatus specifically designed for process
- Product + process + apparatus (all sharing special technical feature)

**Unity at Risk**:
- Multiple independent claims without shared special technical feature
- Markush groups without common structural feature
- Method and apparatus addressing different problems

### Unity Strategy

```
Independent Claim 1 (System): A system comprising feature X...
Independent Claim 8 (Method): A method using feature X...
Independent Claim 15 (Use): Use of feature X for...

Special Technical Feature: "feature X" - shared across all groups
Unity: MAINTAINED (single general inventive concept linked by X)
```

## PCT Deadline and Fee Planning

Build a dated jurisdiction-specific table from the current WIPO Applicant’s Guide, receiving/designated office rules and current fee schedules. The old hardcoded month/fee table is withdrawn as unverified; do not use it for a filing decision. Establish the earliest claimed priority date, international filing date, notices and relevant office before calculating each deadline. Include the exact governing provision, trigger, extensions/restoration conditions if applicable and source access date. Missing trigger dates or office rules mean the deadline is unresolved, not guessed.

## National Phase Strategy

### Key Decisions

1. **Which countries?** - Based on markets, competitors, manufacturing
2. **Which ISA?** - Affects search quality, cost, language
3. **Chapter II?** - Optional preliminary examination for stronger report
4. **Early national phase?** - Some countries allow before 30 months
5. **Translation strategy** - Cost and timing considerations

### Common Filing Strategies

**Broad Coverage**:
- US + EP + CN + JP + KR (covers ~85% of global patent value)

**Cost-Conscious**:
- Prioritize jurisdictions using current deadlines and commercial evidence; do not assume deferred jurisdictions remain available after their entry deadlines

**Technology-Specific**:
- Pharma: US + EP + JP + CN + IN + BR
- Software: US + EP + JP + KR
- Manufacturing: US + EP + CN + DE + JP

## Compliance Report Format

```
PCT APPLICATION COMPLIANCE REPORT
====================================

Application: [Title]
Receiving Office: RO/[XX]
ISA Selected: ISA/[XX]

DESCRIPTION (Rule 5 PCT):
[PASS/FAIL] Title present
[PASS/FAIL] Technical field
[PASS/FAIL] Background art
[PASS/FAIL] Invention disclosure
[PASS/FAIL] Brief description of drawings
[PASS/FAIL] Best mode
[PASS/FAIL] Industrial applicability

CLAIMS (Rule 6 PCT):
[PASS/FAIL] Consecutively numbered
[PASS/FAIL] Supported by description
[PASS/FAIL] Clear and concise

UNITY OF INVENTION (Rule 13 PCT):
[PASS/WARN/FAIL] Single general inventive concept
Special technical feature: [identified feature]
Risk of unity objection: LOW/MEDIUM/HIGH

ABSTRACT (Rule 8 PCT):
[PASS/WARN/FAIL] Word count assessed against cited current provision
[PASS/FAIL] Figure designated
[PASS/FAIL] Technical field indicated

PHYSICAL REQUIREMENTS (Rule 11 PCT):
[PASS/FAIL] A4 format
[PASS/FAIL] Margins
[PASS/FAIL] Page numbering
[PASS/FAIL] Line spacing

FEES:
Transmittal: [amount]
International filing: [amount]
Search: [amount]
Total: [amount]

DEADLINES:
[Date or unresolved] - Each deadline with office, triggering date, governing provision and source access date
```

## EPO / Euro-PCT quality check

When the user is entering the EP regional phase, filing directly at the EPO, or answering an EPO communication, run the checklist in `references/epo-compliance-checklist.md`:

1. **Claims (Art. 84 EPC)** — clarity (relative terms need an objective reference), conciseness, support by the description, two-part form (Rule 43(1): preamble + "characterised in that"), claim categories, excluded subject matter (Art. 52(2), 53).
2. **Sufficiency (Art. 83 EPC)** — reproducible by the skilled person, claim breadth vs disclosure, at least one worked example.
3. **Formalities (Rules 42-49 EPC)** — description sections and order, claims form, drawings without text, abstract length and figure requirements verified against the current EPC rules.

Report issues as Critical / Important / Minor with the EPC article/rule and Guidelines section for each, plus a concrete fix. To convert US-style claims, identify the closest prior art, put the known features in the preamble and the novel features after "characterised in that". The EPO-vs-USPTO differences table (absolute novelty, problem-solution inventive step, medical-method exclusion) is in the checklist reference.

## Legal research questions

For "what does the EPC/PCT say about X": locate the provision in `references/epc-pct-provisions.md`, fetch the current text from the official site, quote the relevant passage briefly, give the article/rule/Guidelines section number, and note related Board of Appeal case law if found.
