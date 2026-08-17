
import ResourceManager from "@/components/admin/ResourceManager";

export default function StatsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Stats</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the stats shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/stats"
          displayField="label"
          fields={[
    { key: "value", label: "Value", type: "number" },
    { key: "suffix", label: "Suffix", type: "text" },
    { key: "label", label: "Label", type: "text" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
