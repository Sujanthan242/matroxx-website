import Link from "next/link";
import { CASE_STUDY, WORK_CASE_STUDY } from "@/lib/content";
import { SL_TECH_RADAR_URL } from "@/lib/site";

const TAG_CLASSES =
  "rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:border-bronze/80";

const HEADING_CLASSES =
  "font-mono text-sm uppercase tracking-widest text-bronze";

const PRIMARY_CTA =
  "mx-shimmer-border mt-6 inline-block rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none";

/**
 * SL Tech Radar, full case study (PRD §3.3): problem, what was built,
 * stack, verified numbers, the architecture-diagram slot (visibly empty),
 * the "by Matroxx" badge note, and the live link. Only verified facts
 * (ARCHITECTURE.md §7): no test-count claim, no "Spring AI", and no
 * claim about the backend being live. Same glass + rest-glow treatment
 * as the Home CaseStudyCard (spec §4.4).
 */
export default function CaseStudyFull() {
  return (
    <article className="group mx-glass rounded-lg border-bronze/40 p-8 shadow-[0_0_40px_rgba(201,169,125,0.06)] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(201,169,125,0.10)] focus-within:border-bronze/60 focus-within:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(201,169,125,0.10)] md:p-10">
      <CaseStudyIntro />
      <CaseStudyProblem />
      <StackTags />
      <VerifiedNumbers />
      <DiagramSlot />
      <p className="mt-8 leading-relaxed text-muted">
        {WORK_CASE_STUDY.badgeNote}
      </p>
      <Link href={SL_TECH_RADAR_URL} className={PRIMARY_CTA}>
        Visit the live product →
      </Link>
    </article>
  );
}

/** Eyebrow, title, description, who it serves — the Home card's head. */
function CaseStudyIntro() {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-bronze">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-1 w-1 rounded-full bg-bronze opacity-0 transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover:opacity-100"
        />
        FLAGSHIP — LIVE PRODUCT
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium text-ink">
        {CASE_STUDY.title}
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {CASE_STUDY.description}
      </p>
      <p className="mt-3 leading-relaxed text-ink">
        <span className="font-mono text-xs tracking-widest text-bronze">
          WHO IT SERVES —{" "}
        </span>
        {CASE_STUDY.audience}
      </p>
    </div>
  );
}

/** The problem, then what was built — both from lib/content.ts. */
function CaseStudyProblem() {
  return (
    <div className="mt-10">
      <h3 className={HEADING_CLASSES}>The problem</h3>
      <p className="mt-4 leading-relaxed text-ink">
        {WORK_CASE_STUDY.problem}
      </p>
      <h3 className={`${HEADING_CLASSES} mt-8`}>What was built</h3>
      <ul className="mt-4 space-y-3">
        {WORK_CASE_STUDY.built.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink">
            <span aria-hidden="true" className="text-bronze">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Stack tags — the same tags as the Home card. */
function StackTags() {
  return (
    <ul className="mt-10 flex flex-wrap gap-2" aria-label="Stack">
      {CASE_STUDY.stack.map((tag) => (
        <li key={tag} className={TAG_CLASSES}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Verified numbers only (ARCHITECTURE.md §7) — versions + AI/LLM cost. */
function VerifiedNumbers() {
  return (
    <div className="mt-10">
      <h3 className={HEADING_CLASSES}>Verified numbers</h3>
      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {WORK_CASE_STUDY.numbers.map((number) => (
          <div
            key={number.label}
            className="rounded-lg border border-bronze/20 p-4"
          >
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">
              {number.label}
            </dt>
            <dd className="mt-2 font-display text-xl leading-snug text-ink">
              {number.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Architecture diagram slot — VISIBLY EMPTY, by design (ARCHITECTURE.md
 * §2, §5, §14). The slot is a placeholder for a real diagram, never a
 * fake one: no <svg>, no <img>, no drawn diagram of any kind.
 */
function DiagramSlot() {
  return (
    <div className="mt-10">
      <h3 className={HEADING_CLASSES}>Architecture</h3>
      <div
        data-testid="architecture-diagram-slot"
        className="mt-4 rounded-lg border border-dashed border-bronze-deep/60 p-8 text-center"
      >
        <p className="font-mono text-sm leading-relaxed text-muted">
          {WORK_CASE_STUDY.diagramEmpty}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {WORK_CASE_STUDY.diagramNote}
        </p>
      </div>
    </div>
  );
}
