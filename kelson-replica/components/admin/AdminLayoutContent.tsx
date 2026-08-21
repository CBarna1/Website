"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Box,
  Briefcase,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Star,
  ClipboardList,
  Users as UsersIcon,
  Zap,
} from "lucide-react";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import LogoutButton from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/audit-logs", label: "Activity Logs", icon: ClipboardList },
  { href: "/admin/submissions", label: "Contact Submissions", icon: MessageSquare },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/why-choose-us", label: "Why Choose Us", icon: Star },
  { href: "/admin/process-steps", label: "Process Steps", icon: Zap },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageCircle },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/clients", label: "Client Logos", icon: UsersIcon },
  { href: "/admin/brands", label: "Brands We Stock", icon: Package },
];

function LeaveAdminLink() {
  const router = useRouter();

  async function leaveAdmin() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={leaveAdmin} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:text-brand-200 dark:hover:bg-brand-800 dark:hover:text-white">
      <Box className="h-4 w-4 shrink-0" />
      View public site
    </button>
  );
}

export default function AdminLayoutContent({
  session,
  children,
}: {
  session: {
    name: string;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}) {
  const { isDark } = useAdminTheme();

  const sidebarClass = isDark
    ? "border-brand-700/60 bg-transparent text-brand-100"
    : "border-white/70 bg-transparent text-slate-900";

  const panelClass = isDark
    ? "border-brand-700/60 bg-transparent text-brand-100"
    : "border-white/70 bg-transparent text-slate-900";

  const navClass = isDark
    ? "text-brand-200 hover:bg-brand-800 hover:text-white"
    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900";

  const mainClass = isDark
    ? "bg-transparent text-brand-50"
    : "bg-transparent text-slate-900";

  return (
    <div className="relative flex h-screen overflow-hidden bg-transparent text-slate-900 dark:text-brand-50">
      <aside
        className={`hidden w-64 shrink-0 border-r shadow-[inset_-1px_0_0_rgba(15,23,42,0.06)] lg:flex lg:flex-col relative z-10 overflow-y-auto ${sidebarClass}`}
      >
        <div className={`border-b px-6 py-5 shrink-0 ${isDark ? "border-brand-800" : "border-slate-200"}`}>
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
            <Image
              src="/logo-title.png"
              alt="Kelson Innovations"
              width={48}
              height={48}
              className="h-10 w-10 object-contain drop-shadow-sm"
              priority
            />
            <span className={`text-lg font-bold ${isDark ? "text-brand-100" : "text-slate-900"}`}>Kelson Admin</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 text-sm overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition ${navClass}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}

          {session.role === "ADMIN" && (
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition ${navClass}`}
            >
              <UsersIcon className="h-4 w-4 shrink-0" />
              Staff Users
            </Link>
          )}
          <LeaveAdminLink />
        </nav>

        <div className={`border-t px-4 py-4 shrink-0 space-y-3 ${panelClass}`}>
          <div>
            <p className={`text-sm font-medium ${isDark ? "text-brand-100" : "text-slate-900"}`}>{session.name}</p>
            <p className={`text-xs ${isDark ? "text-brand-300" : "text-slate-600"}`}>{session.email} - {session.role}</p>
          </div>
          <div className="flex gap-2">
            <AdminThemeToggle />
            <div className="flex-1">
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>

      <main className={`relative z-10 flex-1 overflow-y-auto px-4 py-8 sm:px-8 ${mainClass}`}>{children}</main>
    </div>
  );
}
