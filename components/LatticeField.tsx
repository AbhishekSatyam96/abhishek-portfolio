"use client";

import { useEffect, useRef } from "react";

/**
 * LatticeField — the signature visual.
 *
 * A perturbed lattice of nodes + thin links (lattice math underpins post-quantum
 * crypto) drawn on a canvas. It breathes slowly and parallaxes / glows toward the
 * cursor. Under prefers-reduced-motion it renders a single static frame and never
 * starts the animation loop or listens for the pointer.
 *
 * Performance: neighbor-only links, DPR-aware sizing, paused when the tab is
 * hidden, and full teardown on unmount.
 */

type Node = {
  ox: number; // base (grid) x
  oy: number; // base (grid) y
  ax: number; // oscillation amplitude x
  ay: number; // oscillation amplitude y
  phase: number;
  speed: number;
  col: number;
  row: number;
};

const SPACING_DESKTOP = 88;
const SPACING_MOBILE = 64;
const PRIMARY = [124, 140, 255]; // #7C8CFF
const CYAN = [34, 211, 238]; // #22D3EE
const POINTER_RADIUS = 170; // px of pointer influence

export function LatticeField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d", { alpha: true });
    if (!context) return;

    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let cols = 0;
    let rows = 0;

    // Pointer state (canvas-space). Smoothed values are lerped toward targets.
    let pointerX = -9999;
    let pointerY = -9999;
    let smoothX = -9999;
    let smoothY = -9999;
    let parallaxX = 0;
    let parallaxY = 0;
    let pointerActive = false;

    let raf = 0;
    let running = false;
    const start = performance.now();

    // Deterministic pseudo-random so the lattice is stable across rebuilds.
    const rand = (seed: number) => {
      const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    function build() {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 640 ? SPACING_MOBILE : SPACING_DESKTOP;
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          // Perturb the grid so it reads organic, not graph-paper.
          const jx = (rand(i + 1) - 0.5) * spacing * 0.42;
          const jy = (rand(i + 7) - 0.5) * spacing * 0.42;
          nodes.push({
            ox: (c - 1) * spacing + jx,
            oy: (r - 1) * spacing + jy,
            ax: 6 + rand(i + 3) * 10,
            ay: 6 + rand(i + 5) * 10,
            phase: rand(i + 11) * Math.PI * 2,
            speed: 0.18 + rand(i + 13) * 0.22,
            col: c,
            row: r,
          });
        }
      }
    }

    const nodeAt = (c: number, r: number) =>
      c >= 0 && c < cols && r >= 0 && r < rows ? nodes[r * cols + c] : undefined;

    function draw(now: number) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Ease the pointer + parallax for a fluid feel.
      if (pointerActive) {
        smoothX += (pointerX - smoothX) * 0.12;
        smoothY += (pointerY - smoothY) * 0.12;
        const tx = (pointerX - width / 2) * 0.02;
        const ty = (pointerY - height / 2) * 0.02;
        parallaxX += (tx - parallaxX) * 0.06;
        parallaxY += (ty - parallaxY) * 0.06;
      } else {
        parallaxX += (0 - parallaxX) * 0.06;
        parallaxY += (0 - parallaxY) * 0.06;
      }

      const animate = !reduceMq.matches;

      // Resolve current screen positions once.
      const px = new Float32Array(nodes.length);
      const py = new Float32Array(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = animate ? Math.sin(t * n.speed + n.phase) * n.ax : 0;
        const dy = animate ? Math.cos(t * n.speed + n.phase) * n.ay : 0;
        px[i] = n.ox + dx + parallaxX;
        py[i] = n.oy + dy + parallaxY;
      }

      // Links — connect each node to its right / down / down-right neighbors.
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const neighbors = [nodeAt(c + 1, r), nodeAt(c, r + 1), nodeAt(c + 1, r + 1)];
          for (const nb of neighbors) {
            if (!nb) continue;
            const j = nb.row * cols + nb.col;
            const mx = (px[i] + px[j]) / 2;
            const my = (py[i] + py[j]) / 2;

            let alpha = 0.05;
            let mix = 0;
            if (pointerActive) {
              const d = Math.hypot(mx - smoothX, my - smoothY);
              if (d < POINTER_RADIUS) {
                const f = 1 - d / POINTER_RADIUS;
                alpha += f * 0.5;
                mix = f;
              }
            }
            const cr = Math.round(PRIMARY[0] + (CYAN[0] - PRIMARY[0]) * mix);
            const cg = Math.round(PRIMARY[1] + (CYAN[1] - PRIMARY[1]) * mix);
            const cb = Math.round(PRIMARY[2] + (CYAN[2] - PRIMARY[2]) * mix);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }
      }

      // Nodes — small dots, brightening + glowing near the pointer.
      for (let i = 0; i < nodes.length; i++) {
        let radius = 1.1;
        let alpha = 0.28;
        let glow = 0;
        if (pointerActive) {
          const d = Math.hypot(px[i] - smoothX, py[i] - smoothY);
          if (d < POINTER_RADIUS) {
            const f = 1 - d / POINTER_RADIUS;
            radius += f * 1.8;
            alpha += f * 0.6;
            glow = f;
          }
        }
        const cr = Math.round(PRIMARY[0] + (CYAN[0] - PRIMARY[0]) * glow);
        const cg = Math.round(PRIMARY[1] + (CYAN[1] - PRIMARY[1]) * glow);
        const cb = Math.round(PRIMARY[2] + (CYAN[2] - PRIMARY[2]) * glow);
        if (glow > 0.15) {
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${glow})`;
          ctx.shadowBlur = 12 * glow;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function play() {
      if (running || reduceMq.matches) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // --- pointer (window-level, since the canvas is pointer-events: none) ---
    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      if (!pointerActive) {
        pointerActive = true;
        if (smoothX < -9000) {
          smoothX = pointerX;
          smoothY = pointerY;
        }
      }
    }
    function onPointerLeave() {
      pointerActive = false;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else play();
    }

    function onReduceChange() {
      build();
      if (reduceMq.matches) {
        stop();
        draw(performance.now()); // one static frame
      } else {
        play();
      }
    }

    // --- init ---
    build();
    const ro = new ResizeObserver(() => {
      build();
      if (!running) draw(performance.now());
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    if (reduceMq.matches) {
      draw(performance.now());
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      play();
    }
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", onReduceChange);

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", onReduceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
