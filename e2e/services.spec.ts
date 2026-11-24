import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Services e2e (Branch 4: feature/services). Page loads at 375 / 768 /
 * 1440px, every section visible, no horizontal scroll, mobile menu works,
 * keyboard tab-through reaches the CTA, axe zero critical violations.
 *
 * NOTE (deferral, not a failure — same as Branch 2): /work, /cohort and
 * /contact do not exist until Branches 5–6 build them, so those links are
 * asserted by href only; only /services itself must resolve here.
 */
const SECTIONS = [
  "// Services",
  "Three pillars, built end to end.",
  "// 01 — Web Application Development",
  "// 02 — AI Agent Integration",
  "// 03 — System-Level Software",
  "What is included",
  "What is not included",
  "Typical deliverables",
  "Done looks like a working product you can use from day one",
  "Done looks like an agent creating measurable value",
  "Done looks like services built to run quietly for years",
  "// 04 — What we don't do",
  "No microservices rewrites",
  "No marketing-only sites",
  "No fixed-price rescue of half-built projects without a review",
  "Have something to build?",
  // "Start a brief" is checked separately below: the header CTA is hidden
  // below the md breakpoint (mobile menu instead), so .first() would
  // resolve to the hidden header link at 375px.
];

for (const width of [375, 768, 1440]) {
  test(`services shows every section at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./services");

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

test("services page resolves and the Start a brief CTA points at /contact", async ({
  page,
}) => {
  const response = await page.goto("./services");
  expect(response?.status()).toBe(200);

  const cta = page.getByRole("link", { name: /Start a brief/ }).last();
  await expect(cta).toBeVisible();
  // Rendered href carries the project basePath + trailing slash.
  await expect(cta).toHaveAttribute("href", /\/contact\/$/);
});

test("mobile menu opens and closes at 375px on the Services page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./services");

  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu).toBeVisible();
  await expect(page.getByRole("link", { name: "Services" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeHidden();
});

test("keyboard tab-through reaches the Start a brief CTA and the footer email", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./services");
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

  for (const wanted of ["Start a brief", "sujanleo242@gmail.com"]) {
    expect(
      reached.some((label) => label.includes(wanted)),
      `tab-through should reach: ${wanted} (reached: ${reached.join(" | ")})`,
    ).toBe(true);
  }
});

test("axe: zero critical violations on the Services page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./services");
  await page.waitForTimeout(1500);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});
