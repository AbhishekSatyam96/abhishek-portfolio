"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeStatic, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the entrance. */
  delay?: number;
  variants?: Variants;
};

/**
 * Single element that fades/blurs up when scrolled into view.
 * Honors prefers-reduced-motion (appears in place) and carries the `.reveal`
 * class so it's forced visible for no-JS via the <noscript> rule in layout.
 */
export function Reveal({ children, className, delay = 0, variants }: RevealProps) {
  const reduced = useReducedMotion();
  const v = reduced ? fadeStatic : variants ?? fadeUp;

  return (
    <m.div
      className={`reveal ${className ?? ""}`}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </m.div>
  );
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </m.div>
  );
}

/** Item inside <Stagger>. */
export function StaggerItem({
  children,
  className,
  variants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduced = useReducedMotion();
  const v = reduced ? fadeStatic : variants ?? fadeUp;
  return (
    <m.div className={`reveal ${className ?? ""}`} variants={v}>
      {children}
    </m.div>
  );
}
