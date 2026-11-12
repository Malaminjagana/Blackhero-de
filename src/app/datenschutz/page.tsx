export default function DatenschutzPage() {
  return <main className="container min-h-[60vh] py-20">
    <div className="eyebrow">Rechtliches</div><h1 className="section-title">Datenschutzerklärung</h1>
    <p className="section-copy">Dies ist nur eine Strukturvorlage und keine fertige Datenschutzerklärung. Sie muss anhand der tatsächlich eingesetzten Dienste, Hosting-Konfiguration, Cookies, Analysewerkzeuge und Formulare rechtlich geprüft und vervollständigt werden.</p>
    <div className="mt-10 max-w-3xl space-y-8 leading-8">
      <section><h2 className="text-xl font-extrabold">1. Verantwortlicher</h2><p>[Unternehmensname, Anschrift und Kontakt der verantwortlichen Stelle eintragen.]</p></section>
      <section><h2 className="text-xl font-extrabold">2. Hosting und Server-Logfiles</h2><p>Angaben zum Hosting-Anbieter, den verarbeiteten Server-Logdaten, Rechtsgrundlage und Speicherdauer ergänzen.</p></section>
      <section><h2 className="text-xl font-extrabold">3. Kontaktaufnahme</h2><p>Beschreiben Sie, welche Daten bei Kontaktaufnahme verarbeitet werden, zu welchem Zweck und wie lange diese gespeichert werden.</p></section>
      <section><h2 className="text-xl font-extrabold">4. Empfänger und Drittlandübermittlungen</h2><p>Alle eingesetzten Auftragsverarbeiter und Dienste sowie etwaige Übermittlungen in Drittländer aufführen.</p></section>
      <section><h2 className="text-xl font-extrabold">5. Rechte betroffener Personen</h2><p>Informationen zu Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und Beschwerderecht ergänzen.</p></section>
    </div>
  </main>;
}
