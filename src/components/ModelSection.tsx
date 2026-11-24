import ComparisonTable from "@/components/ComparisonTable";
import SectionHeading from "@/components/SectionHeading";
import { MODEL_COMPARISON, SECTION_DESCRIPTIONS } from "@/lib/content";

/** // 02 — Where the model differs: Matroxx vs the standard agency. */
export default function ModelSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        index="02"
        label="Where the model differs"
        description={SECTION_DESCRIPTIONS.model}
      />
      <ComparisonTable rows={MODEL_COMPARISON} />
    </section>
  );
}
