import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: { name, email, subject, message },
  });

  try {
    await sendContactNotification({ name, email, subject, message });
  } catch (error) {
    console.error("Failed to send contact notification email", error);
    return NextResponse.json(
      { error: "Your message was saved, but we could not send the email notification. Please try again later." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
