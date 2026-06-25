import { experience } from "@/content";
import { Section } from "@/components/Section";
import { SectionHeading, Tag } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title" className="bg-elevated/30">
      <SectionHeading
        id="experience-title"
        eyebrow="// experience"
        title="Seven years, shipped end-to-end."
      />

      <div className="relative mt-14">
        {/* Timeline spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-primary/70 via-violet/30 to-transparent"
        />

        <Stagger className="space-y-6 sm:space-y-7" stagger={0.1}>
          {experience.map((role) => (
            <StaggerItem key={`${role.company}-${role.period}`} className="relative pl-10 sm:pl-14">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2.5 flex h-4 w-4 items-center justify-center"
              >
                {role.current && (
                  <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-accent/60" />
                )}
                <span className="relative h-4 w-4 rounded-full border-2 border-bg bg-gradient-to-br from-primary to-accent" />
              </span>

              <SpotlightCard
                as="article"
                className="group glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-[0_12px_44px_-16px_rgba(124,140,255,0.45)] sm:p-6"
              >
                <header className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-lg font-semibold text-fg">
                    {role.title}
                    <span className="text-muted"> · </span>
                    <span className="text-gradient">{role.company}</span>
                  </h3>
                  <div className="flex items-center gap-2.5">
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Now
                      </span>
                    )}
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {role.period}
                    </span>
                  </div>
                </header>

                <p className="mt-1 font-mono text-xs text-accent/80">{role.context}</p>

                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {role.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
