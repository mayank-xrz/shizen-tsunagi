import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import NotifyDialog from "@/components/NotifyDialog";
import ReviewSection from "@/components/ReviewSection";
import Pattern from "@/components/Pattern";
import { Seal, Burst } from "@/components/Seal";
import { hueNames, numerals } from "@/components/Chapter";
import { zenOldMinchoJa, zenKakuGothicNewJa } from "@/app/layout";
import { products } from "@/data/products";

// color provenance (design.md §5): each detail names its dentōshoku
const provenance: Record<string, { ja: string; romaji: string; en: string }> = {
  "chocolate-mix": { ja: "焦茶", romaji: "kogecha", en: "burnt-tea brown" },
  "vanilla-mix": { ja: "金色", romaji: "kin-iro", en: "antique gold" },
  "berries-mix": { ja: "小豆", romaji: "azuki", en: "red-bean rose" },
  "fruit-mix": { ja: "柿", romaji: "kaki", en: "persimmon" },
  "savoury-mix": { ja: "苔", romaji: "koke", en: "moss green" },
};

const HUES = ["--kogecha", "--kin-iro", "--azuki", "--kaki", "--koke"];

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Shizen Tsunagi`,
    description: product.description,
    openGraph: { images: [product.image.src] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const product = products[index];

  const prov = provenance[product.slug];
  const hueName = hueNames[product.slug];
  const guests = [1, 2, 3, 4].map((k) => `var(${HUES[(index + k) % 5]})`);

  return (
    <main>
      {/* one stall composition on the product's wash + guests (design.md §5) */}
      <section
        className="detail-stall"
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
        <Pattern kind="seigaiha" id={`detail-ground-${slug}`} className="pat-fill stall-ground" scale={1.3} />
        <div className="wrap chapter-inner">
          <div className="chapter-media">
            <div className="stall-media">
              <div className="pack-frame">
                <Pattern kind="asanoha" id={`detail-border-${slug}`} className="pat-fill pack-frame-pattern" />
              </div>
              <div className="echo echo-a">
                <Image src={product.image} alt="" fill sizes="(max-width: 767px) 60vw, 300px" />
                <span className="echo-tint" />
              </div>
              <div className="echo echo-b">
                <Image src={product.image} alt="" fill sizes="(max-width: 767px) 60vw, 300px" />
                <span className="echo-tint" />
              </div>
              <div className="pack">
                <Image
                  src={product.image}
                  alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
                  fill
                  sizes="(max-width: 767px) 74vw, 380px"
                  placeholder="blur"
                  priority
                />
              </div>
              <Seal glyph={numerals[index]} tone="hue" rotate={-6} size={64} />
            </div>
          </div>

          <div className="stall-body">
            <p className="label stall-no">
              <span lang="ja" className={zenOldMinchoJa.className}>
                {prov.ja}
              </span>{" "}
              {prov.romaji} · {prov.en}
            </p>
            <p className="stall-sign">
              <span lang="ja" className={zenKakuGothicNewJa.className}>
                {hueName.kanji}
              </span>
            </p>
            <Burst lines={["Coming", "soon"]} className="stall-burst" rotate={6} size={124} />
            <h1 className="stall-name">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>

            <div className="stall-board">
              <Pattern kind="kikko" id={`detail-board-${slug}`} className="pat-fill stall-board-pattern" />
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
                <div className="spec-row">
                  <dt className="label">Promise</dt>
                  <dd>{product.benefits.join(" · ")}</dd>
                </div>
              </dl>
            </div>

            <div className="chapter-actions">
              <NotifyDialog name={product.name} slug={product.slug} />
            </div>
          </div>
        </div>
      </section>

      <ReviewSection slug={product.slug} productName={product.name} hue={product.hue} />
    </main>
  );
}
