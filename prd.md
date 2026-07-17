# PRD — Shizen Tsunagi Pre-Launch Website

**Repo:** `shizen-tsunagi` · **Status:** Draft v1 · **Owner:** Mayank (dev) / Shizen Tsunagi (client)

## 1. Summary

A pre-launch marketing website for Shizen Tsunagi, a nature-connected nutrition brand. The site showcases 5 upcoming products in the visual style of ourlittlejoys.com (benefit-led D2C product pages). Nothing is purchasable: every product is "Coming Soon" with a **Notify Me** flow that emails the visitor's address to the brand admin. Built lean under the ponytail discipline — minimum dependencies, native platform features, no speculative infrastructure.

## 2. Goals

1. Present the brand and all 5 products credibly before launch.
2. Capture purchase intent: every Notify Me submission lands in the admin inbox with the product it was for.
3. Ship fast on Vercel with near-zero maintenance surface.

## 3. Non-Goals (explicit)

No cart, checkout, payments, or pricing. No user accounts or auth. No database or storage layer — **the admin inbox is the record** (`ponytail:` ceiling — add storage only if signup volume makes inbox compilation painful) — except the review store (Phase 4, owner-added): Upstash Redis holds reviews only; signups still land in the inbox. No CMS — content lives in one data file. No admin panel, no analytics, no i18n, no blog. Anything not listed in this PRD does not get built.

## 4. Reference & Design Direction

- **Layout reference:** ourlittlejoys.com — hero, product card grid, detail pages with benefits/ingredients sections. Reference is for *structure*, not visual identity.
- **Palette (derived from logo):** sage green `#8FA382`, deep teal `#2F5D50`, warm gold `#C9A24B`, off-white background `#FAF7F1`, dark ink text `#22302B`. Final, binding values live in design.md §2 — the base tokens plus the five product hue pairs; no colors outside that table enter the codebase.
- **Logo:** `logo-transparent.png` (provided). Used in header and footer.
- **Typography:** one display font via `next/font`, system stack for body. Two font families maximum.
- Fully responsive; mobile-first (primary traffic will be mobile).

## 5. Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Hero, five washi product panels (design.md §4), brand story section, footer |
| `/products/[slug]` | One detail page per product: image, name, tagline, description, benefits, ingredients, Notify Me CTA, review section (§12) |
| 404 | branded not-found (design.md §9) |

**Slugs:** `chocolate-mix`, `vanilla-mix`, `berries-mix`, `fruit-mix`, `savoury-mix`.

## 6. Core Feature — Notify Me

1. Every product panel and detail page shows a **"Coming Soon — Notify Me"** button (no Add to Cart anywhere).
2. Button opens a native `<dialog>` containing: product name, one `<input type="email" required>`, one hidden honeypot field (lazy bot filter — submissions with it filled are silently dropped), submit button.
3. Submit → `POST /api/notify` with `{ email, product }`.
4. Server validates email format (one check), then sends via **Resend** to `stsales@shizentsunagi.com`:
   - Subject: `Notify request: {product}`
   - Body: visitor email, product name, timestamp.
5. Client states: sending → success ("You're on the list — we'll email you at launch.") or error ("Something went wrong, try again."). Dialog closes on success.
6. Recipient address is a hardcoded constant, not an env var — it never changes (ponytail: no config for fixed values).

## 7. Tech Constraints (ponytail rules — binding)

- **Stack:** Next.js (App Router) on Vercel.
- **Dependency budget:** `next`, `react`, `react-dom`, `resend`. Nothing else — no UI kits, no CSS frameworks, no form/state/validation libraries.
- Native platform first: `<dialog>` for the modal, `<input type="email">` + one server-side check for validation, plain CSS (single global stylesheet + component-level where needed), `next/image` and `next/font` (already in the box).
- Product content in one file: `data/products.ts`. Fewest files that work.
- Never cut: server-side input validation, error handling on the API route, accessibility basics (labels, focus handling on dialog, alt text, contrast).

## 8. Content Requirements

- **Images:** 5 product JPEGs (provided via Drive) placed in `/public/products/`, renamed to slug form: `chocolate-mix.jpg`, `vanilla-mix.jpg`, `berries-mix.jpg`, `fruit-mix.jpg`, `savoury-mix.jpg`. Logo at `/public/logo.png`. (Original filenames contain spaces — rename before commit.)
- **Per-product copy structure:** name, tagline (≤10 words), description (2–3 sentences), 3–5 benefit bullets, ingredients list.
- **⚠️ OPEN:** actual copy not yet supplied. Blocked on client answering: (a) what the product category is (milk nutrition powder vs. dry mix/muesli), (b) whether written copy exists or dev writes it from a positioning line.

## 9. Configuration & Prerequisites

- `RESEND_API_KEY` — the only environment variable (set in Vercel project settings).
- Resend sender domain: verify `shizentsunagi.com` in Resend (DNS records) to send from `notify@shizentsunagi.com`. The `onboarding@resend.dev` test sender **only delivers to the Resend account's own email address** — so either create the Resend account with `stsales@shizentsunagi.com`, or verify the domain before end-to-end testing. Sends to any other address will 403 until then.
- Resend free tier (100 emails/day) is sufficient for pre-launch volume.

## 10. Acceptance Criteria

1. All 6 pages render correctly on mobile and desktop; Lighthouse accessibility ≥ 90.
2. Submitting a valid email from any product delivers an email to `stsales@shizentsunagi.com` naming that product within a minute.
3. Invalid email is rejected client-side and server-side; honeypot submissions send nothing.
4. No purchase/checkout affordance exists anywhere on the site.
5. `package.json` contains no dependencies beyond the four listed in §7.
6. Site deploys on Vercel from the `shizen-tsunagi` repo with only `RESEND_API_KEY` configured.

## 11. Open Questions

1. Product category + copy source (blocks §8 — the only blocker to build).
2. Custom domain: attach `shizentsunagi.com` at launch or run on `shizen-tsunagi.vercel.app` initially?

## 12. Reviews (Phase 4, owner-added)

Each product page carries a review section: the average rating out of 5, the review count, the approved reviews, and a submission form (name, 1–5 stars, comment). Anyone can submit; **nothing publishes without owner approval** — moderation happens through emailed Approve/Reject links (architecture.md §9). The section is reachable at `/products/{slug}#reviews`, and these URLs are permanent: printed QR codes encode them.
