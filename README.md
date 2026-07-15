<h1 align="center">Shizen 自然</h1>

<p align="center">
  <em>It builds nothing it doesn't need, and never skips what it does.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
  <img src="https://img.shields.io/badge/status-early%20fork-111111?style=flat-square" alt="Early fork">
</p>

---

A river doesn't dig a second channel once the first one reaches the sea. A
tree doesn't grow a branch it doesn't need to reach the light. Nothing
wasted, nothing missing.

Shizen puts that discipline inside your AI agent: before it writes any code,
it climbs a short ladder — does this need to exist at all, does the
codebase already have it, does the standard library, does the platform,
does an installed dependency, can it be one line — and stops the moment a
rung holds.

## Provenance

Shizen is a rebrand and port of [**ponytail**](https://github.com/DietrichGebert/ponytail)
by [Dietrich Gebert](https://github.com/DietrichGebert) — same ladder, same
rules, renamed and re-themed around a nature metaphor instead of "the lazy
senior dev." The ruleset, host adapters, and lifecycle hooks are carried
over near-verbatim; credit for the technique and the original engineering
belongs to the upstream project. See [LICENSE](LICENSE) for the MIT
attribution.

This fork does **not** carry over ponytail's benchmark harness, its `pi`
extension, or its MCP server — see [Not ported](#not-ported) below. Anywhere
this README or the `examples/` cite measured numbers, they're the upstream
project's own benchmark results, attributed as such, not separately
measured for this fork.

## Before / after

You ask for a date picker. Your agent installs flatpickr, writes a wrapper
component, adds a stylesheet, and starts a discussion about timezones.

With shizen:

```html
<!-- shizen: browser has one -->
<input type="date">
```

More examples in [examples/](examples/) (carried over from upstream's
benchmark runs — see the provenance note there).

## How it works

Before writing code, the agent stops at the first rung that holds:

```
1. Does this need to exist?   → no: skip it (YAGNI)
2. Already in this codebase?  → reuse it, don't rewrite
3. Stdlib does it?            → use it
4. Native platform feature?   → use it
5. Installed dependency?      → use it
6. One line?                  → one line
7. Only then: the minimum that works
```

The ladder runs *after* it understands the problem, not instead of it: it
reads the code the change touches and traces the real flow before picking a
rung. Spare about the solution, never about reading.

Spare, not negligent: trust-boundary validation, data-loss handling,
security, and accessibility are never on the chopping block.

## Install

The Claude Code and Codex plugins run two tiny Node.js lifecycle hooks, so
`node` needs to be on your PATH (note for Nix/nvm users: it must be on the
non-interactive shell's PATH). If it isn't, the skills still work, the
always-on activation just stays quiet instead of erroring on every prompt.

### Claude Code

```
/plugin marketplace add mayank-xrz/shizen-tsunagi
```
```
/plugin install shizen@shizen
```
(You have to send two separate prompts for the install to work)

Same steps in the Claude Code Desktop app's Code tab: type the two `/plugin`
commands above into the prompt box, or click the **+** button next to it,
choose **Plugins** → **Add plugin** to browse your configured marketplaces,
and manage marketplaces from **Customize** in the sidebar.

### Codex

```bash
codex plugin marketplace add mayank-xrz/shizen-tsunagi
codex plugin add shizen@shizen
```

Run `codex` and open `/hooks`, review and trust its two lifecycle hooks, and
start a new thread.

This same install also covers the Codex desktop app: restart the app after
installing and it picks up the plugin.

### GitHub Copilot CLI

```bash
copilot plugin marketplace add mayank-xrz/shizen-tsunagi
copilot plugin install shizen@shizen
```

In an interactive Copilot CLI session, use the slash equivalents:

```
/plugin marketplace add mayank-xrz/shizen-tsunagi
/plugin install shizen@shizen
```

Copilot CLI namespaces plugin commands by plugin name. For example:

```text
/shizen:shizen ultra
/shizen:shizen-review
```

### OpenCode

Add to `opencode.json`:

```json
{ "plugin": ["shizen"] }
```

Run from a checkout instead (the plugin reuses `hooks/` and `skills/`):

```json
{ "plugin": ["./.opencode/plugins/shizen.mjs"] }
```

Injects the ruleset every turn at the active level; adds the `/shizen`
commands (see [Commands](#commands)). OpenCode also auto-loads this repo's
`AGENTS.md`, so the rules hold even without the plugin. The plugin adds the
`lite/full/ultra/off` levels.

The `./` path resolves against your project's `opencode.json`; to share one
checkout across projects, point it at the absolute path of the `.mjs`
instead (it finds its `hooks/` and `skills/` relative to its own file).

### Gemini CLI

```bash
gemini extensions install https://github.com/mayank-xrz/shizen-tsunagi
```

Loads the ruleset as always-on context every session and registers the
`/shizen` commands; the `skills/` ship too, activated when a task needs
them. The Gemini adapter intentionally does not ship a root
`hooks/hooks.json`: Gemini auto-loads that path, while shizen's lifecycle
hooks use Claude/Codex event names.

### Qoder

Qoder auto-loads `AGENTS.md` from the repo root as always-on context, so
running shizen from a checkout works with zero setup. For per-project
rules, copy [`.qoder/rules/shizen.md`](.qoder/rules/shizen.md) into your
project's `.qoder/rules/`. The five shizen skills (`/shizen`,
`/shizen-review`, `/shizen-audit`, `/shizen-debt`, `/shizen-help`) are
available via Qoder's Skill system; the plugin manifest at
[`.qoder-plugin/plugin.json`](.qoder-plugin/plugin.json) points at the
`skills/` directory.

For full plugin-tier support (automatic mode activation + ruleset injection
on every prompt), add the hooks from
[`hooks/qoder-hooks.json`](hooks/qoder-hooks.json) to your
`.qoder/settings.json`, replacing `SHIZEN_DIR` with the path to your shizen
checkout. Qoder's `UserPromptSubmit` hook activates the default mode on
first prompt and injects the ruleset every turn; `PreToolUse` with
`task|Task` matcher injects the ruleset into subagents. Level switches
(`/shizen lite|full|ultra|off`) work automatically.

### Hermes Agent

```bash
hermes plugins install mayank-xrz/shizen-tsunagi --enable
```

Restart Hermes after installing. The plugin injects the active shizen mode
before each LLM turn, registers the bundled skills as `shizen:<skill>`, and
adds `/shizen`, `/shizen-review`, `/shizen-audit`, `/shizen-debt`, and
`/shizen-help`. In shared gateways, restrict `/shizen` to trusted users with
Hermes slash-command access controls; runtime mode is process-local.

### CodeWhale

Reads `AGENTS.md` from the project root, zero setup. Copy
[`AGENTS.md`](AGENTS.md) to your project, or run `codewhale` from a
checkout of this repo. That's it.

### Swival

Stage the collection in your library first, then add the skills you want:

```bash
swival skills add --global https://github.com/mayank-xrz/shizen-tsunagi  # stage into ~/.config/swival/library
swival skills add shizen                                                 # install the collection into this project
swival skills add --global shizen                                       # or activate it in every project
```

Swival also reads `AGENTS.md` from the project root and
`~/.config/swival/AGENTS.md` globally, the instruction-only fallback.

On the command line, use a `$` prefix to explicitly activate a skill. For
example: `$shizen-review`.

### Devin CLI

```bash
devin plugins install mayank-xrz/shizen-tsunagi
```

Installs shizen as a Devin plugin; skills are available as
`/shizen:shizen`, `/shizen:shizen-review`, and so on.

### OpenClaw

```bash
clawhub install shizen
```

Installs shizen as an OpenClaw skill from ClawHub; the review, audit, debt,
and help skills install the same way (`clawhub install shizen-review`, and
so on). OpenClaw applies it on coding tasks and also exposes it as a
`/shizen` command. Without ClawHub, copy
[`.openclaw/skills/shizen`](.openclaw/skills/) into `~/.openclaw/skills/`.

---

Active every session, with a handful of commands (see
[Commands](#commands)). `/shizen ultra` exists for when the codebase has
wronged you personally. Startup and mode-change text shows the current
mode.

Set the level for every new session with the `SHIZEN_DEFAULT_MODE` env var
(`lite`/`full`/`ultra`/`off`), or a `defaultMode` field in
`~/.config/shizen/config.json` (`%APPDATA%\shizen\config.json` on Windows).
The default is `full`.

While active, the ruleset is also injected into every subagent spawned via
the Agent tool. To scope that to specific agent types (say, keep it off
read-only search agents), set the `SHIZEN_SUBAGENT_MATCHER` env var to a
regex tested against the subagent's `agent_type`. It is unanchored and
case-insensitive: `explore|general` matches either, `^general$` is exact,
and plugin agent types look like `plugin:name`. Unset means inject into
every subagent (the default); an invalid regex, or a subagent whose type
the platform doesn't report, also falls back to injecting.

Cursor, Windsurf, Cline, GitHub Copilot Chat (the VS Code, JetBrains, and
Visual Studio editor extension, not the standalone Copilot CLI covered
under [Install](#install)), Aider, Kiro, Zed, CodeWhale, Swival, Qoder: copy
the matching rules file from this repo ([`.cursor/rules/`](.cursor/rules/),
[`.windsurf/rules/`](.windsurf/rules/), [`.clinerules/`](.clinerules/),
[`.github/copilot-instructions.md`](.github/copilot-instructions.md),
[`AGENTS.md`](AGENTS.md), [`.kiro/steering/`](.kiro/steering/),
[`.qoder/rules/`](.qoder/rules/)).

Kiro: copy `.kiro/steering/shizen.md` to `~/.kiro/steering/` (global) or
`.kiro/steering/` in your project.

GitHub Copilot CLI fallback (instruction-only mode): it reads `AGENTS.md`
and `.github/copilot-instructions.md` in a project, or copy the rules into
`~/.copilot/copilot-instructions.md` to run shizen in every project. This
path keeps always-on guidance, but does not add plugin mode switches or
hooks.

VS Code with the Codex extension reads `AGENTS.md`, which this repo ships,
so it works from the repo root with no setup (`~/.codex/AGENTS.md` makes
Codex global).

JetBrains Junie can read `AGENTS.md` once you point it there in Settings →
Tools → Junie → Project Settings → Guidelines Path (it is not automatic
yet). This repo ships `AGENTS.md`; `.junie/guidelines.md` is Junie's legacy
path.

Amp (Sourcegraph) reads `AGENTS.md` from the working directory and parent
directories up to `$HOME`, which this repo ships, so it works with no setup
(`~/.config/amp/AGENTS.md` works globally).

Jules (Google) reads `AGENTS.md` from the repository root, which this repo
ships, so it picks up the ruleset with no setup.

Which files map to which agent: [Agent portability](docs/agent-portability.md).

### Uninstall

| Host | Command |
|------|---------|
| Claude Code | `/plugin remove shizen` |
| Codex | `codex plugin remove shizen` |
| Devin CLI | `devin plugins remove shizen` |
| Cursor / Windsurf / Cline / Qoder / etc. | Delete the copied rule file |

These remove the plugin's own files. They leave behind a small amount of
state shizen writes outside the plugin folder: the mode flag,
`~/.config/shizen/config.json`, and (if you accepted the setup nudge) a
`statusLine` entry in `~/.claude/settings.json`. Run
`node scripts/uninstall.js` to clean those up too. **Run it before the host
remove command above** — the script is itself a plugin file, so removing
the plugin first deletes it (or run it from a separate clone of this
repo). It only removes the statusLine entry if it points at shizen's own
script, so a statusline you set up yourself is left untouched.

## Commands

| Command | What it does |
|---------|--------------|
| `/shizen [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. No argument reports the current level. |
| `/shizen-review` | Review the current diff for over-engineering, hands back a delete-list. |
| `/shizen-audit` | Audit the whole repo for over-engineering, not just the diff. |
| `/shizen-debt` | Harvest the `shizen:` shortcuts you've deferred into a ledger, so "later" doesn't become "never". |
| `/shizen-help` | Quick reference for the commands above. |

Commands need a skill-capable host (Claude Code, Codex, Devin CLI,
OpenCode, Gemini, Swival, Hermes Agent, Qoder). In Codex they're skills,
invoke with `@` (`@shizen-review`). The instruction-only adapters (Cursor,
Windsurf, Cline, Copilot, Kiro) load the always-on ruleset without the
commands.

## Not ported

This fork carries over the ruleset, the host adapters, and the lifecycle
hooks. It does not carry over, from upstream ponytail:

- **The benchmark harness** (`benchmarks/`) — the promptfoo configs and
  measured-impact numbers. Any numbers cited here or in `examples/` are
  attributed to the upstream project's own runs, not remeasured for
  shizen. There is accordingly no `/shizen-gain` scoreboard command in
  this fork — see [ponytail's own honesty rule](https://github.com/DietrichGebert/ponytail)
  on why a per-repo savings number without a real baseline would be
  fabricated.
- **The `pi` agent extension** and **the MCP server** — narrower-audience
  subprojects, left out to keep this port to the widely-used adapters.
- **Translated READMEs** — this fork ships English only.

## Development

When changing the compact rule text, keep the agent copies aligned:

```bash
node scripts/check-rule-copies.js
npm test
```

The OpenClaw skill package (`.openclaw/skills/`) is generated from
`skills/`; rerun `node scripts/build-openclaw-skills.js` after changing a
skill, the test suite fails if it is stale. To publish the skills to
ClawHub, run `clawhub login` once, then
`node scripts/publish-openclaw-skills.js` (it publishes all five at the
`package.json` version; pass `--dry-run` to preview).

## FAQ

**Does it need a config file?**
No. An optional `~/.config/shizen/config.json` or `SHIZEN_DEFAULT_MODE` env
var can set the default level, but nothing is required.

**What if I really need the 120-line cache class?**
Insist and it gets built. Slowly. Correctly. Nature doesn't argue back.

**Is this affiliated with the ponytail project?**
No — it's an independent, unaffiliated fork/port under the MIT license.
See [Provenance](#provenance).

**Why "shizen"?**
自然 — nature. The shortest path that actually holds.

## License

[MIT](LICENSE), same as upstream. The shortest license that works.
