# Worked example — Mentix, shift-supervisor alert triage

Fellow: **Mentix** (industrial AI, factory/plant operations). All numbers are illustrative test fixtures, not client data.

**Fellow's pitch:** "We're building an AI copilot for factory managers that surfaces plant issues in real time."

That is a feature. This skill recovers the decision underneath it and compresses it.

## 0. The idea, as the fellow said it
> "An AI copilot for factory managers that surfaces plant issues in real time."

## 1. The decision (not the feature)
- **A human decides:** which line alerts to act on this shift, and which to ignore, before the next stoppage.
- Feature-ban check: "copilot" and "AI" struck — they name the surface, not the call. The verb is *decides which to act on*.
- Two decisions? No. "Act on vs ignore" is one triage call. (Setting alert thresholds is a separate, parked decision.)

## 2. The decision-owner (exactly one)
- **Title:** shift production supervisor.
- **Stakes on being wrong:** a missed alert becomes an unplanned line stoppage; a needless intervention stops a healthy line. Both hit the shift's output number, which the supervisor owns.

## 3. The moving axis (pick one)
- **Time.** Same triage call, reached faster. (Effort moves with it — fewer alerts read — but time is the dominant axis, so the statement uses time.)

## 4. Before → After (quantified, on time)
- **Before:** ~6 min/shift reading the full alert log (~30 alerts) to decide what to act on.  Source: timed workflow on the plant floor (behaviour, ladder 0.7).  `[Fact]` (observed) · rate/volume `[Assumption]`
- **After:** ~30 s on a ranked exception shortlist.  `[Hypothesis]` — the build must earn this; unproven at framing.
- **Compression = 6 min ÷ 30 s = 12×**

## 5. Autonomy ladder
- **Before: L0** — supervisor decides unaided, reading the raw log.
- **After: L1** — machine ranks and surfaces; supervisor still decides every intervention.
- Cap: autonomy is deliberately held at L1. A wrong intervention has a safety and output cost the supervisor must own, so the machine does not get to decide. The product compresses the *time to decide*, not the *right to decide*.

## 6. Compression band
- 12× on time, ladder jump of 1 rung → **Order of magnitude** (the ≥10× arm). The triage decision's economics change even though autonomy barely moves.

## 7. Downstream — why the compression pays
- If the ranked shortlist catches the same true positives faster, fewer alerts are missed per shift → fewer unplanned stoppages. One avoided stoppage/shift dwarfs the 6 minutes saved; the saved minutes are not the prize, the caught stoppage is.  `[Hypothesis]`

## 8. The statement (the product)
> A shift production supervisor decides which line alerts to act on this shift in ~30 seconds on a ranked exception shortlist, instead of ~6 minutes reading the full alert log — a 12× time compression (autonomy held at L1: the supervisor still owns every intervention).

## 9. What would change this framing
- The whole product rests on the ~30 s `[Hypothesis]`. Mentix's next job is a probe: put a real supervisor in front of a ranked shortlist and time them reaching the same-or-better call. If they are slower, or miss true positives the raw log would have caught, the compression is negative and there is no product — only a copilot with nothing to compress. Do not let the "copilot" framing creep back and hide that test.
