"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, UserRound } from "lucide-react";

type Testimonial = {
  name: string;
  position: string;
  quote: string;
  rating: 5;
};

const testimonials: Testimonial[] = [
  {
    name: "Dilane Junior Tacbissi Nimbote",
    position: "JT Umweltservice und Schädlingsbekämpfung",
    quote: "Super Unterstützung\n\nDie Kollegen waren super nett, sah sauber aus und haben gute Arbeit geleistet.",
    rating: 5
  },
  {
    name: "Nocce",
    position: "Agency",
    quote: "The treatment and service provided by the Black Heroes team are impeccable. I highly recommend them. My company has undoubtedly improved since we began working together, and they are very professional.",
    rating: 5
  },
  {
    name: "Andreas Sprang",
    position: "Berater",
    quote: "Schnelle Reaktionzeit, hohe Flexibilität, zuverlässig, pünktlich, starke Kundenorientierung, sehr korrekte Dienstdurchführung. Absolute Zufriedenheit.\n\nMacht weiter so Black Heros!",
    rating: 5
  }
];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const showSlide = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#090909] py-20 text-white sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(198,160,82,0.12),transparent_58%)]" />
      <div className="container relative">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="eyebrow !text-[#c6a052]">Stimmen unserer Kunden</div>
          <h2 id="testimonials-heading" className="section-title mx-auto text-white">
            Vertrauen, das im Einsatz entsteht.
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div
            role="group"
            aria-roledescription="Karussell"
            aria-label="Kundenstimmen"
            className="touch-pan-y overflow-hidden border border-[#c6a052]/30 bg-[linear-gradient(135deg,#171717,#0f0f0f_58%,#17140f)] shadow-[0_24px_80px_rgba(0,0,0,.35)]"
            onPointerDown={(event) => {
              pointerStartX.current = event.pointerType === "touch" ? event.clientX : null;
            }}
            onPointerUp={(event) => {
              if (pointerStartX.current === null) return;
              const distance = event.clientX - pointerStartX.current;
              pointerStartX.current = null;
              if (Math.abs(distance) < 48) return;
              showSlide(activeIndex + (distance < 0 ? 1 : -1));
            }}
            onPointerCancel={() => {
              pointerStartX.current = null;
            }}
          >
            <div
              aria-live="polite"
              className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  aria-hidden={activeIndex !== index}
                  aria-roledescription="Folie"
                  aria-label={`${index + 1} von ${testimonials.length}`}
                  className="flex min-h-[360px] w-full shrink-0 flex-col px-6 py-8 sm:min-h-[380px] sm:px-12 sm:py-12 lg:px-16 lg:py-14"
                >
                  <div className="mb-7 flex items-center justify-between gap-5">
                    <Quote
                      aria-hidden="true"
                      className="h-10 w-10 shrink-0 fill-[#c6a052]/15 text-[#c6a052] sm:h-14 sm:w-14"
                      strokeWidth={1.5}
                    />
                    <div
                      role="img"
                      aria-label={`${testimonial.rating} von 5 Sternen`}
                      className="flex shrink-0 gap-1 text-[#dfc58e]"
                    >
                      {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                        <Star
                          key={starIndex}
                          aria-hidden="true"
                          className="h-5 w-5 fill-current sm:h-6 sm:w-6"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="flex-1 whitespace-pre-line break-words text-lg font-medium leading-relaxed tracking-[-0.02em] text-white sm:text-2xl sm:leading-relaxed lg:text-[1.7rem]">
                    {testimonial.quote}
                  </blockquote>

                  <footer className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:pt-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c6a052]/45 bg-[#c6a052]/10 text-[#dfc58e] sm:h-14 sm:w-14">
                      <UserRound aria-hidden="true" size={21} />
                    </span>
                    <span className="min-w-0">
                      <span className="block break-words font-bold leading-snug text-white">{testimonial.name}</span>
                      <span className="mt-1 block break-words text-sm leading-6 text-white/55">{testimonial.position}</span>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Vorherige Kundenstimme"
              onClick={() => showSlide(activeIndex - 1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#c6a052] hover:text-[#dfc58e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a052]"
            >
              <ChevronLeft aria-hidden="true" size={21} />
            </button>
            <div className="flex items-center justify-center gap-3" role="group" aria-label="Kundenstimmen auswählen">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Kundenstimme ${index + 1} anzeigen`}
                  aria-pressed={activeIndex === index}
                  onClick={() => showSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a052] motion-reduce:transition-none ${
                    activeIndex === index ? "w-8 bg-[#c6a052]" : "w-2.5 bg-white/35 hover:bg-white/65"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Nächste Kundenstimme"
              onClick={() => showSlide(activeIndex + 1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#c6a052] hover:text-[#dfc58e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a052]"
            >
              <ChevronRight aria-hidden="true" size={21} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
