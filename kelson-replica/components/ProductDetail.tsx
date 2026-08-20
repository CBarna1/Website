"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function ProductDetail({ product }: { product: { id: string; name: string; description: string; price: number; category: string; stock: number; image: string } }) {
  const { addItem } = useCart();
  return <article className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[0.8fr_1fr] dark:border-slate-700 dark:bg-slate-900/50"><div className="relative min-h-64 overflow-hidden rounded-xl bg-brand-50 dark:bg-brand-950/50">{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" /> : <div className="flex h-full min-h-64 items-center justify-center text-6xl font-black text-brand-200">{product.name.slice(0, 1)}</div>}</div><div><p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{product.category}</p><h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{product.name}</h1><p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p><p className="mt-7 text-2xl font-bold text-slate-900 dark:text-white">K {product.price.toLocaleString()}</p><p className="mt-2 text-sm text-slate-500">{product.stock > 0 ? `${product.stock} available` : "Available by request"}</p><button onClick={() => addItem({ id: product.id, name: product.name, price: product.price })} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"><ShoppingCart className="h-4 w-4" /> Add to cart</button></div></article>;
}
