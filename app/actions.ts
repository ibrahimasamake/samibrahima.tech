"use server";

import { headers } from "next/headers";
import { budgetRanges, labelFor, projectTypes, timelines } from "@/data/enquiry";
import { profile } from "@/data/profile";
import { renderRows, sendEmail } from "@/lib/email";
import { clientKey, looksAutomated, rateLimited } from "@/lib/spam";
import {
  contactSchema,
  enquirySchema,
  flattenErrors,
  type ContactInput,
  type EnquiryInput,
  type FormState,
} from "@/lib/validation";

const fallback = `Please email ${profile.email} directly.`;

async function guard(startedAt: unknown): Promise<FormState | null> {
  const now = Date.now();
  const h = await headers();
  if (rateLimited(clientKey(h), now)) {
    return { status: "error", message: `Too many messages in a short time. Please try again in a few minutes, or ${fallback.toLowerCase()}` };
  }
  if (typeof startedAt === "number" && looksAutomated(startedAt, now)) {
    // Pretend success so bots learn nothing.
    return { status: "success", message: "Thank you. Your message has been received." };
  }
  return null;
}

/**
 * Project enquiry. Nothing is stored: the enquiry is validated, then sent
 * by email and discarded.
 */
export async function submitEnquiry(input: EnquiryInput): Promise<FormState> {
  const blocked = await guard(input?.startedAt);
  if (blocked) return blocked;

  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = flattenErrors(parsed.error);
    if (fieldErrors.website) return { status: "success", message: "Thank you. Your enquiry has been received." };
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  const d = parsed.data;

  const { text, html } = renderRows(`New project enquiry: ${labelFor(projectTypes, d.projectType)}`, [
    ["Project type", labelFor(projectTypes, d.projectType)],
    ["Budget", labelFor(budgetRanges, d.budget)],
    ["Timeline", labelFor(timelines, d.timeline)],
    ["Name", d.fullName],
    ["Business", d.businessName],
    ["Email", d.email],
    ["WhatsApp", d.whatsapp],
    ["Country", d.country],
    ["Description", d.description],
  ]);

  const result = await sendEmail({
    subject: `Project enquiry — ${labelFor(projectTypes, d.projectType)} — ${d.fullName}`,
    text,
    html,
    replyTo: d.email,
  });

  if (!result.ok) {
    return { status: "error", message: `Your enquiry could not be sent right now. ${fallback}` };
  }
  return {
    status: "success",
    message: `Thank you, ${d.fullName.split(" ")[0]}. I read every enquiry myself and will reply to ${d.email} within two working days.`,
  };
}

export async function submitContact(input: ContactInput): Promise<FormState> {
  const blocked = await guard(input?.startedAt);
  if (blocked) return blocked;

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = flattenErrors(parsed.error);
    if (fieldErrors.website) return { status: "success", message: "Thank you. Your message has been received." };
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  const d = parsed.data;
  const { text, html } = renderRows(`Website message: ${d.subject}`, [
    ["Name", d.fullName],
    ["Email", d.email],
    ["Subject", d.subject],
    ["Message", d.message],
  ]);
  const result = await sendEmail({ subject: `Website message — ${d.subject}`, text, html, replyTo: d.email });
  if (!result.ok) return { status: "error", message: `Your message could not be sent right now. ${fallback}` };
  return { status: "success", message: "Thank you. Your message has been sent and I will reply by email." };
}
