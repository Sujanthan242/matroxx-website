/**
 * Numbered editorial section heading: "// 01 — Services".
 * One component, one style — every Home section uses it. The index gets
 * the bronze→ink gradient (spec §5.5); a 48px bronze rule anchors the
 * section start (spec §5.4).
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
        <span className="mx-gradient-text">{`// ${index}`}</span>
        {` — ${label}`}
      </p>
      <div aria-hidden="true" className="mt-4 h-px w-12 bg-bronze/60" />
      {description ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
