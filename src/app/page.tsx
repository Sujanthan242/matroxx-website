/**
 * Home — bare shell (Branch 1: feature/scaffold).
 * Renders the approved headline and one-line sub only. The full Home
 * sections (hero, pillars, comparison, cohort, flagship, philosophy,
 * brief teaser) are built in Branch 2: feature/home.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-sm tracking-widest text-bronze">
        AI &amp; Integration Software — Colombo, Sri Lanka
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-tight text-ink md:text-6xl">
        Software that thinks. Systems that endure.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Full-stack web apps, AI agents where they create measurable value, and
        reliable systems beneath.
      </p>
    </main>
  );
}
