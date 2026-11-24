import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Work e2e (Branch 5: feature/work). Page loads at 375 / 768 / 1440px,
 * every section visible, no horizontal scroll, the live-product link
 * points at the live product URL, mobile menu works, keyboard tab-through
 * reaches every link/button, axe zero critical violations.
 *
 * NOTE (deferral, not a failure — same as Branch 4): /cohort and
 * /contact do not exist until Branches 6–7 build them, so those links
 * are asserted by href only; only /work itself must resolve here.
 * /services resolves since Branch 4.
 */
const SECTIONS = [
  "// Work",
  "One live product. Two open slots.",
  "// 01 — The full case study",
  "SL Tech Radar",
  "The problem",
  "What was built",
  "Verified numbers",
  "Spring Boot 4.0.8",
  "Next.js 16.3.8",
  "about $0.0022 a week",
  "Architecture",
  "Architecture diagram — coming with the published case study.",
  "Look for the “by Matroxx” badge in the live product's header.",
  "// 02 — Open cohort slots",
  "Product platform",
  "Intelligent system",
  "More work, when it exists",
  "Have something to build?",
  // "Start a brief" is checked separately below: the header CTA is hidden
  // below the md breakpoint (mobile menu instead), so .first() would
  // resolve to the hidden header link at 375px.
];

for (const width of [375, 768, 1440]) {
  test(`work shows every section at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./work");

    for (const text of SECTIONS) {
      await expect(page.getByText(text).first()).toBeVisible();
    }

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

test("work page resolves, the live link points at the live product, and the CTA points at /contact", async ({
  page,
}) => {
  const response = await page.goto("./work");
  expect(response?.status()).toBe(200);

  const live = page.getByRole("link", { name: /Visit the live product/ });
  await expect(live).toBeVisible();
  await expect(live).toHaveAttribute(
    "href",
    "https://sujanthan242.github.io/sl-tech-radar/",
  );

  const cta = page.getByRole("link", { name: /Start a brief/ }).last();
  await expect(cta).toBeVisible();
  // Rendered href carries the project basePath + trailing slash.
  await expect(cta).toHaveAttribute("href", /\/contact\/$/);
});

test("work page nav link to /work resolves (no 404 from the header)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");

  const navWork = page.getByRole("link", { name: "Work" }).first();
  await expect(navWork).toBeVisible();
  await navWork.click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "One live product." }),
  ).toBeVisible();
});

test("mobile menu opens and closes at 375px on the Work page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./work");

  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu).toBeVisible();
  await expect(page.getByRole("link", { name: "Work" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeHidden();
});

test("keyboard tab-through reaches the live link, the Start a brief CTA and the footer email", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./work");
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
    "Visit the live product",
    "Start a brief",
    "sujanleo242@gmail.com",
  ]) {
    expect(
      reached.some((label) => label.includes(wanted)),
      `tab-through should reach: ${wanted} (reached: ${reached.join(" | ")})`,
    ).toBe(true);
  }
});

test("axe: zero critical violations on the Work page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./work");
  await page.waitForTimeout(1500);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});
