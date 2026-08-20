"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function SubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/submissions");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Contact Submissions</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Messages received via the contact form.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-slate-500 dark:text-brand-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-brand-400">No submissions yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 dark:border-brand-800 bg-white dark:bg-brand-800 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-brand-100">{item.subject}</p>
                  <p className="text-xs text-slate-600 dark:text-brand-300">
                    {item.name} - {item.email} - {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="shrink-0 rounded-lg p-1.5 text-slate-600 dark:text-brand-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-700 dark:text-brand-200">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
