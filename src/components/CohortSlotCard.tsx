import Link from "next/link";
import type { CohortSlot } from "@/lib/content";

/**
 * One open cohort slot. A brief-in-waiting — not a fake project, so there
 * is no client name, no screenshot, no invented outcome. The dashed
 * border stays: it signals "open / waiting" (spec §4.5).
 */
export default function CohortSlotCard({ slot }: { slot: CohortSlot }) {
  return (
    <article className="cohort-slot-card mx-glass flex flex-col rounded-lg border-dashed border-bronze-deep/60 p-7 transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/80 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(201,169,125,0.08)] focus-within:border-bronze/80 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(201,169,125,0.08)]">
      <p className="font-mono text-xs tracking-widest text-bronze">
        <span
          aria-hidden="true"
          className="slot-dot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-bronze align-middle"
        />
        OPEN SLOT — BRIEF IN WAITING
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink">
        {slot.kind}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">
        {slot.description}
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block self-start rounded border border-bronze px-4 py-2 font-mono text-sm font-semibold text-bronze transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze hover:text-obsidian hover:shadow-[0_8px_24px_rgba(201,169,125,0.18)] active:translate-y-0 active:shadow-none"
      >
        Prepare a brief →
      </Link>
    </article>
  );
}
