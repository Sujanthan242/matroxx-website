import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CTA_LABEL, NAV_LINKS } from "@/lib/site";

/**
 * Smoke tests for the scaffold: header nav + CTA render, footer renders.
 * Page-section tests land with the pages that own them (Branch 2+).
 */
describe("Header", () => {
  it("renders every nav link and the CTA", () => {
    render(<Header />);

    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: CTA_LABEL })).toBeInTheDocument();
  });

  it("renders the official logo with alt text", () => {
    render(<Header />);
    expect(screen.getByRole("img", { name: "Matroxx logo" })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders the location and the live-product link", () => {
    render(<Footer />);
    expect(screen.getByText("Colombo, Sri Lanka")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "SL Tech Radar — live product" }),
    ).toBeInTheDocument();
  });
});
