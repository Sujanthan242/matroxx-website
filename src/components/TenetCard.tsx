import type { Tenet } from "@/lib/content";

/** One cohort-model tenet: title + plain-language body. */
export default function TenetCard({
  index,
  tenet,
}: {
  index: number;
  tenet: Tenet;
}) {
  return (
    <article className="tenet-card mx-glass rounded-lg p-7 transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)] focus-within:border-bronze/50 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)]">
      <p className="tenet-index font-mono text-sm tracking-widest text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)]">
        {`0${index}`}
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink">
        {tenet.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{tenet.body}</p>
    </article>
  );
}
