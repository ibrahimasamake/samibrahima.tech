import { z } from "zod";
import { budgetRanges, projectTypes, timelines } from "@/data/enquiry";

const values = <T extends { value: string }>(list: readonly T[]) =>
  list.map((o) => o.value) as [T["value"], ...T["value"][]];

const name = z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long.");
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200);
// Optional, but if given it must look like a phone number (digits, spaces, +, -, brackets).
const whatsapp = z
  .string()
  .trim()
  .max(30, "That number is too long.")
  .refine((v) => v === "" || /^\+?[0-9 ()-]{7,}$/.test(v), "Please enter a valid number, with country code.")
  .optional()
  .default("");

/** Fields shared by both forms for spam protection. */
const antiSpam = {
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional().default(""),
  // Milliseconds since epoch when the form was rendered.
  startedAt: z.number().int().positive(),
};

export const enquiryStepSchemas = {
  type: z.object({
    projectType: z.enum(values(projectTypes), { error: "Please choose a project type." }),
  }),
  description: z.object({
    description: z
      .string()
      .trim()
      .min(30, "Tell me a little more (at least 30 characters).")
      .max(4000, "Please keep it under 4,000 characters."),
  }),
  budget: z.object({
    budget: z.enum(values(budgetRanges), { error: "Please choose a budget range." }),
  }),
  timeline: z.object({
    timeline: z.enum(values(timelines), { error: "Please choose a timeline." }),
  }),
  contact: z.object({
    fullName: name,
    businessName: z.string().trim().max(150).optional().default(""),
    email,
    whatsapp,
    country: z.string().trim().min(2, "Please enter your country.").max(80),
    consent: z.literal(true, { error: "Please accept the privacy notice to continue." }),
  }),
};

export const enquirySchema = enquiryStepSchemas.type
  .extend(enquiryStepSchemas.description.shape)
  .extend(enquiryStepSchemas.budget.shape)
  .extend(enquiryStepSchemas.timeline.shape)
  .extend(enquiryStepSchemas.contact.shape)
  .extend(antiSpam);

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export const contactSchema = z
  .object({
    fullName: name,
    email,
    subject: z.string().trim().min(3, "Please add a subject.").max(150),
    message: z.string().trim().min(20, "Please write at least 20 characters.").max(4000),
    consent: z.literal(true, { error: "Please accept the privacy notice to continue." }),
  })
  .extend(antiSpam);

export type ContactInput = z.input<typeof contactSchema>;

export type FormState = {
  status: "idle" | "success" | "error" | "mailto";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
