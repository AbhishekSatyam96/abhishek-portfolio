import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content";
import { GrainOverlay } from "@/components/GrainOverlay";

// Body. Variable font, self-hosted, no layout shift.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Eyebrows, tags, labels.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Display fallback for Clash Display (loaded via Fontshare CDN below).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const CLASH_DISPLAY_HREF =
  "https://api.fontshare.com/v2/css?f[]=clash-display@600,700,500&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} · ${site.positioning}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    "Abhishek Satyam",
    "Senior Software Engineer",
    "Full-Stack Engineer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Post-quantum cryptography",
    "Bengaluru",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role} · ${site.positioning}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role} · ${site.positioning}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Display typeface — Clash Display (Fontshare). Loaded non-render-blocking
            (media="print" → "all" on load) so first paint isn't gated on the CDN;
            text shows in the self-hosted Space Grotesk fallback until Clash arrives. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="preload" as="style" href={CLASH_DISPLAY_HREF} />
        <link rel="stylesheet" href={CLASH_DISPLAY_HREF} media="print" data-clash="" />
        <noscript>
          <link rel="stylesheet" href={CLASH_DISPLAY_HREF} />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var l=document.querySelector('link[data-clash]');if(l)l.addEventListener('load',function(){l.media='all'});})();",
          }}
        />
        {/* No-JS / pre-hydration fallback: never leave scroll-revealed content hidden. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal{opacity:1 !important;transform:none !important;filter:none !important;}",
            }}
          />
        </noscript>
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-fg focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
