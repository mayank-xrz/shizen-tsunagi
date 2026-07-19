# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words — natural materials, quiet pacing, and one visible idea of *connection*. v5's structural reference is Suzunoya's Kinu catalog (`suzunoya.com/kinu`): we take its structure, pacing, and catalog anatomy — we do NOT take its Japanese-language body text, its vertical English text, its photography dependence, or any scroll-jacking library. Copying anyone's look is off the table.

## 1. Direction

**v6 (owner-directed 2026-07-18, hero-design reskin) supersedes v5's chassis, type, and opening screen — the catalog-chapter architecture below is unchanged.** The owner built a hero in Claude's design tool and directed "make it perfect to use" + reskin the whole site to match. What changed site-wide: (1) **Palette** — the v5 cream/ink/**teal** chassis is repainted to the hero's warmer scheme (cream `#EFE9DC`, deep green `#2E3B2C` as the primary in place of teal, warm-grey body `#4A4536`, muted brown, hairline `#D8CDB8`); the token *names* are unchanged (`--teal` now carries the green) so every component inherits the new look. The five product hue pairs (§2) are **kept** — the chapters keep their per-product identity on the new chassis. (2) **Type** — Zen Old Mincho gives way to **Cormorant Garamond** (display + body) and **IBM Plex Mono** (labels/eyebrows), the design's two Latin faces; the committed JP subset (§3) stays for kanji, standing in for the design's Noto Serif JP (it already covers every glyph — no new fetch). (3) **Opening screen** — the v5 manifesto (and its botanical plate) is replaced by the **hero** (§5): a two-column room, copy left, the lead pack shot right with a cream edge-fade, a five-mix jump row, and an `Explore Recipes →` CTA. The fixed index rail and the tategaki rail retire (the hero's mix row and the photo's vertical 自然つなぎ take their place). Everything else — the five chapters, detail pages, 404, dialog, reviews, API routes, checks — keeps its structure and function, wearing the new chassis.

v5: **kinu catalog scroll** — one product, one room, one scroll. The home page is a chaptered catalog walk: a quiet manifesto, then five full-viewport chapters — one per product, each drenched in its dentōshoku hue pair — closing on a human section (the grower) and the footer. It reads like a museum catalog, not a product grid. The boldness budget is spent on the chapter pacing and the catalog anatomy (§4); everything else stays quiet. If a choice drifts toward a generic wellness/e-commerce template, it is wrong.

v5 supersedes v4:

- **Removed — from this spec and from the code:** `ProductPanel.tsx` and the washi-panel composition (the 40% seam-crossing pack shot, its `min-height calc(...)` geometry, the detail "band" framing); `SeigaihaBand` and every seigaiha appearance except the 404's literal fans (§9); the v4 marketing hero (the 3.75rem headline + CTA block).
- **Kept from v4, verbatim unless amended below:** the chassis tokens and the five hue pairs (§2, byte-identical); the color law (§2); the kanji identity — wordmark, tategaki rail (JP glyphs only, §5), hanko seal favicon, `lang="ja"` discipline; the committed 19-glyph subset (§3); ghost numerals 一…五 at 8%, one per chapter; the gold Coming soon eyebrow (its contrast exception stands, 2026-07-15); interpunct ingredient lines; teal `::selection`; the multiply/blur image treatment and the iOS mask/blend separation (§8); the 404 concept (§9); header, footer, NotifyDialog behavior, ReviewSection (§10), all API routes and both checks.
- **Added:** the chapter anatomy (§4) — catalog line, kanji annotation, texture crop, spec rows — and native scroll machinery: proximity snap, `view()`-timeline reveals, and a `scroll()`-timeline progress rail.

`--sage` still has no role — the token stays, pinned by the logo.

## 2. Tokens (CSS custom properties — the only colors allowed)

```css
/* v6 chassis (owner-directed 2026-07-18, from the hero design). Names kept
   from v1–v5 so components inherit; --teal now carries the deep green. */
:root {
  --cream:  #EFE9DC;  /* page background */
  --ink:    #4A4536;  /* body text — warm brown-grey */
  --teal:   #2E3B2C;  /* deep green: display type, buttons, links, wordmark */
  --muted:  #746147;  /* eyebrows, secondary text, kanji annotations (AA-nudged
                         from the design's #7A6A4F to clear 4.5:1 on cream) */
  --hover:  #5A4632;  /* link + button hover */
  --paper:  #F5F0E4;  /* light text set over photography */
  --sage:   #8FA382;  /* retained, no role */
  --gold:   #C9A24B;  /* Coming soon badge + star ratings only — never body text */
  --line:   #D8CDB8;  /* hairline borders */
}
```

v1–v5 pinned this block to the client's logo; **v6 repaints it to the hero design (owner-directed) — the pin no longer holds.** The old teal `#2F5D50` and cream `#FAF7F1` are gone; `--teal` is the green primary. The gold badge keeps its contrast exception (now 1.98:1 on the warmer cream, owner-accepted 2026-07-15). v4 appended the product hue table — five dentōshoku pairs, deep hue + wash ground, the only other colors in the codebase — and v5 keeps it byte-identical:

```css
/* v4 product hues — one pair per product (deep + wash) */
--kogecha:      #6B4A36;  /* 焦茶 kogecha, burnt-tea brown — chocolate */
--kogecha-wash: #F2E9E1;
--kin-iro:      color-mix(in srgb, var(--gold), var(--ink) 30%);
                /* 金色 kin-iro, antique gold — vanilla. var(--gold) itself
                   measures 2.09:1 on its wash and no legible gold can reach
                   3:1 on a pale wash; this deepening (≈ #978041)
                   was owner-approved 2026-07-16 */
--kin-iro-wash: #F6EFD9;
--azuki:        #9D5B63;  /* 小豆 azuki, red-bean rose — berries */
--azuki-wash:   #F4E7EA;
--kaki:         #C4683F;  /* 柿 kaki, persimmon — fruit. Deepened from the
                             draft #C96F4A (2.997:1 on its wash),
                             owner-approved 2026-07-16 */
--kaki-wash:    #F7E8DE;
--koke:         #7E8A4F;  /* 苔 koke, moss — savoury */
--koke-wash:    #EDF0DF;
```

**Color law (binding):**

- **Exactly one hue pair per view:** every composition — a chapter, the detail composition, the manifesto — draws from a single product's pair plus the chassis; two products' hues never appear inside the same composition. Adjacent chapters meet at a hard seam; nothing crosses it (§4).
- **Deep hues** appear only in display text ≥1.5rem and ghost numerals — never body text, never interactive elements.
- **Washes are grounds only** — never text, never strokes, never fills inside content.
- **Body text is always `--ink`. Buttons and links are always `--teal`.**
- **The chassis — cream, ink, teal, gold, line — is unchanged.**

Enforcement is structural: each chapter or detail composition sets `--hue`/`--hue-wash` once from `data/products.ts` (a `style` custom-property assignment keyed by product); component CSS only ever reads `var(--hue)`/`var(--hue-wash)`. No component names a product color directly.

**Pre-verified rulings (do not relearn these):** (1) the catalog line and the kanji annotation are `--ink`, not the deep hue — small text (≤1rem) in the deep hue fails AA-normal (4.5:1) on three of the five washes (kin-iro 3.34, kaki 3.25, koke 3.22); the law's "deep hues only ≥1.5rem" already encodes this — do not "improve" small text into the hue. (2) Chapter names at 3rem in the deep hue pass AA-large on every pair (3.22–6.59, §8) — no re-derivation needed unless a hex changes, and the hexes are pinned. Any color/size pairing not named in this document gets its ratio computed before it enters the spec.

## 3. Typography

- **v6 (owner-directed 2026-07-18):** the type system below moves from Zen Old Mincho to the hero design's faces. **Display + body:** *Cormorant Garamond* via `next/font/google`, weights **400 / 500 / 600 / 700** — 400 body, 500 the hero + section headings, 600 the header wordmark, 700 the chapter and product names. It carries body text too (the design sets the hero in one serif). **Labels / eyebrows:** *IBM Plex Mono* via `next/font/google`, ~0.7rem, uppercase, `letter-spacing: 0.18em` — the hero eyebrow, catalog line, spec-row labels, ingredient lines, form labels. (The Coming soon label stays gold.) The `--font-display` / `--font-mono` variables carry them; no new npm dep (both are `next/font/google`, self-hosted at build).
- Scale (rem): **3 chapter-name (≥768px; 2.25 below) / 2.25 section + manifesto headline / 1.5 subhead / 1.0 body / 0.75 label.** The 3.75rem hero slot dies with the hero. Chapter and product names: weight 700, the deep hue. Section headings: 2.25/400 `--teal`; the manifesto headline: 2.25/400 `--ink`. The subhead slot serves the dialog title (`--teal`) and the detail tagline (`--ink`). The kanji annotation sits at ~0.875rem in `--ink`. Body line-height 1.7.
- **Japanese glyphs:** the committed pre-subsetted woff2 (`next/font/local`, weight 400, fetched once from Google's `text=` API because `next/font` has no `text` option — mechanism owner-approved 2026-07-16) extends to exactly the glyphs the site renders: **自然つなぎ繋一二三四五焦茶小豆柿苔金色** — the six identity glyphs, the five numerals (ghosts + rail), and the eight hue-name glyphs (kanji annotations). It already covers everything v5 renders — verify by grep, never re-fetch. Its className is applied to every `lang="ja"` span. Still one display family + one silent family; no third font.

## 4. Signature — The Catalog Scroll

**Home structure:** `header → manifesto → chapter ×5 (data order) → grower → footer`. The manifesto and every chapter get `min-height: 100svh` — natural growth allowed (content may exceed it on small phones), never `height`. The manifesto and the grower sit on `--cream`. Adjacent chapters meet at a hard seam between washes — no gradients, no overlap; nothing crosses a seam (v4's seam-crossing shot is gone).

**Chapter anatomy** (exact, in this order):

1. **Ghost numeral** — 一…五 (chocolate 一 … savoury 五) in the deep hue at 8% opacity, sized ≈ `min(20rem, 40vw)`, top-right, `aria-hidden`, cropped by its own layer so it can never overflow the chapter.
2. **Catalog line** — `No. 001 · kogecha` style: the number derives from the array index (`String(i + 1).padStart(3, "0")` — no new data field); the hue's romaji name follows a middle dot. Label style, in `--ink` (§2 ruling 1).
3. **Coming soon** — the gold eyebrow, unchanged.
4. **Kanji annotation** — the hue's kanji (焦茶, 金色, 小豆, 柿, 苔) at ~0.875rem directly above the English name, `lang="ja"`, in `--ink` (§2 ruling 1) — the furigana gesture, inverted for an English site.
5. **Product name** — the deep hue, weight 700, 3rem ≥768px / 2.25rem below.
6. **Two images from the ONE existing JPEG:**
   - **Pack shot** — the built multiply/blur/feather treatment, ~44% width ≥768px, 4:5.
   - **Texture crop** — a second composition: a square frame with `overflow: hidden`, the same `next/image` scaled and positioned so the pack's round window — the visible mix — fills the frame. Ladder: ONE shared position/scale for all five first (the packs are similarly framed); only if a visual check misses does a per-product offset field enter `data/products.ts`. Blend on the img, crop/mask on the frame — never both on one element (§8).
7. **Poetic copy** — the `description` field: 3–4 lines in the composition/process register (§7), body size, `--ink`, set in the display face. One field, reused — it feeds the chapter, the detail page, and the meta description.
8. **Spec rows** — hairline-topped (`--line`) label/value rows: `Net quantity → 200 g` (constant, hardcoded in the component); `Base → ` the `base` field (`Multigrain · organic`; the savoury mix reads `Multigrain, seed & herb · organic`); `Key → ` the existing interpunct ingredient line. Labels in the label style; values in `--ink` body.
9. **Actions** — an outline **Notify me** (teal, §5, opens the existing dialog for this product) and a teal body-size **See details** text link to `/products/{slug}`. The name is never a link (v4 ruling carried over; deep hues stay barred from interactive elements).

**Layout:** ≥768px, a two-column room — images left (the pack shot filling the ~44% image column, the texture crop at ≈58% of the pack's width offset below it toward the text column), text right, the whole centered vertically in the viewport. Below 768px, a single column: the pack shot at ~72% width, the texture crop at ≈52% offset beside/below it, then the text. The image proportions are approximate — the Stage 2 checkpoint tunes them visually. Both images render at every width.

**Scroll machinery (all native CSS — every technique already proven in this repo):**

- **Snap:** `scroll-snap-type: y proximity` on `:root`; the manifesto, each chapter, the grower, and the footer get `scroll-snap-align: start`. Proximity, never mandatory — a tall chapter must not trap. Snap is position behavior, not animation: it stays under reduced motion.
- **Reveals:** each chapter's text block fades and rises on entry via `animation-timeline: view()`, using the hardened house pattern: base state = final (fully visible) state; the animation owns the transition; scoped behind `@supports` + motion-ok; `animation-range` on entry (the minifier collapses `entry 0% entry 100%` to `entry` — grep for the shorthand). Reduced motion and non-supporting browsers get static, fully visible chapters for free.
- **Progress + index rail:** a fixed right rail on the home page only (its anchors live there), ≥768px, hidden below. A 1px `--line` track spans the viewport height; a teal fill scales (`transform: scaleY`, origin top) on a `scroll()` timeline. Beside the track, 一…五 as teal anchor links to `id="chapter-{slug}"` on each chapter (new anchors — only `#reviews` is sacred); each link carries its product name as the accessible name. The fill is position feedback like the scrollbar, so it stays under reduced motion; outside `@supports (animation-timeline: scroll())` the fill is hidden while track and numerals remain — the one deliberate exception to base-equals-final, because a permanently full bar would misreport the page. Active-chapter highlighting is skipped — `ponytail:` pure-CSS scroll-position state isn't worth the machinery; upgrade path: per-section view-timelines if the owner asks.

## 5. Components

- **Header:** cream, hairline bottom rule, logo (36px) + wordmark in the display face (600) + kanji wordmark 自然つなぎ, label size, `--teal`, `lang="ja"`. No nav links. (It stands in for the hero design's top nav; the design's Mixes/Recipes/Our-Soil links are dropped — those routes don't exist.)
- **Hero (v6, owner-directed 2026-07-18 — replaces the v5 manifesto + botanical plate).** A two-column room, `min-height: calc(100svh − 70px)` so it sits beside the header in the first viewport; it does **not** scroll-snap (that would hide the header on load). **Left column** (`1.1fr`, flex-column centred, `clamp(40px,6vw,72px)` padding): an IBM Plex Mono eyebrow (`--muted`) "One grain foundation · Five ways to begin"; the headline **"Goodness lives / in the detail."** in Cormorant, `clamp(2.75rem,6vw,3.75rem)`/500 `--teal`; a body line ("Every mix begins the same way — millets and whole grains…"); the italic `--muted` tagline "Nature's goodness, connected to you."; a CTA row — a solid `--teal` **"Explore Recipes"** button with a `→` that eases 4px right on hover (motion-gated) plus an underlined **"The five mixes"** link; and a five-mix row (hairline-topped) of `一…五` + short name, each a jump link to `#chapter-{slug}` (this and the CTA both read the first slug / the array from `data/products.ts`). **Right column** (`0.9fr`): the lead pack shot (the existing `chocolate-mix.jpg` via `next/image`, `object-position: center 40%`, `priority`) full-bleed, a `linear-gradient` cream fade off its left edge, and the vertical `自然つなぎ` (`writing-mode: vertical-rl`, `--paper`, text-shadow from `--teal`). **<768px:** single column — the photo becomes a ~44svh banner on top, copy below. **Entry:** the copy fades up on load (`hero-fade-up`, 0.9s), gated under `prefers-reduced-motion: no-preference`; base state is the finished hero, so reduced motion is static. Smooth in-page scroll for the mix jumps is added globally, motion-gated. The fixed index rail and the tategaki rail are retired (the mix row and the vertical label replace them). **Copy is placeholder** (`ponytail:`), from the owner's design — it supersedes the v5 "locked copy".
<!-- v5 manifesto (superseded by the v6 hero above; kept for history) — **Manifesto:** cream, full viewport, content vertically centered. **Composition (amended 2026-07-18, owner-directed):** a botanical plate shares the viewport with the copy — a two-column room at ≥1024px (plate `minmax(0, 44%)` left, copy `minmax(0, 56%)` right, `column-gap: clamp(2rem, 5vw, 4.5rem)`, both centered, `min-height: 100svh` preserved; the plate is height-capped to `100svh − 2·rhythm` so the section stays exactly one viewport and the tategaki + index rails do not move), 38%/62% at 768–1023px, and below 768px a single column with the plate above the 繋 accent (`height: 170px`, `width: auto`, left-aligned, `margin-bottom: 1.5rem`). **Illustration:** one inline `aria-hidden` SVG (`viewBox 0 0 400 640`, whole-SVG `opacity: 0.85`, no `<title>`) — "the five, drawn from one": two millet stalks (the shared multigrain base) with the five variant-signature motifs around them — cocoa pod (chapter 一 · chocolate), vanilla bean pods (二), berry sprig (三), whole + halved apple (四 · fruit — the data lead ingredient, not date; swap logged in memory.md), herb sprig + falling seeds (五 · savoury) — each tagged with its chapter numeral in an SVG-text legend (`lang="ja"` + the committed subset class; the subset font applies inside SVG `<text>`, verified 2026-07-18 — no HTML-span fallback needed; legend hidden <768px, illegible there), plus a seed scatter drifting toward the copy column. Register: hand-drawn, sumi-e-adjacent, wavering imperfect strokes, every motif carrying a slight rotation offset; no two elements mirrored. **All strokes are `currentColor` at `color: var(--ink)` — ink only:** the temptation to draw each motif in its product's deep hue is rejected because the color law (§2) allows one hue pair per view and this plate would need five; monochrome ink is truer to the reference board. 繋 and the CTA stay the only teal in the view. One kanji accent 繋 (in the subset) above the headline: 1.5rem, `--teal`, `lang="ja"`, `aria-hidden`. Headline at 2.25rem/400 `--ink`; body in the display face, line-height 1.7, max-width ≈55ch. Copy (`ponytail: placeholder copy`): headline **"Goodness lives in the detail."**; body: "The sheen of a grain. The scent of a pod just opened. Every mix we make begins on a farm and ends in your hands, carrying nothing it didn't grow with." / "Five recipes, drawn from soil and season. See them, one by one." **CTA (amended 2026-07-18, owner-directed — supersedes v5's "the scroll is the CTA" ruling; reverting = deleting this one anchor):** after the second paragraph, `margin-top: 2.5rem`, a `--teal` anchor — 1rem, `text-decoration: underline`, `text-underline-offset: 4px`, `text-decoration-thickness: 1px` — labelled **"Explore recipes"** followed by `→` (U+2192, `margin-left: 0.4em`); `href="#chapter-{first-slug}"` reads the first product slug from `data/products.ts`. On hover/focus-visible the arrow eases 4px right (150ms ease-out), gated by reduced motion, underline thickness unchanged (no layout shift); smooth in-page scroll is added globally, also motion-gated. **Entry animation (on load, once):** every drawn path uses `pathLength="1"` so one `stroke-dasharray: 1; stroke-dashoffset: 1 → 0` rule draws it with no measuring; ground → stalks → stalk heads/grains → motif-1…5 (staggered +0.12) → seed scatter (fade + drift) → legend, all settled ≈2.1s (hard ceiling 2.2s). House hardening: the base state is the fully-drawn, fully-visible plate; the animations only override it, all under `@media (prefers-reduced-motion: no-preference)` — reduced motion and non-supporting browsers get the finished plate, static, and the CTA arrow static. The tategaki rail (kept, JP glyphs only — 自然 and つなぎ, no Latin glosses): `writing-mode: vertical-rl`, label size, `--ink`, `lang="ja"`, absolute in the manifesto's right margin at `right: 72px` ≥768px — clear of the fixed rail — hidden below 768px. -->
- **Buttons:** the **Notify me** trigger (chapters + detail page) is outline — transparent ground, 1px `--teal` border, `--teal` text, radius 2px; hover/focus fills `--teal` with `--cream` text, 150ms. Form submits (the dialog's and the review form's) stay solid teal as built. Focus ring unchanged — 2px `--teal`, offset 2px. The label is always exactly **"Notify me"**.
- **Dialog:** unchanged — v4 styling, Phase 2 behavior, states, and copy.
- **Detail page:** one catalog composition on the product's wash — `min-height: 100svh` like a chapter, natural growth allowed — the chapter anatomy (§4, minus the ghost numeral and See details) with the name as the `h1`, plus two content-contract elements: the tagline at subhead size in `--ink` directly under the name, and a fourth spec row `Promise → ` the benefits joined with middle dots (`100% organic · farm-sourced · no preservatives`) — prd §5's benefits contract rendered in the catalog register. Then the outline Notify me. The review section follows on cream, untouched in function (§10). One hue pair per page, per the color law. `generateMetadata`, `generateStaticParams`, `notFound()` all stay.
- **The grower:** closes the home walk on cream, natural height. Heading **"The grower"** at the section style (2.25rem/400 `--teal`); 2–3 body lines about the farms and people behind the ingredients (`ponytail: placeholder copy` — structure now, client copy owed). No image: none exists, and no empty frame gets stubbed.
- **Footer:** unchanged — teal background, cream text: logo, brand line, contact `stsales@shizentsunagi.com`, © year. It takes `scroll-snap-align: start` so the walk can close on it.
- **Seal:** unchanged — `app/icon.svg`, teal rounded square (20% radius) bearing 繋 centered in cream, JP serif system stack.
- **Selection:** `::selection` is `--teal` background with `--cream` text.

## 6. Layout

Max content width 1080px, 24px side padding, and the single 768px breakpoint — all unchanged. Section rhythm **112px desktop / 64px mobile** stays as vertical padding; the manifesto and the chapters additionally center their content vertically inside `min-height: 100svh`. Chapters are full-bleed color; their content is constrained to the 1080px wrap. Radius scale: **0 for surfaces, 2px for controls**.

Ingredient lists render as one line joined by ・ (U+30FB): cocoa pod・almond・dates.

## 7. Voice (copy that ships with the design)

Plain verbs, sentence case, no exclamation marks, no wellness clichés ("elevate", "journey", "unlock"). Say what a thing is and what it does.

The per-product poetic copy (the `description` field) speaks **composition and process ONLY** — grains, farms, grinding, drying, the named ingredients from the pack OCR. No health, medical, or benefit claims (locked decision 2026-07-15). Every placeholder line is marked `ponytail: placeholder copy`. The chocolate entry is locked as drafted ("Stone-ground grains meet cocoa from farm-sourced pods. Almond and dates lend their sweetness — nothing else added, nothing taken away."); the other four match its register.

Japanese text appears ONLY where this document places it (header kanji, manifesto accent + tategaki rail, ghost numerals, kanji annotations, rail numerals, seal); every JP string carries `lang="ja"` and sits beside or behind its Latin meaning. Banned outright: sakura, torii, sun discs, brush faces, decorative katakana — and, as of v4: **no patterns beyond the 404's fans, no full-bleed patterned backgrounds, no per-product button colors.** Restraint is the Japanese principle; the color law is the whole point.

## 8. Quality Floor (built, not announced)

Responsive to 360px. Keyboard: dialog focus-trapped by native `<dialog>`, Esc closes, focus returns to trigger. The pack shot's alt describes the product photo, not the marketing; the texture crop's alt names the close view of the mix. Reduced motion renders every chapter static and fully visible (§4); snap and the rail fill, as position feedback, remain. No layout shift: image dimensions declared; blend, blur placeholders, and the crop's transform cause none. `text-wrap: balance` on headings.

**iOS mask/blend separation (regression tripwire, locked 2026-07-17):** `mask-image` and `mix-blend-mode` NEVER sit on the same element — WebKit renders that pairing blank. Mask/overflow lives on the frame; blend lives on the img. This binds the texture crop exactly as it binds the pack shot.

Contrast (computed 2026-07-16, re-verify only if a hex changes — and the hexes are pinned): every deep hue passes WCAG AA large (≥3:1) on its wash and on cream — kogecha 6.59/7.39, kin-iro (deepened) 3.34/3.59, azuki 4.25/4.78, kaki 3.25/3.64, koke 3.22/3.48 — and §2's law confines deep hues to display sizes ≥1.5rem, where AA large applies. Body `--ink` passes AA normal on every wash (11.45–11.97) and on cream (12.87); `--teal` links, outline buttons, and focus rings pass on every wash (6.23–6.52); teal/cream 7.01 both ways. The gold Coming soon label keeps its owner-accepted exception (2026-07-15). §2's pre-verified rulings govern the catalog line and kanji annotation.

## 9. 404

`app/not-found.tsx`: a literal row of drawn wave fans — the one place fans exist — with one fan mid-row visibly missing: the connection broken. `--teal` strokes on cream; no product hue owns this page. Line: "This page isn't connected.", a plain link home. Nothing animates here. Its heading now renders at the 2.25rem section scale (the 3.75rem slot no longer exists); nothing else changes.

## 10. Reviews (Phase 4, owner-added)

The review section closes each detail page on cream, after the washed catalog composition: a `--line` hairline opens a section carrying `id="reviews"` with `scroll-margin-top: 24px` — the anchor printed QR codes target (`/products/{slug}#reviews`, permanent). Its content sits in the standard `.wrap` like every sibling section (Layout §6): the opening hairline may span the full section, but the content may not — it is constrained to the 1080px max-width with the 24px side padding. The section heading ("Reviews") sits at 2.25rem/400 in the product's deep hue — the only place the hue enters this section; everything else is chassis.

- **Stars** are inline SVGs in `--gold` — the gold token's role extends to ratings (it stays barred from body text and interactive elements). A review shows five stars, filled count = its rating.
- **Average line:** "4.6 out of 5 · 12 reviews", body `--ink`.
- **Review items:** separated by `--line` hairline rules, no boxes — stars, then name and date in label style, comment in body.
- **Empty state:** "No reviews yet — be the first."
- **Form:** a `fieldset` with `legend` holding a radio group of five labelled star inputs (accessible names "1 star" … "5 stars"), each with the visible teal focus ring (§5); name and comment fields per the existing input style — radius 2px, labels per §3's label style; a solid teal submit ("Submit review"). Client-side required checks mirror the server's; the server remains the trust boundary (architecture.md §9).
- **Success state** (replaces the form): "Thank you — your review appears once approved." **Error line:** "Something went wrong. Try again." — the dialog's words, voice per §7.
