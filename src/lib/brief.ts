// Project Brief builder — one Zod schema, shared by the form and the
// tests (ARCHITECTURE.md §6). No backend: the brief is assembled in the
// visitor's browser and sent via their own email, copy, or download.

import { z } from "zod";
import { CONTACT_EMAIL } from "./site";

export const PROJECT_TYPES = [
  "web-platform",
  "ai-agent-system",
  "system-level",
  "not-sure",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const BUDGET_CONTEXTS = ["cohort", "standard", "not-sure"] as const;

export type BudgetContext = (typeof BUDGET_CONTEXTS)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "ai-agent-system": "AI agent system",
  "not-sure": "Not sure yet",
  "system-level": "System-level software",
  "web-platform": "Web platform",
};

export const BUDGET_CONTEXT_LABELS: Record<BudgetContext, string> = {
  cohort: "Cohort model — $0 core build",
  "not-sure": "Not sure yet",
  standard: "Standard build",
};

export const PROJECT_TYPE_OPTIONS = PROJECT_TYPES.map((value) => ({
  label: PROJECT_TYPE_LABELS[value],
  value,
}));

export const BUDGET_CONTEXT_OPTIONS = BUDGET_CONTEXTS.map((value) => ({
  label: BUDGET_CONTEXT_LABELS[value],
  value,
}));

export const briefSchema = z.object({
  budgetContext: z.enum(BUDGET_CONTEXTS, {
    error: "Choose a budget context.",
  }),
  company: z
    .string()
    .max(80, "Company must be 80 characters or fewer.")
    .optional(),
  email: z.email("Enter a valid email address."),
  name: z
    .string()
    .min(2, "Name needs at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  projectType: z.enum(PROJECT_TYPES, {
    error: "Choose a project type.",
  }),
  scope: z
    .string()
    .min(40, "Scope needs at least 40 characters — a few sentences.")
    .max(2000, "Scope must be 2000 characters or fewer."),
});

export type BriefInput = z.infer<typeof briefSchema>;

/** Date on the brief, YYYY-MM-DD. */
export function formatBriefDate(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Download filename for the assembled brief. */
export function briefFileName(date: Date = new Date()): string {
  return `matroxx-brief-${formatBriefDate(date)}.md`;
}

/**
 * Assemble the plain-text brief: headed sections in field order
 * (name, company, email, project type, scope, budget context, date),
 * readable without the site.
 */
export function assembleBrief(
  values: BriefInput,
  date: Date = new Date(),
): string {
  const company =
    values.company && values.company.trim() !== ""
      ? values.company.trim()
      : "Not given";
  const lines = [
    "Matroxx — Project Brief",
    "",
    "Name",
    values.name.trim(),
    "",
    "Company",
    company,
    "",
    "Email",
    values.email.trim(),
    "",
    "Project type",
    PROJECT_TYPE_LABELS[values.projectType],
    "",
    "Scope",
    values.scope.trim(),
    "",
    "Budget context",
    BUDGET_CONTEXT_LABELS[values.budgetContext],
    "",
    "Date",
    formatBriefDate(date),
  ];
  return lines.join("\n");
}

/**
 * Mailto link for the assembled brief. Some mail clients truncate
 * bodies around ~2,000 characters, so the encoded body is counted:
 * over 1,800 characters the link stays clickable but the caller must
 * warn the visitor to use Copy or Download instead (ARCHITECTURE.md §6).
 */
export const MAILTO_BODY_LIMIT = 1800;

export function buildMailtoLink(brief: string, projectType: ProjectType) {
  const subject = `Matroxx — Project Brief: ${PROJECT_TYPE_LABELS[projectType]}`;
  const encodedBody = encodeURIComponent(brief);
  return {
    encodedBodyLength: encodedBody.length,
    href:
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodedBody}`,
    subject,
    tooLongForEmail: encodedBody.length > MAILTO_BODY_LIMIT,
  };
}
