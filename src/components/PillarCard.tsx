import type { Pillar } from "@/lib/content";

/** One of the Three Pillars: what it is, what you get, stack tags. */
export default function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="flex flex-col rounded-lg border border-slate/60 bg-obsidian p-6">
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
            className="rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
