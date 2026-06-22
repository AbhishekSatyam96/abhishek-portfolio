# Abhishek Satyam — Portfolio

Personal portfolio for **Abhishek Satyam**, Senior Software Engineer · Full-Stack
(Frontend-Heavy). The site itself is the work sample: a bold, performance-first
single page themed around _"cryptography rendered as light"_ — an animated entropy
**aurora** and a perturbed **lattice** field (lattice math is the basis of
post-quantum cryptography).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`)
- **framer-motion** for orchestrated motion
- `next/font` (Inter, JetBrains Mono, Space Grotesk) + **Clash Display** via Fontshare CDN
- `next/og` for the generated Open Graph / Twitter card and favicon
- Deploy target: **GCP Cloud Run** (multi-stage Dockerfile, `output: "standalone"`)

## Local development

> Requires **Node.js ≥ 20.9**.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also emits .next/standalone)
npm start        # serve the production build
npm run lint
```

## Editing content

All copy lives in one typed file: [`content.ts`](./content.ts). Roles, dates,
metrics, skills, projects and SEO text are there — edit it, not the components.

### TODO before launch — search the repo for `TODO`

| What | Where |
| ---- | ----- |
| GitHub profile URL | `content.ts` → `site.github` |
| Custom domain (canonical + OG) | `content.ts` → `site.url` / `NEXT_PUBLIC_SITE_URL` |
| Résumé PDF | drop `Abhishek-Satyam-Resume.pdf` in `public/` (see `site.resumeUrl`) |
| RAG project links | `content.ts` → featured project `links` (Live demo + Source) |

## Project structure

```
app/
  layout.tsx            root layout: fonts, metadata, <head>, grain overlay
  page.tsx              section composition
  globals.css           Tailwind v4 @theme (palette), base styles, keyframes
  opengraph-image.tsx   generated 1200×630 social card (next/og)
  twitter-image.tsx     re-exports the OG card
  icon.svg              favicon (lattice mark)
  robots.ts / sitemap.ts
components/             one component per section + shared primitives
content.ts              all copy (typed)
lib/motion.ts           framer-motion variants
Dockerfile              multi-stage build for Cloud Run
```

## Design system

- **Palette:** `#07090F` bg / `#0E1320` elevated; aurora stops indigo `#5B5BF5`,
  violet `#8B3DFF`, cyan `#22D3EE`, magenta `#E84CC4`; accents `#7C8CFF` + `#22D3EE`;
  text `#EAEDF5` / muted `#9AA6BD`. Defined as Tailwind tokens in `app/globals.css`.
- **Type:** Clash Display (display), Inter (body), JetBrains Mono (eyebrows/tags).
- **Motion:** hero staggered fade-up + blur-in; CSS-driven drifting aurora; a
  pointer-reactive lattice canvas; sections fade-up on scroll. **`prefers-reduced-motion`
  freezes the aurora, drops transforms, and keeps a static gradient** — verified.
- **A11y:** semantic landmarks, skip link, visible keyboard focus, `inert` mobile
  menu when closed, alt text, AA-contrast text.

## Deploy → GCP Cloud Run

The repo ships a production Dockerfile that builds the Next.js **standalone** output
and runs it as a non-root user on `$PORT` (Cloud Run injects `8080`).

### Option A — one command from source (Cloud Build builds the Dockerfile)

```bash
gcloud run deploy abhishek-portfolio \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-build-env-vars NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> `NEXT_PUBLIC_SITE_URL` must be a **build** env var — `NEXT_PUBLIC_*` values are
> inlined at build time and drive the canonical URL + OG/Twitter image URLs.

### Option B — build & push the image yourself

```bash
# Build for the linux/amd64 runtime Cloud Run uses
docker build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  -t REGION-docker.pkg.dev/PROJECT_ID/web/abhishek-portfolio:latest .

docker push REGION-docker.pkg.dev/PROJECT_ID/web/abhishek-portfolio:latest

gcloud run deploy abhishek-portfolio \
  --image REGION-docker.pkg.dev/PROJECT_ID/web/abhishek-portfolio:latest \
  --region asia-south1 \
  --allow-unauthenticated
```

Run the container locally to verify it:

```bash
docker build -t abhishek-portfolio . && docker run --rm -p 8080:8080 abhishek-portfolio
# → http://localhost:8080
```

## Deploy → Vercel (zero-config fallback)

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
No configuration needed — Vercel detects Next.js automatically. Set
`NEXT_PUBLIC_SITE_URL` in the project's environment variables. (`output: "standalone"`
is ignored by Vercel and does not interfere.)
