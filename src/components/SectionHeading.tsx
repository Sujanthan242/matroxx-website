/**
 * Numbered editorial section heading: "// 01 — Services".
 * One component, one style — every Home section uses it.
 */
export default function SectionHeading({
  description,
  index,
  label,
}: {
  description?: string;
  index: string;
  label: string;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm tracking-widest text-bronze">
        {`// ${index} — ${label}`}
      </p>
      {description ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
