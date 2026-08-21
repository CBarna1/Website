import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { requireSession } from "@/lib/admin-crud";
import { prisma } from "@/lib/prisma";

const storedPathPattern = /^print-orders\/[a-f0-9-]+\.pdf$/;

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireSession("ADMIN");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const order = await prisma.order.findUnique({ where: { id }, include: { printOrder: true } });
  if (!order?.printOrder) return NextResponse.json({ error: "Print document not found." }, { status: 404 });

  const storedPath = order.printOrder.filePath;
  if (!storedPathPattern.test(storedPath)) return NextResponse.json({ error: "Invalid stored document path." }, { status: 400 });

  const storageRoot = path.resolve(process.cwd(), "storage");
  const documentPath = path.resolve(storageRoot, storedPath);
  if (!documentPath.startsWith(`${storageRoot}${path.sep}`)) {
    return NextResponse.json({ error: "Invalid document path." }, { status: 400 });
  }

  try {
    const file = await readFile(documentPath);
    const requestedName = order.printOrder.fileName.replace(/[^a-zA-Z0-9._-]/g, "_") || `print-${order.orderNumber}`;
    const safeName = `${requestedName.replace(/\.pdf$/i, "")}.pdf`;
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "The document is unavailable." }, { status: 404 });
  }
}
