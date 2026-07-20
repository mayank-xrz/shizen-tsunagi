import type { CSSProperties, ReactNode } from "react";

// v6 · Ennichi pattern library (design.md §7). Six Edo motifs as inline-SVG
// <pattern> defs, generated as seamless tiles (scratchpad generator, geometry
// verified). Each kind is written ONCE here and INSTANTIATED per placement with
// a unique id: SVG resolves currentColor at the pattern's definition site, so a
// single shared def could never take a different hue per placement (the v5
// seigaiha lesson, generalized). Placement CSS sets `color` (the ink) and any
// opacity; `scale`/`angle` retile via patternTransform. Always aria-hidden —
// patterns carry no meaning.
export type PatternKind =
  | "seigaiha"
  | "asanoha"
  | "kikko"
  | "shippo"
  | "yagasuri"
  | "ichimatsu";

const TILES: Record<PatternKind, { w: number; h: number; ink: ReactNode }> = {
  // concentric wave scales, half-dropped rows
  seigaiha: {
    w: 24,
    h: 24,
    ink: (
      <path
        d="M 0 24 A 12 12 0 0 1 24 24 M 4 24 A 8 8 0 0 1 20 24 M 8 24 A 4 4 0 0 1 16 24 M -12 12 A 12 12 0 0 1 12 12 M -8 12 A 8 8 0 0 1 8 12 M -4 12 A 4 4 0 0 1 4 12 M 12 12 A 12 12 0 0 1 36 12 M 16 12 A 8 8 0 0 1 32 12 M 20 12 A 4 4 0 0 1 28 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    ),
  },
  // hemp-leaf six-point star lattice (spoked hexagons + leaf crossings)
  asanoha: {
    w: 27.71,
    h: 48,
    ink: (
      <path
        d="M0.00 40.00 L6.93 28.00 M34.64 20.00 L41.57 32.00 M13.86 -16.00 L27.71 -8.00 M27.71 16.00 L41.57 16.00 M27.71 24.00 L41.57 32.00 M13.86 48.00 L27.71 56.00 M0.00 40.00 L13.86 48.00 M20.78 28.00 L27.71 40.00 M20.78 52.00 L27.71 40.00 M13.86 32.00 L27.71 40.00 M27.71 40.00 L41.57 32.00 M6.93 4.00 L13.86 16.00 M20.78 -4.00 L27.71 8.00 M-0.00 56.00 L13.86 56.00 M20.78 44.00 L27.71 56.00 M0.00 40.00 L6.93 52.00 M0.00 32.00 L13.86 32.00 M-0.00 8.00 L13.86 8.00 M-13.86 16.00 L0.00 16.00 M27.71 -8.00 L27.71 8.00 M13.86 0.00 L27.71 8.00 M-6.93 28.00 L0.00 40.00 M-6.93 20.00 L0.00 8.00 M13.86 -16.00 L13.86 0.00 M13.86 16.00 L20.78 28.00 M6.93 52.00 L13.86 64.00 M0.00 16.00 L13.86 16.00 M20.78 20.00 L27.71 8.00 M41.57 16.00 L41.57 32.00 M-13.86 16.00 L0.00 8.00 M-0.00 8.00 L13.86 0.00 M13.86 16.00 L27.71 16.00 M20.78 4.00 L27.71 -8.00 M27.71 24.00 L27.71 40.00 M27.71 40.00 L34.64 28.00 M13.86 64.00 L27.71 56.00 M13.86 8.00 L27.71 8.00 M6.93 20.00 L13.86 32.00 M0.00 -8.00 L13.86 0.00 M13.86 -8.00 L27.71 -8.00 M27.71 40.00 L27.71 56.00 M13.86 32.00 L27.71 24.00 M13.86 0.00 L13.86 16.00 M13.86 56.00 L27.71 56.00 M-13.86 16.00 L-13.86 32.00 M6.93 44.00 L13.86 32.00 M0.00 24.00 L0.00 40.00 M13.86 32.00 L20.78 44.00 M-0.00 8.00 L6.93 -4.00 M13.86 48.00 L13.86 64.00 M-13.86 32.00 L0.00 24.00 M0.00 24.00 L13.86 16.00 M27.71 32.00 L41.57 32.00 M6.93 -4.00 L13.86 -16.00 M6.93 28.00 L13.86 16.00 M-13.86 16.00 L0.00 24.00 M-0.00 8.00 L13.86 16.00 M27.71 24.00 L41.57 16.00 M-0.00 56.00 L6.93 44.00 M13.86 32.00 L13.86 48.00 M13.86 16.00 L13.86 32.00 M13.86 40.00 L27.71 40.00 M13.86 -16.00 L20.78 -4.00 M27.71 8.00 L27.71 24.00 M13.86 32.00 L27.71 32.00 M13.86 16.00 L27.71 24.00 M-0.00 56.00 L13.86 48.00 M0.00 8.00 L6.93 20.00 M0.00 -8.00 L6.93 4.00 M27.71 8.00 L41.57 16.00 M13.86 32.00 L20.78 20.00 M13.86 48.00 L27.71 40.00 M27.71 8.00 L34.64 20.00 M13.86 16.00 L20.78 4.00 M0.00 40.00 L13.86 32.00 M0.00 -8.00 L13.86 -16.00 M-13.86 16.00 L-6.93 28.00 M13.86 64.00 L20.78 52.00 M-13.86 32.00 L0.00 40.00 M0.00 24.00 L13.86 32.00 M-13.86 32.00 L-6.93 20.00 M13.86 16.00 L27.71 8.00 M34.64 28.00 L41.57 16.00 M13.86 0.00 L27.71 -8.00 M0.00 8.00 L0.00 24.00 M0.00 40.00 L-0.00 56.00 M0.00 40.00 L13.86 40.00 M0.00 -8.00 L-0.00 8.00 M0.00 -8.00 L13.86 -8.00 M-0.00 56.00 L13.86 64.00 M-13.86 32.00 L0.00 32.00"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
      />
    ),
  },
  // tortoiseshell hexagon net
  kikko: {
    w: 24.25,
    h: 42,
    ink: (
      <path
        d="M12.12 -14.00 L24.25 -7.00 L24.25 7.00 L12.12 14.00 L-0.00 7.00 L0.00 -7.00 Z M12.12 28.00 L24.25 35.00 L24.25 49.00 L12.12 56.00 L-0.00 49.00 L0.00 35.00 Z M0.00 7.00 L12.12 14.00 L12.12 28.00 L0.00 35.00 L-12.12 28.00 L-12.12 14.00 Z M24.25 7.00 L36.37 14.00 L36.37 28.00 L24.25 35.00 L12.12 28.00 L12.12 14.00 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    ),
  },
  // seven-treasures interlocking circles
  shippo: {
    w: 20,
    h: 20,
    ink: (
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="0" cy="0" r="14.14" />
        <circle cx="20" cy="0" r="14.14" />
        <circle cx="0" cy="20" r="14.14" />
        <circle cx="20" cy="20" r="14.14" />
        <circle cx="10" cy="10" r="14.14" />
      </g>
    ),
  },
  // arrow-feather chevrons
  yagasuri: {
    w: 24,
    h: 24,
    ink: (
      <path
        d="M0 16 L12 4 L24 16 M0 28 L12 16 L24 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
  },
  // checkerboard
  ichimatsu: {
    w: 32,
    h: 32,
    ink: (
      <>
        <rect width="16" height="16" fill="currentColor" />
        <rect x="16" y="16" width="16" height="16" fill="currentColor" />
      </>
    ),
  },
};

export default function Pattern({
  kind,
  id,
  className,
  style,
  scale = 1,
  angle = 0,
}: {
  kind: PatternKind;
  id: string; // MUST be unique per placement (currentColor resolves at def site)
  className?: string;
  style?: CSSProperties;
  scale?: number;
  angle?: number;
}) {
  const t = TILES[kind];
  const transform =
    scale !== 1 || angle !== 0
      ? `scale(${scale}) rotate(${angle})`
      : undefined;
  return (
    <svg className={className} style={style} aria-hidden="true">
      <defs>
        <pattern
          id={id}
          width={t.w}
          height={t.h}
          patternUnits="userSpaceOnUse"
          patternTransform={transform}
        >
          {t.ink}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
