"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";

const printFileTypes = ".pdf,application/pdf";
const printPricePerPage = 10;

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const searchParams = useSearchParams();
  const isPrinting = searchParams.get("printing") === "1";
  const [fulfillment, setFulfillment] = useState("PICKUP");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingToken, setTrackingToken] = useState("");
  const [error, setError] = useState("");
  const [printFilePath, setPrintFilePath] = useState("");
  const [printPageCount, setPrintPageCount] = useState(0);
  const [pagesToPrint, setPagesToPrint] = useState(1);
  const [copies, setCopies] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  async function handlePrintFileChange(file: File | undefined) {
    setPrintFilePath("");
    setPrintPageCount(0);
    setPagesToPrint(1);
    if (!file) return;

    setIsUploading(true);
    setError("");
    const uploadData = new FormData();
    uploadData.append("file", file);
    const uploadResponse = await fetch("/api/uploads/prints", { method: "POST", body: uploadData });
    const uploadBody = await uploadResponse.json().catch(() => ({}));
    setIsUploading(false);
    if (!uploadResponse.ok) {
      setError(uploadBody.error ?? "We could not upload your document.");
      return;
    }
    setPrintFilePath(uploadBody.filePath);
    setPrintPageCount(uploadBody.pageCount);
    setPagesToPrint(uploadBody.pageCount);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    if (isPrinting) {
      if (isUploading) {
        setError("Please wait for the PDF page count to finish checking.");
        setStatus("error");
        return;
      }
      if (!printFilePath || !printPageCount) {
        setError("Please attach a valid PDF document.");
        setStatus("error");
        return;
      }
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.get("customerName"),
        customerEmail: form.get("customerEmail"),
        customerPhone: form.get("customerPhone"),
        fulfillment,
        deliveryAddress: form.get("deliveryAddress"),
        notes: form.get("notes"),
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        print: isPrinting
          ? {
              fileName: form.get("fileName"),
              filePath: printFilePath,
              pagesToPrint,
              paperSize: form.get("paperSize"),
              colorMode: form.get("colorMode"),
              copies,
              sides: form.get("sides"),
              finishing: form.get("finishing"),
              instructions: form.get("printInstructions"),
              approved: form.get("printApproved") === "on",
            }
          : undefined,
      }),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(body.error ?? "We could not create your order.");
      setStatus("error");
      return;
    }

    setOrderNumber(body.orderNumber);
    setTrackingToken(body.trackingToken);
    clear();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-800 dark:bg-brand-950/40">
        <h1 className="text-2xl font-bold text-brand-800 dark:text-brand-200">Order received</h1>
        <p className="mt-3 text-sm text-brand-700 dark:text-brand-300">
          Your order number is <strong>{orderNumber}</strong>. We will contact you with payment and fulfillment details.
        </p>
        <p className="mt-2 text-xs text-brand-700 dark:text-brand-300">Save this tracking token: <strong>{trackingToken}</strong></p>
        <Link href={`/track?token=${encodeURIComponent(trackingToken)}`} className="mt-4 inline-flex rounded-full border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-700 dark:border-brand-700 dark:text-brand-200">Track this order</Link>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Back to home</Link>
      </div>
    );
  }

  if (!isPrinting && items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <p>Your cart is empty.</p>
        <Link href="/products" className="mt-5 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Browse products</Link>
      </div>
    );
  }

  const fieldClass = "mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/50">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {isPrinting ? "Tell us how you want your document printed." : `Subtotal: K ${subtotal.toLocaleString()}`}
      </p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Full name<input required name="customerName" className={fieldClass} /></label>
        <label className="text-sm font-medium">Email<input required type="email" name="customerEmail" className={fieldClass} /></label>
        <label className="text-sm font-medium">Phone<input required name="customerPhone" className={fieldClass} /></label>
        <label className="text-sm font-medium">Fulfillment
          <select name="fulfillment" value={fulfillment} onChange={(event) => setFulfillment(event.target.value)} className={fieldClass}>
            <option value="PICKUP">Pickup at Woodlands Mall</option>
            <option value="DELIVERY">Delivery (+K 500)</option>
          </select>
        </label>
      </div>

      {fulfillment === "DELIVERY" && <label className="mt-4 block text-sm font-medium">Delivery address<textarea required name="deliveryAddress" rows={3} className={fieldClass} /></label>}

      {isPrinting && (
        <div className="checkout-print-specs mt-6 rounded-xl border border-brand-100 bg-brand-50/60 p-4 dark:border-brand-800 dark:bg-brand-950/30">
          <h2 className="font-semibold text-slate-900 dark:text-brand-100">Print specifications</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">Document name<input required name="fileName" className={fieldClass} /></label>
            <label className="text-sm sm:col-span-2">PDF document<input required name="printFile" type="file" accept={printFileTypes} onChange={(event) => handlePrintFileChange(event.target.files?.[0])} className={fieldClass} /><span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Your PDF will be checked for its page count before pricing.</span></label>
            <label className="text-sm">Pages to print<input required name="pagesToPrint" type="number" min="1" max={printPageCount || undefined} value={pagesToPrint} onChange={(event) => setPagesToPrint(Math.max(1, Number(event.target.value) || 1))} disabled={!printPageCount || isUploading} className={fieldClass} /></label>
            <label className="text-sm">Copies<input required name="copies" type="number" min="1" max="100" value={copies} onChange={(event) => setCopies(Math.max(1, Number(event.target.value) || 1))} className={fieldClass} /></label>
            <label className="text-sm">Paper size<select name="paperSize" className={fieldClass}><option>A4</option><option>A3</option><option>Letter</option></select></label>
            <label className="text-sm">Colour<select name="colorMode" className={fieldClass}><option>Black and white</option><option>Colour</option></select></label>
            <label className="text-sm">Sides<select name="sides" className={fieldClass}><option>Single-sided</option><option>Double-sided</option></select></label>
            <label className="text-sm">Finishing<select name="finishing" className={fieldClass}><option>None</option><option>Binding</option><option>Lamination</option></select></label>
          </div>
          <label className="mt-4 block text-sm">Instructions<textarea name="printInstructions" rows={3} className={fieldClass} /></label>
          <div className="mt-5 rounded-lg border border-brand-200 bg-white/50 p-4 dark:border-brand-700 dark:bg-slate-900/30">
            <p className="text-sm font-semibold text-slate-900 dark:text-brand-100">Print price approval</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{printPageCount ? `${pagesToPrint} page${pagesToPrint === 1 ? "" : "s"} × ${copies} cop${copies === 1 ? "y" : "ies"} × K ${printPricePerPage} = K ${(pagesToPrint * copies * printPricePerPage).toLocaleString()}` : "Upload a PDF to calculate your print price."}</p>
            <label className="mt-3 flex items-start gap-2 text-sm"><input required name="printApproved" type="checkbox" className="mt-1" disabled={!printPageCount || isUploading} /> I approve this printing price.</label>
          </div>
        </div>
      )}

      <label className="mt-4 block text-sm font-medium">Additional notes<textarea name="notes" rows={3} className={fieldClass} /></label>
      <button disabled={status === "submitting"} className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 font-semibold text-white disabled:opacity-60">
        {status === "submitting" ? "Creating order..." : "Place order"}
      </button>
    </form>
  );
}
