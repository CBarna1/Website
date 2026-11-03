"use client";

import { useState, type FormEvent } from "react";
import { SUPPORT_CATEGORIES, SUPPORT_URGENCIES } from "@/lib/support";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300";

export default function SupportTicketForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setSubmittedEmail(String(data.email ?? ""));
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-800 dark:bg-brand-950/40"
      >
        <h3 className="text-lg font-semibold text-brand-800 dark:text-brand-200">Your ticket has been submitted</h3>
        <p className="mt-2 text-sm text-brand-700 dark:text-brand-300">
          You will receive an email at {submittedEmail || "your address"} within a few minutes with your ticket number.
          Reply to that email to add details or attachments.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand-700 underline underline-offset-2 dark:text-brand-300"
        >
          Submit another ticket
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
    >
      {status === "error" && (
        <div role="alert" aria-live="assertive" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="support-website">Website</label>
        <input id="support-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="support-name" className={labelClass}>
            Full name
          </label>
          <input id="support-name" name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="support-email" className={labelClass}>
            Email address
          </label>
          <input id="support-email" name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="support-phone" className={labelClass}>
            Phone <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input id="support-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="support-company" className={labelClass}>
            Company <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input id="support-company" name="company" type="text" maxLength={120} autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="support-category" className={labelClass}>
            What is the issue about?
          </label>
          <select id="support-category" name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose a category
            </option>
            {SUPPORT_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="support-urgency" className={labelClass}>
            How urgent is it?
          </label>
          <select id="support-urgency" name="urgency" required defaultValue="normal" className={inputClass}>
            {SUPPORT_URGENCIES.map((urgency) => (
              <option key={urgency.value} value={urgency.value}>
                {urgency.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="support-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="support-subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          placeholder="e.g. Till not printing receipts"
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="support-message" className={labelClass}>
          Describe the problem
        </label>
        <textarea
          id="support-message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="What is happening, since when, and which site or device is affected?"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
}
