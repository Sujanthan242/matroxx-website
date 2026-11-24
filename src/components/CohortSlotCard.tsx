import Link from "next/link";
import type { CohortSlot } from "@/lib/content";

/**
 * One open cohort slot. A brief-in-waiting — not a fake project, so there
 * is no client name, no screenshot, no invented outcome.
 */
export default function CohortSlotCard({ slot }: { slot: CohortSlot }) {
  return (
    <article className="flex flex-col rounded-lg border border-dashed border-bronze-deep/60 bg-obsidian p-6">
      <p className="font-mono text-xs tracking-widest text-bronze">
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
        className="mt-6 inline-block self-start rounded border border-bronze px-4 py-2 font-mono text-sm font-semibold text-bronze transition-colors hover:bg-bronze hover:text-obsidian"
      >
        Prepare a brief →
      </Link>
    </article>
  );
}
