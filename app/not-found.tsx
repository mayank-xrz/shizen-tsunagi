import Link from "next/link";

// fan centers every 24px, half-overlapping — the fan at x=168 is missing:
// the row's connection visibly broken (design.md §9)
const centers = [0, 24, 48, 72, 96, 120, 144, 192, 216, 240, 264, 288];

export default function NotFound() {
  return (
    <main>
      <section>
        <div className="wrap">
          <svg
            className="wave-broken"
            viewBox="0 0 288 48"
            width="288"
            height="48"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              {centers.map((cx) => (
                <path
                  key={cx}
                  d={`M ${cx - 24} 48 A 24 24 0 0 1 ${cx + 24} 48 M ${cx - 16} 48 A 16 16 0 0 1 ${cx + 16} 48 M ${cx - 8} 48 A 8 8 0 0 1 ${cx + 8} 48`}
                />
              ))}
            </g>
          </svg>
          <h1>This page isn&rsquo;t connected.</h1>
          <p>
            <Link href="/">Go home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
