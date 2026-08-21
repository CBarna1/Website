import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getPdfPageCount } from "@/lib/pdf";

function makeOrderNumber() {
  return `KI-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function makeTrackingToken() {
  return crypto.randomUUID();
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
    const productSubtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const deliveryFee = fulfillment === "DELIVERY" ? 500 : 0;
    const print = body.print;
    let printPageCount = 0;
    let pagesToPrint = 0;
    let copies = 1;
    let printCost = 0;
    if (print && !/^print-orders\/[a-f0-9-]+\.pdf$/.test(String(print.filePath ?? ""))) {
      return NextResponse.json({ error: "A valid print document is required." }, { status: 400 });
    }
    if (print) {
      if (print.approved !== true) return NextResponse.json({ error: "Please approve the printing price before placing the order." }, { status: 400 });
      const documentPath = path.resolve(process.cwd(), "storage", String(print.filePath));
      const storageRoot = path.resolve(process.cwd(), "storage");
      if (!documentPath.startsWith(`${storageRoot}${path.sep}`)) return NextResponse.json({ error: "Invalid print document path." }, { status: 400 });
      try {
        printPageCount = await getPdfPageCount(new Uint8Array(await readFile(documentPath)));
      } catch {
        return NextResponse.json({ error: "The uploaded PDF could not be read." }, { status: 400 });
      }
      pagesToPrint = Number(print.pagesToPrint);
      copies = Number(print.copies || 1);
      if (!Number.isInteger(pagesToPrint) || pagesToPrint < 1 || pagesToPrint > printPageCount) {
        return NextResponse.json({ error: `Choose between 1 and ${printPageCount} pages to print.` }, { status: 400 });
      }
      if (!Number.isInteger(copies) || copies < 1 || copies > 100) return NextResponse.json({ error: "Copies must be between 1 and 100." }, { status: 400 });
      printCost = pagesToPrint * copies * 10;
    }
    const subtotal = productSubtotal + printCost;
    const order = await prisma.order.create({
      data: {
        orderNumber: makeOrderNumber(), trackingToken: makeTrackingToken(), customerName, customerEmail, customerPhone, fulfillment,
        deliveryAddress: String(body.deliveryAddress ?? ""), deliveryFee, subtotal, total: subtotal + deliveryFee, notes: String(body.notes ?? ""),
        items: { create: items },
        ...(print ? { printOrder: { create: { fileName: String(print.fileName ?? ""), filePath: String(print.filePath), pageCount: printPageCount, pagesToPrint, printCost, paperSize: String(print.paperSize ?? "A4"), colorMode: String(print.colorMode ?? "Black and white"), copies, sides: String(print.sides ?? "Single-sided"), paperType: "Standard", finishing: String(print.finishing ?? "None"), instructions: String(print.instructions ?? "") } } } : {}),
      },
    });
    return NextResponse.json({ orderNumber: order.orderNumber, trackingToken: order.trackingToken, total: order.total }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create the order right now." }, { status: 500 });
  }
}
