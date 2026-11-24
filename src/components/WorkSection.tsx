import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import CohortSlotCard from "@/components/CohortSlotCard";
import SectionHeading from "@/components/SectionHeading";
import {
  COHORT_SLOTS,
  SECTION_DESCRIPTIONS,
  SECTION_LINKS,
} from "@/lib/content";

/** // 04 — Work: the flagship case study plus the two open cohort slots. */
export default function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        index="04"
        label="Work"
        description={SECTION_DESCRIPTIONS.work}
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
          {SECTION_LINKS.work}
        </Link>
      </p>
    </section>
  );
}
