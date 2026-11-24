import Image from "next/image";
import { COHORT_TEAM } from "@/lib/content";
import {
  TEAM_ROOM_DATA_URI,
  TEAM_ROOM_HEIGHT,
  TEAM_ROOM_WIDTH,
} from "@/lib/images";

const ROLE_CLASSES =
  "rounded-full border border-bronze-deep/60 px-3 py-1 font-mono text-xs text-bronze transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:border-bronze/80";

/**
 * "How we work" — the 6-agent team, presented as a small AI-assisted
 * engineering team, founder-led (sign-off #1 decision 2). The room
 * image is the approved 6-agent artwork (ARCHITECTURE.md sign-off #2
 * decision 3), embedded as a data URI like the logo — roles only,
 * no invented members or names.
 */
export default function TeamSection() {
  return (
    <div>
      <figure className="mx-glass overflow-hidden rounded-lg border-bronze/40">
        <Image
          src={TEAM_ROOM_DATA_URI}
          alt={COHORT_TEAM.imageAlt}
          width={TEAM_ROOM_WIDTH}
          height={TEAM_ROOM_HEIGHT}
          sizes="(max-width: 768px) 100vw, 72rem"
        />
        <figcaption className="border-t border-bronze/20 px-6 py-4 text-sm leading-relaxed text-muted">
          {COHORT_TEAM.caption}
        </figcaption>
      </figure>
      <p className="mt-8 max-w-2xl leading-relaxed text-ink">
        {COHORT_TEAM.body}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Team roles">
        {COHORT_TEAM.roles.map((role) => (
          <li key={role} className={ROLE_CLASSES}>
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}
