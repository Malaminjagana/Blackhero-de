export default function ImpressumPage() {
  return (
    <main className="container min-h-[60vh] py-16 sm:py-20">
      <div className="eyebrow">Rechtliches</div>
      <h1 className="section-title">Impressum</h1>
      <div className="mt-8 max-w-2xl space-y-7 text-sm leading-7 text-[#55524d] sm:text-base">
        <section>
          <h2 className="font-extrabold text-[#202020]">Angaben gemäß § 5 DDG</h2>
          <p className="mt-2">
            Black Heroes Security GmbH<br />
            Hauptstraße 117<br />
            10827 Berlin
          </p>
        </section>
        <section>
          <h2 className="font-extrabold text-[#202020]">Vertreten durch:</h2>
          <p className="mt-2">Geschäftsführer Moussa Traore</p>
        </section>
        <section>
          <h2 className="font-extrabold text-[#202020]">Kontakt:</h2>
          <p className="mt-2">
            Telefon: <a className="font-semibold text-[#96702f] underline-offset-4 hover:underline" href="tel:+491776105240">+49 177 6105240</a><br />
            E-Mail: <a className="font-semibold text-[#96702f] underline-offset-4 hover:underline" href="mailto:support@blackheroessecurity.de">support@blackheroessecurity.de</a>
          </p>
        </section>
        <section>
          <h2 className="font-extrabold text-[#202020]">Registereintrag:</h2>
          <p className="mt-2">
            Registergericht: Amtsgericht Charlottenburg<br />
            Registernummer: HRB 281367
          </p>
        </section>
        <section>
          <h2 className="font-extrabold text-[#202020]">Umsatzsteuer-ID:</h2>
          <p className="mt-2">DE462628696</p>
        </section>
        <section>
          <h2 className="font-extrabold text-[#202020]">Zuständige Aufsichtsbehörde:</h2>
          <p className="mt-2">Gewerbeamt Schöneberg</p>
        </section>
      </div>
    </main>
  );
}
