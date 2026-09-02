import { sendContactNotification } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiry, interest } = body;

    if (!name || !email || !inquiry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to sales team
    await sendContactNotification({
      name,
      email,
      subject: `Chatbot Lead: ${interest || "General Inquiry"}`,
      message: `
Phone: ${phone || "Not provided"}

Interest: ${interest || "Not specified"}

Message:
${inquiry}

---
This is a lead generated from the website chatbot.
      `.trim(),
    });

    return NextResponse.json(
      { success: true, message: "Your inquiry has been sent to our sales team" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chatbot lead error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
