import "server-only";

/**
 * Email delivery through the Resend HTTP API (https://resend.com).
 * No SDK needed. Credentials are read on the server only.
 *
 * Required in production:
 *   RESEND_API_KEY      secret API key
 *   CONTACT_TO_EMAIL    where enquiries are delivered
 *   CONTACT_FROM_EMAIL  a sender on a domain verified in Resend,
 *                       e.g. "Website <hello@samibrahima.tech>"
 */

export type OutgoingEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

export async function sendEmail(mail: OutgoingEmail): Promise<SendResult> {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      // Local development: show the message instead of sending it.
      console.info("[email:dev] Email not configured; message below was not sent.\n", mail.subject, "\n", mail.text);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing.");
    return { ok: false, reason: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        reply_to: mail.replyTo,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[email] Provider responded with", res.status, await res.text().catch(() => ""));
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Request failed", err);
    return { ok: false, reason: "provider-error" };
  }
}

const escapeMap: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => escapeMap[c]);
}

/** Builds a plain table email from label/value rows. */
export function renderRows(title: string, rows: [string, string][]) {
  const text = [title, "", ...rows.map(([k, v]) => `${k}:\n${v || "—"}\n`)].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111">
<h2 style="font-size:18px">${escapeHtml(title)}</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#555;border-bottom:1px solid #eee;white-space:nowrap">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v || "—")}</td></tr>`,
    )
    .join("")}</table></div>`;
  return { text, html };
}
