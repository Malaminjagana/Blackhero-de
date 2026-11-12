"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { Hero3DErrorBoundary } from "@/components/hero-3d-error-boundary";

const WorkstationCanvas = dynamic(() => import("@/components/hero-3d-canvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden="true" />
});

const HERO_HEADLINE = "Sicherheit, auf die Sie sich verlassen können.";
const HERO_HEADLINE_ACCENT_START = HERO_HEADLINE.indexOf("verlassen");
const HERO_HEADLINE_ACCENT_END = HERO_HEADLINE_ACCENT_START + "verlassen".length;
const HERO_HEADLINE_CHARACTER_DELAY_MS = 55;
const HERO_HEADLINE_ERASE_DELAY_MS = 32;
const HERO_HEADLINE_HOLD_MS = 1400;
const HERO_HEADLINE_PAUSE_MS = 900;

export function Hero3D() {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let timer: number;

    const eraseNextCharacter = (visible: number) => {
      if (!active) return;

      if (visible > 0) {
        const nextVisible = visible - 1;
        setVisibleCharacters(nextVisible);
        timer = window.setTimeout(
          () => eraseNextCharacter(nextVisible),
          HERO_HEADLINE_ERASE_DELAY_MS
        );
        return;
      }

      timer = window.setTimeout(
        () => typeNextCharacter(0),
        HERO_HEADLINE_PAUSE_MS
      );
    };

    const typeNextCharacter = (visible: number) => {
      if (!active) return;

      if (visible < HERO_HEADLINE.length) {
        const nextVisible = visible + 1;
        setVisibleCharacters(nextVisible);
        timer = window.setTimeout(
          () => typeNextCharacter(nextVisible),
          HERO_HEADLINE_CHARACTER_DELAY_MS
        );
        return;
      }

      timer = window.setTimeout(
        () => eraseNextCharacter(visible),
        HERO_HEADLINE_HOLD_MS
      );
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      window.clearTimeout(timer);
      if (event.matches) {
        setVisibleCharacters(HERO_HEADLINE.length);
      } else {
        setVisibleCharacters(0);
        timer = window.setTimeout(
          () => typeNextCharacter(0),
          HERO_HEADLINE_PAUSE_MS
        );
      }
    };

    if (reducedMotion.matches) {
      setVisibleCharacters(HERO_HEADLINE.length);
    } else {
      timer = window.setTimeout(() => typeNextCharacter(0), 0);
    }

    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    return () => {
      active = false;
      window.clearTimeout(timer);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <section
      className="relative isolate min-h-[800px] overflow-hidden bg-[#202020] text-white sm:min-h-[740px] lg:min-h-[690px]"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_78%,rgba(198,160,82,.16),transparent_44%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#171717] via-[#171717]/75 to-[#171717]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0"
        role="img"
        aria-label="Interactive 3D workstation. Drag to rotate it; zoom is disabled."
      >
        <Hero3DErrorBoundary>
          <WorkstationCanvas />
        </Hero3DErrorBoundary>
      </div>

      <div className="container relative z-10 flex min-h-[800px] items-center py-20 sm:min-h-[740px] lg:min-h-[690px]">
        <div className="max-w-3xl">
          <div className="mb-7 w-fit">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Image
                src={assetPath("/images/dekra-din-77200-1.avif")}
                alt="DEKRA Sicherungsdienstleistungen DIN 77200-1"
                width={256}
                height={478}
                sizes="48px"
                className="h-11 w-auto object-contain"
              />
              <Image
                src={assetPath("/images/dekra-iso-9001.avif")}
                alt="DEKRA Qualitätsmanagement ISO 9001"
                width={256}
                height={354}
                sizes="48px"
                className="h-11 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#dfc58e]">
              <span className="h-px w-10 bg-[#c6a052]" />
              Black Heroes Security · Berlin &amp; Brandenburg
            </div>
          </div>
          <h1
            id="hero-title"
            aria-label={HERO_HEADLINE}
            className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl"
          >
            <span aria-hidden="true" className="whitespace-pre-wrap">
              {Array.from(HERO_HEADLINE, (character, index) => (
                <span
                  key={index}
                  className={`hero-title-letter ${
                    index >= HERO_HEADLINE_ACCENT_START &&
                    index < HERO_HEADLINE_ACCENT_END
                      ? "text-[#c6a052]"
                      : ""
                  } ${
                    index < visibleCharacters
                      ? "hero-title-letter-visible"
                      : ""
                  }`}
                >
                  {character}
                  {index === visibleCharacters - 1 && (
                    <span className="hero-title-caret" />
                  )}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">
            
          </p>
        </div>
        
      </div>




      <a
        href="#ueber-uns"
        className="absolute bottom-6 left-1/2 z-10 flex h-14 w-8 -translate-x-1/2 items-start justify-center rounded-full border-2 border-white/70 p-2"
        aria-label="Zum Bereich Über Black Heroes scrollen"
      >
        <span className="hero-scroll-dot h-2 w-2 rounded-full bg-[#dfc58e]" />
      </a>
    </section>
    
  );
}
