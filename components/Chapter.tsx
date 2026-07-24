import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import NotifyDialog from "@/components/NotifyDialog";
import { zenOldMinchoJa } from "@/app/layout";
import type { Product } from "@/data/products";

// the hue's kanji + romaji, keyed by slug — the catalog line and the kanji
// annotation read these; the detail page imports them too (design.md §4)
export const hueNames: Record<string, { kanji: string; romaji: string }> = {
  "chocolate-mix": { kanji: "焦茶", romaji: "kogecha" },
  "vanilla-mix": { kanji: "金色", romaji: "kin-iro" },
  "berries-mix": { kanji: "小豆", romaji: "azuki" },
  "fruit-mix": { kanji: "柿", romaji: "kaki" },
  "savoury-mix": { kanji: "苔", romaji: "koke" },
};

export const numerals = ["一", "二", "三", "四", "五"];

// one full-viewport catalog chapter (design.md §4) — wash ground, ghost
// numeral, catalog line, kanji annotation, name, pack shot + texture crop,
// poetic copy, spec rows, actions
export default function Chapter({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const hueName = hueNames[product.slug];
  return (
    <section
      id={`chapter-${product.slug}`}
      className="chapter"
      style={
        {
          "--hue": product.hue,
          "--hue-wash": product.hueWash,
          "--peak": product.peak,
          // v6 §3.3: koke is near-analogous to teal on the wheel, so its CTA
          // takes the darker teal face to keep owning the eye
          "--cta":
            product.slug === "savoury-mix"
              ? "var(--teal-koke)"
              : "var(--teal)",
          "--crop-y": product.cropY,
        } as CSSProperties
      }
    >
      {/* ghost numeral, top-right, cropped by its own layer (design.md §4) */}
      <div className="chapter-ghost" aria-hidden="true">
        <span lang="ja" className={`chapter-numeral ${zenOldMinchoJa.className}`}>
          {numerals[index]}
        </span>
      </div>
      <div className="wrap chapter-inner">
        <div className="chapter-media">
          {/* mask feathers live on this frame; the img carries only the blend
              — never both on one element (design.md §8) */}
          <div className="chapter-pack">
            <Image
              src={product.image}
              alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
              fill
              sizes="(max-width: 767px) 72vw, 454px"
              style={{ objectFit: "cover" }}
              placeholder="blur"
            />
          </div>
          {/* texture crop: the same JPEG zoomed to the pack's round window —
              the crop is the frame's overflow, the blend stays on the img.
              One shared position/scale for all five (design.md §4 ladder). */}
          <div className="chapter-crop">
            <Image
              src={product.image}
              alt={`The ${product.name.toLowerCase()} up close, through the pack's round window`}
              fill
              // v6 §3.4: the crop zooms 3.2×, so it needs a source larger than
              // its box — sizes advertises the effective size (52vw × 3.2 ≈
              // 166vw / 845px). quality 85 keeps the grain edible.
              sizes="(max-width: 767px) 166vw, 845px"
              quality={85}
              style={{ objectFit: "cover" }}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="chapter-body">
          <p className="label chapter-no">
            No. {String(index + 1).padStart(3, "0")} &middot; {hueName.romaji}
          </p>
          {/* honest urgency (v6 §4.5) */}
          <span className="label batch-note">First batch ships September</span>
          <p className="chapter-kanji">
            <span lang="ja" className={zenOldMinchoJa.className}>
              {hueName.kanji}
            </span>
          </p>
          <h2 className="chapter-name">{product.name}</h2>
          <p className="chapter-copy">{product.description}</p>
          <dl className="specs">
            <div className="spec-row">
              <dt className="label">Net quantity</dt>
              <dd>200 g</dd>
            </div>
            <div className="spec-row">
              <dt className="label">Base</dt>
              <dd>{product.base}</dd>
            </div>
            <div className="spec-row">
              <dt className="label">Key</dt>
              <dd>{product.ingredients.join("・")}</dd>
            </div>
          </dl>
          <div className="chapter-actions">
            <NotifyDialog name={product.name} slug={product.slug} />
            {/* names are deep-hue display text and the law bars deep-hue
                interactive elements (design.md §2) — the link is its own */}
            <Link href={`/products/${product.slug}`}>See details</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
