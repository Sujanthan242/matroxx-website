import { describe, expect, it } from "vitest";
import {
  MAILTO_BODY_LIMIT,
  assembleBrief,
  briefFileName,
  briefSchema,
  buildMailtoLink,
  formatBriefDate,
  type BriefInput,
} from "@/lib/brief";
import { CONTACT_PAGE, NOT_FOUND_PAGE } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/site";

const VALID: BriefInput = {
  budgetContext: "cohort",
  company: "Acme",
  email: "founder@acme.lk",
  name: "Sujay",
  projectType: "web-platform",
  scope:
    "A web platform for our shop: catalogue, orders, and payments, " +
    "with an admin view. Done looks like a live shop we can run.",
};

/** Brief schema, assembly and mailto builder (ARCHITECTURE.md §6, §10). */
describe("brief schema", () => {
  it("passes a valid brief", () => {
    expect(briefSchema.safeParse(VALID).success).toBe(true);
  });

  it("fails an empty name with the name error", () => {
    const result = briefSchema.safeParse({ ...VALID, name: "" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["name"]);
    expect(result.error.issues[0]?.message).toBe(
      "Name needs at least 2 characters.",
    );
  });

  it("fails a one-character name", () => {
    const result = briefSchema.safeParse({ ...VALID, name: "A" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["name"]);
  });

  it("fails a name over 80 characters", () => {
    const result = briefSchema.safeParse({ ...VALID, name: "A".repeat(81) });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["name"]);
  });

  it("fails a bad email with the email error", () => {
    const result = briefSchema.safeParse({ ...VALID, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["email"]);
    expect(result.error.issues[0]?.message).toBe(
      "Enter a valid email address.",
    );
  });

  it("fails scope under 40 characters with the scope error", () => {
    const result = briefSchema.safeParse({ ...VALID, scope: "Too short." });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["scope"]);
    expect(result.error.issues[0]?.message).toContain("at least 40");
  });

  it("fails scope over 2000 characters", () => {
    const result = briefSchema.safeParse({
      ...VALID,
      scope: "x".repeat(2001),
    });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["scope"]);
  });

  it("fails a missing project type with the project-type error", () => {
    const { projectType: _removed, ...rest } = VALID;
    const result = briefSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["projectType"]);
    expect(result.error.issues[0]?.message).toBe("Choose a project type.");
  });

  it("fails a missing budget context with the budget error", () => {
    const { budgetContext: _removed, ...rest } = VALID;
    const result = briefSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.path).toEqual(["budgetContext"]);
    expect(result.error.issues[0]?.message).toBe("Choose a budget context.");
  });

  it("allows company to be empty, and fails it over 80 characters", () => {
    expect(
      briefSchema.safeParse({ ...VALID, company: "" }).success,
    ).toBe(true);
    expect(
      briefSchema.safeParse({ ...VALID, company: undefined }).success,
    ).toBe(true);
    const result = briefSchema.safeParse({
      ...VALID,
      company: "C".repeat(81),
    });
    expect(result.success).toBe(false);
  });
});

describe("brief assembly", () => {
  it("contains every field, in order, readable without the site", () => {
    const date = new Date("2026-11-24T10:00:00.000Z");
    const brief = assembleBrief(VALID, date);
    const order = [
      "Sujay",
      "Acme",
      "founder@acme.lk",
      "Web platform",
      "A web platform for our shop",
      "Cohort model — $0 core build",
      "2026-11-24",
    ];
    let last = -1;
    for (const piece of order) {
      const at = brief.indexOf(piece);
      expect(at, `brief should contain: ${piece}`).toBeGreaterThan(-1);
      expect(at, `brief should keep fields in order at: ${piece}`).toBeGreaterThan(last);
      last = at;
    }
    expect(brief.startsWith("Matroxx — Project Brief")).toBe(true);
  });

  it("prints 'Not given' for an empty company", () => {
    const brief = assembleBrief(
      { ...VALID, company: "" },
      new Date("2026-11-24T10:00:00.000Z"),
    );
    expect(brief).toContain("Not given");
  });

  it("names the download file matroxx-brief-<date>.md", () => {
    expect(briefFileName(new Date("2026-11-24T10:00:00.000Z"))).toBe(
      "matroxx-brief-2026-11-24.md",
    );
    expect(formatBriefDate(new Date("2026-11-24T10:00:00.000Z"))).toBe(
      "2026-11-24",
    );
  });
});

describe("mailto builder", () => {
  it("builds a mailto to the approved contact email with URL-encoded subject and body", () => {
    const brief = assembleBrief(VALID, new Date("2026-11-24T10:00:00.000Z"));
    const link = buildMailtoLink(brief, "web-platform");
    expect(link.subject).toBe("Matroxx — Project Brief: Web platform");
    expect(link.href.startsWith(`mailto:${CONTACT_EMAIL}?subject=`)).toBe(
      true,
    );
    expect(CONTACT_EMAIL).toBe("sujanleo242@gmail.com");
    const body = new URL(link.href).searchParams.get("body");
    expect(body).toBe(brief);
    const subject = new URL(link.href).searchParams.get("subject");
    expect(subject).toBe(link.subject);
  });

  it("flags the 1,800-char guard exactly when the encoded body exceeds it", () => {
    expect(MAILTO_BODY_LIMIT).toBe(1800);
    const atLimit = buildMailtoLink("a".repeat(1800), "web-platform");
    expect(atLimit.encodedBodyLength).toBe(1800);
    expect(atLimit.tooLongForEmail).toBe(false);
    const overLimit = buildMailtoLink("a".repeat(1801), "web-platform");
    expect(overLimit.encodedBodyLength).toBe(1801);
    expect(overLimit.tooLongForEmail).toBe(true);
  });

  it("counts encoded length, not raw length — multibyte text costs more", () => {
    // "é" encodes to 6 chars (%C3%A9); 400 of them exceed the limit.
    const link = buildMailtoLink("é".repeat(400), "web-platform");
    expect(link.encodedBodyLength).toBe(2400);
    expect(link.tooLongForEmail).toBe(true);
  });
});

describe("contact content model", () => {
  it("has every Contact page string, none empty", () => {
    for (const value of Object.values(CONTACT_PAGE)) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
    expect(CONTACT_PAGE.privacy).toBe(
      "Nothing you type is sent or stored — the brief is assembled in your browser.",
    );
    expect(CONTACT_PAGE.mailtoWarning).toBe(
      "This brief is long for an email — use Copy or Download instead",
    );
  });

  it("has every 404 string, none empty", () => {
    for (const value of Object.values(NOT_FOUND_PAGE)) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
    expect(NOT_FOUND_PAGE.heading).toBe("This page doesn't exist yet");
  });
});
