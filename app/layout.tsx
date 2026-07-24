import type { Metadata } from "next";
import { Zen_Old_Mincho } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import StickyCta from "@/components/StickyCta";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  // 700 enters at v4 for the hero and product names (design.md §3)
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

// design.md §3: second Zen Old Mincho instance carrying only the 19 JP glyphs
// the site renders (identity, ghost numerals, hue names) — woff2 pre-subsetted
// by Google's text= API since next/font has no text option (owner-approved).
// Same family as the display face, not a third font.
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
          <div className="wrap site-header-inner">
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
            {/* the persistent primary action (v6 §4.1) — desktop; scrolls to the
                range strip / pack picker. */}
            <Link className="btn-outline header-cta" href="/#range">
              Reserve the first batch
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>
        {children}
        {/* mobile answer to the header CTA (v6 §4.1): dismiss-safe sticky */}
        <StickyCta />
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
