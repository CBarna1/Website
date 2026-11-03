"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import HeaderCapsule from "@/components/HeaderCapsule";
import ThemeToggle from "@/components/ThemeToggle";
import { nav, companyName, companyMark } from "@/lib/data";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

// Floats over the top of the page, hidden until the visitor scrolls (see HeaderCapsule). The
// layout keeps --header-space free for it, and the page heroes pull up underneath it.
export default function Navbar({ phonePrimary }: { phonePrimary: string }) {
  const pathname = usePathname();
  // The page the phone menu was opened on: moving to another page closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const { count } = useCart();
  const tel = `tel:${phonePrimary.replace(/\s/g, "")}`;
  const cartLabel = `Cart${count ? `, ${count} items` : ""}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      {/* Without JavaScript nothing would reveal the hidden bar, so keep it shown. */}
      <noscript>
        <style>{"[data-header-capsule]{opacity:1!important;transform:none!important;pointer-events:auto!important}"}</style>
      </noscript>
      <HeaderCapsule forceVisible={open}>
        <Link href="/" aria-label={`${companyName} home`} className={`flex h-10 shrink-0 items-center rounded-full ${focusRing}`}>
          <Image src={companyMark} alt="" width={149} height={149} className="h-9 w-9 lg:h-10 lg:w-10" priority />
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-bold transition-colors duration-200 ${focusRing} ${
                  active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-800 hover:bg-brand-600/10 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-brand-400/15 dark:hover:text-brand-300"
                }`}
              >
                {item.short}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <a
            href={tel}
            aria-label={`Call ${phonePrimary}`}
            title={phonePrimary}
            className={`hidden h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-brand-600/10 hover:text-brand-600 xl:flex dark:text-slate-200 dark:hover:text-brand-300 ${focusRing}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            href="/cart"
            aria-label={cartLabel}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-brand-600/10 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-300 ${focusRing}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <Link
            href="/contact"
            className={`ml-1 hidden h-10 items-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:inline-flex ${focusRing}`}
          >
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-brand-600/10 lg:hidden dark:text-slate-200 ${focusRing}`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </HeaderCapsule>

      {open && (
        <div className="pointer-events-auto fixed inset-0 z-50 lg:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col gap-6 overflow-y-auto bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-brand-700 dark:text-brand-300">{companyName}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Consider It Solved</p>
              </div>
              <button
                type="button"
                aria-label="Close navigation menu"
                autoFocus
                onClick={() => setOpen(false)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 ${focusRing}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul className="grid gap-1">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-11 w-full items-center rounded-lg px-3 font-bold transition ${focusRing} ${
                          active
                            ? "bg-brand-600 text-white"
                            : "text-slate-800 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto grid gap-3">
              <a
                href={tel}
                className={`flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 ${focusRing}`}
              >
                <Phone className="h-4 w-4" />
                {phonePrimary}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`rounded-full bg-brand-600 px-5 py-2.5 text-center font-semibold text-white transition hover:bg-brand-700 ${focusRing}`}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
