"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminThemeProvider from "@/components/admin/AdminThemeProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <AdminThemeProvider>
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-transparent px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/70 bg-white/45 p-8 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 dark:border-brand-300/20 dark:bg-brand-950/45">
        <div className="flex justify-center">
          <Image src="/logo-m.png" alt="Kelson Innovations" width={160} height={48} className="h-10 w-auto" />
        </div>
        <h1 className="mt-6 text-center text-lg font-semibold text-slate-900 dark:text-brand-100">Admin Sign In</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-brand-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-lg border border-white/70 bg-white/35 px-3 py-2 text-sm text-slate-900 backdrop-blur-md focus:border-brand-500 focus:outline-none dark:border-brand-300/25 dark:bg-brand-950/30 dark:text-brand-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-brand-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1.5 w-full rounded-lg border border-white/70 bg-white/35 px-3 py-2 text-sm text-slate-900 backdrop-blur-md focus:border-brand-500 focus:outline-none dark:border-brand-300/25 dark:bg-brand-950/30 dark:text-brand-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          </form>
        </div>
      </div>
    </AdminThemeProvider>
  );
}
