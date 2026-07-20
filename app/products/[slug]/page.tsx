import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import NotifyDialog from "@/components/NotifyDialog";
import ReviewSection from "@/components/ReviewSection";
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
    // hue/peak/cta on <main> so the band, the detail block, and its Reserve CTA
    // all inherit (v6 §3.3: the koke page also gets the darker teal face)
    <main
      style={
        {
          "--hue": product.hue,
          "--hue-wash": product.hueWash,
          "--peak": product.peak,
          "--cta":
            product.slug === "savoury-mix"
              ? "var(--teal-koke)"
              : "var(--teal)",
        } as CSSProperties
      }
    >
      {/* hero band washed in the product's hue (design.md §5); the pack shot
          overlaps its lower edge into the cream below */}
      <section className="band">
        <div className="wrap band-inner">
          <div className="band-text">
            {/* honest urgency (v6 §4.5) — ponytail: ship window for client */}
            <span className="label batch-note">First batch ships September</span>
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
          {/* seigaiha wave divider (design.md §5) — the one signature pattern,
              a single peak-inked band; SVG resolves currentColor at the pattern
              def, so a per-page unique id lets it take this page's peak hue */}
          <svg className="detail-wave" aria-hidden="true">
            <defs>
              <pattern
                id={`seigaiha-${product.slug}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 0 24 A 12 12 0 0 1 24 24 M 4 24 A 8 8 0 0 1 20 24 M 8 24 A 4 4 0 0 1 16 24" />
                  <path d="M -12 12 A 12 12 0 0 1 12 12 M -8 12 A 8 8 0 0 1 8 12 M -4 12 A 4 4 0 0 1 4 12" />
                  <path d="M 12 12 A 12 12 0 0 1 36 12 M 16 12 A 8 8 0 0 1 32 12 M 20 12 A 4 4 0 0 1 28 12" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#seigaiha-${product.slug})`} />
          </svg>
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
