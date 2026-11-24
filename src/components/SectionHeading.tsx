/**
 * Numbered editorial section heading: "// 01 — Services".
 * One component, one style — every Home section uses it. The index gets
 * the bronze→ink gradient (spec §5.5); a 48px bronze rule anchors the
 * section start (spec §5.4). The label is a real <h2> (Branch 7 a11y
 * fix — it was a <p>). An optional id lets a section's aria-labelledby
 * point at it (ServiceDetailSection).
 */
export default function SectionHeading({
  description,
  id,
  index,
  label,
}: {
  description?: string;
  id?: string;
  index: string;
  label: string;
}) {
  return (
    <div className="mb-10">
      <h2
        id={id}
        className="font-mono text-sm font-medium tracking-widest text-bronze"
      >
        <span className="mx-gradient-text">{`// ${index}`}</span>
        {` — ${label}`}
      </h2>
      <div aria-hidden="true" className="mt-4 h-px w-12 bg-bronze/60" />
      {description ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
