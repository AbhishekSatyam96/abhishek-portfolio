import { footer, site } from "@/content";
import { BrandMark } from "@/components/BrandMark";
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <BrandMark className="h-6 w-6" />
          <div>
            <p className="text-sm font-medium text-fg">{site.name}</p>
            {footer.built && (
              <p className="font-mono text-xs text-muted">{footer.built}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            <MailIcon className="h-4 w-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-primary/15 to-accent/15 text-fg transition-all hover:border-white/25 hover:from-primary/30 hover:to-accent/30"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 sm:px-8">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind CSS &amp;
            framer-motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
