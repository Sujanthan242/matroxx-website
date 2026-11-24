import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES_PAGE, WHAT_WE_DONT_DO } from "@/lib/content";

const CARD_HOVER =
  "transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)] focus-within:border-bronze/50 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,169,125,0.12),0_0_24px_rgba(201,169,125,0.08)]";

/** "What we don't do" strip — the 3 settled exclusions (sign-off #1). */
export default function WhatWeDontDo() {
  return (
    <section
      aria-label="What we don't do"
      className="mx-auto max-w-6xl px-6 py-24 md:py-28"
    >
      <Reveal>
        <SectionHeading
          index="04"
          label="What we don't do"
          description={SERVICES_PAGE.dontDoDescription}
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {WHAT_WE_DONT_DO.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i * 90, 450)}>
            <article className={`mx-glass rounded-lg p-7 ${CARD_HOVER}`}>
              <h3 className="font-display text-xl font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
