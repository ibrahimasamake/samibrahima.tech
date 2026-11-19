"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { describedBy, Field, Input, Textarea } from "@/components/ui/field";
import { submitForm } from "@/lib/submit-form";
import { contactSchema, flattenErrors, type FormState } from "@/lib/validation";

export function ContactForm() {
  const uid = useId();
  const [data, setData] = useState({ fullName: "", email: "", subject: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (result.status !== "idle" && result.status !== "error") doneRef.current?.focus();
  }, [result.status]);

  const set = (key: keyof typeof data, value: string | boolean) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ ...data, startedAt: startedAt.current || 1 });
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error));
      return;
    }
    startTransition(async () => {
      const res = await submitForm({
        subject: `Website message: ${data.subject}`,
        name: data.fullName,
        email: data.email,
        honeypot: data.website,
        startedAt: startedAt.current,
        rows: [
          ["Name", data.fullName],
          ["Email", data.email],
          ["Subject", data.subject],
          ["Message", data.message],
        ],
      });
      setResult(res.status === "success" && !res.message ? { status: "success", message: "Thanks for writing! A reply is on its way to your inbox soon." } : res);
    });
  }

  if (result.status === "success" || result.status === "mailto") {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8" role="status">
        <CheckCircle2 className="size-9 text-success" aria-hidden />
        <h2 ref={doneRef} tabIndex={-1} className="mt-5 text-2xl font-semibold text-fg outline-none">
          {result.status === "success" ? "Message sent" : "Almost there"}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{result.message}</p>
      </div>
    );
  }

  const field = (key: "fullName" | "email" | "subject", label: string, extra: React.ComponentProps<"input"> = {}) => (
    <Field id={`${uid}-${key}`} label={label} error={errors[key]}>
      <Input
        id={`${uid}-${key}`}
        name={key}
        value={data[key]}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={describedBy(`${uid}-${key}`, errors[key])}
        required
        {...extra}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("fullName", "Full name", { autoComplete: "name" })}
        {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
      </div>
      {field("subject", "Subject")}
      <Field id={`${uid}-message`} label="Message" error={errors.message}>
        <Textarea
          id={`${uid}-message`}
          name="message"
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          maxLength={4000}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy(`${uid}-message`, errors.message)}
          required
        />
      </Field>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>
            My details are only used to reply to me and are not stored on this website (
            <Link href="/privacy" className="text-fg underline underline-offset-4">
              privacy policy
            </Link>
            ).
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} role="alert" className="text-sm text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      {result.status === "error" && result.message && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
          {result.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="sm:justify-self-start">
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            Send message <Send aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
