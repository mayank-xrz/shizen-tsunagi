import type { StaticImageData } from "next/image";
import berriesMix from "@/public/products/berries-mix.jpg";
import chocolateMix from "@/public/products/chocolate-mix.jpg";
import fruitMix from "@/public/products/fruit-mix.jpg";
import savouryMix from "@/public/products/savoury-mix.jpg";
import vanillaMix from "@/public/products/vanilla-mix.jpg";

type Product = {
  slug: string;        // chocolate-mix | vanilla-mix | berries-mix | fruit-mix | savoury-mix
  name: string;
  tagline: string;     // ≤10 words
  description: string; // 2–3 sentences
  benefits: string[];  // 3–5 items
  ingredients: string[];
  image: StaticImageData; // static import of /products/{slug}.jpg
};

// ponytail: ingredients are the key items from the pack front only — full
// ingredient lists owed by the client.
export const products: Product[] = [
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "chocolate-mix",
    name: "Chocolate Sweet Mix",
    tagline: "Multigrain nutrition mix powder with cocoa and almond",
    description:
      "A multigrain nutrition mix powder made with cocoa pod, almond, dates and cacao bean. 100% organic and farm-sourced, with no preservatives.",
    benefits: [
      "Multigrain base with cocoa pod, almond, dates and cacao bean",
      "100% organic, farm-sourced ingredients",
      "No preservatives",
      "Net quantity 200 g",
    ],
    ingredients: ["Cocoa pod", "Almond", "Dates", "Cacao bean"],
    image: chocolateMix,
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "vanilla-mix",
    name: "Vanilla Sweet Mix",
    tagline: "Multigrain nutrition mix powder with vanilla and cashew",
    description:
      "A multigrain nutrition mix powder made with vanilla pod, cashew and oats. 100% organic and farm-sourced, with no preservatives.",
    benefits: [
      "Multigrain base with vanilla pod, cashew and oats",
      "100% organic, farm-sourced ingredients",
      "No preservatives",
      "Net quantity 200 g",
    ],
    ingredients: ["Vanilla pod", "Cashew", "Oats"],
    image: vanillaMix,
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "berries-mix",
    name: "Berries Sweet Mix",
    tagline: "Multigrain nutrition mix powder with three berries and oats",
    description:
      "A multigrain nutrition mix powder made with blueberry, cranberry, strawberry and oats. 100% organic and farm-sourced, with no preservatives.",
    benefits: [
      "Multigrain base with blueberry, cranberry, strawberry and oats",
      "100% organic, farm-sourced ingredients",
      "No preservatives",
      "Net quantity 200 g",
    ],
    ingredients: ["Blueberry", "Cranberry", "Strawberry", "Oats"],
    image: berriesMix,
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "fruit-mix",
    name: "Mixed Fruit Sweet Mix",
    tagline: "Multigrain nutrition mix powder with apple, banana and papaya",
    description:
      "A multigrain nutrition mix powder made with apple, banana, papaya, dates and oats. 100% organic and farm-sourced, with no preservatives.",
    benefits: [
      "Multigrain base with apple, banana, papaya, dates and oats",
      "100% organic, farm-sourced ingredients",
      "No preservatives",
      "Net quantity 200 g",
    ],
    ingredients: ["Apple", "Banana", "Papaya", "Dates", "Oats"],
    image: fruitMix,
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "savoury-mix",
    name: "Savoury Mix",
    tagline: "Multigrain, seed and herb nutrition mix powder",
    description:
      "A multigrain, seed and herb nutrition mix powder made with moringa, millet, flax seed and cumin. 100% organic and farm-sourced, with no preservatives.",
    benefits: [
      "Multigrain base with moringa, millet, flax seed and cumin",
      "100% organic, farm-sourced ingredients",
      "No preservatives",
      "Net quantity 200 g",
    ],
    ingredients: ["Moringa", "Millet", "Flax seed", "Cumin"],
    image: savouryMix,
  },
];

export type { Product };
