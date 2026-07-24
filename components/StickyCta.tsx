"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// mobile-only persistent reserve action (design.md v6 §4.1). Dismiss-safe (the
// × hides it for the session) and never covers the hero: it only appears once
// the visitor has scrolled past the first viewport, and the footer reserves
// bottom room so the closing content is never trapped. Hidden ≥768px via CSS
// (desktop uses the header CTA). Links to the home range strip (/#range) so it
// works from every page.
// ponytail: session-only dismiss (no persistence) — add localStorage only if
// the client wants the dismissal to survive reloads.
export default function StickyCta() {
  const [open, setOpen] = useState(true);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!open || !past) return null;
  return (
    <div className="sticky-cta">
      <Link className="btn sticky-cta-btn" href="/#range">
        Reserve the first batch
      </Link>
      <button
        type="button"
        className="sticky-cta-dismiss"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
      >
        &times;
      </button>
    </div>
  );
}
