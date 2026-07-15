# Shizen for Hermes installed

Enable it if you did not install with `--enable`:

```bash
hermes plugins enable shizen
```

Restart Hermes or the gateway after enabling.

In shared gateways, restrict `/shizen` to trusted users with Hermes slash-command access controls; runtime mode is process-local.

Commands:

- `/shizen [lite|full|ultra|off]`
- `/shizen-review [target]`
- `/shizen-audit [target]`
- `/shizen-debt`
- `/shizen-help`

Bundled skills are available as `shizen:shizen`, `shizen:shizen-review`, `shizen:shizen-audit`, `shizen:shizen-debt`, and `shizen:shizen-help`.
