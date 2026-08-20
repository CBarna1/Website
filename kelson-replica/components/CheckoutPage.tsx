"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const searchParams = useSearchParams();
  const isPrinting = searchParams.get("printing") === "1";
  const [fulfillment, setFulfillment] = useState("PICKUP");
  const [status, setStatus] = useState("idle");
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.get("customerName"), customerEmail: form.get("customerEmail"), customerPhone: form.get("customerPhone"),
        fulfillment, deliveryAddress: form.get("deliveryAddress"), notes: form.get("notes"),
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        print: isPrinting ? { fileName: form.get("fileName"), paperSize: form.get("paperSize"), colorMode: form.get("colorMode"), copies: Number(form.get("copies") || 1), sides: form.get("sides"), finishing: form.get("finishing"), instructions: form.get("printInstructions") } : undefined,
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) { setError(body.error ?? "We could not create your order."); setStatus("error"); return; }
    setOrderNumber(body.orderNumber); clear(); setStatus("success");
  }

  if (status === "success") return <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-800 dark:bg-brand-950/40"><h1 className="text-2xl font-bold text-brand-800 dark:text-brand-200">Order received</h1><p className="mt-3 text-sm text-brand-700 dark:text-brand-300">Your order number is <strong>{orderNumber}</strong>. We will contact you with payment and fulfillment details.</p><Link href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Back to home</Link></div>;
  if (!isPrinting && items.length === 0) return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900/50"><p>Your cart is empty.</p><Link href="/products" className="mt-5 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Browse products</Link></div>;

  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/50"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Checkout</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{isPrinting ? "Tell us how you want your document printed." : `Subtotal: K ${subtotal.toLocaleString()}`}</p>{error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name<input required name="customerName" className="mt-1 block w-full rounded-lg border p-2.5" /></label><label className="text-sm font-medium">Email<input required type="email" name="customerEmail" className="mt-1 block w-full rounded-lg border p-2.5" /></label><label className="text-sm font-medium">Phone<input required name="customerPhone" className="mt-1 block w-full rounded-lg border p-2.5" /></label><label className="text-sm font-medium">Fulfillment<select name="fulfillment" value={fulfillment} onChange={(event) => setFulfillment(event.target.value)} className="mt-1 block w-full rounded-lg border p-2.5"><option value="PICKUP">Pickup at Woodlands Mall</option><option value="DELIVERY">Delivery (+K 500)</option></select></label></div>{fulfillment === "DELIVERY" && <label className="mt-4 block text-sm font-medium">Delivery address<textarea required name="deliveryAddress" rows={3} className="mt-1 block w-full rounded-lg border p-2.5" /></label>}{isPrinting && <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/60 p-4 dark:border-brand-800 dark:bg-brand-950/30"><h2 className="font-semibold">Print specifications</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm">Document name<input required name="fileName" className="mt-1 block w-full rounded-lg border p-2.5" /></label><label className="text-sm">Copies<input required name="copies" type="number" min="1" defaultValue="1" className="mt-1 block w-full rounded-lg border p-2.5" /></label><label className="text-sm">Paper size<select name="paperSize" className="mt-1 block w-full rounded-lg border p-2.5"><option>A4</option><option>A3</option><option>Letter</option></select></label><label className="text-sm">Colour<select name="colorMode" className="mt-1 block w-full rounded-lg border p-2.5"><option>Black and white</option><option>Colour</option></select></label><label className="text-sm">Sides<select name="sides" className="mt-1 block w-full rounded-lg border p-2.5"><option>Single-sided</option><option>Double-sided</option></select></label><label className="text-sm">Finishing<select name="finishing" className="mt-1 block w-full rounded-lg border p-2.5"><option>None</option><option>Binding</option><option>Lamination</option></select></label></div><label className="mt-4 block text-sm">Instructions<textarea name="printInstructions" rows={3} className="mt-1 block w-full rounded-lg border p-2.5" /></label></div>}<label className="mt-4 block text-sm font-medium">Additional notes<textarea name="notes" rows={3} className="mt-1 block w-full rounded-lg border p-2.5" /></label><button disabled={status === "submitting"} className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 font-semibold text-white disabled:opacity-60">{status === "submitting" ? "Creating order..." : "Place order"}</button></form>;
}
