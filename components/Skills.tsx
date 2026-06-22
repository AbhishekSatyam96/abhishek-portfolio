import { skills } from "@/content";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/Reveal";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" className="bg-elevated/30">
      <SectionHeading
        id="skills-title"
        eyebrow="// skills"
        title="The toolkit, grouped."
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {skills.map((group) => (
          <StaggerItem
            key={group.label}
            className="group glass h-full rounded-2xl p-5 transition-colors duration-300 hover:border-white/15"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {group.label}
            </h3>

            {group.note && (
              <p className="mt-2 text-sm leading-snug text-fg/85">{group.note}</p>
            )}

            <ul className="mt-3.5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-white/12"
                >
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
