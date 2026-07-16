import Image from "next/image";
import Link from "next/link";
import NotifyDialog from "@/components/NotifyDialog";
import type { Product } from "@/data/products";

export default function ProductRow({ product }: { product: Product }) {
  return (
    <li className="row">
      {/* one image serves both widths (design.md §5): inline 4:5 thumbnail
          below 768px; absolutely placed into the index preview panel at ≥768px,
          revealed by the row's :hover/:focus-within — pure CSS */}
      <div className="row-preview">
        <Image
          src={product.image}
          alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
          fill
          sizes="(max-width: 767px) 88px, 432px"
          style={{ objectFit: "cover" }}
          placeholder="blur"
        />
      </div>
      <div className="row-body">
        <h3 className="row-name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="row-tagline">{product.tagline}</p>
        <p className="label row-ingredients">{product.ingredients.join("・")}</p>
        <span className="label coming-soon">Coming soon</span>
        <NotifyDialog name={product.name} slug={product.slug} />
      </div>
    </li>
  );
}
