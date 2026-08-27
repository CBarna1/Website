import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, PackageCheck, ShoppingCart, Truck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const statusLabels = ["PENDING_PAYMENT", "PAYMENT_PROCESSING", "PAID", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED"];

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function dayLabel(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export default async function AdminDashboard() {
  const session = await getSession();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(startOfToday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const [orders, submissions, products, auditCount] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 100, select: { id: true, orderNumber: true, customerName: true, total: true, status: true, fulfillment: true, createdAt: true } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.product.count({ where: { active: true } }),
    prisma.auditLog.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
  ]);

  const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
  const todayOrders = orders.filter((order) => order.createdAt >= startOfToday);
  const statusCounts = statusLabels.map((status) => ({ status, count: orders.filter((order) => order.status === status).length }));
  const maxStatusCount = Math.max(1, ...statusCounts.map((item) => item.count));
  const dailyTotals = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + index);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const matching = orders.filter((order) => order.createdAt >= date && order.createdAt < nextDate);
    return { label: dayLabel(date), value: matching.reduce((sum, order) => sum + order.total, 0), count: matching.length };
  });
  const maxDailyValue = Math.max(1, ...dailyTotals.map((item) => item.value));
  const fulfillment = ["PICKUP", "DELIVERY"].map((type) => ({ type, count: orders.filter((order) => order.fulfillment === type).length }));
  const maxFulfillment = Math.max(1, ...fulfillment.map((item) => item.count));

  const metrics = [
    { label: "Order value", value: `K ${totalValue.toLocaleString()}`, detail: `${orders.length} recent orders`, icon: ShoppingCart, tone: "text-brand-600" },
    { label: "Orders today", value: todayOrders.length, detail: "New orders received", icon: Activity, tone: "text-accent-600" },
    { label: "Active products", value: products, detail: "Visible in catalog", icon: PackageCheck, tone: "text-amber-600" },
    { label: "New enquiries", value: submissions, detail: "Last seven days", icon: Clock3, tone: "text-rose-600" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Operations overview</p><h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-brand-100">Good morning, {session?.name ?? "admin"}</h1><p className="mt-1 text-sm text-slate-600 dark:text-brand-300">A live view of orders, fulfilment, and site activity.</p></div>
        <div className="text-left text-xs text-slate-500 sm:text-right"><p>Last 7 days</p><p className="mt-1 font-medium text-slate-700 dark:text-brand-200">{auditCount} admin actions recorded</p></div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => { const Icon = metric.icon; return <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-black/20"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-600 dark:text-slate-300">{metric.label}</p><Icon className={`h-5 w-5 ${metric.tone}`} /></div><p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{metric.detail}</p></div>; })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-black/20"><div className="flex items-start justify-between"><div><h2 className="font-semibold text-slate-900 dark:text-white">Order value</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Revenue across the last seven days</p></div><ArrowUpRight className="h-5 w-5 text-accent-500" /></div><div className="mt-8 flex h-48 items-end gap-3">{dailyTotals.map((day) => <div key={day.label} className="flex min-w-0 flex-1 flex-col items-center gap-2"><span className="text-[10px] text-slate-500 dark:text-slate-400">{day.value ? `K${day.value.toLocaleString()}` : "-"}</span><div className="flex h-32 w-full items-end"><div className="w-full rounded-t-md bg-brand-500 transition hover:bg-accent-500" style={{ height: `${Math.max(day.value ? 10 : 3, (day.value / maxDailyValue) * 100)}%` }} /></div><span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{day.label}</span></div>)}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-black/20"><h2 className="font-semibold text-slate-900 dark:text-white">Fulfilment split</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">How customers receive orders</p><div className="mt-8 space-y-6">{fulfillment.map((item) => <div key={item.type}><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700 dark:text-slate-200">{item.type === "PICKUP" ? "Pickup" : "Delivery"}</span><span className="text-slate-500 dark:text-slate-400">{item.count}</span></div><div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-accent-500" style={{ width: `${(item.count / maxFulfillment) * 100}%` }} /></div></div>)}</div></div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-black/20"><h2 className="font-semibold text-slate-900 dark:text-white">Order pipeline</h2><div className="mt-5 space-y-3">{statusCounts.map((item) => <div key={item.status} className="flex items-center gap-3"><span className="w-32 truncate text-xs text-slate-600 dark:text-slate-300">{formatStatus(item.status)}</span><div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-brand-500" style={{ width: `${(item.count / maxStatusCount) * 100}%` }} /></div><span className="w-5 text-right text-xs font-semibold text-slate-700 dark:text-slate-200">{item.count}</span></div>)}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-black/20"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-slate-900 dark:text-white">Recent orders</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Latest customer activity</p></div><Truck className="h-5 w-5 text-brand-500" /></div><div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">{orders.slice(0, 5).map((order) => <div key={order.id} className="flex items-center justify-between gap-4 py-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{order.orderNumber}</p><p className="truncate text-xs text-slate-500 dark:text-slate-400">{order.customerName} · {order.status.replaceAll("_", " ")}</p></div><p className="shrink-0 text-sm font-semibold text-slate-800 dark:text-white">K {order.total.toLocaleString()}</p></div>)}{orders.length === 0 && <p className="py-6 text-sm text-slate-500">No orders yet.</p>}</div></div>
      </section>

      <section className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-brand-400"><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-600" />Dashboard is live</span><span className="inline-flex items-center gap-2"><ArrowDownRight className="h-4 w-4 text-brand-600" />Use Orders for detailed actions</span></section>
    </div>
  );
}
