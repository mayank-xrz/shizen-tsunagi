"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type Review = { name: string; rating: number; comment: string; ts: string };
type Feed = { average: number; count: number; reviews: Review[] };
type Load = "loading" | "ready" | "error";
type Send = "idle" | "sending" | "success" | "error";

const NAME_MAX = 40;
const COMMENT_MAX = 500;

function Stars({ filled }: { filled: number }) {
  // five inline-SVG stars, first `filled` in gold; the rest outline
  return (
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" width="18" height="18" className={n <= filled ? "star on" : "star"}>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L2.4 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewSection({
  slug,
  productName,
  hue,
}: {
  slug: string;
  productName: string;
  hue: string;
}) {
  const [load, setLoad] = useState<Load>("loading");
  const [feed, setFeed] = useState<Feed>({ average: 0, count: 0, reviews: [] });
  const [rating, setRating] = useState(0);
  const [send, setSend] = useState<Send>("idle");

  useEffect(() => {
    let live = true;
    fetch(`/api/reviews/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Feed) => live && (setFeed(data), setLoad("ready")))
      .catch(() => live && setLoad("error"));
    return () => {
      live = false;
    };
  }, [slug]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const comment = String(data.get("comment") ?? "").trim();
    // client-side checks mirror the server; the server stays the trust boundary
    if (!name || name.length > NAME_MAX || rating < 1 || rating > 5 || !comment || comment.length > COMMENT_MAX) {
      setSend("error");
      return;
    }
    setSend("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: slug,
          name,
          rating,
          comment,
          company: data.get("company"),
        }),
      });
      const json = await res.json().catch(() => null);
      setSend(res.ok && json?.ok ? "success" : "error");
    } catch {
      setSend("error");
    }
  }

  return (
    <section
      id="reviews"
      className="reviews"
      aria-label={`Reviews of ${productName}`}
      style={{ "--hue": hue } as CSSProperties}
    >
      <h2 className="reviews-heading">Reviews</h2>

      {load === "loading" && <p>Loading reviews…</p>}
      {load === "error" && <p>Reviews couldn&rsquo;t load. Try again later.</p>}

      {load === "ready" && (
        <>
          {feed.count > 0 ? (
            <p className="reviews-average">
              <Stars filled={Math.round(feed.average)} />
              <span>
                {feed.average} out of 5 &middot; {feed.count}{" "}
                {feed.count === 1 ? "review" : "reviews"}
              </span>
            </p>
          ) : (
            <p className="reviews-empty">No reviews yet &mdash; be the first.</p>
          )}

          <ul className="review-list">
            {feed.reviews.map((r, i) => (
              <li key={i} className="review-item">
                <Stars filled={r.rating} />
                <p className="label review-meta">
                  {r.name} &middot;{" "}
                  {new Date(r.ts).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="review-comment">{r.comment}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {send === "success" ? (
        <p className="review-thanks">Thank you &mdash; your review appears once approved.</p>
      ) : (
        <form className="review-form" onSubmit={submit}>
          <h3 className="review-form-title">Write a review</h3>
          <fieldset className="review-rating">
            <legend>Your rating</legend>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="star-radio">
                <input
                  className="visually-hidden"
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  required
                />
                <span className="visually-hidden">
                  {n} star{n > 1 ? "s" : ""}
                </span>
                <svg viewBox="0 0 20 20" width="28" height="28" className={n <= rating ? "star on" : "star"} aria-hidden="true">
                  <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L2.4 7.7l5.8-.8z" />
                </svg>
              </label>
            ))}
          </fieldset>
          <label className="review-field">
            Name
            <input type="text" name="name" maxLength={NAME_MAX} required autoComplete="name" />
          </label>
          <label className="review-field">
            Comment
            <textarea name="comment" maxLength={COMMENT_MAX} rows={4} required />
          </label>
          {/* honeypot: bots fill it, humans never see it — no validation attributes */}
          <input
            className="visually-hidden"
            type="text"
            name="company"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />
          <button type="submit" className="btn" disabled={send === "sending"}>
            Submit review
          </button>
          {send === "error" && <p>Something went wrong. Try again.</p>}
        </form>
      )}
    </section>
  );
}
