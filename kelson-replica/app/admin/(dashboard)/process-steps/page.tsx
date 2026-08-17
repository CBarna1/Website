
import ResourceManager from "@/components/admin/ResourceManager";

export default function ProcessStepsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Process Steps</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the process steps shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/process-steps"
          displayField="title"
          fields={[
    { key: "step", label: "Step Number", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
