// Support ticket options shared by the form and the API route.
//
// Tickets are emailed to the FreeScout help desk inbox. The subject carries
// the category and urgency so the help desk can act on them:
//   - "[POS]" etc. must match a skill name in FreeScout's Skill Routing, which
//     then assigns the ticket to an agent with that skill;
//   - "URGENT:" / "High priority:" / "Low priority:" are keywords that the
//     PriorityAutoReply module turns into the ticket priority.

export const SUPPORT_CATEGORIES = [
  { value: "POS", label: "POS / Point of Sale", tag: "[POS]" },
  { value: "Networking", label: "Networking / Internet / Wi-Fi", tag: "[Networking]" },
  { value: "Software", label: "Software / Applications", tag: "[Software]" },
  { value: "IT", label: "Computers, printers & IT equipment", tag: "[IT]" },
  { value: "Accounts", label: "Accounts / Invoices / Payments", tag: "[Accounts]" },
  { value: "Other", label: "Other / Not sure", tag: "" },
] as const;

export const SUPPORT_URGENCIES = [
  { value: "critical", label: "Critical – system down, we can't trade", prefix: "URGENT: " },
  { value: "high", label: "High – seriously affecting our work", prefix: "High priority: " },
  { value: "normal", label: "Normal", prefix: "" },
  { value: "low", label: "Low – no rush", prefix: "Low priority: " },
] as const;

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number]["value"];
export type SupportUrgency = (typeof SUPPORT_URGENCIES)[number]["value"];

export function findCategory(value: string) {
  return SUPPORT_CATEGORIES.find((category) => category.value === value);
}

export function findUrgency(value: string) {
  return SUPPORT_URGENCIES.find((urgency) => urgency.value === value);
}

/** "[POS] URGENT: Till not printing receipts" */
export function ticketSubject(category: SupportCategory, urgency: SupportUrgency, subject: string) {
  const tag = findCategory(category)?.tag ?? "";
  const prefix = findUrgency(urgency)?.prefix ?? "";
  return `${tag ? `${tag} ` : ""}${prefix}${subject}`;
}
