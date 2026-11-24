import { HERO_STATS } from "@/lib/site";

/** Verified stat strip under the hero — counts only, no invented metrics. */
export default function StatStrip() {
  return (
    <dl className="grid grid-cols-2 gap-6 border-t border-slate/60 pt-8 md:grid-cols-4">
      {HERO_STATS.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-4xl font-medium text-bronze">
            {stat.value}
          </dd>
          <dd className="mt-1 font-mono text-xs tracking-widest text-muted">
            {stat.label.toUpperCase()}
          </dd>
        </div>
      ))}
    </dl>
  );
}
