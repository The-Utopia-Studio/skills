# v1 Launch Bar — go / no-go

Fill every row. The decision is made on the recorded-evidence citations, never on opinion. A row backed only by "we think" scores 0.1 and counts as RED. A v1 that is polished and feature-complete but stalls a stranger or has no wired corrections loop is **NO-GO** — feature-completeness is not a gate here.

Product / v1: _[name]_ · Version / commit tested: _[exact ref]_ · Date: _[date]_

---

## Step 0 — Preconditions (all must be `[Fact]`)

| Precondition | Present? | Evidence | If missing |
|---|---|---|---|
| Built, running v1 a stranger can touch | _[Y/N]_ | _[cite]_ | Not a launch question — back to build |
| The one **outcome unit** the v1 promises (from `eval-first-spec` job line) | _[Y/N]_ | _[state it]_ | No target for the stranger — get the job line |
| Eval pass rate at chosen autonomy level already met | _[Y/N]_ | _[cite the run]_ | Do not launch under the eval gate — route to `eval-first-spec` |

If any is N, stop. Name the earlier step. Do not fabricate readiness.

---

## Step 1 — Gate A: the 60-second stranger test

**Outcome unit the stranger must reach:** _[from Step 0]_

A stranger = matches the real user role, has never seen the product / deck / description. Disqualified: fellow, build/design team, champion, anyone briefed.

| Stranger | Role (real user?) | Correct value ≤ 60 s, no rescue? | Restated job in 1 correct sentence? | Recording |
|---|---|---|---|---|
| 1 | _[role]_ | _[Y/N — time]_ | _[Y/N — quote]_ | _[link] [Fact]_ |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

| Gate A metric | Bar | Result |
|---|---|---|
| Strangers run | ≥ 3 | _[n]_ |
| Reached correct first value ≤ 60 s, no rescue | ≥ 2 of 3 | _[n/3]_ |
| Restated the job in one correct sentence | ≥ 2 of 3 | _[n/3]_ |

**Gate A:** _[GREEN / RED]_ — green only on recorded strangers. Disqualify any "stranger" who was briefed; note them here and do not count them.

---

## Step 2 — Gate B: the learn-from-corrections test

Score readiness now; commit the delta to week 4. B1–B4 must all be present and B5 must be a specific number, or Gate B is RED.

| # | Row | State | Gate-time evidence |
|---|---|---|---|
| B1 | **Capture wired** — code path logs each correction as `(system_output → human_final)` diff | _[GREEN/RED]_ | _[cite path/event] [Fact]_ |
| B2 | **Feedback path named** — where a captured correction goes (golden set / lessons.md / retrieval / re-prompt) + the trigger | _[GREEN/RED]_ | _[name path + trigger] [Fact]_ |
| B3 | **Proven once** — seed one real correction; same input now yields the corrected output | _[GREEN/RED]_ | _[recorded before/after] [Fact]_ |
| B4 | **Tweak-time instrumented** — "how much they edit before accepting" captured from day 1 | _[GREEN/RED]_ | _[cite instrument] [Fact]_ |
| B5 | **Delta committed** — specific week-1 → week-4 promise on a named metric | _[stated?]_ | _[the number + metric] [Hypothesis until wk4]_ |

**B5 delta (write it as a checkable sentence):**
> _[e.g. "Median tweak-distance on the top-5 recurring input types drops ≥ 30% from week 1 to week 4."]_

**Gate B:** _[GREEN / RED]_ — RED if any of B1–B4 is missing or B5 has no number. "Add the loop after launch" = RED (the static-tool trap).

---

## Step 3 — Decision

| Gate | State | Basis |
|---|---|---|
| A — 60-second stranger | _[GREEN/RED]_ | recorded strangers only |
| B — learn-from-corrections | _[GREEN/RED]_ | B1–B5 |

**Decision:** _[GO / NO-GO]_

- Both GREEN on recorded evidence → GO.
- Either RED → NO-GO. Do not average. A gate green on opinion (0.1) not recorded behaviour (0.7) is RED.

**If NO-GO, the single smallest fix that turns the red gate green:**
> _[e.g. "Run 3 true strangers", or "Wire B1 capture + seed one correction and record the before/after"]_

---

## Step 4 — Handoff (on GO only)

- The Gate B mechanism is now run continuously by `refine-flywheel` (08).
- It reads the tweak-time instrument (B4), re-runs the whole eval set on every model release, and promotes autonomy by eval result.
- The B5 delta is `refine-flywheel`'s first checkpoint at week 4.

Owner of the pilot from here: _[name]_ · Week-4 review date: _[date]_
