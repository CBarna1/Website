"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = { id: string; name: string; slug: string; description: string; price: number; category: string; stock: number; image: string };

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const visible = products.filter((product) => {
    const matchesQuery = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesAvailability = availability === "All" || (availability === "In stock" ? product.stock > 0 : product.stock === 0);
    return matchesQuery && matchesCategory && matchesAvailability;
  });

  return <><div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white" /><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white">{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={availability} onChange={(event) => setAvailability(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"><option>All</option><option>In stock</option><option>Out of stock</option></select></div><p className="mt-4 text-sm text-slate-500">Showing {visible.length} of {products.length} products</p><div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product, index) => <ProductCard key={product.id} product={product} styleDelay={`${index * 180}ms`} />)}</div>{visible.length === 0 && <p className="mt-8 rounded-xl border border-dashed p-8 text-center text-slate-500">No products match your filters.</p>}</>;
}
