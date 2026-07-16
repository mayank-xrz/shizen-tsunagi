import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section>
        <div className="wrap">
          {/* the hitofude that stops mid-stroke — the berry never closes,
              visibly unfinished (design.md §9) */}
          <svg
            className="hitofude hitofude-static"
            viewBox="0 0 200 200"
            width="160"
            height="160"
            aria-hidden="true"
          >
            <path
              pathLength={1}
              d="M 30 170 C 55 150, 75 120, 95 100 C 108 88, 120 78, 138 70 C 160 42, 184 42, 164 66 C 150 78, 142 78, 134 74 C 122 82, 110 92, 100 104 C 94 112, 90 118, 86 124 C 62 122, 52 148, 76 158"
            />
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
