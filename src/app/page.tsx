import {
  ArrowRight, ShieldCheck, Building2, CalendarDays, Eye, Users,
  BadgeCheck, Clock3, MapPin, Phone, CheckCircle2, ChevronDown,
  Award, Shield, GraduationCap, Crown, Mail, Globe2, Languages,
  HeartHandshake, Handshake
} from "lucide-react";
import Image from "next/image";
import { Hero3D } from "@/components/hero-3d";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ContactForm } from "@/components/contact-form";
import { assetPath } from "@/lib/asset-path";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const services = [
  { icon: Building2, title: "Objektschutz", text: "Zuverlässige Präsenz und strukturierte Kontrollgänge zum Schutz von Gebäuden, Anlagen und Sachwerten.", image: "/images/Blackhero_Objektschutz.webp", imageAlt: "Sicherheitsmitarbeiter kontrolliert den Zugang an einem Gewerbegebäude" },
  { icon: CalendarDays, title: "Veranstaltungsschutz", text: "Professionelle Einlasskontrollen, Besucherlenkung und Präsenz für Veranstaltungen jeder Art.", image: "/images/blackhero_Veranstaltungsschutz.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter sichert eine gut besuchte Hallenveranstaltung" },
  { icon: Eye, title: "Revierdienst", text: "Mobile Kontrollen und regelmäßige Streifenfahrten zur Prävention und frühzeitigen Erkennung von Risiken.", image: "/images/Blackhero_Revierdienst.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter auf nächtlicher Kontrollfahrt an einem Geschäftsgebäude" },
  { icon: ShieldCheck, title: "Baustellenbewachung", text: "Schutz von Baustellen, Material und Maschinen – abgestimmt auf die Anforderungen Ihres Projekts.", image: "/images/Blackhero_Baustellenbewachung.webp", imageAlt: "Black Heroes Mitarbeiter überwacht eine Baustelle mit Baugerüst und Kran" },
  { icon: Users, title: "Empfangs- & Pfortendienst", text: "Ein professioneller erster Eindruck mit aufmerksamer Besucherbetreuung und geregeltem Zutritt.", image: "/images/Blackhero-Empfangs- Pfortendienst.webp", imageAlt: "Black Heroes Mitarbeiter begrüßt eine Besucherin am Empfang" },
  { icon: BadgeCheck, title: "Individuelle Sicherheitslösungen", text: "Wir betrachten Ihre Situation genau und entwickeln ein passendes Sicherheitskonzept.", image: "/images/Blackhero_Individuelle Sicherheitslösungen.webp", imageAlt: "Black Heroes Sicherheitsmitarbeiter besprechen einen individuellen Einsatzplan vor einem Bürogebäude" },
  { icon: ShieldCheck, category: "PERSONENSCHUTZ", title: "Professioneller Personenschutz mit Verantwortung", text: "Wir schützen Menschen in besonderen Situationen durch diskrete, vorausschauende und individuell abgestimmte Sicherheitsmaßnahmen. Unsere Sicherheitskräfte sorgen für Schutz, Sicherheit und ein zuverlässiges Auftreten bei persönlichen Terminen, geschäftlichen Anlässen und öffentlichen Veranstaltungen.", image: "/images/personen_schutzt.webp", imageAlt: "Sicherheitskraft im Personenschutz", imagePosition: "object-[center_10%]" }
];

const advantages = [
  ["Verlässlichkeit", "Klare Absprachen, feste Ansprechpartner und verantwortungsbewusstes Handeln."],
  ["Professionelles Auftreten", "Ein respektvoller, aufmerksamer und situationsgerechter Umgang mit Menschen."],
  ["Individuelle Planung", "Sicherheitsleistungen orientieren sich an Ihrem Objekt, Ihrem Ablauf und Ihrem Bedarf."],
  ["Klare Kommunikation", "Nachvollziehbare Abläufe und eine strukturierte Zusammenarbeit."]
];

const faqs = [
  ["Welche Sicherheitsleistungen bietet Black Heroes an?", "Wir bieten Sicherheitslösungen wie Objektschutz, Veranstaltungsschutz, Revierdienst, Baustellenbewachung sowie Empfangs- und Pfortendienste an. Der konkrete Leistungsumfang wird gemeinsam mit Ihnen abgestimmt."],
  ["In welchen Regionen ist Black Heroes tätig?", "Unser Schwerpunkt liegt in Berlin und deutschlandweit. Fragen Sie uns gerne an, wenn Ihr Einsatzort außerhalb dieser Region liegt."],
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

const teamValues = [
  { icon: ShieldCheck, title: "Zuverlässigkeit", text: "Wir halten unsere Zusagen und nehmen unsere Verantwortung ernst." },
  { icon: HeartHandshake, title: "Respekt", text: "Wir begegnen Kunden, Mitarbeitern und Besuchern respektvoll und auf Augenhöhe." },
  { icon: Eye, title: "Professionalität", text: "Wir handeln aufmerksam, verantwortungsbewusst und situationsgerecht." },
  { icon: Users, title: "Teamarbeit", text: "Wir arbeiten gemeinsam und unterstützen uns gegenseitig." },
  { icon: Handshake, title: "Vertrauen", text: "Wir schaffen durch transparente Kommunikation und zuverlässige Arbeit eine vertrauensvolle Zusammenarbeit." }
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/black-heroes-logo-transparent.webp`,
      telephone: "+49 177 6105240 / +49 15563080115",
      email: "support@blackheroessecurity.de",
      areaServed: [
        { "@type": "City", name: "Berlin" },
        { "@type": "Country", name: "Deutschland" }
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+49 177 6105240/+49 15563080115",
        email: "support@blackheroessecurity.de",
        contactType: "customer service",
        availableLanguage: "German"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#security-services`,
      name: "Sicherheitsdienstleistungen",
      serviceType: [
        "Objektschutz",
        "Veranstaltungsschutz",
        "Baustellenbewachung",
        "Revierdienst",
        "Empfangs- und Pfortendienst",
        "Personenschutz",
        "Ausstellungsbewachung",
        "Filmsetbewachung"
      ],
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "City", name: "Berlin" },
        { "@type": "Country", name: "Deutschland" }
      ]
    }
  ]
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c")
        }}
      />
      <Hero3D />

      <section id="ueber-uns" className="section scroll-mt-20">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="group relative min-h-[340px] overflow-hidden bg-[#202020] sm:min-h-[460px]">
              <Image
                src={assetPath("/images/about-black-heroes.webp")}
                alt="Das Team von Black Heroes Security"
                fill
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 border border-white/15 bg-[#171717]/85 p-4 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#c6a052]/35 bg-[#c6a052]/10 text-[#dfc58e]">
                  <Globe2 size={21} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold sm:text-base">Sicherheit mit Vertrauen, Vielfalt und Verantwortung</span>
                  <span className="mt-1 block text-xs text-white/70">Gemeinsam aufmerksam. Gemeinsam verlässlich.</span>
                </span>
              </div>
            </div>

            <div>
              <div className="eyebrow">Über Black Heroes</div>
              <h2 className="section-title">Sicherheit mit Vertrauen, Vielfalt und Verantwortung.</h2>
              <p className="section-copy">
                Black Heroes Security ist ein professionelles Sicherheitsunternehmen in Deutschland. Unser internationales und multikulturelles Team vereint Menschen mit afrikanischen und afroamerikanischen Wurzeln sowie weiteren internationalen und kulturellen Hintergründen.
              </p>
              <p className="section-copy mt-4">
                Unterschiedliche Erfahrungen und Perspektiven bringen neue Blickwinkel in unsere tägliche Arbeit. Wir sehen Vielfalt, gegenseitigen Respekt, Professionalität und Teamarbeit als wichtige Stärken für einen aufmerksamen Umgang mit Menschen und verlässliche Sicherheitsleistungen.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 border border-[#c6a052]/35 bg-white/70 px-4 py-2.5 text-sm font-semibold">
                  <ShieldCheck size={17} className="text-[#96702f]" aria-hidden="true" />
                  Professioneller Sicherheitsdienst
                </span>
                <span className="inline-flex items-center gap-2 border border-[#c6a052]/35 bg-white/70 px-4 py-2.5 text-sm font-semibold">
                  <MapPin size={17} className="text-[#96702f]" aria-hidden="true" />
                  Berlin und deutschlandweit
                </span>
              </div>
              <a href="#kontakt" className="mt-7 inline-flex items-center gap-2 font-extrabold text-[#96702f]">
                Lernen Sie uns kennen <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <section aria-labelledby="international-team-heading" className="mt-20 border-y border-[var(--line)] py-10 sm:mt-24 sm:py-12">
            <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-12">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[#c6a052]/35 bg-[#c6a052]/10 text-[#96702f]">
                  <Languages size={23} aria-hidden="true" />
                </div>
                <h3 id="international-team-heading" className="max-w-md text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                  Ein internationales Team mit gemeinsamen Werten
                </h3>
              </div>
              <div>
                <p className="max-w-2xl text-sm leading-7 text-[#66635d] sm:text-base">
                  In unserem Team sind verschiedene Sprachkenntnisse vertreten. Mehrsprachige Kommunikation hilft uns, professionell mit Kunden, Besuchern, Mitarbeitern und Menschen unterschiedlicher Hintergründe zu sprechen und auf ihre Anliegen einzugehen.
                </p>
                <ul aria-label="Im Team vertretene Sprachen" className="mt-6 flex flex-wrap gap-2.5">
                  {["Deutsch", "Englisch", "Französisch", "Arabisch", "Türkisch"].map((language) => (
                    <li key={language} className="inline-flex items-center gap-2 border border-[#202020]/10 bg-white px-4 py-2.5 text-sm font-bold shadow-sm">
                      <Globe2 size={15} className="text-[#96702f]" aria-hidden="true" />
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="team-values-heading" className="mt-16 sm:mt-20">
            <div className="mb-9 max-w-2xl">
              <div className="eyebrow">Wofür wir stehen</div>
              <h3 id="team-values-heading" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Unsere Werte und unser Anspruch</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#66635d] sm:text-base">
                Verlässliche Sicherheitsarbeit beginnt für uns mit Haltung im Team und im täglichen Kontakt mit den Menschen, für die wir da sind.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {teamValues.map(({ icon: Icon, title, text }) => (
                <article key={title} className="border border-[var(--line)] bg-white p-5 transition-colors hover:border-[#c6a052]/60 sm:p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#c6a052]/30 bg-[#c6a052]/10 text-[#96702f]">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-extrabold">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#66635d]">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="qualifications-heading" className="mt-16 border border-[#c6a052]/25 bg-[#171717] px-6 py-8 text-white sm:mt-20 sm:px-8 sm:py-10">
            <div className="mb-8 max-w-2xl">
              <div className="eyebrow">Fachliche Grundlagen</div>
              <h3 id="qualifications-heading" className="section-title !mb-0 text-white">Qualifikationen unserer Mitarbeiter</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {qualifications.map(({ icon: Icon, title, text }) => (
                <article key={title} className="group min-h-44 border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c6a052]/60 hover:bg-white/[0.06] motion-reduce:transition-none">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#c6a052]/30 bg-[#c6a052]/10 text-[#c6a052] transition-colors group-hover:bg-[#c6a052]/15">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-bold leading-snug text-[#dfc58e]">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section id="leistungen" className="section bg-[#f0e9da]">
        <div className="container">
          <SectionHeading label="Unsere Leistungen" title="Sicherheitslösungen für unterschiedliche Anforderungen." copy="Jeder Einsatz ist anders. Deshalb stimmen wir unsere Leistungen auf Ihre örtlichen Gegebenheiten, Abläufe und Schutzziele ab." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.filter(({ title }) => title !== "Veranstaltungsschutz").map(({ icon: Icon, category, title, text, image, imageAlt, imagePosition }) => (
              <article className="card group overflow-hidden" key={title}>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#202020]">
                  <Image
                    src={assetPath(image)}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className={`object-cover ${imagePosition ?? ""} transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none`}
                  />
                </div>
                <div className="p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#f0e9da] text-[#96702f]"><Icon size={22} /></div>
                  {category && <div className="eyebrow mb-2">{category}</div>}
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
                  sizes="36px"
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
                    Ob Konzert, Festival oder Veranstaltung in geschlossenen Räumen: Black Heroes unterstützt Veranstalter mit einem eingespielten Sicherheitskonzept und einer präsenten, serviceorientierten Mannschaft. Wir stimmen unsere Abläufe auf Ort, Publikum und Programm ab damit Gäste sich willkommen und Veranstalter gut begleitet fühlen.
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
          <div className="relative min-h-[400px] overflow-hidden">
            <Image
              src={assetPath("/images/blackhero_banner.webp")}
              alt="Black Heroes Security"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
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
                  alt="sa Traoré, Geschäftsführer von Black Heroes Security"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[center_25%]"
                />
              </div>
              <div className="px-3 pb-3 pt-7 text-center">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#202020]">Moussa Traore</h3>
                <div className="mx-auto my-3 h-0.5 w-10 bg-[#c6a052]" />
                <p className="text-base font-medium text-[#77736b]">Geschäftsführung(QMB)</p>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm text-[#6d6961]">
                  <a href="mailto:support@blackheroessecurity.de" className="inline-flex items-center gap-2 transition-colors hover:text-[#96702f]">
                    <Mail size={15} aria-hidden="true" />
                    <span>support@blackheroessecurity.de</span>
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
                <p className="text-base font-medium text-[#77736b]">Client Management(QM)</p>
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
              <a className="flex items-center gap-4 font-bold" href="tel:+491776105240"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><Phone size={19} /></span> +49 177 6105240 / +49 15563080115</a>
              <div className="flex items-center gap-4 font-bold"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><MapPin size={19} /></span> Berlin und deutschlandweit</div>
              <div className="flex items-center gap-4 font-bold"><span className="flex h-11 w-11 items-center justify-center bg-white text-[#96702f]"><Clock3 size={19} /></span> Anfragen nach Vereinbarung</div>
            </div>
          </div>
          <ContactForm services={services.map(service => service.title)} />
        </div>
      </section>

      <section aria-labelledby="certifications-heading" className="section">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <h2 id="certifications-heading" className="section-title">QUALITÄT NACH KLAREN STANDARDS.</h2>
            <p className="section-copy">
              Qualität, Zuverlässigkeit und klare Prozesse bilden die Grundlage unserer Arbeit. Wir orientieren uns an anerkannten Standards der Sicherheitsbranche und setzen auf strukturierte Abläufe, qualifiziertes Personal und kontinuierliche Qualitätsverbesserung.
            </p>
          </div>
          <div className="grid border border-[var(--line)] md:grid-cols-2">
            <article className="p-6 sm:p-9">
              <Image
                src={assetPath("/images/dekra-din-77200-1 copy.avif")}
                alt="DEKRA-Abbildung zur DIN 77200-1"
                width={750}
                height={417}
                sizes="(max-width: 767px) 100vw, 360px"
                className="h-auto w-full max-w-[360px] object-contain object-left"
              />
              <div className="mt-6 font-mono text-xs uppercase tracking-[.2em] text-[#96702f]">DIN 77200-1</div>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight sm:text-2xl">Qualitätsstandard für Sicherheitsdienstleistungen</h3>
              <p className="mt-4 text-sm leading-7 text-[#66635d]">
                Die DIN 77200-1 definiert Anforderungen an professionelle Sicherheitsdienstleistungen. Sie bildet einen wichtigen Rahmen für die Organisation, Qualifikation des eingesetzten Personals und die Durchführung von Sicherheitsaufträgen.
              </p>
            </article>
            <article className="border-t border-[var(--line)] p-6 sm:p-9 md:border-l md:border-t-0">
              <Image
                src={assetPath("/images/dekra-iso-9001 copy.avif")}
                alt="DEKRA-Abbildung zur ISO 9001"
                width={750}
                height={322}
                sizes="(max-width: 767px) 100vw, 360px"
                className="h-auto w-full max-w-[360px] object-contain object-left"
              />
              <div className="mt-6 font-mono text-xs uppercase tracking-[.2em] text-[#96702f]">ISO 9001:2015</div>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight sm:text-2xl">Systematisches Qualitätsmanagement</h3>
              <p className="mt-4 text-sm leading-7 text-[#66635d]">
                Ein strukturiertes Qualitätsmanagement unterstützt klare Verantwortlichkeiten, nachvollziehbare Prozesse und eine kontinuierliche Verbesserung unserer betrieblichen Abläufe. Die ISO 9001 bildet hierfür einen international anerkannten Standard.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
