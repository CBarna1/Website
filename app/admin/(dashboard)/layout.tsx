import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminThemeProvider from "@/components/admin/AdminThemeProvider";
import AdminLayoutContent from "@/components/admin/AdminLayoutContent";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminThemeProvider>
      <AdminLayoutContent session={session}>{children}</AdminLayoutContent>
    </AdminThemeProvider>
  );
}
