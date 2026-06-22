"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the framer-motion features this site uses (animation + variants +
 * whileInView), dropping the heavy layout/drag/projection code. `strict` enforces
 * the lightweight `m.*` components everywhere instead of the full `motion.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
