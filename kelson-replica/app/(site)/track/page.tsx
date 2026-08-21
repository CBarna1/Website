"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [token, setToken] = useState("");
  const [order, setOrder] = useState<{ orderNumber: string; status: string; fulfillment: string; total: number; createdAt: string } | null>(null);
  const [error, setError] = useState("");

  async function track(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOrder(null);
    const response = await fetch(`/api/orders/track?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    if (!response.ok) setError(data.error ?? "Order not found.");
    else setOrder(data);
  }

  return <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6"><p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Order tracking</p><h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Track your Kelson order</h1><p className="mt-3 text-slate-600 dark:text-slate-300">Paste the tracking token from your order confirmation.</p><form onSubmit={track} className="mt-8 flex gap-3"><input required value={token} onChange={(event) => setToken(event.target.value)} placeholder="Tracking token" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white" /><button className="rounded-full bg-brand-600 px-5 py-2 font-semibold text-white">Track</button></form>{error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}{order && <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/50"><p className="text-sm text-slate-500">{order.orderNumber}</p><h2 className="mt-2 text-2xl font-bold text-brand-600">{order.status.replaceAll("_", " ")}</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{order.fulfillment} · K {order.total.toLocaleString()}</p><p className="mt-2 text-xs text-slate-500">Placed {new Date(order.createdAt).toLocaleString()}</p></div>}</main>;
}
