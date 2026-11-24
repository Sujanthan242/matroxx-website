import { describe, expect, it } from "vitest";
import {
  BRIEF_TEASER,
  CASE_STUDY,
  COHORT_COMPARISON,
  COHORT_SLOTS,
  COHORT_TENETS,
  HERO,
  MODEL_COMPARISON,
  PHILOSOPHY_QUOTE,
  PILLARS,
  SECTION_DESCRIPTIONS,
  SECTION_LINKS,
  SERVICE_DETAILS,
  SERVICES_PAGE,
  WHAT_WE_DONT_DO,
  WORK_CASE_STUDY,
  WORK_PAGE,
} from "@/lib/content";
import {
  CONTACT_EMAIL,
  HERO_STATS,
  NAV_LINKS,
  SL_TECH_RADAR_URL,
  SPLINE_SCENE_URL,
} from "@/lib/site";

const noEmpty = (value: string) => value.trim().length > 0;

/** Shape + claim guards for the Home content model (ARCHITECTURE.md §7, §10). */
describe("site facts", () => {
  it("has 5 nav entries", () => {
    expect(NAV_LINKS).toHaveLength(5);
    for (const link of NAV_LINKS) {
      expect(noEmpty(link.href)).toBe(true);
      expect(noEmpty(link.label)).toBe(true);
    }
  });

  it("has the approved contact email and live-product URL", () => {
    expect(CONTACT_EMAIL).toBe("sujanleo242@gmail.com");
    expect(SL_TECH_RADAR_URL).toBe("https://sujanthan242.github.io/sl-tech-radar/");
  });

  it("leaves the Spline scene URL unset — the hero ships on its fallback", () => {
    expect(SPLINE_SCENE_URL).toBe("");
  });

  it("has 4 verified hero stats", () => {
    expect(HERO_STATS).toHaveLength(4);
    expect(HERO_STATS.map((s) => s.value)).toEqual(["$0", "3", "1", "2"]);
    for (const stat of HERO_STATS) expect(noEmpty(stat.label)).toBe(true);
  });
});

describe("home content", () => {
  it("has 3 pillars, each with what/get/tags and no empty strings", () => {
    expect(PILLARS).toHaveLength(3);
    for (const pillar of PILLARS) {
      expect(noEmpty(pillar.title)).toBe(true);
      expect(noEmpty(pillar.what)).toBe(true);
      expect(noEmpty(pillar.get)).toBe(true);
      expect(pillar.tags.length).toBeGreaterThan(0);
      for (const tag of pillar.tags) expect(noEmpty(tag)).toBe(true);
    }
  });

  it("has 3 tenets, 5 model rows and 4 cohort rows, all non-empty", () => {
    expect(COHORT_TENETS).toHaveLength(3);
    expect(MODEL_COMPARISON).toHaveLength(5);
    expect(COHORT_COMPARISON).toHaveLength(4);
    for (const row of [...MODEL_COMPARISON, ...COHORT_COMPARISON]) {
      expect(noEmpty(row.aspect)).toBe(true);
      expect(noEmpty(row.standard)).toBe(true);
      expect(noEmpty(row.matroxx)).toBe(true);
    }
    for (const tenet of COHORT_TENETS) {
      expect(noEmpty(tenet.title)).toBe(true);
      expect(noEmpty(tenet.body)).toBe(true);
    }
  });

  it("has 2 cohort slots described as briefs-in-waiting", () => {
    expect(COHORT_SLOTS).toHaveLength(2);
    for (const slot of COHORT_SLOTS) {
      expect(noEmpty(slot.kind)).toBe(true);
      expect(noEmpty(slot.description)).toBe(true);
    }
  });

  it("has the exact philosophy quote and hero + teaser copy", () => {
    expect(PHILOSOPHY_QUOTE).toBe(
      "Most software is built to be billed. Ours is built to be believed in.",
    );
    expect(HERO.headline).toBe("Software that thinks. Systems that endure.");
    expect(noEmpty(HERO.sub)).toBe(true);
    expect(noEmpty(BRIEF_TEASER.heading)).toBe(true);
    expect(noEmpty(BRIEF_TEASER.body)).toBe(true);
  });

  it("uses only verified stack versions in the case study", () => {
    expect(CASE_STUDY.stack).toContain("Spring Boot 4.0.8");
    expect(CASE_STUDY.stack).toContain("Next.js 16.3.8");
    expect(CASE_STUDY.costNote).toContain("$0.0022");
    expect(CASE_STUDY.costNote).toContain("AI/LLM");
  });

  it("contains no removed or invented claims anywhere in Home copy", () => {
    const allText = JSON.stringify({
      BRIEF_TEASER,
      CASE_STUDY,
      COHORT_COMPARISON,
      COHORT_SLOTS,
      COHORT_TENETS,
      HERO,
      MODEL_COMPARISON,
      PHILOSOPHY_QUOTE,
      PILLARS,
      SECTION_DESCRIPTIONS,
      SECTION_LINKS,
      SERVICE_DETAILS,
      SERVICES_PAGE,
      WHAT_WE_DONT_DO,
      WORK_CASE_STUDY,
      WORK_PAGE,
    });
    for (const forbidden of [
      "31/31",
      "Spring AI",
      "Spring Boot 4\"",
      "Next.js 16\"",
      "Zurich",
      "San Francisco",
      "Tokyo",
    ]) {
      expect(allText).not.toContain(forbidden);
    }
  });
});
