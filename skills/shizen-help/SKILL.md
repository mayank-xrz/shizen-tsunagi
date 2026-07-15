---
name: shizen-help
description: >
  Quick-reference card for all shizen modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: /shizen-help,
  "shizen help", "what shizen commands", "how do I use shizen".
---

# Shizen Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/shizen lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `/shizen` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. Default. |
| **Ultra** | `/shizen ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **shizen** | `/shizen` | Nature-coded minimalism itself. Simplest solution that works. |
| **shizen-review** | `/shizen-review` | Over-engineering review: `L42: yagni: factory, one product. Inline.` |
| **shizen-audit** | `/shizen-audit` | Whole-repo over-engineering audit: ranked list of what to delete. |
| **shizen-debt** | `/shizen-debt` | Harvest `shizen:` shortcut comments into a tracked ledger. |
| **shizen-help** | `/shizen-help` | This card. |

Codex uses `@shizen`, `@shizen-review`, and `@shizen-help`; Claude Code
and OpenCode use the slash-command forms above (OpenCode ships all five as
slash commands).

## Deactivate

Say "stop shizen" or "normal mode". Resume anytime with `/shizen`.
`/shizen off` also works.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export SHIZEN_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/shizen/config.json`, Windows: `%APPDATA%\shizen\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/shizen` when wanted.

Resolution: env var > config file > `full`.

## Update

Enable auto-update once: open `/plugin`, go to Marketplaces, pick shizen, Enable auto-update. Claude Code then pulls new versions at startup (run `/reload-plugins` when it prompts). Manual refresh: `/plugin marketplace update shizen` then `/reload-plugins`.

If `/plugin` is not recognized, your Claude Code is out of date. Update it (`npm install -g @anthropic-ai/claude-code@latest`, or `brew upgrade claude-code`) and restart. Other hosts use their own update flow.

## More

Full docs + examples: https://github.com/mayank-xrz/shizen-tsunagi
