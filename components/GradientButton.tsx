import type { ReactNode } from "react";

/**
 * Primary CTA. Multi-hue gradient fill, accent glow that intensifies on hover,
 * and a light sheen that sweeps across on hover (pure CSS transition).
 */
export function GradientButton({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-violet to-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-10px_rgba(124,140,255,0.8)] transition-shadow duration-300 hover:shadow-[0_0_46px_-6px_rgba(124,140,255,0.95)] ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/3 z-0 w-1/3 -translate-x-[160%] skew-x-12 bg-white/30 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
      />
    </a>
  );
}

/** Secondary / ghost CTA on the glass surface. */
export function GhostButton({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-fg backdrop-blur transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] ${className}`}
    >
      {children}
    </a>
  );
}
