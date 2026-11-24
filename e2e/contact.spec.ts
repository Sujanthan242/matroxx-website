import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Contact e2e (Branch 7: feature/contact). The BriefBuilder fills,
 * validates inline, assembles the brief on submit, and offers Copy /
 * Download / Send-via-email; the page loads at 375 / 768 / 1440px with
 * no horizontal scroll, the mobile menu works, keyboard tab-through
 * reaches the form and the email link, axe zero critical violations.
 */

const SCOPE =
  "A web platform for our shop: catalogue, orders, and payments, " +
  "with an admin view. Done looks like a live shop we can run.";

async function fillValidForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Your name").fill("Sujay");
  await page.getByLabel("Company or entity (optional)").fill("Acme");
  await page.getByLabel("Email").fill("founder@acme.lk");
  await page.getByLabel("Project type").selectOption("web-platform");
  await page.getByLabel("Scope").fill(SCOPE);
  await page.getByLabel("Cohort model — $0 core build").check();
}

for (const width of [375, 768, 1440]) {
  test(`contact shows the brief builder at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./contact");

    await expect(
      page.getByRole("heading", { level: 1, name: "Start a project brief." }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Nothing you type is sent or stored — the brief is assembled in your browser.",
      ),
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "sujanleo242@gmail.com" })
        .first(),
    ).toBeVisible();

    for (const label of [
      "Your name",
      "Company or entity (optional)",
      "Email",
      "Project type",
      "Scope",
    ]) {
      await expect(page.getByLabel(label).first()).toBeVisible();
    }
    // Budget context is a fieldset/legend group, not a labelled control.
    await expect(
      page.getByRole("group", { name: "Budget context" }),
    ).toBeVisible();

    const overflow = await page.evaluate(
      (w) => document.documentElement.scrollWidth > w,
      width,
    );
    expect(overflow).toBe(false);
  });
}

test("brief builder: submit stays disabled until the form is valid, then assembles the brief", async ({
  page,
}) => {
  await page.goto("./contact");

  const submit = page.getByRole("button", { name: "Assemble my brief" });
  await expect(submit).toBeDisabled();

  await fillValidForm(page);
  await expect(submit).toBeEnabled();
  await submit.click();

  const preview = page.getByLabel("Assembled project brief");
  await expect(preview).toBeVisible();
  const text = await preview.inputValue();
  for (const piece of [
    "Sujay",
    "Acme",
    "founder@acme.lk",
    "Web platform",
    "A web platform for our shop",
    "Cohort model — $0 core build",
  ]) {
    expect(text).toContain(piece);
  }
  await expect(
    page.getByRole("heading", {
      name: "Your brief — check it before you send it",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Copy brief" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Download brief" }),
  ).toBeVisible();
  const mailto = page.getByRole("link", { name: "Send via email" });
  await expect(mailto).toBeVisible();
  await expect(mailto).toHaveAttribute(
    "href",
    /^mailto:sujanleo242@gmail\.com\?subject=Matroxx%20%E2%80%94%20Project%20Brief%3A%20Web%20platform&body=/,
  );
});

test("brief builder: bad input shows inline errors and keeps submit disabled", async ({
  page,
}) => {
  await page.goto("./contact");

  await page.getByLabel("Your name").fill("A");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Scope").fill("Too short.");

  await expect(
    page.getByText("Name needs at least 2 characters."),
  ).toBeVisible();
  await expect(
    page.getByText("Enter a valid email address."),
  ).toBeVisible();
  await expect(
    page.getByText(/Scope needs at least 40 characters/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Assemble my brief" }),
  ).toBeDisabled();
});

test("brief builder: Copy shows 'Copied' and Download saves matroxx-brief-<date>.md", async ({
  browser,
}) => {
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("http://127.0.0.1:4173/matroxx-website/contact/");

  await fillValidForm(page);
  const submit = page.getByRole("button", { name: "Assemble my brief" });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByLabel("Assembled project brief")).toBeVisible();

  await page.getByRole("button", { name: "Copy brief" }).click();
  await expect(
    page.getByRole("button", { name: "Copied" }),
  ).toBeVisible();
  const clipboard = await page.evaluate(() =>
    navigator.clipboard.readText(),
  );
  expect(clipboard).toContain("Sujay");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download brief" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(
    /^matroxx-brief-\d{4}-\d{2}-\d{2}\.md$/,
  );
  await context.close();
});

test("brief builder: a long brief warns on Send-via-email and keeps the link", async ({
  page,
}) => {
  await page.goto("./contact");

  await fillValidForm(page);
  await page.getByLabel("Scope").fill("x".repeat(2000));
  const submit = page.getByRole("button", { name: "Assemble my brief" });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByLabel("Assembled project brief")).toBeVisible();

  await expect(
    page.getByText(
      "This brief is long for an email — use Copy or Download instead",
    ),
  ).toBeVisible();
  // The visitor decides: the link stays clickable, never truncated.
  const mailto = page.getByRole("link", { name: "Send via email" });
  await expect(mailto).toBeVisible();
  await expect(mailto).toHaveAttribute(
    "href",
    /^mailto:sujanleo242@gmail\.com\?subject=/,
  );
});

test("mobile menu opens and closes at 375px on the Contact page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./contact");

  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeHidden();
});

test("keyboard tab-through reaches the brief form and the contact email", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./contact");
  await page.waitForTimeout(1500);

  // The submit button is disabled on an empty form, so a keyboard user
  // cannot reach it until the form is valid — fill it first, then tab
  // from the top of the page. Filling leaves focus on the last field,
  // and Chromium resumes tab order from there, so explicitly focus the
  // first focusable element (the header logo link) before tabbing.
  await fillValidForm(page);
  await page.getByRole("link", { name: "Matroxx — home" }).first().focus();

  const reached: string[] = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const label = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return "";
      return (
        el.getAttribute("aria-label") ??
        (el as HTMLInputElement).labels?.[0]?.textContent ??
        el.textContent?.trim() ??
        ""
      );
    });
    if (label) reached.push(label);
    if (label.includes("sujanleo242@gmail.com")) break;
  }

  for (const wanted of [
    "Your name",
    "Email",
    "Assemble my brief",
    "sujanleo242@gmail.com",
  ]) {
    expect(
      reached.some((label) => label.includes(wanted)),
      `tab-through should reach: ${wanted} (reached: ${reached.join(" | ")})`,
    ).toBe(true);
  }
});

test("axe: zero critical violations on the Contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("./contact");
  await page.waitForTimeout(1500);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
  expect(
    critical,
    `critical axe violations: ${JSON.stringify(critical, null, 2)}`,
  ).toHaveLength(0);
});
