"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, UserRound } from "lucide-react";

type Testimonial = {
  name: string;
  position: string;
  quote: string;
  image: string | null;
};

const testimonials: Testimonial[] = [
  {
    name: "Kundenname",
    position: "Unternehmen · Funktion",
    quote: "Hier kann nach schriftlicher Freigabe eine echte Kundenstimme stehen.",
    image: null
  },
  {
    name: "Kundenname",
    position: "Unternehmen · Funktion",
    quote: "Dieser Platzhalter ist noch kein Kundenfeedback. Bitte durch ein freigegebenes Zitat ersetzen.",
    image: null
  },
  {
    name: "Kundenname",
    position: "Unternehmen · Funktion",
    quote: "Hier kann nach schriftlicher Freigabe eine weitere Kundenstimme ergänzt werden.",
    image: null
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
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Kundenstimmen werden erst nach Prüfung und schriftlicher Freigabe veröffentlicht.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div
            className="overflow-hidden border border-[#c6a052]/30 bg-[linear-gradient(135deg,#171717,#0f0f0f_58%,#17140f)] shadow-[0_24px_80px_rgba(0,0,0,.35)] touch-pan-y"
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
              className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  aria-hidden={activeIndex !== index}
                  aria-roledescription="Folie"
                  aria-label={`${index + 1} von ${testimonials.length}`}
                  className="flex w-full shrink-0 flex-col justify-between px-6 py-8 sm:px-12 sm:py-12 lg:px-16 lg:py-14"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <Quote aria-hidden="true" className="h-10 w-10 fill-[#c6a052]/15 text-[#c6a052] sm:h-14 sm:w-14" strokeWidth={1.5} />
                      <span className="border border-[#c6a052]/35 bg-[#c6a052]/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#dfc58e] sm:text-xs">
                        Platzhalter · nicht freigegeben
                      </span>
                    </div>
                    <blockquote className="max-w-3xl text-xl font-medium leading-relaxed tracking-[-0.02em] text-white sm:text-2xl sm:leading-relaxed lg:text-[1.7rem]">
                      „{testimonial.quote}“
                    </blockquote>
                  </div>
                  <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6 sm:mt-12">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c6a052]/45 bg-[#c6a052]/10 text-[#c6a052]">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={`Foto von ${testimonial.name}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex flex-col items-center gap-0.5">
                          <UserRound aria-hidden="true" size={19} />
                          <span className="text-[0.5rem] font-bold uppercase tracking-wider">Foto folgt</span>
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="mt-1 text-sm text-white/55">{testimonial.position}</p>
                    </div>
                  </div>
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
            <div className="flex items-center justify-center gap-3" aria-label="Kundenstimmen auswählen">
              {testimonials.map((_, index) => (
                <button
                  key={index}
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
