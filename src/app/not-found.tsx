import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LOGO_DATA_URI, LOGO_HEIGHT, LOGO_WIDTH } from "@/lib/images";
import { NOT_FOUND_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  description: NOT_FOUND_PAGE.body,
  title: "Page not found — Matroxx",
};

/**
 * Branded 404 (ARCHITECTURE.md §2): the official logo, the plain
 * "doesn't exist yet" line, and links back to Home and Contact.
 * Static export generates 404.html from this file. Copy comes from
 * lib/content.ts; nothing is hardcoded.
 */
export default function NotFound() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <Image
          src={LOGO_DATA_URI}
          alt="Matroxx logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="mx-auto h-12 w-auto"
        />
        <h1 className="mt-10 font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
          {NOT_FOUND_PAGE.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {NOT_FOUND_PAGE.body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="mx-shimmer-border rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none"
          >
            {NOT_FOUND_PAGE.homeLabel}
          </Link>
          <Link
            href="/contact"
            className="rounded border border-bronze px-5 py-3 font-mono text-sm font-semibold text-bronze transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze hover:text-obsidian hover:shadow-[0_8px_24px_rgba(201,169,125,0.18)] active:translate-y-0"
          >
            {NOT_FOUND_PAGE.contactLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
