"use client";

import { useEffect, useState } from "react";

type Order = { id: string; orderNumber: string; customerName: string; customerEmail: string; customerPhone: string; fulfillment: string; total: number; status: string; notes: string; createdAt: string; items: { name: string; quantity: number }[]; printOrder?: { fileName: string } | null };

const statuses = ["PENDING_PAYMENT", "PAYMENT_PROCESSING", "PAID", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED"];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/orders")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Could not load orders.");
        if (active) setOrders(data);
      })
      .catch((loadError) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Could not load orders.");
      });
    return () => { active = false; };
  }, []);

  async function updateOrder(order: Order, form: HTMLFormElement) {
    setSavingId(order.id);
    setError("");
    const formData = new FormData(form);
    const response = await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: order.id, status: formData.get("status"), notes: formData.get("notes") }) });
    const data = await response.json();
    if (!response.ok) setError(data.error ?? "Could not update order.");
    else setOrders((current) => current.map((item) => item.id === order.id ? { ...item, ...data } : item));
    setSavingId("");
  }

  async function deleteOrder(order: Order) {
    if (!window.confirm(`Delete order ${order.orderNumber}?`)) return;
    setSavingId(order.id);
    const response = await fetch("/api/admin/orders", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: order.id }) });
    if (response.ok) setOrders((current) => current.filter((item) => item.id !== order.id));
    else setError("Could not delete order.");
    setSavingId("");
  }

  return <div><h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Orders</h1><p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Manage payment, processing, pickup, delivery, and completion status.</p>{error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-brand-800"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase dark:bg-brand-800"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Items</th><th className="px-4 py-3">Fulfillment</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Manage</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-brand-800">{orders.map((order) => <tr key={order.id} className="align-top"><td className="px-4 py-3 font-semibold">{order.orderNumber}<div className="text-xs font-normal text-slate-500">{new Date(order.createdAt).toLocaleString()}</div></td><td className="px-4 py-3">{order.customerName}<div className="text-xs text-slate-500">{order.customerPhone}</div><div className="text-xs text-slate-500">{order.customerEmail}</div></td><td className="px-4 py-3">{order.printOrder ? `Print: ${order.printOrder.fileName}` : order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</td><td className="px-4 py-3">{order.fulfillment}</td><td className="px-4 py-3">K {order.total.toLocaleString()}</td><td className="min-w-64 px-4 py-3"><form onSubmit={(event) => { event.preventDefault(); updateOrder(order, event.currentTarget); }} className="space-y-2"><select name="status" defaultValue={order.status} className="block w-full rounded-lg border border-slate-300 bg-white p-2 text-xs dark:border-slate-600 dark:bg-slate-800"><option value="" disabled>Select status</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select><textarea name="notes" defaultValue={order.notes} rows={2} placeholder="Internal order notes" className="block w-full rounded-lg border border-slate-300 bg-white p-2 text-xs dark:border-slate-600 dark:bg-slate-800" /><div className="flex gap-2"><button disabled={savingId === order.id} className="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">Save</button><button type="button" disabled={savingId === order.id} onClick={() => deleteOrder(order)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 dark:border-red-800 dark:text-red-300">Delete</button></div></form></td></tr>)}</tbody></table>{orders.length === 0 && <p className="p-6 text-center text-slate-500">No orders yet.</p>}</div></div>;
}
