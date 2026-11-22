import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const requiredRecipients = ["amin.j@blackheroes.de", "support@blackheroessecurity.de"];
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

function getRecipients(value: string | undefined): string[] | null {
  if (!value) return null;

  const recipients = value.split(",").map((address) => address.trim());
  const normalizedRecipients = recipients.map((address) => address.toLowerCase());

  if (
    recipients.some((address) => !isValidEmail(address)) ||
    new Set(normalizedRecipients).size !== recipients.length ||
    requiredRecipients.some((address) => !normalizedRecipients.includes(address))
  ) {
    return null;
  }

  return recipients;
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const recipients = getRecipients(process.env.CONTACT_EMAIL_TO);
  const missingConfiguration = [
    !apiKey && "RESEND_API_KEY",
    !from && "CONTACT_FROM_EMAIL",
    !recipients && "CONTACT_EMAIL_TO",
  ].filter((variable): variable is string => Boolean(variable));

  if (!apiKey || !from || !isValidEmail(from) || !recipients) {
    console.error("Contact form Resend configuration is incomplete or invalid.", {
      missingVariables: missingConfiguration,
    });
    return NextResponse.json({ error: deliveryErrorMessage }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email,
      subject: `Neue Kontaktanfrage über blackheroes.de – ${name}`,
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

    if (error || !data?.id) {
      console.error("Resend did not accept the contact form message.");
      return NextResponse.json({ error: deliveryErrorMessage }, { status: 502 });
    }

    return NextResponse.json({ message: "Ihre Nachricht wurde erfolgreich gesendet." });
  } catch {
    console.error("Contact form Resend request failed.");
    return NextResponse.json({ error: deliveryErrorMessage }, { status: 502 });
  }
}
