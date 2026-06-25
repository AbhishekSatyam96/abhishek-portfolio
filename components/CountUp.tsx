"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";

/**
 * Animates a single integer up from zero once `active` is true. Initial state is
 * the target so the server render (and any no-JS client) shows the real number —
 * the count-down to zero only happens after JS hydrates and the stat scrolls in.
 */
function Num({
  target,
  active,
  duration,
}: {
  target: number;
  active: boolean;
  duration: number;
}) {
  const [n, setN] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const controls = animate(0, target, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, duration]);

  return <>{n}</>;
}

/**
 * Renders a stat string ("7 yrs", "up to 50%", "22% → 72%") with every numeric
 * token counting up when scrolled into view. Surrounding text and symbols are
 * preserved verbatim. Honors prefers-reduced-motion (renders the value as-is).
 */
export function CountUp({
  value,
  className,
  duration = 1.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{value}</span>;
  }

  // split keeps the digit groups as their own tokens: "up to 50%" -> ["up to ", "50", "%"]
  const parts = value.split(/(\d+)/);

  return (
    <span ref={ref} className={className}>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <Num key={i} target={Number(part)} active={inView} duration={duration} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
