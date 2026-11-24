import type { Metadata } from "next";
import type { CSSProperties } from "react";
import BriefBuilder from "@/components/BriefBuilder";
import Reveal from "@/components/Reveal";
import { CONTACT_PAGE } from "@/lib/content";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  description: CONTACT_PAGE.sub,
  openGraph: {
    description: CONTACT_PAGE.sub,
    images: [
      {
        alt: "Matroxx — Software that thinks. Systems that endure.",
        height: 630,
        url: `${SITE_URL}/og.png`,
        width: 1200,
      },
    ],
    siteName: "Matroxx",
    title: "Contact — Matroxx",
    type: "website",
    url: `${SITE_URL}/contact`,
  },
  title: "Contact — Matroxx",
};

/** Fixed entrance for the non-LCP header lines (spec §2.4 pattern):
    eyebrow 0ms, sub 360ms. The h1 stays STATIC — the Branch 3 finding
    applies to every page: any animation on the LCP element delays
    Lantern-simulated LCP to ~7.5s. */
const entrance = (delay: number): CSSProperties => ({
  animation: "mx-fade-up var(--dur-slow) var(--ease-out-expo) both",
  animationDelay: `${delay}ms`,
});

/**
 * Contact page (PRD §3.5, ARCHITECTURE.md §2, §6): the Project Brief
 * builder — six fields, Zod validation, the assembled brief preview,
 * and Copy / Download / Send-via-email, all client-side. The contact
 * email is shown plainly; no phone number, no office address.
 * Composition only — all copy comes from lib/content.ts.
 */
export default function Contact() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-28 md:pt-36">
        <p
          className="font-mono text-sm tracking-widest text-bronze"
          style={entrance(0)}
        >
          {"// Contact"}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {CONTACT_PAGE.heading}
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={entrance(360)}
        >
          {CONTACT_PAGE.sub}
        </p>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="mx-glass rounded-lg p-7 md:p-10">
            <BriefBuilder />
          </div>
        </Reveal>
        <Reveal delay={90}>
          <p className="mt-10 text-center leading-relaxed text-muted">
            {CONTACT_PAGE.directLabel}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono text-bronze underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:text-ink hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
