import { contact, site } from "@/content";
import { Section } from "@/components/Section";
import { Aurora } from "@/components/Aurora";
import { Reveal } from "@/components/Reveal";
import { GradientButton, GhostButton } from "@/components/GradientButton";
import { Magnetic } from "@/components/Magnetic";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "@/components/icons";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-elevated/40 px-6 py-16 text-center sm:px-12 sm:py-20">
          <Aurora variant="section" className="opacity-90" />

          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2
              id="contact-title"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl"
            >
              {contact.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {contact.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <GradientButton
                  href={`mailto:${contact.email}`}
                  ariaLabel={`Email ${site.name}`}
                  className="px-7 py-3.5 text-base"
                >
                  <MailIcon className="h-5 w-5" />
                  {contact.email}
                </GradientButton>
              </Magnetic>
              <Magnetic>
                <GhostButton
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  ariaLabel={`Call ${site.name}`}
                  className="px-7 py-3.5 text-base"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {contact.phone}
                </GhostButton>
              </Magnetic>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              {/* <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a> */}
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                Résumé
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
