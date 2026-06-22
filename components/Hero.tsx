"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero, site } from "@/content";
import { Aurora } from "@/components/Aurora";
import { LatticeField } from "@/components/LatticeField";
import { GradientButton, GhostButton } from "@/components/GradientButton";
import { fadeStatic, fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeStatic : fadeUp;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20"
    >
      {/* Signature background layers */}
      <Aurora variant="hero" />
      <LatticeField className="opacity-70 [mask-image:radial-gradient(120%_90%_at_50%_30%,#000_55%,transparent_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p variants={item} className="reveal eyebrow">
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="reveal mt-6 text-balance font-display text-[2.15rem] font-semibold leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="reveal mt-5 text-lg font-medium text-fg/90 sm:text-xl"
          >
            {hero.roleLine}
          </motion.p>

          <motion.p
            variants={item}
            className="reveal mt-3 font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl"
          >
            {hero.statement[0]}{" "}
            <span className="text-gradient">{hero.statement[1]}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="reveal mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            variants={item}
            className="reveal mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <GradientButton href={hero.primaryCta.href} ariaLabel="View selected work">
              {hero.primaryCta.label}
              <span aria-hidden="true">→</span>
            </GradientButton>
            <GhostButton href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </GhostButton>
          </motion.div>

          <motion.div
            variants={item}
            className="reveal mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs text-muted">
              {site.availability} · {site.location}
            </span>
          </motion.div>

          {/* Scannable proof points */}
          <motion.dl
            variants={item}
            className="reveal mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 sm:grid-cols-3"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="bg-white/[0.02] p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 flex justify-center"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-muted" />
        </span>
      </div>
    </section>
  );
}
