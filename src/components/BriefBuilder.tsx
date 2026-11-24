"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_PAGE } from "@/lib/content";
import {
  BUDGET_CONTEXT_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  assembleBrief,
  briefFileName,
  briefSchema,
  buildMailtoLink,
  type BriefInput,
} from "@/lib/brief";

const INPUT_CLASSES =
  "mt-2 w-full rounded border border-slate/60 bg-obsidian px-4 py-3 text-ink placeholder:text-muted/60 focus:border-bronze focus:outline-none";

const PRIMARY_BUTTON =
  "mx-shimmer-border rounded bg-bronze px-5 py-3 font-mono text-sm font-semibold text-obsidian transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze-deep hover:text-ink hover:shadow-[0_8px_24px_rgba(201,169,125,0.25)] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none";

const SECONDARY_BUTTON =
  "rounded border border-bronze px-5 py-3 font-mono text-sm font-semibold text-bronze transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-bronze hover:text-obsidian hover:shadow-[0_8px_24px_rgba(201,169,125,0.18)] active:translate-y-0";

/** One inline, accessible field error (ARCHITECTURE.md §6). */
function FieldError({ error, id }: { error?: FieldError; id: string }) {
  if (!error?.message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-bronze">
      {error.message}
    </p>
  );
}

/** A labelled text/email input wired to React Hook Form. */
function TextField({
  error,
  hint,
  id,
  label,
  register,
  type = "text",
}: {
  error?: FieldError;
  hint?: string;
  id: keyof BriefInput;
  label: string;
  register: UseFormRegister<BriefInput>;
  type?: "email" | "text";
}) {
  const fieldId = `brief-${id}`;
  const errorId = `${fieldId}-error`;
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="font-mono text-sm tracking-wide text-ink"
      >
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        aria-invalid={Boolean(error)}
        aria-errormessage={error ? errorId : undefined}
        className={INPUT_CLASSES}
        {...register(id)}
      />
      {hint ? (
        <p id={`${fieldId}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/** Project-type select: the empty option keeps the field unchosen. */
function ProjectTypeField({
  error,
  register,
}: {
  error?: FieldError;
  register: UseFormRegister<BriefInput>;
}) {
  const errorId = "brief-projectType-error";
  return (
    <div>
      <label
        htmlFor="brief-projectType"
        className="font-mono text-sm tracking-wide text-ink"
      >
        {CONTACT_PAGE.projectTypeLabel}
      </label>
      <select
        id="brief-projectType"
        aria-describedby="brief-projectType-hint"
        aria-invalid={Boolean(error)}
        aria-errormessage={error ? errorId : undefined}
        className={`${INPUT_CLASSES} appearance-none`}
        {...register("projectType")}
      >
        <option value="">{CONTACT_PAGE.projectTypePlaceholder}</option>
        {PROJECT_TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p id="brief-projectType-hint" className="mt-2 text-sm text-muted">
        {CONTACT_PAGE.projectTypeHint}
      </p>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/** Scope textarea with a live character count (40–2000). */
function ScopeField({
  error,
  length,
  register,
}: {
  error?: FieldError;
  length: number;
  register: UseFormRegister<BriefInput>;
}) {
  const errorId = "brief-scope-error";
  return (
    <div>
      <label
        htmlFor="brief-scope"
        className="font-mono text-sm tracking-wide text-ink"
      >
        {CONTACT_PAGE.scopeLabel}
      </label>
      <textarea
        id="brief-scope"
        rows={7}
        aria-describedby="brief-scope-hint"
        aria-invalid={Boolean(error)}
        aria-errormessage={error ? errorId : undefined}
        className={`${INPUT_CLASSES} resize-y`}
        {...register("scope")}
      />
      <p id="brief-scope-hint" className="mt-2 text-sm text-muted">
        {CONTACT_PAGE.scopeHint} ({length}/2000)
      </p>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/** Budget-context radios — one of cohort / standard / not-sure. */
function BudgetField({
  error,
  register,
}: {
  error?: FieldError;
  register: UseFormRegister<BriefInput>;
}) {
  const errorId = "brief-budgetContext-error";
  return (
    <fieldset>
      <legend className="font-mono text-sm tracking-wide text-ink">
        {CONTACT_PAGE.budgetContextLabel}
      </legend>
      <div className="mt-3 space-y-2">
        {BUDGET_CONTEXT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 leading-relaxed text-ink"
          >
            <input
              type="radio"
              value={option.value}
              className="mt-1.5 accent-[#C9A97D]"
              {...register("budgetContext")}
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted">{CONTACT_PAGE.budgetHint}</p>
      <FieldError id={errorId} error={error} />
    </fieldset>
  );
}

/** Download the assembled brief as a Markdown file (works offline). */
function downloadBrief(brief: string): void {
  const blob = new Blob([brief], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = briefFileName();
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * The assembled-brief preview + its three client-side actions: copy,
 * download, and send via email. The mailto warning shows when the
 * encoded body passes 1,800 characters — the link stays clickable,
 * the visitor decides (ARCHITECTURE.md §6).
 */
function BriefPreview({
  brief,
  copied,
  copyFailed,
  onCopy,
  projectType,
}: {
  brief: string;
  copied: boolean;
  copyFailed: boolean;
  onCopy: () => void;
  projectType: BriefInput["projectType"];
}) {
  const mailto = buildMailtoLink(brief, projectType);
  return (
    <section
      aria-labelledby="brief-preview-heading"
      className="mt-10 border-t border-slate/60 pt-10"
    >
      <h2
        id="brief-preview-heading"
        className="font-display text-2xl font-medium text-ink md:text-3xl"
      >
        {CONTACT_PAGE.previewHeading}
      </h2>
      <textarea
        readOnly
        value={brief}
        aria-label={CONTACT_PAGE.previewLabel}
        rows={16}
        className={`${INPUT_CLASSES} mt-6 resize-y font-mono text-sm leading-relaxed`}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onCopy} className={SECONDARY_BUTTON}>
          {copied ? CONTACT_PAGE.copiedLabel : CONTACT_PAGE.copyLabel}
        </button>
        <button
          type="button"
          onClick={() => downloadBrief(brief)}
          className={SECONDARY_BUTTON}
        >
          {CONTACT_PAGE.downloadLabel}
        </button>
        <a href={mailto.href} className={SECONDARY_BUTTON}>
          {CONTACT_PAGE.emailSendLabel}
        </a>
      </div>
      {copyFailed ? (
        <p role="alert" className="mt-4 text-sm text-bronze">
          {CONTACT_PAGE.copyFailedLabel}
        </p>
      ) : null}
      {mailto.tooLongForEmail ? (
        <p role="alert" className="mt-4 text-sm text-bronze">
          {CONTACT_PAGE.mailtoWarning}
        </p>
      ) : null}
    </section>
  );
}

/**
 * BriefBuilder in 5 lines: React Hook Form + Zod validate the six
 * fields (submit stays disabled until the form is valid); on submit the
 * brief is assembled in the browser and shown for the visitor to check.
 * Copy, download and mailto are all client-side — nothing typed is sent
 * or stored (ARCHITECTURE.md §6).
 */
export default function BriefBuilder() {
  const [brief, setBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<BriefInput>({
    defaultValues: {
      budgetContext: undefined,
      company: "",
      email: "",
      name: "",
      projectType: undefined,
      scope: "",
    },
    mode: "onChange",
    resolver: zodResolver(briefSchema),
  });

  const scopeLength = useWatch({ control, name: "scope" })?.length ?? 0;
  const projectType = useWatch({ control, name: "projectType" });

  async function copyBrief(): Promise<void> {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopyFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((values) => setBrief(assembleBrief(values)))}
        className="space-y-8"
      >
        <TextField
          id="name"
          label={CONTACT_PAGE.nameLabel}
          register={register}
          error={errors.name}
        />
        <TextField
          id="company"
          label={CONTACT_PAGE.companyLabel}
          register={register}
          error={errors.company}
        />
        <TextField
          id="email"
          label={CONTACT_PAGE.emailLabel}
          hint={CONTACT_PAGE.emailHint}
          type="email"
          register={register}
          error={errors.email}
        />
        <ProjectTypeField register={register} error={errors.projectType} />
        <ScopeField
          register={register}
          error={errors.scope}
          length={scopeLength}
        />
        <BudgetField register={register} error={errors.budgetContext} />
        <button type="submit" disabled={!isValid} className={PRIMARY_BUTTON}>
          {CONTACT_PAGE.submitLabel}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">{CONTACT_PAGE.privacy}</p>
      {brief && projectType ? (
        <BriefPreview
          brief={brief}
          copied={copied}
          copyFailed={copyFailed}
          onCopy={() => void copyBrief()}
          projectType={projectType}
        />
      ) : null}
    </div>
  );
}
