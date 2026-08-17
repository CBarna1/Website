
import ResourceManager from "@/components/admin/ResourceManager";

export default function WhyChooseUsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Why Choose Us</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the why choose us shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/why-choose-us"
          displayField="title"
          fields={[
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
