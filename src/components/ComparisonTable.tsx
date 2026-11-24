import type { ComparisonRow } from "@/lib/content";

/**
 * Two-column comparison table (Standard vs Matroxx). On mobile the table
 * keeps its 560px minimum width and scrolls horizontally inside its wrapper.
 * The Matroxx column is a quiet highlighted panel (spec §4.2, §5.9).
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
            <th
              scope="col"
              className="border-b-2 border-bronze/60 py-3 pl-4 font-medium text-bronze"
            >
              MATROXX
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.aspect}
              className="group border-b border-slate/60 align-top transition-[background-color] duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:bg-[rgba(201,169,125,0.05)]"
            >
              <th
                scope="row"
                className="py-5 pr-4 font-mono text-sm font-medium text-ink"
              >
                {row.aspect}
              </th>
              <td className="py-5 pr-4 leading-relaxed text-muted">
                {row.standard}
              </td>
              <td className="border-l-2 border-bronze/20 py-5 pl-4 leading-relaxed text-ink transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover:text-bronze">
                {row.matroxx}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
