import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Services, { metadata } from "@/app/services/page";
import {
  PILLARS,
  SERVICE_DETAILS,
  SERVICES_PAGE,
  WHAT_WE_DONT_DO,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL } from "@/lib/site";

/** Services page (PRD §3.2): expanded pillars, the exclusions strip,
    and the "Start a brief" CTA — all copy from lib/content.ts. */
describe("Services page", () => {
  it("renders the static headline and all three expanded pillar sections", () => {
    render(<Services />);

    expect(
      screen.getByRole("heading", { level: 1, name: SERVICES_PAGE.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(SERVICES_PAGE.sub)).toBeInTheDocument();

    // SectionHeading renders the pillar title as label text inside a <p>
    // (gradient index span + "— Title"), not as a heading element —
    // same split as Home (see home.test.tsx).
    for (const pillar of PILLARS) {
      expect(screen.getByText(`— ${pillar.title}`)).toBeInTheDocument();
      expect(screen.getByText(pillar.what)).toBeInTheDocument();
      expect(screen.getByText(pillar.get)).toBeInTheDocument();
      // Tags repeat across pillars (e.g. PostgreSQL on two), so assert
      // presence rather than uniqueness.
      for (const tag of pillar.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      }
    }
    for (const detail of SERVICE_DETAILS) {
      // Items can repeat elsewhere on the page (e.g. "REST APIs" is both
      // a stack tag and an included item), so assert presence, not
      // uniqueness.
      for (const item of [
        ...detail.included,
        ...detail.notIncluded,
        ...detail.deliverables,
      ]) {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      }
      expect(screen.getByText(detail.done)).toBeInTheDocument();
    }
    // One list heading per pillar section, so each appears 3 times.
    for (const heading of [
      "What is included",
      "What is not included",
      "Typical deliverables",
    ]) {
      expect(screen.getAllByText(heading)).toHaveLength(3);
    }
  });

  it("renders the 3 settled exclusions in the 'What we don't do' strip", () => {
    render(<Services />);

    // SectionHeading label text, not a heading element (see above).
    expect(screen.getByText("— What we don't do")).toBeInTheDocument();
    for (const exclusion of WHAT_WE_DONT_DO) {
      expect(
        screen.getByRole("heading", { name: exclusion.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(exclusion.body)).toBeInTheDocument();
    }
  });

  it("renders the Start a brief CTA linking to /contact", () => {
    render(<Services />);

    const cta = screen.getByRole("link", { name: new RegExp(CTA_LABEL) });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", CTA_HREF);
    expect(CTA_HREF).toBe("/contact");
  });

  it("exports page metadata with absolute Open Graph URLs and the logo og:image", () => {
    expect(metadata.title).toBe("Services — Matroxx");
    expect(metadata.description).toBe(SERVICES_PAGE.sub);
    const openGraph = metadata.openGraph as {
      images?: { url: string }[];
      url?: string;
    } | null;
    expect(openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/og.png`);
    expect(openGraph?.images?.[0]?.url.startsWith("https://")).toBe(true);
    expect(openGraph?.url).toBe(`${SITE_URL}/services`);
  });
});

describe("services content model", () => {
  it("has one expanded detail per pillar, with no empty strings", () => {
    expect(SERVICE_DETAILS).toHaveLength(3);
    expect(SERVICE_DETAILS.map((d) => d.id)).toEqual(
      PILLARS.map((p) => p.id),
    );
    for (const detail of SERVICE_DETAILS) {
      for (const list of [
        detail.included,
        detail.notIncluded,
        detail.deliverables,
      ]) {
        expect(list.length).toBeGreaterThan(0);
        for (const item of list) expect(item.trim().length).toBeGreaterThan(0);
      }
      expect(detail.done.trim().length).toBeGreaterThan(0);
    }
  });

  it("has exactly the 3 settled exclusions, verbatim titles", () => {
    expect(WHAT_WE_DONT_DO).toHaveLength(3);
    expect(WHAT_WE_DONT_DO.map((e) => e.title)).toEqual([
      "No microservices rewrites",
      "No marketing-only sites",
      "No fixed-price rescue of half-built projects without a review",
    ]);
    for (const exclusion of WHAT_WE_DONT_DO) {
      expect(exclusion.body.trim().length).toBeGreaterThan(0);
    }
  });
});
