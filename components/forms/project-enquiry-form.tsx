"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { describedBy, Field, Input, Textarea } from "@/components/ui/field";
import { budgetRanges, labelFor, projectTypes, timelines } from "@/data/enquiry";
import { submitForm } from "@/lib/submit-form";
import { cn } from "@/lib/utils";
import { enquiryStepSchemas, flattenErrors, type EnquiryInput, type FormState } from "@/lib/validation";

const steps = [
  { key: "type", title: "What do you need?", label: "Project type" },
  { key: "description", title: "Tell us about the project", label: "Description" },
  { key: "budget", title: "What budget do you have in mind?", label: "Budget" },
  { key: "timeline", title: "When do you need it?", label: "Timeline" },
  { key: "contact", title: "Where should we reply?", label: "Contact" },
] as const;

type StepKey = (typeof steps)[number]["key"];

type Data = Omit<EnquiryInput, "consent" | "startedAt"> & { consent: boolean };

const empty: Data = {
  projectType: "" as EnquiryInput["projectType"],
  description: "",
  budget: "" as EnquiryInput["budget"],
  timeline: "" as EnquiryInput["timeline"],
  fullName: "",
  businessName: "",
  email: "",
  whatsapp: "",
  country: "",
  consent: false,
  website: "",
};

export function ProjectEnquiryForm() {
  const params = useSearchParams();
  const uid = useId();
  const initialType = params.get("type");
  const [data, setData] = useState<Data>(() => ({
    ...empty,
    projectType: (projectTypes.some((t) => t.value === initialType) ? initialType : "") as Data["projectType"],
  }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, result.status]);

  const current = steps[step];
  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key as string]: "" }));
  };

  function validateStep(key: StepKey) {
    const parsed = enquiryStepSchemas[key].safeParse(data);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    setErrors(flattenErrors(parsed.error));
    return false;
  }

  function next() {
    if (!validateStep(current.key)) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (current.key !== "contact") return next();
    if (!validateStep("contact")) return;
    startTransition(async () => {
      const type = labelFor(projectTypes, data.projectType);
      const res = await submitForm({
        subject: `Project enquiry: ${type} (${data.fullName})`,
        name: data.fullName,
        email: data.email,
        honeypot: data.website,
        startedAt: startedAt.current,
        rows: [
          ["Project type", type],
          ["Budget", labelFor(budgetRanges, data.budget)],
          ["Timeline", labelFor(timelines, data.timeline)],
          ["Name", data.fullName],
          ["Business", data.businessName ?? ""],
          ["Email", data.email],
          ["WhatsApp", data.whatsapp ?? ""],
          ["Country", data.country],
          ["Project description", data.description],
        ],
      });
      setResult(
        res.status === "success" && !res.message
          ? {
              status: "success",
              message: `Thank you, ${data.fullName.trim().split(" ")[0]}! Your project is in good hands. Expect a real reply at ${data.email}, usually within two working days.`,
            }
          : res,
      );
    });
  }

  if (result.status === "success" || result.status === "mailto") {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12" role="status">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-2xl font-semibold text-fg outline-none sm:text-3xl">
          {result.status === "success" ? "Enquiry received" : "Almost there"}
        </h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{result.message}</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border border-border bg-bg p-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-subtle">Project</dt>
            <dd className="mt-1 text-fg">{labelFor(projectTypes, data.projectType)}</dd>
          </div>
          <div>
            <dt className="text-subtle">Budget</dt>
            <dd className="mt-1 text-fg">{labelFor(budgetRanges, data.budget)}</dd>
          </div>
          <div>
            <dt className="text-subtle">Timeline</dt>
            <dd className="mt-1 text-fg">{labelFor(timelines, data.timeline)}</dd>
          </div>
        </dl>
        <p className="mt-8 text-muted">
          While you wait, have a look at{" "}
          <Link href="/projects" className="text-fg underline underline-offset-4">
            recent work
          </Link>{" "}
          or{" "}
          <Link href="/process" className="text-fg underline underline-offset-4">
            how a project runs
          </Link>
          .
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-surface" aria-describedby={`${uid}-progress`}>
      {/* Progress */}
      <div className="border-b border-border p-6 sm:px-10">
        <div className="flex items-center justify-between text-sm">
          <p id={`${uid}-progress`} className="text-muted">
            Step <span className="font-medium text-fg">{step + 1}</span> of {steps.length}
            <span className="sr-only">: {current.label}</span>
          </p>
          <p className="font-mono text-xs text-subtle">{Math.round(progress)}%</p>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-label="Enquiry progress"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of ${steps.length}: ${current.label}`}
        >
          <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 hidden gap-2 text-xs sm:flex" aria-hidden>
          {steps.map((s, i) => (
            <li key={s.key} className={cn("flex-1", i <= step ? "text-fg" : "text-subtle")}>
              {s.label}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-6 sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-fg outline-none sm:text-3xl">
          {current.title}
        </h2>

        <div className="mt-8">
          {current.key === "type" && (
            <ChoiceGroup
              name="projectType"
              legend="Project type"
              options={projectTypes}
              value={data.projectType}
              onChange={(v) => set("projectType", v as Data["projectType"])}
              error={errors.projectType}
              columns="sm:grid-cols-2"
            />
          )}

          {current.key === "description" && (
            <Field
              id={`${uid}-description`}
              label="Project description"
              hint="What does your business do, what problem should this solve, and who will use it? Links to examples you like are welcome."
              error={errors.description}
            >
              <Textarea
                id={`${uid}-description`}
                name="description"
                value={data.description}
                onChange={(e) => set("description", e.target.value)}
                maxLength={4000}
                rows={8}
                aria-invalid={!!errors.description}
                aria-describedby={describedBy(`${uid}-description`, errors.description, "hint")}
                placeholder="Example: I run three phone shops in Bamako. I want customers to see our stock online and staff to record sales on their phones…"
              />
              <p className="text-right font-mono text-xs text-subtle" aria-live="polite">
                {data.description.trim().length} / 4000
              </p>
            </Field>
          )}

          {current.key === "budget" && (
            <>
              <ChoiceGroup
                name="budget"
                legend="Budget range"
                options={budgetRanges}
                value={data.budget}
                onChange={(v) => set("budget", v as Data["budget"])}
                error={errors.budget}
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
              <p className="mt-5 text-sm text-subtle">
                A range helps us suggest the right scope. It is not a commitment, and &quot;Not sure yet&quot; is fine.
              </p>
            </>
          )}

          {current.key === "timeline" && (
            <ChoiceGroup
              name="timeline"
              legend="Timeline"
              options={timelines}
              value={data.timeline}
              onChange={(v) => set("timeline", v as Data["timeline"])}
              error={errors.timeline}
              columns="sm:grid-cols-2"
            />
          )}

          {current.key === "contact" && (
            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField id={`${uid}-name`} label="Full name" name="fullName" autoComplete="name" value={data.fullName} onChange={(v) => set("fullName", v)} error={errors.fullName} />
                <TextField id={`${uid}-business`} label="Business name" name="businessName" autoComplete="organization" optional value={data.businessName ?? ""} onChange={(v) => set("businessName", v)} error={errors.businessName} />
                <TextField id={`${uid}-email`} label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(v) => set("email", v)} error={errors.email} />
                <TextField
                  id={`${uid}-whatsapp`}
                  label="WhatsApp number"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  optional
                  hint="With country code, e.g. +223 or +91."
                  value={data.whatsapp ?? ""}
                  onChange={(v) => set("whatsapp", v)}
                  error={errors.whatsapp}
                />
                <TextField id={`${uid}-country`} label="Country" name="country" autoComplete="country-name" value={data.country} onChange={(v) => set("country", v)} error={errors.country} />
              </div>

              {/* Honeypot: hidden from people and assistive technology */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${uid}-website`}>Leave this field empty</label>
                <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={data.website ?? ""} onChange={(e) => set("website", e.target.value)} />
              </div>

              <div className="grid gap-2">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={data.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                    className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
                  />
                  <span>
                    I agree that my details are used only to reply to this enquiry. They are sent by email and not stored on
                    this website. See the{" "}
                    <Link href="/privacy" className="text-fg underline underline-offset-4">
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p id={`${uid}-consent-error`} role="alert" className="text-sm text-danger">
                    {errors.consent}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {result.status === "error" && result.message && (
          <p role="alert" className="mt-8 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
            {result.message}
          </p>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={back} disabled={pending}>
              <ArrowLeft aria-hidden /> Back
            </Button>
          ) : (
            <span />
          )}
          {current.key === "contact" ? (
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send enquiry <ArrowRight aria-hidden />
                </>
              )}
            </Button>
          ) : (
            <Button type="submit" size="lg">
              Continue <ArrowRight aria-hidden />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns,
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: string;
}) {
  const errId = `${name}-error`;
  return (
    <fieldset aria-invalid={!!error} aria-describedby={error ? errId : undefined}>
      <legend className="sr-only">{legend}</legend>
      <div className={cn("grid gap-3", columns)}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                checked ? "border-accent bg-accent-soft text-fg" : "border-border-strong bg-bg text-muted hover:border-fg/30 hover:text-fg",
              )}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span
                aria-hidden
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                  checked ? "border-accent bg-accent" : "border-border-strong",
                )}
              >
                {checked && <span className="size-2 rounded-full bg-accent-fg" />}
              </span>
              <span className="font-medium">{o.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errId} role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
} & Omit<React.ComponentProps<"input">, "onChange" | "value" | "id">) {
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        required={!optional}
        {...rest}
      />
    </Field>
  );
}
