import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import NotifyDialog from "@/components/NotifyDialog";
import { zenOldMinchoJa } from "@/app/layout";
import type { Product } from "@/data/products";

// the one pattern (design.md §4): seigaiha 青海波 as a stroke-only repeating
// band — three concentric arcs per fan, half-dropped rows. The <pattern> is
// written once here and instantiated per placement with a unique id, because
// SVG resolves currentColor where a pattern is DEFINED — a single shared def
// could never take a different hue per placement.
export function SeigaihaBand({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 24 A 12 12 0 0 1 24 24 M 4 24 A 8 8 0 0 1 20 24 M 8 24 A 4 4 0 0 1 16 24" />
            <path d="M -12 12 A 12 12 0 0 1 12 12 M -8 12 A 8 8 0 0 1 8 12 M -4 12 A 4 4 0 0 1 4 12" />
            <path d="M 12 12 A 12 12 0 0 1 36 12 M 16 12 A 8 8 0 0 1 32 12 M 20 12 A 4 4 0 0 1 28 12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const numerals = ["一", "二", "三", "四", "五"];

export default function ProductPanel({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <section
      className="panel"
      // image side alternates per panel, starting right (design.md §4) — the
      // chocolate shot hangs in from the hero
      data-side={index % 2 === 0 ? "right" : "left"}
      style={
        {
          "--hue": product.hue,
          "--hue-wash": product.hueWash,
        } as CSSProperties
      }
    >
      <SeigaihaBand id={`seigaiha-${product.slug}`} className="panel-wave" />
      {/* ghost numeral behind the content, cropped by its own layer so it can
          never overflow the panel (design.md §4) */}
      <div className="panel-ghost" aria-hidden="true">
        <span lang="ja" className={`panel-numeral ${zenOldMinchoJa.className}`}>
          {numerals[index]}
        </span>
      </div>
      <div className="wrap panel-inner">
        <div className="panel-media">
          <Image
            src={product.image}
            alt={`${product.name} pack: a kraft pouch with a round window showing the mix, illustrated with ${product.ingredients.join(", ").toLowerCase()}`}
            fill
            sizes="(max-width: 767px) 72vw, 432px"
            style={{ objectFit: "cover" }}
            placeholder="blur"
          />
        </div>
        <div className="panel-body">
          <h2 className="panel-name">{product.name}</h2>
          <p className="panel-tagline">{product.tagline}</p>
          <p className="label">{product.ingredients.join("・")}</p>
          <span className="label coming-soon">Coming soon</span>
          <div className="panel-actions">
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
