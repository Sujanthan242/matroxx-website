import Link from "next/link";
import type { CSSProperties } from "react";
import SplineHero from "@/components/SplineHero";
import StatStrip from "@/components/StatStrip";
import { HERO } from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

/** Fixed hero entrance order (spec §2.4, as amended 2026-11-24): eyebrow
    0ms, sub 360ms, CTAs 480ms, stats 600ms, scroll cue 900ms. The
    headline is intentionally STATIC (no entrance animation) — any
    animation on the LCP element delays Lantern-simulated LCP to ~7.5s. */
const entrance = (delay: number): CSSProperties => ({
  animation: "mx-fade-up var(--dur-slow) var(--ease-out-expo) both",
  animationDelay: `${delay}ms`,
});

/** Hero — Spline layer + animated fallback, headline, CTAs, stat strip. */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <SplineHero />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-36">
        <p
          className="font-mono text-sm tracking-widest text-bronze"
          style={entrance(0)}
        >
          {HERO.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {/* Rendering split of HERO.headline only — the copy is unchanged:
              "Software that thinks." / "Systems that endure."
              Headline is intentionally static (no entrance animation):
              ANY animation on the LCP element delays Lantern-simulated
              LCP to ~7.5s; a static headline restores it. Content-first. */}
          <span className="block">Software that thinks.</span>
          <span className="mx-gradient-text block">Systems that endure.</span>
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={entrance(360)}
        >
          {HERO.sub}
        </p>
        <div className="mt-8 flex flex-wrap gap-4" style={entrance(480)}>
          <Link
            href="/contact"
            className="mx-shimmer-border rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none"
          >
            {HERO.ctaPrimary} →
          </Link>
          <a
            href={SL_TECH_RADAR_URL}
            className="rounded border border-bronze px-5 py-3 font-mono text-sm font-semibold text-bronze transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze hover:text-obsidian hover:shadow-[0_8px_24px_rgba(201,169,125,0.18)] active:translate-y-0 active:shadow-none"
          >
            {HERO.ctaSecondary} →
          </a>
        </div>
        <div className="mt-16">
          <StatStrip />
        </div>
        {/* CSS scroll cue (spec §2.5) — decoration only, not a link. */}
        <div
          aria-hidden="true"
          className="mt-14 hidden justify-center md:flex"
          style={{
            animation: "mx-fade-in var(--dur-medium) var(--ease-out-expo) both",
            animationDelay: "900ms",
          }}
        >
          <div className="flex h-12 w-px justify-center rounded bg-bronze/25">
            <span className="mx-scroll-cue block h-1 w-1 rounded-full bg-bronze" />
          </div>
        </div>
      </div>
    </section>
  );
}
