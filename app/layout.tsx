import type { Metadata } from "next";
import { Zen_Old_Mincho, Zen_Kaku_Gothic_New, DotGothic16 } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import Pattern from "@/components/Pattern";
import "./globals.css";

// v6 · Ennichi type — three families (design.md §3). All next/font/google (build
// -time, self-hosted, no runtime dep — runtime deps stay exactly four).

// Zen Old Mincho — the brand voice ("calm stallkeeper"): body + poetic copy +
// header wordmark + mincho kanji. Carries --font-display.
const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

// Zen Kaku Gothic New — the shouting: stall/chapter display names, festival-gate
// headline, stall signage, burst + seal glyphs. Carries --font-gothic.
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-gothic",
});

// DotGothic16 — pixel/price-tag energy: spec labels, catalog line, unit values,
// the marquee. Latin only (no JP rendered in it). Carries --font-tag.
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tag",
});

// Kanji subsets loaded next/font/local (next/font has no `text` option). The
// committed woff2s were pre-subsetted via Google's text= API and grep-verified
// (design.md §11). Same families as above — a span's className picks the face.
export const zenOldMinchoJa = localFont({
  src: "./zen-old-mincho-ja.woff2", // 19 mincho glyphs (identity, numerals, hue names)
  weight: "400",
});
export const zenKakuGothicNewJa = localFont({
  src: "./zen-kaku-gothic-new-ja.woff2", // 17 gothic glyphs (signage: numerals, hue kanji, 繋縁日祭)
  weight: "900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shizentsunagi.com"),
  title: "Shizen Tsunagi",
  description:
    "Organic multigrain nutrition mixes, farm-sourced and made with no preservatives. Five products, coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zenOldMincho.variable} ${zenKakuGothicNew.variable} ${dotGothic.variable}`}
    >
      <body>
        <header className="site-header">
          {/* a thin seigaiha rule across the top — the first pattern the eye
              meets, sage-inked (design.md §5) */}
          <Pattern kind="seigaiha" id="header-rule" className="header-rule" scale={0.5} />
          <div className="wrap">
            <Link href="/" className="brand">
              <Image
                src="/logo.png"
                alt="Shizen Tsunagi logo"
                width={388}
                height={416}
                className="brand-logo"
              />
              <span className="brand-name">Shizen Tsunagi</span>
              <span lang="ja" className={`brand-kanji ${zenOldMinchoJa.className}`}>
                自然つなぎ
              </span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          {/* a bold ichimatsu checker valance across the very top — the festival
              banner edge (design.md §7, the one full-opacity checker) */}
          <Pattern kind="ichimatsu" id="footer-check" className="footer-check" scale={0.5} />
          {/* the lantern row (design.md §5) — a string of paper lanterns on a
              cord, teal ground */}
          <div className="lantern-string" aria-hidden="true">
            <span className="lantern-cord" />
            {["hue-a", "hue-b", "hue-c", "hue-d", "hue-e", "gold"].map((t, i) => (
              <span key={i} className="lantern" data-tone={t} />
            ))}
          </div>
          <div className="wrap footer-inner">
            <Image
              src="/logo.png"
              alt="Shizen Tsunagi logo"
              width={388}
              height={416}
              className="brand-logo"
            />
            <p>Nature&rsquo;s goodness, connected to you.</p>
            <p>
              <a href="mailto:stsales@shizentsunagi.com">stsales@shizentsunagi.com</a>
            </p>
            <p>&copy; {new Date().getFullYear()} Shizen Tsunagi</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
