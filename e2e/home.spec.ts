import { expect, test } from "@playwright/test";

/**
 * Smoke tests for the scaffold (Branch 1). Full-flow tests — every page,
 * mobile menu, brief builder, axe — land with the branches that own them.
 * NOTE: nav links to /services, /work, /cohort and /contact do not resolve
 * yet; those pages are built in Branches 3–6, so link-resolution tests
 * wait until then.
 */
test("home shell loads with headline, header and footer", async ({ page }) => {
  await page.goto("./");

  await expect(
    page.getByRole("heading", { name: "Software that thinks. Systems that endure." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Matroxx — home" }).first()).toBeVisible();
  await expect(page.getByText("Colombo, Sri Lanka").first()).toBeVisible();
});

test("home has no horizontal scroll at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > 375);
  expect(overflow).toBe(false);
});
