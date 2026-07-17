import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import NotifyDialog from "@/components/NotifyDialog";
import ReviewSection from "@/components/ReviewSection";
import { SeigaihaBand } from "@/components/ProductPanel";
import { zenOldMinchoJa } from "@/app/layout";
import { products } from "@/data/products";

// color provenance (design.md §5): each detail band names its dentōshoku
const provenance: Record<string, { ja: string; romaji: string; en: string }> = {
  "chocolate-mix": { ja: "焦茶", romaji: "kogecha", en: "burnt-tea brown" },
  "vanilla-mix": { ja: "金色", romaji: "kin-iro", en: "antique gold" },
  "berries-mix": { ja: "小豆", romaji: "azuki", en: "red-bean rose" },
  "fruit-mix": { ja: "柿", romaji: "kaki", en: "persimmon" },
  "savoury-mix": { ja: "苔", romaji: "koke", en: "moss green" },
};

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
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const hueName = provenance[product.slug];

  return (
    <main>
      {/* hero band washed in the product's hue (design.md §5); the pack shot
          overlaps its lower edge into the cream below */}
      <section
        className="band"
        style={
          {
            "--hue": product.hue,
            "--hue-wash": product.hueWash,
          } as CSSProperties
        }
      >
        <div className="wrap band-inner">
          <div className="band-text">
            <span className="label coming-soon">Coming soon</span>
            <h1 className="band-name">{product.name}</h1>
            <p className="band-tagline">{product.tagline}</p>
            <p className="label band-provenance">
              <span lang="ja" className={zenOldMinchoJa.className}>
                {hueName.ja}
              </span>{" "}
              {hueName.romaji} &mdash; {hueName.en}
            </p>
          </div>
          <div className="band-media">
            <Image
              src={product.image}
              alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
              fill
              sizes="(max-width: 767px) 72vw, 432px"
              style={{ objectFit: "cover" }}
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </section>
      <section>
        <div className="wrap detail">
          <p>{product.description}</p>
          <ul className="benefits">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          {/* the ingredient interpunct line (design.md §5) */}
          <p className="label detail-ingredients">
            {product.ingredients.join("・")}
          </p>
          <SeigaihaBand id={`seigaiha-${product.slug}`} className="detail-wave" />
          <NotifyDialog name={product.name} slug={product.slug} />
        </div>
      </section>
      <ReviewSection
        slug={product.slug}
        productName={product.name}
        hue={product.hue}
      />
    </main>
  );
}
