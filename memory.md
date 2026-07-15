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

## Phase Status

| Phase | Status | Notes |
|---|---|---|
| 0 — Setup | not started | |
| 1 — Static site | not started | |
| 2 — Notify flow | not started | |
| 3 — Polish + deploy | not started | |

## Open Items

1. **Product copy (blocker for Phase 1 final content):** client to confirm (a) product category — milk nutrition powder vs dry mix — and (b) whether written copy exists or dev writes it from a positioning line. Until then: placeholder copy in data/products.ts, marked with `ponytail:` comments.
2. Resend setup: account must be created with stsales@shizentsunagi.com (or domain verified) before Phase 2 testing; domain verification for shizentsunagi.com needed before launch sends from notify@shizentsunagi.com.
3. Custom domain attachment to Vercel — at launch or later, client's call.

## Session Notes

*(append below: date — what was done, what was decided, what surprised you)*
