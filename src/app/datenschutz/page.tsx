import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

const description =
  "Datenschutzerklärung von Black Heroes Security: Informationen zur Verarbeitung personenbezogener Daten und Ihren Rechten.";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description,
  alternates: {
    canonical: "/datenschutz/"
  },
  openGraph: {
    title: `Datenschutzerklärung | ${SITE_NAME}`,
    description,
    url: "/datenschutz/",
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: `Datenschutzerklärung | ${SITE_NAME}`,
    description
  }
};

const sectionClass = "scroll-mt-24 border-b border-[var(--line)] pb-8 last:border-b-0";
const headingClass = "mb-3 text-xl font-extrabold tracking-tight text-[#202020] sm:text-2xl";
const copyClass = "space-y-4 text-sm leading-7 text-[#5f5b54] sm:text-base sm:leading-8";

export default function DatenschutzPage() {
  return (
    <main className="container min-h-[60vh] py-14 sm:py-20">
      <div className="eyebrow">Rechtliches</div>
      <h1 className="section-title break-words">Datenschutzerklärung</h1>
      <p className="section-copy">
        Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. In dieser Erklärung informieren wir Sie darüber,
        welche Daten bei der Nutzung unserer Website verarbeitet werden und welche Rechte Ihnen zustehen.
      </p>

      <div className="mt-10 max-w-3xl space-y-8 sm:mt-12 sm:space-y-10">
        <section className={sectionClass}>
          <h2 className={headingClass}>1. Verantwortlicher</h2>
          <div className={copyClass}>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              <br />
              Black Heroes Security GmbH
              <br />
              Ebersstr. 61
              <br />
              10827 Berlin
            </p>
            <p>
              Telefon: <a className="font-semibold text-[#96702f] underline-offset-4 hover:underline" href="tel:+491776105240">+49 177 6105240</a>
              <br />
              E-Mail: <a className="font-semibold text-[#96702f] underline-offset-4 hover:underline" href="mailto:support@blackheroessecurity.de">support@blackheroessecurity.de</a>
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
          <div className={copyClass}>
            <p>
              Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
              Person beziehen. Wir verarbeiten solche Daten nur, soweit dies zur Bereitstellung dieser Website, zur
              Bearbeitung Ihrer Anfrage oder für einen anderen in dieser Erklärung genannten Zweck erforderlich ist.
            </p>
            <p>
              Die Verarbeitung erfolgt abhängig vom jeweiligen Zweck insbesondere zur Durchführung
              vorvertraglicher Maßnahmen oder eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO), aufgrund einer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) oder zur Wahrung berechtigter Interessen (Art. 6 Abs. 1
              lit. f DSGVO). Wenn wir Daten aufgrund einer Einwilligung verarbeiten, können Sie diese jederzeit
              mit Wirkung für die Zukunft widerrufen.
            </p>
            <p>
              Soweit in den folgenden Abschnitten keine konkrete Speicherdauer genannt ist, löschen wir
              personenbezogene Daten, sobald der jeweilige Zweck entfällt und keine gesetzlichen
              Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung entgegenstehen.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Zugriffsdaten und Logfiles</h2>
          <div className={copyClass}>
            <p>
              Beim Aufruf einer Website können durch den Hostingbetrieb technische Zugriffsdaten verarbeitet
              werden, soweit sie für die Auslieferung, Stabilität und Sicherheit der Website erforderlich sind.
              Das Projekt ist für eine statische Veröffentlichung über GitHub Pages konfiguriert. Ob und in
              welchem Umfang GitHub Pages für die produktive Website eingesetzt wird, welche Zugriffsdaten
              dabei konkret erfasst werden und wie lange sie gespeichert bleiben, muss anhand der tatsächlichen
              Hosting-Konfiguration und der Angaben des Anbieters bestätigt werden.
            </p>
            <p>
              Soweit eine Verarbeitung zur sicheren Bereitstellung der Website erforderlich ist, erfolgt sie auf
              Grundlage unseres berechtigten Interesses an einem funktionsfähigen und geschützten Internetauftritt
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Kontaktaufnahme</h2>
          <div className={copyClass}>
            <p>
              Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten
              Angaben, um Ihre Anfrage zu bearbeiten und mögliche Anschlussfragen zu beantworten. Bei
              geschäftlichen oder vorvertraglichen Anfragen kann dies insbesondere Ihren Namen, Ihre
              Kontaktdaten und den Inhalt Ihrer Nachricht umfassen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
              DSGVO, sofern die Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist;
              ansonsten Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres Interesses an der Bearbeitung eingehender
              Anfragen.
            </p>
            <p>
              Wenn Sie das Anfrageformular absenden, werden die von Ihnen eingegebenen Angaben zur Bearbeitung
              Ihrer Anfrage über unseren Webserver verarbeitet und per E-Mail an amin.j@blackheroes.de
              übermittelt. Für den E-Mail-Versand wird der SMTP-Dienst von IONOS verwendet. Die Angaben werden
              nicht in einer Website-Datenbank gespeichert; die E-Mail wird in unserem Postfach so lange
              aufbewahrt, wie dies für die Bearbeitung erforderlich ist oder gesetzliche Pflichten beziehungsweise
              die Geltendmachung oder Abwehr von Ansprüchen eine weitere Speicherung erfordern.
            </p>
            <p>
              Wir bewahren Anfragen nur so lange auf, wie dies für deren Bearbeitung erforderlich ist oder
              gesetzliche Pflichten beziehungsweise die Geltendmachung oder Abwehr von Ansprüchen eine weitere
              Speicherung erfordern.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Bewerbungen</h2>
          <div className={copyClass}>
            <p>
              Auf der Website ist kein Online-Bewerbungsformular eingebunden. Wenn Sie uns Bewerbungsunterlagen
              direkt über einen von Ihnen gewählten Kommunikationsweg zukommen lassen, verarbeiten wir die darin
              enthaltenen personenbezogenen Daten zur Durchführung des Bewerbungsverfahrens und zur Entscheidung
              über die Begründung eines Beschäftigungsverhältnisses. Die Verarbeitung erfolgt nach Maßgabe der
              anwendbaren datenschutzrechtlichen Vorschriften, insbesondere § 26 BDSG und Art. 6 Abs. 1 lit. b
              DSGVO.
            </p>
            <p>
              Bewerbungsdaten werden gelöscht, sobald sie für das Bewerbungsverfahren nicht mehr erforderlich
              sind und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere
              Speicherung bestehen.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Einwilligung, Cookies und Reichweitenmessung</h2>
          <div className={copyClass}>
            <p>
              Über den Cookie-Einstellungsdialog können Sie zwischen den Kategorien „Notwendige Cookies“,
              „Statistik und Analyse“ sowie „Marketing und externe Dienste“ wählen. Notwendige Speicherung ist
              stets aktiv, damit die Website grundlegende Funktionen bereitstellen und Ihre Auswahl speichern
              kann. Ihre Auswahl einschließlich des Zeitpunkts wird in Ihrem Browser im localStorage und nicht
              in einem Cookie gespeichert. Diese Speicherung ist für die Verwaltung Ihrer ausdrücklich
              gewünschten Einwilligungsentscheidung erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG); die damit
              verbundene Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1
              lit. f DSGVO.
            </p>
            <p>
              Statistik und Analyse sowie Marketing und externe Dienste sind optionale Kategorien und standardmäßig
              deaktiviert. Derzeit sind auf dieser Website keine Analyse-, Werbe- oder externen Tracking-Dienste
              eingebunden; die optionalen Kategorien lösen daher keine solchen Dienste aus. Eine Auswahl für eine
              optionale Kategorie aktiviert keine noch nicht eingebundenen Dienste.
            </p>
            <p>
              Sie können Ihre Auswahl jederzeit ändern oder eine zuvor erteilte Einwilligung widerrufen, indem Sie
              den Link „Cookie-Einstellungen“ im Footer öffnen und die Einstellungen speichern. Eine erteilte
              Einwilligung kann mit Wirkung für die Zukunft widerrufen werden. Soweit künftig optionale
              Technologien eingesetzt werden, erfolgt ein Zugriff auf Informationen in Ihrem Endgerät nur mit
              Ihrer vorherigen Einwilligung gemäß § 25 Abs. 1 TDDDG; die Verarbeitung personenbezogener Daten
              beruht dann auf Art. 6 Abs. 1 lit. a DSGVO.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Rechte der betroffenen Personen</h2>
          <div className={copyClass}>
            <p>
              Im Rahmen der gesetzlichen Voraussetzungen haben Sie das Recht auf Auskunft über Ihre
              personenbezogenen Daten (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO),
              Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie Datenübertragbarkeit (Art. 20 DSGVO).
            </p>
            <p>
              Soweit eine Verarbeitung auf Art. 6 Abs. 1 lit. e oder lit. f DSGVO beruht, können Sie aus Gründen,
              die sich aus Ihrer besonderen Situation ergeben, Widerspruch gegen die Verarbeitung einlegen
              (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
              widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren (Art. 77 DSGVO).
            </p>
            <p>
              Zur Ausübung Ihrer Rechte können Sie uns unter den in Abschnitt 1 genannten Kontaktdaten erreichen.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Auftragsverarbeitung</h2>
          <div className={copyClass}>
            <p>
              Externe Dienstleister, die personenbezogene Daten in unserem Auftrag und nach unseren Weisungen
              verarbeiten, dürfen nur im Rahmen der gesetzlichen Vorgaben eingesetzt werden. In diesem Fall
              schließen wir – soweit erforderlich – einen Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
            </p>
            <p>
              Die Projektkonfiguration sieht eine Veröffentlichung über GitHub Pages vor. Ob dieser Dienst die
              produktive Website hostet und welche datenschutzrechtlichen Vereinbarungen für den tatsächlichen
              Betrieb gelten, ist anhand der eingesetzten Hosting-Konfiguration zu bestätigen.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Änderungen dieser Datenschutzerklärung</h2>
          <div className={copyClass}>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Website, die von uns eingesetzten
              Verarbeitungsvorgänge oder die rechtlichen Anforderungen ändern. Es gilt die jeweils auf dieser
              Website veröffentlichte Fassung.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
