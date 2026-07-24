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
  description: string; // sensory copy — texture/aroma/process/origin, zero health claims (design.md v6 §4.4) — also the meta description
  benefits: string[];  // the shared pack claims — render joined as the detail Promise spec row
  ingredients: string[];
  base: string;        // spec-row Base value (design.md §4)
  cropY?: string;      // texture-crop origin height override — the §4 ladder's per-product offset; only packs whose window misses the shared zoom carry it
  image: StaticImageData; // static import of /products/{slug}.jpg
  hue: `var(--${string})`;     // deep-hue custom-property reference (design.md §2 hue table) — display type + numeral, the 30% layer
  hueWash: `var(--${string})`; // wash-ground custom-property reference (grounds only)
  peak: `var(--${string})`;    // peak variant (design.md v6 §3.3) — the 10% pop: dots, underlines, accent rules only, never grounds or text
};

// ingredient lists as printed on the pack (client-provided). savoury-mix
// still carries the earlier key-items list, pending the client's full list.
export const products: Product[] = [
  {
    slug: "chocolate-mix",
    name: "Chocolate Sweet Mix",
    tagline: "Multigrain nutrition mix powder with cocoa and almond",
    description:
      "Grains roasted slow to a deep malt, folded with cocoa pressed from farm-grown pods. Almond and dates round it warm and dark — the scent of a bakery, nothing added to fake it.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: [
      "Ragi",
      "Oats",
      "Pumpkin seeds",
      "Dates powder",
      "Cocoa bean",
      "Cocoa pod",
      "Almond",
    ],
    base: "Multigrain · organic",
    image: chocolateMix,
    hue: "var(--kogecha)",
    hueWash: "var(--kogecha-wash)",
    peak: "var(--kogecha-peak)",
  },
  {
    slug: "vanilla-mix",
    name: "Vanilla Sweet Mix",
    tagline: "Multigrain nutrition mix powder with vanilla and cashew",
    description:
      "Whole vanilla pods, split and dried slow, ground with cashew and oats until the mix carries their pale sweetness and the pod's own perfume. Quiet, cream-coloured, real.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: [
      "Ragi",
      "Oats",
      "Pumpkin seeds",
      "Dates powder",
      "Vanilla flower",
      "Vanilla pod",
      "Cashew",
    ],
    base: "Multigrain · organic",
    image: vanillaMix,
    hue: "var(--kin-iro)",
    hueWash: "var(--kin-iro-wash)",
    peak: "var(--kin-iro-peak)",
  },
  {
    slug: "berries-mix",
    name: "Berries Sweet Mix",
    tagline: "Multigrain nutrition mix powder with three berries and oats",
    description:
      "Blueberry, cranberry and strawberry, dried whole so the tartness stays sharp, milled into oats. Three berries from three seasons, one deep-rose spoonful.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: [
      "Ragi",
      "Oats",
      "Pumpkin seeds",
      "Dates powder",
      "Cranberry",
      "Blueberry",
      "Strawberry",
    ],
    base: "Multigrain · organic",
    image: berriesMix,
    hue: "var(--azuki)",
    hueWash: "var(--azuki-wash)",
    peak: "var(--azuki-peak)",
  },
  {
    slug: "fruit-mix",
    name: "Mixed Fruit Sweet Mix",
    tagline: "Multigrain nutrition mix powder with apple, banana and papaya",
    description:
      "Apple, banana and papaya, sun-dried until their sugars concentrate, then ground with dates and oats. The orchard does the sweetening — you can taste which fruit is which.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: [
      "Ragi",
      "Oats",
      "Pumpkin seeds",
      "Dates powder",
      "Apple",
      "Papaya",
      "Banana",
      "Mango",
    ],
    base: "Multigrain · organic",
    image: fruitMix,
    hue: "var(--kaki)",
    hueWash: "var(--kaki-wash)",
    peak: "var(--kaki-peak)",
  },
  {
    slug: "savoury-mix",
    name: "Savoury Mix",
    tagline: "Multigrain, seed and herb nutrition mix powder",
    description:
      "Moringa and millet milled fine with cumin, herbs dried in shade to hold their green. Toasty, grassy, faintly peppery — a field in a spoon.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Moringa", "Millet", "Cumin"],
    base: "Multigrain, seed & herb · organic",
    cropY: "88%", // the savoury pack's window sits lower than the other four

    image: savouryMix,
    hue: "var(--koke)",
    hueWash: "var(--koke-wash)",
    peak: "var(--koke-peak)",
  },
];

export type { Product };
