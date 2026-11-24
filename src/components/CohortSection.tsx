import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
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
    <section id="cohort" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        index="03"
        label="The Cohort Model"
        description={SECTION_DESCRIPTIONS.cohort}
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
          {SECTION_LINKS.cohort}
        </Link>
      </p>
    </section>
  );
}
