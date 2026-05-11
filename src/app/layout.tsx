import type { Metadata } from "next"
import { Alegreya } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SunsetBackdrop } from "@/components/sunset-backdrop"
import { BASE_URL, BUSINESS } from "@/lib/constants"
import "./globals.css"

const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Piano Mover Melbourne | Harry The Piano Mover",
    template: "%s | Harry The Piano Mover",
  },
  description: BUSINESS.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: BUSINESS.name,
    title: "Piano Mover Melbourne | Harry The Piano Mover",
    description: BUSINESS.description,
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/harry-piano-1.jpg`, width: 1200, height: 800, alt: "Harry The Piano Mover — specialist piano moving in Melbourne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piano Mover Melbourne | Harry The Piano Mover",
    description: BUSINESS.description,
    images: [`${BASE_URL}/harry-piano-1.jpg`],
  },
  robots: { index: true, follow: true },
  // Bing WMT: verified via GSC import — no msvalidate.01 token needed
  verification: {
    google: "3GWShraF4OstDOWi08d-0J89relFpHWCuYvfSIrCj1I",
  },
}

const movingCompanyJsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": `${BASE_URL}/#business`,
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  telephone: BUSINESS.phoneInternational,
  email: BUSINESS.email,
  priceRange: "$$",
  currenciesAccepted: "AUD",
  areaServed: [
    {
      "@type": "City",
      name: "Melbourne",
      containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" },
    },
    {
      "@type": "GeoCircle",
      name: "Greater Melbourne service area",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
      geoRadius: "60000",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  sameAs: [BUSINESS.instagram, BUSINESS.googleReviews],
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#harry`,
  name: "Harry",
  jobTitle: "Piano Mover",
  worksFor: { "@id": `${BASE_URL}/#business` },
  description: "Melbourne piano mover and pianist. Sole operator of Harry The Piano Mover.",
  knowsAbout: ["Piano moving", "Piano disposal", "Piano playing", "Furniture moving"],
  sameAs: [BUSINESS.instagram],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${alegreya.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="relative min-h-full flex flex-col text-white overflow-x-hidden" suppressHydrationWarning>
        <SunsetBackdrop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompanyJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-[#1C1C1C] focus:text-sm"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
