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
  description: string; // poetic copy, composition/process register (design.md §7) — also the meta description
  benefits: string[];  // the shared pack claims — render joined as the detail Promise spec row
  ingredients: string[];
  base: string;        // spec-row Base value (design.md §4)
  cropY?: string;      // texture-crop origin height override — the §4 ladder's per-product offset; only packs whose window misses the shared zoom carry it
  image: StaticImageData; // static import of /products/{slug}.jpg
  hue: `var(--${string})`;     // deep-hue custom-property reference (design.md §2 hue table)
  hueWash: `var(--${string})`; // wash-ground custom-property reference (grounds only)
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
      "Stone-ground grains meet cocoa from farm-sourced pods. Almond and dates lend their sweetness — nothing else added, nothing taken away.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Cocoa pod", "Almond", "Dates", "Cacao bean"],
    base: "Multigrain · organic",
    image: chocolateMix,
    hue: "var(--kogecha)",
    hueWash: "var(--kogecha-wash)",
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "vanilla-mix",
    name: "Vanilla Sweet Mix",
    tagline: "Multigrain nutrition mix powder with vanilla and cashew",
    description:
      "Whole vanilla pods, dried slow and ground with cashew and oats. A pale, quiet mix that keeps the scent of the pod it began as.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Vanilla pod", "Cashew", "Oats"],
    base: "Multigrain · organic",
    image: vanillaMix,
    hue: "var(--kin-iro)",
    hueWash: "var(--kin-iro-wash)",
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "berries-mix",
    name: "Berries Sweet Mix",
    tagline: "Multigrain nutrition mix powder with three berries and oats",
    description:
      "Blueberry, cranberry and strawberry, dried whole and ground with oats. Three berries from three seasons, folded into one grain.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Blueberry", "Cranberry", "Strawberry", "Oats"],
    base: "Multigrain · organic",
    image: berriesMix,
    hue: "var(--azuki)",
    hueWash: "var(--azuki-wash)",
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "fruit-mix",
    name: "Mixed Fruit Sweet Mix",
    tagline: "Multigrain nutrition mix powder with apple, banana and papaya",
    description:
      "Apple, banana and papaya, sun-dried and ground with dates and oats. The orchard does the sweetening; the mill does the rest.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Apple", "Banana", "Papaya", "Dates", "Oats"],
    base: "Multigrain · organic",
    image: fruitMix,
    hue: "var(--kaki)",
    hueWash: "var(--kaki-wash)",
  },
  // ponytail: placeholder copy, replace when client delivers
  {
    slug: "savoury-mix",
    name: "Savoury Mix",
    tagline: "Multigrain, seed and herb nutrition mix powder",
    description:
      "Moringa and millet, ground fine with flax seed and cumin. Herbs dried in shade, seeds kept whole until milling day — a field mix, nothing more.",
    benefits: ["100% organic", "farm-sourced", "no preservatives"],
    ingredients: ["Moringa", "Millet", "Flax seed", "Cumin"],
    base: "Multigrain, seed & herb · organic",
    cropY: "88%", // the savoury pack's window sits lower than the other four

    image: savouryMix,
    hue: "var(--koke)",
    hueWash: "var(--koke-wash)",
  },
];

export type { Product };
