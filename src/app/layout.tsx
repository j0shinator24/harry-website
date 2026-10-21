import type { Metadata } from "next"
import { Alegreya } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SunsetBackdrop } from "@/components/sunset-backdrop"
import { SkylineBand } from "@/components/skyline-band"
import { StickyCta } from "@/components/sticky-cta"
import { IconSprite } from "@/components/icons"
import { BASE_URL, BUSINESS, HOURS, OG_IMAGE } from "@/lib/constants"
import "./globals.css"

const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})

// Site-wide defaults. Pages set their own title, canonical and Open Graph url;
// nothing here names a canonical or a robots value, so the 404 page never
// inherits the homepage's canonical or an "index" next to its "noindex".
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: BUSINESS.name,
    template: "%s | Harry The Piano Mover",
  },
  description: BUSINESS.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: BUSINESS.name,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  // Bing WMT: verified via GSC import, no msvalidate.01 token needed
  verification: {
    google: "3GWShraF4OstDOWi08d-0J89relFpHWCuYvfSIrCj1I",
  },
}

// One @graph for the entities every page shares: the website, the business
// and Harry. Pages add their own nodes and point back here by @id.
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: BUSINESS.name,
      inLanguage: "en-AU",
      publisher: { "@id": `${BASE_URL}/#business` },
    },
    {
      "@type": "MovingCompany",
      "@id": `${BASE_URL}/#business`,
      name: BUSINESS.name,
      // Entity disambiguation for search and AI engines, which have confused
      // this business with a similarly named general removalist.
      disambiguatingDescription:
        "Specialist piano mover in Melbourne, owner-operated by Harry, a pianist, with an assistant on most moves. Not a general furniture removalist, and not affiliated with any similarly named removalist.",
      description: BUSINESS.description,
      url: `${BASE_URL}/`,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 512, height: 512 },
      image: [`${BASE_URL}${OG_IMAGE.url}`, `${BASE_URL}/harry-piano-1.jpg`],
      telephone: BUSINESS.phoneInternational,
      email: BUSINESS.email,
      priceRange: "$$",
      currenciesAccepted: "AUD",
      openingHoursSpecification: HOURS.spec.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
      founder: { "@id": `${BASE_URL}/#harry` },
      // Areas mirror the visible FAQ ("Greater Melbourne metro, Ballarat,
      // Bendigo, Geelong, Lakes Entrance, Mornington Peninsula, Phillip
      // Island; anywhere in Victoria with notice"). Schema never claims more.
      areaServed: [
        { "@type": "City", name: "Melbourne", containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" } },
        { "@type": "City", name: "Geelong", containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" } },
        { "@type": "City", name: "Ballarat", containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" } },
        { "@type": "City", name: "Bendigo", containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" } },
        { "@type": "Place", name: "Mornington Peninsula" },
        { "@type": "Place", name: "Phillip Island" },
        { "@type": "Place", name: "Lakes Entrance" },
        { "@type": "AdministrativeArea", name: "Victoria" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
      hasMap: BUSINESS.googleMapsCid,
      sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.googleMapsPlace, BUSINESS.googleMapsCid],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#harry`,
      name: "Harry",
      jobTitle: "Piano Mover",
      worksFor: { "@id": `${BASE_URL}/#business` },
      description: "Melbourne piano mover and pianist. Owner-operator of Harry The Piano Mover, with an assistant on most moves.",
      // The homepage photo of Harry at the piano (its alt text names him).
      image: `${BASE_URL}/harry-piano-1.jpg`,
      knowsAbout: ["Piano moving", "Piano disposal", "Piano playing", "Pianola moving"],
      sameAs: [BUSINESS.instagram],
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${alegreya.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="relative min-h-full flex flex-col text-white overflow-x-hidden" suppressHydrationWarning>
        <SunsetBackdrop />
        <IconSprite />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        <a
          href="#main"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1 relative z-10">{children}</main>
        <SkylineBand />
        <Footer />
        <StickyCta />
      </body>
    </html>
  )
}
