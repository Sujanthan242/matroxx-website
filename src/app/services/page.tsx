import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import WhatWeDontDo from "@/components/WhatWeDontDo";
import {
  BRIEF_TEASER,
  SECTION_DESCRIPTIONS,
  SERVICE_DETAILS,
  SERVICES_PAGE,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  description: SECTION_DESCRIPTIONS.services,
  openGraph: {
    description: SECTION_DESCRIPTIONS.services,
    images: [
      {
        alt: "Matroxx — Software that thinks. Systems that endure.",
        height: 630,
        url: `${SITE_URL}/og.png`,
        width: 1200,
      },
    ],
    siteName: "Matroxx",
    title: "Services — Matroxx",
    type: "website",
    url: `${SITE_URL}/services`,
  },
  title: "Services — Matroxx",
};

/** Fixed entrance for the non-LCP header lines (spec §2.4 pattern):
    eyebrow 0ms, sub 360ms. The h1 stays STATIC — the Branch 3 finding
    applies to every page: any animation on the LCP element delays
    Lantern-simulated LCP to ~7.5s. */
const entrance = (delay: number): CSSProperties => ({
  animation: "mx-fade-up var(--dur-slow) var(--ease-out-expo) both",
  animationDelay: `${delay}ms`,
});

const PRIMARY_CTA =
  "mx-shimmer-border mt-8 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none";

/**
 * Services page (PRD §3.2, ARCHITECTURE.md §2): one expanded section
 * per pillar, the "What we don't do" strip, and a "Start a brief" CTA.
 * Composition only — all copy comes from lib/content.ts.
 */
export default function Services() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-28 md:pt-36">
        <p
          className="font-mono text-sm tracking-widest text-bronze"
          style={entrance(0)}
        >
          {"// Services"}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {SERVICES_PAGE.heading}
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={entrance(360)}
        >
          {SERVICES_PAGE.sub}
        </p>
      </section>
      {SERVICE_DETAILS.map((detail, i) => (
        <ServiceDetailSection key={detail.id} detail={detail} index={i} />
      ))}
      <WhatWeDontDo />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <Reveal>
          {/* CTA panel mirrors BriefTeaserSection (same mesh, glass and
              primary CTA) minus the Home "// 06" label, which belongs
              to the Home page's numbering, not this page. */}
          <div
            className="mx-glass mx-gradient-shift rounded-lg border-bronze/50 p-10 text-center md:p-16"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(201,169,125,0.10), transparent 65%), " +
                "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(162,123,80,0.08), transparent 65%)",
            }}
          >
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
              {BRIEF_TEASER.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
              {BRIEF_TEASER.body}
            </p>
            <Link href={CTA_HREF} className={PRIMARY_CTA}>
              {CTA_LABEL} →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
