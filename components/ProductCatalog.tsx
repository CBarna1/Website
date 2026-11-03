"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";

type Product = { id: string; name: string; slug: string; description: string; price: number; category: string; stock: number; image: string };

export default function ProductCatalog({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const visible = products.filter((product) => {
    const matchesQuery = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesAvailability = availability === "All" || (availability === "In stock" ? product.stock > 0 : product.stock === 0);
    return matchesQuery && matchesCategory && matchesAvailability;
  });
  const progress = products.length > 0 ? Math.min((visible.length / products.length) * 100, 100) : 0;

  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option>All</option>
          <option>In stock</option>
          <option>Out of stock</option>
        </select>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              category === item
                ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span>Results</span>
          <span>{visible.length} / {products.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">Showing {visible.length} of {products.length} products</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={product} styleDelay={`${index * 180}ms`} onQuickView={() => setSelectedProduct(product)} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No products match your filters.
        </p>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Quick view</span>
              <button type="button" onClick={() => setSelectedProduct(null)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Close preview">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-100">
                {selectedProduct.image ? (
                  <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                ) : null}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{selectedProduct.category}</span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{selectedProduct.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{selectedProduct.description}</p>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-300">Price</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">K {selectedProduct.price.toLocaleString()}</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      addItem({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price });
                      setSelectedProduct(null);
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Add to cart
                  </button>
                  <Link
                    href={`/products/${selectedProduct.slug}`}
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
