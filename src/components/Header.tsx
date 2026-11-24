import Image from "next/image";
import Link from "next/link";
import { LOGO_DATA_URI, LOGO_HEIGHT, LOGO_WIDTH } from "@/lib/images";
import { CTA_HREF, CTA_LABEL, NAV_LINKS, SITE_NAME } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

/**
 * Site header: official logo + wordmark, desktop nav, "Start a brief" CTA,
 * and the mobile menu. Rendered on every page by the root layout.
 * The logo is a data URI (see src/lib/images.ts) — never a recreated file.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate/60 bg-obsidian/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:opacity-85"
          aria-label="Matroxx — home"
        >
          <Image
            src={LOGO_DATA_URI}
            alt="Matroxx logo"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-9 w-auto"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-wide text-ink">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-mono text-sm tracking-wide text-muted transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bronze after:transition-transform after:duration-[var(--dur-fast)] after:ease-[var(--ease-out-expo)] hover:text-bronze hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CTA_HREF}
            className="mx-shimmer-border rounded bg-bronze px-4 py-2 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none"
          >
            {CTA_LABEL}
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
