# Matroxx — Official Website

Professional rebuild of the Matroxx company website. Next.js 16 App Router,
TypeScript strict, Tailwind CSS v4, static export deployed to GitHub Pages.

- **Live (current static site):** https://sujanthan242.github.io/matroxx-website/
- **Repo:** https://github.com/Sujanthan242/matroxx-website
- **PRD:** `matroxx-website-rebuild-prd.md` (approved, sign-off #1)
- **Architecture:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) (approved, sign-off #2)
- **Rules:** [`~/workspace/matroxx/RULES.md`](../RULES.md) — TS strict, function
  max ~40 lines, readable > clever, 1 feature = 1 branch + 1 PR, tests pass.

## Run

Requires Node 22+ and npm.

```bash
npm ci        # install dependencies
npm run dev   # local dev server (basePath is /matroxx-website by default)
npm run build # static export into out/ (NEXT_BASE_PATH env, see below)
npm start     # serve the production build
```

## Test

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # Vitest (unit / component)
npm run test:e2e   # Playwright against the built out/ (run npm run build first)
```

No test = no merge. Quality Gate reviews every PR (Writer ≠ Reviewer).

## Deploy

GitHub Pages, project site, Pages source "Deploy from a branch", branch
`gh-pages`. Three workflows (see [ARCHITECTURE.md §9](./ARCHITECTURE.md)):

| Workflow | Trigger |
|---|---|
| `ci.yml` | every push + PR: lint → typecheck → Vitest → `next build` |
| `preview.yml` | every PR: build + Playwright, publish to `gh-pages/preview/pr-<n>/`, comment URL on PR; folder removed on PR close |
| `deploy.yml` | push to `main` only, `production` environment — Sujay clicks approve (sign-off #3). No agent has production access. |

`next.config.mjs` reads `NEXT_BASE_PATH` (default `/matroxx-website`) and
sets both `basePath` and `assetPrefix` from it. Preview builds set
`NEXT_BASE_PATH=/matroxx-website/preview/pr-<n>`.

## Logo — why it is a data URI

The official logo lives in `src/lib/images.ts` as a base64 WebP data URI
(`LOGO_DATA_URI`), not as a file under `public/`. Reason: the GitHub
connector used to push this repo can only transport UTF-8 text files, so a
binary PNG cannot be pushed through it. The embedded image is a **format
conversion of the official artwork only** — the logo was never recreated or
re-coloured. Transparency is preserved.

- Master PNG: `~/workspace/matroxx/logo/matroxx-logo-official-transparent.png`
  (581,746 bytes, 1052×612, transparent).
- Embedded: WebP quality 90, 56,042 bytes → 74,724 base64 characters
  (~75 KB in the JS bundle, loaded once and cached with the page).
- Bundle cost: every page pays ~75 KB for the logo. If binary pushes ever
  become possible, move the logo to `public/logo/` and delete `src/lib/images.ts`.
- The local `assets-src/` folder (master logo copy, team image) is
  git-ignored and is **not** part of the repo.

## Branch plan (ARCHITECTURE.md §11)

1. `feature/scaffold` — this branch: Next.js + tokens + layout + logo + CI.
2. `feature/home` — full Home page (sections, stat strip, Spline hero).
3. `feature/services` — Services page + "What we don't do" strip.
4. `feature/work` — Work page (SL Tech Radar case study + open slots).
5. `feature/cohort` — Cohort & Process page (steps, timeline, team section).
6. `feature/contact-brief` — Contact page + brief builder (form, copy/download/mailto).
7. `feature/seo-a11y-polish` — metadata, sitemap, robots.txt, 404, axe + Lighthouse.

Staging preview → Sujay checks it on his phone → sign-off #3 → production.
