import type { CSSProperties } from "react";
import { zenKakuGothicNewJa } from "@/app/layout";

// v6 · Ennichi seal system (design.md §5). Hanko-style stamp badges — a double
// ring + a centered glyph — rotated 2–6° with imperfect placement, recurring
// through the page (chapter numbers, the 繋 mark, festival marks). Decorative:
// the informative equivalent lives in headings/catalog lines, so the glyph is
// aria-hidden and its contrast is record-only (§8). "tone" sets the ink via a
// data-attribute the CSS maps to gold / the dominant hue / a guest.
export function Seal({
  glyph,
  tone = "gold",
  rotate = -4,
  size = 88,
  className = "",
  knockout = false,
  style,
}: {
  glyph: string; // JP signage glyph — rendered in the fat gothic subset
  tone?: "gold" | "hue" | "guest-1" | "guest-2" | "guest-3" | "guest-4" | "teal";
  rotate?: number;
  size?: number;
  className?: string;
  knockout?: boolean; // filled disc + cream glyph, vs. inked outline + tone glyph
  style?: CSSProperties;
}) {
  return (
    <span
      className={`seal ${knockout ? "seal-knockout" : ""} ${className}`}
      data-tone={tone}
      aria-hidden="true"
      style={
        {
          "--seal-size": `${size}px`,
          "--seal-rot": `${rotate}deg`,
          ...style,
        } as CSSProperties
      }
    >
      <span lang="ja" className={`seal-glyph ${zenKakuGothicNewJa.className}`}>
        {glyph}
      </span>
    </span>
  );
}

// 12-point chirashi price-burst (generated, verified). Fills the dominant hue,
// gold ring, cream burst text ≥1.17rem bold (AA-large on every hue, §8). Loud by
// design — this is the "Coming soon" announcement, not a quiet eyebrow.
const BURST_POINTS =
  "50.0,0.0 59.6,14.3 75.0,6.7 76.2,23.8 93.3,25.0 85.7,40.4 100.0,50.0 85.7,59.6 93.3,75.0 76.2,76.2 75.0,93.3 59.6,85.7 50.0,100.0 40.4,85.7 25.0,93.3 23.8,76.2 6.7,75.0 14.3,59.6 0.0,50.0 14.3,40.4 6.7,25.0 23.8,23.8 25.0,6.7 40.4,14.3";

export function Burst({
  lines,
  rotate = 5,
  size = 132,
  className = "",
  style,
}: {
  lines: string[]; // announcement text, one <tspan>-style line per entry
  rotate?: number;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`burst ${className}`}
      role="img"
      aria-label={lines.join(" ")}
      style={
        {
          "--burst-size": `${size}px`,
          "--burst-rot": `${rotate}deg`,
          ...style,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 100 100" className="burst-star" aria-hidden="true">
        <polygon points={BURST_POINTS} />
      </svg>
      <span className="burst-text" aria-hidden="true">
        {lines.map((line) => (
          <span key={line} className="burst-line">
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}
