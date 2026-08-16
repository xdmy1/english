"use client";

import type { EnquiryResponse, EnquiryValues } from "./enquiry";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WHERE ENROLMENT REQUESTS GO
 *
 *  Two delivery paths, chosen by which environment variable is set. See
 *  docs/FORM-SETUP.md for the five-minute version.
 *
 *  A) NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY  → posted straight from the browser to
 *     api.web3forms.com. This is the ONLY supported way to use Web3Forms:
 *     their WAF answers server-side calls with 403 unless you are on a paid
 *     plan with a safelisted static egress IP, which Vercel cannot give you.
 *     The access key is public by design — Web3Forms call it "an alias to your
 *     email address"; it cannot read submissions or change settings.
 *
 *  B) nothing set → posted to /api/enquiry, which validates again server-side
 *     and delivers through an email API (Resend by default). Preferred if you
 *     want EEA data residency, since Web3Forms processes in AWS us-east with
 *     no EU region.
 *
 *  Either way the payload is validated with the same Zod schema first.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function deliveryMode(): "web3forms" | "server" {
  return accessKey ? "web3forms" : "server";
}

export async function submitEnquiry(
  values: EnquiryValues,
  labels: { programme: string; level: string; schedule: string },
): Promise<EnquiryResponse> {
  return accessKey
    ? submitToWeb3Forms(values, labels)
    : submitToServer(values);
}

/* ── A. Browser → Web3Forms ──────────────────────────────────────────────── */

async function submitToWeb3Forms(
  values: EnquiryValues,
  labels: { programme: string; level: string; schedule: string },
): Promise<EnquiryResponse> {
  const who =
    values.learnerType === "child"
      ? `${values.studentName} (${values.studentAge}) — parent/guardian: ${values.parentName}`
      : values.studentName;

  const payload = {
    access_key: accessKey,
    subject: `Enrolment request — ${values.studentName} — ${labels.programme}`,
    from_name: "The Best Indeed English Centre — website",
    // `replyto` is one lowercase word; `reply_to` is silently ignored.
    replyto: values.email,

    Student: who,
    Phone: values.phone,
    Email: values.email,
    Programme: labels.programme,
    "Current level": labels.level,
    "Preferred schedule": labels.schedule,
    "Learning for": values.learnerType === "child" ? "A child" : "Themselves",
    Message: values.message?.trim() ? values.message : "—",
    "Marketing consent": values.marketing ? "Yes" : "No",
    "Privacy notice accepted": "Yes",
    "Form language": values.locale,
    "Submitted from": values.sourcePath ?? "—",
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      // Never x-www-form-urlencoded: that path answers 301 and trips CORS.
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    // 403 challenges return HTML and 500s use a different JSON shape, so the
    // body can never be trusted to parse or to carry `success`.
    const raw: unknown = await response.json().catch(() => null);
    const result = raw as
      | { success?: boolean; body?: { message?: string }; message?: string }
      | null;

    if (response.ok && result?.success === true) return { ok: true };

    console.error("[enquiry] Web3Forms rejected the submission:", response.status, result);
    return { ok: false, reason: "upstream" };
  } catch (error) {
    console.error("[enquiry] Web3Forms request failed:", error);
    return { ok: false, reason: "upstream" };
  }
}

/* ── B. Browser → our route handler → email API ──────────────────────────── */

async function submitToServer(values: EnquiryValues): Promise<EnquiryResponse> {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = (await response.json().catch(() => null)) as EnquiryResponse | null;
    return result ?? { ok: false, reason: "upstream" };
  } catch {
    return { ok: false, reason: "upstream" };
  }
}
