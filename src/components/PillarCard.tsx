import type { Pillar } from "@/lib/content";

const CARD_HOVER =
  "transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)] focus-within:border-bronze/50 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)]";

/** One of the Three Pillars: what it is, what you get, stack tags. */
export default function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className={`mx-glass flex flex-col rounded-lg p-7 ${CARD_HOVER}`}>
      <h3 className="font-display text-2xl font-medium text-ink">
        {pillar.title}
      </h3>
      <p className="mt-4 leading-relaxed text-muted">{pillar.what}</p>
      <p className="mt-4 leading-relaxed text-ink">
        <span className="font-mono text-xs tracking-widest text-bronze">
          WHAT YOU GET —{" "}
        </span>
        {pillar.get}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {pillar.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:border-bronze/80"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
