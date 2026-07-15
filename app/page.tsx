import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="home">
      {/* the tsunagi thread (design.md §4) — leaves the hero, curves behind
          the grid, resolves into the story; drawn in by scroll via CSS only */}
      <svg
        className="thread"
        viewBox="0 0 1200 2400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M 140 300 C 520 420, 1060 460, 1010 920 S 180 1280, 230 1720 S 940 2080, 630 2340"
        />
      </svg>
      <section className="hero">
        <div className="wrap">
          <h1>Nature&rsquo;s goodness, connected to you</h1>
          <p>
            Five organic multigrain nutrition mixes, made from farm-sourced
            grains, nuts, fruits and herbs &mdash; coming soon.
          </p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="cards">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="story">
        <div className="wrap">
          <h2>Shizen means nature. Tsunagi means connection.</h2>
          <p>
            Our name says what we do. We take what grows on organic farms
            &mdash; grains, nuts, fruits and herbs &mdash; and mix it into
            simple nutrition, with no preservatives and nothing it does not
            need.
          </p>
          <p>
            Every pack carries the same promise we put on the front:
            nature&rsquo;s goodness, connected to you.
          </p>
        </div>
      </section>
    </main>
  );
}
