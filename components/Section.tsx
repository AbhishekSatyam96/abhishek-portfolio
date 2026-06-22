import type { ReactNode } from "react";

/**
 * Section — consistent landmark, max-width, padding and scroll offset (so the
 * sticky nav never covers anchored headings).
 */
export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        {children}
      </div>
    </section>
  );
}
