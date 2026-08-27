"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function ProductCard({ product, styleDelay }: { product: { id: string; name: string; slug: string; description: string; price: number; category: string; image: string }; styleDelay?: string }) {
  const { addItem } = useCart();
  return (
    <article className="site-card-float flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50" style={{ ["--card-delay" as string]: styleDelay }}>
      {product.image ? <div className="relative mb-5 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div> : null}
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{product.category}</span>
      <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{product.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-slate-900 dark:text-white">K {product.price.toLocaleString()}</span>
        <button type="button" onClick={() => addItem({ id: product.id, name: product.name, price: product.price })} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          <ShoppingCart className="h-4 w-4" /> Add
        </button>
      </div>
      <Link href={`/products/${product.slug}`} className="mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700">View details</Link>
    </article>
  );
}
