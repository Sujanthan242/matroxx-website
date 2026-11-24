"use client";

import { useState } from "react";
import Link from "next/link";
import { CTA_HREF, CTA_LABEL, NAV_LINKS } from "@/lib/site";

/**
 * Mobile navigation menu (hamburger). Client component because it holds
 * open/closed state; the Header itself stays a server component.
 * Closes itself after a link is tapped.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-slate/60 text-ink"
      >
        <span
          aria-hidden="true"
          className={`block h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          aria-hidden="true"
          className={`block h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-slate/60 bg-obsidian px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm tracking-wide text-ink hover:text-bronze"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={CTA_HREF}
                onClick={() => setOpen(false)}
                className="inline-block rounded bg-bronze px-4 py-2 font-mono text-sm font-semibold text-obsidian"
              >
                {CTA_LABEL}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
