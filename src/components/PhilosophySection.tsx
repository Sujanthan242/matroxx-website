import PhilosophyQuote from "@/components/PhilosophyQuote";
import SectionHeading from "@/components/SectionHeading";

/** // 05 — Philosophy: the single quote, no description. */
export default function PhilosophySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="05" label="Philosophy" />
      <PhilosophyQuote />
    </section>
  );
}
