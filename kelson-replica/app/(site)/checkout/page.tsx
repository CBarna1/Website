"use client";

import { Suspense } from "react";
import CheckoutPage from "@/components/CheckoutPage";

export default function CheckoutRoute() { return <Suspense fallback={<p className="p-8">Loading checkout...</p>}><CheckoutPage /></Suspense>; }