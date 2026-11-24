// Page copy for the Home page — the single source of truth (ARCHITECTURE.md §7).
// Components render from here; no copy is hardcoded in a component.
// Every claim below is either approved PRD/architecture copy or a verified
// value from §7. Nothing invented: no clients, no metrics, no hub cities.

export type Pillar = {
  id: string;
  title: string;
  what: string;
  get: string;
  tags: string[];
};

export const PILLARS: Pillar[] = [
  {
    get: "A working product you can use from day one: tested, documented, and handed over with its source.",
    id: "web-apps",
    tags: ["Next.js 16.3.8", "Spring Boot 4.0.8", "PostgreSQL", "TypeScript"],
    title: "Web Application Development",
    what: "Full-stack web applications, designed, built and shipped end to end — from the first screen to deployment.",
  },
  {
    get: "Agents that create measurable value on a defined task — not a chatbot bolted on afterwards.",
    id: "ai-agents",
    tags: ["LLM APIs", "Observability", "Guardrails", "Evaluation"],
    title: "AI Agent Integration",
    what: "AI agents woven into a real product, with observability — so you can see what the agent did, and why.",
  },
  {
    get: "Services built to run quietly for years: tested, monitored, and easy to change later.",
    id: "systems",
    tags: ["REST APIs", "PostgreSQL", "Docker", "Java"],
    title: "System-Level Software",
    what: "APIs, data pipelines and performance-critical services — the reliable systems underneath a product.",
  },
];

export type ComparisonRow = { aspect: string; matroxx: string; standard: string };

export const MODEL_COMPARISON: ComparisonRow[] = [
  {
    aspect: "Pricing",
    matroxx: "$0 core build in the cohort model — the partner covers infrastructure, licences and third-party services at cost.",
    standard: "Charged by the hour or by the project, whether it ships or not.",
  },
  {
    aspect: "AI",
    matroxx: "Woven in where it creates measurable value, with observability.",
    standard: "Added as a feature, or a chatbot on top.",
  },
  {
    aspect: "Engineering",
    matroxx: "Built to endure — tested, reviewed, documented, and handed over with its source.",
    standard: "Built to the brief, handed over, then gone.",
  },
  {
    aspect: "Incentives",
    matroxx: "The cohort build only pays off for Matroxx if the product is worth showing — as a case study, with partner approval.",
    standard: "Paid whether the product succeeds or not.",
  },
  {
    aspect: "Longevity",
    matroxx: "You own the source and the system from day one — nothing is locked to Matroxx.",
    standard: "Depends on the agency staying in business.",
  },
];

export type Tenet = { id: string; title: string; body: string };

export const COHORT_TENETS: Tenet[] = [
  {
    body: "Software a partner owns outright is an asset, not a rental. The partner keeps the source, the data and the system.",
    id: "sovereign-media",
    title: "Software as sovereign media",
  },
  {
    body: "A product worth showing is worth more than a fee. Matroxx trades short-term revenue for work it can stand behind.",
    id: "brand-capital",
    title: "Brand capital over short-term revenue",
  },
  {
    body: "The value is in how the pieces fit: product, AI and systems built together, not bought separately.",
    id: "integration-moat",
    title: "Integration moat",
  },
];

export const COHORT_COMPARISON: ComparisonRow[] = [
  {
    aspect: "Cost",
    matroxx: "$0 core build. The partner covers infrastructure, licences and third-party services at cost — never marked up.",
    standard: "Full build fee, paid up front or in milestones.",
  },
  {
    aspect: "Selection",
    matroxx: "Competitive — a small number of slots, chosen on fit.",
    standard: "Anyone who can pay.",
  },
  {
    aspect: "Ownership",
    matroxx: "Yours from day one — source, data and system.",
    standard: "Depends on the contract.",
  },
  {
    aspect: "After launch",
    matroxx: "Launch, handover and a short support window; a case study only with partner approval.",
    standard: "Support is a new contract.",
  },
];

export const CASE_STUDY = {
  audience: "Sri Lankan tech students and developers.",
  costNote: "AI/LLM cost: about $0.0022 a week.",
  description:
    "A weekly radar of Sri Lanka's tech scene: events, opportunities and news, ranked and summarised for students and developers.",
  stack: ["Next.js 16.3.8", "Spring Boot 4.0.8", "PostgreSQL"],
  title: "SL Tech Radar",
};

export type CohortSlot = { id: string; kind: string; description: string };

export const COHORT_SLOTS: CohortSlot[] = [
  {
    description:
      "A web platform for a small business or a founder — the product itself is the brief.",
    id: "product-platform",
    kind: "Product platform",
  },
  {
    description:
      "A system where AI does real work: classification, summarising, or an agent on a defined task.",
    id: "intelligent-system",
    kind: "Intelligent system",
  },
];

export const PHILOSOPHY_QUOTE =
  "Most software is built to be billed. Ours is built to be believed in.";

export const HERO = {
  ctaPrimary: "Start a project brief",
  ctaSecondary: "See the live product",
  eyebrow: "AI & Integration Software — Colombo, Sri Lanka",
  headline: "Software that thinks. Systems that endure.",
  sub: "Full-stack web apps, AI agents where they create measurable value, and reliable systems beneath.",
};

export const BRIEF_TEASER = {
  body: "A few minutes, in plain language: what you want to build, what it should do, and what “done” looks like. No account, no call required to start.",
  cta: "Start a project brief",
  heading: "Have something to build?",
};
