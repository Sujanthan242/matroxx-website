import type { ComparisonRow } from "@/lib/content";

/**
 * Two-column comparison table (Standard vs Matroxx). On mobile the table
 * keeps its 560px minimum width and scrolls horizontally inside its wrapper.
 */
export default function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-bronze/40 font-mono text-sm tracking-widest">
            <th scope="col" className="py-3 pr-4 font-medium text-muted">
              &nbsp;
            </th>
            <th scope="col" className="py-3 pr-4 font-medium text-muted">
              STANDARD AGENCY
            </th>
            <th scope="col" className="py-3 font-medium text-bronze">
              MATROXX
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect} className="border-b border-slate/60 align-top">
              <th
                scope="row"
                className="py-4 pr-4 font-mono text-sm font-medium text-ink"
              >
                {row.aspect}
              </th>
              <td className="py-4 pr-4 leading-relaxed text-muted">
                {row.standard}
              </td>
              <td className="py-4 leading-relaxed text-ink">{row.matroxx}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
