import Image from "next/image";
import Chapter, { numerals } from "@/components/Chapter";
import { products } from "@/data/products";
import { zenOldMinchoJa } from "./layout";

// short display name for the mix row: "chocolate-mix" → "Chocolate"
const shortName = (slug: string) => {
  const w = slug.replace(/-mix$/, "");
  return w.charAt(0).toUpperCase() + w.slice(1);
};

export default function Home() {
  const first = products[0];
  return (
    <main>
      {/* hero (v6, owner-directed 2026-07-18 hero design): two-column room —
          copy left, the lead pack shot right with a cream edge-fade */}
      <section className="hero">
        <div className="hero-text">
          {/* ponytail: placeholder copy, replace when client delivers */}
          <p className="hero-eyebrow label">
            One grain foundation &middot; Five ways to begin
          </p>
          <h1 className="hero-headline">
            Goodness lives
            <br />
            in the detail.
          </h1>
          <p className="hero-body">
            Every mix begins the same way &mdash; millets and whole grains,
            farm-sourced and slow-roasted. Then nature does the differentiating:
            cocoa, vanilla, berries, fruit, or a savoury turn.
          </p>
          <p className="hero-tagline">Nature&rsquo;s goodness, connected to you.</p>
          <div className="hero-actions">
            <a className="btn" href={`#chapter-${first.slug}`}>
              Explore Recipes
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero-link" href={`#chapter-${first.slug}`}>
              The five mixes
            </a>
          </div>
          {/* the five mixes — real jump links to each chapter (replaces the
              design's nonexistent top-nav and the old fixed index rail) */}
          <nav className="hero-mixes" aria-label="The five mixes">
            {products.map((product, index) => (
              <a key={product.slug} className="hero-mix" href={`#chapter-${product.slug}`}>
                <span lang="ja" className={zenOldMinchoJa.className}>
                  {numerals[index]}
                </span>
                <span className="hero-mix-name">{shortName(product.slug)}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="hero-media">
          <Image
            src={first.image}
            alt="Shizen Tsunagi Chocolate Sweet Mix pouch"
            fill
            sizes="(max-width: 767px) 100vw, 46vw"
            placeholder="blur"
            priority
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          {/* cream fade off the left edge so the photo dissolves into the copy */}
          <span className="hero-fade" aria-hidden="true" />
          <p className="hero-vertical" aria-hidden="true">
            <span lang="ja" className={zenOldMinchoJa.className}>
              自然つなぎ
            </span>
          </p>
        </div>
      </section>
      {/* five catalog chapters (design.md §4), one full-viewport room each */}
      {products.map((product, index) => (
        <Chapter key={product.slug} product={product} index={index} />
      ))}
    </main>
  );
}
