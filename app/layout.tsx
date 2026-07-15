import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const shippori = Shippori_Mincho({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
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
    <html lang="en" className={shippori.variable}>
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
