"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";

type Product = { id: string; name: string; slug: string; description: string; price: number; image: string; category: string; stock: number; order: number };
type FormState = Omit<Product, "id">;
const emptyForm: FormState = { name: "", slug: "", description: "", price: 0, image: "", category: "Product", stock: 0, order: 0 };

export default function ProductManager() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() { setLoading(true); const response = await fetch("/api/admin/products"); if (response.ok) setItems(await response.json()); setLoading(false); }
  useEffect(() => { load(); }, []);
  function close() { setEditingId(null); setForm(emptyForm); setFile(null); setError(""); }
  function edit(product: Product) { setEditingId(product.id); setForm({ name: product.name, slug: product.slug, description: product.description, price: product.price, image: product.image, category: product.category, stock: product.stock, order: product.order }); setFile(null); }
  function update(key: keyof FormState, value: string | number) { setForm((current) => ({ ...current, [key]: value })); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const isCreating = editingId === "new";
    let image = form.image;
    if (file) {
      const upload = new FormData(); upload.set("file", file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: upload });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) { setError(body.error ?? "Image upload failed."); return; }
      image = body.src;
    }
    const response = await fetch(editingId && !isCreating ? `/api/admin/products/${editingId}` : "/api/admin/products", { method: editingId && !isCreating ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, image, price: Number(form.price), stock: Number(form.stock), order: Number(form.order) }) });
    if (!response.ok) { const body = await response.json().catch(() => ({})); setError(body.error ?? "Could not save product."); return; }
    close(); load();
  }
  async function remove(id: string) { if (!confirm("Delete this product?")) return; await fetch(`/api/admin/products/${id}`, { method: "DELETE" }); load(); }

  return <div><div className="flex items-center justify-between"><p className="text-sm text-slate-600 dark:text-brand-300">{items.length} product{items.length === 1 ? "" : "s"}</p>{!editingId && <button onClick={() => setEditingId("new")} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add product</button>}</div>
    {editingId && <form onSubmit={submit} className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-brand-800 dark:bg-brand-900"><div className="flex items-center justify-between"><h2 className="font-semibold">{editingId === "new" ? "New product" : "Edit product"}</h2><button type="button" onClick={close}><X className="h-4 w-4" /></button></div>{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm">Name<input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Slug<input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm sm:col-span-2">Description<textarea required rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Price (K)<input required type="number" min="0" value={form.price} onChange={(e) => update("price", Number(e.target.value))} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Category<input required value={form.category} onChange={(e) => update("category", e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Stock<input required type="number" min="0" value={form.stock} onChange={(e) => update("stock", Number(e.target.value))} className="mt-1 w-full rounded-lg border p-2" /></label><label className="text-sm">Display order<input required type="number" min="0" value={form.order} onChange={(e) => update("order", Number(e.target.value))} className="mt-1 w-full rounded-lg border p-2" /></label></div><div className="mt-4 flex flex-wrap items-center gap-4"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-brand-300 px-4 py-3 text-sm font-semibold text-brand-700"><Upload className="h-4 w-4" />{file ? file.name : "Upload product photo"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="sr-only" /></label>{form.image && !file && <img src={form.image} alt="Current product" className="h-16 w-24 rounded-lg object-cover" />}{file && <span className="text-xs text-slate-500">New photo selected</span>}</div><button className="mt-5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white">{editingId === "new" ? "Create product" : "Save changes"}</button></form>}
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-brand-800"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase dark:bg-brand-800"><tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-brand-800">{loading ? <tr><td colSpan={4} className="p-6 text-center">Loading...</td></tr> : items.map((item) => <tr key={item.id}><td className="flex items-center gap-3 px-4 py-3"><>{item.image ? <img src={item.image} alt="" className="h-10 w-12 rounded object-cover" /> : <span className="h-10 w-12 rounded bg-brand-50" />}</><span>{item.name}</span></td><td className="px-4 py-3">K {item.price.toLocaleString()}</td><td className="px-4 py-3">{item.stock}</td><td className="px-4 py-3 text-right"><button onClick={() => edit(item)} className="mr-2 p-2 text-slate-600"><Pencil className="h-4 w-4" /></button><button onClick={() => remove(item.id)} className="p-2 text-red-600"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>
  </div>;
}
