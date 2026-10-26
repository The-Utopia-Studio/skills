# Cohort diagnostics

Preserved method from the retired `cohort-analysis` skill, expanded with denominator and maturity checks. Use for retention/revenue diagnostics; pipeline and booking forecasts remain owned by `revops-forecasting`.

## Definition worksheet

Before calculating, record:

- Decision, population and cohort key: acquisition month, lead source, tier, segment or booking vintage.
- Inclusion/exclusion filters, source, observation window, snapshot date and unit (account, user, opportunity or revenue).
- Stable entity IDs and deduplication rules. Cohorts intended to partition a population must be mutually exclusive; disclose overlapping analytical segments and never sum them as a partition.
- KPI, numerator, denominator and horizon: retention/NRR uses the starting cohort; win rate uses a stated eligible opportunity set; ACV, coverage and payback need their own denominators. Do not reuse a retention denominator for pipeline coverage.
- Equal cohort age/maturity, sample size and censoring. Mark unavailable future ages as missing, not zero; compare same-age cohorts.
- Reporting currency and conversion-date policy. Separate reported growth from constant-currency comparisons. Disclose changing deal-size/segment mix; use within-segment or common-weight comparisons alongside raw totals, without hiding real changes.
- Seasonality: compare matching seasonal windows or state the adjustment and assumptions. Keep raw results visible.

## Diagnostic output

Choose retention heatmaps or overlapping age curves, booking/conversion tables, or revenue waterfalls. Annotate anomalies with evidence, alternative explanations and a next action. Differences are diagnostic signals, not proof of causation or permission to scale. Review definitions quarterly or when the operating model changes; version changes instead of silently rewriting prior cohorts.

Route acquisition economics, LTV and payback to `saas-economics-efficiency-metrics`; pipeline coverage, conversion and forecast calibration to `revops-forecasting`.
