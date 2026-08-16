import { NextResponse, type NextRequest } from "next/server";

import { site } from "@/data/site";
import { collectErrors, enquirySchema, type EnquiryResponse } from "@/lib/enquiry";

export const runtime = "nodejs";

/**
 * Server-side delivery path for enrolment requests.
 *
 * Used when NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is absent — see
 * src/lib/submit-enquiry.ts for why Web3Forms cannot be proxied here.
 * Delivery goes through Resend (https://resend.com), which offers an EEA
 * region and a DPA a Moldovan privacy notice can point at.
 *
 * Required env:
 *   RESEND_API_KEY   re_...
 *   ENQUIRY_FROM     "The Best Indeed <office@your-domain.md>"  (verified sender)
 *   ENQUIRY_TO       founder@your-domain.md   (defaults to site.email.admissions)
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/* ── Throttle: 5 requests per IP per 10 minutes ──────────────────────────── */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/* ── Handler ─────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  if (throttled(clientIp(request))) {
    return json({ ok: false, reason: "rate-limit" }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid" }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, reason: "invalid", errors: collectErrors(parsed.error) }, 422);
  }

  const values = parsed.data;

  // Honeypot filled: accept silently so the bot learns nothing.
  if (values.botcheck) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO ?? site.email.admissions;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "\n[enquiry] No delivery configured — logging instead of sending.\n" +
          "  Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (browser delivery)\n" +
          "  or RESEND_API_KEY + ENQUIRY_FROM (server delivery). See docs/FORM-SETUP.md\n",
        values,
      );
      return json({ ok: true, simulated: true }, 200);
    }
    console.error("[enquiry] No delivery configured; the request was dropped.");
    return json({ ok: false, reason: "config" }, 500);
  }

  const who =
    values.learnerType === "child"
      ? `${values.studentName} (age ${values.studentAge}) — parent/guardian: ${values.parentName}`
      : values.studentName;

  const rows: [string, string][] = [
    ["Student", who],
    ["Phone", values.phone],
    ["Email", values.email],
    ["Programme", values.programme],
    ["Current level", values.level],
    ["Preferred schedule", values.preferredSchedule],
    ["Learning for", values.learnerType === "child" ? "A child" : "Themselves"],
    ["Message", values.message?.trim() || "—"],
    ["Marketing consent", values.marketing ? "Yes" : "No"],
    ["Privacy notice accepted", "Yes"],
    ["Form language", values.locale],
    ["Submitted from", values.sourcePath ?? "—"],
  ];

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Enrolment request — ${values.studentName} — ${values.programme}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: renderHtml(rows),
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[enquiry] Resend rejected the message:", response.status, detail);
      return json({ ok: false, reason: "upstream" }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[enquiry] Delivery failed:", error);
    return json({ ok: false, reason: "upstream" }, 502);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(rows: [string, string][]): string {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:8px 16px 8px 0;color:#69718C;font:600 12px/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 0;color:#0F1E52;font:400 15px/1.6 system-ui,sans-serif">${escapeHtml(value).replace(/\n/g, "<br>")}</td>` +
        `</tr>`,
    )
    .join("");

  return (
    `<div style="background:#F5F7FC;padding:32px">` +
    `<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E5EE">` +
    `<div style="height:6px;background:linear-gradient(to bottom,#152A6F 0,#152A6F 50%,#C22E35 50%,#C22E35 100%)"></div>` +
    `<div style="padding:28px 32px">` +
    `<p style="margin:0 0 4px;color:#C22E35;font:600 11px/1.4 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase">New enrolment request</p>` +
    `<h1 style="margin:0 0 20px;color:#0F1E52;font:600 22px/1.3 Georgia,serif">${escapeHtml(site.name)}</h1>` +
    `<table style="width:100%;border-collapse:collapse">${cells}</table>` +
    `</div></div></div>`
  );
}

function json(body: EnquiryResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
