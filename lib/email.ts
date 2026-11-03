import nodemailer from "nodemailer";

const recipients = (process.env.SMTP_TO || "info@kelson.co.zm")
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) {
    throw new Error("SMTP email settings are not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass: password },
  });
}

/**
 * Sends a support ticket to the help desk inbox (SUPPORT_TO). The help desk
 * creates the ticket for the Reply-To address, so the customer, not our
 * mailbox, is the ticket's sender and receives its replies.
 */
export async function sendSupportTicket({
  name,
  email,
  phone,
  company,
  categoryLabel,
  urgencyLabel,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
  categoryLabel: string;
  urgencyLabel: string;
  subject: string;
  message: string;
}) {
  const to = (process.env.SUPPORT_TO || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!to.length) {
    throw new Error("SUPPORT_TO is not configured.");
  }

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    replyTo: { name, address: email },
    subject,
    // The customer's message comes first: the help desk reads the start of
    // the body for priority keywords.
    text: [
      message,
      "",
      "Submitted through the support form on kelson.co.zm",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "not given"}`,
      `Company: ${company || "not given"}`,
      `Category: ${categoryLabel}`,
      `Urgency: ${urgencyLabel}`,
    ].join("\n"),
  });
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await getTransporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: recipients,
    replyTo: email,
    subject: `Contact form: ${subject}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Subject: ${subject}`, "", message].join("\n"),
  });
}
