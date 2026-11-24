import Image from "next/image";
import Link from "next/link";
import { LOGO_DATA_URI, LOGO_HEIGHT, LOGO_WIDTH } from "@/lib/images";
import { CONTACT_EMAIL, NAV_LINKS, SITE_NAME, SITE_TAGLINE, SL_TECH_RADAR_URL } from "@/lib/site";

/**
 * Site footer: logo + tagline, nav, location, live-product link, copyright.
 * No invented locations — Colombo, Sri Lanka only (PRD §3.1.9).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate/60 bg-obsidian">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3" aria-label="Matroxx — home">
            <Image
              src={LOGO_DATA_URI}
              alt="Matroxx logo"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-9 w-auto"
            />
            <span className="font-display text-xl font-semibold tracking-wide text-ink">
              {SITE_NAME}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {SITE_TAGLINE}
          </p>
          <p className="mt-2 font-mono text-xs text-muted">Colombo, Sri Lanka</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-muted transition-colors hover:text-bronze"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={SL_TECH_RADAR_URL}
            className="font-mono text-sm text-muted transition-colors hover:text-bronze"
          >
            SL Tech Radar — live product
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-sm text-muted transition-colors hover:text-bronze"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-slate/60 py-4 text-center font-mono text-xs text-muted">
        © {year} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
