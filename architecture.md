# Architecture — Shizen Tsunagi Pre-Launch Website

Companion to `prd.md`. This is the complete technical shape of the project. If a file or layer isn't listed here, it doesn't exist.

## 1. Stack

- **Framework:** Next.js (App Router, TypeScript) — one framework does routing, static generation, image/font optimization, and the API route.
- **Hosting:** Vercel (git-push deploys from the `shizen-tsunagi` repo).
- **Email:** Resend SDK, called from one API route.
- **Runtime dependencies (complete list):** `next`, `react`, `react-dom`, `resend`. Dev-only tooling that `create-next-app` ships (TypeScript, ESLint) is fine; nothing else gets added.

## 2. File Tree (complete)

```
shizen-tsunagi/
├── app/
│   ├── layout.tsx              # shell: header + footer inline, fonts, metadata
│   ├── page.tsx                # home: hero, product index, brand story
│   ├── not-found.tsx           # branded 404 (design.md §9)
│   ├── icon.svg                # hanko seal favicon (design.md §5) — supersedes app/icon.png, which leaves the repo
│   ├── zen-old-mincho-ja.woff2 # six-glyph JP subset, Google text= pre-subsetted (design.md §3)
│   ├── globals.css             # all styling: tokens + layout + components
│   ├── products/
│   │   └── [slug]/page.tsx     # product detail template (×5 via static params)
│   └── api/
│       └── notify/route.ts     # POST handler → Resend
├── components/
│   ├── ProductRow.tsx          # index row: name, tagline, ingredients, Coming soon, Notify me (rendered 5× from data)
│   └── NotifyDialog.tsx        # client component: native <dialog> + form
├── data/
│   └── products.ts             # the 5 products, typed; single source of truth
├── public/
│   ├── logo.png
│   └── products/
│       ├── chocolate-mix.jpg
│       ├── vanilla-mix.jpg
│       ├── berries-mix.jpg
│       ├── fruit-mix.jpg
│       └── savoury-mix.jpg
├── prd.md  architecture.md  rules.md  phased.md  design.md  memory.md
└── (create-next-app defaults: package.json, tsconfig, next.config, .env.local)
```

9 source files. Header and footer live inside `layout.tsx` — each is used exactly once, so they are not components (rules.md, ladder rung 1).

## 3. Data Model

One typed array in `data/products.ts`:

```ts
type Product = {
  slug: string;        // chocolate-mix | vanilla-mix | berries-mix | fruit-mix | savoury-mix
  name: string;
  tagline: string;     // ≤10 words
  description: string; // 2–3 sentences
  benefits: string[];  // 3–5 items
  ingredients: string[];
  image: StaticImageData; // static import of /products/{slug}.jpg
};
```

`data/products.ts` imports the five JPEGs statically (enables blur placeholders; content editing unchanged). No CMS, no database. Editing content = editing this file and pushing.

## 4. Rendering Strategy

- `/` and `/products/[slug]` are **fully static** — `generateStaticParams` returns the 5 slugs at build time. Zero server cost, instant loads.
- `/api/notify` is the only dynamic code path in the project.
- Images through `next/image` (built in, free optimization). Fonts through `next/font` (self-hosted at build, no runtime request).

## 5. Notify Flow (the only moving part)

```
visitor clicks "Notify me"
  → <dialog> opens (NotifyDialog, client component)
  → submit → fetch POST /api/notify { email, product, company }
       │                                        └ honeypot: hidden field
       ├─ company filled?        → 200 {ok:true}, send nothing (silent drop)
       ├─ email fails one regex? → 400 {ok:false}
       ├─ product not in the 5 slugs? → 400 {ok:false}
       └─ valid → resend.emails.send({
             to:      "stsales@shizentsunagi.com",   // hardcoded constant
             from:    "notify@shizentsunagi.com",    // onboarding@resend.dev until domain verified
             subject: `Notify request: ${productName}`,
             text:    email + product + ISO timestamp
          })
          ├─ Resend ok    → 200 {ok:true}  → dialog shows success, closes
          └─ Resend error → 502 {ok:false} → dialog shows retry message
```

The admin inbox is the datastore. `ponytail: inbox-as-database, ceiling ~50 signups/day of manual handling; add a store only when the client complains about compiling the list.`

## 6. API Contract

`POST /api/notify`

| Field | Type | Rule |
|---|---|---|
| `email` | string | required, must match `/^\S+@\S+\.\S+$/` server-side |
| `product` | string | required, must be one of the 5 slugs |
| `company` | string | honeypot — must be empty; filled = silent 200 |

Responses: `200 {ok:true}` · `400 {ok:false}` (validation) · `502 {ok:false}` (Resend failure). No other endpoints exist.

## 7. Configuration

| Item | Where | Value |
|---|---|---|
| `RESEND_API_KEY` | `.env.local` / Vercel env | the only secret |
| Recipient address | constant in `route.ts` | `stsales@shizentsunagi.com` — never changes, so not config |
| Sender domain | Resend dashboard (DNS) | verify `shizentsunagi.com` before launch |

## 8. What Is Deliberately Absent

Database, ORM, auth, sessions, state management, CSS framework, component library, form library, analytics, middleware, rate limiting (honeypot covers pre-launch bot volume — `ponytail:` add an IP throttle only if real spam appears), tests beyond the one check rules.md requires for the notify route.
