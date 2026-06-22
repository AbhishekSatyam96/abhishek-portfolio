import type { Variants, Transition } from "framer-motion";

/** Shared easing — matches the CSS aurora drift for one coherent feel. */
export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Staggered container: children fade-up in sequence on enter. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Fade-up with a slight blur-in — the signature entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Lighter fade-up for dense lists (tags, bullets). */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/** Reduced-motion variants: appear in place, no transform/blur. */
export const fadeStatic: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/** whileInView viewport config used across sections. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
