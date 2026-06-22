/** Tiny lattice glyph used as the logomark (nodes + links = the lattice motif). */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="bm" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C8CFF" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d="M14 3 L25 14 L14 25 L3 14 Z M14 3 L14 25 M3 14 L25 14"
        stroke="url(#bm)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="14" cy="3" r="2" fill="url(#bm)" />
      <circle cx="25" cy="14" r="2" fill="url(#bm)" />
      <circle cx="14" cy="25" r="2" fill="url(#bm)" />
      <circle cx="3" cy="14" r="2" fill="url(#bm)" />
      <circle cx="14" cy="14" r="2.4" fill="#22D3EE" />
    </svg>
  );
}
