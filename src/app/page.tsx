import BriefTeaserSection from "@/components/BriefTeaserSection";
import CohortSection from "@/components/CohortSection";
import HeroSection from "@/components/HeroSection";
import ModelSection from "@/components/ModelSection";
import PhilosophySection from "@/components/PhilosophySection";
import PillarsSection from "@/components/PillarsSection";
import WorkSection from "@/components/WorkSection";

/**
 * Home — the flagship page (PRD §3.1, ARCHITECTURE.md §2).
 * Composition only: each section lives in its own component, and all copy
 * comes from lib/content.ts (ARCHITECTURE.md §7).
 */
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
