import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/lib/data";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <><PageHero title={product.name} breadcrumb="Products" /><section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><ProductDetail product={product} /><Link href="/products" className="mt-8 inline-flex text-sm font-semibold text-brand-600">Back to products</Link></div></section></>;
}