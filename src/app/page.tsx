import type { Metadata } from "next";
import BriefTeaserSection from "@/components/BriefTeaserSection";
import CohortSection from "@/components/CohortSection";
import HeroSection from "@/components/HeroSection";
import ModelSection from "@/components/ModelSection";
import PhilosophySection from "@/components/PhilosophySection";
import PillarsSection from "@/components/PillarsSection";
import WorkSection from "@/components/WorkSection";
import { SITE_TAGLINE, SITE_URL } from "@/lib/site";

/** Home is the only page without its own metadata until Branch 7 —
    the root layout's metadata was doing its job. Per-page metadata
    (ARCHITECTURE.md §2) now lives here like on the other four pages. */
export const metadata: Metadata = {
  description:
    "Matroxx is a founder-led, AI-assisted software studio in Colombo, Sri Lanka. Full-stack web apps, AI agent integration, and system-level software — built to endure.",
  openGraph: {
    description:
      "Matroxx is a founder-led, AI-assisted software studio in Colombo, Sri Lanka.",
    images: [
      {
        alt: `Matroxx — ${SITE_TAGLINE}`,
        height: 630,
        url: `${SITE_URL}/og.png`,
        width: 1200,
      },
    ],
    siteName: "Matroxx",
    title: `Matroxx — ${SITE_TAGLINE}`,
    type: "website",
    url: SITE_URL,
  },
  title: `Matroxx — ${SITE_TAGLINE}`,
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <ModelSection />
      <CohortSection />
      <WorkSection />
      <PhilosophySection />
      <BriefTeaserSection />
    </main>
  );
}
