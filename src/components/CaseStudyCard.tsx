import Link from "next/link";
import { CASE_STUDY } from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

/**
 * SL Tech Radar flagship card. Only verified facts: stack versions and the
 * AI/LLM weekly cost (ARCHITECTURE.md §7). No test-count claim, no
 * "Spring AI", no live-backend claim.
 */
export default function CaseStudyCard() {
  return (
    <article className="rounded-lg border border-bronze/40 bg-obsidian p-6 md:p-8">
      <p className="font-mono text-xs tracking-widest text-bronze">
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
            className="rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze"
          >
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-sm text-muted">{CASE_STUDY.costNote}</p>
      <Link
        href={SL_TECH_RADAR_URL}
        className="mt-6 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-colors hover:bg-bronze-deep hover:text-ink"
      >
        Visit the live product →
      </Link>
    </article>
  );
}
