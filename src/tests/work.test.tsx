import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Work, { metadata } from "@/app/work/page";
import {
  CASE_STUDY,
  COHORT_SLOTS,
  SECTION_DESCRIPTIONS,
  WORK_CASE_STUDY,
  WORK_PAGE,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL, SL_TECH_RADAR_URL } from "@/lib/site";

/** Work page (PRD §3.3): the SL Tech Radar full case study, the two open
    cohort slots as briefs-in-waiting, an honest empty state, and the
    "Start a brief" CTA — all copy from lib/content.ts. */
describe("Work page", () => {
  it("renders the static headline and sub", () => {
    render(<Work />);

    expect(
      screen.getByRole("heading", { level: 1, name: WORK_PAGE.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(WORK_PAGE.sub)).toBeInTheDocument();
  });

  it("renders the full case study: problem, what was built, stack, badge note, live link", () => {
    render(<Work />);

    expect(screen.getByText("— The full case study")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: CASE_STUDY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDY.description)).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDY.audience)).toBeInTheDocument();
    expect(screen.getByText(WORK_CASE_STUDY.problem)).toBeInTheDocument();
    for (const item of WORK_CASE_STUDY.built) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    // Stack tags: Next.js / Spring Boot also appear in the numbers list.
    for (const tag of CASE_STUDY.stack) {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(WORK_CASE_STUDY.badgeNote)).toBeInTheDocument();

    const live = screen.getByRole("link", { name: /Visit the live product/ });
    expect(live).toBeInTheDocument();
    expect(live).toHaveAttribute("href", SL_TECH_RADAR_URL);
  });

  it("renders the verified numbers, and only the verified numbers", () => {
    render(<Work />);

    expect(screen.getByText("Verified numbers")).toBeInTheDocument();
    for (const number of WORK_CASE_STUDY.numbers) {
      expect(screen.getByText(number.label)).toBeInTheDocument();
      // Values repeat as stack tags, so assert presence, not uniqueness.
      expect(screen.getAllByText(number.value).length).toBeGreaterThan(0);
    }
    expect(
      screen.getByText("about $0.0022 a week"),
    ).toBeInTheDocument();
  });

  it("keeps the architecture-diagram slot visibly empty — no diagram rendered", () => {
    render(<Work />);

    const slot = screen.getByTestId("architecture-diagram-slot");
    expect(slot).toBeInTheDocument();
    expect(slot).toHaveTextContent(WORK_CASE_STUDY.diagramEmpty);
    expect(slot).toHaveTextContent(WORK_CASE_STUDY.diagramNote);
    // A fake diagram is a merge blocker (ARCHITECTURE.md §14): no svg,
    // img, canvas or drawn element of any kind inside the slot.
    expect(slot.querySelector("svg")).toBeNull();
    expect(slot.querySelector("img")).toBeNull();
    expect(slot.querySelector("canvas")).toBeNull();
  });

  it("renders the two open cohort slots as briefs-in-waiting, and no other project", () => {
    render(<Work />);

    expect(screen.getByText("— Open cohort slots")).toBeInTheDocument();
    expect(COHORT_SLOTS).toHaveLength(2);
    for (const slot of COHORT_SLOTS) {
      expect(
        screen.getByRole("heading", { name: slot.kind }),
      ).toBeInTheDocument();
      expect(screen.getByText(slot.description)).toBeInTheDocument();
    }
    // No invented case studies: the only case-study title on the page.
    expect(
      screen.getAllByRole("heading", { level: 2, name: CASE_STUDY.title }),
    ).toHaveLength(1);
  });

  it("renders the honest empty state for work that does not exist yet", () => {
    render(<Work />);

    expect(
      screen.getByRole("heading", { name: WORK_PAGE.emptyHeading }),
    ).toBeInTheDocument();
    expect(screen.getByText(WORK_PAGE.emptyBody)).toBeInTheDocument();
  });

  it("renders the Start a brief CTA linking to /contact", () => {
    render(<Work />);

    const cta = screen.getByRole("link", { name: new RegExp(CTA_LABEL) });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", CTA_HREF);
    expect(CTA_HREF).toBe("/contact");
  });

  it("exports page metadata with absolute Open Graph URLs and the logo og:image", () => {
    expect(metadata.title).toBe("Work — Matroxx");
    expect(metadata.description).toBe(SECTION_DESCRIPTIONS.work);
    const openGraph = metadata.openGraph as {
      images?: { url: string }[];
      url?: string;
    } | null;
    expect(openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/og.png`);
    expect(openGraph?.images?.[0]?.url.startsWith("https://")).toBe(true);
    expect(openGraph?.url).toBe(`${SITE_URL}/work`);
  });

  it("contains no removed, overstated or invented claims anywhere on the page", () => {
    render(<Work />);
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
    // Verified values (§7) are present, exactly as verified.
    for (const verified of [
      "Spring Boot 4.0.8",
      "Next.js 16.3.8",
      "about $0.0022 a week",
    ]) {
      expect(text).toContain(verified);
    }
  });
});

describe("work content model", () => {
  it("has a complete case study with no empty strings", () => {
    expect(WORK_CASE_STUDY.problem.trim().length).toBeGreaterThan(0);
    expect(WORK_CASE_STUDY.built.length).toBeGreaterThan(0);
    for (const item of WORK_CASE_STUDY.built) {
      expect(item.trim().length).toBeGreaterThan(0);
    }
    expect(WORK_CASE_STUDY.badgeNote.trim().length).toBeGreaterThan(0);
    expect(WORK_CASE_STUDY.diagramEmpty.trim().length).toBeGreaterThan(0);
    expect(WORK_CASE_STUDY.diagramNote.trim().length).toBeGreaterThan(0);
    expect(WORK_PAGE.heading.trim().length).toBeGreaterThan(0);
    expect(WORK_PAGE.emptyHeading.trim().length).toBeGreaterThan(0);
    expect(WORK_PAGE.emptyBody.trim().length).toBeGreaterThan(0);
  });

  it("keeps the verified numbers consistent with the case-study source", () => {
    const values = WORK_CASE_STUDY.numbers.map((n) => n.value);
    expect(values).toContain("Spring Boot 4.0.8");
    expect(values).toContain("Next.js 16.3.8");
    expect(values).toContain("about $0.0022 a week");
    expect(CASE_STUDY.stack).toContain("Spring Boot 4.0.8");
    expect(CASE_STUDY.stack).toContain("Next.js 16.3.8");
    expect(CASE_STUDY.costNote).toContain("about $0.0022 a week");
  });
});
