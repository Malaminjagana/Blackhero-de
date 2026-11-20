"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type ContactFormProps = {
  services: string[];
};

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
} | null;

const errorMessage =
  "Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.";

export function ContactForm({ services }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const submissionInProgress = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const form = event.currentTarget;
    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch(assetPath("/api/contact/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus({ type: "error", message: errorMessage });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message:
          "Vielen Dank für Ihre Anfrage! Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.",
      });
    } catch {
      setStatus({ type: "error", message: errorMessage });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="bg-white p-7 shadow-sm sm:p-10" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-extrabold">Ihre Anfrage</h3>
      <p className="mt-2 text-sm text-[#77736b]">Wir freuen uns auf Ihre Nachricht und melden uns zeitnah bei Ihnen.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">Name<input required name="name" autoComplete="name" maxLength={120} className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
        <label className="text-sm font-bold">Unternehmen<input name="company" autoComplete="organization" maxLength={160} className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
        <label className="text-sm font-bold">E-Mail<input required type="email" name="email" autoComplete="email" maxLength={254} className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
        <label className="text-sm font-bold">Telefon<input name="phone" type="tel" autoComplete="tel" maxLength={40} pattern="(?:\+|00)?[0-9][0-9\s\(\)\.\/\-]*" title="Geben Sie eine gültige Telefonnummer ein." className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
      </div>
      <label className="mt-5 block text-sm font-bold">Worum geht es?<select required name="service" className="mt-2 w-full border border-[var(--line)] bg-white p-3 font-normal"><option value="">Bitte auswählen</option>{services.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
      <label className="mt-5 block text-sm font-bold">Nachricht<textarea required name="message" rows={5} maxLength={5000} className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Bitte nicht ausfüllen</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status && (
        <p
          className={`mt-4 text-sm ${status.type === "success" ? "text-green-800" : "text-red-700"}`}
          role={status.type === "success" ? "status" : "alert"}
          aria-live={status.type === "success" ? "polite" : "assertive"}
        >
          {status.message}
        </p>
      )}
      <button className="btn btn-gold mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Nachricht wird gesendet ..." : "Nachricht senden"}
        {!isSubmitting && <ArrowRight size={17} />}
      </button>
    </form>
  );
}
