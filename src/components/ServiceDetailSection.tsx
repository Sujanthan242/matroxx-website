import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PILLARS, type ServiceDetail } from "@/lib/content";

const TAG_CLASSES =
  "rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:border-bronze/80";

/** One expanded pillar section (PRD §3.2): what is included, what is
    not, typical deliverables, stack tags, and what "done" looks like.
    Copy comes from SERVICE_DETAILS + PILLARS — nothing is hardcoded. */
export default function ServiceDetailSection({
  detail,
  index,
}: {
  detail: ServiceDetail;
  index: number;
}) {
  const pillar = PILLARS.find((p) => p.id === detail.id);
  if (!pillar) return null;
  return (
    <section
      aria-labelledby={`service-${detail.id}`}
      className="mx-auto max-w-6xl px-6 py-24 md:py-28"
    >
      <Reveal>
        <SectionHeading
          id={`service-${detail.id}`}
          index={String(index + 1).padStart(2, "0")}
          label={pillar.title}
          description={pillar.what}
        />
      </Reveal>
      <Reveal delay={90}>
        <p className="leading-relaxed text-ink">
          <span className="font-mono text-xs tracking-widest text-bronze">
            WHAT YOU GET —{" "}
          </span>
          {pillar.get}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {pillar.tags.map((tag) => (
            <li key={tag} className={TAG_CLASSES}>
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <Reveal delay={0}>
          <DetailList title="What is included" items={detail.included} />
        </Reveal>
        <Reveal delay={90}>
          <DetailList title="What is not included" items={detail.notIncluded} />
        </Reveal>
      </div>
      <Reveal>
        <div className="mt-10">
          <DetailList title="Typical deliverables" items={detail.deliverables} />
        </div>
      </Reveal>
      <Reveal delay={90}>
        <p className="mt-10 border-l-2 border-bronze/60 pl-4 font-display text-xl leading-relaxed text-ink md:text-2xl">
          {detail.done}
        </p>
      </Reveal>
    </section>
  );
}

/** A titled list inside a service section — one list, one job. */
function DetailList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-widest text-bronze">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink">
            <span aria-hidden="true" className="text-bronze">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
