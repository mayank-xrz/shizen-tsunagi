import ProductRow from "@/components/ProductRow";
import { products } from "@/data/products";
import { zenOldMinchoJa } from "./layout";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>Nature&rsquo;s goodness, connected to you.</h1>
          <p>
            Five organic multigrain nutrition mixes, made from farm-sourced
            grains, nuts, fruits and herbs &mdash; coming soon.
          </p>
        </div>
        <p className="hero-rail">
          <span lang="ja" className={zenOldMinchoJa.className}>
            自然
          </span>{" "}
          nature
          <br />
          <span lang="ja" className={zenOldMinchoJa.className}>
            つなぎ
          </span>{" "}
          connection
        </p>
      </section>
      <section>
        {/* the product index (design.md §5): five ruled rows, a menu not a grid;
            each row carries its own preview image — the panel area is where
            they surface at ≥768px */}
        <ul className="wrap index">
          {products.map((product) => (
            <ProductRow key={product.slug} product={product} />
          ))}
        </ul>
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
