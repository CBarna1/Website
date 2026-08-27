import ProductManager from "@/components/admin/ProductManager";

export default function ProductsAdminPage() {
  return <div><h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Products</h1><p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Manage products and upload the photos shown in the online catalog.</p><div className="mt-6"><ProductManager /></div></div>;
}
