import { coreStack, skillDomains, skills, type SkillGroup } from "@/content";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/primitives";
import { Aurora } from "@/components/Aurora";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

/** Resolve the domain → group-label mapping against the actual skill groups. */
function resolveDomains(): { label: string; groups: SkillGroup[] }[] {
  const byLabel = new Map(skills.map((g) => [g.label, g]));
  const domains = skillDomains.map((d) => ({
    label: d.label,
    groups: d.groups
      .map((label) => byLabel.get(label))
      .filter((g): g is SkillGroup => Boolean(g)),
  }));

  // Any group not claimed by a domain still renders, in a trailing card.
  const claimed = new Set(skillDomains.flatMap((d) => d.groups));
  const rest = skills.filter((g) => !claimed.has(g.label));
  if (rest.length) domains.push({ label: "More", groups: rest });

  return domains.filter((d) => d.groups.length);
}

export function Skills() {
  const domains = resolveDomains();

  return (
    <Section id="skills" labelledBy="skills-title" className="bg-elevated/30">
      <Aurora variant="section" className="opacity-40" />

      <SectionHeading
        id="skills-title"
        eyebrow="// skills"
        title="The toolkit, grouped."
      />

      {/* Core stack — slow CSS marquee, pauses on hover. */}
      <Reveal className="mt-10">
        <div className="marquee-mask overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] py-4">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex items-center gap-8 pr-8"
              >
                {coreStack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-medium text-fg/80 sm:text-xl"
                  >
                    {tech}
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-gradient-to-br from-primary to-accent"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Four disciplines instead of a flat wall of thirteen cards. */}
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.07}>
        {domains.map((domain, i) => (
          <StaggerItem key={domain.label} className="h-full">
            <SpotlightCard className="group glass h-full rounded-2xl p-6 transition-colors duration-300 hover:border-white/15 sm:p-7">
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
                  {domain.label}
                </h3>
                <span className="font-mono text-xs text-muted/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </header>

              <div className="mt-5 space-y-5">
                {domain.groups.map((group) => (
                  <div key={group.label}>
                    <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                      {group.label}
                    </h4>

                    {group.note && (
                      <p className="mt-2 text-sm leading-snug text-fg/85">
                        {group.note}
                      </p>
                    )}

                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-white/12"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
