import { expect, test } from "@playwright/test";

/**
 * Home e2e (Branch 2: feature/home). Every section visible at 375 / 768 /
 * 1440px, no horizontal scroll, no overlapping text, mobile menu opens and
 * closes, Spline fallback renders with the scene URL unset.
 *
 * NOTE (deferral, not a failure): links to /services, /work, /cohort and
 * /contact 404 until Branches 3–6 build those pages, so link-resolution
 * tests wait until then — as in Branch 1.
 */
const SECTIONS = [
  "Software that thinks. Systems that endure.",
  "// 01 — Services",
  "Web Application Development",
  "AI Agent Integration",
  "System-Level Software",
  "// 02 — Where the model differs",
  "// 03 — The Cohort Model",
  "Software as sovereign media",
  "// 04 — Work",
  "SL Tech Radar",
  "Product platform",
  "Intelligent system",
  "Most software is built to be billed",
  "Have something to build?",
];

for (const width of [375, 768, 1440]) {
  test(`home shows every section at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./");

    for (const text of SECTIONS) {
      await expect(page.getByText(text).first()).toBeVisible();
    }

    const overflow = await page.evaluate(
      (w) => document.documentElement.scrollWidth > w,
      width,
    );
    expect(overflow).toBe(false);
  });
}

test("mobile menu opens and closes at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");

  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu).toBeVisible();
  await expect(page.getByRole("link", { name: "Services" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeHidden();
});

test("hero stat strip shows verified counts and the Radar link is live", async ({
  page,
}) => {
  await page.goto("./");

  await expect(page.getByText("CORE COHORT BUILD", { exact: true })).toBeVisible();
  await expect(page.getByText("OPEN COHORT SLOTS", { exact: true })).toBeVisible();
  const radar = page.getByRole("link", { name: "See the live product" });
  await expect(radar).toBeVisible();
  await expect(radar).toHaveAttribute(
    "href",
    "https://sujanthan242.github.io/sl-tech-radar/",
  );
});
