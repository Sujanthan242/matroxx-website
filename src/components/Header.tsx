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
        <Link href="/" className="flex items-center gap-3" aria-label="Matroxx — home">
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
              className="font-mono text-sm tracking-wide text-muted transition-colors hover:text-bronze"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CTA_HREF}
            className="rounded bg-bronze px-4 py-2 font-mono text-sm font-semibold text-obsidian transition-colors hover:bg-bronze-deep hover:text-ink"
          >
            {CTA_LABEL}
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
