"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content";
import { BrandMark } from "@/components/BrandMark";

const SECTION_IDS = nav.map((n) => n.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Condense the bar once the page has scrolled past the hero edge.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape and when widening to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "my-2 rounded-2xl glass py-2.5 shadow-[0_8px_40px_-12px_rgba(91,91,245,0.35)]"
            : "my-0 py-5"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-lg"
          aria-label={`${site.name} — home`}
        >
          <BrandMark className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-display text-base font-semibold tracking-tight text-fg">
            {site.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.resumeUrl}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-fg transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            Résumé
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-gradient-to-r from-primary to-accent px-3.5 py-2 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_24px_-4px_rgba(124,140,255,0.7)]"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-fg transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-fg transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-fg transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`mx-4 overflow-hidden rounded-2xl glass transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-3">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-1 flex gap-2 px-1 pt-2">
            <a
              href={site.resumeUrl}
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-sm text-fg"
            >
              Résumé
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-center text-sm font-medium text-bg"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
