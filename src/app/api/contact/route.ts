import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipients: string[] = ["amin.j@blackheroes.de", "support@blackheroessecurity.de"];
const invalidInputMessage = "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
const deliveryErrorMessage =
  "Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.";
const maxRequestBytes = 16_384;
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;
const maxRateLimitEntries = 5_000;
const emailPattern =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i;
const allowedServices = new Set([
  "Objektschutz",
  "Veranstaltungsschutz",
  "Revierdienst",
  "Baustellenbewachung",
  "Empfangs- & Pfortendienst",
  "Individuelle Sicherheitslösungen",
  "Professioneller Personenschutz mit Verantwortung",
]);
const rateLimitEntries = new Map<string, { count: number; resetAt: number }>();

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

function isValidPhone(value: string): boolean {
  if (!value) return true;
  const digitCount = value.replace(/\D/g, "").length;
  return (
    digitCount >= 7 &&
    digitCount <= 15 &&
    /^(?:\+|00)?\d[\d\s()./-]*$/.test(value)
  );
}

function getClientIp(request: Request): string {
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("x-real-ip")?.trim() || forwardedIp || "unknown";
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  for (const [ip, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) rateLimitEntries.delete(ip);
  }

  const existing = rateLimitEntries.get(clientIp);

  if (existing) {
    if (existing.count >= rateLimitMaxRequests) return true;
    existing.count += 1;
    return false;
  }

  if (rateLimitEntries.size >= maxRateLimitEntries) return true;

  rateLimitEntries.set(clientIp, {
    count: 1,
    resetAt: now + rateLimitWindowMs,
  });
  return false;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return NextResponse.json({ error: invalidInputMessage }, { status: 413 });
  }

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
    !isValidEmail(email) ||
    !isValidPhone(phone) ||
    !allowedServices.has(service)
  ) {
    return NextResponse.json({ error: invalidInputMessage }, { status: 400 });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: deliveryErrorMessage },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rateLimitWindowMs / 1000)) },
      }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secureValue = process.env.SMTP_SECURE;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  const missingConfiguration = [
    !host && "SMTP_HOST",
    (!Number.isInteger(port) || port < 1 || port > 65535) && "SMTP_PORT",
    (secureValue !== "true" && secureValue !== "false") && "SMTP_SECURE",
    (!user || !isValidEmail(user)) && "SMTP_USER",
    !password && "SMTP_PASSWORD",
  ].filter((variable): variable is string => Boolean(variable));

  if (
    missingConfiguration.length > 0 ||
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    (secureValue !== "true" && secureValue !== "false") ||
    !user ||
    !isValidEmail(user) ||
    !password
  ) {
    console.error("Contact form SMTP configuration is incomplete or invalid.", {
      missingVariables: missingConfiguration,
    });
    return NextResponse.json({ error: deliveryErrorMessage }, { status: 503 });
  }

  const secure = secureValue === "true";
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      auth: { user, pass: password },
    });

    const info = await transporter.sendMail({
      from: { name: "Black Heroes", address: user },
      to: recipients,
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

    const acceptedRecipients = new Set(info.accepted.map((address) => address.toLowerCase()));
    if (!recipients.every((address) => acceptedRecipients.has(address))) {
      console.error("SMTP did not accept all contact form recipients.", {
        acceptedCount: info.accepted.length,
        rejectedCount: info.rejected.length,
      });
      return NextResponse.json({ error: deliveryErrorMessage }, { status: 502 });
    }

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
