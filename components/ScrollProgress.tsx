"use client";

import { m, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Thin gradient bar pinned to the top of the page that tracks read progress.
 * Springs for a fluid feel; binds the raw scroll value under reduced motion.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });
  const scaleX = reduced ? scrollYProgress : smooth;

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-80 h-[3px] origin-left bg-gradient-to-r from-primary via-violet to-accent"
    />
  );
}
