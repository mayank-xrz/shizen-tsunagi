# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words — natural materials, calm space, and one visible idea of *connection*. The layout structure may follow the ourlittlejoys.com reference (hero → product index → story → detail pages), but the visual identity is this document, not theirs. Copying their look is off the table.

## 1. Direction

Quiet, editorial, chic — a tea-house menu, not a shop. v3 is fewer, larger moves: editorial type, a ruled index, one signature drawing per product. v2 still read templated — boxed cards ×5 and many small gestures — so boxes are banned outright: no card surfaces, no borders around content; hairline rules (`--line`) and space do all separation. Generous negative space (*ma*) stays the ground rule — the page should breathe, never sell loudly. Color roles under v3 (token values pinned, §2): `--teal` is the display-type color, `--sage` retreats to line art only (§4), and `--gold` keeps its single job — the Coming soon label — small and rare, the way sunlight is used in the logo. If a choice feels like a generic wellness template, it's wrong.

## 2. Tokens (CSS custom properties — the only colors allowed)

```css
:root {
  --cream:  #FAF7F1;  /* page background — pinned by logo's warmth */
  --ink:    #22302B;  /* body text */
  --teal:   #2F5D50;  /* headings, primary buttons, links */
  --sage:   #8FA382;  /* card surfaces (tinted), secondary accents, thread motif */
  --gold:   #C9A24B;  /* Coming Soon badge, small highlights ONLY — never body text */
  --line:   #E4DED2;  /* hairline borders */
}
```

Contrast law: text is only ever `--ink` or `--teal` on `--cream`/white, or `--cream` on `--teal` (all pass WCAG AA). `--gold` and `--sage` are decorative — badges, lines, fills — never running text.

The block above is pinned by the client's logo and never changes; the role comments inside it are earlier-version notes kept verbatim with the pinned values — current roles are assigned by §1 and §§3–5.

## 3. Typography

- **Display:** *Zen Old Mincho* via `next/font` — a Japanese-designed mincho serif with proper Latin support. Weights **400 + 600**; 400 does the big sizes — the lightness is the elegance — and 600 exists only for small display moments that must hold weight (the header wordmark). Used for the hero line, section titles, product names.
- **Body:** system-ui stack (`system-ui, -apple-system, "Segoe UI", sans-serif`). Zero-cost, quiet, lets the display face be the personality.
- **Labels / eyebrows:** the system stack at 0.75rem, uppercase, `letter-spacing: 0.12em` — ingredient lines, the Coming soon label, form labels.
- Scale (rem): 3.5 hero / 2.25 section / 1.5 product-name / 1.0 body / 0.75 label. Hero and section titles: weight 400, `--teal`. Body line-height 1.7 — airy, unhurried.
- One characterful face used with restraint + one silent face. No third font.
- **Japanese glyphs:** a second Zen Old Mincho instance — `next/font/local` over a committed woff2 pre-subsetted by Google's `text=自然つなぎ繋` API at weight 400, because `next/font` itself has no `text` option (approach owner-approved 2026-07-16) — loads only the six glyphs the site uses; its className is applied to every `lang='ja'` span. Still one display family + one silent family. Shippori Mincho leaves the codebase entirely — fonts, subset file, and every reference.

## 4. Signature Element — Hitofude Drawings (一筆書き)

One memorable thing, spent deliberately: each product's hero ingredient drawn in a single unbroken line — *hitofude-gaki*, the one-stroke drawing. The name is the brand: one line that never lifts, start connected to end. Five drawings, one per product: cacao pod on its branch (chocolate) / vanilla orchid (vanilla) / berry sprig (berries) / fruiting leaf (fruit) / moringa stem (savoury).

Rules per drawing: exactly one `<path>` with a single `M` — no lifts; stroke 1.5 `--sage`; round caps and joins; `fill: none`; viewBox ≈ 200×200; a recognizable silhouette in 6–12 cubic curve segments (`C`/`S`). Placement: once on the product's detail page as quiet marginalia (§5), and the unfinished variant on the 404 (§9) — the home page spends its signature on the index itself. Every drawing passes the owner's contact-sheet approval before it ships; a rejected drawing gets exactly one redraw, and a second rejection falls back to the simplest single-stroke leaf form rather than shipping bad art.

**Motion budget (complete):** (1) a drawing draws itself in on first view via the existing scroll-driven `stroke-dashoffset` pattern behind `@supports`, and renders fully drawn when unsupported or under `prefers-reduced-motion: reduce`; (2) the index hover preview fades in 200ms; (3) buttons fill on hover, 150ms — instant under reduced motion. Nothing else moves. The fixed-aspect ≈200×200 viewport scales uniformly, so v2's anisotropic-stretch Chromium workaround does not apply — the draw may run at every width. The v2 thread, its gold nodes, the awaji knot, and the washi grain are removed — from this spec and from the code.

## 5. Components

- **Header:** unchanged — cream, hairline bottom rule, logo (36px) + wordmark in the display face (600, the one small-size weight) + kanji wordmark 自然つなぎ beside it, label size, `--teal`, `lang='ja'`. No nav links (there's nowhere else to go — home links from the logo).
- **Hero:** the pack tagline — **"Nature's goodness, connected to you."** — set at hero size (3.5rem, weight 400) in `--teal`, with one supporting sentence in body `--ink`. The vertical tategaki rail (`writing-mode: vertical-rl`) in the right margin at ≥768px — 自然 nature / つなぎ connection — label size, `--ink`, `lang='ja'`; hidden below 768px. No image, no CTA — the index is one scroll away.
- **Product index** (replaces the v2 cards): five rows separated by `--line` hairline rules — a menu, not a grid. Each row carries: the product name (1.5rem display serif, links to the detail page), the tagline in body, the ingredient line in label caps joined by ・, the gold **Coming soon** label (label style, `--gold`), and a **Notify me** control. At ≥768px a 4:5 preview panel (~40% of content width, §6) sits beside the list; the hovered or focused row's pack shot fades in there — pure CSS (the row's `:hover`/`:focus-within` drives the panel image's opacity), `mix-blend-mode: multiply` + blur-up placeholders as already built; with no row hovered or focused the panel is empty cream — space is allowed to do its job. Below 768px the panel goes; each row instead carries a small inline 4:5 thumbnail (≈88px wide).
- **Buttons:** 1px `--teal` outline, transparent fill, `--teal` text, radius 2px; hover and focus fill `--teal` with `--cream` text. The dialog's submit may stay solid teal (hover darkens 8%, as before). Visible focus ring unchanged: 2px `--teal`, offset 2px — gold fails the 3:1 non-text contrast requirement on cream, so focus indicators are always teal. Label is always exactly **"Notify me"** — same words on every row, page, and dialog title.
- **Dialog:** native `<dialog>`, restyled to v3 — white, radius 2px, max-width 400px, same backdrop (`rgb(34 48 43 / 0.5)`, derived via `color-mix` from `--ink`), form labels per §3's label style, input at radius 2px. Its behavior, states, and copy are Phase 2's and do not change.
- **Footer:** unchanged — teal background, cream text: logo, brand line, contact `stsales@shizentsunagi.com`, © year.
- **Detail page:** gold Coming soon eyebrow (label style) above the product name at 2.25rem `--teal`; the ingredient line (label caps, ・-joined) as the subheader directly beneath the name — it doubles as the ingredients display, so no separate Ingredients section remains; tagline and description in body; then **benefits as a ruled list** — each benefit on its own line, a `--line` rule between lines, no bullets; the product's hitofude drawing placed once as quiet marginalia — ≈140px wide, in the leftover space of the image column beneath the pack shot at ≥768px, after the benefits list below 768px; an outline **Notify me** button. The pack shot stays per prd.md §5 — image beside content at ≥768px, stacked below — but loses its box: no border, radius 0, cream ground with multiply and blur as built. The v2 thread divider goes; a plain hairline separates sections.
- **Seal:** favicon and fallback brand mark is a hanko: `app/icon.svg`, teal rounded square (20% radius) bearing 繋 centered in cream, JP serif system stack (Hiragino Mincho ProN, Yu Mincho, serif). A logo shrunk to 32px never reads; a seal does.
- **Selection:** `::selection` is `--teal` background with `--cream` text.

## 6. Layout

Max content width 1080px, 24px side padding on mobile, and the single 768px breakpoint — all unchanged. Section vertical rhythm: **128px desktop / 72px mobile** — the spacing *is* the aesthetic, so it gets precision, not decoration. Radius scale: **0 for surfaces, 2px for controls** — nothing on this site is a rounded box. Product index at ≥768px: rows column beside the preview panel, panel ~40% of content width; below 768px a single column of rows with inline thumbnails. Product page: image beside content at ≥768px, stacked below.

Ingredient lists render as one line joined by ・ (U+30FB): cocoa pod・almond・dates.

## 7. Voice (copy that ships with the design)

Plain verbs, sentence case, no exclamation marks, no wellness clichés ("elevate", "journey", "unlock"). Say what a thing is and what it does. The visitor manages one thing here — getting notified — so every word serves that: buttons say what happens ("Notify me"), the success message says what they got ("You're on the list"). Placeholder copy written before the client's copy arrives follows this voice and is marked per phased.md.

Japanese text appears ONLY where this document places it (header kanji, hero rail, seal); every JP string carries `lang='ja'` and sits beside its Latin meaning. Banned outright: sakura, torii, sun discs, brush faces, decorative katakana, pattern wallpaper — restraint is the Japanese principle.

## 8. Quality Floor (built, not announced)

Responsive to 360px. Keyboard: dialog focus-trapped by native `<dialog>`, Esc closes, focus returns to trigger. The index preview is focus-accessible: keyboard focus on a row's link shows the same preview as hover (`:focus-within`), and reduced motion swaps its 200ms fade for an instant change. Alt text describes the product photo, not the marketing. Reduced motion renders every hitofude fully drawn (§4). No layout shift: image dimensions declared; blend and blur placeholders cause none. Carried over from v2 unchanged: `mix-blend-mode: multiply` on pack shots, blur placeholders, `::selection` (§5), the `lang='ja'` discipline and ban list (§7), the seal favicon. `text-wrap: balance` on headings.

## 9. 404

`app/not-found.tsx`: a hitofude line that stops mid-stroke — visibly unfinished, the one drawing on the site that never completes; its subject is fixed at the contact-sheet gate (§4). Line: "This page isn't connected.", a plain link home. Voice per §7.
