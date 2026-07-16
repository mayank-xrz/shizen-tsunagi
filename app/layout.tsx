import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// design.md §3: the display face ships as exactly three committed woff2 files —
// latin 400 + 600 below and the six-glyph JP subset — all next/font/local.
// next/font/google would self-host Zen Old Mincho's whole JP family: 122
// preloaded chunks, 6.4 MB of fonts, 182 KB of render-blocking CSS — a blank
// first paint on slow connections (found in production, 2026-07-16).
const zenOldMincho = localFont({
  src: [
    { path: "./zen-old-mincho-latin-400.woff2", weight: "400" },
    { path: "./zen-old-mincho-latin-600.woff2", weight: "600" },
  ],
  variable: "--font-display",
});

// design.md §3: second Zen Old Mincho instance carrying only the six JP glyphs
// the site uses — woff2 pre-subsetted by Google's text= API since next/font has
// no text option (owner-approved). Same family as the display face, not a third font.
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
    <html lang="en" className={zenOldMincho.variable}>
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
