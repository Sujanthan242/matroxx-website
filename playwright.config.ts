import { defineConfig } from "@playwright/test";

const PORT = 4173;

/**
 * Playwright runs against the built static export served locally,
 * exactly as GitHub Pages will serve it (ARCHITECTURE.md §10).
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: `http://127.0.0.1:${PORT}/matroxx-website/`,
    trace: "on-first-retry",
  },
  webServer: {
    command: "node scripts/serve-out.mjs",
    url: `http://127.0.0.1:${PORT}/matroxx-website/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
