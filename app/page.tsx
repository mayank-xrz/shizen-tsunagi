import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { shipporiJa } from "./layout";

export default function Home() {
  return (
    <main className="home">
      {/* the tsunagi thread (design.md §4) — leaves the hero, curves behind
          the grid, resolves into the story; only the line draws in on scroll,
          the gold joins and the awaji knot are static */}
      <svg
        className="thread"
        viewBox="0 0 1200 2400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="thread-line"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M 140 300 C 520 420, 1060 460, 1010 920 S 180 1280, 230 1720 S 940 2080, 630 2385"
        />
        {/* nodes sit on the curve at points that stay clear of card text at
            375px and 1280px (measured); behind a pack image they simply hide */}
        <path
          className="thread-node"
          vectorEffect="non-scaling-stroke"
          d="M 140 300 h 0.01"
        />
        <path
          className="thread-node"
          vectorEffect="non-scaling-stroke"
          d="M 625 438 h 0.01"
        />
        <path
          className="thread-node"
          vectorEffect="non-scaling-stroke"
          d="M 287 1512 h 0.01"
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
        <p className="hero-rail">
          <span lang="ja" className={shipporiJa.className}>
            自然
          </span>{" "}
          nature
          <br />
          <span lang="ja" className={shipporiJa.className}>
            つなぎ
          </span>{" "}
          connection
        </p>
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
        {/* terminal group: simplified mizuhiki awaji knot pinned at the thread's
            end — its own viewport stays round at every width (design.md §4) */}
        <svg
          className="thread-knot"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          aria-hidden="true"
        >
          <path d="M 16 12 C 19.5 12, 27 21, 26.4 22 C 25.8 23, 14.2 21, 12.5 18 C 10.8 15, 14.8 4, 16 4 C 17.2 4, 21.2 15, 19.5 18 C 17.8 21, 6.2 23, 5.6 22 C 5 21, 12.5 12, 16 12 Z" />
        </svg>
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
