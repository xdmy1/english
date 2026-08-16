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

/* ── Throttle: 5 requests per caller per 10 minutes ──────────────────────── */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * How many callers we are willing to remember. Past this the oldest windows
 * are dropped, so a flood from many addresses costs a bounded amount of
 * memory instead of growing until the container is recycled.
 */
const MAX_TRACKED = 5000;

/** A counter and a window start per caller — never a list that can grow. */
const hits = new Map<string, { count: number; start: number }>();

function throttled(key: string): boolean {
  const now = Date.now();
  if (hits.size > MAX_TRACKED) sweep(now);

  const entry = hits.get(key);

  if (!entry || now - entry.start >= WINDOW_MS) {
    // Re-inserting keeps the map ordered by window start, which is what makes
    // dropping from the head in sweep() drop the stalest caller.
    hits.delete(key);
    hits.set(key, { count: 1, start: now });
    return false;
  }

  // Stop counting once the caller is over the line. Recording blocked attempts
  // would let a visitor who keeps pressing Send extend their own block.
  if (entry.count >= MAX_PER_WINDOW) return true;

  entry.count += 1;
  return false;
}

function sweep(now: number) {
  for (const [key, entry] of hits) {
    if (now - entry.start >= WINDOW_MS) hits.delete(key);
  }
  for (const key of hits.keys()) {
    if (hits.size <= MAX_TRACKED) break;
    hits.delete(key);
  }
}

/**
 * Which header carries the caller's address is a property of what sits in
 * front of the app, so it is configuration rather than a guess.
 *
 * `x-forwarded-for` is deliberately not consulted: proxies APPEND the peer
 * they saw, so a caller can seed the list with anything, and on a server that
 * is reachable directly they choose all of it — the throttle key would be
 * picked by the attacker. Vercel overwrites `x-vercel-forwarded-for` on every
 * request, which is why it is the default. Behind your own proxy, set
 * ENQUIRY_IP_HEADER to the header that proxy overwrites — `x-real-ip` in a
 * stock nginx block.
 *
 * When nothing resolves, every caller shares one bucket. That fails closed,
 * which is the right way round: the alternative is an unmetered mail path for
 * anyone who removes a header.
 */
const IP_HEADER = process.env.ENQUIRY_IP_HEADER ?? "x-vercel-forwarded-for";

function clientIp(request: NextRequest): string | null {
  const value = request.headers.get(IP_HEADER);
  if (!value) return null;

  // Even a trusted header can carry a chain; the last entry is the address the
  // proxy nearest to us actually observed.
  const hops = value.split(",").map((hop) => hop.trim()).filter(Boolean);
  return hops.at(-1) ?? null;
}

/* ── Body ────────────────────────────────────────────────────────────────── */

/**
 * Generous for this schema — the longest message is 2000 characters — and small
 * enough that a flood cannot buy heap with a body we have not looked at yet.
 */
const MAX_BODY_BYTES = 16 * 1024;

/** Reads the body, giving up as soon as it goes over the ceiling. */
async function readBody(request: NextRequest): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;

  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    // Chunked requests declare no length, so the stream itself is the limit.
    if (received > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }

  return text + decoder.decode();
}

/* ── Handler ─────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  if (throttled(clientIp(request) ?? "unresolved")) {
    return json({ ok: false, reason: "rate-limit" }, 429);
  }

  const text = await readBody(request);
  if (text === null) return json({ ok: false, reason: "invalid" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, reason: "invalid" }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, reason: "invalid", errors: collectErrors(parsed.error, body) }, 422);
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
