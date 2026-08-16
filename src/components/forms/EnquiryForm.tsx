"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState, type ReactNode } from "react";

import { programmesByGroup, levelIds } from "@/data/catalogue";
import type { Locale } from "@/i18n/config";
import { format, splitOn } from "@/i18n/format";
import { href } from "@/i18n/routes";
import type { ApplyDict, ProgrammesDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import {
  collectErrors,
  enquirySchema,
  schedulePreferences,
  NAME_MIN_LENGTH,
} from "@/lib/enquiry";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { ArrowRight, Button } from "@/components/ui/Button";
import { NotePanel } from "@/components/ui/Note";

type Status = "idle" | "submitting" | "success" | "error";

const learnerTypes = ["child", "self"] as const;

/**
 * No `behavior` on purpose. An explicit value overrides the computed
 * `scroll-behavior`, which is what globals.css switches to `auto` under
 * prefers-reduced-motion; leaving it out keeps that setting in charge.
 */
const centreInView: ScrollIntoViewOptions = { block: "center" };

export function EnquiryForm({
  locale,
  dict,
  programmes,
  privacyLinkText,
  className,
}: {
  locale: Locale;
  dict: ApplyDict;
  programmes: ProgrammesDict;
  /** Label used for the privacy-notice link inside the consent checkbox. */
  privacyLinkText: string;
  className?: string;
}) {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [learnerType, setLearnerType] = useState<"self" | "child">("child");
  const isChild = learnerType === "child";

  const f = dict.form;
  const v = dict.validation;

  /** The three dictionaries still carry this guidance as the message field's
      placeholder; `hint` is where it belongs, and wins once it is written. */
  const messageHint = f.fields.message.hint ?? f.fields.message.placeholder;

  const messageFor = (field: string): string | undefined => {
    const key = errors[field];
    if (!key) return undefined;
    if (key === "minLength") return format(v.minLength, { n: NAME_MIN_LENGTH });
    return (v as unknown as Record<string, string>)[key] ?? v.required;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const raw = {
      learnerType,
      studentName: String(data.get("studentName") ?? ""),
      studentAge: String(data.get("studentAge") ?? ""),
      parentName: String(data.get("parentName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      programme: String(data.get("programme") ?? "unsure"),
      level: String(data.get("level") ?? "unknown"),
      preferredSchedule: String(data.get("preferredSchedule") ?? "flexible"),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      marketing: data.get("marketing") === "on",
      // A checkbox is absent when unticked; anything present means a bot.
      botcheck: data.get("botcheck") ? "x" : "",
      locale,
      sourcePath: pathname,
    };

    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const next = collectErrors(parsed.error, raw);
      setErrors(next);
      setStatus("idle");
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        summaryRef.current?.scrollIntoView(centreInView);
      });
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Human-readable values, so the founder's inbox never shows raw ids.
    const values = parsed.data;
    const labels = {
      programme:
        values.programme === "unsure"
          ? // Whatever the visitor saw on the first option, never an English
            // literal. A dictionary without one leaves the option blank, and
            // the em dash is how the email marks every other unanswered field.
            (f.fields.programme.placeholder ?? "—")
          : programmes.items[values.programme].name,
      level:
        values.level === "unknown"
          ? f.levelUnknown
          : programmes.levelNames[values.level],
      schedule: f.schedulePreference[values.preferredSchedule],
    };

    try {
      const result = await submitEnquiry(values, labels);

      if (result.ok) {
        setStatus("success");
        form.reset();
        requestAnimationFrame(() => formRef.current?.scrollIntoView(centreInView));
        return;
      }

      if (result.errors) setErrors(result.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  /**
   * role="radio" is a promise about the keyboard: the arrows move between the
   * options and select as they go, Home and End jump to the ends. Without it
   * the group is two unrelated toggles wearing the wrong ARIA.
   */
  function onLearnerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const count = learnerTypes.length;
    const current = learnerTypes.indexOf(learnerType);
    let index: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        index = (current + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        index = (current - 1 + count) % count;
        break;
      case "Home":
        index = 0;
        break;
      case "End":
        index = count - 1;
        break;
      default:
        return;
    }

    const next = learnerTypes[index];
    if (!next) return;

    event.preventDefault();
    setLearnerType(next);

    // Selection follows focus in a radiogroup, so focus moves with it.
    const options = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    options[index]?.focus();
  }

  if (status === "success") {
    return (
      <div
        ref={formRef as unknown as React.RefObject<HTMLDivElement>}
        role="status"
        aria-live="polite"
        className={className}
      >
        <NotePanel
          align="center"
          className="p-8 sm:p-12"
          title={dict.success.title}
          icon={<SuccessGlyph />}
          actions={
            <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
              {dict.success.again}
            </Button>
          }
        >
          {dict.success.body}
        </NotePanel>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const showSummary = errorCount > 0 || status === "error";
  /** Delivery failed rather than the answers being wrong. */
  const deliveryFailed = status === "error" && errorCount === 0;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8 lg:p-10",
        className,
      )}
    >
      {/*
        Honeypot. The name and the checkbox type are fixed by Web3Forms, which
        drops any submission where this arrives ticked.
      */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {/* Collapsed with a grid row, never a height: the panel is measured by
          the browser, so a long translation can never be clipped. It stays in
          the DOM so it can animate, and is inert while collapsed — a zero-high
          overflow-hidden box is still read out, so without this a visitor
          arriving at the form is told to check the highlighted fields. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={showSummary ? "alert" : undefined}
        inert={!showSummary}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out-quint",
          showSummary ? "mb-7 grid-rows-[1fr] opacity-100" : "mb-0 grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              {deliveryFailed ? dict.failure.title : v.summary}
            </p>
            {deliveryFailed ? (
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-red-800/80">
                {dict.failure.body}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Learner ───────────────────────────────────────────────────────── */}
      <Fieldset legend={f.sections.learner}>
        <div className="sm:col-span-2">
          <span className="mb-2 block text-[0.8125rem] font-semibold text-navy-900">
            {f.fields.learnerType.label}
          </span>
          <div
            role="radiogroup"
            aria-label={f.fields.learnerType.label}
            onKeyDown={onLearnerKeyDown}
            className="inline-flex rounded-full border border-line bg-slate-50 p-1"
          >
            {learnerTypes.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={learnerType === value}
                // One tab stop for the group, as the radio role promises;
                // the arrow keys move between the options.
                tabIndex={learnerType === value ? 0 : -1}
                onClick={() => setLearnerType(value)}
                className={cn(
                  "press rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-colors duration-200 ease-out-quint",
                  learnerType === value
                    ? "bg-navy-800 text-white"
                    : "text-slate-600 can-hover:hover:text-navy-900",
                )}
              >
                {f.learnerType[value]}
              </button>
            ))}
          </div>
        </div>

        <Field
          name="studentName"
          label={f.fields.studentName.label}
          placeholder={f.fields.studentName.placeholder}
          hint={isChild ? f.fields.studentName.hint : undefined}
          autoComplete={isChild ? "off" : "name"}
          required
          requiredLabel={f.required}
          error={messageFor("studentName")}
        />

        <Field
          name="studentAge"
          label={f.fields.studentAge.label}
          placeholder={f.fields.studentAge.placeholder}
          type="number"
          inputMode="numeric"
          min={3}
          max={99}
          required={isChild}
          requiredLabel={isChild ? f.required : f.optional}
          error={messageFor("studentAge")}
        />

        {isChild ? (
          <Field
            name="parentName"
            label={f.fields.parentName.label}
            placeholder={f.fields.parentName.placeholder}
            autoComplete="name"
            required
            requiredLabel={f.required}
            error={messageFor("parentName")}
            className="sm:col-span-2"
          />
        ) : null}
      </Fieldset>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <Fieldset legend={f.sections.contact}>
        <Field
          name="phone"
          label={f.fields.phone.label}
          placeholder={f.fields.phone.placeholder}
          hint={f.fields.phone.hint}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          requiredLabel={f.required}
          error={messageFor("phone")}
        />
        <Field
          name="email"
          label={f.fields.email.label}
          placeholder={f.fields.email.placeholder}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          requiredLabel={f.required}
          error={messageFor("email")}
        />
      </Fieldset>

      {/* ── Course ────────────────────────────────────────────────────────── */}
      <Fieldset legend={f.sections.course}>
        <SelectField
          name="programme"
          label={f.fields.programme.label}
          defaultValue="unsure"
          error={messageFor("programme")}
        >
          <option value="unsure">{f.fields.programme.placeholder}</option>
          {(Object.keys(programmesByGroup) as (keyof typeof programmesByGroup)[]).map(
            (group) => (
              <optgroup key={group} label={programmes.groups[group].title}>
                {programmesByGroup[group].map((id) => (
                  <option key={id} value={id}>
                    {programmes.items[id].name}
                  </option>
                ))}
              </optgroup>
            ),
          )}
        </SelectField>

        <SelectField
          name="level"
          label={f.fields.level.label}
          defaultValue="unknown"
          hint={f.fields.level.hint}
          error={messageFor("level")}
        >
          <option value="unknown">{f.levelUnknown}</option>
          {levelIds.map((id) => (
            <option key={id} value={id}>
              {programmes.levelNames[id]}
            </option>
          ))}
        </SelectField>

        <SelectField
          name="preferredSchedule"
          label={f.fields.preferredSchedule.label}
          defaultValue="flexible"
          error={messageFor("preferredSchedule")}
          className="sm:col-span-2"
        >
          {schedulePreferences.map((id) => (
            <option key={id} value={id}>
              {f.schedulePreference[id]}
            </option>
          ))}
        </SelectField>

        <div className="sm:col-span-2">
          <FieldLabel
            htmlFor="message"
            label={f.fields.message.label}
            requiredLabel={f.optional}
          />
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            aria-describedby={messageHint ? "message-hint" : undefined}
            className={inputClasses(false)}
          />
          {/* Under the box, not inside it. This line asks the writer to leave
              health and special-needs details out — Art. 9 data we have no
              basis to receive — and as placeholder text it disappeared on the
              first keystroke, which is the moment it has to be on screen. */}
          {messageHint ? (
            <p id="message-hint" className="mt-1.5 text-[0.8125rem] text-slate-500">
              {messageHint}
            </p>
          ) : null}
        </div>
      </Fieldset>

      {/* ── Consent ───────────────────────────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7">
        <Checkbox
          name="consent"
          required
          error={messageFor("consent")}
          label={
            <ConsentLabel template={f.consent} linkText={privacyLinkText} locale={locale} />
          }
        />
        <Checkbox name="marketing" label={f.marketing} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          trailing={status === "submitting" ? <Spinner /> : <ArrowRight />}
        >
          {status === "submitting" ? f.submitting : f.submit}
        </Button>
        <p className="text-[0.8125rem] text-slate-500">{dict.aside.responseTime}</p>
      </div>
    </form>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────────── */

function inputClasses(invalid: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-navy-900 placeholder:text-slate-500",
    "transition-[border-color,box-shadow] duration-200 ease-out-quint",
    // Let the global two-tone focus ring in globals.css do the work; a 12%
    // navy ring on white is 1.3:1 and effectively invisible.
    "focus-visible:border-navy-600",
    // A white field on a white card is identified by its border alone, so the
    // border has to carry 3:1 (WCAG 1.4.11). The hairline used everywhere else
    // is 1.26:1 here, which is a form that reads as a blank panel.
    invalid ? "border-red-400 bg-red-50/40" : "border-slate-500 can-hover:hover:border-navy-600",
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <legend className="eyebrow mb-5 flex w-full items-center gap-3 text-navy-500">
        {legend}
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function FieldLabel({
  htmlFor,
  label,
  requiredLabel,
}: {
  htmlFor: string;
  label: string;
  requiredLabel?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline justify-between gap-3 text-[0.8125rem] font-semibold text-navy-900"
    >
      {label}
      {requiredLabel ? (
        <span className="text-2xs font-medium tracking-[0.06em] text-slate-500 uppercase">
          {requiredLabel}
        </span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div
      id={id}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-out-quint",
        message ? "mt-1.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
      )}
    >
      <p className="min-h-0 overflow-hidden text-[0.8125rem] text-red-600">{message}</p>
    </div>
  );
}

function Field({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  className,
  ...rest
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "name" | "className" | "id">) {
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <FieldLabel htmlFor={name} label={label} requiredLabel={requiredLabel} />
      <input
        id={name}
        name={name}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={inputClasses(Boolean(error))}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-slate-500">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  hint,
  error,
  className,
  children,
  ...rest
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"select">, "name" | "className" | "id" | "children">) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={className}>
      <FieldLabel htmlFor={name} label={label} />
      <div className="relative">
        <select
          id={name}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className={cn(inputClasses(Boolean(error)), "appearance-none pr-11")}
          {...rest}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-slate-500"
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-slate-500">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function Checkbox({
  name,
  label,
  error,
  required,
}: {
  name: string;
  label: ReactNode;
  error?: string;
  required?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-0.5 size-[1.15rem] shrink-0 cursor-pointer appearance-none rounded-md border bg-white",
            "transition-[background-color,border-color] duration-150 ease-out-quint",
            "checked:border-navy-800 checked:bg-navy-800",
            "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22><path d=%22m3.5 8.5 3 3 6-6%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] checked:bg-center checked:bg-no-repeat",
            // Unchecked, the box is white on white: the border is the control.
            error ? "border-red-400" : "border-slate-500",
          )}
        />
        <label htmlFor={id} className="text-[0.875rem] leading-relaxed text-slate-600">
          {label}
        </label>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function ConsentLabel({
  template,
  linkText,
  locale,
}: {
  template: string;
  linkText: string;
  locale: Locale;
}) {
  const [before, after] = splitOn(template, "privacy");
  return (
    <>
      {before}
      <Link href={href(locale, "privacy")} className="link-underline font-medium text-navy-800">
        {linkText}
      </Link>
      {after}
    </>
  );
}

function SuccessGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 animate-spin">
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.8" />
      <path d="M14.4 8A6.4 6.4 0 0 0 8 1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
