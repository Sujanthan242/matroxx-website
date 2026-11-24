import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TenetCard from "@/components/TenetCard";
import {
  COHORT_COMPARISON,
  COHORT_TENETS,
  SECTION_DESCRIPTIONS,
  SECTION_LINKS,
} from "@/lib/content";

/** // 03 — The Cohort Model: tenets, comparison, link to the full page. */
export default function CohortSection() {
  return (
    <section id="cohort" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <Reveal>
        <SectionHeading
          index="03"
          label="The Cohort Model"
          description={SECTION_DESCRIPTIONS.cohort}
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {COHORT_TENETS.map((tenet, i) => (
          <Reveal key={tenet.id} delay={i * 90}>
            <TenetCard tenet={tenet} index={i + 1} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12">
        <ComparisonTable rows={COHORT_COMPARISON} />
      </Reveal>
      <p className="mt-8">
        <Link
          href="/cohort"
          className="group font-mono text-sm font-semibold text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:text-ink"
        >
          {SECTION_LINKS.cohort.replace(" →", "")}{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </p>
    </section>
  );
}
