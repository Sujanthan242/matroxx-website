// Single source of truth for site-wide facts.
// Nothing here is hardcoded in a component. See ARCHITECTURE.md §7.

export const SITE_NAME = "Matroxx";

export const SITE_TAGLINE = "Software that thinks. Systems that endure.";

export const SITE_URL = "https://sujanthan242.github.io/matroxx-website";

// Contact email for the brief mailto (sign-off #2 decision).
export const CONTACT_EMAIL = "sujanleo242@gmail.com";

export const SL_TECH_RADAR_URL = "https://sujanthan242.github.io/sl-tech-radar/";

export const GITHUB_URL = "https://github.com/Sujanthan242/matroxx-website";

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/cohort", label: "Cohort" },
  // Process lives on the Cohort & Process page (ARCHITECTURE.md §2).
  { href: "/cohort#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export const CTA_LABEL = "Start a brief";
export const CTA_HREF = "/contact";
