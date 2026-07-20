# Design — Shizen Tsunagi

The brand name is Japanese: *shizen* (nature) + *tsunagi* (connection). The design's whole job is to feel like those two words. v5 read them as a hushed museum catalog. **v6 · Shun (旬) reads them as that same catalog, photographed at peak ripeness** — the moment food is most alive and most delicious. Nothing gets louder in structure; colour gets riper, food gets brighter, and every screen quietly asks for one action.

## 1. Direction

### v6 · Shun (旬) — colour pop + conversion (2026-07-20)

**v6 · Shun supersedes v6 · Ennichi entirely, and returns to v5's chassis.** Ennichi (the festival night-market: patterns, seals, bursts, all five colours at once) is killed by this brief — its maximalism read as clutter and festival, both of which are wrong here. Shun keeps **v5's minimal editorial chassis and discipline byte-for-byte in spirit** and changes exactly **two** things:

1. an engineered **colour-pop system** built on colour-wheel theory (§2–§3), and
2. a **conversion layer** (§4) — the site's single job is to make a visitor want to try one pack, then capture their email for launch.

The register: **nice, irresistible, professional.** If a choice reads as festival, clutter, or template-DTC, it is wrong.

**Removed** (Ennichi, and v5's one dimmed ruling):

- The whole Ennichi apparatus: `Pattern.tsx` (six-motif Edo library), `Seal.tsx` (hanko/burst), the gothic + pixel display faces (`zen-kaku-gothic-new-ja.woff2`, DotGothic16), full-opacity foreground numerals, marquee ribbons, echo-printed packs, tag-stock/guest-hue law, the festival gate / lantern footer. Reverted to the v5 chassis.
- **v5's multiply/feathered "printed on the page" image treatment** (→ the appetite treatment, §3.4) — dim food does not sell.
- **Passive CTA copy** ("Notify me" → reservation framing, §4.2).
- **Reviews visible pre-launch** (→ gated behind a flag, §4.7).
- **Teal used decoratively** (v5 put teal on the wordmark, default headings, the footer ground, the 繋 accent, the 404 fans). Teal is now action-only (§3.1); those all move to ink / sage.

**Kept** (the discipline floor — violating any is a failed task):

- **v5 chassis tokens + the five dentōshoku hue pairs** (§2); the **minimal editorial chassis** (cream ground, ink body, one hue pair per view — the 30% layer).
- **Single Zen Old Mincho display + system body** (CTA buttons may take a heavier weight — no new family); **ghost numerals** at low opacity; **snap scroll + the index rail**; the **pattern ban** (only the 404 fans and the one detail-page seigaiha divider).
- The **kanji identity** (自然つなぎ wordmark, the 繋 mark), `lang="ja"` discipline + adjacent Latin, the **committed JP subset** (now 20 glyphs — 旬 added, §5).
- **Motion program + its hardening** (base = final state; `@supports` + reduced-motion gates); the **iOS mask/blend tripwire**; the **full a11y floor** (dialog focus trap, alts, 360px, visible focus — rings may now be teal).
- **Function untouched in behaviour:** all API routes, NotifyDialog states, the ReviewSection contract (`#reviews` anchor is sacred), `generateMetadata`/`generateStaticParams`/`notFound()`, both check scripts, the server trust boundary, the 4-dep budget.
- **Copy law:** composition/sensory/provenance only — **zero health/medical/benefit claims** (FSSAI, locked 2026-07-15).

**Added:**

- **Peak variants** (`--*-peak`, §3.3) — one OKLCH-derived pop token per hue, rationed to the 10% layer.
- **Teal-as-action exclusivity** (§3.1) + the **60-30-10 proportion law** (§3.2).
- The **appetite treatment** for imagery (§3.4).
- The **conversion layer** (§4): persistent/sticky reserve CTA, reservation copy, a meet-all-five range strip, a sensory copy pass, honest urgency, an elevated grower section, gated reviews.

<!-- HISTORY (superseded). v6 · Ennichi (2026-07-19): the maximalist inversion — Edo patterns, seals, bursts, gothic+pixel type, all five colours per view. Killed by the Shun brief; retained in git only. v6 hero-reskin (2026-07-18): Cormorant/green chassis, photo hero — also superseded. v5 (kinu catalog scroll, 2026-07-17): one product/one room/one scroll, the quiet museum catalog — Shun's chassis is v5's. -->

## 2. Tokens & the five hues

```css
:root {
  --cream:  #FAF7F1;  /* page ground */
  --ink:    #22302B;  /* body text; wordmark; default headings; footer ground */
  --teal:   #2F5D50;  /* ACTION ONLY — CTA, links, focus (§3.1) */
  --teal-koke: #214F43; /* darker CTA face on the koke chapter (§3.3) */
  --sage:   #8FA382;  /* supporting neutral — dividers only, never text */
  --gold:   #C9A24B;  /* star ratings only — never text, never a CTA */
  --line:   #E4DED2;  /* hairline rules */

  /* five dentōshoku pairs (30% layer): deep hue in display type + numeral, wash ground */
  --kogecha: #6B4A36; --kogecha-wash: #F2E9E1;  /* 焦茶 chocolate */
  --kin-iro: color-mix(in srgb, var(--gold), var(--ink) 30%); /* ≈#978041 金色 vanilla */
  --kin-iro-wash: #F6EFD9;
  --azuki:   #9D5B63; --azuki-wash:   #F4E7EA;  /* 小豆 berries */
  --kaki:    #C4683F; --kaki-wash:    #F7E8DE;  /* 柿 fruit */
  --koke:    #7E8A4F; --koke-wash:    #EDF0DF;  /* 苔 savoury */

  /* PEAK variants (10% pop) — OKLCH-derived, non-text accents only (§3.3) */
  --kogecha-peak: #86430F; --kin-iro-peak: #A07700; --azuki-peak: #B4475A;
  --kaki-peak: #D55300;    --koke-peak: #768700;

  --rhythm: clamp(64px, 10vw, 112px);
}
```

Components never name a product colour literally; each chapter/detail sets `--hue`/`--hue-wash`/`--peak` (and `--cta`) once from `data/products.ts`, and the CSS reads those vars.

## 3. The colour system

### 3.1 The wheel math — warm field, cool accent

The five product hues form a warm analogous arc: **azuki → kogecha → kaki → kin-iro → koke**. The complement of the arc's centre (kaki, orange) is **teal** — already pinned from the client logo. So:

- **Product hues own the emotional field** of each chapter (the 30% layer). **Teal is the only cool colour on the page and is reserved for action** — the primary CTA, links, focus states, the dialog's primary button. The eye finds the action because it is the one cool thing in a warm world.
- **Teal is never decorative.** If teal appears, it must be clickable or focus-related. This exclusivity is the whole trick. *(Enforcement:* the wordmark, default headings, the 繋 accent, the footer ground and the 404 fans are ink or sage — never teal. Verified by computed style in the build check.)

### 3.2 The 60-30-10 proportion law — per view

Every viewport-height section budgets its coloured surface roughly:

- **~60% chassis** — cream ground, ink text (unchanged from v5).
- **~30% product presence** — the chapter's wash as ground, the deep hue in display type + the ghost numeral (v5's one-hue-per-view law).
- **~10% pop** — saturated colour at small, high-value sizes: the peak variant (§3.3) on the range dots, the name accent rule, the batch-note dot, the detail wave; plus the teal CTA. A section where saturated colour exceeds ~10% of surface has failed the law.

### 3.3 Peak variants — the pop tokens

Each `--*-peak` is derived in **OKLCH** from its deep hue: same hue angle, **+0.05–0.06 chroma**, L nudged (−0.02 to +0.02) to keep it a vivid mid accent. Rules:

- **Peak lives only in the 10% layer, and only as non-text accents** — range-strip hue dots, the short accent rule under each chapter name, the batch-note dot, the detail-page wave, chip hover. **Never grounds, never text.** (Keeping peak off text sidesteps per-hue AA juggling and the "badge-wall" DTC tripwire; the pop is dots/rules, which read as editorial, not bazaar.)
- Every peak clears **3:1 non-text** on both cream and its own wash (§8), so each accent is legible on either ground.
- Deep hues keep their v5 jobs (display type ≥1.5rem); washes keep theirs.
- **Per-chapter complement check:** teal pops hard against azuki/kogecha/kaki/kin-iro (cross-wheel). On **koke**, teal and koke are near-analogous, so the pop weakens — compensated with a **darker teal CTA face** (`--teal-koke #214F43`; cream text 8.67, edge 8.01 on the koke wash) so the action still owns the eye. Verified visually and by computed style.
- `--sage` takes the supporting-neutral role (grower divider, 404 fans); it never carries text.

### 3.4 The appetite treatment (supersedes v5's multiply ruling)

- Packs render at **normal blend** with a gentle CSS lift (`filter: brightness(1.05) saturate(1.1)` — ceilings 1.06 / 1.12; food must look real, not neon).
- A **soft elevation shadow** under the pack (ink-derived `color-mix`) so it reads physical and graspable, **sitting on the wash** rather than dissolving into it.
- The texture crop keeps its zoom, drops multiply, takes the same lift; its `sizes` is corrected to `(max-width:767px) 166vw, 845px` (the crop zooms 3.2×, so it needs a source larger than its box) at `quality={85}`.
- **iOS tripwire holds:** no element carries `mask-image` and `mix-blend-mode` — trivially satisfied now that multiply is gone (the frame uses `overflow`, not `mask-image`).

## 4. The conversion layer

The single job: make a visitor want to try one pack, and capture the email. Every addition is editorial, never bazaar.

1. **One primary action per viewport.** The teal reserve CTA is reachable from every section — a quiet **outline-teal header CTA** on desktop, a **dismiss-safe sticky bar** on mobile (appears only after the hero, footer reserves bottom room so it never covers content). Exactly one **solid** teal button shows at a time — the per-pack Reserve; secondaries (header CTA, "See details", "Meet the five") are outline/text teal.
2. **CTA copy = ownership.** "Notify me" → **"Reserve the first batch"** (trigger) / **"Save my spot"** (submit); the dialog success affirms the reservation. All `ponytail:`-marked for the client's final copy.
3. **Meet-all-five strip** (`#range`): a compact index after the manifesto — a 旬 mark + five chips (peak dot + name) jump-linking to the chapters. The whole range in one screen; also the **mobile answer to the desktop rail**. The manifesto CTA ("Meet the five →") and both reserve CTAs point here / to the pack picker.
4. **Sensory copy pass, claims law intact.** Blurbs rewritten for appetite — texture, aroma, process, origin — truthful to each ingredient list. **Zero health/benefit/medical claims** (FSSAI, locked 2026-07-15). Desire from senses and provenance, not promises.
5. **Honest urgency only.** "First batch ships September" (`ponytail:` — client confirms the window) in the range strip and each chapter. No countdown timers, no fake scarcity.
6. **Trust assets elevated.** A **grower section** (home, before the footer) gets real visual weight — provenance converts for clean-label food; honest lines, **no fake imagery** (no stock photos, no invented faces). The spec/ingredient rows stay fully visible — transparency is the pitch.
7. **Reviews gated until launch.** A `LAUNCHED` flag (`ponytail:` flip at launch) hides the review list/form pre-launch behind a single-line empty state ("First-batch reviews will land here."). The **`#reviews` anchor still renders and scrolls** (printed QR codes target `/products/{slug}#reviews`); the API routes stay live and untouched.

## 5. JP glyph mechanics

The committed `zen-old-mincho-ja.woff2` now holds **20 mincho glyphs** — the v5 nineteen (自然つなぎ繋一二三四五焦茶小豆柿苔金色, ぎ = き+゙) **plus 旬** (the Shun mark, U+65EC). Re-fetched pre-subsetted via Google's `text=` API (weight 400), grep-verified: every mincho `lang="ja"` string on the site is inside the 20; the only other JP char in source is the interpunct ・, which renders in the system body font, never the subset. No tofu; no runtime JP slice.

## 6. Structure

**Home:** `header (wordmark + teal CTA) → manifesto (botanical plate, ink) → range strip (#range) → chapter ×5 (data order) → grower → footer (ink)`. Manifesto and each chapter are `min-height: 100svh` with snap; the range strip is compact (no snap). **Detail:** hue-washed band → detail block (description, promise, ingredients, seigaiha wave, Reserve) → gated ReviewSection. `--hue`/`--peak`/`--cta` live on `<main>` so band and detail both inherit (koke gets the darker CTA face on the detail page too).

## 7. Quality floor

Responsive to 360px (verified: no horizontal scroll at 360/390/1440). Native `<dialog>` focus trap, Esc, focus return. Real alts. Visible **teal** focus everywhere — verified teal on all five washes. Motion hardened (base = final; reduced motion = complete static page — verified). iOS mask/blend tripwire held.

## 8. Contrast appendix — computed 2026-07-20 on cream `#FAF7F1`

Baseline confirmed against the brief: kogecha 7.39, azuki 4.78, kaki 3.64, koke 3.48, kin-iro 3.58, teal 7.01, ink 12.87.

| Pairing | Ratio | Verdict / rule |
|---|---|---|
| **Peak variants — non-text accents (need ≥3.0)** | | |
| kogecha-peak `#86430F` — vs cream / vs own wash | **6.96 / 6.20** | ✓ dot/rule legible on both |
| kin-iro-peak `#A07700` — vs cream / vs own wash | **3.83 / 3.56** | ✓ |
| azuki-peak `#B4475A` — vs cream / vs own wash | **4.92 / 4.38** | ✓ |
| kaki-peak `#D55300` — vs cream / vs own wash | **3.88 / 3.46** | ✓ |
| koke-peak `#768700` — vs cream / vs own wash | **3.75 / 3.46** | ✓ |
| **Teal CTA — button on each wash** | | |
| cream text on teal (button face) | **7.01** | AA-normal ✓ |
| teal face edge vs kogecha/kin/azuki/kaki/koke wash | 6.25 / 6.52 / 6.23 / 6.26 / 6.47 | non-text 3:1 ✓ (button reads as a shape) |
| koke chapter: darker teal `#214F43` — cream text / edge vs koke wash | **8.67 / 8.01** | ✓ — owns the eye where teal turns near-analogous (§3.3) |
| **Focus + chassis** | | |
| teal focus ring vs each wash / vs cream | 6.23–6.52 / 7.01 | ✓ visible on every ground |
| footer: cream text / cream link on ink | 12.87 | AA-normal ✓ |
| deep hue (name ≥1.5rem, numeral) on own wash | 3.22–6.59 | AA-large ✓ (unchanged from v5) |
| sage divider / 404 fans on cream | 2.54 | decorative only — never text |
| gold star ratings on cream | 2.24 | decorative only — never text/CTA |

## 9. 404

`app/not-found.tsx`: a row of seigaiha fans, **sage-inked** now (teal is action-only), one visibly missing — the connection broken. Plain link home. Nothing animates.

## 10. Reviews (function untouched, gated)

Contract per architecture.md §9. Pre-launch the section renders only the `#reviews` anchor + heading + one empty-state line; at launch (`LAUNCHED = true`) the full stars/list/form return. Heading in the product's dominant hue; stars in gold; everything else chassis. The API and both check scripts are unchanged by this brief.
