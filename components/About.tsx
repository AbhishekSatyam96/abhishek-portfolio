import { about, achievements, education, site } from "@/content";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/primitives";
import { Aurora } from "@/components/Aurora";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

/** Small gradient lattice-diamond used as a list marker. */
function Marker() {
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px] bg-gradient-to-br from-primary to-accent"
    />
  );
}

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Aurora variant="section" className="opacity-60" />

      <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />

      <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-14">
        {/* Narrative */}
        <div className="lg:col-span-3">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {about.highlights.map((h) => (
              <StaggerItem
                key={h}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4"
              >
                <Marker />
                <span className="text-sm leading-snug text-fg/90">{h}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* At-a-glance card */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="glass h-full rounded-2xl p-6 sm:p-7">
            <p className="eyebrow">{"// at a glance"}</p>

            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Currently
                </dt>
                <dd className="mt-1 text-fg">
                  Senior Software Engineer, QNu Labs
                  <span className="block text-muted">
                    Post-quantum cryptography · {site.location}
                  </span>
                </dd>
              </div>

              <div className="hairline" />

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Education
                </dt>
                <dd className="mt-1 text-fg">
                  {education.degree}
                  <span className="block text-muted">{education.school}</span>
                  <span className="block font-mono text-xs text-muted">
                    {education.period}
                  </span>
                </dd>
              </div>

              <div className="hairline" />

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Achievements
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-2.5">
                    {achievements.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-fg/90">
                        <Marker />
                        <span className="text-sm leading-snug">{a}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
