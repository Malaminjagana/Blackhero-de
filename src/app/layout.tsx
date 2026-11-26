import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsentAwareGoogleTagManager, CookieConsentProvider } from "@/components/cookie-consent";
import { assetPath } from "@/lib/asset-path";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: HOME_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },
  icons: {
    icon: assetPath("/favicon.ico")
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1349,
        height: 784,
        alt: "Black Heroes Security"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SOCIAL_IMAGE]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <CookieConsentProvider>
          <ConsentAwareGoogleTagManager />
          <Navbar />
          {children}
          <Footer />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
