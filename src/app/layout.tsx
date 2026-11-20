import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieConsentProvider } from "@/components/cookie-consent";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Black Heroes Security | Sicherheit mit Vertrauen",
  description: "Professionelle Sicherheitsdienstleistungen in Berlin und deutschlandweit. Objekt-, Event- und Revierdienst mit Verantwortung und Vertrauen.",
  icons: {
    icon: assetPath("/images/black-heroes-logo-transparent.webp")
  },
  metadataBase: new URL("https://blackheroes.de"),
  openGraph: {
    title: "Black Heroes Security",
    description: "Sicherheit mit Vertrauen.",
    url: "https://blackheroes.de",
    siteName: "Black Heroes Security",
    locale: "de_DE",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <CookieConsentProvider>
          <Navbar />
          {children}
          <Footer />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
