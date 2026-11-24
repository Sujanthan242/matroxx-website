import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Contact, { metadata } from "@/app/contact/page";
import { CONTACT_PAGE } from "@/lib/content";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

/** Forbidden claims (ARCHITECTURE.md §7): nothing unverified or invented
    may appear on the Contact page — no test-count claim, no "Spring AI",
    no hub cities, no live-backend claim. */
const FORBIDDEN = [
  "31/31",
  "tests passing",
  "Spring AI",
  "Zurich",
  "San Francisco",
  "Tokyo",
  "live backend",
];

const SCOPE =
  "A web platform for our shop: catalogue, orders, and payments, " +
  "with an admin view. Done looks like a live shop we can run.";

/** Fill the form with valid values (all six fields). */
function fillValidForm() {
  fireEvent.change(screen.getByLabelText(CONTACT_PAGE.nameLabel), {
    target: { value: "Sujay" },
  });
  fireEvent.change(screen.getByLabelText(CONTACT_PAGE.companyLabel), {
    target: { value: "Acme" },
  });
  fireEvent.change(screen.getByLabelText(CONTACT_PAGE.emailLabel), {
    target: { value: "founder@acme.lk" },
  });
  fireEvent.change(screen.getByLabelText(CONTACT_PAGE.projectTypeLabel), {
    target: { value: "web-platform" },
  });
  fireEvent.change(screen.getByLabelText(CONTACT_PAGE.scopeLabel), {
    target: { value: SCOPE },
  });
  fireEvent.click(
    screen.getByLabelText("Cohort model — $0 core build"),
  );
}

/** Contact page (PRD §3.5, ARCHITECTURE.md §6): the BriefBuilder form,
    validation, the assembled preview, and Copy / Download / mailto. */
describe("Contact page", () => {
  it("renders the static headline, sub, privacy line and plain contact email", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { level: 1, name: CONTACT_PAGE.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(CONTACT_PAGE.sub)).toBeInTheDocument();
    expect(screen.getByText(CONTACT_PAGE.privacy)).toBeInTheDocument();

    const email = screen.getByRole("link", { name: CONTACT_EMAIL });
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("keeps submit disabled until the form is valid", async () => {
    render(<Contact />);

    const submit = screen.getByRole("button", {
      name: CONTACT_PAGE.submitLabel,
    });
    expect(submit).toBeDisabled();

    fillValidForm();
    await waitFor(() => expect(submit).toBeEnabled());
  });

  it("shows inline field errors for bad input", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(CONTACT_PAGE.nameLabel), {
      target: { value: "A" },
    });
    fireEvent.change(screen.getByLabelText(CONTACT_PAGE.emailLabel), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText(CONTACT_PAGE.scopeLabel), {
      target: { value: "Too short." },
    });

    await waitFor(() => {
      expect(
        screen.getByText("Name needs at least 2 characters."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Enter a valid email address."),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Scope needs at least 40 characters/),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: CONTACT_PAGE.submitLabel }),
    ).toBeDisabled();
  });

  it("assembles the brief on submit and shows Copy, Download and Send-via-email", async () => {
    render(<Contact />);

    fillValidForm();
    const submit = screen.getByRole("button", {
      name: CONTACT_PAGE.submitLabel,
    });
    await waitFor(() => expect(submit).toBeEnabled());
    fireEvent.click(submit);

    const preview = await screen.findByLabelText(CONTACT_PAGE.previewLabel);
    expect(preview).toBeInTheDocument();
    const text = (preview as HTMLTextAreaElement).value;
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
    expect(
      screen.getByRole("heading", {
        name: CONTACT_PAGE.previewHeading,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: CONTACT_PAGE.copyLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CONTACT_PAGE.downloadLabel }),
    ).toBeInTheDocument();
    const mailto = screen.getByRole("link", {
      name: CONTACT_PAGE.emailSendLabel,
    });
    expect(mailto).toBeInTheDocument();
    const href = mailto.getAttribute("href") ?? "";
    expect(href.startsWith(`mailto:${CONTACT_EMAIL}?subject=`)).toBe(true);
    expect(
      new URL(href).searchParams.get("subject"),
    ).toBe("Matroxx — Project Brief: Web platform");
    expect(
      new URL(href).searchParams.get("body"),
    ).toContain("founder@acme.lk");
  });

  it("copies the brief and confirms with 'Copied'", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<Contact />);

    fillValidForm();
    const submit = screen.getByRole("button", {
      name: CONTACT_PAGE.submitLabel,
    });
    await waitFor(() => expect(submit).toBeEnabled());
    fireEvent.click(submit);
    await screen.findByLabelText(CONTACT_PAGE.previewLabel);

    fireEvent.click(
      screen.getByRole("button", { name: CONTACT_PAGE.copyLabel }),
    );
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledOnce();
      expect(
        screen.getByRole("button", { name: CONTACT_PAGE.copiedLabel }),
      ).toBeInTheDocument();
    });
    expect(String(writeText.mock.calls[0]?.[0])).toContain("Sujay");
  });

  it("shows the mailto length warning for a long brief, and keeps the link", async () => {
    render(<Contact />);

    fillValidForm();
    // Scope at the 2,000-char cap pushes the encoded body over 1,800.
    fireEvent.change(screen.getByLabelText(CONTACT_PAGE.scopeLabel), {
      target: { value: "x".repeat(2000) },
    });
    const submit = screen.getByRole("button", {
      name: CONTACT_PAGE.submitLabel,
    });
    await waitFor(() => expect(submit).toBeEnabled());
    fireEvent.click(submit);
    await screen.findByLabelText(CONTACT_PAGE.previewLabel);

    expect(
      await screen.findByText(CONTACT_PAGE.mailtoWarning),
    ).toBeInTheDocument();
    // The visitor decides: the link stays clickable, never truncated.
    const mailto = screen.getByRole("link", {
      name: CONTACT_PAGE.emailSendLabel,
    });
    expect(mailto).toHaveAttribute(
      "href",
      expect.stringContaining(`mailto:${CONTACT_EMAIL}?subject=`),
    );
  });

  it("shows no mailto warning for a short brief", async () => {
    render(<Contact />);

    fillValidForm();
    const submit = screen.getByRole("button", {
      name: CONTACT_PAGE.submitLabel,
    });
    await waitFor(() => expect(submit).toBeEnabled());
    fireEvent.click(submit);
    await screen.findByLabelText(CONTACT_PAGE.previewLabel);

    expect(
      screen.queryByText(CONTACT_PAGE.mailtoWarning),
    ).not.toBeInTheDocument();
  });

  it("contains no forbidden claim anywhere on the page", () => {
    const { container } = render(<Contact />);
    const text = container.textContent ?? "";
    for (const claim of FORBIDDEN) {
      expect(text, `page must not claim: ${claim}`).not.toContain(claim);
    }
  });

  it("exports page metadata with absolute Open Graph URLs and the logo og:image", () => {
    expect(metadata.title).toBe("Contact — Matroxx");
    expect(metadata.description).toBe(CONTACT_PAGE.sub);
    const openGraph = metadata.openGraph as {
      images?: { url: string }[];
      url?: string;
    } | null;
    expect(openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/og.png`);
    expect(openGraph?.images?.[0]?.url.startsWith("https://")).toBe(true);
    expect(openGraph?.url).toBe(`${SITE_URL}/contact`);
  });
});
