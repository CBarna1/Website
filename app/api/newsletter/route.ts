import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  try {
    await prisma.newsletterSubscriber.create({ data: { email } });
  } catch {
    // Likely a duplicate email - treat as success so we do not leak subscriber existence.
  }

  return NextResponse.json({ ok: true });
}
