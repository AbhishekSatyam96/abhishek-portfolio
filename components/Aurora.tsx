/**
 * Aurora — the multi-hue "entropy" gradient mesh that grounds the whole site.
 *
 * Several blurred radial blobs (indigo / violet / cyan / faint magenta) drift on
 * independent CSS keyframes so the field never reads as a single flat blob. Pure
 * CSS: no JS, and the drift freezes automatically under prefers-reduced-motion.
 */

type AuroraProps = {
  /** "hero" = full drifting field; "section" = one soft anchored glow. */
  variant?: "hero" | "section";
  className?: string;
};

const blob = (gradient: string): React.CSSProperties => ({
  backgroundImage: gradient,
});

export function Aurora({ variant = "section", className = "" }: AuroraProps) {
  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {/* indigo — upper left */}
        <div
          className="animate-drift-a absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full blur-[80px] will-change-transform"
          style={blob(
            "radial-gradient(closest-side, rgba(91,91,245,0.45), rgba(91,91,245,0.12) 45%, transparent 72%)",
          )}
        />
        {/* violet — center right */}
        <div
          className="animate-drift-b absolute -right-[10%] top-[5%] h-[65vmax] w-[65vmax] rounded-full blur-[90px] will-change-transform"
          style={blob(
            "radial-gradient(closest-side, rgba(139,61,255,0.42), rgba(139,61,255,0.10) 46%, transparent 72%)",
          )}
        />
        {/* cyan — lower center */}
        <div
          className="animate-drift-c absolute bottom-[-25%] left-[20%] h-[60vmax] w-[60vmax] rounded-full blur-[80px] will-change-transform"
          style={blob(
            "radial-gradient(closest-side, rgba(34,211,238,0.34), rgba(34,211,238,0.09) 48%, transparent 72%)",
          )}
        />
        {/* faint magenta — upper right accent */}
        <div
          className="animate-drift-a absolute right-[8%] top-[-10%] h-[42vmax] w-[42vmax] rounded-full blur-[70px] will-change-transform"
          style={blob(
            "radial-gradient(closest-side, rgba(232,76,196,0.26), rgba(232,76,196,0.07) 50%, transparent 74%)",
          )}
        />
        {/* settle the bottom into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-bg" />
      </div>
    );
  }

  // Section glow — a single low-opacity anchored wash.
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={blob(
          "radial-gradient(closest-side, rgba(124,140,255,0.16), rgba(34,211,238,0.07) 50%, transparent 72%)",
        )}
      />
    </div>
  );
}
