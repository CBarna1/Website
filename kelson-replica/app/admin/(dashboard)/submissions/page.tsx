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
      <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
      <p className="mt-1 text-sm text-slate-500">Messages received via the contact form.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-400">No submissions yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.subject}</p>
                  <p className="text-xs text-slate-500">
                    {item.name} - {item.email} - {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-700">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
