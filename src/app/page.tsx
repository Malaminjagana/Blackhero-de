import {
  ArrowRight, ShieldCheck, Building2, CalendarDays, Eye, Users,
  BadgeCheck, Clock3, MapPin, Phone, CheckCircle2, ChevronDown,
  Award, Shield, GraduationCap, Crown, Mail
} from "lucide-react";
import Image from "next/image";
import { Hero3D } from "@/components/hero-3d";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { assetPath } from "@/lib/asset-path";

const services = [
  { icon: Building2, title: "Objektschutz", text: "Zuverlässige Präsenz und strukturierte Kontrollgänge zum Schutz von Gebäuden, Anlagen und Sachwerten.", image: "/images/Blackhero_Objektschutz.webp", imageAlt: "Sicherheitsmitarbeiter kontrolliert den Zugang an einem Gewerbegebäude" },
  { icon: CalendarDays, title: "Veranstaltungsschutz", text: "Professionelle Einlasskontrollen, Besucherlenkung und Präsenz für Veranstaltungen jeder Art.", image: "/images/blackhero_Veranstaltungsschutz.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter sichert eine gut besuchte Hallenveranstaltung" },
  { icon: Eye, title: "Revierdienst", text: "Mobile Kontrollen und regelmäßige Streifenfahrten zur Prävention und frühzeitigen Erkennung von Risiken.", image: "/images/Blackhero_Revierdienst.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter auf nächtlicher Kontrollfahrt an einem Geschäftsgebäude" },
  { icon: ShieldCheck, title: "Baustellenbewachung", text: "Schutz von Baustellen, Material und Maschinen – abgestimmt auf die Anforderungen Ihres Projekts.", image: "/images/Blackhero_Baustellenbewachung.webp", imageAlt: "Black Heroes Mitarbeiter überwacht eine Baustelle mit Baugerüst und Kran" },
  { icon: Users, title: "Empfangs- & Pfortendienst", text: "Ein professioneller erster Eindruck mit aufmerksamer Besucherbetreuung und geregeltem Zutritt.", image: "/images/Blackhero-Empfangs- Pfortendienst.webp", imageAlt: "Black Heroes Mitarbeiter begrüßt eine Besucherin am Empfang" },
  { icon: BadgeCheck, title: "Individuelle Sicherheitslösungen", text: "Wir betrachten Ihre Situation genau und entwickeln ein passendes Sicherheitskonzept.", image: "/images/Blackhero_Individuelle Sicherheitslösungen.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter besprechen einen individuellen Einsatzplan vor einem Bürogebäude" }
];

const advantages = [
  ["Verlässlichkeit", "Klare Absprachen, feste Ansprechpartner und verantwortungsbewusstes Handeln."],
  ["Professionelles Auftreten", "Ein respektvoller, aufmerksamer und situationsgerechter Umgang mit Menschen."],
  ["Individuelle Planung", "Sicherheitsleistungen orientieren sich an Ihrem Objekt, Ihrem Ablauf und Ihrem Bedarf."],
  ["Klare Kommunikation", "Nachvollziehbare Abläufe und eine strukturierte Zusammenarbeit."]
];

const faqs = [
  ["Welche Sicherheitsleistungen bietet Black Heroes an?", "Wir bieten Sicherheitslösungen wie Objektschutz, Veranstaltungsschutz, Revierdienst, Baustellenbewachung sowie Empfangs- und Pfortendienste an. Der konkrete Leistungsumfang wird gemeinsam mit Ihnen abgestimmt."],
  ["In welchen Regionen ist Black Heroes tätig?", "Unser Schwerpunkt liegt in Berlin und Brandenburg. Fragen Sie uns gerne an, wenn Ihr Einsatzort außerhalb dieser Region liegt."],
  ["Wie kann ich ein Angebot anfragen?", "Nutzen Sie das Kontaktformular oder rufen Sie uns direkt an. Teilen Sie uns möglichst Einsatzort, Zeitraum und den gewünschten Leistungsumfang mit."],
  ["Kann die Sicherheitsleistung individuell angepasst werden?", "Ja. Nach Klärung Ihrer Anforderungen stimmen wir Personal, Einsatzzeiten und Aufgaben auf Ihren Bedarf ab."]
];

const qualifications = [
  { icon: ShieldCheck, title: "§ 34a GewO", text: "Unterrichtung nach § 34a GewO" },
  { icon: Award, title: "Sachkundeprüfung § 34a", text: "Sachkundeprüfung im Bewachungsgewerbe" },
  { icon: Shield, title: "GSSK", text: "Geprüfte für Schutz und Sicherheitskraft" },
  { icon: BadgeCheck, title: "SKSS", text: "Servicekraft für Schutz und Sicherheit" },
  { icon: GraduationCap, title: "FKSS", text: "Fachkraft für Schutz und Sicherheit" },
  { icon: Crown, title: "Angehender Meister für Schutz und Sicherheit (MFSS)", text: "In Vorbereitung" }
];

function SectionHeading({ label, title, copy, light = false }: { label: string; title: string; copy: string; light?: boolean }) {
  return <div className="mb-12">
    <div className="eyebrow">{label}</div>
    <h2 className={`section-title ${light ? "text-white" : ""}`}>{title}</h2>
    <p className="section-copy">{copy}</p>
  </div>;
}

export default function HomePage() {
  return (
    <main>
      <Hero3D />

      <section id="ueber-uns" className="section">
        

        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="relative min-h-[430px] overflow-hidden">
              <Image
                src={assetPath("/images/about-black-heroes.webp")}
                alt="Das Team von Black Heroes Security"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <section aria-labelledby="qualifications-heading" className="border border-[#c6a052]/25 bg-[#171717] px-6 py-8 text-white sm:px-8 sm:py-10">
              <div className="mb-8 max-w-2xl">
               
                <h2 id="qualifications-heading" className="section-title !mb-4 text-white">Qualifikationen unserer Mitarbeiter</h2>
            
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {qualifications.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="group min-h-44 border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c6a052]/60 hover:bg-white/[0.06] motion-reduce:transition-none">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#c6a052]/30 bg-[#c6a052]/10 text-[#c6a052] transition-colors group-hover:bg-[#c6a052]/15">
                      <Icon size={21} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold leading-snug text-[#dfc58e]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <div className="relative -mx-4 mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 bg-[#0a0a0a]/90 px-4 pt-7 text-sm text-white/85 sm:mx-0 sm:bg-transparent sm:px-0">
            <span className="flex items-center gap-2 rounded-full border border-[#c6a052]/30 bg-[#0a0a0f] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(198,160,82,0.15)]">
    <ShieldCheck size={17} className="text-[#c6a052]" />
    Professioneller Sicherheitsdienst
  </span>
  <span className="flex items-center gap-2 rounded-full border border-[#c6a052]/30 bg-[#0a0a0f] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(198,160,82,0.15)]">
    <MapPin size={17} className="text-[#c6a052]" />
    Berlin &amp; Brandenburg
  </span>
            
          </div>
          <div>
            
            <div className="eyebrow">Über Black Heroes</div>
            <h2 className="section-title">Mehr als Präsenz. Verantwortung, die Vertrauen schafft.</h2>
            <p className="section-copy">Sicherheit bedeutet für uns, aufmerksam zu sein, vorausschauend zu handeln und Menschen respektvoll zu begegnen. Black Heroes steht für einen professionellen Sicherheitsdienst, der die Anforderungen seiner Kunden versteht und passende Lösungen entwickelt.</p>
            <p className="section-copy mt-4">Ob Gewerbeobjekt, Baustelle oder Veranstaltung: Wir legen Wert auf klare Kommunikation, zuverlässige Abläufe und einen souveränen Auftritt.</p>
            <a href="#kontakt" className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#96702f]">Lernen Sie uns kennen <ArrowRight size={17} /></a>
            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
              <div><strong className="block text-2xl">01</strong><span className="text-xs text-[var(--muted)]">Verantwortung</span></div>
              <div><strong className="block text-2xl">02</strong><span className="text-xs text-[var(--muted)]">Aufmerksamkeit</span></div>
              <div><strong className="block text-2xl">03</strong><span className="text-xs text-[var(--muted)]">Vertrauen</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="section bg-[#f0e9da]">
        <div className="container">
          <SectionHeading label="Unsere Leistungen" title="Sicherheitslösungen für unterschiedliche Anforderungen." copy="Jeder Einsatz ist anders. Deshalb stimmen wir unsere Leistungen auf Ihre örtlichen Gegebenheiten, Abläufe und Schutzziele ab." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.filter(({ title }) => title !== "Veranstaltungsschutz").map(({ icon: Icon, title, text, image, imageAlt }) => (
              <article className="card group overflow-hidden" key={title}>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#202020]">
                  <Image
                    src={assetPath(image)}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <div className="p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#f0e9da] text-[#96702f]"><Icon size={22} /></div>
                  <h3 className="text-xl font-extrabold">{title}</h3>
                  <p className="mt-3 min-h-[82px] text-sm leading-7 text-[#6d6961]">{text}</p>
                  <a href="#kontakt" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#96702f]">Leistung anfragen <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
          <section aria-labelledby="event-security-heading" className="mt-20 border-t border-[#202020]/15 pt-14 sm:mt-24 sm:pt-16">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-1 w-12 bg-[#c6a052]" aria-hidden="true" />
              <p className="eyebrow !text-[#96702f]">Sicherheit für besondere Momente</p>
            </div>
            <h2 id="event-security-heading" className="mb-8 max-w-4xl text-[clamp(1.25rem,7vw,3rem)] font-black leading-[1.05] tracking-[-.045em] text-[#202020] sm:text-5xl lg:text-6xl">
              VERANSTALTUNGSSCHUTZ
            </h2>
            <div className="group relative isolate aspect-[4/3] overflow-hidden bg-[#202020] sm:aspect-[16/8] lg:aspect-[16/7]">
              <Image
                src={assetPath("/images/blackhero_Veranstaltungsschutz.webp")}
                alt="Black Heroes Sicherheitsmitarbeiter behalten bei einer gut besuchten Hallenveranstaltung den Überblick"
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 100vw, 1160px"
                className="object-cover object-[center_48%] transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 border border-white/20 bg-[#171717]/85 px-4 py-3 text-white backdrop-blur-sm sm:bottom-7 sm:left-7">
                <Image
                  src={assetPath("/images/black-heroes-logo-transparent.webp")}
                  alt=""
                  width={1680}
                  height={1504}
                  className="h-9 w-9 object-contain"
                />
                <span className="text-xs font-bold uppercase tracking-[.16em] sm:text-sm">Black Heroes Security</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  src: "/images/Ausstellungsbewachung.webp",
                  alt: "Black Heroes Sicherheitsmitarbeiter sichern eine Ausstellung und beobachten den Besucherbereich",
                  caption: "Ausstellungsbewachung"
                },
                {
                  src: "/images/Veranstaltungsschutz.webp",
                  alt: "Black Heroes Sicherheitsmitarbeiter überwacht eine Boxveranstaltung mit zahlreichen Besuchern",
                  caption: "Kampf- und Veranstaltungsschutz"
                },
                {
                  src: "/images/Filmsetbewachung .webp",
                  alt: "Black Heroes Sicherheitsmitarbeiter sichern ein Filmset während der Dreharbeiten",
                  caption: "Filmsetbewachung"
                },
                {
                  src: "/images/Kaufhausdetektiv .webp",
                  alt: "Black Heroes Mitarbeiter beobachtet aufmerksam den Verkaufsbereich eines Kaufhauses",
                  caption: "Kaufhausdetektiv"
                }
              ].map(({ src, alt, caption }) => (
                <figure key={caption} className="group overflow-hidden border border-[#202020]/10 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#202020]">
                    <Image
                      src={assetPath(src)}
                      alt={alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <figcaption className="border-t-2 border-[#c6a052] px-4 py-3 text-sm font-bold text-[#292929]">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8 border-t border-[#202020]/15 pt-8 sm:mt-10 sm:pt-10">
              <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
                <div>
                  <p className="eyebrow">Verlässlich geplant. Aufmerksam im Einsatz.</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Professioneller Veranstaltungsschutz</h3>
                </div>
                <div>
                  <p className="max-w-3xl text-base leading-7 text-[#66635d]">
                    Ob Konzert, Festival oder Veranstaltung in geschlossenen Räumen: Black Heroes unterstützt Veranstalter mit einem eingespielten Sicherheitskonzept und einer präsenten, serviceorientierten Mannschaft. Wir stimmen unsere Abläufe auf Ort, Publikum und Programm ab – damit Gäste sich willkommen und Veranstalter gut begleitet fühlen.
                  </p>
                  <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {[
                      "Einlass- und Zugangskontrollen",
                      "Lenkung von Personen- und Besucherströmen",
                      "Ordnerdienste und sichtbare Sicherheitspräsenz",
                      "Schutz von Gästen, Künstlern und Veranstaltern",
                      "Aufmerksame Begleitung bei Konzerten und Festivals",
                      "Rasche, abgestimmte Reaktion bei Zwischenfällen"
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#292929]">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#96702f]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#kontakt" className="btn btn-gold mt-8">Veranstaltung besprechen <ArrowRight size={17} /></a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading light label="Warum Black Heroes" title="Ein Partner, der Sicherheit ernst nimmt." copy="Gute Sicherheitsarbeit beginnt mit Zuhören, sorgfältiger Planung und Menschen, die ihre Aufgabe aufmerksam und verantwortungsvoll wahrnehmen." />
            <a className="btn btn-gold" href="#kontakt">Mit uns sprechen <ArrowRight size={17} /></a>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {advantages.map(([title, text], i) => (
              <div key={title} className="border-b border-white/15 p-7 sm:border-l">
                <div className="mb-6 text-sm font-black tracking-widest text-[#c6a052]">0{i + 1}</div>
                <h3 className="text-xl font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="einsatzbereiche" className="section">
        <div className="container">
          <SectionHeading label="Einsatzbereiche" title="Sicherheit dort, wo sie gebraucht wird." copy="Wir unterstützen Unternehmen, Veranstalter und Einrichtungen mit passenden Sicherheitsleistungen. Sprechen Sie mit uns über Ihre konkrete Situation." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Gewerbe & Büro", "Baustellen & Anlagen", "Veranstaltungen", "Einzelhandel & Empfang"].map((item, i) => (
              <div key={item} className="border border-[var(--line)] p-7">
                <span className="text-xs font-black tracking-widest text-[#a17c3d]">0{i + 1}</span>
                <h3 className="mt-8 text-lg font-extrabold">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-[#77736b]">Aufmerksame Präsenz und abgestimmte Abläufe für Ihren Einsatzbereich.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f0e9da]">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Unser Anspruch</div>
            <h2 className="section-title">Ein professioneller Auftritt. Klare Abläufe. Verlässliche Zusammenarbeit.</h2>
            <p className="section-copy">Von der ersten Anfrage bis zur Durchführung legen wir Wert auf transparente Kommunikation und eine sorgfältige Abstimmung. Wir möchten, dass Sie wissen, wer für Sie im Einsatz ist und an wen Sie sich wenden können.</p>
            <ul className="mt-7 space-y-3 text-sm font-semibold">
              {["Persönliche Abstimmung Ihres Bedarfs", "Klare Aufgaben und Zuständigkeiten", "Respektvoller Umgang mit Kunden und Besuchern"].map(x => <li className="flex items-center gap-3" key={x}><CheckCircle2 className="text-[#a17c3d]" size={18} />{x}</li>)}
            </ul>
          </div>
          <div className="placeholder min-h-[400px]">/images/security-team-at-work.jpg</div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow">Jetzt Kontakt aufnehmen</div>
              <h2 className="section-title text-white">Sie suchen einen zuverlässigen Sicherheitspartner?</h2>
              <p className="section-copy">Beschreiben Sie uns Ihren Bedarf. Wir melden uns, um die nächsten Schritte mit Ihnen zu besprechen.</p>
            </div>
            <a href="#kontakt" className="btn btn-gold">Anfrage starten <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Häufige Fragen</div>
            <h2 className="section-title">Gut informiert entscheiden.</h2>
            <p className="section-copy">Hier finden Sie erste Antworten. Für eine konkrete Einschätzung sprechen Sie uns gerne direkt an.</p>
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map(([q, a]) => <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-extrabold">{q}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={19} /></summary>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6d6961]">{a}</p>
            </details>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="eyebrow">Verantwortung &amp; Qualität</div>
            <h2 className="section-title mx-auto">Ihre Ansprechpartner bei Black Heroes</h2>
            <p className="section-copy mx-auto">Kompetenz, Verantwortung und Qualität dafür stehen unsere Ansprechpartner und unser Anspruch an professionelle Sicherheitsdienstleistungen.</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-8">
            <article className="group rounded-2xl border border-[#c6a052]/20 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c6a052]/50 hover:shadow-[0_18px_45px_rgba(0,0,0,.1)] motion-reduce:transition-none sm:p-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f0e9da] ring-1 ring-[#c6a052]/20">
                <Image
                  src={assetPath("/images/M_traore.webp")}
                  alt="Mousa Traoré, Geschäftsführer von Black Heroes Security"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[center_25%]"
                />
              </div>
              <div className="px-3 pb-3 pt-7 text-center">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#202020]">Mousa Traore</h3>
                <div className="mx-auto my-3 h-0.5 w-10 bg-[#c6a052]" />
                <p className="text-base font-medium text-[#77736b]">Geschäftsführer</p>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm text-[#6d6961]">
                  <a href="mailto:kontakt@blackheroes.de" className="inline-flex items-center gap-2 transition-colors hover:text-[#96702f]">
                    <Mail size={15} aria-hidden="true" />
                    <span>kontakt@blackheroes.de</span>
                  </a>
                  <a href="tel:+491776105240" className="inline-flex items-center gap-2 transition-colors hover:text-[#96702f]">
                    <Phone size={15} aria-hidden="true" />
                    <span>+49 177 6105240</span>
                  </a>
                </div>
              </div>
            </article>
            <article className="group rounded-2xl border border-[#c6a052]/20 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c6a052]/50 hover:shadow-[0_18px_45px_rgba(0,0,0,.1)] motion-reduce:transition-none sm:p-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f0e9da] ring-1 ring-[#c6a052]/20">
                <Image
                  src={assetPath("/images/M_jagana.webp")}
                  alt="Malamin Jagana, Verantwortlicher für Qualitätsmanagement"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="px-3 pb-3 pt-7 text-center">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#202020]">M. Jagana</h3>
                <div className="mx-auto my-3 h-0.5 w-10 bg-[#c6a052]" />
                <p className="text-base font-medium text-[#77736b]">Verantwortlicher für Qualitätsmanagement</p>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm text-[#6d6961]">
                  <a href="mailto:amin.j@blackheroes.de" className="inline-flex items-center gap-2 transition-colors hover:text-[#96702f]">
                    <Mail size={15} aria-hidden="true" />
                    <span>amin.j@blackheroes.de</span>
                  </a>
                  <a href="tel:+4911563080115" className="inline-flex items-center gap-2 transition-colors hover:text-[#96702f]">
                    <Phone size={15} aria-hidden="true" />
                    <span>+49 115 63080115</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section id="kontakt" className="section bg-[#f0e9da]">
        <div className="container grid gap-14 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Kontakt</div>
            <h2 className="section-title">Lassen Sie uns über Ihre Sicherheit sprechen.</h2>
            <p className="section-copy">Sie möchten ein Angebot anfragen oder haben Fragen zu unseren Leistungen? Wir freuen uns auf Ihre Nachricht.</p>
            <div className="mt-9 space-y-5">
              <a className="flex items-center gap-4 font-bold" href="tel:+491776105240"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><Phone size={19} /></span> +49 177 6105240</a>
              <div className="flex items-center gap-4 font-bold"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><MapPin size={19} /></span> Berlin und Brandenburg</div>
              <div className="flex items-center gap-4 font-bold"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><Clock3 size={19} /></span> Anfragen nach Vereinbarung</div>
            </div>
          </div>
          <form className="bg-white p-7 shadow-sm sm:p-10" action="mailto:kontakt@blackheroes.de" method="post" encType="text/plain">
            <h3 className="text-2xl font-extrabold">Ihre Anfrage</h3>
            <p className="mt-2 text-sm text-[#77736b]">Die Formularübermittlung muss vor dem Livegang mit einer sicheren serverseitigen Lösung verbunden werden.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">Name<input required name="name" autoComplete="name" className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
              <label className="text-sm font-bold">Unternehmen<input name="company" autoComplete="organization" className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
              <label className="text-sm font-bold">E-Mail<input required type="email" name="email" autoComplete="email" className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
              <label className="text-sm font-bold">Telefon<input name="phone" type="tel" autoComplete="tel" className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
            </div>
            <label className="mt-5 block text-sm font-bold">Worum geht es?<select name="service" className="mt-2 w-full border border-[var(--line)] bg-white p-3 font-normal"><option>Bitte auswählen</option>{services.map(s => <option key={s.title}>{s.title}</option>)}</select></label>
            <label className="mt-5 block text-sm font-bold">Nachricht<textarea required name="message" rows={5} className="mt-2 w-full border border-[var(--line)] p-3 font-normal outline-none focus:border-[#c6a052]" /></label>
            <button className="btn btn-gold mt-6 w-full" type="submit">Anfrage vorbereiten <ArrowRight size={17} /></button>
          </form>
        </div>
      </section>
    </main>
  );
}
