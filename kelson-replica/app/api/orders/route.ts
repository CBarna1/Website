import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function makeOrderNumber() {
  return `KI-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerName = String(body.customerName ?? "").trim();
    const customerEmail = String(body.customerEmail ?? "").trim();
    const customerPhone = String(body.customerPhone ?? "").trim();
    const fulfillment = body.fulfillment === "DELIVERY" ? "DELIVERY" : "PICKUP";
    if (!customerName || !customerEmail || !customerPhone) return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });

    const requestedItems = Array.isArray(body.items) ? body.items : [];
    const products = requestedItems.length ? await prisma.product.findMany({ where: { id: { in: requestedItems.map((item: { productId: string }) => String(item.productId)) }, active: true } }) : [];
    if (!products.length && !body.print) return NextResponse.json({ error: "Your order has no items." }, { status: 400 });

    const items = products.map((product) => {
      const requested = requestedItems.find((item: { productId: string }) => item.productId === product.id);
      const quantity = Math.max(1, Math.min(100, Number(requested?.quantity || 1)));
      return { productId: product.id, name: product.name, quantity, unitPrice: product.price };
    });
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const deliveryFee = fulfillment === "DELIVERY" ? 500 : 0;
    const print = body.print;
    const order = await prisma.order.create({
      data: {
        orderNumber: makeOrderNumber(), customerName, customerEmail, customerPhone, fulfillment,
        deliveryAddress: String(body.deliveryAddress ?? ""), deliveryFee, subtotal, total: subtotal + deliveryFee, notes: String(body.notes ?? ""),
        items: { create: items },
        ...(print ? { printOrder: { create: { fileName: String(print.fileName ?? ""), filePath: "", paperSize: String(print.paperSize ?? "A4"), colorMode: String(print.colorMode ?? "Black and white"), copies: Math.max(1, Number(print.copies || 1)), sides: String(print.sides ?? "Single-sided"), paperType: "Standard", finishing: String(print.finishing ?? "None"), instructions: String(print.instructions ?? "") } } } : {}),
      },
    });
    return NextResponse.json({ orderNumber: order.orderNumber, total: order.total }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create the order right now." }, { status: 500 });
  }
}
