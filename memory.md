# Memory — Shizen Tsunagi Website

Running memory for this repo. Any agent or developer starting a session reads this file first, and appends to it at every phase boundary and every locked decision (phased.md). **Append only — never rewrite or delete history.** Newest entries at the bottom of each section.

## What This Project Is

Pre-launch site for Shizen Tsunagi: 5 products, no commerce, Notify me → email to admin inbox. Full spec: `prd.md` → `architecture.md` → `rules.md` → `phased.md` → `design.md`. Ponytail discipline is binding (rules.md).

## Decision Log

| Date | Decision |
|---|---|
| 2026-07-15 | Reference structure: ourlittlejoys.com — structure only, visual identity is our own (design.md). |
| 2026-07-15 | Scope: multi-page — home + 5 product detail pages. No commerce of any kind. |
| 2026-07-15 | Stack locked: Next.js App Router on Vercel; Resend for email. |
| 2026-07-15 | Ponytail **full** adopted as binding discipline; "nothing else" — no additions beyond spec. |
| 2026-07-15 | Inbox is the database: no storage layer for signups. Ceiling + upgrade path noted in architecture.md §5. |
| 2026-07-15 | Runtime dependency budget locked at 4: next, react, react-dom, resend. |
| 2026-07-15 | Notify recipient hardcoded: stsales@shizentsunagi.com. Only env var: RESEND_API_KEY. |
| 2026-07-15 | Products (5): chocolate-mix, vanilla-mix, berries-mix, fruit-mix, savoury-mix. Images supplied via Drive; renamed to slug form in /public/products/. |
| 2026-07-15 | Repo name: `shizen-tsunagi`. |
| 2026-07-15 | Palette pinned by client logo (cream/ink/teal/sage/gold — design.md §2). Display face: Shippori Mincho. Signature element: tsunagi thread (design.md §4). |
| 2026-07-15 | Anti-spam: honeypot field only; no rate limiting until real spam appears. |
| 2026-07-15 | Recheck pass: source-file count corrected to 8; focus rings are teal (gold fails 3:1 non-text contrast on cream); home cards use centered flex-wrap (grid leaves the 5th card as a left-hung orphan); Resend account must be opened as stsales@shizentsunagi.com or domain verified before Phase 2's delivery test (sandbox sender delivers only to the account's own address). |
| 2026-07-15 | QA gate adopted (rules.md §3): all md/prompt files pass prompt-optimizer's 5-dimension design evaluation before commit. First pass done — 4 ambiguity fixes applied (palette authority → design.md; email regex pinned; component-file rule clarified; image crop behavior stated). |
| 2026-07-15 | Product category resolved from packaging OCR: all five are multigrain nutrition mix powders — "Sweet Mix" line (Chocolate: cocoa pod, almond, dates, cacao bean · Vanilla: vanilla pod, cashew, oats · Berries: blueberry, cranberry, strawberry, oats · Mixed Fruit: apple, banana, papaya, dates, oats) plus Savoury Mix, multigrain/seed & herb (moringa, millet, flax seed, cumin). On-pack tagline: "Nature's Goodness, Connected to You". Shared claims: 100% organic, farm-sourced, no preservatives, NET QTY 200 g. PRD §11.1(a) answered; §11.1(b) final copy wording still with client — Phase 1 placeholders draw from this pack text. |
| 2026-07-15 | logo-transparent.png absent from Drive; transparent PNG still owed by the client (JPEG carries no alpha for the cream header). |

## Phase Status

| Phase | Status | Notes |
|---|---|---|
| 0 — Setup | done | 2026-07-15: done-when passed — build ✓, dev / 200 blank ✓, deps exactly next/react/react-dom/resend ✓, .env.local created (RESEND_API_KEY empty, owner fills). Product JPEGs NOT fetched: the remote build environment's network policy blocks drive.google.com (proxy CONNECT 403) — owner must place them (open item 4). logo.png absent (open item 5). |
| 1 — Static site | not started | |
| 2 — Notify flow | not started | |
| 3 — Polish + deploy | not started | |

## Open Items

1. **Product copy (blocker for Phase 1 final content):** client to confirm (a) product category — milk nutrition powder vs dry mix — and (b) whether written copy exists or dev writes it from a positioning line. Until then: placeholder copy in data/products.ts, marked with `ponytail:` comments. *(2026-07-15: (a) answered by packaging OCR — see Decision Log; (b) still open.)*
2. Resend setup: account must be created with stsales@shizentsunagi.com (or domain verified) before Phase 2 testing; domain verification for shizentsunagi.com needed before launch sends from notify@shizentsunagi.com.
3. Custom domain attachment to Vercel — at launch or later, client's call.
4. **Product JPEGs (blocks Phase 1 guard):** the remote build environment's network policy refuses CONNECT to drive.google.com (proxy 403), so the 5 images could not be downloaded. Owner to either place them in public/products/ (slug names) and push, or allow drive.google.com in the environment network settings so the session can retry.
5. **public/logo.png:** transparent PNG still owed by the client; not in Drive. Phase 1 header/favicon decision pending owner (wordmark-only vs wait).
6. RESEND_API_KEY is empty in .env.local — owner fills it directly (never via chat) before Phase 2's delivery test.

## Session Notes

*(append below: date — what was done, what was decided, what surprised you)*

- 2026-07-15 — Phase 0 run. First: repo had to be reset — a prior session had misread "follow this git repo while creating the code" and ported the ponytail project itself into the repo; the six spec docs arrived only this session (owner pasted them into chat; committed verbatim, then the port files were removed — history keeps them at db7500c). Then Phase 0 proper: create-next-app (TS, App Router, ESLint, no Tailwind, no src-dir, @/* alias, npm) scaffolded via temp subdir → moved to root (create-next-app skipped git init under the existing repo); npm install resend → runtime deps exactly the four; demo content deleted (starter page, page.module.css, 5 SVGs, plus AGENTS.md/CLAUDE.md boilerplate the newer create-next-app emits); page.tsx blank, globals.css minimal reset, layout.tsx bare shell titled "Shizen Tsunagi"; README → two lines; .env.local with empty RESEND_API_KEY; .gitignore ships .env* coverage. Done-when: build ✓, dev / → HTTP 200 blank ✓, server log clean ✓. Surprises: (1) drive.google.com is blocked by the environment's network policy (proxy CONNECT 403) — product images undownloadable from here, moved to open item 4; (2) create-next-app now generates AGENTS.md/CLAUDE.md and prompts nothing with --yes.
