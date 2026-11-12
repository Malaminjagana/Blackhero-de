import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Black Heroes Security | Sicherheit mit Vertrauen",
  description: "Professionelle Sicherheitsdienstleistungen in Berlin und Brandenburg. Objekt-, Event- und Revierdienst mit Verantwortung und Vertrauen.",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
