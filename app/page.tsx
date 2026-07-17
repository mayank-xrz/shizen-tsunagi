import Chapter, { numerals } from "@/components/Chapter";
import { products } from "@/data/products";
import { zenOldMinchoJa } from "./layout";

export default function Home() {
  return (
    <main>
      {/* progress + index rail (design.md §4) — home only, ≥768px; the fill
          rides a scroll() timeline, the numerals anchor to the chapters */}
      <nav className="rail" aria-label="Products">
        {products.map((product, index) => (
          <a
            key={product.slug}
            href={`#chapter-${product.slug}`}
            className="rail-link"
            aria-label={product.name}
          >
            <span lang="ja" className={zenOldMinchoJa.className} aria-hidden="true">
              {numerals[index]}
            </span>
          </a>
        ))}
        <span className="rail-track" aria-hidden="true">
          <span className="rail-fill" />
        </span>
      </nav>
      {/* manifesto (design.md §5): no CTA, no button — the scroll is the CTA */}
      <section className="manifesto">
        <div className="wrap">
          <p className="manifesto-kanji" aria-hidden="true">
            <span lang="ja" className={zenOldMinchoJa.className}>
              繋
            </span>
          </p>
          <h1 className="manifesto-headline">Goodness lives in the detail.</h1>
          {/* ponytail: placeholder copy, replace when client delivers */}
          <p className="manifesto-body">
            The sheen of a grain. The scent of a pod just opened. Every mix we
            make begins on a farm and ends in your hands, carrying nothing it
            didn&rsquo;t grow with.
          </p>
          <p className="manifesto-body">
            Five recipes, drawn from soil and season. See them, one by one.
          </p>
        </div>
        {/* tategaki rail — JP glyphs only (design.md §5) */}
        <p className="manifesto-rail" aria-hidden="true">
          <span lang="ja" className={zenOldMinchoJa.className}>
            自然
          </span>
          <span lang="ja" className={zenOldMinchoJa.className}>
            つなぎ
          </span>
        </p>
      </section>
      {/* five catalog chapters (design.md §4), one full-viewport room each */}
      {products.map((product, index) => (
        <Chapter key={product.slug} product={product} index={index} />
      ))}
    </main>
  );
}
