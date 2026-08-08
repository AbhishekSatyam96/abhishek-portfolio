"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { m, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { ChevronDownIcon } from "@/components/icons";

export type EngineeringNote = { label: string; detail: string };

/** Two-digit index — "01", "07". The notes read as a numbered decision log. */
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The featured card's engineering deep-dive, as a decision browser rather than
 * a wall of prose.
 *
 * Seven notes rendered in full ran ~1400px — the card outgrew the viewport and
 * every note carried the same visual weight, so nothing invited a scan. Here
 * the labels stay listed (that was always the point: skimmable by headline) and
 * only the selected detail is shown, which holds the block near the height of
 * the label list itself.
 *
 * Two layouts, one `active` index:
 *   - md and up: a vertical tablist beside a detail panel.
 *   - below md: an accordion, so the detail opens under the label you tapped
 *     instead of far down the page.
 * Both trees stay in the DOM — the hidden one is `display:none`, so it is out
 * of the accessibility tree — and every detail is server-rendered, which keeps
 * the text crawlable even though only one is visible.
 */
export function EngineeringNotes({ notes }: { notes: EngineeringNote[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  /** Roving focus: arrows wrap, Home/End jump to the ends. */
  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = notes.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-bg/40">
      {/* Same faint lattice as the pipeline panel, so the two surfaces read as
          a pair rather than two unrelated boxes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,140,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(124,140,255,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(110% 80% at 10% 0%, #000 25%, transparent 75%)",
        }}
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
            Engineering notes
          </p>
          <p className="hidden font-mono text-[0.7rem] tabular-nums text-muted/70 md:block">
            {pad(active + 1)}
            <span className="text-muted/40"> / {pad(notes.length)}</span>
          </p>
        </div>

        {/* ---------------- md+ : tablist beside the detail panel ---------- */}
        {/* Rail is wide enough that the longest label sits on one line — a
            wrapping label adds a row's worth of height to the whole block. */}
        <div className="mt-5 hidden gap-8 md:grid md:grid-cols-[minmax(0,18rem)_1fr] lg:grid-cols-[minmax(0,21rem)_1fr]">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Engineering decisions"
            onKeyDown={onTabKeyDown}
            className="flex flex-col gap-0.5"
          >
            {notes.map((n, i) => {
              const isActive = i === active;
              return (
                <button
                  key={n.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(i)}
                  aria-selected={isActive}
                  aria-controls={panelId(i)}
                  // Roving tabindex — one stop for the whole list, arrows move within it.
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-start gap-3 rounded-lg py-2 pl-4 pr-3 text-left transition-colors duration-200 ${
                    isActive
                      ? "bg-white/[0.055] text-fg"
                      : "text-muted hover:bg-white/[0.025] hover:text-fg/90"
                  }`}
                >
                  {/* Aurora spine marking the selection. Always rendered and
                      faded, so switching tabs cross-fades instead of popping. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-2 left-0 w-[2px] rounded-full bg-gradient-to-b from-primary via-violet to-accent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pt-px font-mono text-[0.7rem] leading-5 tabular-nums transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted/45"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="text-sm font-medium leading-5">{n.label}</span>
                </button>
              );
            })}
          </div>

          {/* Panels share one grid cell, so the column is sized by the longest
              note and the block never resizes as you move between tabs. */}
          <div className="grid border-l border-white/8 pl-8">
            {notes.map((n, i) => {
              const isActive = i === active;
              return (
                <m.div
                  key={n.label}
                  role="tabpanel"
                  id={panelId(i)}
                  aria-labelledby={tabId(i)}
                  inert={!isActive}
                  style={{ gridArea: "1 / 1" }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive || reduced ? 0 : 8,
                  }}
                  initial={false}
                  transition={{ duration: reduced ? 0.2 : 0.4, ease: easeOutExpo }}
                  className={isActive ? "" : "pointer-events-none"}
                >
                  <div className="relative h-full">
                    {/* Oversized ghost numeral pinned to the floor of the pane.
                        The rail is taller than any single note, so the panel
                        always has slack below the text — this makes that slack
                        read as composition instead of a gap. Below lg the pane
                        is narrow enough that a long note reaches the numeral,
                        and text over a numeral just reads as a mistake. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-2 right-0 hidden select-none font-display text-[7rem] font-semibold leading-none tracking-tight text-white/[0.035] lg:block"
                    >
                      {pad(i + 1)}
                    </span>
                    <h4 className="relative font-display text-lg font-semibold tracking-tight text-fg">
                      {n.label}
                    </h4>
                    <p className="relative mt-3 max-w-2xl text-sm leading-[1.75] text-muted">
                      {n.detail}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* ---------------- below md : accordion ------------------------- */}
        <div className="mt-4 md:hidden">
          {notes.map((n, i) => {
            const isOpen = i === active;
            return (
              <div key={n.label} className="border-t border-white/8 first:border-t-0">
                <h4>
                  <button
                    type="button"
                    id={`${tabId(i)}-m`}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId(i)}-m`}
                    onClick={() => setActive(i)}
                    className="flex w-full items-center gap-3 py-3.5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[0.7rem] tabular-nums transition-colors duration-200 ${
                        isOpen ? "text-primary" : "text-muted/45"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`flex-1 text-sm font-semibold transition-colors duration-200 ${
                        isOpen ? "text-fg" : "text-fg/75"
                      }`}
                    >
                      {n.label}
                    </span>
                    <ChevronDownIcon
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : "text-muted/60"
                      }`}
                    />
                  </button>
                </h4>
                {/* 0fr → 1fr animates to the content's own height with no JS
                    measurement; the child clips while the row collapses.
                    `inert` because clipped text is still readable by a screen
                    reader — the collapse is visual only. */}
                <div
                  id={`${panelId(i)}-m`}
                  role="region"
                  aria-labelledby={`${tabId(i)}-m`}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-out-expo"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 pl-[1.9rem] text-sm leading-relaxed text-muted">
                      {n.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
