# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words — natural materials, layered paper, and one visible idea of *connection*. The layout structure may follow the ourlittlejoys.com reference (hero → products → story → detail pages), but the visual identity is this document, not theirs. Copying their look is off the table.

## 1. Direction

v4: **dentōshoku washi panels** — layered, colorful within one law, unmistakably Japanese, built to sell. Each product owns a traditional Japanese color (伝統色, *dentōshoku*), and the home page moves through five color rooms, one per product. Complexity lives in layering — wash grounds, overlapping imagery, ghost numerals, one pattern (§4); discipline lives in the color law (§2). v4 supersedes v3: the hitofude drawings, the ruled index, and the hover preview panel are removed — from this spec and from the code. Kept from earlier versions: the kanji identity, the seal, teal selection, interpunct ingredient lines, the multiply/blur image treatment, the tategaki rail, and the 404 concept (re-skinned, §9). `--sage` has no role this version — the token stays, pinned by the logo, but nothing uses it. If a choice feels like a generic wellness template, it's wrong.

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

The block above is pinned by the client's logo and never changes; the role comments inside it are earlier-version notes kept verbatim with the pinned values — current roles are assigned by this document. v4 appends the product hue table — five dentōshoku pairs, deep hue + wash ground, the only other colors in the codebase:

```css
/* v4 product hues — one pair per product (deep + wash) */
--kogecha:      #6B4A36;  /* 焦茶 kogecha, burnt-tea brown — chocolate */
--kogecha-wash: #F2E9E1;
--kin-iro:      color-mix(in srgb, var(--gold), var(--ink) 30%);
                /* 金色 kin-iro, antique gold — vanilla. var(--gold) itself
                   measures 2.09:1 on its wash; this deepening (≈ #978041)
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

- **Exactly one hue pair per view:** every composition — a panel, the detail hero band, a divider — draws from a single product's pair plus the chassis; two products' hues never appear inside the same composition. Adjacent panels meet at a hard seam; only the overlapping pack shot crosses it (§4).
- **Deep hues** appear only in display text ≥1.5rem, ghost numerals, and pattern strokes — never body text, never interactive elements.
- **Washes are grounds only** — never text, never strokes, never fills inside content.
- **Body text is always `--ink`. Buttons and links are always `--teal`.**
- **The chassis — cream, ink, teal, gold, line — is unchanged.**

Enforcement is structural: each panel or band sets `--hue`/`--hue-wash` once from `data/products.ts` (a `style` custom-property assignment keyed by product); component CSS only ever reads `var(--hue)`/`var(--hue-wash)`. No component names a product color directly.

## 3. Typography

- **Display:** *Zen Old Mincho* via `next/font`, weights **400 + 600 + 700**. 700 enters at v4 for the hero headline and the product names; 600 remains the header wordmark's small-size weight; 400 does everything else in display. Used for the hero line, section titles, product names.
- **Body:** system-ui stack (`system-ui, -apple-system, "Segoe UI", sans-serif`) — zero-cost, quiet, lets the display face be the personality.
- **Labels / eyebrows:** the system stack at 0.75rem, uppercase, `letter-spacing: 0.12em` — ingredient lines, the Coming soon label, form labels, the provenance caption.
- Scale (rem): **3.75 hero / 2.25 panel-and-section / 1.5 subhead / 1.0 body / 0.75 label.** Product names (home panels and the detail hero band) sit at 2.25, weight 700, in the product's deep hue; section titles at 2.25, weight 400, `--teal`; the subhead slot serves the dialog title (`--teal`) and the detail band's tagline (`--ink`). Body line-height 1.7.
- **Japanese glyphs:** the committed pre-subsetted woff2 (`next/font/local`, weight 400, fetched once from Google's `text=` API because `next/font` has no `text` option — mechanism owner-approved 2026-07-16) extends to exactly the glyphs the site renders: **自然つなぎ繋一二三四五焦茶小豆柿苔金色** — the six identity glyphs, the five ghost numerals, and the eight hue-name glyphs. Its className is applied to every `lang='ja'` span. Still one display family + one silent family; no third font.

## 4. Signature — Washi Panels

The home page presents each product as a full-width panel washed in its hue — five rooms the visitor walks through. Each panel layers, back to front:

1. **the wash ground** (`--hue-wash`), full-bleed;
2. **the ghost numeral:** the product's number 一…五 (chocolate 一, vanilla 二, berries 三, fruit 四, savoury 五) set oversized in the JP face behind the content — the deep hue at 8% opacity, `aria-hidden`, sized ≈ `min(20rem, 40vw)` and cropped by its panel so it can never overflow;
3. **the seigaiha edge strip** (below), along the panel's top edge;
4. **the pack shot** — `mix-blend-mode: multiply` + blur-up placeholder, as built — overlapping the panel's top edge by ≈64px desktop / 32px mobile so it bridges the seam from the room before; the image side alternates per panel, starting right (the chocolate shot hangs in from the hero, §5);
5. **the content:** name at 2.25rem/700 in the deep hue; tagline in body `--ink`; the ingredient interpunct line in label `--ink`; the gold **Coming soon** label; a solid teal **Notify me**; and a teal **See details** text link (body size) to the product page — the name itself never links, because deep hues are barred from interactive elements (§2).

**The one pattern:** seigaiha 青海波, the overlapping wave fans, as an inline-SVG repeating band — three concentric arcs per fan, stroke ≈1.5, `fill: none`, stroke opacity 0.25, drawn in the composition's hue. It appears as a thin strip (~24px tall) on each panel's top edge, once in the hero in `--teal` (§5), and once per detail page as a divider (§5) — never a full background, never anywhere else, and no second pattern exists anywhere on the site. The `<pattern>` is written once as JSX and instantiated per placement with a unique id — SVG resolves `currentColor` where a pattern is *defined*, so a single shared definition could never take a different hue per placement; strokes are `currentColor` and each placement's CSS `color` sets the hue.

**Motion budget (complete):** (1) panel content fades in and rises ~12px on first view via the existing scroll-driven pattern (`animation-timeline: view()`, entry range) behind `@supports`; (2) buttons fill on hover, 150ms. Nothing else moves. `prefers-reduced-motion: reduce` renders everything static and instant; non-supporting browsers get the final state.

## 5. Components

- **Header:** unchanged — cream, hairline bottom rule, logo (36px) + wordmark in the display face (600) + kanji wordmark 自然つなぎ beside it, label size, `--teal`, `lang='ja'`. No nav links.
- **Hero:** layered so it reads as one composition, not clutter — the headline **"Nature's goodness, connected to you."** at 3.75rem/700 `--teal`; one supporting sentence in body `--ink`; the vertical tategaki rail (`writing-mode: vertical-rl`) in the right margin at ≥768px — 自然 nature / つなぎ connection — label size, `--ink`, `lang='ja'`, hidden below 768px; one seigaiha strip in `--teal` beneath the headline block; and the chocolate pack shot overlapping the hero's lower edge into the first panel — the crossing shot ties the hero to the first room.
- **Buttons:** solid `--teal` fill, `--cream` text, radius 2px; hover darkens 8% via the existing `color-mix`; visible focus ring unchanged — 2px `--teal`, offset 2px (gold fails 3:1 non-text contrast on cream, so focus indicators are always teal). Label is always exactly **"Notify me"**. v3's outline button style leaves the codebase.
- **Dialog:** native `<dialog>`, v4 styling — white, radius 2px, max-width 400px, backdrop `rgb(34 48 43 / 0.5)` derived via `color-mix` from `--ink`, form labels per §3's label style, input at radius 2px, solid teal submit. Its behavior, states, and copy are Phase 2's and do not change.
- **Detail page:** a hero band washed in the product's hue (`--hue-wash`), carrying the gold Coming soon eyebrow, the name at 2.25rem/700 in the deep hue, the tagline at subhead size in `--ink`, and a color-provenance caption in label `--ink` naming the hue — 焦茶 kogecha — burnt-tea brown · 金色 kin-iro — antique gold · 小豆 azuki — red-bean rose · 柿 kaki — persimmon · 苔 koke — moss green — kanji in `lang='ja'`. The pack shot (multiply + blur-up; it stays per prd §5) sits on the band's right at ≥768px, overlapping the band's lower edge into the cream below; below 768px the band stacks text-over-image. Then, on cream: the description in body, **benefits as the ruled list** — each on its own line, a `--line` rule between, no bullets — the ingredient interpunct line in label `--ink`, one thin seigaiha divider in the deep hue, and a solid **Notify me**.
- **Footer:** unchanged — teal background, cream text: logo, brand line, contact `stsales@shizentsunagi.com`, © year.
- **Seal:** unchanged — favicon and fallback brand mark is a hanko: `app/icon.svg`, teal rounded square (20% radius) bearing 繋 centered in cream, JP serif system stack.
- **Selection:** `::selection` is `--teal` background with `--cream` text.

## 6. Layout

Max content width 1080px, 24px side padding on mobile, and the single 768px breakpoint — all unchanged. Section vertical rhythm: **112px desktop / 64px mobile**. Panels and the detail band are full-bleed color; their content is constrained to the 1080px wrap. Radius scale: **0 for surfaces, 2px for controls** — nothing on this site is a rounded box. Below 768px, panels stack image-over-text; ghost numerals shrink with the panel and never overflow it.

Ingredient lists render as one line joined by ・ (U+30FB): cocoa pod・almond・dates.

## 7. Voice (copy that ships with the design)

Plain verbs, sentence case, no exclamation marks, no wellness clichés ("elevate", "journey", "unlock"). Say what a thing is and what it does. The visitor manages one thing here — getting notified — so every word serves that. Placeholder copy written before the client's copy arrives follows this voice and is marked per phased.md.

Japanese text appears ONLY where this document places it (header kanji, hero rail, ghost numerals, provenance captions, seal); every JP string carries `lang='ja'` and sits beside or behind its Latin meaning. Banned outright: sakura, torii, sun discs, brush faces, decorative katakana — and, as of v4: **no second pattern, no full-bleed patterned backgrounds, no per-product button colors.** Restraint is the Japanese principle; the color law is the whole point.

## 8. Quality Floor (built, not announced)

Responsive to 360px. Keyboard: dialog focus-trapped by native `<dialog>`, Esc closes, focus returns to trigger. Alt text describes the product photo, not the marketing. Reduced motion renders every panel static (§4). No layout shift: image dimensions declared; blend and blur placeholders cause none. Carried over unchanged: `mix-blend-mode: multiply` on pack shots, blur placeholders, `::selection` (§5), the `lang='ja'` discipline and ban list (§7), the seal favicon. `text-wrap: balance` on headings.

Contrast (computed 2026-07-16): every deep hue passes WCAG AA large (≥3:1) on its wash and on cream — kogecha 6.59/7.39, kin-iro (deepened) 3.34/3.59, azuki 4.25/4.78, kaki 3.25/3.64, koke 3.22/3.48 — and §2's law confines deep hues to display sizes ≥1.5rem, where AA large applies. Body `--ink` passes AA normal on every wash (11.45–11.97) and on cream (12.87); `--teal` links and focus rings pass on every wash (6.23–6.52); teal/cream 7.01 both ways. The gold Coming soon label keeps its owner-accepted exception (2026-07-15).

## 9. 404

`app/not-found.tsx`: a seigaiha band — the one place the pattern is drawn as a literal row of fans rather than the repeating fill — with one fan mid-row visibly missing: the connection broken. `--teal` strokes on cream; no product hue owns this page. Line: "This page isn't connected.", a plain link home. Voice per §7. Nothing animates here.
