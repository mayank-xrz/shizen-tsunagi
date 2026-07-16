import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import NotifyDialog from "@/components/NotifyDialog";
import { products } from "@/data/products";

// hitofude drawings (design.md §4): each product's hero ingredient as one
// unbroken line — a single path, single M, no lifts. Owner-approved 2026-07-16.
const hitofude: Record<string, string> = {
  "chocolate-mix": // cacao pod on branch
    "M 24 48 C 60 40, 100 44, 150 52 C 130 56, 116 58, 106 60 C 103 64, 102 68, 103 76 C 62 92, 54 140, 86 168 C 120 180, 142 108, 112 78 C 109 70, 103 71, 101 79 C 94 106, 102 138, 95 160 C 104 138, 99 110, 107 92",
  "vanilla-mix": // vanilla orchid
    "M 106 190 C 100 165, 96 145, 98 120 C 46 128, 40 72, 94 101 C 66 52, 116 34, 100 96 C 156 68, 162 126, 101 116 C 80 136, 76 108, 91 102 C 108 96, 110 114, 95 116",
  "berries-mix": // berry sprig
    "M 30 170 C 55 150, 75 120, 95 100 C 108 88, 120 78, 138 70 C 160 42, 184 42, 164 66 C 150 78, 142 78, 134 74 C 122 82, 110 92, 100 104 C 94 112, 90 118, 86 124 C 62 122, 52 148, 76 158 C 100 166, 102 138, 88 126 C 102 132, 108 140, 114 146 C 96 158, 108 180, 126 170 C 144 160, 136 138, 118 142",
  "fruit-mix": // fruiting leaf
    "M 40 30 C 60 44, 76 62, 90 82 C 93 90, 95 98, 96 106 C 58 110, 52 162, 96 172 C 142 180, 150 120, 106 108 C 103 100, 100 94, 98 88 C 118 58, 144 48, 160 54 C 138 78, 114 88, 99 87 C 114 76, 128 70, 142 64",
  "savoury-mix": // moringa stem
    "M 106 188 C 102 168, 101 152, 100 136 C 52 142, 54 92, 98 118 C 98 108, 97 100, 96 92 C 144 96, 142 46, 94 74 C 93 64, 93 56, 92 48 C 70 24, 110 16, 94 44",
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

  return (
    <main>
      <section>
        <div className="wrap product">
          <div className="product-media">
            <Image
              src={product.image}
              alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
              fill
              sizes="(max-width: 767px) 100vw, 540px"
              style={{ objectFit: "cover" }}
              placeholder="blur"
              priority
            />
          </div>
          <div className="product-info">
            <span className="label coming-soon">Coming soon</span>
            <h1>{product.name}</h1>
            {/* the ingredient line doubles as the ingredients display (design.md §5) */}
            <p className="label product-ingredients">
              {product.ingredients.join("・")}
            </p>
            <p>{product.tagline}</p>
            <p>{product.description}</p>
            <ul className="benefits">
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <NotifyDialog name={product.name} slug={product.slug} />
          </div>
          {/* quiet marginalia: under the pack shot at ≥768px, after the content
              below — one drawing per page (design.md §4/§5) */}
          <svg
            className="hitofude product-hitofude"
            viewBox="0 0 200 200"
            width="140"
            height="140"
            aria-hidden="true"
          >
            <path pathLength={1} d={hitofude[product.slug]} />
          </svg>
        </div>
      </section>
    </main>
  );
}
