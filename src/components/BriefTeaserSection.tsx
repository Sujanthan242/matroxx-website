import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BRIEF_TEASER } from "@/lib/content";

/** // 06 — Project Brief teaser: label, heading, body, CTA. */
export default function BriefTeaserSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
      <Reveal>
        <div
        className="mx-glass mx-gradient-shift rounded-lg border-bronze/50 p-10 text-center md:p-16"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(201,169,125,0.10), transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(162,123,80,0.08), transparent 65%)",
        }}
      >
        <p className="font-mono text-sm tracking-widest text-bronze">
          {BRIEF_TEASER.label}
        </p>
        <h2 className="mt-4 font-display text-3xl font-medium text-ink md:text-4xl">
          {BRIEF_TEASER.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
          {BRIEF_TEASER.body}
        </p>
        <Link
          href="/contact"
          className="mx-shimmer-border mt-8 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none"
        >
          {BRIEF_TEASER.cta} →
        </Link>
        </div>
      </Reveal>
    </section>
  );
}
