import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { SITE_TAGLINE } from "@/lib/site";

/** Home renders every approved section (PRD §3.1) with its real copy. */
describe("Home", () => {
  it("renders hero, pillars, comparison, cohort, flagship, philosophy and teaser", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: SITE_TAGLINE }),
    ).toBeInTheDocument();
    expect(screen.getByText("AI & Integration Software — Colombo, Sri Lanka")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Start a project brief/ })).toHaveLength(2);
    expect(screen.getByRole("link", { name: /See the live product/ })).toBeInTheDocument();

    // The section labels are split for styling (gradient index, spec §5.5),
    // so assert the two rendered pieces instead of the joined string.
    // // 06 is the teaser panel label, rendered whole — not a SectionHeading.
    for (const [index, label] of [
      ["// 01", "— Services"],
      ["// 02", "— Where the model differs"],
      ["// 03", "— The Cohort Model"],
      ["// 04", "— Work"],
      ["// 05", "— Philosophy"],
    ]) {
      expect(screen.getByText(index)).toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText("// 06 — Project Brief")).toBeInTheDocument();

    for (const pillar of [
      "Web Application Development",
      "AI Agent Integration",
      "System-Level Software",
    ]) {
      expect(screen.getByRole("heading", { name: pillar })).toBeInTheDocument();
    }

    expect(screen.getByText(/Most software is built to be billed/)).toBeInTheDocument();
    expect(screen.getByText("SL Tech Radar")).toBeInTheDocument();
    expect(screen.getByText("Product platform")).toBeInTheDocument();
    expect(screen.getByText("Intelligent system")).toBeInTheDocument();
    expect(screen.getByText("Have something to build?")).toBeInTheDocument();
  });

  it("renders the verified stat strip", () => {
    render(<Home />);
    expect(screen.getByText("CORE COHORT BUILD")).toBeInTheDocument();
    expect(screen.getByText("OPEN COHORT SLOTS")).toBeInTheDocument();
  });
});
