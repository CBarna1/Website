"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  options?: string[];
};

type Item = Record<string, unknown>;

export default function ResourceManager({
  apiPath,
  fields,
  displayField,
}: {
  apiPath: string;
  fields: Field[];
  displayField: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  async function fetchItems() {
    setLoading(true);
    const res = await fetch(apiPath);
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPath]);

  function openCreate() {
    const defaults: Record<string, string> = {};
    fields.forEach((f) => {
      defaults[f.key] = f.type === "select" ? f.options?.[0] ?? "" : "";
    });
    setFormData(defaults);
    setCreating(true);
    setEditingId(null);
  }

  function openEdit(item: Item) {
    const values: Record<string, string> = {};
    fields.forEach((f) => {
      values[f.key] = String(item[f.key] ?? "");
    });
    setFormData(values);
    setEditingId(String(item.id));
    setCreating(false);
  }

  function closeForm() {
    setCreating(false);
    setEditingId(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const payload: Record<string, unknown> = { ...formData };
    fields.forEach((f) => {
      if (f.type === "number") payload[f.key] = Number(formData[f.key] || 0);
    });

    const url = editingId ? `${apiPath}/${editingId}` : apiPath;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
      return;
    }

    closeForm();
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  }

  const showForm = creating || editingId !== null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-brand-300">{items.length} item{items.length === 1 ? "" : "s"}</p>
        {!showForm && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Add new
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-xl border border-slate-200 dark:border-brand-800 bg-slate-50 dark:bg-brand-800 p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-brand-100">
              {editingId ? "Edit item" : "New item"}
            </h3>
            <button type="button" onClick={closeForm} className="text-slate-400 dark:text-brand-400 hover:text-slate-600 dark:hover:text-brand-200">
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-brand-300">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    required
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-brand-700 bg-white dark:bg-brand-900 px-3 py-2 text-sm text-slate-900 dark:text-brand-100 focus:border-brand-500 focus:outline-none"
                  />
                ) : f.type === "select" ? (
                  <select
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-brand-700 bg-white dark:bg-brand-900 px-3 py-2 text-sm text-slate-900 dark:text-brand-100 focus:border-brand-500 focus:outline-none"
                  >
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    required
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-brand-700 bg-white dark:bg-brand-900 px-3 py-2 text-sm text-slate-900 dark:text-brand-100 focus:border-brand-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {editingId ? "Save changes" : "Create"}
          </button>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-brand-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 dark:bg-brand-800 text-xs uppercase text-slate-700 dark:text-brand-300">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-brand-800 bg-white dark:bg-brand-900">
            {loading ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-slate-500 dark:text-brand-400">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-slate-500 dark:text-brand-400">
                  No items yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={String(item.id)}>
                  <td className="px-4 py-3 text-slate-900 dark:text-brand-100">{String(item[displayField] ?? "")}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-1.5 text-slate-600 dark:text-brand-400 hover:bg-slate-100 dark:hover:bg-brand-800 hover:text-brand-600 dark:hover:text-brand-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(String(item.id))}
                        className="rounded-lg p-1.5 text-slate-600 dark:text-brand-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

