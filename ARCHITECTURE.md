# Matroxx — Official Website Professional Rebuild: Architecture

**Status:** APPROVED — sign-off #2 granted by Sujay 2026-11-24 ("Ok"). Build in progress (6-agent team, Orchestrator coordinating); staging only — production deploy needs Sujay's click (sign-off #3).
**Date:** 2026-11-24
**Product & Architect:** Matroxx 6-agent team
**PRD (approved, sign-off #1):** `matroxx-website-rebuild-prd.md` — §7 settled at sign-off #1 (see below).
**Rules:** `~/workspace/matroxx/RULES.md` — followed exactly; no exceptions.
**Replaces:** the current static site at https://sujanthan242.github.io/matroxx-website/ — verified today: a single `index.html` (3.6 MB, 1 commit) in repo https://github.com/Sujanthan242/matroxx-website, 5 sections (hero → Three Pillars → model comparison → cohort model → flagship → philosophy → brief teaser).

## Sign-off #1 decisions carried into this doc (Sujay, 2026-11-24)

1. Contact form: mailto + copy/download. Zero backend, zero cost, zero data stored.
2. Team: presented publicly as a small AI-assisted engineering team, founder-led.
3. "What we don't do": no microservices rewrites, no marketing-only sites, no fixed-price rescue of half-built projects without a review.
4. Cohort timeline: proposed here (§8); Sujay confirms at sign-off #2.
5. Sequencing: **website first**, ahead of the WhatsApp Share pilot. (Correction to the PRD's §11 note: the website is now the team's **first** full pipeline proof, not the second.)

## Sign-off #2 decisions (Sujay, 2026-11-24 — "Ok")
1. Cohort timeline: 8–9 weeks typical, 5–6 weeks for small builds, printed as "typical, not a promise" — approved as proposed.
2. Contact email for the brief mailto: sujanleo242@gmail.com (Sujay's personal email; he did not supply a different one — changeable at sign-off #3).
3. 6-agent room image: publish on the Cohort page — approved.
4. Spline fallback: approved — site must look professional with or without the Spline scene.
5. Build pauses on Sujay's word if exam revision needs the time — approved.

## CEO pacing instruction (Sujay, 2026-11-24 — "Take enough time, perfection is important")
- Do NOT rush the build to hit any estimate. The 5–7 day figure is a guide, not a deadline.
- Quality and thorough review come first. Every branch gets full review (Writer ≠ Reviewer), every claim verified, every test green before merge.
- If a page needs an extra round of polish or review, take it. Send the checked version first, not a rushed one.
- Exams still come first — the build pauses on Sujay's word if revision needs the time.

## 1. Stack — pinned versions

| Layer | Choice | Why / note |
|---|---|---|
| Framework | Next.js 16, App Router, TypeScript strict | House stack (RULES.md); the Radar frontend already runs Next.js 16 |
| Rendering | Static export (`output: 'export'`) | No server, no DB, no auth — a marketing site. Same GitHub Pages hosting, same repo, same URL |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) | House choice; tokens live in `globals.css`, one source of truth |
| Fonts | `next/font/google`: Newsreader (display), Inter (body), JetBrains Mono (labels) | Self-hosted at build time — no runtime font requests, no external dependency |
| Forms | React Hook Form + Zod (`@hookform/resolvers/zod`) | RULES.md |
| Motion | `@splinetool/react-spline` + `lottie-react` — only these two motion deps | Free tier; Spline for the hero scene, Lottie for small accents |
| Data fetching | None — no TanStack Query | Static content only; do not add it for its own sake (PRD §5) |
| Tests | Vitest (unit) + Playwright (e2e) + `@axe-core/playwright` (a11y) | RULES.md |
| Node / package manager | Node 22 LTS, npm (`npm ci` in CI) | Pinned in the workflow, not "latest" |
| Backend | None | No Spring Boot, no DB, no Flyway, no auth — the modular-monolith rules apply to the product backend, not this site |

**NOT in scope:** microservices, Kubernetes, CMS, analytics on a paid plan, any paid service, any secret. If a secret ever appears, it goes in `.env` and agents never see it.

## 2. Routes — the 5 pages

Base URL: `https://sujanthan242.github.io/matroxx-website/` (GitHub Pages **project** site — see §9 for the `basePath` rule that makes this work).

| Route | File | Renders |
|---|---|---|
| `/` Home | `src/app/page.tsx` | Header/nav + hero (Spline scene layer, headline, 2 CTAs, verified stat strip) → Three Pillars cards → "Where the model differs" comparison table → Cohort Model (3 tenets + standard-vs-cohort comparison) → Work flagship (SL Tech Radar case-study card + 2 open cohort slots) → Philosophy quote → Project Brief teaser → Footer. This is the flagship page; everything a first-time visitor needs in one scroll. |
| `/services` | `src/app/services/page.tsx` | One expanded section per pillar (what is included, what is not, typical deliverables, stack tags, what "done" looks like) → "What we don't do" strip (the 3 settled exclusions) → CTA "Start a brief". |
| `/work` | `src/app/work/page.tsx` | SL Tech Radar full case study (problem → what was built → stack → one architecture diagram → verified numbers → live link → "by Matroxx" badge note) → 2 open cohort slots as briefs-in-waiting → empty state: no invented case studies, empty slots stay empty until real work exists. |
| `/cohort` | `src/app/cohort/page.tsx` | How the cohort model works, 6 steps (brief → technical call → selection → build → launch → case study, only with partner approval) → what the partner pays vs what Matroxx covers (plain language, no fine print) → timeline proposal (§8) → "How we work" team section (6-agent room image + founder-led copy). |
| `/contact` | `src/app/contact/page.tsx` | Project Brief builder form (§6) → assembled brief preview → Copy / Download / Send-via-email buttons → contact email shown plainly. No fake phone number, no fake office address. |
| `404` | `src/app/not-found.tsx` | Branded 404 with logo, "This page doesn't exist yet" and links back to Home / Contact. Static export generates `404.html` from this file. |

Every page exports its own `metadata` (title + description + Open Graph tags, absolute URLs, `og:image` = official logo on obsidian). `public/sitemap.xml` and `public/robots.txt` are hand-maintained static files (5 routes + home) — no generator dependency.

## 3. Component structure — folder layout

```
matroxx-website/
├─ .github/workflows/
│  ├─ ci.yml        # every push + PR: lint → typecheck → test → build
│  ├─ preview.yml   # every PR: build + deploy preview to gh-pages/preview/pr-<n>/
│  └─ deploy.yml    # push to main only, environment: production (Sujay approves)
├─ public/
│  ├─ logo/matroxx-logo-official-transparent.png   # copied from ~/workspace/matroxx/logo/ — never recreated
│  ├─ team/6-agent-room.webp                       # the 6-agent room image (sign-off #2 confirms publishing it)
│  ├─ lottie/success.json, lottie/scroll-cue.json  # tiny, free LottieFiles assets only
│  ├─ og.png                                       # Open Graph image: official logo on obsidian
│  ├─ robots.txt, sitemap.xml
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        # fonts, global metadata, <Header/> + <Footer/>
│  │  ├─ page.tsx          # Home
│  │  ├─ services/page.tsx
│  │  ├─ work/page.tsx
│  │  ├─ cohort/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ not-found.tsx
│  │  └─ globals.css       # Tailwind v4 @theme tokens (§4)
│  ├─ components/
│  │  ├─ Header.tsx, Footer.tsx, MobileMenu.tsx
│  │  ├─ SectionHeading.tsx        # numbered editorial heading: "// 01 — Services"
│  │  ├─ PillarCard.tsx, ComparisonTable.tsx, TenetCard.tsx
│  │  ├─ CaseStudyCard.tsx, CohortSlotCard.tsx, StatStrip.tsx
│  │  ├─ PhilosophyQuote.tsx, TeamSection.tsx
│  │  ├─ BriefBuilder.tsx          # the form (§6) + brief preview + Copy/Download/Mailto
│  │  ├─ SplineHero.tsx            # client component, lazy-loaded, with static fallback
│  │  └─ LottiePlayer.tsx          # client component, lazy-loaded, reduced-motion aware
│  ├─ lib/
│  │  ├─ site.ts    # single source of truth: nav links, contact email, Spline scene URL,
│  │  │            # SL Tech Radar URL, verified stat numbers — nothing hardcoded in components
│  │  ├─ content.ts # page copy: pillars, tenets, comparison rows, case-study text, slots
│  │  └─ brief.ts   # Zod schema + brief text assembly + mailto URL builder (§6)
│  └─ tests/ ... (see §10)
├─ next.config.mjs   # output: 'export', basePath (env-driven, §9), images.unoptimized
├─ package.json, tsconfig.json (strict), eslint.config.mjs
├─ ARCHITECTURE.md   # this document
└─ README.md         # how to run, test, deploy; links to PRD + RULES.md
```

**Rules for components (RULES.md):** reusable, simple folder structure, TS strict, function max ~40 lines, readable > clever, no unexplained magic. All pages are static (no dynamic routes, no server components fetching data) so the static export covers everything. `next/image` runs with `images: { unoptimized: true }` — static export has no image-optimizer server.

## 4. Design tokens — "Matroxx Obsidian Editorial"

Tokens live once, in `src/app/globals.css` as Tailwind v4 `@theme` variables. Components use the token names, never raw hex.

```css
@theme {
  --color-obsidian: #0C0F0E;      /* page background */
  --color-bronze: #C9A97D;        /* primary accent */
  --color-bronze-deep: #A27B50;   /* secondary bronze */
  --color-slate: #49554F;         /* supporting dark slate */
  --color-ink: #EDE8DF;           /* body text on obsidian (contrast-checked) */
  --color-muted: #9A968C;         /* secondary text on obsidian */
  --font-display: "Newsreader", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

- **Logo:** `public/logo/matroxx-logo-official-transparent.png` only. Never recreated, never re-coloured.
- **Layout:** editorial, numbered sections (`// 01 — Services`), generous spacing, max content width `72rem`, mobile-first.
- **Professional bar:** consistent spacing/typography, real content everywhere (no lorem ipsum), fast load, accessible (contrast, visible focus, alt text on every image).
- **Removed content:** the Oct 7 Stitch draft's invented "global hub coordinates" (Zurich / San Francisco / Tokyo) never ship. Quality Gate verifies every number and claim before publish (§10).

## 5. Stitch blueprint plan — design tool is Google Stitch (Figma is out)

Figma could not be connected (OAuth blocked; Sujay's call: use Stitch). The Stitch project **"Matroxx Software Studio Website"** already exists — https://stitch.withgoogle.com/projects/3630814384839570320 (created 2026-10-07, login saved in Secure Vault). **Reopen and refresh it; do not start from scratch.**

| Page | Stitch screens to refresh (desktop + mobile) | What changes vs the Oct 7 draft |
|---|---|---|
| Home | Hero (with Spline zone marked), stat strip, pillars, comparison table, cohort, flagship, philosophy, brief teaser | Remove hub cities; add verified stat strip; add Spline hero zone; add team teaser link to `/cohort` |
| Services | Three pillar sections + "What we don't do" strip | New page — no Oct 7 screen exists; draft from the Home pillar cards |
| Work | Case-study layout + one architecture-diagram slot + open slots | New page — draft from the Home flagship card; diagram slot is a placeholder for a real diagram, never a fake one |
| Cohort & Process | 6-step process timeline + cost split (partner pays / Matroxx covers) + timeline table (§8) + "How we work" team section | New page — draft from the Home cohort section |
| Contact | Brief builder form layout + assembled-brief preview + Copy / Download / Send-via-email states + success state | New page — draft from the Home brief teaser; form states are part of the blueprint |

**Stitch → code rule:** Stitch is the blueprint, not the code. Frontend hand-builds React components from the blueprint (RULES.md: readable > clever). No Stitch HTML is pasted into the repo.

**Spline hero scene (Home only):**
- Scene brief: dark obsidian field, bronze wireframe radar rings / MX-monogram motif, slow rotation, subtle mouse parallax. Created in Spline (Sujay's account, login saved) — Frontend drives it via the browser using the saved login; the scene spec is: one scene, no text in the scene, transparent background so the obsidian page shows through.
- The scene URL goes in `lib/site.ts` as `SPLINE_SCENE_URL` — one place, never hardcoded in a component.
- **Graceful degradation (required):** `SplineHero` lazy-loads; if the scene URL is unset or fails to load, the hero shows a static obsidian gradient + logo mark. The site must ship and look professional with or without the scene. Reduced-motion and mobile: scene disabled, static fallback shown.
- If Spline scene creation fails, the hero ships with the fallback and the scene is added in a later PR — it never blocks launch.

**Lottie motion (subtle, never distracting):**
- `lottie/success.json` — brief-assembled success check on the Contact page.
- `lottie/scroll-cue.json` — one subtle scroll cue in the hero.
- Stat counters are a small React hook, not a Lottie file. No other Lottie files — if a section wants motion, it earns it in review.

## 6. Brief builder form — React Hook Form + Zod, mailto + copy/download

No backend. No data stored. No tracking. A privacy line sits under the form: "Nothing you type is sent or stored — the brief is assembled in your browser."

**Fields (Zod schema in `lib/brief.ts`, one schema, shared by the form and the tests):**

| Field | Type | Validation |
|---|---|---|
| `name` | text | required, 2–80 chars |
| `company` | text | optional, max 80 chars |
| `email` | email | required, valid email — so Matroxx can reply (the visitor's mail client is the sender) |
| `projectType` | select | required enum: `web-platform` / `ai-agent-system` / `system-level` / `not-sure` |
| `scope` | textarea | required, 40–2000 chars (vision / scope / what "done" looks like) |
| `budgetContext` | radio | required enum: `cohort` / `standard` / `not-sure` |

- Form uses `react-hook-form` + `zodResolver`; inline field errors; submit is disabled until the form is valid; every field has a `<label>` and an accessible error message.
- **On submit:** `lib/brief.ts` assembles a plain-text brief (headed sections, readable without the site — name, company, email, project type, scope, budget context, date). The assembled brief is shown in a read-only preview for the visitor to check.
- **Three actions, all client-side:**
  1. **Copy brief** — `navigator.clipboard.writeText`, with a "Copied" confirmation.
  2. **Download brief** — downloads `matroxx-brief-<date>.md` via a Blob; works offline.
  3. **Send via email** — opens a `mailto:` link: recipient = the contact email in `lib/site.ts` (§11, open item), subject `Matroxx — Project Brief: <project type>`, body = URL-encoded brief.
- **Mailto length guard (required, honest limit):** some mail clients truncate bodies around ~2,000 characters. The builder counts the encoded body; if it exceeds 1,800 characters, the "Send via email" button shows a warning — "This brief is long for an email — use Copy or Download instead" — and stays clickable (the visitor decides), never silently truncated. The 2,000-char scope cap keeps most briefs under the limit.

## 7. Content model — one source of truth, verified before publish

- `lib/content.ts` holds **all page copy**: pillars, tenets, comparison rows, case-study text, slot descriptions, philosophy quote, timeline. Components render from it; no copy is hardcoded in a component.
- `lib/site.ts` holds **all facts**: nav links, contact email, Spline scene URL, SL Tech Radar URL, and every stat number.
- **Verification rule (Quality Gate owns this):** every number and claim on the site is checked against a real source before it ships. The live site currently claims "31/31 tests passing" and "about $0.0022 a week" for SL Tech Radar, and "Spring Boot 4" — Quality Gate re-verifies each against the live Radar repo before publish. A claim that cannot be verified is removed, not published with a guess.
- **Verification results (Quality Gate, 2026-11-24, repo `Sujanthan242/sl-tech-radar` at HEAD `4e56574d`):**
  - "31/31 tests passing" — **NOT VERIFIED → REMOVE** until `mvn test` is run at HEAD and the result recorded. The 31 `@Test` methods exist (1 + 7 + 6 + 8 + 9 across 5 test files), but no passing record exists anywhere (no Surefire report, CI runs no tests, QA report predates HEAD). A follow-up check is running `mvn test` at HEAD; only if it passes 31/31 may the site print it (with the run date).
  - "about $0.0022 a week" — **VERIFIED** (heavy-path Nebius estimate: ~8k in × $0.13/1M + ~3k out × $0.40/1M). Keep, preferably qualified as AI/LLM cost.
  - "Spring Boot 4" — **VERIFIED**, print the precise value **"Spring Boot 4.0.8"** (`backend/pom.xml`).
  - "Next.js 16 frontend" — **VERIFIED**, print the precise value **"Next.js 16.3.8"** (`frontend/package.json`).
  - "Spring AI" — **OVERSTATED → DROP**. Spring AI BOM 2.0.1 is declared but zero Spring AI code runs (provider chain is hand-rolled on Spring `RestClient`). Print "Spring Boot 4.0.8 backend" only.
  - "Live in production" — **PARTLY VERIFIED**. Product site is live (edition 2026-W41 renders), but the Render backend (`sl-tech-radar-backend.onrender.com/api/health`) was unreachable from the VM on 2026-11-24 (consistent with free-tier sleep/suspension, not proven down). Do not claim live-backend connectivity until DevOps re-checks Render; the live site may currently be serving mock fallback data.

## 8. Cohort timeline proposal — for Sujay to confirm at sign-off #2

Conservative and honest. These are **typical** durations, printed on the Cohort page as "typical, not a promise — each build's timeline is agreed in writing after discovery."

| Phase | What happens | Weeks (from selection) |
|---|---|---|
| 0. Brief + technical call | Visitor submits a brief → Matroxx replies → technical call to test fit | Week 0–1 |
| 1. Selection + discovery | Fit check, scope lock, stack + architecture sketch | Weeks 1–2 |
| 2. Build | Vertical slices, demo each week, partner sees progress | Weeks 3–7 (5 weeks) |
| 3. Hardening | Tests, Quality Gate review, security pass, docs | Week 8 |
| 4. Launch + handover | Deploy, handover, short support window | Week 9 |
| 5. Case study | Published only with partner approval | After launch |

**Total: 8–9 weeks from selection to launch for a typical build. Small builds: 5–6 weeks. Nothing is promised under 5 weeks.** If Sujay wants different numbers, he corrects them here at sign-off #2 — the Cohort page prints whatever he confirms, not this draft.

## 9. CI / staging / production — GitHub Actions, same repo, same Pages URL

Repo: `Sujanthan242/matroxx-website` (public), `main` branch protected. **Pages source: "Deploy from a branch", branch `gh-pages`.** (Not the Actions deploy mode — the preview scheme below needs one branch serving both production at the root and PR previews in subfolders.)

**`basePath` rule (the detail that makes project Pages work):** `next.config.mjs` reads `process.env.NEXT_BASE_PATH ?? '/matroxx-website'` and sets both `basePath` and `assetPrefix` from it. Production builds use `/matroxx-website`; PR preview builds set `NEXT_BASE_PATH=/matroxx-website/preview/pr-<n>`. `trailingSlash: true` so every route serves its own `index.html` on Pages.

**Three workflows:**

| Workflow | Trigger | Does |
|---|---|---|
| `ci.yml` | every push + every PR | checkout → Node 22 → `npm ci` → ESLint → `tsc --noEmit` → Vitest → `next build` (production basePath). Any failure blocks the PR. |
| `preview.yml` | every PR (opened / synchronised) | builds with `NEXT_BASE_PATH=/matroxx-website/preview/pr-<n>` → runs Playwright against the built `out/` served locally → deploys `out/` to `gh-pages` under `preview/pr-<n>/` → comments the preview URL on the PR. On PR close, the preview folder is removed. |
| `deploy.yml` | push to `main` only | rebuilds production `out/` → deploys to the `gh-pages` root. **Job runs in the `production` GitHub Environment with Sujay as required reviewer — the deploy waits for his click. That click IS sign-off #3. No agent ever has production access.** |

**Branch rule (RULES.md):** 1 feature = 1 branch + 1 PR, tests pass, Quality Gate reviews (Writer ≠ Reviewer). Branch names: `feature/<short-name>` (e.g. `feature/home-hero`, `feature/brief-builder`). No direct pushes to `main`. No secrets in any workflow — there are none to store.

## 10. Testing plan — Vitest + Playwright, no test = no merge

**Vitest (unit, `src/tests/`):**
- Brief Zod schema: valid brief passes; each invalid case fails with the right field error (empty name, bad email, scope under 40 chars, missing project type / budget context).
- Brief assembly: assembled text contains every field, in order, readable without the site.
- Mailto builder: subject and body URL-encoded correctly; the 1,800-char guard triggers exactly when the encoded body exceeds it.
- `lib/site.ts` / `lib/content.ts` shape: nav has 5 entries, pillars are 3, slots are 2, no empty strings.

**Playwright (e2e, against the built static export served locally — `npx serve out/`):**
- Home loads at 375px / 768px / 1440px; hero, pillars, comparison, cohort, flagship, philosophy, brief teaser all visible; no horizontal scroll, no overlapping text.
- Every internal link on every page resolves (no 404s); the SL Tech Radar link points at the live product URL.
- Mobile menu opens and closes at 375px; keyboard navigation reaches every link and button.
- Brief builder: fill → validation errors show for bad input → valid submit assembles the brief → Copy, Download and Send-via-email buttons are present and the preview is readable.
- Spline fallback: with the scene URL unset, the hero still renders the static fallback and the page is complete.
- Accessibility: `@axe-core/playwright` on all 5 pages — zero critical violations.
- Performance: Lighthouse ≥ 90 on Home (run as a CI step on the production build; Quality Gate treats a miss as a merge blocker).

**Claim verification (Quality Gate, manual, per PR):** every number/claim checked against its source (§7). A PR that adds or changes a claim without a source does not merge.

## 11. Build sequence — branch by branch (after sign-off #2)

Each step is one branch, one PR, tests green, Quality Gate review. Home first so Sujay can see the flagship page on staging early.

1. `feature/scaffold` — Next.js 16 + TS strict + Tailwind v4 tokens + layout (Header/Footer) + logo + CI workflows. No pages beyond a bare Home shell.
2. `feature/home` — full Home page (all sections, stat strip, Spline hero with fallback).
3. `feature/services` — Services page + "What we don't do" strip.
4. `feature/work` — Work page (case study + slots; architecture diagram slot stays visibly empty until a real diagram exists).
5. `feature/cohort` — Cohort & Process page (6 steps, cost split, §8 timeline, team section with the 6-agent room image).
6. `feature/contact-brief` — Contact page + BriefBuilder (form, validation, copy/download/mailto, length guard).
7. `feature/seo-a11y-polish` — per-page metadata, sitemap, robots.txt, 404, axe + Lighthouse pass, mobile sweep at 375/768/1440.
8. Staging preview → Sujay checks it on his phone → **sign-off #3** → DevOps ships to https://sujanthan242.github.io/matroxx-website/.

## 12. 6-agent role mapping — build phase

| Agent | Owns in this build |
|---|---|
| **1. Orchestrator (PM + Docs/Memory)** | Plan, branch/PR tracking (§11), sign-off checkpoints (#2 architecture → #3 deploy), keeps PRD + this ARCHITECTURE.md current. |
| **2. Product & Architect** | This document, Stitch blueprint review (§5), content outline per page, the open items in §13, claim-verification sources (§7). |
| **3. Frontend** | The Next.js build: all 5 pages, all components, Stitch blueprint → code, Spline scene + Lottie layers, BriefBuilder, responsive + accessibility. |
| **4. Backend** | None for this build (static site). Stays on standby — only involved if Sujay ever changes the §7.1 decision and a form endpoint is needed. |
| **5. Quality Gate (Reviewer + QA + Security)** | Reviews every PR (Writer ≠ Reviewer), verifies all numbers/claims (§7), runs Vitest + Playwright + axe, checks security (no secrets, no trackers, no unsafe deps), blocks merge on any failure. |
| **6. DevOps** | Repo + the 3 CI workflows (§9), PR staging previews, `gh-pages` deploy, the production environment gate — Sujay clicks prod. |

FRIDAY reviews the code AND runs/builds/tests it here before any merge — that review + run + test step is the fix for AI-code problems, per Sujay's workflow.

## 13. Open items for sign-off #2 — Sujay decides here

1. **Cohort timeline (§8):** 8–9 weeks typical, 5–6 weeks small builds, nothing under 5 weeks. Confirm, or give the numbers to print instead.
2. **Contact email for the brief mailto:** the architecture needs one address in `lib/site.ts`. Sujay to give it — do **not** default to his personal email without his word. (Options: a dedicated Matroxx address, or his personal email if he says so.)
3. **Team image:** the 6-agent room image (`media-generation-matroxx-team-room-6-0-2514b8a6-52d8-4619-b3e5-71bfe9bfbb7e.webp`) goes on the Cohort page's "How we work" section. Confirm it is OK to publish.
4. **Spline scene:** the hero scene is created in Sujay's Spline account (login saved) — Frontend drives it via the browser. If it cannot be made, the hero ships with the static fallback and the scene is added later. Confirm this fallback is acceptable.
5. **Pace vs exams:** exams start Dec 15. The website is first by Sujay's word, but revision comes first if time is tight — the build waits, it does not eat revision time. Confirm the build pauses on his word, no questions asked.

## 14. Honest notes

- **The current site is already decent and live.** If this architecture is too big for the time before exams, it can ship page-by-page (Home first, then the rest) — Sujay says so at sign-off and the branch order in §11 already supports it.
- **No invented content ships.** The old Stitch draft's hub cities and any unverified number are out. If a section has no real content yet (Work case studies beyond the Radar, the architecture diagram), it stays visibly empty rather than filled with a plausible fake.
- **The Spline scene is the only part that needs an outside account.** Everything else is code + free tiers + GitHub Pages. If Spline is unavailable, the site is still complete.
- **The WhatsApp Share pilot waits.** It was the first pipeline proof in the PRD; the website took its place by Sujay's word. The pilot's PRD is still on file and nothing in this architecture blocks it later.
