import { PHILOSOPHY_QUOTE } from "@/lib/content";

/** The philosophy quote, set large and on its own — no extra commentary. */
export default function PhilosophyQuote() {
  return (
    <blockquote className="mx-auto max-w-3xl text-center">
      <p className="font-display text-3xl font-medium leading-snug text-ink md:text-4xl">
        “{PHILOSOPHY_QUOTE}”
      </p>
    </blockquote>
  );
}
