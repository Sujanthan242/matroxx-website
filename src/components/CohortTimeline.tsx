import { COHORT_PAGE, COHORT_STEPS } from "@/lib/content";

/**
 * Timeline of a typical build (ARCHITECTURE.md §8): one row per step
 * with its week range, the totals, and the "typical, not a promise"
 * note. Same data as the step cards — a single source, no second copy
 * of the weeks to drift. Table styling follows ComparisonTable (row
 * hover, quiet bronze highlight on the Weeks column).
 */
export default function CohortTimeline() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-bronze/40 font-mono text-sm tracking-widest">
              <th scope="col" className="py-3 pr-4 font-medium text-muted">
                PHASE
              </th>
              <th scope="col" className="py-3 pr-4 font-medium text-muted">
                WHAT HAPPENS
              </th>
              <th
                scope="col"
                className="border-b-2 border-bronze/60 py-3 pl-4 font-medium text-bronze"
              >
                WHEN
              </th>
            </tr>
          </thead>
          <tbody>
            {COHORT_STEPS.map((step) => (
              <tr
                key={step.id}
                className="border-b border-slate/60 align-top transition-[background-color] duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:bg-[rgba(201,169,125,0.05)]"
              >
                <th
                  scope="row"
                  className="py-5 pr-4 font-mono text-sm font-medium text-ink"
                >
                  {step.title}
                </th>
                <td className="py-5 pr-4 leading-relaxed text-muted">
                  {step.body}
                </td>
                <td className="border-l-2 border-bronze/20 py-5 pl-4 font-mono text-sm leading-relaxed text-ink">
                  {step.weeks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 font-display text-xl leading-relaxed text-ink md:text-2xl">
        {COHORT_PAGE.timelineTotal}
      </p>
      <p className="mt-3 leading-relaxed text-muted">
        {COHORT_PAGE.timelineNote}
      </p>
    </div>
  );
}
