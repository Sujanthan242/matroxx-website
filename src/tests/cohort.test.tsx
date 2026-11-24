import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Cohort, { metadata } from "@/app/cohort/page";
import {
  COHORT_COMPARISON,
  COHORT_PAGE,
  COHORT_SLOTS,
  COHORT_STEPS,
  COHORT_TEAM,
  SECTION_DESCRIPTIONS,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL } from "@/lib/site";
import { TEAM_ROOM_DATA_URI } from "@/lib/images";

/** Cohort & Process page (PRD §3.4): the 6-step journey, the cost split,
    the timeline of a typical build, the two open cohort slots as
    briefs-in-waiting, and the "How we work" team section — all copy from
    lib/content.ts, the room image from lib/images.ts. */
describe("Cohort page", () => {
  it("renders the static headline and sub", () => {
    render(<Cohort />);

    expect(
      screen.getByRole("heading", { level: 1, name: COHORT_PAGE.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(COHORT_PAGE.sub)).toBeInTheDocument();
  });

  it("renders the 6 steps in order, each with its week range", () => {
    render(<Cohort />);

    expect(screen.getByText("— How it works")).toBeInTheDocument();
    expect(COHORT_STEPS).toHaveLength(6);
    expect(COHORT_STEPS.map((s) => s.title)).toEqual([
      "Brief",
      "Selection + discovery",
      "Build",
      "Hardening",
      "Launch + handover",
      "Case study",
    ]);
    expect(COHORT_STEPS.map((s) => s.weeks)).toEqual([
      "Week 0–1",
      "Weeks 1–2",
      "Weeks 3–7",
      "Week 8",
      "Week 9",
      "After launch",
    ]);
    for (const step of COHORT_STEPS) {
      expect(
        screen.getByRole("heading", { name: step.title }),
      ).toBeInTheDocument();
      // The body appears in the step card and in the timeline table.
      expect(screen.getAllByText(step.body).length).toBe(2);
      // The week range appears in the step card and in the timeline table;
      // "After launch" appears once more, as the comparison-table aspect.
      expect(screen.getAllByText(step.weeks).length).toBeGreaterThanOrEqual(
        2,
      );
    }
    // The case study step happens only with partner approval — the body
    // appears in the step card and in the timeline table.
    expect(
      screen.getAllByText("Published only with partner approval.").length,
    ).toBe(2);
  });

  it("renders the cost split in plain language, with the cohort comparison", () => {
    render(<Cohort />);

    expect(screen.getByText("— What you pay")).toBeInTheDocument();
    expect(screen.getByText(COHORT_PAGE.costIntro)).toBeInTheDocument();
    expect(COHORT_COMPARISON).toHaveLength(4);
    for (const row of COHORT_COMPARISON) {
      // "After launch" also appears as a step week range, so assert
      // presence, not uniqueness, for the aspect column.
      expect(screen.getAllByText(row.aspect).length).toBeGreaterThan(0);
      expect(screen.getByText(row.matroxx)).toBeInTheDocument();
      expect(screen.getByText(row.standard)).toBeInTheDocument();
    }
    expect(
      screen.getByText(
        "$0 core build. The partner covers infrastructure, licences and third-party services at cost — never marked up.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the timeline: totals, the not-a-promise note, and every phase", () => {
    render(<Cohort />);

    expect(
      screen.getByText("— Timeline of a typical build"),
    ).toBeInTheDocument();
    expect(screen.getByText(COHORT_PAGE.timelineTotal)).toBeInTheDocument();
    expect(screen.getByText(COHORT_PAGE.timelineNote)).toBeInTheDocument();
    // Every step title appears twice (step card + timeline row).
    for (const step of COHORT_STEPS) {
      expect(screen.getAllByText(step.title).length).toBe(2);
    }
  });

  it("renders the two open cohort slots as briefs-in-waiting, and no other project", () => {
    render(<Cohort />);

    expect(screen.getByText("— Open cohort slots")).toBeInTheDocument();
    expect(COHORT_SLOTS).toHaveLength(2);
    for (const slot of COHORT_SLOTS) {
      expect(
        screen.getByRole("heading", { name: slot.kind }),
      ).toBeInTheDocument();
      expect(screen.getByText(slot.description)).toBeInTheDocument();
    }
  });

  it("renders the team section with the room image and the six roles only", () => {
    render(<Cohort />);

    // SectionHeading is a real <h2> (Branch 7 a11y fix — it was a <p>).
    expect(
      screen.getByRole("heading", { level: 2, name: /How we work/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(COHORT_TEAM.body)).toBeInTheDocument();
    expect(screen.getByText(COHORT_TEAM.caption)).toBeInTheDocument();

    const img = screen.getByRole("img", { name: COHORT_TEAM.imageAlt });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", TEAM_ROOM_DATA_URI);
    expect(img).toHaveAttribute("width", "1280");
    expect(img).toHaveAttribute("height", "853");

    expect(COHORT_TEAM.roles).toHaveLength(6);
    for (const role of COHORT_TEAM.roles) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
  });

  it("renders the Start a brief CTA linking to /contact", () => {
    render(<Cohort />);

    const cta = screen.getByRole("link", { name: new RegExp(CTA_LABEL) });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", CTA_HREF);
    expect(CTA_HREF).toBe("/contact");
  });

  it("exports page metadata with absolute Open Graph URLs and the logo og:image", () => {
    expect(metadata.title).toBe("Cohort & Process — Matroxx");
    expect(metadata.description).toBe(SECTION_DESCRIPTIONS.cohort);
    const openGraph = metadata.openGraph as {
      images?: { url: string }[];
      url?: string;
    } | null;
    expect(openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/og.png`);
    expect(openGraph?.images?.[0]?.url.startsWith("https://")).toBe(true);
    expect(openGraph?.url).toBe(`${SITE_URL}/cohort`);
  });

  it("contains no removed, overstated or invented claims anywhere on the page", () => {
    render(<Cohort />);
    const text = document.body.textContent ?? "";

    // Removed / overstated per ARCHITECTURE.md §7, plus hub cities (§4).
    for (const forbidden of [
      "31/31",
      "tests passing",
      "Spring AI",
      "Zurich",
      "San Francisco",
      "Tokyo",
      "backend is live",
      "live backend",
    ]) {
      expect(text).not.toContain(forbidden);
    }
    // The approved timeline figures are present, exactly as approved (§8).
    expect(text).toContain("8–9 weeks");
    expect(text).toContain("5–6 weeks");
    expect(text).toContain("Nothing is promised under 5 weeks");
    expect(text).toContain("never marked up");
    expect(text).toContain("Competitive");
  });
});

describe("cohort content model", () => {
  it("has complete steps, cost copy and team copy with no empty strings", () => {
    for (const step of COHORT_STEPS) {
      expect(step.id.trim().length).toBeGreaterThan(0);
      expect(step.title.trim().length).toBeGreaterThan(0);
      expect(step.weeks.trim().length).toBeGreaterThan(0);
      expect(step.body.trim().length).toBeGreaterThan(0);
    }
    expect(COHORT_PAGE.heading.trim().length).toBeGreaterThan(0);
    expect(COHORT_PAGE.sub.trim().length).toBeGreaterThan(0);
    expect(COHORT_PAGE.costIntro.trim().length).toBeGreaterThan(0);
    expect(COHORT_PAGE.timelineTotal.trim().length).toBeGreaterThan(0);
    expect(COHORT_PAGE.timelineNote.trim().length).toBeGreaterThan(0);
    expect(COHORT_TEAM.body.trim().length).toBeGreaterThan(0);
    expect(COHORT_TEAM.caption.trim().length).toBeGreaterThan(0);
    expect(COHORT_TEAM.imageAlt.trim().length).toBeGreaterThan(0);
  });

  it("keeps the step weeks and the timeline totals consistent", () => {
    // The timeline table is built from the same COHORT_STEPS data, so
    // the first step starts the journey and the last ends after launch.
    expect(COHORT_STEPS[0]?.weeks).toBe("Week 0–1");
    expect(COHORT_STEPS[COHORT_STEPS.length - 1]?.weeks).toBe("After launch");
    expect(COHORT_PAGE.timelineTotal).toContain("8–9 weeks");
    expect(COHORT_PAGE.timelineTotal).toContain("5–6 weeks");
    expect(COHORT_PAGE.timelineNote).toContain("not a promise");
  });
});
