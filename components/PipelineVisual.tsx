import { Tag } from "@/components/primitives";

/**
 * Spec panel for the keystone project cards: the flow diagram and the stack it
 * runs on. Data comes from the project's `pipeline` and `stack` fields in
 * content.ts. Pure CSS, no images.
 *
 * The panel stretches to the card's height, so it carries the stack rather than
 * leaving the column empty around a floating diagram — the left column's
 * narrative is always the taller of the two.
 */
export function PipelineVisual({
  title,
  steps,
  stack,
}: {
  title: string;
  steps: { label: string; tech: string }[];
  stack?: string[];
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-bg/40 p-5 sm:p-6">
      {/* faint lattice grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,140,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(124,140,255,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(120% 90% at 80% 0%, #000 30%, transparent 80%)",
        }}
      />

      <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
        {title}
      </p>

      {/* Compact rather than stretched — spreading five steps over a full-height
          column dilutes the diagram. The blocks below take up the slack. */}
      <ol className="relative mt-5 space-y-3.5">
        {/* connecting spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-primary via-violet to-accent"
        />
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-3 pl-6">
            <span
              className="absolute left-0 h-3.5 w-3.5 rounded-full border-2 border-bg"
              style={{
                background:
                  i === steps.length - 1
                    ? "linear-gradient(135deg,#22D3EE,#7C8CFF)"
                    : "linear-gradient(135deg,#7C8CFF,#8B3DFF)",
              }}
            />
            <span className="flex flex-1 items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-fg">{s.label}</span>
              <span className="font-mono text-[0.7rem] text-muted">{s.tech}</span>
            </span>
          </li>
        ))}
      </ol>

      {stack && stack.length > 0 && (
        <div className="relative mt-auto border-t border-white/8 pt-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
