
import ResourceManager from "@/components/admin/ResourceManager";

export default function ClientLogosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Client Logos</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the client logos shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/clients"
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
