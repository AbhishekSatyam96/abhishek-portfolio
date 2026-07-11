import type { Metadata } from "next";
import { Aurora } from "@/components/Aurora";
import { GradientButton } from "@/components/GradientButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <Aurora variant="hero" />

      <div className="relative z-10 max-w-xl text-center">
        <p className="eyebrow">{"// 404 — page not found"}</p>

        <h1 className="mt-6 font-display text-7xl font-semibold tracking-tight sm:text-8xl">
          <span className="text-gradient">Lost in the lattice.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          This page doesn&apos;t exist — or it was rotated out of the keyspace.
          Let&apos;s get you back somewhere real.
        </p>

        <div className="mt-9 flex justify-center">
          <GradientButton href="/" ariaLabel="Back to the homepage">
            <span aria-hidden="true">←</span>
            Back to home
          </GradientButton>
        </div>
      </div>
    </main>
  );
}
