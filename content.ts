/**
 * content.ts — single source of truth for all site copy.
 *
 * Resume metrics are transcribed verbatim; do not re-round or invent numbers.
 * Remaining TODO placeholders live in the commented-out project block below.
 */

export type NavLink = { label: string; href: string };

export type SkillGroup = {
  label: string;
  items: string[];
  /** Optional caption rendered under the group title. */
  note?: string;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  /** e.g. "Quantum-safe security · Bengaluru" */
  context: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
};

export type Project = {
  name: string;
  kind: "featured" | "private";
  tagline: string;
  description: string;
  role: string;
  impact: string[];
  stack: string[];
  /** Private (NDA) cards render a lock + "Enterprise · private" and no links. */
  badge?: string;
  links?: { label: string; href: string; primary?: boolean }[];
  /** Featured cards render this as the right-column PipelineVisual diagram. */
  pipeline?: { title: string; steps: { label: string; tech: string }[] };
};

/* ------------------------------------------------------------------ */

export const site = {
  name: "Abhishek Satyam",
  role: "Senior Software Engineer",
  positioning: "Full-Stack (Frontend-Heavy)",
  stackLine: "React · Next.js · Node.js · PostgreSQL · Gen AI",
  location: "Bengaluru, India",
  availability: "Open to Senior / Lead roles",
  email: "abhishek.satyam96@gmail.com",
  phone: "+91 9915121582",
  // Live links
  linkedin: "https://www.linkedin.com/in/abhishek-satyam/",
  github: "https://github.com/AbhishekSatyam96",
  /**
   * Self-hosted: `public/resume.pdf`, served at the clean /resume URL by the
   * rewrite in next.config.ts. Deliberately not a Google Drive link — Drive adds
   * a sign-in interstitial and viewer chrome, and breaks if sharing perms drift.
   * Keep public/resume.pdf in sync with the copy you send out.
   */
  resumeUrl: "/resume",
  // Used as metadataBase / canonical. Override with NEXT_PUBLIC_SITE_URL at build.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhisheksatyam.com",
  description:
    "Abhishek Satyam — Senior Software Engineer, Full-Stack (Frontend-Heavy). 7 years shipping scalable, high-performance React, Next.js & TypeScript apps end-to-end, now building post-quantum cryptography products at QNu Labs and multi-tenant RAG / LLM systems on PostgreSQL + pgvector. Open to Senior / Lead roles.",
};

export const nav: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "// senior software engineer · post-quantum cryptography",
  roleLine: "Senior Software Engineer · Full-Stack (Frontend-Heavy)",
  // Oversized gradient statement under the name.
  statement: ["Building software that scales from", "pixels to production."],
  // Short, scannable intro for the hero.
  intro:
    "Frontend-heavy full-stack engineer with 7 years shipping scalable, high-performance web apps end-to-end. Today I build the interfaces for post-quantum cryptography at QNu Labs — and RAG systems on Postgres + pgvector on my own time.",
  primaryCta: { label: "View work", href: "#projects" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  stats: [
    { value: "7 yrs", label: "shipping production web apps" },
    { value: "up to 50%", label: "Core Web Vitals improvement" },
    { value: "22% → 72%", label: "test coverage lifted" },
  ],
};

export const about = {
  eyebrow: "// about",
  title: "Frontend-deep, full-stack wide.",
  paragraphs: [
    "Full-stack engineer with a frontend-heavy focus and 7 years building and shipping scalable, high-performance web applications end-to-end. Strongest across the frontend — React, Next.js, and TypeScript — with full ownership of the delivery pipeline (Docker, GitLab CI/CD, GCP) and backend development in Node.js, Express, and PostgreSQL.",
    "I own the complete software development lifecycle from system design and implementation through testing, deployment, and production operations. Track record of leading engineering teams, building products from the ground up, improving Core Web Vitals by up to 50%, and lifting test coverage from 22% to 72% for U.S. and Australian markets.",
    "Recent focus: Generative AI — designing multi-tenant RAG / LLM systems on PostgreSQL + pgvector, from the ingestion pipeline through vector search to citation-grounded token streaming.",
  ],
  highlights: [
    "End-to-end ownership: system design → testing → deploy → production ops",
    "Core Web Vitals improved by up to 50%; Lighthouse held at 90+",
    "Test coverage lifted from 22% to 72% across U.S. & Australian markets",
    "Led engineering teams and built products from the ground up",
    "Gen AI: multi-tenant RAG on PostgreSQL + pgvector, built end-to-end",
    "40+ reusable components architected, cutting feature-development time ~35%",
  ],
  /** Right-hand "at a glance" card — the scannable version for a recruiter. */
  glance: {
    openTo: "Senior / Lead — frontend & full-stack, at product companies",
  },
};

export const experience: Role[] = [
  {
    company: "QNu Labs",
    title: "Senior Software Engineer",
    period: "March 2025 – Present",
    context: "Post-quantum cryptography · Bengaluru",
    current: true,
    bullets: [
      "Own the full software development lifecycle for 3 web products built in React, Next.js, and TypeScript — from system design and implementation through testing, deployment, and production operations.",
      "Build and own Dockerized GitLab CI/CD pipelines and GCP deployments, standardizing build, test, and release workflows across all 3 products.",
      "Architected reusable component and design systems adopted across all 3 products, accelerating feature delivery and enforcing UI consistency.",
      "Improved Core Web Vitals across key pages — reduced LCP from 3.8s to 1.9s, brought CLS below 0.1, and held Lighthouse performance at 90+.",
      "Established code-review and unit-test standards (75%+ coverage) and integrated automated regression testing into CI, reducing recurring production defects and improving release reliability.",
      "Mentor engineers through structured code reviews and pair programming, and partner with backend, product, and QA teams to ship reliable releases monitored via Sentry.",
    ],
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Docker",
      "GitLab CI/CD",
      "GCP",
      "Sentry",
    ],
  },
  {
    company: "AntWalk",
    title: "Senior Software Engineer",
    period: "July 2020 – March 2025",
    // Two different scopes, so both numbers are spelled out: 150+ is the company's
    // client base, the 50+ in the bullet below is what my team's platform served.
    context: "Enterprise SaaS · 150+ clients companywide",
    bullets: [
      "Architected a library of 40+ reusable React, Next.js, and TypeScript components, cutting feature-development time ~35% and ensuring design consistency across the product.",
      "Led a 6-engineer team building the core SaaS platform for 50+ enterprise clients, owning system design, implementation, testing, and deployment across 12+ major releases.",
      "Defined and integrated API contracts for 20+ endpoints with backend teams, reducing integration bugs ~25% through contract-driven development and shared OpenAPI documentation.",
      "Optimized performance via lazy loading, critical CSS extraction, and WebP/AVIF image optimization, reducing average page load time ~40% and improving Lighthouse score from 62 to 88.",
      "Increased unit-test coverage from 22% to 72% (Jest, React Testing Library) and ran 500+ code reviews, establishing engineering standards adopted across the team.",
      "Built feature-flag (LaunchDarkly, Split) and A/B-testing frameworks across 8+ experiments, enabling data-driven product decisions.",
    ],
    tags: ["React", "Next.js", "TypeScript", "OpenAPI", "LaunchDarkly", "Jest"],
  },
  {
    company: "AntWalk",
    title: "Software Engineer",
    period: "December 2019 – June 2020",
    context: "Frontend platform team",
    bullets: [
      "Built 15+ responsive React UI components with a 4-member frontend team, delivering pixel-perfect, cross-browser-compatible interfaces.",
      "Integrated 10+ REST APIs and GraphQL queries (Apollo Client) for dynamic data rendering across the platform.",
    ],
    tags: ["React", "GraphQL", "Apollo Client", "REST"],
  },
  {
    company: "Cognizant",
    title: "Program Analyst",
    period: "July 2019 – December 2019",
    context: "Enterprise web · 5K+ users",
    bullets: [
      "Built and maintained frontend modules for an enterprise web app used by 5K+ internal users, ensuring cross-browser compatibility and contributing to a ~15% reduction in UI-related defects.",
    ],
    tags: ["JavaScript", "Frontend", "Cross-browser"],
  },
  {
    company: "Cognizant",
    title: "Intern",
    period: "January 2019 – June 2019",
    context: "Internal Project",
    bullets: [
      "Completed Advanced Java training (JSP, Servlets, Spring MVC, Hibernate) and built a Spring MVC web application. Contributed to an ECM project using FileNet under Cognizant Digital Business.",
    ],
    tags: ["Spring Boot", "HTML", "CSS"],
  },
];

export const projects: Project[] = [
  {
    name: "RAG Knowledge Assistant",
    kind: "featured",
    tagline: "Live · Postgres + pgvector · streaming",
    description:
      "A full-stack app that answers questions over your own documents. An Express + TypeScript API " +
      "handles ingestion (dedupe → chunk → embed) and retrieval, Postgres with pgvector serves " +
      "approximate-nearest-neighbour search over an HNSW index, and a Next.js frontend streams " +
      "grounded answers with inline, clickable citations — down to the page number on PDFs — or a " +
      "refusal when the corpus can't support an answer.",
    role: "Full-stack — API, data model, retrieval pipeline & frontend",
    impact: [
      "HNSW over IVFFlat on pgvector — IVFFlat learns its centroids at build time, so an index built before the corpus exists is permanently bad; HNSW builds incrementally as uploads arrive",
      "Tenant isolation enforced in raw SQL where the ORM's type safety doesn't reach: one shared index plus an ownership predicate, with pgvector 0.8 iterative scan (strict_order) so post-filtering can't silently return fewer than top-k — recall tuned per request via transaction-scoped SET LOCAL",
      "Token streaming over NDJSON rather than SSE — EventSource can't send a Bearer header — with citations sent ahead of the first token",
      'Ingestion: SHA-256 dedupe → page-aware chunking so PDF citations read "page 7" instead of "chunk 12" → embeddings batched 100/request, behind a PENDING→READY state machine',
      "Cost control on the expensive route: Redis-backed rate limits that survive autoscaling, a per-user in-flight cap on streams, and client disconnects propagated to OpenAI via AbortController",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Express 5",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Redis",
      "OpenAI",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://rag.abhisheksatyam.com",
        primary: true,
      },
      {
        label: "Source",
        href: "https://github.com/AbhishekSatyam96/rag-assistant",
      },
    ],
    pipeline: {
      title: "retrieval pipeline",
      steps: [
        { label: "Question", tech: "Next.js UI" },
        { label: "Embed", tech: "OpenAI · 1536-d" },
        { label: "ANN search", tech: "pgvector · HNSW" },
        { label: "Generation", tech: "temp 0 · grounded" },
        { label: "Cited answer", tech: "NDJSON stream" },
      ],
    },
  },
  // {
  //   name: "AI Portfolio Generator",
  //   kind: "featured",
  //   tagline: "Claude-powered content studio",
  //   description:
  //     "An AI-powered portfolio generator that integrates the Claude API through Next.js server-side API routes to write professional bios and enhance project descriptions. Reusable prompt templates feed a human-in-the-loop flow — the model drafts, the user reviews and edits, then saves.",
  //   role: "Full-stack — Next.js app, API routes, prompt design & LLM security",
  //   impact: [
  //     "Reusable prompt templates with variable injection for bios, projects, and skills",
  //     "Human-in-the-loop editing flow — no raw AI output ships unreviewed",
  //     "Secure LLM integration: server-side API keys, input sanitization, rate-limited endpoints",
  //   ],
  //   stack: ["Next.js", "TypeScript", "Claude API", "Anthropic SDK", "Node.js"],
  //   links: [
  //     { label: "Live demo", href: "#", primary: true }, // TODO: add deployed demo URL
  //     { label: "Source", href: "" }, // TODO: add GitHub repository URL
  //   ],
  //   pipeline: {
  //     title: "generation flow",
  //     steps: [
  //       { label: "Profile input", tech: "Next.js UI" },
  //       { label: "Sanitize", tech: "API route" },
  //       { label: "Prompt template", tech: "Variable injection" },
  //       { label: "Claude API", tech: "@anthropic-ai/sdk" },
  //       { label: "Review & save", tech: "Human-in-the-loop" },
  //     ],
  //   },
  // },
  {
    name: "QKMS",
    kind: "private",
    tagline: "Quantum key management · QNu Labs",
    description:
      "An enterprise quantum-safe key-management product. I own the delivery pipeline and the interface engineering end-to-end.",
    role: "Senior Software Engineer — full-stack delivery & release engineering",
    impact: [
      "Dockerized GitLab CI/CD pipelines and GCP deployments standardizing releases",
      "Shared design-system primitives enforcing UI consistency",
      "Reliable releases monitored in production via Sentry",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Docker",
      "GitLab CI/CD",
      "Sentry",
    ],
    badge: "Enterprise · private",
  },
  {
    name: "QVault",
    kind: "private",
    tagline: "Quantum-safe product · QNu Labs",
    description:
      "An enterprise quantum-safe product where I lead frontend architecture and full-stack delivery — system design through production operations.",
    role: "Senior Software Engineer — frontend architecture & full-stack delivery",
    impact: [
      "Reusable component & design system adopted across products",
      "Core Web Vitals: LCP 3.8s → 1.9s, CLS below 0.1, Lighthouse 90+",
      "75%+ test coverage with automated regression gates in CI",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Docker", "GCP"],
    badge: "Enterprise · private",
  },
];

/** Headline technologies shown in the Skills marquee strip. */
export const coreStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "pgvector",
  "RAG / LLM",
  "GraphQL",
  "Tailwind CSS",
  "Docker",
  "GitLab CI/CD",
  "GCP",
  "MongoDB",
  "Jest",
];

/**
 * Presentation grouping for the Skills section: each domain collects skill
 * groups (by label) into one card so the section reads as six disciplines
 * instead of a flat wall of fourteen cards.
 *
 * Cards flow into CSS columns (see Skills.tsx), so uneven domain sizes pack
 * rather than leaving dead space — no need to balance adjacent pairs by hand.
 * Order still drives the 01–06 numbering, which reads down column one then two.
 */
export const skillDomains: { label: string; groups: string[] }[] = [
  {
    label: "Frontend",
    groups: [
      "Languages",
      "Frameworks & Libraries",
      "State Management",
      "UI & Styling",
    ],
  },
  {
    label: "Backend & Data",
    groups: ["Backend & APIs", "Databases"],
  },
  {
    // Architecture rides here rather than under Backend: half its items are
    // frontend concerns (Component Architecture, Micro-Frontends, SSR/SSG/ISR),
    // and the rest — System Design, Multi-Tenancy, Caching — is what the
    // multi-tenant RAG work is actually made of.
    label: "Gen AI & Architecture",
    groups: ["Gen AI / LLM", "Architecture"],
  },
  {
    label: "Quality & Performance",
    groups: ["Performance & Monitoring", "Testing"],
  },
  {
    label: "Delivery & Cloud",
    groups: ["DevOps & Cloud", "Build Tools"],
  },
  {
    label: "Tooling & Practices",
    groups: ["Developer Tooling", "Engineering Practices"],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "React Native"],
  },
  {
    label: "State Management",
    items: ["Redux Toolkit", "Redux", "React Context", "Valtio"],
  },
  {
    label: "UI & Styling",
    items: [
      "Tailwind CSS",
      "Styled Components",
      "Ant Design",
      "HTML5 Canvas",
      "Responsive Design",
      "Web Accessibility (WCAG)",
    ],
  },
  {
    label: "Architecture",
    items: [
      "System Design",
      "Component Architecture",
      "Micro-Frontends",
      "Multi-Tenancy",
      "SSR/SSG/ISR",
      "Caching Strategies",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Apollo Client",
      "OpenAPI",
      "Contract-Driven Integration",
      "NDJSON / SSE Streaming",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "pgvector",
      "MongoDB",
      "Mongoose",
      "Schema Design",
      "Indexing",
      "Query Optimization",
    ],
  },
  {
    label: "Gen AI / LLM",
    items: [
      "Generative AI",
      "RAG",
      "OpenAI API",
      "Embeddings",
      "Vector Search (HNSW, IVFFlat)",
      "Chunking Strategies",
      "Token Streaming",
      "Citation Grounding",
    ],
  },
  {
    label: "Performance & Monitoring",
    items: [
      "Core Web Vitals (LCP, CLS, INP)",
      "Lighthouse",
      "PageSpeed Insights",
      "Critical CSS",
      "Lazy Loading",
      "Image Optimization (WebP, AVIF)",
      "Sentry",
    ],
  },
  {
    label: "Testing",
    items: ["Jest", "React Testing Library", "Integration Testing", "TDD"],
  },
  {
    label: "DevOps & Cloud",
    items: ["Docker", "Nginx", "GitLab CI/CD", "CircleCI", "GCP", "AWS"],
  },
  {
    label: "Build Tools",
    items: ["Webpack", "Vite", "Babel", "npm", "Yarn", "Parcel"],
  },
  {
    label: "Developer Tooling",
    items: ["Git", "ESLint", "SonarQube", "Postman", "Jira", "SAST"],
  },
  {
    label: "Engineering Practices",
    items: [
      "Agile/Scrum",
      "Feature Flags (LaunchDarkly, Split)",
      "A/B Testing",
      "Code Review",
      "Mentoring",
    ],
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Lovely Professional University, Phagwara, Punjab",
  period: "2015 – 2019",
};

export const achievements = [
  "Winner, Techfest Coding Competition, LPU (2019) — first place on the CodeChef platform.",
  "Finalist, Rajasthan Hackathon 4.0 & 5.0 (2018) — national-level competitive hackathons.",
];

export const contact = {
  eyebrow: "// contact",
  title: "Let's build something worth trusting.",
  body: "I'm open to Senior / Lead frontend and full-stack roles at strong product companies.",
  email: site.email,
  phone: site.phone,
};
