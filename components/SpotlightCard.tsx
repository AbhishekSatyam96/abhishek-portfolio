"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type SpotlightCardProps = {
  /** Underlying element — keep `article` where the card is self-contained content. */
  as?: "div" | "article";
  className?: string;
  /** Add a subtle cursor-driven 3D tilt (off under reduced motion / touch). */
  tilt?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/** Max tilt rotation, in degrees, at the card edges. */
const MAX_TILT = 6;

/**
 * Card surface with a cursor-following radial glow (CSS-driven via the
 * `.spotlight` / `.spotlight-glow` rules) and an optional 3D tilt. Pointer
 * position is written to CSS variables inside a rAF so moves stay cheap.
 */
export function SpotlightCard({
  as = "div",
  className = "",
  tilt = false,
  children,
  ...rest
}: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const elRef = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const enableTilt = tilt && !reduced;

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = elRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--spot-x", `${px}px`);
      el.style.setProperty("--spot-y", `${py}px`);
      if (enableTilt) {
        const rx = (0.5 - py / r.height) * MAX_TILT * 2;
        const ry = (px / r.width - 0.5) * MAX_TILT * 2;
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      }
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    const el = elRef.current;
    if (el && enableTilt) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };

  const setRef = (el: HTMLElement | null) => {
    elRef.current = el;
  };

  const props = {
    ref: setRef,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    className: `spotlight ${enableTilt ? "tilt" : ""} ${className}`.trim(),
    ...rest,
  };

  const inner = (
    <>
      <span aria-hidden="true" className="spotlight-glow" />
      {children}
    </>
  );

  return as === "article" ? (
    <article {...props}>{inner}</article>
  ) : (
    <div {...props}>{inner}</div>
  );
}
