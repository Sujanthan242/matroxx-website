import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import CohortSlotCard from "@/components/CohortSlotCard";
import ComparisonTable from "@/components/ComparisonTable";
import PhilosophyQuote from "@/components/PhilosophyQuote";
import PillarCard from "@/components/PillarCard";
import SectionHeading from "@/components/SectionHeading";
import SplineHero from "@/components/SplineHero";
import StatStrip from "@/components/StatStrip";
import TenetCard from "@/components/TenetCard";
import {
  BRIEF_TEASER,
  COHORT_COMPARISON,
  COHORT_SLOTS,
  COHORT_TENETS,
  HERO,
  MODEL_COMPARISON,
  PILLARS,
} from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

/**
 * Home — the flagship page (PRD §3.1, ARCHITECTURE.md §2).
 * Hero (Spline layer + static fallback) → Three Pillars → model
 * comparison → Cohort Model → Work flagship → Philosophy → brief teaser.
 * All copy comes from lib/content.ts; all facts from lib/site.ts.
 */
export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <SplineHero />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:pt-32">
          <p className="font-mono text-sm tracking-widest text-bronze">
            {HERO.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-tight text-ink md:text-6xl">
            {HERO.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {HERO.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-colors hover:bg-bronze-deep hover:text-ink"
            >
              {HERO.ctaPrimary} →
            </Link>
            <a
              href={SL_TECH_RADAR_URL}
              className="rounded border border-bronze px-5 py-3 font-mono text-sm font-semibold text-bronze transition-colors hover:bg-bronze hover:text-obsidian"
            >
              {HERO.ctaSecondary} →
            </a>
          </div>
          <div className="mt-16">
            <StatStrip />
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          index="01"
          label="Services"
          description="Three engineering pillars. One team that builds the product, the AI inside it, and the systems underneath — and stays accountable for all three."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/services"
            className="font-mono text-sm font-semibold text-bronze hover:text-ink"
          >
            All services →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          index="02"
          label="Where the model differs"
          description="The same work, priced and owned differently — because who pays for what changes what gets built."
        />
        <ComparisonTable rows={MODEL_COMPARISON} />
      </section>

      <section id="cohort" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          index="03"
          label="The Cohort Model"
          description="Matroxx builds the core product for $0. The partner covers infrastructure, licences and third-party services at cost — never marked up. Selection is competitive."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {COHORT_TENETS.map((tenet, i) => (
            <TenetCard key={tenet.id} tenet={tenet} index={i + 1} />
          ))}
        </div>
        <div className="mt-12">
          <ComparisonTable rows={COHORT_COMPARISON} />
        </div>
        <p className="mt-8">
          <Link
            href="/cohort"
            className="font-mono text-sm font-semibold text-bronze hover:text-ink"
          >
            How the cohort works →
          </Link>
        </p>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          index="04"
          label="Work"
          description="One live product, built the cohort way — and the next two slots, open now."
        />
        <CaseStudyCard />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {COHORT_SLOTS.map((slot) => (
            <CohortSlotCard key={slot.id} slot={slot} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/work"
            className="font-mono text-sm font-semibold text-bronze hover:text-ink"
          >
            All work →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading index="05" label="Philosophy" />
        <PhilosophyQuote />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <div className="rounded-lg border border-bronze/40 bg-obsidian p-8 text-center md:p-12">
          <p className="font-mono text-sm tracking-widest text-bronze">
            {"// 06 — Project Brief"}
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium text-ink md:text-4xl">
            {BRIEF_TEASER.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            {BRIEF_TEASER.body}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-colors hover:bg-bronze-deep hover:text-ink"
          >
            {BRIEF_TEASER.cta} →
          </Link>
        </div>
      </section>
    </main>
  );
}
