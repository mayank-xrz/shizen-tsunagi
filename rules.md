# Rules — Binding for Every Session on This Repo

These rules are active in every coding session, every response, every file. They do not relax over time. Source discipline: [ponytail](https://github.com/DietrichGebert/ponytail), level **full**.

## 1. The Ladder

Before writing any code, stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need → skip it and say so in one line. (YAGNI)
2. **Already in this codebase?** A helper, type, style, or pattern that already lives here → reuse it. Look before you write.
3. **Stdlib / language does it?** Use it.
4. **Native platform feature covers it?** `<dialog>` over a modal lib, `<input type="email">` over a validation lib, CSS over JS, HTTP status codes over custom error schemes.
5. **Already-installed dependency solves it?** `next/image`, `next/font` are already in the box — use them. Never add a new package for what a few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

The ladder runs *after* understanding the problem, never instead of it. Read every file the change touches and trace the real flow end to end first. Bug reports name symptoms — fix the root cause where all callers route through, not the one path the report mentions.

## 2. Construction Rules

- No abstraction with one implementation. No interface, factory, wrapper, or config for a value that never changes.
- No scaffolding "for later." Later can scaffold for itself.
- Fewest files that work. A component earns its own file only if it's used in ≥2 places **or rendered repeatedly from data** (ProductCard qualifies via the 5-item map; NotifyDialog via cards + detail pages); otherwise inline it.
- Deletion over addition. Boring over clever — clever is what someone decodes at 3am.
- Deliberate shortcuts with a known ceiling get a `ponytail:` comment naming the ceiling and the upgrade path. Nothing gets silently under-built.
- Non-trivial logic (the notify route's validation + send path) leaves **one** runnable check behind — the smallest thing that fails if it breaks. No test framework, no fixtures, no suites.

## 3. Project-Specific Bindings

- **Dependency budget:** runtime deps are exactly `next`, `react`, `react-dom`, `resend`. Adding anything else requires the owner saying yes in writing first. No exceptions for "tiny" packages.
- **No CSS frameworks, no Tailwind, no UI kits, no icon packages.** Plain CSS in `globals.css` using the tokens in `design.md`. An icon is an inline SVG.
- **No storage layer.** The admin inbox is the record (see architecture.md §5). Do not add a database, KV, or spreadsheet integration.
- **Recipient email is a hardcoded constant** (`stsales@shizentsunagi.com`). The only env var is `RESEND_API_KEY`.
- **Scope wall:** anything listed in prd.md §3 (Non-Goals) must not be built, stubbed, or "prepared for" — no cart placeholders, no commented-out checkout code, no unused auth folders.
- Follow `phased.md` order. A phase's *done-when* must pass before the next phase starts. Update `memory.md` at every phase boundary and every locked decision.
- **Doc/prompt QA gate:** every `.md` spec or prompt file added or changed in this repo passes the prompt-optimizer design evaluation before commit — goal clarity, instruction completeness, structural executability, ambiguity control, robustness ([linshenkx/prompt-optimizer](https://github.com/linshenkx/prompt-optimizer), prompt-only evaluation). Findings get fixed as ≤3 precise edits per file, mapped to exact text.

## 4. Never Cut (laziness stops here)

- Server-side input validation on `/api/notify` — it is a public trust boundary.
- Error handling that surfaces failure to the visitor (a failed send must never look like success).
- Accessibility basics: every input labelled, dialog focus handled, alt text on every image, contrast per design.md, visible keyboard focus, `prefers-reduced-motion` respected.
- Anything the owner explicitly requests. If they insist on the full version, build it — no re-arguing.

## 5. Output Style

Code first. Then at most three short lines: what was skipped, when to add it. Pattern: `[code] → skipped: [X], add when [Y].` If the explanation is longer than the code, delete the explanation. Reports the owner explicitly asks for are exempt.

## 6. Escape Hatch

"stop ponytail" / "normal mode" from the owner reverts these rules for the session. Nothing else does.

The shortest path to done is the right path.
