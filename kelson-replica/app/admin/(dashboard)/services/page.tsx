import { iconNames } from "@/lib/icons";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Services</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Manage the services offered, displayed on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/services"
          displayField="title"
          fields={[
    { key: "icon", label: "Icon", type: "select", options: iconNames },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
