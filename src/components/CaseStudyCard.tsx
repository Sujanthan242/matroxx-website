import Link from "next/link";
import { CASE_STUDY } from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

/**
 * SL Tech Radar flagship card. Only verified facts: stack versions and the
 * AI/LLM weekly cost (ARCHITECTURE.md §7). No test-count claim, and no
 * claim about the backend being live. The only card with a permanent
 * rest-state glow (spec §4.4).
 */
export default function CaseStudyCard() {
  return (
    <article className="group mx-glass rounded-lg border-bronze/40 p-8 shadow-[0_0_40px_rgba(201,169,125,0.06)] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(201,169,125,0.10)] focus-within:border-bronze/60 focus-within:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(201,169,125,0.10)] md:p-10">
      <p className="font-mono text-xs tracking-widest text-bronze">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-1 w-1 rounded-full bg-bronze opacity-0 transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover:opacity-100"
        />
        FLAGSHIP — LIVE PRODUCT
      </p>
      <h3 className="mt-3 font-display text-3xl font-medium text-ink">
        {CASE_STUDY.title}
      </h3>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {CASE_STUDY.description}
      </p>
      <p className="mt-3 leading-relaxed text-ink">
        <span className="font-mono text-xs tracking-widest text-bronze">
          WHO IT SERVES —{" "}
        </span>
        {CASE_STUDY.audience}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {CASE_STUDY.stack.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:border-bronze/80"
          >
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-sm text-muted">{CASE_STUDY.costNote}</p>
      <Link
        href={SL_TECH_RADAR_URL}
        className="mx-shimmer-border mt-6 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none"
      >
        Visit the live product →
      </Link>
    </article>
  );
}
