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
