/**
 * Options for the project enquiry form. Edit the labels or ranges here;
 * the form and the server validation both read from this file.
 */
export const projectTypes = [
  { value: "website", label: "Website" },
  { value: "web-app", label: "Web application" },
  { value: "mobile-app", label: "Mobile application" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "custom-software", label: "Custom software" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "ai-automation", label: "AI & automation" },
  { value: "other", label: "Other" },
] as const;

export const budgetRanges = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1500", label: "$500 – $1,500" },
  { value: "1500-5000", label: "$1,500 – $5,000" },
  { value: "5000-10000", label: "$5,000 – $10,000" },
  { value: "over-10000", label: "Above $10,000" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within one month" },
  { value: "3-months", label: "Within three months" },
  { value: "flexible", label: "Flexible" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];
export type BudgetRange = (typeof budgetRanges)[number]["value"];
export type Timeline = (typeof timelines)[number]["value"];

export function labelFor<T extends { value: string; label: string }>(list: readonly T[], value: string) {
  return list.find((o) => o.value === value)?.label ?? value;
}
