import Link from "next/link";
import Pattern from "@/components/Pattern";

// The fans win (design.md §9). A full seigaiha field is now everywhere — so the
// break reads as a single MISSING fan, not a lone broken row. The focal field
// is an explicit grid (one fan omitted); the atmosphere behind is the tiled
// pattern library.
const R = [12, 8, 4]; // three nested arcs per fan
const COLS = 7;
const ROWS = 5;
const STEP = 24; // fan spacing
const MISSING = { row: 2, col: 3 }; // the fan that isn't there — connection broken

// one fan: three upward semicircles centred on its baseline
const fan = (cx: number, cy: number) =>
  R.map((r) => `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`).join(" ");

export default function NotFound() {
  const fans: string[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (row === MISSING.row && col === MISSING.col) continue; // the gap
      const cx = col * STEP + (row % 2 ? STEP / 2 : 0) + STEP;
      const cy = row * (STEP / 2) + STEP;
      fans.push(fan(cx, cy));
    }
  }
  const w = (COLS + 1) * STEP;
  const h = ROWS * (STEP / 2) + STEP;

  return (
    <main>
      <section className="field-404">
        <Pattern kind="seigaiha" id="field-404" className="pat-fill field-404-pattern" scale={1.6} />
        <div className="wrap">
          <div className="plate-404">
            <svg
              className="wave-broken"
              viewBox={`0 0 ${w} ${h}`}
              width={w}
              height={h}
              aria-hidden="true"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                {fans.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            </svg>
            <h1>This page isn&rsquo;t connected.</h1>
            <p>
              <Link href="/">Go home</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
