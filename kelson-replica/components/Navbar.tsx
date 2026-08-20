"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { nav, companyName, companyLogo } from "@/lib/data";

export default function Navbar({ phonePrimary }: { phonePrimary: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={companyLogo} alt={companyName} width={160} height={48} className="h-11 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex dark:text-slate-300">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`transition hover:text-brand-600 ${pathname === item.href ? "font-semibold text-brand-600" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phonePrimary.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            <Phone className="h-4 w-4 text-brand-600" />
            {phonePrimary}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Get a Quote
          </Link>
          <Link href="/cart" aria-label={`Cart${count ? `, ${count} items` : ""}`} className="relative p-2 text-slate-700 dark:text-slate-300">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">{count}</span>}
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Link href="/cart" aria-label={`Cart${count ? `, ${count} items` : ""}`} className="relative text-slate-700 dark:text-slate-300"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">{count}</span>}</Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="text-slate-700 dark:text-slate-300"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={pathname === item.href ? "font-semibold text-brand-600" : ""}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-600 px-5 py-2.5 text-center font-semibold text-white"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
