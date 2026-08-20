"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Subscriber = { id: string; email: string; createdAt: string };

export default function NewsletterPage() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/newsletter");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Newsletter Subscribers</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Emails collected from the footer newsletter form.</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-brand-800 bg-white dark:bg-brand-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 dark:bg-brand-800 text-xs uppercase text-slate-700 dark:text-brand-300">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-brand-800">
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500 dark:text-brand-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500 dark:text-brand-400">No subscribers yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-slate-900 dark:text-brand-100">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-brand-300">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-slate-600 dark:text-brand-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
