import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions", label: "Contact Submissions" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/why-choose-us", label: "Why Choose Us" },
  { href: "/admin/process-steps", label: "Process Steps" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/clients", label: "Client Logos" },
  { href: "/admin/brands", label: "Brands We Stock" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-200 px-6 py-5">
          <span className="text-lg font-bold text-brand-900">Kelson Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          {session.role === "ADMIN" && (
            <Link
              href="/admin/users"
              className="block rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            >
              Staff Users
            </Link>
          )}
        </nav>
        <div className="border-t border-slate-200 px-4 py-4">
          <p className="text-sm font-medium text-slate-800">{session.name}</p>
          <p className="text-xs text-slate-500">{session.email} - {session.role}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
