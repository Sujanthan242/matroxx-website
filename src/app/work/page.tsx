import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import CaseStudyFull from "@/components/CaseStudyFull";
import CohortSlotCard from "@/components/CohortSlotCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  BRIEF_TEASER,
  COHORT_SLOTS,
  SECTION_DESCRIPTIONS,
  WORK_PAGE,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  description: SECTION_DESCRIPTIONS.work,
  openGraph: {
    description: SECTION_DESCRIPTIONS.work,
    images: [
      {
        alt: "Matroxx — Software that thinks. Systems that endure.",
        height: 630,
        url: `${SITE_URL}/og.png`,
        width: 1200,
      },
    ],
    siteName: "Matroxx",
    title: "Work — Matroxx",
    type: "website",
    url: `${SITE_URL}/work`,
  },
  title: "Work — Matroxx",
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
 * Work page (PRD §3.3, ARCHITECTURE.md §2): the SL Tech Radar full case
 * study, the two open cohort slots as briefs-in-waiting, and an honest
 * empty state — no invented case studies. Composition only; all copy
 * comes from lib/content.ts.
 */
export default function Work() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-28 md:pt-36">
        <p
          className="font-mono text-sm tracking-widest text-bronze"
          style={entrance(0)}
        >
          {"// Work"}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {WORK_PAGE.heading}
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={entrance(360)}
        >
          {WORK_PAGE.sub}
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading index="01" label="The full case study" />
        </Reveal>
        <Reveal delay={90}>
          <CaseStudyFull />
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading index="02" label="Open cohort slots" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {COHORT_SLOTS.map((slot, i) => (
            <Reveal key={slot.id} delay={i * 90}>
              <CohortSlotCard slot={slot} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={90}>
          <div className="mt-10 rounded-lg border border-dashed border-bronze-deep/60 p-8 text-center">
            <h2 className="font-display text-2xl font-medium text-ink">
              {WORK_PAGE.emptyHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              {WORK_PAGE.emptyBody}
            </p>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <Reveal>
          {/* CTA panel mirrors the Services page (same mesh, glass and
              primary CTA) — the page close, not a new section. */}
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
