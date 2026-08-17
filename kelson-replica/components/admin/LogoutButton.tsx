"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
    >
      <LogOut className="h-3.5 w-3.5" /> Sign out
    </button>
  );
}
