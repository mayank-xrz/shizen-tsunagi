import type { CSSProperties } from "react";
import Chapter, { numerals } from "@/components/Chapter";
import { products } from "@/data/products";
import { zenOldMinchoJa } from "./layout";

export default function Home() {
  return (
    <main>
      {/* progress + index rail (design.md §4) — home only, ≥768px; the fill
          rides a scroll() timeline, the numerals anchor to the chapters */}
      <nav className="rail" aria-label="Products">
        {products.map((product, index) => (
          <a
            key={product.slug}
            href={`#chapter-${product.slug}`}
            className="rail-link"
            aria-label={product.name}
          >
            <span lang="ja" className={zenOldMinchoJa.className} aria-hidden="true">
              {numerals[index]}
            </span>
          </a>
        ))}
        <span className="rail-track" aria-hidden="true">
          <span className="rail-fill" />
        </span>
      </nav>
      {/* manifesto (design.md §4/§5): botanical plate left, copy + CTA right */}
      <section className="manifesto">
        <div className="wrap manifesto-grid">
          {/* the five, drawn from one — two millet stalks (the shared base)
              with the five variant motifs around them, each tagged 一–五
              (design.md §5). Ink-only per the color law; opacity 0.85;
              base state is the finished plate, the entry draw only overrides
              it under motion-ok (design.md §6). Inline, single-use. */}
          <div className="manifesto-art">
            <svg className="plate" viewBox="0 0 400 640" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <g id="ground" className="plate-part">
                <path className="draw" pathLength="1" strokeWidth="1.75" d="M 60 628.4 C 82 626.1, 103 629.6, 127 627.6 C 151 625.4, 176 629.0, 210 626.2" />
              </g>
              <g id="stalks" className="plate-part">
                <path className="stem draw" pathLength="1" strokeWidth="1.75" d="M 90 620 C 97 545, 104 470, 114 398 C 121 345, 132 268, 141 210 C 144 185, 147 158, 148.5 140" />
                <path className="stem draw" pathLength="1" strokeWidth="1.75" d="M 140 625 C 145 560, 156 480, 173 400 C 184 348, 199 288, 213 244 C 218 228, 224 214, 228.5 204" />
                <g className="head head-a">
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 146.7 143.9 Q 151.2 143.4, 155.6 143.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 145.5 139.8 Q 142.3 137.1, 138.9 133.7" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 148.1 136.4 Q 151.1 136.1, 155.1 134.3" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 147 130.2 Q 143.6 129.7, 141.9 127.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 150.2 127 Q 155.2 127.1, 158.6 127.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 150.6 125 Q 149.2 122.4, 145.7 117.9" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 154.3 120.9 Q 157.1 119.4, 161.8 119.5" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 155.1 117.4 Q 152.5 115.1, 151.9 111.2" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 158.3 112.8 Q 161.2 111.9, 165.8 112.5" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 161.7 112.8 Q 163.5 108.2, 163.7 104.6" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 164.6 110.1 Q 168.4 110.4, 171.7 109.2" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 167.7 109.3 Q 170.9 107.3, 174 104.2" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 172.6 109.5 Q 174.8 109.7, 178.3 111.5" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 176.3 109.7 Q 179.9 107.6, 181.9 107.4" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 178.8 109.8 Q 181.4 113.7, 183.4 117.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 184.1 112.7 Q 187.2 113.6, 191.2 114.3" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 186.8 115.6 Q 189.5 120, 189.9 123.3" />
                  <ellipse className="fade" cx="143.3" cy="139" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(5.5 143.3 139)" />
                  <ellipse className="fade" cx="149.8" cy="134" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(-4.1 149.8 134)" />
                  <ellipse className="fade" cx="146" cy="129" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(16.8 146 129)" />
                  <ellipse className="fade" cx="152.3" cy="124.5" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(28.6 152.3 124.5)" />
                  <ellipse className="fade" cx="150.8" cy="115.3" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(28 150.8 115.3)" />
                  <ellipse className="fade" cx="160.3" cy="115.9" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(56.2 160.3 115.9)" />
                  <ellipse className="fade" cx="161.7" cy="107.8" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(46.9 161.7 107.8)" />
                  <ellipse className="fade" cx="168.2" cy="111.7" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(83.2 168.2 111.7)" />
                  <ellipse className="fade" cx="174.5" cy="105.2" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(82.2 174.5 105.2)" />
                  <ellipse className="fade" cx="177.5" cy="110.8" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(127.5 177.5 110.8)" />
                  <ellipse className="fade" cx="186" cy="112.5" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(122.1 186 112.5)" />
                </g>
                <g className="head head-b">
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 227.4 207.3 Q 232 206.6, 236.3 207" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 227.5 202.5 Q 225.3 200.4, 222.9 198.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 230 198.1 Q 233.4 196.9, 236.8 197.5" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 230.5 193.2 Q 229.5 188.8, 228.1 186.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 235.9 190.7 Q 238.8 191.9, 242 192.8" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 238.1 188.4 Q 237.8 184.8, 236.7 179.7" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 243.5 187.6 Q 245.9 189.7, 247.6 192.3" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 248.7 186.5 Q 251.3 184.7, 253.6 182" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 251.2 187.2 Q 251.5 190.8, 252.8 193.2" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 255.4 189.4 Q 259.2 189.3, 263.8 189.3" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 257.9 193.4 Q 257.3 197.3, 258.7 201.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 262.4 195.7 Q 264.8 197.5, 267.2 201.1" />
                  <path className="draw" pathLength="1" strokeWidth="1.25" d="M 262.4 200.2 Q 263.1 203.7, 262.1 206.3" />
                  <ellipse className="fade" cx="223.7" cy="203" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(18 223.7 203)" />
                  <ellipse className="fade" cx="232.7" cy="198.9" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(18 232.7 198.9)" />
                  <ellipse className="fade" cx="231.5" cy="190.9" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(38 231.5 190.9)" />
                  <ellipse className="fade" cx="239.4" cy="189.8" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(34 239.4 189.8)" />
                  <ellipse className="fade" cx="243.5" cy="184.2" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(90.7 243.5 184.2)" />
                  <ellipse className="fade" cx="249" cy="188.8" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(99.1 249 188.8)" />
                  <ellipse className="fade" cx="256.2" cy="185.7" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(141.4 256.2 185.7)" />
                  <ellipse className="fade" cx="255.7" cy="194.4" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(147.6 255.7 194.4)" />
                  <ellipse className="fade" cx="265" cy="196.3" rx="2.5" ry="4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(148.1 265 196.3)" />
                </g>
              </g>
              {/* motif-1 · chocolate · cocoa pod (design.md §3) */}
              <g id="motif-1" className="motif" transform="rotate(6 300 140)">
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 297 113 C 306 114.5, 313.5 124, 315.8 138 C 317.8 150.5, 315 162, 307.5 169 C 304.5 171.8, 301 172.8, 298 172 C 291.5 170, 286.8 163.5, 284.8 153 C 282.6 141, 284.8 127.5, 290.5 118.5 C 292.5 115.5, 294.6 113.6, 297 113 Z" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 297 113 Q 295.5 108.5, 296.5 105" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 298.6 116 C 297.8 132, 298.4 152, 299.4 168.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 293 118.5 C 289.8 130, 289.4 147, 292 162.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 304 117.5 C 307.6 130, 308.8 148, 305.8 165.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 288 124.5 C 285.6 134, 285.6 148, 288 156.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 309.5 122.5 C 312.6 135, 313 150, 309.8 161.5" />
                <ellipse className="fade" cx="325" cy="168" rx="3.5" ry="2.4" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(-24 325 168)" />
                <ellipse className="fade" cx="331.5" cy="174.5" rx="3.4" ry="2.3" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(14 331.5 174.5)" />
              </g>
              {/* motif-2 · vanilla · bean pods (design.md §3) */}
              <g id="motif-2" className="motif" transform="rotate(-4 60 260)">
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 53 222 C 50.5 245, 53 270, 61 288 C 62.8 292, 64.8 295, 67 297.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 54.8 221.5 C 52.5 245, 55 269, 63 286.5 C 64.6 290.5, 65.8 294, 67 297.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 64 225 C 61.5 247, 57.5 268, 51.5 285 C 50.2 288.7, 48.7 292, 47 295" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 65.8 225.5 C 63.5 247.5, 59.5 268, 53.8 286 C 52.3 289.3, 49.7 292.5, 47 295" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 50 240.5 l 4 0.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 50.6 255.5 l 4.1 0.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 53.4 270 l 3.9 0.8" />
              </g>
              {/* motif-3 · berries · berry sprig (design.md §3) */}
              <g id="motif-3" className="motif" transform="rotate(-6 310 330)">
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 296 302 C 303 313, 309 325, 312.5 339 C 314 345, 314.4 350.5, 314 355.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 309.5 331 C 316 333.5, 322.5 337, 327 342" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 304.5 317 C 299 320.5, 294.5 325.5, 291 332" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 291 332 Q 289.5 335, 289.3 337.6" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 327 342 Q 329.5 344, 330.6 346.4" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 314 355.5 Q 313.9 358, 313.7 360.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 311 344 Q 305.5 346.5, 303.2 349.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 318.5 336.5 Q 321 333.5, 321.9 331.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 311.8 360.2 A 6.5 6.5 0 1 1 307.4 364.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 330.6 346.5 A 6 6 0 1 1 327.2 350.6" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 287.8 338 A 5.5 5.5 0 1 1 283.4 341.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 322.1 321.7 A 5 5 0 1 1 318.7 325.3" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 298 349 A 7 7 0 1 1 293.6 354.6" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 299.5 306.5 C 293.5 304.5, 288.5 305.5, 284.5 309.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 284.5 309.5 C 289 311.8, 294.5 311, 299.8 307.8" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 307.5 314.5 C 312.5 310.5, 318.5 309.5, 323.5 311.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 323.5 311.5 C 319.5 315.5, 313.5 316.8, 307.9 315.1" />
              </g>
              {/* motif-4 · fruit · halved apple — lead ingredient is apple, not
                  date (data/products.ts); swap logged in memory.md (design.md §3) */}
              <g id="motif-4" className="motif" transform="rotate(8 70 430)">
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 75.5 411.5 C 71.5 409.5, 67 410.5, 64.5 413.5 C 61.5 410.8, 56.5 410.2, 53 412.8 C 48.5 416.2, 47 422.5, 49 428 C 51 433.8, 56.5 437.8, 62 437.2 C 67.8 438.2, 73.5 434.5, 75.8 429 C 78 423.2, 77.5 415.8, 75.5 411.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 64.5 413.5 Q 64 409, 65.5 405.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 81 423 C 84.5 421, 88.5 420.8, 92 422.5 C 97.5 425.2, 101 430.8, 101 437 C 101 443.5, 97 448.8, 91 450.5 C 88 451.3, 84.8 450.8, 82 449.5 C 81.3 445, 81 440.5, 80.9 436 C 80.8 431.5, 80.8 427.3, 81 423 Z" />
                <ellipse className="fade" cx="89.5" cy="436.5" rx="2.4" ry="3.8" fill="currentColor" fillOpacity="0.35" stroke="none" transform="rotate(9 89.5 436.5)" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 66 407 C 70 402.5, 75.5 400.5, 80.5 401.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 80.5 401.5 C 77 405.5, 71.5 407.5, 66.2 407.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 68.5 405.7 C 71.5 404, 74.5 402.8, 77.8 402.3" />
              </g>
              {/* motif-5 · savoury · herb sprig + seeds (design.md §3) */}
              <g id="motif-5" className="motif" transform="rotate(-5 300 480)">
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 298.5 455 C 300.8 468, 302.2 484, 301.2 498 C 300.8 504.5, 300.6 510.5, 300.8 515.5" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 299.2 461.5 C 294 458, 289.5 457.5, 286.5 460 C 288.5 461.8, 291.5 462, 294.5 461.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 299.8 463.5 C 305 460.2, 309.8 460, 312.5 462.8 C 310 464.4, 306.8 464.5, 303.8 463.6" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 300.6 474 C 295.2 470.8, 290.2 470.5, 287 473.2 C 289.5 475.2, 292.8 475.4, 296.2 474.4" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 301.2 476.5 C 306.5 473.2, 311.5 473.2, 314.5 476.2 C 311.5 478, 308 478, 304.8 477" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 301.6 488 C 296.8 485.2, 292.5 485.2, 289.8 487.8 C 292.2 489.6, 295.4 489.7, 298.4 488.8" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 301.8 490.5 C 306.4 487.8, 310.5 487.8, 313 490.4 C 310.5 492, 307.4 492, 304.6 491.2" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 301.2 502 C 297.2 499.8, 293.8 499.9, 291.5 502.2 C 293.6 503.8, 296.4 503.9, 299 503" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 301.4 504.5 C 305.2 502.4, 308.6 502.5, 310.8 504.8 C 308.6 506.2, 305.8 506.2, 303.4 505.4" />
                <path className="draw" pathLength="1" strokeWidth="1.5" d="M 298.5 455 C 297.2 450.5, 297.8 447, 300.5 444.5 C 301.6 447.5, 301.2 450.8, 299.6 453.6" />
                <circle className="fade" cx="296.5" cy="527" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="fade" cx="304.5" cy="539.5" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="fade" cx="299.5" cy="552.5" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
              </g>
              {/* numeral legend — one chapter numeral under each motif; the
                  committed subset covers 一二三四五 (design.md §3). Hidden <768px. */}
              <g id="legend" className="plate-legend">
                <text className={`fade ${zenOldMinchoJa.className}`} x="302" y="196" fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.55" stroke="none" lang="ja">一</text>
                <text className={`fade ${zenOldMinchoJa.className}`} x="57" y="322" fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.55" stroke="none" lang="ja">二</text>
                <text className={`fade ${zenOldMinchoJa.className}`} x="310" y="389" fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.55" stroke="none" lang="ja">三</text>
                <text className={`fade ${zenOldMinchoJa.className}`} x="72" y="470" fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.55" stroke="none" lang="ja">四</text>
                <text className={`fade ${zenOldMinchoJa.className}`} x="299" y="571" fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.55" stroke="none" lang="ja">五</text>
              </g>
              <g id="scatter" className="plate-part">
                <circle className="drift" cx="247" cy="314" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="269" cy="345" r="2" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="302" cy="371" r="3" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="327" cy="386" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="345" cy="416" r="2" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="361" cy="450" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="374" cy="484" r="3" fill="currentColor" fillOpacity="0.6" stroke="none" />
                <circle className="drift" cx="386" cy="521" r="2" fill="currentColor" fillOpacity="0.6" stroke="none" />
              </g>
            </svg>
          </div>
          <div className="manifesto-text">
            <p className="manifesto-kanji" aria-hidden="true">
              <span lang="ja" className={zenOldMinchoJa.className}>
                繋
              </span>
            </p>
            <h1 className="manifesto-headline">Goodness lives in the detail.</h1>
            {/* ponytail: placeholder copy, replace when client delivers */}
            <p className="manifesto-body">
              The sheen of a grain. The scent of a pod just opened. Every mix we
              make begins on a farm and ends in your hands, carrying nothing it
              didn&rsquo;t grow with.
            </p>
            <p className="manifesto-body">
              Five recipes, drawn from soil and season. See them, one by one.
            </p>
            {/* quiet manifesto CTA (v6 §4.3) — leads into the range strip so a
                visitor grasps all five in one screen. The reserve action lives
                in the header/sticky CTA. ponytail: final copy for client. */}
            <a className="manifesto-cta" href="#range">
              Meet the five
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
        {/* tategaki rail — JP glyphs only (design.md §5) */}
        <p className="manifesto-rail" aria-hidden="true">
          <span lang="ja" className={zenOldMinchoJa.className}>
            自然
          </span>
          <span lang="ja" className={zenOldMinchoJa.className}>
            つなぎ
          </span>
        </p>
      </section>
      {/* meet-all-five range strip (v6 §4.3): the whole range graspable in one
          screen — peak-dot chips jump to the chapters; also the mobile answer
          to the desktop rail */}
      <section id="range" className="range">
        <div className="wrap">
          <p className="range-eyebrow">
            <span lang="ja" className={`range-ja ${zenOldMinchoJa.className}`}>
              旬
            </span>
            Five mixes, each at its peak
          </p>
          <ul className="range-chips">
            {products.map((product) => (
              <li key={product.slug}>
                <a
                  className="range-chip"
                  href={`#chapter-${product.slug}`}
                  style={{ "--peak": product.peak } as CSSProperties}
                >
                  <span className="range-dot" aria-hidden="true" />
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
          {/* honest urgency (v6 §4.5) — ponytail: ship window for client */}
          <p className="range-note">
            First batch ships September. Reserve your pack below.
          </p>
        </div>
      </section>
      {/* five catalog chapters (design.md §4), one full-viewport room each */}
      {products.map((product, index) => (
        <Chapter key={product.slug} product={product} index={index} />
      ))}
      {/* the grower, elevated (v6 §4.6): provenance converts for clean-label
          food. Cream ground, honest lines, NO fake imagery. ponytail copy. */}
      <section className="grower">
        <div className="wrap grower-inner">
          <p className="grower-eyebrow">Provenance</p>
          <h2 className="grower-heading">
            Grown on one farm, not sourced from many.
          </h2>
          <p className="grower-lede">
            Every mix starts on a single farm &mdash; the same soil, the same
            hands, from seed to the day it&rsquo;s milled.
          </p>
          <p>
            Grains are roasted in small batches, fruit dried whole, herbs in
            shade. What goes in is printed on the pack in full &mdash; the
            ingredient list is the whole pitch, and we keep it short on purpose.
          </p>
        </div>
      </section>
    </main>
  );
}
