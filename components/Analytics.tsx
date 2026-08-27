"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (!endpoint) return;
    const payload = JSON.stringify({ event: "page_view", path: pathname, timestamp: new Date().toISOString() });
    navigator.sendBeacon?.(endpoint, new Blob([payload], { type: "application/json" }));
  }, [pathname]);

  return null;
}
