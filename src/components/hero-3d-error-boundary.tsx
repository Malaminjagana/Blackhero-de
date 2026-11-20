"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export function Hero3DFallback() {
  return (
    <div
      className="absolute inset-0 isolate overflow-hidden bg-[#171717]"
      role="status"
      aria-live="polite"
    >
      <Image
        src={assetPath("/images/black-heroes-banner.webp")}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-contain opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/65 to-[#171717]/80"
      />
      <div className="absolute inset-x-0 bottom-20 z-10 mx-auto max-w-xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#dfc58e]">
          Black Heroes Security
        </p>
        <p className="mt-3 text-sm text-white/75">
          Die interaktive 3D-Ansicht ist momentan nicht verfügbar.
        </p>
      </div>
    </div>
  );
}

export class Hero3DErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("The Black Heroes 3D hero failed to render.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Hero3DFallback />;
    }

    return this.props.children;
  }
}
