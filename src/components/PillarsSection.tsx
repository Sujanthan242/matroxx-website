import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import SectionHeading from "@/components/SectionHeading";
import { PILLARS, SECTION_DESCRIPTIONS, SECTION_LINKS } from "@/lib/content";

/** // 01 — Services: the three engineering pillars. */
export default function PillarsSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        index="01"
        label="Services"
        description={SECTION_DESCRIPTIONS.services}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/services"
          className="font-mono text-sm font-semibold text-bronze hover:text-ink"
        >
          {SECTION_LINKS.services}
        </Link>
      </p>
    </section>
  );
}
