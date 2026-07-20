# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words. v5 read them as a hushed museum catalog. **v6 · Ennichi reads them as the festival night market** — because a matsuri is where connection actually happens. Copying anyone's look is off the table; the reference boards below give structure and energy, never assets.

## 1. Direction

### v6 · Ennichi (縁日) — the maximalist inversion (2026-07-19)

**v6 · Ennichi supersedes v5 (the kinu catalog scroll).** v5 was the museum catalog — one hue per room, patterns banned, ghost numerals whispering at 8%, everything level and gridded. v6 is the **matsuri in the street outside**: stall signage, layered lanterns, price-tag bursts, stamps on everything, pattern on pattern, all five colors at once — held together by system, not spilled by accident. This is still *tsunagi*.

Reference board (structure + energy only): Japanese supermarket **chirashi** flyers (every square centimetre working), **Tadanori Yokoo** posters (color collision under total control), the **Edo pattern vocabulary** (seigaiha, asanoha, kikkō, shippō, yagasuri, ichimatsu), **hanko** stamp culture.

**Version-collision note (binding for future readers).** Two "v6" explorations exist in this repo's history. (a) A 2026-07-18 owner-directed **hero-reskin** (Cormorant Garamond, a warm-green chassis `#EFE9DC`/`#2E3B2C`, a photo hero) — a *minimalist* take. (b) **This** Ennichi maximalist take, the one the current brief commissions as the deliberate inversion of v5, to demo **side-by-side** with the v5 catalog scroll (v5 is the client-approved direction). Ennichi builds on **v5's chassis + type foundation**, not the hero-reskin's: the brief's own contrast baseline is the v5 chassis (cream `#FAF7F1`, teal `#2F5D50`, ink `#22302B` → ink/cream 12.87, teal/cream 7.01, kogecha/cream 7.39), and the brief keeps Zen Old Mincho as the brand voice. So this session **restores the v5 chassis tokens and Zen Old Mincho**, then layers Ennichi over them. Where this file and the hero-reskin disagree, **Ennichi is current**; the hero-reskin prose is retained only as history at the bottom of relevant sections.

**Removed** (from this spec and the code):

- The hero-reskin chassis and type — the warm-green `--teal #2E3B2C`, warm-cream `#EFE9DC`, `--muted`/`--hover`/`--paper` tokens, Cormorant Garamond + IBM Plex Mono as the display/body/label faces, and the two-column photo **hero** with its edge-fade and mix-row. All replaced.
- v5's minimalist laws, each replaced by its inversion (§2 color law, §3 type, §4 stalls, §7 patterns): "one hue pair per view", "washes are grounds only", "deep hues never interactive", "no patterns beyond the 404's fans", "ghost numerals at 8%", "one hanko seal", "one quiet display face", the one-row interpunct ingredient line, the "printed on the page" restraint on imagery, and the straight/aligned/gridded rule.

**Kept** (byte-for-byte in spirit — the discipline floor, §8; violating any is a failed task):

- The **v5 chassis tokens + five dentōshoku hue pairs** (§2), restored verbatim from v5 and now used as *working* colors.
- **Zen Old Mincho** as the brand voice (§3) + the committed **19-glyph JP subset** (`zen-old-mincho-ja.woff2`, no re-fetch — grep-verified).
- The **kanji identity** (wordmark 自然つなぎ, the 繋 mark), `lang="ja"` discipline, the **cliché ban** (sakura, torii, sun discs, brush faces, decorative katakana — density comes from pattern/type/color/seals, never mascot-Japan).
- **Accessibility floor**, **motion-hardening pattern**, **iOS mask/blend tripwire** (§8).
- **Copy law:** composition and process only — zero health/medical/benefit claims (locked 2026-07-15). Louder voice comes from *typography*, not claims.
- **Function untouched in behavior:** all API routes, NotifyDialog states, the ReviewSection contract (`#reviews` anchor is sacred), `generateMetadata`/`generateStaticParams`/`notFound()`, both check scripts, the server trust boundary. Restyled freely.

**Added:**

- The **inverted color law** (§2): all five pairs per view, each chapter's own hue ~60% dominant with the other four as guests; washes/strokes/tag-stock are working colors; deep hues anywhere the computed ratio allows.
- An **inline-SVG pattern library** (§7) — seigaiha, asanoha, kikkō, shippō, yagasuri, ichimatsu — `currentColor`-driven, min two pattern layers per chapter.
- **Full-opacity foreground numerals** 一…五 as compositional anchors (§4); a **seal system** (hanko stamp badges) and a **chirashi burst** price-tag (§5); a **looping CSS marquee** ingredient ribbon (§4/§12); **echo-printed** pack shots with thick patterned borders (§4); a **loud gothic** display face (Zen Kaku Gothic New) + a **price-tag** face (DotGothic16) (§3); one new committed gothic JP subset (§11); the **festival-gate** manifesto and **lantern-row** footer (§5); a fuller **motion program** (§12).
- **`--sage` finally gets a job:** the default pattern ink on cream grounds (§2).

<!-- HISTORY (superseded). v6 hero-reskin (2026-07-18, owner-directed): Cormorant/IBM Plex Mono, warm-green chassis, two-column photo hero replacing the manifesto; the five chapters kept their catalog anatomy. v5 (kinu catalog scroll, 2026-07-17): one product/one room/one scroll, quiet manifesto → five washed chapters → grower → footer, boldness spent only on pacing. Both retained in git; Ennichi supersedes both for the demo branch. -->

## 2. Tokens & the inverted color law

```css
/* v6 · Ennichi chassis — RESTORED from v5 (client logo palette). These are the
   only colors allowed; Ennichi uses them as WORKING colors, not just grounds. */
:root {
  --cream: #FAF7F1;  /* page ground + the light "plate/sticker" behind text on pattern */
  --ink:   #22302B;  /* body text; darkest pattern ink; text on gold/hue plates */
  --teal:  #2F5D50;  /* display type, links, buttons, marquee-ribbon ground, footer */
  --sage:  #8FA382;  /* v6 JOB: the default pattern ink on cream grounds (was: no role) */
  --gold:  #C9A24B;  /* festival metal — borders, seals, star bursts, pattern ink; NEVER body text */
  --line:  #E4DED2;  /* hairline rules */

  /* five dentōshoku pairs — deep hue + wash, unchanged from v4/v5 */
  --kogecha: #6B4A36; --kogecha-wash: #F2E9E1;  /* 焦茶 chocolate */
  --kin-iro: color-mix(in srgb, var(--gold), var(--ink) 30%);  /* ≈#978041 金色 vanilla */
  --kin-iro-wash: #F6EFD9;
  --azuki:   #9D5B63; --azuki-wash:   #F4E7EA;  /* 小豆 berries */
  --kaki:    #C4683F; --kaki-wash:    #F7E8DE;  /* 柿 fruit */
  --koke:    #7E8A4F; --koke-wash:    #EDF0DF;  /* 苔 savoury */

  --rhythm: clamp(64px, 10vw, 112px);
}
```

**Inverted color law (binding):**

1. **All five pairs may appear in every view** — but density needs legibility, so **each chapter keeps its own hue ~60% dominant** (the wash ground, the name, the big numeral, the main border) while the **other four enter as guests** (secondary pattern inks, guest tag-stock, seal fills, accent rules). The five chapters must still be tellable apart in a 5-second scroll (anti-slop tripwire). *Enforcement, structural:* each chapter/detail composition sets `--hue`/`--hue-wash` once (dominant, from `data/products.ts`) **plus** `--guest-1…4` (the other four hues, cyclically rotated by array index in `Chapter.tsx` — no new data field). Components read `var(--hue)` for the dominant and `var(--guest-n)` for guests; no component names a product color literally. The chassis (cream/ink/teal/sage/gold/line) is available in every view.
2. **Washes are working colors** — fills, strokes, tag stock, pattern inks — not only grounds.
3. **Deep hues appear anywhere the computed ratio allows** (§8 appendix), including body text and buttons — *per-pairing*. Result of the math: on cream, **only kogecha (7.39) and azuki (4.78) may set body/interactive text** (< 1.5rem); kin-iro/kaki/koke stay ≥ 1.5rem display or fall back to ink. Focus rings stay teal and unmissable everywhere.
4. **`--sage` = the default pattern ink** on cream grounds (the festival gate, the grower, neutral ground layers) — its first real role since v1. Decorative (2.54 on cream); never text.
5. **Gold is the festival metal** — borders, seals, star bursts, pattern ink. Kept from v5, on pure math: **gold never sets body text** (gold/cream 2.24, gold/washes ≈2.0 — it cannot pass). Text on a solid gold plate is ink (5.74).
6. **Body text is `--ink`** unless a computed pairing (rule 3) licenses a hue. **Text never sits on raw pattern** — it gets a solid plate/scrim (cream, wash, or a deep-hue block) unless the ratio against the pattern's *darkest* ink already passes (§8).

## 3. Typography — type as spectacle

Three families, the ceiling (four is mud):

- **Zen Old Mincho** — the brand voice, the "calm stallkeeper." Body text and the poetic `description` copy, the header wordmark, mincho kanji. `next/font/google` weights 400/500/700 (latin) + the committed JP subset (`next/font/local`, weight 400) for mincho kanji. Carries `--font-display`.
- **Zen Kaku Gothic New** — the shouting. Chapter/stall display names, the festival-gate headline, stall signage, burst text, seal glyphs. `next/font/google` weights 700/900 (latin) + a **new committed JP subset** (`next/font/local`, weight 900) for fat gothic kanji (§11). Carries `--font-gothic`.
- **DotGothic16** — pixel/price-tag energy for spec labels, the catalog line, unit values ("200 g"), the marquee. `next/font/google` weight 400 (latin only — no JP rendered in it). Carries `--font-tag`.

Scale, blown out: chapter names at `clamp(2.5rem, 11vw, 9rem)`, overlapping the imagery and the numeral; the festival-gate headline at `clamp(2.75rem, 9vw, 7rem)`. Full-opacity numerals up to `min(56vw, 30rem)`. **Stroked/outline display allowed** (`-webkit-text-stroke` over a solid-color fallback so non-supporting browsers still read). **Mixed weights inside one display line allowed.** Labels stay **information-first**: a tag labels, a burst announces — nothing decorative pretends to be a control. **Body copy stays level** (rule §6): tilt the furniture, never the reading.

## 4. Signature — the market stalls

**Home structure:** `header → festival gate → stall ×5 (data order) → grower → footer`. The festival gate and every stall get `min-height: 100svh` (natural growth allowed). Adjacent stalls meet at a hard wash seam; the dominant wash changes per stall so the five stay tellable apart.

**Festival gate** (the manifesto, §5): a layered pattern ground (sage-ink asanoha on cream), the **polychrome plate** (the v5.1 "five, drawn from one" botanical illustration, now drawing each motif in its product's deep hue), the headline set gothic + mincho mixed, several **tategaki strips** (自然 / つなぎ / 繋 — each `lang="ja"` beside its Latin meaning), festival **seals** (縁日 with its gloss, the 繋 mark), and the **stall-sign arrow** CTA.

**Stall anatomy** (each chapter, in z-order named):

1. **Pattern ground** (z0) — a full-bleed pattern layer on the dominant `--hue-wash`, inked in a guest hue at low strength; parallax on a `scroll()` timeline (§12).
2. **Full-opacity numeral** (z1) — 一…五 in fat gothic, the dominant hue, `min(56vw, 30rem)`, top/side anchor that content overlaps and wraps around; `aria-hidden`; drifts/rotates slowly on `view()` (§12). Cropped by its own overflow layer so it never forces horizontal scroll (the v5 ghost-numeral technique). Dominant-hue-on-own-wash passes AA-large (§8).
3. **Echo-printed pack shot** (z2) — the pack shot with **1–2 offset, hue-tinted duplicates** behind it (Yokoo echo), inside a **thick patterned border** (a second pattern layer, guest-inked). Blend on the img, mask/crop on the frame — **never both** (§8 iOS tripwire). Cranked `filter` contrast/saturation allowed; hard edges allowed; the texture crop may tile.
4. **Catalog line** — `No. 001 · kogecha` in DotGothic16, ink or teal (§8), the number from the array index.
5. **Kanji annotation** — the hue's kanji (焦茶…) `lang="ja"`, ~1rem, ink, above the name (furigana gesture, inverted).
6. **Product name** — the dominant hue, gothic, `clamp(2.5rem, 11vw, 9rem)`.
7. **Coming-soon burst** — a chirashi **star/burst price-tag** (SVG polygon) in the dominant hue with cream burst text ≥1.17rem bold (AA-large, §8), gold ring; rotated 2–6°, "stamps in" on entry (§12). Replaces v5's quiet gold eyebrow.
8. **Marquee ingredients** — the interpunct line becomes a **looping CSS marquee ribbon** on a **teal** ground with cream text (7.01, §8), deep-hue rules top/bottom. Reduced motion → the static single interpunct line.
9. **Poetic copy** — the `description`, body size, ink, mincho, on a cream/wash plate.
10. **Dense spec table** — hairline-gridded (`--line`) label/value rows (chirashi rules-in-rules): `Net quantity → 200 g`, `Base → …`, `Key → …`. Labels DotGothic16 (ink/teal); values ink.
11. **Seals** — hanko stamp badges (rotated 2–6°, imperfect): the chapter numeral seal, the 繋 mark. Stamp in on entry.
12. **Actions** — outline **Notify me** (teal) + a teal **See details** link. The name is never a link (deep hues barred from interactive elements unless the pairing passes — and even then names stay display).

**Scroll machinery (native CSS, all proven here):**

- **Snap:** `scroll-snap-type: y proximity` on `:root`; each stall, grower, footer get `scroll-snap-align: start`. Position behavior → stays under reduced motion. **The festival gate does NOT snap** and is sized `calc(100svh − 74px)` — snapping it to start scrolls the ~74px header off on load (the hero-reskin lesson); it sits beside the header in the first viewport instead.
- **Reveals:** each stall's text block rises on entry via `animation-timeline: view()`, house-hardened (base = final visible state; behind `@supports` + motion-ok; `animation-range: entry`).
- **Lantern rail:** the v5 fixed right index rail (home only, ≥768px) **restyled as a paper-lantern string** — a vertical `--line` cord, a teal `scaleY` progress fill on a `scroll()` timeline, and 一…五 lantern links (each carrying its product name as accessible name) to `#chapter-{slug}`. The fill hides outside `@supports (animation-timeline: scroll())` (the one deliberate base≠final exception — a permanently full bar would misreport). CSS only.

## 5. Components

- **Header:** cream, hairline bottom rule, a top **seigaiha rule** (thin sage-ink pattern strip); logo (36px) + wordmark (mincho 700) + kanji wordmark 自然つなぎ (`lang="ja"`, teal). No nav links.
- **Festival gate** (manifesto): `min-height: calc(100svh − 74px)`, no scroll-snap (so the header stays visible on load). A sage-ink asanoha ground; a two-column room ≥1024px (plate left, copy right), single column below; the **polychrome botanical plate** ("the five, drawn from one" — millet stalks + five motifs, each motif group now `color`ed to its product deep hue, draw-on choreography kept, §12); the headline **"Goodness lives in the detail."** mixing gothic + mincho weights; the 繋 accent and 縁日 festival seal (both `lang="ja"` + Latin gloss); **tategaki strips** 自然 / つなぎ (`writing-mode: vertical-rl`, `lang="ja"`, each beside its Latin meaning); and the **stall-sign arrow CTA** — a bordered, oversized teal anchor "Explore the stalls →" to `#chapter-{first-slug}` (real link, real focus ring), arrow eases 4px right on hover (motion-gated). Copy is placeholder (`ponytail:`), composition-register.
- **Buttons:** **Notify me** = outline teal (transparent, 1px teal border, teal text, radius 2px; hover/focus fills teal with cream text, 150ms). The stall-sign CTA is a thicker bordered variant. Form submits (dialog + review) stay solid teal. Focus ring 2px teal, offset 2px, everywhere — verified against every dense ground (§8).
- **Seal** (`components/Seal.tsx`): a rotated hanko stamp badge — a double ring + a centered glyph (numeral / 繋 / 縁日) or short label, an imperfect-ink look (slightly irregular ring). Fills: gold, the dominant hue, or a guest; text/glyph contrast per §8 (decorative glyphs are `aria-hidden`; any informative label passes). Rotations 2–6°, small position jitter. "Stamps in" (scale-settle) on entry (§12).
- **Burst** (`components/Seal.tsx`, same file): the chirashi price-tag — an SVG star/burst polygon in the dominant hue, gold ring, cream text ≥1.17rem bold. The **"Coming soon"** announcement.
- **Pattern** (`components/Pattern.tsx`): the inline-SVG `<pattern>` library (§7).
- **Dialog:** native `<dialog>`, Phase-2 behavior/states/copy unchanged; restyled with a patterned header rule + seal accent, still cream-plated so all text sits on solid ground.
- **Detail page:** one stall composition on the product's wash + guests — the stall anatomy (minus the big scroll-only pieces) with the name as `h1`, the tagline at subhead size (ink), a fourth spec row `Promise → 100% organic · farm-sourced · no preservatives`, the outline Notify me, then the review section on cream. One dominant hue per page, four guests. `generateMetadata`/`generateStaticParams`/`notFound()` unchanged.
- **The grower:** closes the home walk on cream, natural height, denser framing (a sage-ink pattern ground, a 繋 seal, a bordered copy plate). Heading **"The grower"** gothic; 2–3 body lines (`ponytail:`), honest, **no fake imagery** — no stock photos, no invented faces.
- **Footer → the lantern row:** teal ground, cream text; a string of CSS paper **lanterns** (rounded hue/gold shapes on a cord), logo, brand line, contact `stsales@shizentsunagi.com`, © year. `scroll-snap-align: start` so the walk closes on it.
- **Seal favicon:** `app/icon.svg` unchanged (teal square, 繋 in cream) — the token teal `#2F5D50` it already carries is the restored chassis teal.
- **Selection:** `::selection` teal ground, cream text.

## 6. Layout

Max content width 1080px, 24px side padding, single 768px breakpoint. Rhythm 112/64 as vertical padding; the gate and stalls additionally center content in `min-height: 100svh`. Radius: 0 surfaces, 2px controls.

**Deliberate rotation & overlap (the furniture, never the reading):** tags, seals, and numerals sit at small angles (2–8°); layers overlap with the **named z-order** in §4 (z0 pattern ground → z1 numeral → z2 echo pack → z3 content plates → z4 seals/bursts). **Body copy stays level and on a plate.** At 360px, tags/seals/numerals **crop intentionally** — each on its own `overflow`-clipped layer so nothing forces horizontal scroll (the v5 ghost-numeral technique, generalized). Verified: no horizontal scroll to 360px (§8/§9 DoD).

## 7. Patterns & voice

**Pattern library** (`components/Pattern.tsx`) — six Edo motifs as inline SVG `<pattern>` defs: **seigaiha** (waves), **asanoha** (hemp-leaf), **kikkō** (tortoiseshell hexagons), **shippō** (interlocking circles), **yagasuri** (arrow-feather), **ichimatsu** (checker). Each is written **once** as a `kind` in the component and **instantiated per placement with a unique id**, its ink resolved from `currentColor` at the placement (SVG resolves `currentColor`/vars at the pattern's definition site, so per-placement instantiation is how "one def serves all hues" — the v5 seigaiha lesson, generalized). Placement CSS sets `color: var(--hue)` / `var(--guest-n)` / `var(--sage)`. **Minimum two pattern layers per chapter** (full-bleed ground + a second inside the pack border / spec table / burst ring). The 404's "one place fans exist" rule is repealed.

**Text on pattern:** never raw — a solid plate/scrim behind it (cream, wash, or deep-hue block), unless the ratio against the pattern's darkest ink passes (§8). Patterns are inked at reduced strength so grounds stay grounds.

**Voice:** plain verbs, sentence case; the `description` register may get **louder and more festive through typography**, but **composition and process ONLY — zero health/medical/benefit claims** (locked 2026-07-15, FSSAI-adjacent). Exclamation energy lives in bursts and gothic weight, never in claims. The cliché ban survives: no sakura, torii, sun discs, brush faces, decorative katakana. Every JP string carries `lang="ja"` and sits beside/behind its Latin meaning.

## 8. Quality floor & contrast appendix (built, not announced)

Responsive to 360px. Native `<dialog>` focus trap, Esc, focus return. Real alts (pack alt describes the photo; texture/echo alts name the close view). Visible teal focus **everywhere** — re-verified against pattern grounds, bursts, and the lantern rail. `text-wrap: balance` on headings. No layout shift (image dims declared; blends/blur/transforms/patterns cause none).

**Motion hardening (locked):** base (no-animation) state = final, fully-visible festival; every animation only overrides it, gated behind `@media (prefers-reduced-motion: no-preference)` (+ `@supports` where needed). Reduced motion = the **complete static festival** — dense but still; the marquee shows the single interpunct line; the rail-fill `@supports` fallback holds.

**iOS tripwire (locked 2026-07-17):** `mask-image` and `mix-blend-mode` NEVER on the same element. Mask/crop on the frame; blend on the img. Binds every pack shot, texture crop, and echo print.

**Contrast appendix — every new pairing, computed 2026-07-19 on the restored cream `#FAF7F1`** (re-verify only if a hex changes; hexes are pinned). Deep-hue "on wash" = its own wash.

| Pairing | Ratio | Verdict / rule |
|---|---|---|
| kogecha as body/interactive text on cream | **7.39** | AA-normal ✓ — licensed for body/buttons |
| azuki as body/interactive text on cream | **4.78** | AA-normal ✓ — licensed for body/buttons |
| kin-iro on cream | 3.58 | AA-large only → ≥1.5rem display or ink for body |
| kaki on cream | 3.64 | AA-large only → ≥1.5rem display or ink for body |
| koke on cream | 3.48 | AA-large only → ≥1.5rem display or ink for body |
| cream (burst text) on kogecha / azuki | 7.39 / 4.78 | AA-normal ✓ |
| cream (burst text) on kin-iro / kaki / koke | 3.58 / 3.64 / 3.48 | AA-large ✓ — burst text is ≥1.17rem bold |
| ink on kogecha / azuki | 1.74 / 2.69 | FAIL → bursts on dark hues use cream text, never ink |
| ink on kin-iro / kaki / koke | 3.59 / 3.54 / 3.69 | AA-large — allowed alt; bursts standardize on cream |
| ink body text on any guest wash | 11.45–11.97 | AA-normal ✓ — guest tag-stock is safe |
| teal label/link on any guest wash | 6.23–6.52 | AA-normal ✓ |
| full-opacity numeral: deep hue on own wash | 3.22–6.59 | AA-large ✓ (kin 3.33, kaki 3.25, koke 3.22, azuki 4.25, kogecha 6.59) |
| chapter/stall name (deep hue ≥1.5rem) on own wash | 3.22–6.59 | AA-large ✓ (unchanged from v4/v5) |
| marquee: cream text on teal ribbon | 7.01 | AA-normal ✓ — ribbon is teal, never a light hue |
| footer: cream text on teal | 7.01 | AA-normal ✓ |
| sage pattern-ink on cream | 2.54 | decorative (non-text). Fallback: ink meeting a sage stroke = 5.07 ✓ |
| gold festival metal on cream / washes / teal | 2.24 / 2.00–2.09 / 3.12 | decorative only — gold never sets text |
| ink text on a solid gold plate | 5.74 | AA-normal ✓ — text on gold is ink |

The gold "Coming soon" role is gone (it's a burst now); the gold token keeps only its decorative + star-rating roles, still barred from text.

## 9. 404 — the fans win

`app/not-found.tsx`: a **full seigaiha field** (the pattern library's wave motif, teal-inked on cream) with **one fan mid-field visibly missing** — the gap reads *because* the field is now everywhere. Line: "This page isn't connected.", a plain link home. Nothing animates. Heading at the section scale.

## 10. Reviews (function untouched, restyled)

The review section closes each detail page on cream, after the washed stall composition: a `--line` hairline opens a section carrying `id="reviews"` with `scroll-margin-top: 24px` — the anchor printed QR codes target (`/products/{slug}#reviews`, permanent). Content sits in the standard `.wrap` (1080px, 24px padding); the opening hairline may span full width, the content may not. The heading ("Reviews") sits at the section scale in the product's **dominant hue** — the only hue in this section; a small seal accents it. Everything else is chassis.

- **Stars:** inline SVGs in `--gold` (the gold ratings role, still barred from text/controls). Five stars, filled = rating.
- **Average line:** "4.6 out of 5 · 12 reviews", ink.
- **Review items:** `--line`-separated, no boxes — stars, then name + date (DotGothic16 label), comment in body.
- **Empty state:** "No reviews yet — be the first."
- **Form:** a `fieldset`/`legend` radio group of five labelled star inputs (accessible names "1 star"…"5 stars"), each with the teal focus ring; name + comment fields per the input style (radius 2px, DotGothic16 labels); solid teal submit ("Submit review"). Client-side required checks mirror the server; the server stays the trust boundary.
- **Success:** "Thank you — your review appears once approved." **Error:** "Something went wrong. Try again."

## 11. JP glyph mechanics & inventory

The committed `zen-old-mincho-ja.woff2` holds **exactly 19 mincho glyphs** — 自然つなぎ繋一二三四五焦茶小豆柿苔金色 (ぎ ships decomposed as き+゙). Any JP text outside its subset renders tofu.

**v6 procedure (mechanism owner-approved 2026-07-16):** enumerate every JP glyph first, fetch pre-subsetted woff2 via Google's `text=` API (`next/font` has no `text` option), grep-verify coverage against every `lang="ja"` string, commit it.

- **Mincho (existing, no re-fetch):** covers the header wordmark 自然つなぎ, the tategaki strips 自然/つなぎ, the 繋 accent, the kanji annotations 焦茶/金色/小豆/柿/苔, and mincho numerals 一…五 (plate legend). Every mincho `lang="ja"` string stays inside the 19 — **grep-verified, never re-fetched.**
- **Gothic (new, one committed subset `zen-kaku-gothic-new-ja.woff2`, weight 900, 17 glyphs):** 一二三四五 焦茶 金色 小豆 柿 苔 繋 縁日 祭 — the fat signage kanji: full-opacity chapter numerals, stall-sign hue kanji, gothic seals (繋), the festival-gate 縁日 + 祭 marks. Fetched via `text=` (verified: valid woff2, unicode-range = exactly those 17 codepoints).

No new glyph ships unverified; no full JP slice is pulled at runtime. Both faces load `next/font/local`; a JP span's `className` selects mincho-subset **or** gothic-subset, each string confined to its face's covered set.

## 12. Motion program (abundant, orchestrated, under the §8 harness)

One page-load overture + systematic scroll behavior — never scattered twitching. All base states are the finished static festival.

- **Marquee ribbons** — pure CSS `@keyframes` `translate` loop; duplicated content for a seamless wrap; reduced motion → the static single interpunct line.
- **Foreground numerals** — slow drift/rotate on `animation-timeline: view()`.
- **Pattern grounds** — subtle parallax on `scroll()` timelines.
- **The polychrome plate** — the v5.1 draw-on choreography kept (ground → stalks → grains → motif 1…5 → scatter → legend), but **each motif draws in its product's deep hue** (v5's ink-only ruling repealed — the named temptation, now indulged). Base = fully-drawn polychrome plate.
- **Seals** — "stamp in" (scale-settle + slight rotate) on entry via `view()`.
- **Bursts** — pop-settle on entry.
- **Stall text** — the v5 rise-in on `view()`.

Everything gated behind `prefers-reduced-motion: no-preference` (+ `@supports` where the timeline/feature needs it). Reduced motion = complete static page; rail-fill keeps its `@supports` fallback; smooth in-page scroll for the gate/rail jumps is motion-gated.
