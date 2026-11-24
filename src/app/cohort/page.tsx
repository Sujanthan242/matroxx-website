import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import CohortStepCard from "@/components/CohortStepCard";
import CohortTimeline from "@/components/CohortTimeline";
import CohortSlotCard from "@/components/CohortSlotCard";
import ComparisonTable from "@/components/ComparisonTable";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TeamSection from "@/components/TeamSection";
import {
  BRIEF_TEASER,
  COHORT_COMPARISON,
  COHORT_PAGE,
  COHORT_SLOTS,
  COHORT_STEPS,
  COHORT_TEAM,
  SECTION_DESCRIPTIONS,
} from "@/lib/content";
import { CTA_HREF, CTA_LABEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  description: SECTION_DESCRIPTIONS.cohort,
  openGraph: {
    description: SECTION_DESCRIPTIONS.cohort,
    images: [
      {
        alt: "Matroxx — Software that thinks. Systems that endure.",
        height: 630,
        url: `${SITE_URL}/og.png`,
        width: 1200,
      },
    ],
    siteName: "Matroxx",
    title: "Cohort & Process — Matroxx",
    type: "website",
    url: `${SITE_URL}/cohort`,
  },
  title: "Cohort & Process — Matroxx",
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

/** Stagger step for grids (spec §1.4): 90ms per item, capped at 450ms. */
const stagger = (index: number): number => Math.min(index * 90, 450);

/**
 * Cohort & Process page (PRD §3.4, ARCHITECTURE.md §2, §8): the 6-step
 * journey, the cost split in plain language, the timeline of a typical
 * build, the two open cohort slots as briefs-in-waiting, and the
 * "How we work" team section with the 6-agent room image.
 * Composition only; all copy comes from lib/content.ts.
 */
export default function Cohort() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-28 md:pt-36">
        <p
          className="font-mono text-sm tracking-widest text-bronze"
          style={entrance(0)}
        >
          {"// Cohort & Process"}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {COHORT_PAGE.heading}
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={entrance(360)}
        >
          {COHORT_PAGE.sub}
        </p>
      </section>
      <section
        id="process"
        className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28"
      >
        <Reveal>
          <SectionHeading index="01" label="How it works" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COHORT_STEPS.map((step, i) => (
            <Reveal key={step.id} delay={stagger(i)}>
              <CohortStepCard index={i + 1} step={step} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            label="What you pay"
            description={COHORT_PAGE.costIntro}
          />
        </Reveal>
        <Reveal delay={90}>
          <ComparisonTable rows={COHORT_COMPARISON} />
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading index="03" label="Timeline of a typical build" />
        </Reveal>
        <Reveal delay={90}>
          <CohortTimeline />
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading index="04" label="Open cohort slots" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {COHORT_SLOTS.map((slot, i) => (
            <Reveal key={slot.id} delay={stagger(i)}>
              <CohortSlotCard slot={slot} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeading index="05" label={COHORT_TEAM.heading} />
        </Reveal>
        <Reveal delay={90}>
          <TeamSection />
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <Reveal>
          {/* CTA panel mirrors the Work page (same mesh, glass and
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
