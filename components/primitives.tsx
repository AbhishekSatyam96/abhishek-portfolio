import { Reveal } from "@/components/Reveal";

/** Mono "//" eyebrow used to label every section. */
export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

/** Small mono pill for tech tags. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

/** Section heading: eyebrow + display title, revealed on scroll. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
