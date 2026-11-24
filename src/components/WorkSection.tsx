import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import CohortSlotCard from "@/components/CohortSlotCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  COHORT_SLOTS,
  SECTION_DESCRIPTIONS,
  SECTION_LINKS,
} from "@/lib/content";

/** // 04 — Work: the flagship case study plus the two open cohort slots. */
export default function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <Reveal>
        <SectionHeading
          index="04"
          label="Work"
          description={SECTION_DESCRIPTIONS.work}
        />
      </Reveal>
      <Reveal>
        <CaseStudyCard />
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {COHORT_SLOTS.map((slot, i) => (
          <Reveal key={slot.id} delay={i * 90}>
            <CohortSlotCard slot={slot} />
          </Reveal>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/work"
          className="group font-mono text-sm font-semibold text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:text-ink"
        >
          {SECTION_LINKS.work.replace(" →", "")}{" "}
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
