import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// v6 (owner-directed 2026-07-18, hero-design reskin): Cormorant Garamond is the
// display + body serif, IBM Plex Mono the label/eyebrow face — the two Latin
// faces from the hero design.
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

// Kanji stays on the committed pre-subsetted Zen Old Mincho woff2 — a JP serif
// that already covers every glyph the site renders (identity, numerals, hue
// names), so no new font fetch. It stands in for the design's Noto Serif JP.
export const zenOldMinchoJa = localFont({
  src: "./zen-old-mincho-ja.woff2",
  weight: "400",
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
    <html lang="en" className={`${cormorant.variable} ${plexMono.variable}`}>
      <body>
        <header className="site-header">
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
              <span
                lang="ja"
                className={`brand-kanji ${zenOldMinchoJa.className}`}
              >
                自然つなぎ
              </span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap">
            <Image
              src="/logo.png"
              alt="Shizen Tsunagi logo"
              width={388}
              height={416}
              className="brand-logo"
            />
            <p>Nature&rsquo;s goodness, connected to you.</p>
            <p>
              <a href="mailto:stsales@shizentsunagi.com">
                stsales@shizentsunagi.com
              </a>
            </p>
            <p>&copy; {new Date().getFullYear()} Shizen Tsunagi</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
