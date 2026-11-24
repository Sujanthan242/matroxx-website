import Link from "next/link";
import SplineHero from "@/components/SplineHero";
import StatStrip from "@/components/StatStrip";
import { HERO } from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

/** Hero — Spline layer + static fallback, headline, CTAs, stat strip. */
export default function HeroSection() {
  return (
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
  );
}
