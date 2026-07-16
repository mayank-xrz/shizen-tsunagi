import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section>
        <div className="wrap">
          {/* the thread, ending visibly unconnected — no gold join (design.md §9) */}
          <svg
            className="thread-divider"
            viewBox="0 0 120 24"
            width="120"
            height="24"
            aria-hidden="true"
          >
            <path d="M 2 12 C 30 2, 50 22, 62 12 S 84 6, 92 10" />
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
