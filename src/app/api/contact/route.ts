import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipient = "amin.j@blackheroes.de";
const invalidInputMessage = "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
const deliveryErrorMessage =
  "Ihre Nachricht konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut.";
const emailPattern =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredField(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string" || value.length > maxLength) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readOptionalField(value: unknown, maxLength: number): string | null {
  if (value === undefined) return "";
  if (typeof value !== "string" || value.length > maxLength) return null;
  return value.trim();
}

function hasControlCharacters(value: string): boolean {
  return /[\u0000-\u001f\u007f]/.test(value);
}

function isValidEmail(value: string): boolean {
  const [localPart] = value.split("@");
  return (
    value.length <= 254 &&
    localPart.length <= 64 &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..") &&
    emailPattern.test(value)
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: invalidInputMessage }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: invalidInputMessage }, { status: 400 });
  }

  const name = readRequiredField(payload.name, 120);
  const company = readOptionalField(payload.company, 160);
  const email = readRequiredField(payload.email, 254);
  const phone = readOptionalField(payload.phone, 40);
  const service = readRequiredField(payload.service, 120);
  const message = readRequiredField(payload.message, 5000);
  const website = readOptionalField(payload.website, 200);

  if (
    !name ||
    company === null ||
    !email ||
    phone === null ||
    !service ||
    !message ||
    website === null ||
    website !== "" ||
    [name, company, phone, service].some(hasControlCharacters) ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message) ||
    !isValidEmail(email)
  ) {
    return NextResponse.json({ error: invalidInputMessage }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secureValue = process.env.SMTP_SECURE;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    (secureValue !== "true" && secureValue !== "false") ||
    !user ||
    !password
  ) {
    console.error("Contact form SMTP configuration is incomplete or invalid.");
    return NextResponse.json({ error: deliveryErrorMessage }, { status: 500 });
  }

  const secure = secureValue === "true";
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from: { name: "Black Heroes", address: user },
      to: recipient,
      replyTo: email,
      subject: "Neue Kontaktanfrage – Black Heroes",
      text: [
        "Neue Kontaktanfrage über die Black Heroes Website",
        "",
        `Name: ${name}`,
        `Unternehmen: ${company || "Nicht angegeben"}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone || "Nicht angegeben"}`,
        `Gewünschte Leistung: ${service}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ message: "Ihre Nachricht wurde erfolgreich gesendet." });
  } catch (error) {
    const smtpError = isRecord(error) ? error : {};
    console.error("Contact form email delivery failed.", {
      code: typeof smtpError.code === "string" ? smtpError.code : undefined,
      responseCode: typeof smtpError.responseCode === "number" ? smtpError.responseCode : undefined,
    });
    return NextResponse.json({ error: deliveryErrorMessage }, { status: 502 });
  }
}
