# Phased Build Plan

Four phases, strictly ordered. A phase begins only when the previous phase's **done-when** passes in full. At every phase boundary: update `memory.md` (phase status + any decisions made), commit, push. Small commits inside phases are fine.

## Phase 0 — Setup

**Goal:** a running skeleton with assets in place.

1. `create-next-app` → TypeScript, App Router, **no Tailwind**, ESLint default.
2. `npm install resend` — dependency list is now final (rules.md §3).
3. Drop assets into `public/`: `logo.png` + the 5 product JPEGs renamed to slug form (`chocolate-mix.jpg`, `vanilla-mix.jpg`, `berries-mix.jpg`, `fruit-mix.jpg`, `savoury-mix.jpg`). Original filenames contain spaces — rename, don't keep.
4. `.env.local` with `RESEND_API_KEY`. Confirm `.gitignore` covers it. **Create the Resend account with `stsales@shizentsunagi.com`** — the sandbox sender only delivers to the account's own address, and Phase 2's done-when requires real delivery to that inbox (the alternative is verifying the domain before Phase 2).
5. Delete the create-next-app demo content (starter page, vercel/next SVGs). Deletion over addition starts on day one.

**Done when:** `npm run dev` serves a blank page with zero console errors; `git log` shows the initial commit; `package.json` runtime deps = exactly 4.

## Phase 1 — Static Site

**Goal:** all six pages render with real content, styled per `design.md`.

1. `data/products.ts` — the 5 products, typed per architecture.md §3. Copy per prd.md §8 (placeholder structure until client copy lands — mark placeholders with `// ponytail: placeholder copy, replace when client delivers`).
2. `app/layout.tsx` — header (logo + brand name) and footer inline, `next/font` setup, site metadata, favicon from logo.
3. `app/globals.css` — design tokens as CSS custom properties from design.md, then layout and component styles. One stylesheet.
4. `app/page.tsx` — hero, 5 `ProductCard`s from the data file, brand story section.
5. `app/products/[slug]/page.tsx` — detail template + `generateStaticParams` over the 5 slugs; unknown slug → `notFound()`.
6. `components/ProductCard.tsx` — image, name, tagline, Coming Soon badge, Notify me button (button is inert this phase).

**Done when:** `/` and all 5 product URLs render correctly at 375px and 1280px widths; a wrong slug 404s; every image has alt text; no layout uses a library.

## Phase 2 — Notify Flow

**Goal:** the one feature works end to end.

1. `components/NotifyDialog.tsx` — native `<dialog>`, labelled email input, hidden honeypot field (`company`), submit; states: sending → success / error per prd.md §6 copy.
2. Wire the button on cards and detail pages to open the dialog with the right product.
3. `app/api/notify/route.ts` — validate per architecture.md §6 (honeypot silent-drop, email format check, slug allowlist), send via Resend to the hardcoded recipient, map outcomes to 200/400/502.
4. Leave the one required check behind (rules.md §2): a minimal script or assert-based check that the route rejects a bad email, rejects a bad slug, and accepts a valid pair (Resend call mocked or skipped via missing key).

**Done when:** submitting a valid email from any product delivers a real email to `stsales@shizentsunagi.com` naming that product; invalid email and honeypot submissions send nothing; a Resend failure shows the visitor the error state, not success.

## Phase 3 — Polish + Deploy

**Goal:** production live.

1. Accessibility pass: focus goes into the dialog on open and returns to the trigger on close; Esc closes; contrast pairs verified; `prefers-reduced-motion` respected.
2. Metadata: per-product `<title>`/description, OpenGraph image (the product image is fine — no custom OG generation, rung 1).
3. Push repo `shizen-tsunagi` to GitHub → import to Vercel → set `RESEND_API_KEY` → deploy.
4. Production smoke test: repeat Phase 2's done-when against the live URL.
5. Resend domain verification for `shizentsunagi.com` (DNS records) so sends come from `notify@shizentsunagi.com` — until then `onboarding@resend.dev` is acceptable. Log status in memory.md.

**Done when:** live URL passes the Phase 2 test; Lighthouse accessibility ≥ 90; prd.md §10 acceptance criteria all pass; memory.md records launch state and any open items (custom domain, client copy).

## Out of Phase

Anything not in these four phases is out of scope until the owner adds a phase. There is no Phase 4.
