import Reveal from "@/components/Reveal";
import { HERO_STATS } from "@/lib/site";

/**
 * Verified stat strip under the hero — counts only, no invented metrics.
 * Each stat reveals fast (450ms), staggered 90ms from the strip's 600ms
 * hero-sequence start (spec §2.4 + §3.2).
 */
export default function StatStrip() {
  return (
    <dl className="grid grid-cols-2 gap-6 border-t border-slate/60 pt-8 md:grid-cols-4 md:divide-x md:divide-slate/40">
      {HERO_STATS.map((stat, i) => (
        <Reveal
          key={stat.label}
          fast
          delay={600 + i * 90}
          className={i > 0 ? "md:pl-6" : undefined}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-4xl font-medium text-bronze md:text-5xl">
            {stat.value}
          </dd>
          <dd className="mt-1 font-mono text-xs tracking-widest text-muted">
            {stat.label.toUpperCase()}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
