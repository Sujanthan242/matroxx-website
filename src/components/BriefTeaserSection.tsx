import Link from "next/link";
import { BRIEF_TEASER } from "@/lib/content";

/** // 06 — Project Brief teaser: label, heading, body, CTA. */
export default function BriefTeaserSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
      <div className="rounded-lg border border-bronze/40 bg-obsidian p-8 text-center md:p-12">
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
          className="mt-8 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-colors hover:bg-bronze-deep hover:text-ink"
        >
          {BRIEF_TEASER.cta} →
        </Link>
      </div>
    </section>
  );
}
