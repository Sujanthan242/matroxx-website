import { expect, test } from "@playwright/test";

/**
 * Home motion e2e (Branch 3: feature/home-design-upgrade).
 * Scroll reveals fire once and never re-hide; reduced motion renders
 * everything visible with no hiding class; keyboard tab-through reaches
 * the page's links. Axe + Lighthouse are Quality Gate's checks (spec §11)
 * — no axe dependency is installed in this branch.
 */

test("sections reveal once on scroll and never re-hide", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");
  await page.waitForTimeout(300);

  const hiddenCount = () =>
    page.evaluate(
      () =>
        [...document.querySelectorAll(".mx-reveal, .mx-reveal-fast")].filter(
          (el) => getComputedStyle(el).opacity === "0",
        ).length,
    );

  // Below-fold sections start hidden (armed by JS after mount).
  expect(await hiddenCount()).toBeGreaterThan(0);

  // Scroll to the bottom: every reveal fires.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  expect(await hiddenCount()).toBe(0);

  // Scroll back to the top: nothing re-hides (once: true).
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  expect(await hiddenCount()).toBe(0);
});

test("reduced motion renders all content visible with no hiding class", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");
  await page.waitForTimeout(500);

  const hiding = await page.evaluate(
    () => document.querySelectorAll(".mx-reveal, .mx-reveal-fast").length,
  );
  expect(hiding).toBe(0);
  await expect(page.getByText("Web Application Development")).toBeVisible();
});

test("keyboard tab-through reaches the hero CTAs and footer links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./");
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
    "Start a project brief",
    "See the live product",
    "SL Tech Radar — live product",
    "sujanleo242@gmail.com",
  ]) {
    expect(
      reached.some((label) => label.includes(wanted)),
      `tab-through should reach: ${wanted} (reached: ${reached.join(" | ")})`,
    ).toBe(true);
  }
});
