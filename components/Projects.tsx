import { projects } from "@/content";
import { Section } from "@/components/Section";
import { SectionHeading, Tag } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { RagVisual } from "@/components/RagVisual";
import { GradientButton, GhostButton } from "@/components/GradientButton";
import { Magnetic } from "@/components/Magnetic";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ArrowUpRight, GithubIcon, LockIcon, SparkIcon } from "@/components/icons";

const featured = projects.find((p) => p.kind === "featured")!;
const privateProjects = projects.filter((p) => p.kind === "private");

function ImpactList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/80" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow="// projects"
        title="The clickable proof, and the work under wraps."
      />

      {/* Keystone — featured, open-source, visually dominant */}
      <Reveal className="mt-12">
        <div className="group relative">
          {/* Glow behind the card */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-primary via-violet to-accent opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          />
          {/* Gradient border */}
          <div className="relative rounded-[28px] bg-gradient-to-r from-primary via-violet to-accent p-px shadow-[0_30px_80px_-30px_rgba(124,140,255,0.6)]">
            <div className="rounded-[27px] bg-elevated/95 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-10">
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-bg">
                      <SparkIcon className="h-3.5 w-3.5" />
                      Featured
                    </span>
                    <span className="font-mono text-xs text-muted">{featured.tagline}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {featured.description}
                  </p>

                  <div className="mt-5">
                    <ImpactList items={featured.impact} />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    {featured.links?.map((l) =>
                      l.primary ? (
                        <Magnetic key={l.label}>
                          <GradientButton href={l.href} ariaLabel={`${featured.name} — ${l.label}`}>
                            {l.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </GradientButton>
                        </Magnetic>
                      ) : (
                        <Magnetic key={l.label}>
                          <GhostButton href={l.href} ariaLabel={`${featured.name} — ${l.label}`}>
                            <GithubIcon className="h-4 w-4" />
                            {l.label}
                          </GhostButton>
                        </Magnetic>
                      ),
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <RagVisual />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Private — NDA case studies */}
      <div className="mt-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          Enterprise work
        </span>
        <span className="hairline flex-1" />
      </div>

      <Stagger className="mt-5 grid gap-6 sm:grid-cols-2" stagger={0.1}>
        {privateProjects.map((p) => (
          <StaggerItem key={p.name} className="h-full">
            <SpotlightCard
              as="article"
              tilt
              className="group glass relative flex h-full flex-col rounded-2xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-white/15 hover:shadow-[0_14px_46px_-18px_rgba(124,140,255,0.4)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent/80">{p.tagline}</p>
                </div>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted"
                  title="Private — under NDA"
                >
                  <LockIcon className="h-4 w-4" />
                </span>
              </div>

              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                <LockIcon className="h-3 w-3" />
                {p.badge}
              </span>

              <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
              <p className="mt-3 text-sm font-medium text-fg/90">{p.role}</p>

              <div className="mt-4">
                <ImpactList items={p.impact} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <p className="mt-5 border-t border-white/8 pt-4 font-mono text-xs text-muted">
                Architecture &amp; live links withheld under NDA — happy to walk through it in a call.
              </p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
