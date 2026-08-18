# Sample run — Mentix plant supervisor

Illustrative fixture. Names, times, and numbers are plausible and clearly synthetic, not real client data.

**Fellow input (verbatim):** "I'm building the factory copilot. I want to shadow one of the plant supervisors and capture how they actually decide — not the SOP, the real judgment. What do I do with a shift?"

---

## 0. Task + access check

| Field | Fill |
|---|---|
| Expert | "Dana", line supervisor, 19 years on the floor |
| Real task watched | Running the packaging line for one live shift; the outcome depends on how she reacts to alarms and drift |
| Access | Live shadow, full 8-hour shift (using the first 60 minutes of steady-state running for the structured pass) |

Watchable. Proceed.

---

## 1. Watch-30 fork log (behaviour, 0.7)

| Time | What they did | Fork signal | What was visible |
|---|---|---|---|
| 14:12 | Muted the bearing-vibration alarm on line 3, kept the line running | Overrode a signal | Alarm was steady, not climbing; she glanced at the trend, not the value |
| 14:26 | Slowed line 3 by ~10% without any alarm | Acted before the system | She had walked past the motor and paused near it seconds earlier |
| 14:41 | Stopped line 1 immediately on a *lower*-priority alarm | Deviated from priority order | It was the first alarm since a belt change that morning |
| 14:53 | Ignored a temperature warning, wrote nothing | Overrode a signal | Ambient was high; every line read warm |

Four forks in the first hour. Not a demo.

---

## 2. Explicit procedure (the SOP)

1. On any vibration alarm, log it and inspect at next scheduled stop.
2. Acknowledge alarms in priority order (safety > quality > throughput).
3. On a temperature warning, record the reading and continue unless it crosses the hard limit.
4. After a belt or bearing change, run at rated speed and monitor.

A competitor can read this in the operations manual. It explains none of the four forks above.

---

## 3. Tacit judgment ledger

| # | Fork | SOP says | She actually did | Cue she read | Her rule of thumb | Exception that overrides the rule | Observed? | Basis + rung |
|---|---|---|---|---|---|---|---|---|
| 1 | 14:12 vibration alarm | Log, inspect at next stop | Muted it, kept running | The alarm's *rise rate*, not its level — flat trend = settling, not failing | "A steady vibration alarm is the machine warming up; a climbing one is the machine dying" | Never mute it within an hour of a bearing change — a new bearing that vibrates is seated wrong | Y | [Fact] 0.7 |
| 2 | 14:26 slowed line, no alarm | Nothing — no alarm fired | Cut speed 10% | A change in the motor's pitch she heard walking past | "If it sounds hunting, back it off before the alarm ever comes" | If the sound is load-related (heavy product run), speed is fine; slow only if it persists unloaded | N (heard her explain it; the pitch cue was not something I could verify) | [Hypothesis] 0.3 |
| 3 | 14:41 stopped on low-priority alarm | Acknowledge in priority order | Stopped line 1 first | It was the first alarm since the morning belt change | "The first fault after any change is the change talking — trust it over the priority list" | If the change was a like-for-like swap by a tech she trusts, she waits one more alarm | Y | [Fact] 0.7 |
| 4 | 14:53 temp warning ignored | Record and continue | Ignored, logged nothing | Every line read warm at once → ambient, not a fault | "One line hot is a problem; all lines hot is the weather" | If one line stays hot after the others cool, that line is the real fault | Y | [Fact] 0.7 |

---

## 4. Strike-the-SOP test

- Survive (real tacit judgment): #1, #2, #3, #4 — all four. The SOP says *what* to do on each alarm; none of it encodes *when she overrides it*.
- Struck (already in the manual): none.

Everything survives. The manual is the explicit half; this ledger is the half Mentix is actually selling.

---

## 5. Fork scoring check

| # | Perceptible cue? | Named exception? | Observed or narrated? | Basis honest? |
|---|---|---|---|---|
| 1 | Yes — alarm rise rate | Yes — recent bearing change | Observed (0.7) | Yes |
| 2 | Weak — "motor pitch" is real but I could not verify it by ear | Yes — loaded vs unloaded | Narrated only (0.3) | Yes, held at [Hypothesis] |
| 3 | Yes — first fault after a change | Yes — trusted like-for-like swap | Observed (0.7) | Yes |
| 4 | Yes — all lines warm at once | Yes — one line stays hot | Observed (0.7) | Yes |

Fork #2 is honest but soft: the pitch cue is exactly the kind of "you just know" that needs a second, longer watch — ideally with a microphone — before the copilot tries to encode it.

---

## 6. The load-bearing judgment

> The copilot must encode **when to mute a vibration alarm and keep running versus when to trust it and stop** — cued by **the alarm's rise rate, not its level** — except **within an hour of a bearing change, when any vibration is treated as a fault**.

- Basis today: [Fact] for the rule and its exception (observed at 14:12 and explained on the specific instance)
- What breaks if encoded wrong: a copilot that alerts on alarm *level* will cry wolf on every warm-up and be muted by the supervisor within a shift — the exact failure that kills operator trust.

---

## 7. Handoff

> Automate: alert on vibration *trend* (rise rate), suppress on steady level, and hard-override to "inspect" for 60 minutes after any logged bearing change. Before building, confirm the sensor exposes rise rate, not just threshold crossings — the cue Dana reads may not be a field the system currently emits.

---

## Why this beats a generic answer

A default prompt would transcribe an interview and hand back a tidier SOP: "supervisor monitors alarms and uses judgment to prioritise." This run does three things it cannot. It logs behaviour first and treats the words as secondary, so the muted alarm at 14:12 (a 0.7 you watched) outranks any "I always follow procedure" she might have said. It separates the four forks from the manual with the strike-the-SOP test and finds that *all* of the value is in the overrides. And it holds fork #2 at [Hypothesis] 0.3 because the pitch cue was narrated, not seen — refusing to let a confident "you just know" become a spec line. The output is not the procedure; it is the judgment the procedure omits, which is the only part worth a copilot.
