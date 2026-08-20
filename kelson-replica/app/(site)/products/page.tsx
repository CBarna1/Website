import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import { getProducts } from "@/lib/data";
import Link from "next/link";

export const metadata = { title: "Products & Services | Kelson Innovations" };

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero title="Products & Services" breadcrumb="Products & Services" />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Shop with Kelson</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Business technology and support</h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => <ProductCard key={product.id} product={product} styleDelay={`${index * 180}ms`} />)}
          </div>

          <div className="mt-20 grid gap-10 border-t border-slate-200 pt-16 dark:border-slate-700 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Printing Services</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Print documents to your specification</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
                Upload your document, choose the finish, and our team will prepare a quote for your print job. Pickup or delivery can be selected during checkout.
              </p>
              <Link href="/checkout?printing=1" className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Start a print order
              </Link>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-7 dark:border-brand-800 dark:bg-brand-950/40">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Printing options</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>Paper size, colour, and double-sided printing</li>
                <li>Copies, binding, lamination, and finishing</li>
                <li>Pickup or delivery to your address</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}