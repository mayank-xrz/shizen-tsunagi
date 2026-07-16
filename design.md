# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words — natural materials, calm space, and one visible idea of *connection*. The layout structure may follow the ourlittlejoys.com reference (hero → product grid → story → detail pages), but the visual identity is this document, not theirs. Copying their look is off the table.

## 1. Direction

Quiet, organic, premium. Generous negative space (*ma*) — the page should breathe, never sell loudly. Warm paper background, botanical greens from the logo, gold used the way sunlight is used in the logo: small and rare. If a choice feels like a generic wellness template, it's wrong; every decision below is derived from the logo and the name.

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

## 3. Typography

- **Display:** *Shippori Mincho* via `next/font` — a Japanese-designed mincho serif with proper Latin support. It carries the brand's origin in its letterforms instead of a logo lecture. Weights 500/700. Used for the hero line, section titles, product names.
- **Body:** system-ui stack (`system-ui, -apple-system, "Segoe UI", sans-serif`). Zero-cost, quiet, lets the display face be the personality.
- Scale (rem): 3.0 hero / 2.0 section / 1.375 product-name / 1.0 body / 0.8125 caption. Body line-height 1.7 — airy, unhurried.
- One characterful face used with restraint + one silent face. No third font.
- **Japanese glyphs:** a second `next/font` instance of Shippori Mincho with `text: '自然つなぎ繋'` loads only the six glyphs the site uses; its className is applied to every `lang='ja'` span. Still one display family + one silent family — no third font.

## 4. Signature Element — the Tsunagi Thread

One memorable thing, spent deliberately: a thin continuous SVG line (1.5px, `--sage`) drawn from the logo's ribbon curve, flowing down the home page and *connecting* the sections — it leaves the hero, curves behind the product grid, and resolves into the brand-story section. *Tsunagi means connect; the page literally does it.* On product pages it appears once, small, as the divider between description and benefits.

Implementation: the inline SVG per page carries the thread path, small static gold nodes (r≈3, `--gold`) where the thread joins each section, and a terminal group where it resolves into a simplified mizuhiki awaji knot at the brand-story section — the joins are gold, kintsugi logic. Absolutely positioned, `pointer-events: none`, drawn-in on scroll via `stroke-dashoffset` transition. Animation unchanged: only the line draws in; nodes and knot are static; under `prefers-reduced-motion: reduce` everything renders fully drawn. The product-page divider gains one gold end-dot. This is the only animation on the site — no fades, no parallax, no hover theatrics beyond the button states below.

## 5. Components

- **Header:** cream, hairline bottom border, logo (36px) + wordmark in Shippori Mincho, no nav links (there's nowhere else to go — home links from the logo). Kanji wordmark 自然つなぎ beside the Latin wordmark, caption size, `--teal`, `lang='ja'`.
- **Hero:** left-aligned display headline + one supporting sentence + the thread beginning its path. No CTA button in the hero — the products are the CTA, one scroll away. A vertical tategaki rail (`writing-mode: vertical-rl`) in the right margin at ≥768px — 自然 nature / つなぎ connection — caption size, `--ink`, `lang='ja'`; hidden below 768px (reuses the one existing breakpoint).
- **Product card:** white surface on cream, 12px radius, hairline border; image top (4:5 frame, `next/image`, `object-fit: cover` — source JPEGs crop to fit), name, tagline, gold **Coming Soon** badge (gold border + gold text at caption size, cream fill), full-width **Notify me** button. Image frame fills `--cream`; the pack shot blends in via `mix-blend-mode: multiply` so its light ground fuses with the page (`ponytail:` assumes light studio grounds — revisit if client reshoots on color). Images load via static import with `placeholder='blur'` — no pop-in.
- **Buttons:** `--teal` fill, `--cream` text, 8px radius, no shadow; hover darkens 8%; visible focus ring (2px `--teal`, offset 2px — gold fails the 3:1 non-text contrast requirement on cream, so focus indicators are always teal). Label is always exactly **"Notify me"** — same words on every card, page, and dialog title, so the action keeps one name through the whole flow.
- **Dialog:** native `<dialog>`, white, 16px radius, max-width 400px, backdrop `rgb(34 48 43 / 0.5)`. Contents: product name (display face), labelled email input (hairline border, teal focus ring), Notify me button, close button (inline SVG ×). Success state replaces the form: "You're on the list — we'll email you at launch." Error state keeps the form: "Something went wrong. Try again." Errors state facts; they don't apologize.
- **Footer:** teal background, cream text: logo, brand line, contact `stsales@shizentsunagi.com`, © year.
- **Seal:** favicon and fallback brand mark is a hanko: `app/icon.svg`, teal rounded square (20% radius) bearing 繋 centered in cream, JP serif system stack (Hiragino Mincho ProN, Yu Mincho, serif). Supersedes the logo-derived `app/icon.png` — a logo shrunk to 32px never reads; a seal does.
- **Selection:** `::selection` is `--teal` background with `--cream` text.

## 6. Layout

Max content width 1080px, 24px side padding on mobile. Home cards: flexbox, not grid — `flex-wrap: wrap; justify-content: center`, each card `flex: 1 1 240px; max-width: 340px`. Five is an odd count: any wrap produces a short row (4+1, 3+2, 2+2+1), and grid leaves that orphan hanging left while flex centers it, so the layout reads deliberate at every width. No media-query ladder. Product page: image left / content right at ≥768px, stacked below. Section vertical rhythm: 96px desktop / 64px mobile — the spacing *is* the aesthetic, so it gets precision, not decoration.

Ingredient lists render as one line joined by ・ (U+30FB): cocoa pod・almond・dates.

**Washi grain:** `body::before` is a fixed, `pointer-events-none` overlay carrying an inline-SVG `feTurbulence` noise (data-URI background) at ≤3% opacity — the cream reads as paper, not `#FAF7F1`.

## 7. Voice (copy that ships with the design)

Plain verbs, sentence case, no exclamation marks, no wellness clichés ("elevate", "journey", "unlock"). Say what a thing is and what it does. The visitor manages one thing here — getting notified — so every word serves that: buttons say what happens ("Notify me"), the success message says what they got ("You're on the list"). Placeholder copy written before the client's copy arrives follows this voice and is marked per phased.md.

Japanese text appears ONLY where this document places it (header kanji, hero rail, seal); every JP string carries `lang='ja'` and sits beside its Latin meaning. Banned outright: sakura, torii, sun discs, brush faces, decorative katakana, pattern wallpaper — restraint is the Japanese principle.

## 8. Quality Floor (built, not announced)

Responsive to 360px. Keyboard: dialog focus-trapped by native `<dialog>`, Esc closes, focus returns to trigger. Alt text describes the product photo, not the marketing. Reduced motion respected (§4). No layout shift: image dimensions declared. Blend, blur placeholders, and grain cause zero layout shift; grain never exceeds 3%; `text-wrap: balance` on headings.

## 9. 404

`app/not-found.tsx`: the thread drawn but ending visibly unconnected, line "This page isn't connected.", a plain link home. Voice per §7.
