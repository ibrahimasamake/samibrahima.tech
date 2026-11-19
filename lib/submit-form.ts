import { profile } from "@/data/profile";
import type { FormState } from "@/lib/validation";

/**
 * Sends a form from the browser. The site is static (GitHub Pages), so there
 * is no server of our own:
 *
 * 1. If NEXT_PUBLIC_WEB3FORMS_KEY is set at build time, the message is posted to
 *    Web3Forms (https://web3forms.com), which emails it to the inbox the key was
 *    created for. That key is designed to be public: it can only send to that
 *    inbox, and Web3Forms filters spam on its side.
 * 2. Otherwise the visitor's email app opens with the message ready to send.
 *
 * Nothing is stored by this website in either case.
 */

export type Submission = {
  subject: string;
  name: string;
  email: string;
  rows: [string, string][];
  /** Honeypot value: real people leave it empty. */
  honeypot?: string;
  /** Date.now() when the form was shown. */
  startedAt: number;
};

const ENDPOINT = "https://api.web3forms.com/submit";
const MIN_FILL_MS = 3_000;

export function formsConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
}

export async function submitForm(s: Submission): Promise<FormState> {
  // Bots: pretend it worked and send nothing.
  if (s.honeypot || Date.now() - s.startedAt < MIN_FILL_MS) {
    return { status: "success", message: "Thank you. Your message has been received." };
  }

  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) return openMailApp(s);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: s.subject,
        from_name: "samibrahima.tech",
        name: s.name,
        email: s.email,
        replyto: s.email,
        botcheck: false,
        ...Object.fromEntries(s.rows),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (res.ok && data.success) return { status: "success" };
    return openMailApp(s, true);
  } catch {
    return openMailApp(s, true);
  }
}

function openMailApp(s: Submission, afterFailure = false): FormState {
  const body = s.rows.map(([k, v]) => `${k}:\n${v || "-"}`).join("\n\n");
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return {
    status: "mailto",
    message: afterFailure
      ? `The form service did not answer, so your email app should now open with your message ready. Just press send. Nothing opened? Write to ${profile.email}.`
      : `Your email app should now open with your message ready. Just press send. Nothing opened? Write to ${profile.email}.`,
  };
}
