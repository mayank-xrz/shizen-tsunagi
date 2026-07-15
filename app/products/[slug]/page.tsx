import Image from "next/image";
import { notFound } from "next/navigation";
import NotifyDialog from "@/components/NotifyDialog";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
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
              priority
            />
          </div>
          <div className="product-info">
            <span className="badge">Coming Soon</span>
            <h1>{product.name}</h1>
            <p>{product.tagline}</p>
            <p>{product.description}</p>
            {/* the thread, once, small and static (design.md §4) */}
            <svg
              className="thread-divider"
              viewBox="0 0 120 24"
              width="120"
              height="24"
              aria-hidden="true"
            >
              <path d="M 2 12 C 30 2, 50 22, 62 12 S 100 4, 118 12" />
            </svg>
            <h2>Benefits</h2>
            <ul>
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <h2>Ingredients</h2>
            <ul>
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <NotifyDialog name={product.name} slug={product.slug} />
          </div>
        </div>
      </section>
    </main>
  );
}
