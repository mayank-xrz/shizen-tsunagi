import Image from "next/image";
import Link from "next/link";
import NotifyDialog from "@/components/NotifyDialog";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/products/${product.slug}`} className="card-link">
        <div className="card-media">
          <Image
            src={product.image}
            alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
            fill
            sizes="(max-width: 767px) 100vw, 340px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <div className="card-body">
        <h3>
          <Link href={`/products/${product.slug}`} className="card-link">
            {product.name}
          </Link>
        </h3>
        <p className="card-tagline">{product.tagline}</p>
        <span className="badge">Coming Soon</span>
        <NotifyDialog name={product.name} slug={product.slug} />
      </div>
    </article>
  );
}
