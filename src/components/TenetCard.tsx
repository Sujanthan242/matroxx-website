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
    <article className="rounded-lg border border-slate/60 bg-obsidian p-6">
      <p className="font-mono text-sm tracking-widest text-bronze">
        {`0${index}`}
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink">
        {tenet.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{tenet.body}</p>
    </article>
  );
}
