import type { CohortStep } from "@/lib/content";

/**
 * One step of the cohort journey: number, title, week range, body.
 * Same glass + hover treatment as TenetCard (spec §4.3) — the steps
 * are a six-card grid, staggered 0/90/180ms by the parent.
 */
export default function CohortStepCard({
  index,
  step,
}: {
  index: number;
  step: CohortStep;
}) {
  return (
    <article className="mx-glass rounded-lg p-7 transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)] focus-within:border-bronze/50 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)]">
      <p className="flex items-baseline justify-between font-mono text-sm tracking-widest">
        <span className="text-bronze">{`0${index}`}</span>
        <span className="text-xs uppercase text-muted">{step.weeks}</span>
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink">
        {step.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
    </article>
  );
}
