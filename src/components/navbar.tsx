 "use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

const links = [
  ["Über uns", "#ueber-uns"],
  ["Leistungen", "#leistungen"],
  ["Einsatzbereiche", "#einsatzbereiche"],
  ["Kontakt", "#kontakt"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#202020]/95 text-white backdrop-blur">
      <div className="container flex h-[82px] items-center justify-between">
        <Link href="/" className="flex h-full shrink-0 items-center" aria-label="Black Heroes Startseite">
          <Image
            src={assetPath("/images/black-heroes-logo-transparent.webp")}
            alt="Black Heroes Security"
            width={1680}
            height={1504}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => <a key={label} href={href} className="text-sm font-semibold text-white/75 transition hover:text-[#dfc58e]">{label}</a>)}
          <a href="tel:+491776105240" className="btn btn-gold !min-h-[43px] !px-4"><Phone size={15} /> Anrufen</a>
        </nav>
        <button className="lg:hidden" aria-label={open ? "Menü schließen" : "Menü öffnen"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container flex flex-col gap-5 border-t border-white/10 py-6 lg:hidden">
        {links.map(([label, href]) => <a onClick={() => setOpen(false)} key={label} href={href} className="font-semibold">{label}</a>)}
        <a className="font-bold text-[#dfc58e]" href="tel:+491776105240">+49 177 6105240</a>
      </nav>}
    </header>
  );
}
