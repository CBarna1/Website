import { NextResponse } from "next/server";
import { sendSupportTicket } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getClientKey, rateLimit } from "@/lib/rate-limit";
import { findCategory, findUrgency, ticketSubject } from "@/lib/support";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const limit = rateLimit(`support:${getClientKey(request)}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ error: "Too many tickets. Please try again later or call us." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  const body = await request.json().catch(() => null);
  const field = (key: string, max: number) => (typeof body?.[key] === "string" ? body[key].trim().slice(0, max) : "");
  const name = field("name", 100);
  const email = field("email", 200);
  const phone = field("phone", 40);
  const company = field("company", 120);
  const subject = field("subject", 150);
  const message = field("message", 5000);
  const category = findCategory(field("category", 40));
  const urgency = findUrgency(field("urgency", 20));

  // Honeypot: real visitors never see or fill this field.
  if (field("website", 200)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!name || !email || !subject || !message || !category || !urgency) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const fullSubject = ticketSubject(category.value, urgency.value, subject);

  // Kept with the contact submissions so it shows in the admin dashboard.
  const submission = await prisma.contactSubmission.create({
    data: {
      name,
      email,
      subject: `Support ticket: ${fullSubject}`,
      message: [message, "", `Phone: ${phone || "-"}`, `Company: ${company || "-"}`, `Category: ${category.label}`, `Urgency: ${urgency.label}`].join("\n"),
    },
  });

  try {
    await sendSupportTicket({
      name,
      email,
      phone,
      company,
      categoryLabel: category.label,
      urgencyLabel: urgency.label,
      subject: fullSubject,
      message,
    });
  } catch (error) {
    console.error("Failed to send support ticket email", error);
    return NextResponse.json(
      { error: "We could not log your ticket right now. Please try again shortly or call us." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
