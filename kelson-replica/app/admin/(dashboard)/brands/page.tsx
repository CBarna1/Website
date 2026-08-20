
import ResourceManager from "@/components/admin/ResourceManager";

export default function BrandsWeStockPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Brands We Stock</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Manage the brands we stock shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/brands"
          displayField="name"
          fields={[
    { key: "name", label: "Name", type: "text" },
    { key: "src", label: "Image Path", type: "text" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
