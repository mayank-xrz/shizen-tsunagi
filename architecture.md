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
│   ├── page.tsx                # home: hero, five washi panels, brand story
│   ├── not-found.tsx           # branded 404 (design.md §9)
│   ├── icon.svg                # hanko seal favicon (design.md §5) — supersedes app/icon.png, which leaves the repo
│   ├── zen-old-mincho-ja.woff2 # six-glyph JP subset, Google text= pre-subsetted (design.md §3)
│   ├── globals.css             # all styling: tokens + layout + components
│   ├── products/
│   │   └── [slug]/page.tsx     # product detail template (×5 via static params)
│   └── api/
│       ├── notify/route.ts     # POST handler → Resend
│       └── reviews/
│           ├── route.ts        # POST: validate → store pending → moderation email (§9)
│           ├── [slug]/route.ts # GET: approved reviews + average (§9)
│           └── moderate/route.ts # GET: HMAC-signed approve/reject links (§9)
├── components/
│   ├── ProductPanel.tsx        # washi panel: wash ground, ghost numeral, name, tagline, ingredients, Coming soon, Notify me (rendered 5× from data)
│   ├── ReviewSection.tsx       # client: fetches approved reviews, stars + submission form (design.md §10)
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
├── notify.check.mjs  reviews.check.mjs   # the two required checks (rules.md §2)
├── prd.md  architecture.md  rules.md  phased.md  design.md  memory.md
└── (create-next-app defaults: package.json, tsconfig, next.config, .env.local)
```

13 source files. Header and footer live inside `layout.tsx` — each is used exactly once, so they are not components (rules.md, ladder rung 1).

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
  hue: `var(--${string})`;     // deep-hue custom-property reference (design.md §2 hue table)
  hueWash: `var(--${string})`; // wash-ground custom-property reference (grounds only)
};
```

`data/products.ts` imports the five JPEGs statically (enables blur placeholders; content editing unchanged). No CMS, no database. Editing content = editing this file and pushing.

Phase 4 adds the Review model (stored in Upstash Redis — the prd §3 carve-out; `review:{id}` holds the JSON, `reviews:{slug}` is an RPUSHed list of ids):

```ts
type Review = {
  id: string;          // crypto.randomUUID()
  product: string;     // one of the 5 slugs
  name: string;        // ≤40 chars
  rating: number;      // integer 1–5
  comment: string;     // ≤500 chars
  ts: string;          // ISO timestamp
  status: "pending" | "approved";
};
```

## 4. Rendering Strategy

- `/` and `/products/[slug]` are **fully static** — `generateStaticParams` returns the 5 slugs at build time. Zero server cost, instant loads. The review section stays static-compatible: it is a client component that fetches `GET /api/reviews/{slug}` after load (§9).
- `/api/notify` and the three `/api/reviews*` routes are the only dynamic code paths in the project.
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

Responses: `200 {ok:true}` · `400 {ok:false}` (validation) · `502 {ok:false}` (Resend failure). The review endpoints are specified in §9; no others exist.

## 7. Configuration

| Item | Where | Value |
|---|---|---|
| `RESEND_API_KEY` | `.env.local` / Vercel env | Resend API key |
| `UPSTASH_REDIS_REST_URL` | `.env.local` / Vercel env | review store endpoint (Phase 4) |
| `UPSTASH_REDIS_REST_TOKEN` | `.env.local` / Vercel env | review store token (Phase 4) |
| `MODERATION_SECRET` | `.env.local` / Vercel env | HMAC key for approve/reject links (Phase 4) |
| Recipient address | constant in `route.ts` | `stsales@shizentsunagi.com` — never changes, so not config |
| Sender domain | Resend dashboard (DNS) | verify `shizentsunagi.com` before launch |

## 8. What Is Deliberately Absent

Database (one carve-out: the Phase 4 review store — Upstash Redis over its REST API, reviews only), ORM, auth, sessions, state management, CSS framework, component library, form library, analytics, middleware, rate limiting on the notify route (honeypot covers pre-launch bot volume — `ponytail:` add an IP throttle only if real spam appears; the review route ships its own 5/hour limit, §9), tests beyond the checks rules.md requires.

## 9. Review Flow (Phase 4, owner-added)

```
visitor submits the review form (ReviewSection, client component)
  → POST /api/reviews { name, rating, comment, product, company }
       │                                              └ honeypot: hidden field
       ├─ company filled?                → 200 {ok:true}, store nothing (silent drop)
       ├─ product not in the 5 slugs,
       │  name empty or >40,
       │  rating not an integer 1–5,
       │  comment empty or >500          → 400 {ok:false}
       ├─ 6th otherwise-valid submission
       │  from one IP within an hour     → 429 {ok:false}   (Redis INCR + 1h TTL)
       ├─ Redis store fails              → 502 {ok:false}   (a storage failure never looks like success)
       └─ valid → SET review:{id} (status "pending") + RPUSH reviews:{slug} id
            → email stsales@shizentsunagi.com (existing Resend setup) carrying
              Approve / Reject links:
              /api/reviews/moderate?id={id}&action={approve|reject}&sig={sig}
              sig = HMAC-SHA256(id + action, MODERATION_SECRET)   (node:crypto — stdlib, rung 3)
            → 200 {ok:true, id}
              (id is returned so reviews.check.mjs can exercise moderation —
               it is useless without MODERATION_SECRET; an email failure is
               tolerated: the review is safely stored pending — ponytail: a lost
               moderation email strands it invisible; acceptable pre-launch,
               revisit if it bites)

GET /api/reviews/{slug}
  → approved reviews (newest first) + average + count
    (ponytail: filters status in the route — ceiling ~hundreds of reviews per
     product; index approved ids separately only if that's ever exceeded)

GET /api/reviews/moderate?id&action&sig
  ├─ sig invalid → 401
  ├─ action=approve → status flips to "approved"
  └─ action=reject  → review deleted (id LREMed from its list)
  → plain HTML confirmation page
```

Upstash is reached over its REST API with plain `fetch` (zero new dependencies); every Redis call is error-handled. Pages stay fully static — the review section is a client component fetching the GET endpoint after load.
