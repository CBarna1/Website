import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/admin-crud";

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await prisma.order.findMany({ include: { items: true, printOrder: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function PUT(request: Request) {
  const session = await requireSession("ADMIN");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = typeof body?.status === "string" ? body.status : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : undefined;
  const allowedStatuses = ["PENDING_PAYMENT", "PAYMENT_PROCESSING", "PAID", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED"];

  if (!id || !allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "A valid order and status are required." }, { status: 400 });
  }

  const order = await prisma.order.update({ where: { id }, data: { status: status as never, ...(notes !== undefined ? { notes } : {}) } });
  return NextResponse.json(order);
}

export async function DELETE(request: Request) {
  const session = await requireSession("ADMIN");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "A valid order is required." }, { status: 400 });

  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
