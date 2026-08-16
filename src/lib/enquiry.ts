/*
 * Named imports, not `import { z } from "zod"`. Materialising the namespace
 * object drags the whole barrel in, the 53 locale message tables above all —
 * and none of those can ever be shown, because every message this form
 * displays comes from dict.validation. The form imports this file, so all of
 * it would be downloaded on /apply and /contact.
 */
import {
  boolean,
  coerce,
  discriminatedUnion,
  email,
  enum as zEnum,
  literal,
  object,
  preprocess,
  string,
  type ZodError,
  type input,
  type output,
} from "zod";

import { levelIds, programmeIds } from "@/data/catalogue";
import { locales } from "@/i18n/config";

/**
 * One schema, used by the form in the browser and again on the server before
 * anything is sent onward. Field names match ApplyFieldId in src/i18n/types.ts.
 */

export const schedulePreferences = [
  "weekdayAfternoon",
  "weekdayEvening",
  "weekend",
  "flexible",
] as const;

export const programmeOptions = [...programmeIds, "unsure"] as const;
export const levelOptions = [...levelIds, "unknown"] as const;

/** A leading +, then 7–24 digits and the usual separators. */
const phonePattern = /^\+?\d[\d\s().-]{6,24}$/;

/** An empty text input arrives as "", which is "not answered", not "zero". */
const blankToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

/** Shortest a name may be. Also the {n} in the "too short" message, so the
    rule and the sentence describing it can never drift apart. */
export const NAME_MIN_LENGTH = 2;

const age = coerce.number().int().min(3).max(99);

/** Everything that is asked for regardless of who the course is for. */
const shared = {
  studentName: string().trim().min(NAME_MIN_LENGTH).max(120),
  phone: string().trim().max(32).regex(phonePattern),
  email: string().trim().max(180).pipe(email()),
  programme: zEnum(programmeOptions),
  level: zEnum(levelOptions),
  preferredSchedule: zEnum(schedulePreferences),
  message: string().trim().max(2000).optional(),
  consent: literal(true),
  marketing: boolean().optional(),

  /**
   * Honeypot — real people never see this field, so it must stay empty.
   * It has to be impossible to fail: a schema error here would answer the bot
   * with a 422 naming the field, and the silent accept in the route handler
   * would never be reached. Whether it was filled is decided there, not here.
   */
  botcheck: coerce.string().optional(),

  /** Context, not user input. */
  locale: zEnum(locales),
  sourcePath: string().max(240).optional(),
};

/**
 * A discriminated union rather than one object with a .superRefine():
 * superRefine only runs once the base object has parsed cleanly, so a first
 * submit of an empty form would report the shared fields, and only the NEXT
 * submit would reveal that the parent's name and the child's age were also
 * required. Splitting the two cases surfaces every error at once.
 */
export const enquirySchema = discriminatedUnion("learnerType", [
  object({
    ...shared,
    learnerType: literal("self"),
    studentAge: preprocess(blankToUndefined, age.optional()),
    parentName: preprocess(blankToUndefined, string().trim().max(120).optional()),
  }),
  object({
    ...shared,
    learnerType: literal("child"),
    studentAge: preprocess(blankToUndefined, age),
    parentName: preprocess(blankToUndefined, string().trim().min(NAME_MIN_LENGTH).max(120)),
  }),
]);

export type EnquiryInput = input<typeof enquirySchema>;
export type EnquiryValues = output<typeof enquirySchema>;

export interface EnquiryResponse {
  ok: boolean;
  /** Field name -> one of the keys in ApplyDict.validation */
  errors?: Record<string, string>;
  reason?: "config" | "upstream" | "rate-limit" | "invalid";
  /** True in development when no delivery is configured. */
  simulated?: boolean;
}

/**
 * Maps a validation issue to one of the message keys the dictionaries carry.
 * `value` is what the visitor actually submitted for the field: Zod reports a
 * blank name and a one-letter name with the same code, and only the value
 * tells "you left this out" apart from "this is too short".
 */
export function issueKey(
  path: PropertyKey | undefined,
  code: string,
  value?: unknown,
): string {
  switch (path) {
    case "consent":
      return "consent";
    case "email":
      return "email";
    case "phone":
      return "phone";
    case "studentAge":
      // Missing entirely reads as "required"; out of range reads as "age".
      return code === "invalid_type" ? "required" : "age";
    case "studentName":
    case "parentName":
      return code === "too_small" && String(value ?? "").trim() !== ""
        ? "minLength"
        : "required";
    default:
      return "required";
  }
}

/**
 * Flattens a ZodError into { fieldName: messageKey }. `submitted` is the raw
 * object that was parsed, used only to choose between two message keys.
 */
export function collectErrors(
  error: ZodError,
  submitted?: unknown,
): Record<string, string> {
  const source = (submitted ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issueKey(issue.path[0], issue.code, source[field]);
  }
  return errors;
}
