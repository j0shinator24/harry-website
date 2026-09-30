import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Phone, MessageSquare, Mail, Star, MapPin } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { PartnerCard } from "@/components/partner-card"
import { ZonesMap } from "@/components/zones-map"
import { FadeUpReveal } from "@/components/fade-up-reveal"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { InstagramProfile } from "@/components/instagram-profile"
import { BASE_URL, BUSINESS, RATES, SERVICES, PARTNERS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Melbourne Piano Movers & Removals | Harry The Piano Mover",
  description: BUSINESS.description,
  alternates: { canonical: "/" },
}

const buyRent = PARTNERS.filter((p) => p.category === "buy-rent")
// Mobile tuner + piano technician partners are temporarily hidden from the
// homepage. They'll live on a dedicated /partners (or similar) page once
// the broader directory features are ready. Data is still in constants.

const FAQ_ITEMS = [
  {
    q: "How much does it cost to move a piano in Melbourne?",
    a: "Inner Suburbs and CBD starts at $260 for an upright and $460 for a grand. Outer Suburbs is $340 / $570. Outer Melbourne is $420 / $650. Anything past that is a custom quote. Call or text and I'll work it out with you.",
  },
  {
    q: "Are you insured?",
    a: "Yes. Harry The Piano Mover carries public liability insurance (covers damage to your home or property on the day) and goods in transit / carriers insurance (covers the piano or any item while it's in the van). Both are active and current.",
  },
  {
    q: "What types of pianos do you move?",
    a: "Upright pianos, grand pianos and digital pianos. Ranging from brand-new to new-to-you, specialised in Japanese, Chinese, and European pianos.",
  },
  {
    q: "Can you move a piano up or down stairs?",
    a: "Of course! Our base rates are inclusive of three or four entry steps, or easy ramp access. Past that, tricky access adds $20 per step. Difficult access might require extra hands for an additional fee, from $200. Careful and creative approaches are what separate us from other movers.",
  },
  {
    q: "What areas do you cover?",
    a: "Greater Melbourne metro areas, Ballarat, Bendigo, Geelong, Lakes Entrance, Mornington Peninsula, Phillip Island. With enough notice, we can arrange pick up and delivery anywhere within Victoria, as well as interstate piano moves from Sydney to Adelaide.",
  },
  {
    q: "Do you dispose of unwanted pianos?",
    a: "Yes. If your piano is beyond repair I'll handle the removal, recycle what's worth saving, and dispose of the rest responsibly. Disposal is $320 upright / $420 grand / $820 upright pianola. It's often cheaper than a piano restoration quote that would never break even.",
  },
  {
    q: "Do you do anything other than pianos?",
    a: "Plenty. Furniture moves where a full removalist is overkill, Facebook Marketplace pickups and deliveries, gig load-in and load-out for bands (guitars, amps, drums, PA), event deliveries. If it fits in the van, it's worth a chat.",
  },
  {
    q: "Do you tune the pianos?",
    a: "I can play and move pianos, but tuning them is not one of my skills. Wait 3-4 weeks before having your piano tuned in the new space. I can help find a good tuner near you.",
  },
  {
    q: "How do I book?",
    a: "BOOKING_LINKS",
  },
] as const

// JSON-LD schema for the Friends of Mine section — just the buy/rent partners
// for now. The full tuners + technicians directory will get its own page
// with its own schema once that's built.
const partnersItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Friends of Mine: Melbourne piano sales and rentals recommended by Harry The Piano Mover",
  description:
    "Hand-picked Melbourne piano sales and rental businesses that Harry recommends to customers buying or hiring a piano.",
  numberOfItems: buyRent.length,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: buyRent.map((p, i) => {
    const item: Record<string, unknown> = {
      "@type": "LocalBusiness",
      name: p.name,
      areaServed: "Melbourne, Victoria, Australia",
    }
    if (p.website) item.url = p.website
    if (p.phoneIntl) item.telephone = p.phoneIntl
    if (typeof p.reviews === "number" && p.reviews > 0) {
      item.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviews,
        bestRating: 5,
        worstRating: 1,
      }
    }
    return {
      "@type": "ListItem",
      position: i + 1,
      item,
    }
  }),
}

// Service @graph: each thing Harry does as a discrete schema.org Service tied
// back to the business entity. Helps Google understand service breadth for
// long-tail queries ("piano disposal melbourne", "marketplace piano delivery")
// that feed the head terms. Invisible structured data — no page change.
// Prices pulled from RATES so schema can't drift from the visible rate table.
const innerRate = RATES.find((r) => r.label === "Inner Suburbs & CBD")
const outerMelb = RATES.find((r) => r.label === "Outer Melbourne")
const disposalRate = RATES.find((r) => r.label === "Piano Disposal")

const SERVICE_GEO = {
  "@type": "City",
  name: "Melbourne",
  containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" },
}

const servicesGraph = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => {
    const node: Record<string, unknown> = {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-${s.icon}`,
      name: `${s.title} Melbourne`,
      serviceType: s.title,
      description: s.blurb,
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: SERVICE_GEO,
    }
    if (s.title === "Piano Moving" && innerRate && outerMelb) {
      node.offers = {
        "@type": "AggregateOffer",
        priceCurrency: "AUD",
        lowPrice: innerRate.upright,
        highPrice: outerMelb.grand,
        offerCount: 6,
      }
    }
    if (s.title === "Piano Disposal" && disposalRate) {
      const prices = [disposalRate.upright, disposalRate.grand, ...(disposalRate.extras ?? []).map((e) => e.price)]
      node.offers = {
        "@type": "AggregateOffer",
        priceCurrency: "AUD",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
      }
    }
    return node
  }),
}

// FAQPage JSON-LD so Google can render the FAQ as a rich result.
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a === "BOOKING_LINKS"
        ? `Call or text ${BUSINESS.phone}, or email ${BUSINESS.email}. I'll get back within a few hours.`
        : item.a,
    },
  })),
}

// Inline Instagram glyph: lucide-react@1.x doesn't export Instagram.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      {/* HERO with faded piano backdrop. Layered: bg photo + gradient wash + content. */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,28,28,0.6) 0%, rgba(107,76,154,0.4) 50%, rgba(74,74,160,0.6) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl px-4 sm:px-5 pt-16 pb-16 fade-up">
          <Image
            src="/logo-on-dark.png"
            alt="Harry The Piano Mover"
            width={260}
            height={260}
            priority
            className="w-40 sm:w-52 md:w-64 h-auto mx-auto mb-6 sm:mb-8 float-anim drop-shadow-2xl"
          />
          <h1
            className="font-heading font-medium text-[2.5rem] sm:text-6xl lg:text-7xl leading-none mb-4 sm:mb-5 text-white"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            Melbourne&apos;s Specialist
            <br />
            <span className="text-gold font-bold">Piano Mover</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/90 mb-3 italic leading-relaxed">
            Uprights, Grands &amp; Digitals.
          </p>
          <a
            href={BUSINESS.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl sm:text-2xl text-gold mb-6 sm:mb-8 py-2 px-1 hover:text-tangerine transition-colors duration-200"
            style={{ textShadow: "0 2px 10px rgba(245,183,66,0.5)" }}
          >
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <span className="ml-1">Reviews!</span>
          </a>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center items-center px-2 sm:px-0">
            <a
              href={`tel:${BUSINESS.phoneInternational}`}
              className="inline-flex items-center justify-center gap-2 bg-tangerine text-white font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-coral hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(245,140,90,0.4)" }}
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
            <a
              href={`sms:${BUSINESS.phoneInternational}?&body=Hi%20Harry%2C%20I%27d%20like%20a%20quote%20for...`}
              className="inline-flex items-center justify-center gap-2 bg-grape text-white font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-plum hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(107,76,154,0.4)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Text Harry
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold text-base text-white border-2 border-white/50 w-full sm:w-auto px-7 py-4 rounded-full hover:border-white hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" />
              Email Harry
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <div
              className="relative w-full sm:w-52 h-48 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              <Image
                src="/harry-piano-1.jpg"
                alt="Harry playing piano with Melbourne skyline"
                fill
                sizes="(max-width: 640px) 100vw, 208px"
                className="object-cover"
                style={{ objectPosition: "center 72%" }}
              />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-3 sm:mb-4">
                Hey, I&apos;m Harry
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                Trust in your piano being moved by an experienced piano mover &amp; player.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                See our rates below for piano relocation around Melbourne.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                Not just pianos! Event deliveries, furniture moving, marketplace pick-ups, gig
                equipment deliveries, whatever you need to put in a van.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                Please enquire via email or phone about pianos or other items you may need
                transported. We have a versatile van to assist in relocating what you need safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW A PIANO MOVE WORKS — Harry's own copy. Hybrid disclosure pattern:
          first paragraph is the visible hook; the step-by-step detail is hidden
          behind a native <details> so mobile users get a scannable section but
          the full text is in the HTML source (still crawled + ranked by Google,
          per mobile-first indexing). CSS-only toggle — works in any WebView. */}
      <section id="how-it-works" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-3 sm:mb-4">
            How a piano move works
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Pianos aren&apos;t furniture. They&apos;re heavy, awkward, and sentimental beyond any
            monetary value. Here&apos;s how we work.
          </p>
          <details className="group mt-4">
            <summary className="cursor-pointer select-none inline-flex items-center gap-2 font-heading font-bold text-grape hover:text-tangerine transition-colors list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-block text-lg leading-none transition-transform group-open:rotate-90">
                ▸
              </span>
              <span>Read the full process</span>
            </summary>
            <div className="mt-4 space-y-3 text-base sm:text-lg leading-relaxed">
              <p>
                When booking your move, we confirm everything we need to know: where the piano is
                going to &amp; from, what size / brand / model is the piano, what the access is
                like (stairs, narrow or difficult paths), and when you&apos;d like your piano
                moved.
              </p>
              <p>
                On the day, we protect your floors and anywhere the piano could come close to
                touching. The piano is lifted onto our custom-made piano dolly and wheeled safely
                into the van where it is secured and ready to go. For grand pianos, a similar
                process except we remove the lyre, legs, music stand, and lid to be as careful as
                possible. We use a ramp for 5 or fewer steps, and custom-made equipment to go up
                or down more than 5 steps.
              </p>
              <p>
                Careful &amp; creative access is what separates us from a couple blokes off
                Airtasker. We place the piano where you want it, pedantry included. Advice for
                environmental factors of the room, long-term protection of your floors, and where
                it acoustically will flourish.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
        >
          Specialty Services
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s) => (
            <FeatureCard key={s.title} title={s.title} description={s.blurb} image={s.image} imageAlt={`${s.title} service in Melbourne by Harry The Piano Mover`} />
          ))}
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-6 sm:py-8 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 fade-up">
          {[
            { src: "/harry-piano-1.jpg", alt: "Harry playing piano overlooking Melbourne" },
            { src: "/harry-piano-2.jpg", alt: "Grand piano on a Melbourne rooftop at sunset" },
            { src: "/harry-piano-3.jpg", alt: "Piano outdoors with the Melbourne skyline" },
          ].map((p) => (
            <div
              key={p.src}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden h-32 sm:h-52 md:h-72"
              style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.2)" }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* ZONES */}
      <section id="zones" className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
        >
          Where I Move
        </h2>
        <div className="max-w-5xl mx-auto fade-up">
          <ZonesMap />
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mt-5 sm:mt-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#F5B742", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Inner Suburbs &amp; CBD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#F06681", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Outer Suburbs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#9B4D9E", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Outer Melbourne</span>
            </div>
          </div>
          <p className="text-center text-white/70 text-xs sm:text-sm mt-3 inline-flex items-center gap-1.5 w-full justify-center">
            <MapPin className="h-3.5 w-3.5" />
            Anything beyond?{" "}
            <Link href="#contact" className="text-gold hover:underline">
              Call or text for a quote.
            </Link>
          </p>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-grape text-center mb-6 sm:mb-10">
            Rates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {RATES.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl p-4 sm:p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${r.toneFrom}, ${r.toneTo})` }}
              >
                <h3 className="font-heading font-bold text-base sm:text-lg mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/30">
                  {r.label}
                </h3>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-sm sm:text-base">Upright Piano</span>
                  <span className="font-heading font-bold text-lg sm:text-xl">${r.upright}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-sm sm:text-base">Grand Piano</span>
                  <span className="font-heading font-bold text-lg sm:text-xl">${r.grand}</span>
                </div>
                {r.extras?.map((e) => (
                  <div key={e.label} className="flex justify-between items-center py-1.5">
                    <span className="text-sm sm:text-base">{e.label}</span>
                    <span className="font-heading font-bold text-lg sm:text-xl">${e.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="text-center text-sm sm:text-base text-gray-600 bg-gray-100 rounded-xl p-4 sm:p-5 leading-relaxed">
            Outer Melbourne &amp; interstate prices vary, please{" "}
            <Link href="#contact" className="text-grape font-bold hover:underline py-1 inline-block">
              contact
            </Link>{" "}
            for a chat.
            <br />
            Access to property with less than four steps / easy to ramp are prices above.
            <br />
            Difficult access may procure a higher fee at{" "}
            <strong className="text-gray-800">$20 per step</strong> or fees in excess of{" "}
            <strong className="text-gray-800">$200</strong> if extra staff are needed.
          </div>
        </div>
      </section>

      {/* Suburbs I cover. Sits below Rates (Harry's request, Sep 2026) so
          prices come first and the named-suburb list backs them up. */}
      <section className="pb-14 sm:pb-20 px-4 sm:px-5">
        <div
          id="suburbs"
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-grape text-center mb-3 sm:mb-4">
            Suburbs I cover
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            I move pianos right across Greater Melbourne. Here&apos;s roughly how the rate zones
            fall:
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-3">
            <strong className="text-grape">Inner suburbs &amp; CBD:</strong> Melbourne CBD,
            Carlton, Fitzroy, Collingwood, Richmond, South Yarra, Prahran, St Kilda, Brunswick,
            Northcote, Footscray, Yarraville, Port Melbourne, Docklands.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-3">
            <strong className="text-grape">Outer suburbs:</strong> Preston, Coburg, Essendon,
            Moonee Ponds, Box Hill, Camberwell, Hawthorn, Kew, Caulfield, Bentleigh, Brighton,
            Glen Waverley, Doncaster, Reservoir, Heidelberg, Sunshine.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            <strong className="text-grape">Outer Melbourne:</strong> Frankston, Dandenong,
            Werribee, Cranbourne, Pakenham, Sunbury, Melton, Berwick, Ringwood, Lilydale,
            Craigieburn, Point Cook, Mornington.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            Further out? I also cover Geelong, Ballarat, Bendigo, the Mornington Peninsula,
            Phillip Island and Lakes Entrance, and with enough notice I can move a piano anywhere
            in Victoria, or interstate between Sydney and Adelaide. Not sure which zone you&apos;re
            in? Call or text and I&apos;ll tell you straight away.
          </p>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-bold text-xl sm:text-2xl text-center mb-6 sm:mb-8 fade-up text-white"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        >
          See the Moves
        </h2>
        <div className="max-w-lg mx-auto fade-up">
          <InstagramProfile url={BUSINESS.instagram} />
        </div>
      </section>

      {/* PROTECTION */}
      <section id="protection" className="py-14 sm:py-20 px-4 sm:px-5">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
          >
            Protection
          </h2>
          <div
            className="glass rounded-3xl p-6 sm:p-8 md:p-10 fade-up"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          >
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold text-[#1C1C1C] font-bold"
                >
                  ✓
                </span>
                <div>
                  <p className="font-heading font-bold text-base sm:text-lg text-white">
                    Public liability insurance
                  </p>
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                    Covers damage to your home or property during a job.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold text-[#1C1C1C] font-bold"
                >
                  ✓
                </span>
                <div>
                  <p className="font-heading font-bold text-base sm:text-lg text-white">
                    Goods in transit (carriers) insurance
                  </p>
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                    Covers your piano, furniture, and equipment while it&apos;s in the van.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-14 sm:py-20 px-4 sm:px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <h2
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-3 text-white"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
            >
              Friends of Mine
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              For buying or hiring a piano in Melbourne, these are the folks I recommend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {buyRent.map((p) => (
              <PartnerCard key={p.name} p={p} />
            ))}
          </div>

          <p className="mt-10 max-w-xl mx-auto text-center text-xs sm:text-sm text-white/55 leading-relaxed border-l-2 border-white/30 pl-3">
            A full directory of Melbourne piano tuners and technicians is coming to a separate page.
            No paid placements.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 sm:py-20 px-4 sm:px-5">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
          >
            Frequently Asked
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={item.q}
                className="glass rounded-2xl px-5 sm:px-6 py-4 sm:py-5 fade-up group"
                style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-heading font-bold text-base sm:text-lg text-white">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 text-gold transition-transform duration-200 group-open:rotate-45 text-2xl leading-none"
                  >
                    +
                  </span>
                </summary>
                {item.a === "BOOKING_LINKS" ? (
                  <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed">
                    Call or text{" "}
                    <a href={`tel:${BUSINESS.phoneInternational}`} className="text-gold hover:underline font-bold">
                      {BUSINESS.phone}
                    </a>
                    , or email{" "}
                    <a href={`mailto:${BUSINESS.email}`} className="text-gold hover:underline font-bold">
                      {BUSINESS.email}
                    </a>
                    . I&apos;ll get back within a few hours.
                  </p>
                ) : (
                  <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed">{item.a}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-2xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape text-center mb-5 sm:mb-8">
            Reach Out
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            <a
              href={`tel:${BUSINESS.phoneInternational}`}
              className="inline-flex items-center justify-center gap-2 bg-tangerine text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-coral hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <a
              href={`sms:${BUSINESS.phoneInternational}?&body=Hi%20Harry%2C%20I%27d%20like%20a%20quote%20for...`}
              className="inline-flex items-center justify-center gap-2 bg-plum text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-magenta hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <MessageSquare className="h-4 w-4" />
              Text Harry
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center gap-2 bg-grape text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-indigo hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" />
              Email Harry
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="py-14 sm:py-20 px-4 sm:px-5 fade-up">
        <ReviewsCarousel />
      </section>

      <FadeUpReveal />
    </>
  )
}
