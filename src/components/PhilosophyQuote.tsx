import { PHILOSOPHY_QUOTE } from "@/lib/content";

/** The philosophy quote, set large and on its own — no extra commentary. */
export default function PhilosophyQuote() {
  return (
    <blockquote className="mx-auto max-w-3xl text-center">
      {/* Orbit motif (spec §5.7): the hero's ring language, at quote scale. */}
      <div
        aria-hidden="true"
        className="mx-auto mb-8 flex h-16 w-16 items-start justify-center rounded-full border border-bronze/30"
      >
        <span className="mx-spin-slow flex h-full w-full items-start justify-center rounded-full">
          <span className="mt-0 block h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-bronze" />
        </span>
      </div>
      <p className="font-display text-3xl font-medium leading-[1.2] text-ink md:text-5xl">
        “{PHILOSOPHY_QUOTE}”
      </p>
    </blockquote>
  );
}
