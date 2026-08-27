
import ResourceManager from "@/components/admin/ResourceManager";

export default function TestimonialsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Testimonials</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Client testimonials displayed on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/testimonials"
          displayField="name"
          fields={[
    { key: "name", label: "Name", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
