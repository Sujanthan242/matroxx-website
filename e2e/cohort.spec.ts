import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Cohort e2e (Branch 6: feature/cohort). Page loads at 375 / 768 / 1440px,
 * every section visible, no horizontal scroll, the team image renders,
 * mobile menu works, keyboard tab-through reaches every link/button,
 * axe zero critical violations.
 *
 * NOTE (deferral, not a failure — same as Branch 5): /contact does not
 * exist until Branch 7 builds it, so the "Start a brief" CTA is asserted
 * by href only; only /cohort itself must resolve here. /services and
 * /work resolve since Branches 4–5.
 */
const SECTIONS = [
  "// Cohort & Process",
  "How the cohort model works, step by step.",
  "// 01 — How it works",
  // "Brief" is checked by heading role below: getByText("Brief") would
  // match the hidden header "Start a brief" CTA first at 375px.
  "Selection + discovery",
  "Build",
  "Hardening",
  "Launch + handover",
  "Case study",
  "Week 0–1",
  "Weeks 3–7",
  "Week 9",
  "After launch",
  "// 02 — What you pay",
  "In plain language, no fine print",
  "$0 core build",
  "never marked up",
  "Competitive",
  "// 03 — Timeline of a typical build",
  "8–9 weeks from selection to launch for a typical build",
  "Nothing is promised under 5 weeks",
  "Typical, not a promise",
  "// 04 — Open cohort slots",
  "Product platform",
  "Intelligent system",
  "// 05 — How we work",
  "A small AI-assisted engineering team, founder-led",
  "Orchestrator",
  "Quality Gate",
  "DevOps",
  "Have something to build?",
  // "Start a brief" is checked separately below: the header CTA is hidden
  // below the md breakpoint (mobile menu instead), so .first() would
  // resolve to the hidden header link at 375px.
];

for (const width of [375, 768, 1440]) {
  test(`cohort shows every section at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./cohort");

    await expect(
      page.getByRole("heading", { name: "Brief" }),
    ).toBeVisible();
    for (const text of SECTIONS) {
      await expect(page.getByText(text).first()).toBeVisible();
    }

    // The team room image renders (base64 data URI, not a binary file).
    const img = page.getByRole("img", {
      name: "The six-agent Matroxx team room",
    });
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute(
      "src",
      /^data:image\/webp;base64,/,
    );

    // The CTA panel's "Start a brief" is visible at every width; the
    // header one is hidden below md (mobile menu instead).
    await expect(
      page.getByRole("link", { name: /Start a brief/ }).last(),
    ).toBeVisible();

    const overflow = await page.evaluate(
      (w) => document.documentElement.scrollWidth > w,
      width,
    );
    expect(overflow).toBe(false);
  });
}

test("cohort page resolves and the CTA points at /contact", async ({
  page,
}) => {
  const response = await page.goto("./cohort");
  expect(response?.status()).toBe(200);

  const cta = page.getByRole("link", { name: /Start a brief/ }).last();
  await expect(cta).toBeVisible();
  // Rendered href carries the project basePath + trailing slash.
  await expect(cta).toHaveAttribute("href", /\/contact\/$/);
});

test("cohort page nav link to /cohort resolves (no 404 from the header)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");

  const navCohort = page.getByRole("link", { name: "Cohort" }).first();
  await expect(navCohort).toBeVisible();
  await navCohort.click();
  await expect(page).toHaveURL(/\/cohort\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "How the cohort model works, step by step.",
    }),
  ).toBeVisible();
});

test("cohort Process nav link jumps to the steps section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");

  const navProcess = page.getByRole("link", { name: "Process" }).first();
  await expect(navProcess).toBeVisible();
  await navProcess.click();
  // trailingSlash puts the slash before the hash: /cohort/#process.
  await expect(page).toHaveURL(/\/cohort\/#process$/);
  await expect(
    page.getByRole("heading", { name: "Brief" }),
  ).toBeVisible();
});

test("mobile menu opens and closes at 375px on the Cohort page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./cohort");

  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu).toBeVisible();
  await expect(page.getByRole("link", { name: "Cohort" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeHidden();
});

test("keyboard tab-through reaches a slot CTA, the Start a brief CTA and the footer email", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./cohort");
  await page.waitForTimeout(1500);

  const reached: string[] = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const label = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return "";
      return el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "";
    });
    if (label) reached.push(label);
    if (label.includes("sujanleo242@gmail.com")) break;
  }

  for (const wanted of [
    "Prepare a brief",
    "Start a brief",
    "sujanleo242@gmail.com",
  ]) {
    expect(
      reached.some((label) => label.includes(wanted)),
      `tab-through should reach: ${wanted} (reached: ${reached.join(" | ")})`,
    ).toBe(true);
  }
});

test("axe: zero critical violations on the Cohort page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./cohort");
  await page.waitForTimeout(1500);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});
