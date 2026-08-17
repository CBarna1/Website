import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/admin-crud";

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const {
    tagline, blurb, about, phonePrimary, phoneSecondary, address, hours,
  } = data;
  const settings = await prisma.siteSettings.update({
    where: { id: 1 },
    data: { tagline, blurb, about, phonePrimary, phoneSecondary, address, hours },
  });
  return NextResponse.json(settings);
}
