# Examples

Real model output, verbatim from the upstream [ponytail](https://github.com/DietrichGebert/ponytail)
project's benchmark runs — the same task answered by the same model with no skill and with the
ladder this skill is built on, so you can compare side by side. Model: Claude Haiku 4.5, temperature 1.

Shizen is a rebrand of ponytail's ruleset (see [README](../README.md#provenance)); this fork
hasn't run its own benchmark and doesn't ship the harness, so these numbers are attributed to
the upstream project, not measured separately for shizen. Reproduce them against upstream:
`npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml` in a ponytail checkout.

| Example | Without (LOC) | With (LOC) |
|---|--:|--:|
| [Email Validation](email-validation.md) | 75 | 3 |
| [Debounce](debounce.md) | 116 | 10 |
| [CSV Sum](csv-sum.md) | 20 | 3 |
| [Countdown Timer](react-countdown.md) | 267 | 9 |
| [Rate Limiting](rate-limit.md) | 128 | 10 |
