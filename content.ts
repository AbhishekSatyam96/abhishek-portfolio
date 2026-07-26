/**
 * content.ts — single source of truth for all site copy.
 *
 * Resume metrics are transcribed verbatim; do not re-round or invent numbers.
 * TODO placeholders (GitHub, résumé PDF, custom domain, project links) are the
 * only values meant to be edited before launch — search for "TODO".
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
  stackLine: "React · Next.js · Node.js",
  location: "Bengaluru, India",
  availability: "Open to Senior / Lead roles",
  email: "abhishek.satyam96@gmail.com",
  phone: "+91 9915121582",
  // Live links
  linkedin: "https://www.linkedin.com/in/abhishek-satyam/",
  github: "https://github.com/AbhishekSatyam96",
  resumeUrl:
    "https://drive.google.com/file/d/1mj6_6M-f4k8NmYq2NZ6el6pZlBvHIHoh/view?usp=sharing",
  // Used as metadataBase / canonical. Override with NEXT_PUBLIC_SITE_URL at build.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhisheksatyam.dev", // TODO: set custom domain
  description:
    "Abhishek Satyam — Senior Software Engineer, Full-Stack (Frontend-Heavy). 7 years shipping scalable, high-performance React, Next.js & TypeScript apps end-to-end, now building post-quantum cryptography products at QNu Labs. Open to Senior / Lead roles.",
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
    "Frontend-heavy full-stack engineer with 7 years shipping scalable, high-performance web apps end-to-end. Today I build the interfaces for post-quantum cryptography at QNu Labs.",
  // Projects section is currently hidden, so the primary CTA lands on Experience.
  primaryCta: { label: "View work", href: "#experience" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  stats: [
    { value: "7 yrs", label: "shipping production web apps" },
    { value: "up to 50%", label: "Core Web Vitals improvement" },
    { value: "22% → 72%", label: "test coverage lifted" },
  ],
};

export const about = {
  eyebrow: "// about",
  title: "Full ownership, frontend-first.",
  // The MERN phrasing below is intentional and must stay exact.
  paragraphs: [
    "Full-stack engineer with a frontend-heavy focus and 7 years building and shipping scalable, high-performance web applications end-to-end. Strongest across the frontend — React, Next.js, and TypeScript — with full ownership of the delivery pipeline (Docker, GitLab CI/CD, GCP) and backend development across the MERN stack (Node.js, Express, MongoDB).",
    "I own the complete software development lifecycle from system design and implementation through testing, deployment, and production operations. Track record of leading engineering teams, building products from the ground up, improving Core Web Vitals by up to 50%, and lifting test coverage from 22% to 72% for U.S. and Australian markets.",
  ],
  highlights: [
    "End-to-end ownership: system design → testing → deploy → production ops",
    "Core Web Vitals improved by up to 50%; Lighthouse held at 90+",
    "Test coverage lifted from 22% to 72% across U.S. & Australian markets",
    "Led engineering teams and built products from the ground up",
  ],
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
    context: "Enterprise SaaS · 50+ clients",
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
      "Completed Advanced Java training (JSP, Servlets, Spring MVC, Hibernate) and built a Spring MVC web application. Contributed to an ECM project using FileNet under Cognizant Digital Business",
    ],
    tags: ["Spring Boot", "HTML", "CSS"],
  },
];

export const projects: Project[] = [
  {
    name: "RAG Knowledge Assistant",
    kind: "featured",
    tagline: "Postgres + pgvector · streaming · open source",
    description:
      "A full-stack app that answers questions over your own documents. An Express + TypeScript API " +
      "handles ingestion (dedupe → chunk → embed) and retrieval, Postgres with pgvector serves " +
      "approximate-nearest-neighbour search over an HNSW index scoped per tenant, and a Next.js " +
      "frontend streams grounded answers with inline, clickable citations — or a refusal when the " +
      "corpus can't support an answer.",
    role: "Full-stack — API, data model, retrieval pipeline & frontend",
    impact: [
      "Vector search on Postgres/pgvector: HNSW index, cosine distance, per-request tuning inside a transaction",
      "Multi-tenant isolation enforced in raw SQL, where the ORM's type safety doesn't reach",
      "Token streaming over NDJSON with citations sent ahead of the first token",
      "Ingestion pipeline with SHA-256 dedupe, batched embeddings, and a PENDING→READY state machine",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Express 5",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "OpenAI",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/AbhishekSatyam96/rag-assistant",
        primary: true,
      },
      {
        label: "Design docs",
        href: "https://github.com/AbhishekSatyam96/rag-assistant/blob/main/docs/hld.md",
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
 * groups (by label) into one card so the section reads as four disciplines
 * instead of a flat wall of thirteen cards.
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
    label: "Architecture & Backend",
    groups: ["Architecture", "Backend & APIs", "Databases"],
  },
  {
    label: "Quality & Performance",
    groups: ["Performance & Monitoring", "Testing"],
  },
  {
    label: "Delivery & Practices",
    groups: [
      "DevOps & Cloud",
      "Build Tools",
      "Developer Tooling",
      "Engineering Practices",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
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
    ],
  },
  {
    label: "Databases",
    items: ["MongoDB", "Mongoose"],
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
    items: ["Webpack", "Vite", "Babel", "npm", "Yarn", "pnpm"],
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

export const footer = {
  built: "",
};
