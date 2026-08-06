"use client";

import { m, useReducedMotion } from "framer-motion";
import { hero, site } from "@/content";
import { Aurora } from "@/components/Aurora";
import { LatticeField } from "@/components/LatticeField";
import { GradientButton, GhostButton } from "@/components/GradientButton";
import { Magnetic } from "@/components/Magnetic";
import { CountUp } from "@/components/CountUp";
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
        <m.div
          variants={staggerContainer(0.08, 0.04)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <m.p variants={item} className="reveal eyebrow">
            {hero.eyebrow}
          </m.p>

          <m.h1
            variants={item}
            className="reveal mt-6 text-balance font-display text-[2.15rem] font-semibold leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {site.name}
          </m.h1>

          <m.p
            variants={item}
            className="reveal mt-5 text-lg font-medium text-fg/90 sm:text-xl"
          >
            {hero.roleLine}
          </m.p>

          <m.p
            variants={item}
            className="reveal mt-3 font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl"
          >
            {hero.statement[0]}{" "}
            <span className="text-gradient">{hero.statement[1]}</span>
          </m.p>

          <m.p
            variants={item}
            className="reveal mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.intro}
          </m.p>

          <m.div
            variants={item}
            className="reveal mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <GradientButton href={hero.primaryCta.href} ariaLabel="View selected work">
                {hero.primaryCta.label}
                <span aria-hidden="true">→</span>
              </GradientButton>
            </Magnetic>
            <Magnetic>
              <GhostButton href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </GhostButton>
            </Magnetic>
          </m.div>

          {/* Availability pill. Carries notice period and relocation alongside
              the role and city — the four things a recruiter would otherwise
              spend a screening call establishing. rounded-2xl rather than
              rounded-full because the copy wraps to two lines on narrow
              viewports, and a wrapped pill with fully round ends reads broken. */}
          <m.div
            variants={item}
            className="reveal mt-8 inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2"
          >
            <span className="relative mt-[0.3rem] flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs leading-relaxed text-muted">
              {site.availability} · {site.location} ·{" "}
              <span className="text-fg/90">{site.availabilityDetail}</span>
            </span>
          </m.div>

          {/* Scannable proof points */}
          <m.dl
            variants={item}
            className="reveal mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 sm:grid-cols-3"
          >
            {hero.stats.map((s) => (
              // col-reverse: the term has to precede its definition in the DOM,
              // but reads better under the number. Previously the label sat in
              // both an sr-only <dt> and a visible <span>, so screen readers
              // announced it twice.
              <div
                key={s.label}
                className="flex flex-col-reverse bg-white/[0.02] p-5"
              >
                <dt className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </dt>
                <dd>
                  <CountUp
                    value={s.value}
                    className="block font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl"
                  />
                </dd>
              </div>
            ))}
          </m.dl>
        </m.div>
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
