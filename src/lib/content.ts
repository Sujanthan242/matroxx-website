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

export type ServiceDetail = {
  id: string;
  included: string[];
  notIncluded: string[];
  deliverables: string[];
  done: string;
};

/**
 * Services page — expanded pillar detail (PRD §3.2, ARCHITECTURE.md §2).
 * Every line below is a restatement of approved copy: the pillar
 * what/get/tags above, PRD §3.1, or the MODEL_/COHORT_COMPARISON rows.
 * Nothing new is claimed: no clients, no numbers, no locations.
 * Two wordings are paraphrase rather than verbatim approved copy and are
 * flagged in the Branch 4 report for Quality Gate to judge: the AI
 * "agent with no observability" exclusion, and the WHAT_WE_DONT_DO
 * bodies (restatements of the settled sign-off #1 exclusions).
 */
export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    deliverables: [
      "A working web application, live and usable from day one",
      "Tests and documentation",
      "The source, handed over — yours from day one",
      "Handover and a short support window",
    ],
    done: "Done looks like a working product you can use from day one — tested, documented, and handed over with its source.",
    id: "web-apps",
    included: [
      "Designed, built and shipped end to end — from the first screen to deployment",
      "A working product you can use from day one",
      "Tested, reviewed and documented",
      "Handed over with its source — yours from day one",
    ],
    notIncluded: [
      "A marketing-only site — a site with no product behind it",
      "A fixed-price rescue of a half-built project without a review",
    ],
  },
  {
    deliverables: [
      "An agent working on a defined task inside the product",
      "Observability: a record of what the agent did, and why",
      "Guardrails and evaluation",
      "The source and documentation, handed over",
    ],
    done: "Done looks like an agent creating measurable value on a defined task — visible through observability, not a chatbot bolted on afterwards.",
    id: "ai-agents",
    included: [
      "Agents woven into a real product, not bolted on afterwards",
      "Observability — you can see what the agent did, and why",
      "Built for a defined task, where it creates measurable value",
      "Guardrails and evaluation around the agent",
    ],
    notIncluded: [
      "A chatbot bolted on afterwards",
      "An agent with no observability — one you cannot see working",
    ],
  },
  {
    deliverables: [
      "APIs, data pipelines or services, built to run quietly for years",
      "Tests and monitoring",
      "Documentation, and a system easy to change later",
      "The source, handed over",
    ],
    done: "Done looks like services built to run quietly for years: tested, monitored, and easy to change later.",
    id: "systems",
    included: [
      "REST APIs",
      "Data pipelines",
      "Performance-critical services",
      "Tested, monitored, and easy to change later",
      "Built to run quietly for years",
    ],
    notIncluded: ["A microservices rewrite"],
  },
];

export type Exclusion = { title: string; body: string };

/** "What we don't do" — the 3 settled exclusions (sign-off #1, PRD §3.2). */
export const WHAT_WE_DONT_DO: Exclusion[] = [
  {
    body: "We build systems as one coherent whole — we don't rebuild a working system as microservices.",
    title: "No microservices rewrites",
  },
  {
    body: "A site with no product behind it is not a Matroxx build.",
    title: "No marketing-only sites",
  },
  {
    body: "A half-built project gets a review first — never a fixed price sight unseen.",
    title: "No fixed-price rescue of half-built projects without a review",
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
  label: "// 06 — Project Brief",
};

/** Section descriptions for Home // 01–04 (ARCHITECTURE.md §7). */
export const SECTION_DESCRIPTIONS = {
  cohort:
    "Matroxx builds the core product for $0. The partner covers infrastructure, licences and third-party services at cost — never marked up. Selection is competitive.",
  model:
    "The same work, priced and owned differently — because who pays for what changes what gets built.",
  services:
    "Three engineering pillars. One team that builds the product, the AI inside it, and the systems underneath — and stays accountable for all three.",
  work: "One live product, built the cohort way — and the next two slots, open now.",
};

/** Services page header + "What we don't do" intro (PRD §3.2).
    The heading is composed from approved phrases only ("Three pillars",
    PRD §3.1; "built end to end", PILLARS "shipped end to end") — flagged
    in the Branch 4 report as a composed headline, not a verbatim quote. */
export const SERVICES_PAGE = {
  dontDoDescription:
    "An honest scope boundary — the work Matroxx does not take on.",
  heading: "Three pillars, built end to end.",
  sub: SECTION_DESCRIPTIONS.services,
};

/** Link labels for the Home section footers (ARCHITECTURE.md §7). */
export const SECTION_LINKS = {
  cohort: "How the cohort works →",
  services: "All services →",
  work: "All work →",
};
