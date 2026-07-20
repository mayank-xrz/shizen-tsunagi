import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import NotifyDialog from "@/components/NotifyDialog";
import Pattern, { type PatternKind } from "@/components/Pattern";
import { Seal, Burst } from "@/components/Seal";
import { zenKakuGothicNewJa } from "@/app/layout";
import type { Product } from "@/data/products";

// the hue's kanji + romaji, keyed by slug (design.md §4)
export const hueNames: Record<string, { kanji: string; romaji: string }> = {
  "chocolate-mix": { kanji: "焦茶", romaji: "kogecha" },
  "vanilla-mix": { kanji: "金色", romaji: "kin-iro" },
  "berries-mix": { kanji: "小豆", romaji: "azuki" },
  "fruit-mix": { kanji: "柿", romaji: "kaki" },
  "savoury-mix": { kanji: "苔", romaji: "koke" },
};

export const numerals = ["一", "二", "三", "四", "五"];

// the five hue tokens in DATA order — Chapter derives its four guests by
// cyclic rotation (design.md §2: dominant + four guests, no new data field).
const HUES = ["--kogecha", "--kin-iro", "--azuki", "--kaki", "--koke"];

// each stall wears a different Edo motif so the five stay tellable apart
// line-based motifs read as borders; ichimatsu's filled checker is reserved for
// bold full-opacity accents (a faint checker behind a masked shot reads as a
// transparency grid), so it stays out of these faint-pattern rotations.
const GROUND: PatternKind[] = ["seigaiha", "asanoha", "shippo", "yagasuri", "kikko"];
const BORDER: PatternKind[] = ["asanoha", "kikko", "yagasuri", "seigaiha", "shippo"];
const BOARD: PatternKind[] = ["kikko", "shippo", "seigaiha", "asanoha", "yagasuri"];

// one full-viewport market stall (design.md §4)
export default function Chapter({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const hueName = hueNames[product.slug];
  const guests = [1, 2, 3, 4].map((k) => `var(${HUES[(index + k) % 5]})`);
  const ingredientLine = product.ingredients.join(" ・ ") + " ・ ";

  return (
    <section
      id={`chapter-${product.slug}`}
      className="chapter"
      style={
        {
          "--hue": product.hue,
          "--hue-wash": product.hueWash,
          "--guest-1": guests[0],
          "--guest-2": guests[1],
          "--guest-3": guests[2],
          "--guest-4": guests[3],
        } as CSSProperties
      }
    >
      {/* z0 — full-bleed pattern ground, guest-inked (design.md §4/§7) */}
      <Pattern
        kind={GROUND[index]}
        id={`ground-${product.slug}`}
        className="pat-fill stall-ground"
        scale={1.3}
      />
      {/* z1 — full-opacity foreground numeral, dominant hue (design.md §4) */}
      <span
        className={`stall-numeral ${zenKakuGothicNewJa.className}`}
        lang="ja"
        aria-hidden="true"
      >
        {numerals[index]}
      </span>

      <div className="wrap chapter-inner">
        {/* z2 — echo-printed pack shot in a thick patterned border (design.md §4) */}
        <div className="chapter-media">
          <div className="stall-media">
            <div className="pack-frame">
              <Pattern
                kind={BORDER[index]}
                id={`border-${product.slug}`}
                className="pat-fill pack-frame-pattern"
              />
            </div>
            {/* two offset, hue-tinted echo prints behind the crisp shot */}
            <div className="echo echo-a">
              <Image src={product.image} alt="" fill sizes="(max-width: 767px) 60vw, 300px" />
              <span className="echo-tint" />
            </div>
            <div className="echo echo-b">
              <Image src={product.image} alt="" fill sizes="(max-width: 767px) 60vw, 300px" />
              <span className="echo-tint" />
            </div>
            {/* the crisp main shot — feather mask on the frame, blend on the img */}
            <div className="pack">
              <Image
                src={product.image}
                alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
                fill
                sizes="(max-width: 767px) 74vw, 380px"
                placeholder="blur"
              />
            </div>
            {/* numeral seal, stamped on the corner */}
            <Seal glyph={numerals[index]} tone="hue" rotate={-6} size={64} />
          </div>
        </div>

        {/* z2 — the signboard of copy (design.md §4) */}
        <div className="stall-body">
          <p className="label stall-no">
            No. {String(index + 1).padStart(3, "0")} · {hueName.romaji}
          </p>
          {/* big gothic hue-kanji stall sign + the Coming-soon burst */}
          <p className="stall-sign">
            <span lang="ja" className={zenKakuGothicNewJa.className}>
              {hueName.kanji}
            </span>
          </p>
          <Burst lines={["Coming", "soon"]} className="stall-burst" rotate={6} size={124} />
          <h2 className="stall-name">{product.name}</h2>

          <div className="stall-board">
            <Pattern
              kind={BOARD[index]}
              id={`board-${product.slug}`}
              className="pat-fill stall-board-pattern"
            />
            <p className="stall-copy">{product.description}</p>
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
                <dd>{product.ingredients.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          {/* marquee ingredient ribbon — decorative (the Key row is accessible) */}
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="marquee-seg">
                  {ingredientLine}
                </span>
              ))}
            </div>
          </div>

          <div className="chapter-actions">
            <NotifyDialog name={product.name} slug={product.slug} />
            {/* names are deep-hue display text; the link is its own (design.md §4) */}
            <Link className="text-link" href={`/products/${product.slug}`}>
              See details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
