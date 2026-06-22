/**
 * Compact RAG pipeline diagram for the keystone card — makes the "full-stack"
 * claim legible at a glance. Pure CSS/SVG, decorative (aria-hidden), no images.
 */
const steps = [
  { label: "Question", tech: "React UI" },
  { label: "Retriever", tech: "Node · Express" },
  { label: "Vector store", tech: "Embeddings" },
  { label: "Generation", tech: "LangChain.js" },
  { label: "Cited answer", tech: "MongoDB log" },
];

export function RagVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full overflow-hidden rounded-2xl border border-white/8 bg-bg/40 p-5 sm:p-6"
    >
      {/* faint lattice grid */}
      <div
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
        retrieval pipeline
      </p>

      <ol className="relative mt-4 space-y-3.5">
        {/* connecting spine */}
        <span className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-primary via-violet to-accent" />
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
    </div>
  );
}
