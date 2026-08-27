"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-4 text-sm font-medium text-accent-500">Thanks for subscribing!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="w-full min-w-0 rounded-full border border-brand-700 bg-brand-800 px-4 py-2 text-sm text-white placeholder:text-brand-300 focus:border-brand-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="shrink-0 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
      >
        {status === "submitting" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
