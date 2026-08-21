import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim() ?? "";
  if (!token) return NextResponse.json({ error: "Tracking token is required." }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { trackingToken: token },
    select: { orderNumber: true, status: true, fulfillment: true, total: true, createdAt: true, updatedAt: true, items: { select: { name: true, quantity: true } }, printOrder: { select: { fileName: true, pagesToPrint: true, printCost: true } } },
  });
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json(order);
}
