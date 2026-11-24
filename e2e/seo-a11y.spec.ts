import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * SEO + a11y polish e2e (Branch 7: feature/contact). Every internal link
 * on every page resolves (no 404s); the SL Tech Radar link points at the
 * live product URL; sitemap.xml and robots.txt serve; the branded 404
 * page renders for an unknown route; per-page metadata is present; axe
 * zero critical violations on Home (Services, Work, Cohort and Contact
 * have their own axe tests).
 */

const PAGES = ["", "services", "work", "cohort", "contact"];

for (const pagePath of PAGES) {
  test(`every internal link on /${pagePath || "(home)"} resolves`, async ({
    page,
    request,
  }) => {
    await page.goto(`./${pagePath}`);
    const hrefs = await page.$$eval("a", (links) =>
      links.map((a) => a.getAttribute("href") ?? ""),
    );
    const internal = [
      ...new Set(
        hrefs
          .filter((href) => href.startsWith("/matroxx-website/"))
          .map((href) => href.split("#")[0].split("?")[0])
          .filter(Boolean),
      ),
    ];
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) {
      const response = await request.get(href);
      expect(response.status(), `internal link should resolve: ${href}`).toBe(
        200,
      );
    }
  });
}

test("the SL Tech Radar link points at the live product URL", async ({
  page,
}) => {
  await page.goto("./");
  const radar = page.getByRole("link", { name: "See the live product" });
  await expect(radar).toBeVisible();
  await expect(radar).toHaveAttribute(
    "href",
    "https://sujanthan242.github.io/sl-tech-radar/",
  );
});

test("sitemap.xml lists all 5 routes and robots.txt points at it", async ({
  request,
}) => {
  const sitemap = await request.get("./sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  for (const route of ["", "services/", "work/", "cohort/", "contact/"]) {
    expect(sitemapText).toContain(
      `https://sujanthan242.github.io/matroxx-website/${route}`,
    );
  }

  const robots = await request.get("./robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain("User-agent: *");
  expect(robotsText).toContain(
    "Sitemap: https://sujanthan242.github.io/matroxx-website/sitemap.xml",
  );
});

test("an unknown route renders the branded 404 page with links home and to Contact", async ({
  page,
}) => {
  const response = await page.goto("./this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "This page doesn't exist yet",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to Home" }),
  ).toHaveAttribute("href", /\/$/);
  await expect(
    page.getByRole("link", { name: "Contact Matroxx" }),
  ).toHaveAttribute("href", /\/contact\/$/);
});

test("per-page metadata: title, description and Open Graph tags on every page", async ({
  page,
}) => {
  const expected: Record<string, string> = {
    "": "Matroxx — Software that thinks. Systems that endure.",
    cohort: "Cohort & Process — Matroxx",
    contact: "Contact — Matroxx",
    services: "Services — Matroxx",
    work: "Work — Matroxx",
  };
  for (const [route, title] of Object.entries(expected)) {
    await page.goto(`./${route}`);
    await expect(page).toHaveTitle(title);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.trim().length).toBeGreaterThan(0);
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle?.trim().length).toBeGreaterThan(0);
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBe(
      "https://sujanthan242.github.io/matroxx-website/og.png",
    );
  }
});

test("axe: zero critical violations on the Home page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");
  await page.waitForTimeout(1500);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});

test("axe: zero critical violations on the 404 page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./this-page-does-not-exist");
  await page.waitForTimeout(1000);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});
