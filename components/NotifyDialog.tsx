"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function NotifyDialog({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          product: slug,
          company: data.get("company"),
        }),
      });
      const json = await res.json().catch(() => null);
      setStatus(res.ok && json?.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setStatus("idle"); // reopening after success shows a fresh form
          ref.current?.showModal();
        }}
      >
        Notify me
      </button>
      <dialog ref={ref} className="notify-dialog">
        <button
          type="button"
          className="dialog-close"
          aria-label="Close"
          onClick={() => ref.current?.close()}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M 3 3 L 13 13 M 13 3 L 3 13" />
          </svg>
        </button>
        <h2 className="dialog-title">{name}</h2>
        {status === "success" ? (
          <p>You&rsquo;re on the list &mdash; we&rsquo;ll email you at launch.</p>
        ) : (
          <form onSubmit={submit}>
            <label>
              Email
              <input type="email" name="email" required autoComplete="email" />
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
            <button type="submit" className="btn" disabled={status === "sending"}>
              Notify me
            </button>
            {status === "error" && <p>Something went wrong. Try again.</p>}
          </form>
        )}
      </dialog>
    </>
  );
}
