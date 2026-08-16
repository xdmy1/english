import { z } from "zod";

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

const age = z.coerce.number().int().min(3).max(99);

/** Everything that is asked for regardless of who the course is for. */
const shared = {
  studentName: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(32).regex(phonePattern),
  email: z.string().trim().max(180).pipe(z.email()),
  programme: z.enum(programmeOptions),
  level: z.enum(levelOptions),
  preferredSchedule: z.enum(schedulePreferences),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true),
  marketing: z.boolean().optional(),

  /** Honeypot — real people never see this field, so it must stay empty. */
  botcheck: z.string().max(0).optional(),

  /** Context, not user input. */
  locale: z.enum(locales),
  sourcePath: z.string().max(240).optional(),
};

/**
 * A discriminated union rather than one object with a .superRefine():
 * superRefine only runs once the base object has parsed cleanly, so a first
 * submit of an empty form would report the shared fields, and only the NEXT
 * submit would reveal that the parent's name and the child's age were also
 * required. Splitting the two cases surfaces every error at once.
 */
export const enquirySchema = z.discriminatedUnion("learnerType", [
  z.object({
    ...shared,
    learnerType: z.literal("self"),
    studentAge: z.preprocess(blankToUndefined, age.optional()),
    parentName: z.preprocess(blankToUndefined, z.string().trim().max(120).optional()),
  }),
  z.object({
    ...shared,
    learnerType: z.literal("child"),
    studentAge: z.preprocess(blankToUndefined, age),
    parentName: z.preprocess(blankToUndefined, z.string().trim().min(2).max(120)),
  }),
]);

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;

export interface EnquiryResponse {
  ok: boolean;
  /** Field name -> one of the keys in ApplyDict.validation */
  errors?: Record<string, string>;
  reason?: "config" | "upstream" | "rate-limit" | "invalid";
  /** True in development when no delivery is configured. */
  simulated?: boolean;
}

/** Maps a validation issue to one of the message keys the dictionaries carry. */
export function issueKey(path: PropertyKey | undefined, code: string): string {
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
    default:
      return "required";
  }
}

/** Flattens a ZodError into { fieldName: messageKey }. */
export function collectErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issueKey(issue.path[0], issue.code);
  }
  return errors;
}
