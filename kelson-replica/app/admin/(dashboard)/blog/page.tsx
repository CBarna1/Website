
import ResourceManager from "@/components/admin/ResourceManager";

export default function BlogPostsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the blog posts shown on the public site.</p>
      <div className="mt-6">
        <ResourceManager
          apiPath="/api/admin/blog"
          displayField="title"
          fields={[
    { key: "title", label: "Title", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "image", label: "Image Path", type: "text" },
    { key: "order", label: "Order", type: "number" },
  ]}
        />
      </div>
    </div>
  );
}
