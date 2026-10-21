# Bidding model and limits

For symmetric risk-neutral independent private values with CDF F, N total bidders, and reserve r, the first-price equilibrium for participating types is

`b(v) = v - integral[r,v](F(t)^(N-1) dt) / F(v)^(N-1)`.

For uniform [0,Vmax] this gives `v*(N-1)/N + r^N/(N*v^(N-1))`. Without a reserve it reduces to `(N-1)/N*v`. The stable implementation uses `r*(r/v)^(N-1)/N` for the reserve term. The v=0 and N=1 boundaries are handled separately. Do not use a guessed spread multiplier for a nonuniform distribution.

At v=100, N=2, r=80, the reserve-aware bid is 82, not 50 or merely the reserve 80. N=20, r=0 gives 95; reducing N to 12 or capping the bid at 90 changes the model without justification.

Source for the zero-reserve uniform result and its assumptions: [Georgia State University EconPort auction handbook](https://econport.gsu.edu/content/handbook/auctions/auctionsexperiments/auctionsbneandfirstprice.html). The reserve expression is the direct integral evaluation above.

## Winner's curse

A common-value auction requires a joint model of value and bidder signals. Winning is a selection event; estimate expected value conditional on that event, not only the bidder's observed signal. The amount of adjustment depends on signal accuracy, dependence and bidding behavior. Identical public information about a known value generates no information-driven haircut.

Preserve separately the common component and private synergies in mixed cases. Do not assume a default 60% common weight. Risk aversion requires a utility model; budget constraints require a constrained analysis. Neither is captured by universal `+0.4*risk_aversion` or `min(90% of value, bid)` rules.

For unknown parameters, report a range under explicitly labeled scenarios. The previous fixed 10% + 5*ln(N) + 0.2*dispersion schedule was an uncalibrated heuristic and is retired, along with its rubric and lookup table. It must not be presented as an empirical or theoretical law.
