import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PILLARS, SECTION_DESCRIPTIONS, SECTION_LINKS } from "@/lib/content";

/** // 01 — Services: the three engineering pillars. */
export default function PillarsSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <Reveal>
        <SectionHeading
          index="01"
          label="Services"
          description={SECTION_DESCRIPTIONS.services}
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.id} delay={i * 90}>
            <PillarCard pillar={pillar} />
          </Reveal>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/services"
          className="group font-mono text-sm font-semibold text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:text-ink"
        >
          {SECTION_LINKS.services.replace(" →", "")}{" "}
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
