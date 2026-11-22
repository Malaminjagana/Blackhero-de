import Link from "next/link";
import { ShieldCheck, Phone, Globe, ArrowUpRight } from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-consent";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center border border-[#c6a052] text-xs font-black text-[#c6a052]">BH</div>
            <div><strong className="block tracking-[.08em]">BLACK HEROES</strong><span className="text-xs font-bold tracking-[.25em] text-[#c6a052]">SECURITY</span></div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">Sicherheit mit Vertrauen. Ihr Ansprechpartner für professionelle Sicherheitsdienstleistungen in Berlin und deutschlandweit.</p>
        </div>
        <div>
          <h3 className="font-extrabold">Navigation</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
            <a href="#leistungen" className="hover:text-[#dfc58e]">Leistungen</a>
            <a href="#kontakt" className="hover:text-[#dfc58e]">Kontakt</a>
            <Link href="/impressum" className="hover:text-[#dfc58e]">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#dfc58e]">Datenschutz</Link>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Kontakt</h3>
          <div className="mt-5 flex flex-col gap-4 text-sm text-white/65">
            <a href="tel:+491776105240" className="flex items-center gap-3"><Phone size={16} /> +49 177 6105240 / +49 15563080115</a>
            <a href="https://blackheroes.de" className="flex items-center gap-3"><Globe size={16} /> blackheroes.de <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col justify-between gap-3 py-5 text-xs text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Black Heroes Security. Alle Rechte vorbehalten.</span>
          <CookieSettingsLink />
          <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#c6a052]" /> Sicherheit mit Vertrauen</span>
        </div>
      </div>
    </footer>
  );
}
