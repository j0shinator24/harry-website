/* eslint-disable @next/next/no-img-element -- static export with unoptimised images; a plain img ships no client JS */
import type { Metadata } from "next"
import { Phone, MessageSquare, Mail, MapPin, StarIcon } from "@/components/icons"
import { ArrowLink } from "@/components/arrow-link"
import { FeatureCard } from "@/components/feature-card"
import { PartnerCard } from "@/components/partner-card"
import { ZonesMap } from "@/components/zones-map"
import { FadeUpReveal } from "@/components/fade-up-reveal"
import { ReviewsGrid } from "@/components/reviews-grid"
import { PhotoGallery } from "@/components/photo-gallery"
import { RateCards } from "@/components/rate-cards"
import { CallTextButtons } from "@/components/call-text-buttons"
import { Picture } from "@/components/picture"
import { RATES_CONFIRMED, disposalOffer, movingOffers } from "@/lib/rates"
import { ACCESS_FEES, BASE_URL, BUSINESS, LAST_UPDATED, LLMS_ALTERNATE, OG_IMAGE, RATES, SERVICES, PARTNERS, SMS_QUOTE_HREF } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Harry The Piano Mover | Piano Movers Melbourne & Piano Removals",
  description: BUSINESS.description,
  alternates: { canonical: "/", types: LLMS_ALTERNATE },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: BUSINESS.name,
    title: "Harry The Piano Mover | Piano Movers Melbourne & Piano Removals",
    description: BUSINESS.description,
    url: `${BASE_URL}/`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harry The Piano Mover | Piano Movers Melbourne & Piano Removals",
    description: BUSINESS.description,
    images: [OG_IMAGE.url],
  },
}

const buyRent = PARTNERS.filter((p) => p.category === "buy-rent")
// Tuner and technician partners stay in constants but are not shown.

// Rate lookups. FAQ answers and schema read prices from RATES so nothing on the
// page can drift from the visible rate table when Harry changes his prices.
const innerRate = RATES.find((r) => r.label === "Inner Suburbs & CBD")!
const outerSub = RATES.find((r) => r.label === "Outer Suburbs")!
const outerMelb = RATES.find((r) => r.label === "Outer Melbourne")!
const disposalRate = RATES.find((r) => r.label === "Piano Disposal")!
const pianolaDisposal = disposalRate.extras?.[0]
const movingZones = RATES.filter((r) => r.label !== disposalRate.label)

// "How a piano move works", shown as numbered steps (copy via Ghostwriter).
const HOW_STEPS = [
  {
    title: "Tell me about the move.",
    text: "When you book, I confirm where the piano is going from and to, its size, brand and model, what the access is like (stairs, narrow or difficult paths), and when you'd like it moved.",
  },
  {
    title: "Floors protected first.",
    text: "On the day, I protect your floors and anywhere the piano could come close to touching.",
  },
  {
    title: "Onto the dolly, into the van.",
    text: "The piano is lifted onto my custom-made piano dolly and wheeled into the van, where it's secured and ready to go. For a grand, I remove the lyre, legs, music stand and lid first.",
  },
  {
    title: "The right gear for steps.",
    text: "I use a ramp for 4 or fewer steps, and custom-made equipment to go up or down more than 4.",
  },
  {
    title: "Placed where you want it.",
    text: "I place the piano where you want it, pedantry included, with advice on the room, long-term protection of your floors, and where it will sound best. I play piano myself.",
  },
] as const

const FAQ_ITEMS = [
  {
    q: "How much does it cost to move a piano in Melbourne?",
    a: `Inner Suburbs and CBD starts at $${innerRate.upright} for an upright and $${innerRate.grand} for a grand. Outer Suburbs is $${outerSub.upright} / $${outerSub.grand}. Outer Melbourne is $${outerMelb.upright} / $${outerMelb.grand}. If a move crosses zones, the higher zone's rate applies. Anything past that is a custom quote. All prices include GST. Call or text and I'll work it out with you.`,
  },
  {
    q: "Are you insured?",
    a: "Yes. My public liability insurance covers your home or property during the move. My goods in transit (carriers) insurance covers your piano while it's in my care and while it travels in the van. Both are active and current.",
  },
  {
    q: "What types of pianos do you move?",
    a: "Upright pianos, grand pianos and digital pianos. Ranging from brand-new to new-to-you, specialised in Japanese, Chinese, and European pianos.",
    more: { href: "/piano-types/", label: "How I move each type of piano" },
  },
  {
    q: "Can you move a piano up or down stairs?",
    a: `Of course, and my base rates include up to 4 entry steps, or easy ramp access. Past that, tricky access adds $${ACCESS_FEES.perStep} per step. More than 4 steps that can't take a simple ramp need a third person, for an additional fee from $${ACCESS_FEES.extraHandsFrom}. Careful and creative approaches are what set me apart from other movers.`,
    more: { href: "/piano-stairs-difficult-access/", label: "Stairs and difficult access" },
  },
  {
    // Harry's own wording (17 Oct 2026), punctuation only.
    q: "Where should the piano go in a room?",
    a: "Pianos should be kept away from outside walls and windows, but wherever you want it, pedantry included! I can give advice on the room's environmental factors and where it will look and sound best.",
  },
  {
    q: "What areas do you cover?",
    a: "I cover Greater Melbourne, Ballarat, Bendigo, Geelong, Lakes Entrance, the Mornington Peninsula and Phillip Island. With enough notice, I can arrange pick-up and delivery anywhere in Victoria. Interstate, I do Melbourne to Sydney and Melbourne to Adelaide myself, by appointment only.",
    more: { href: "/piano-movers-geelong/", label: "Geelong and regional Victoria" },
  },
  {
    q: "Do you dispose of unwanted pianos?",
    a: `Yes, if your piano is beyond repair I'll handle the removal, recycle what's worth saving, and dispose of the rest responsibly. Disposal is $${disposalRate.upright} upright / $${disposalRate.grand} grand${pianolaDisposal ? ` / $${pianolaDisposal.price} upright pianola` : ""}, and that includes property insurance, GST and the disposal fee. In my experience, it's often cheaper than a piano restoration quote that would never break even.${pianolaDisposal ? " If a pianola's mechanism has been removed, I may assess it as a standard piano depending on dimensions and access, so send me photos and dimensions." : ""}`,
  },
  {
    q: "Do you do anything other than pianos?",
    a: `Piano moving is my specialty. I can take additional items alongside your piano, deliver pianos bought on Marketplace or online, and do gig load-in and load-out for bands (guitars, amps, drums, PA). Call or text and we'll work it out.`,
  },
  {
    q: "Can you move a piano within the same home?",
    a: "Yes. If your floors are being restored or installed, I can move the piano out of the way for a couple of weeks, then put it back. A grand can sometimes stay on my equipment in between, so it doesn't need fully setting up twice. Call or text for a quote.",
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

type FaqLink = { href: string; label: string }
function faqLinks(item: (typeof FAQ_ITEMS)[number]): FaqLink[] {
  const out: FaqLink[] = []
  if ("more" in item) out.push(item.more)
  return out
}

// Specialty Services card links: one guide link per card at most, and no
// guide is linked twice on the homepage (Harry, 17 Oct 2026: "less is more").
const SERVICE_LINKS: Record<string, readonly FaqLink[]> = {
  piano: [{ href: "/piano-moving-cost-melbourne/", label: "Prices and what affects them" }],
  disposal: [{ href: "/piano-disposal-melbourne/", label: "How piano disposal works" }],
  marketplace: [{ href: "/marketplace-piano-delivery/", label: "How Marketplace delivery works" }],
}

// Elements reused as they are, so the page payload holds each one once:
// the hero's five stars and every FAQ's "+" (it turns into a cross when open).
const HERO_STAR = <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
const FAQ_PLUS = (
  <span aria-hidden="true" className="faq-plus">
    +
  </span>
)

// Class names such as sec-card and faq-q are defined in app/globals.css (@layer components).
// Card styles shared by the homepage sections.
const CARD_SHADOW = { boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }
const PANEL_SHADOW = { boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }
const PANEL_H2 = "panel-h2"

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
const SERVICE_GEO = {
  "@type": "City",
  name: "Melbourne",
  containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" },
}

// Schema descriptions written as plain statements of what the visible page
// says about each service (the card blurbs are conversational).
const SERVICE_SCHEMA_DESCRIPTIONS: Record<string, string> = {
  piano: `Upright, grand and digital piano moving across Greater Melbourne, priced by zone: uprights from $${innerRate.upright} (Inner Suburbs and CBD) to $${outerMelb.upright} (Outer Melbourne), grands from $${innerRate.grand} to $${outerMelb.grand}. Custom quotes beyond Outer Melbourne.`,
  disposal: `Removal of pianos beyond repair: what is worth saving is recycled and the rest disposed of responsibly. Upright $${disposalRate.upright}, grand $${disposalRate.grand}${pianolaDisposal ? `, upright pianola $${pianolaDisposal.price}` : ""}.`,
  marketplace: "Collection and delivery of pianos bought on Marketplace or online, without the buyer needing to attend the pick-up.",
  band: "Band equipment deliveries (guitars, amps, drum kits, PA) to an event and back again afterwards.",
  busking: "Harry's own acoustic grand piano and upright, played on the streets of Melbourne.",
  inhome: "Moving a piano within the same home, for example out of the way while floors are restored or installed and back into place a couple of weeks later. A grand can sometimes stay on Harry's equipment in between, so it does not need fully setting up twice. Quoted on request.",
}

const homeWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: `${BASE_URL}/`,
  name: "Harry The Piano Mover | Piano Movers Melbourne & Piano Removals",
  inLanguage: "en-AU",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#business` },
  primaryImageOfPage: `${BASE_URL}${OG_IMAGE.url}`,
  // Harry writes the page; dateModified is the last real content change (the
  // sitemap's lastmod). No datePublished: the first publication date is not
  // on record.
  author: { "@id": `${BASE_URL}/#harry` },
  dateModified: LAST_UPDATED["/"],
}

const servicesGraph = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => {
    const node: Record<string, unknown> = {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-${s.icon}`,
      name: `${s.title} Melbourne`,
      serviceType: s.title,
      description: SERVICE_SCHEMA_DESCRIPTIONS[s.icon] ?? s.blurb,
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: SERVICE_GEO,
    }
    // Zone prices are base rates; steps and a third person are separate offers.
    if (s.title === "Piano Moving") node.offers = movingOffers()
    if (s.title === "Piano Disposal") node.offers = disposalOffer()
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesGraph) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      {/* HERO with faded piano backdrop. Layered: bg photo + gradient wash + content. */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Plain <img> (next/image is a client component and the export
              serves images unoptimised anyway). Not lazy, so React preloads it
              in the head; fetchPriority marks it as the likely LCP image. */}
          <img
            src="/hero-bg.webp"
            alt=""
            aria-hidden="true"
            width={1792}
            height={2390}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ color: "transparent", filter: "brightness(0.35)" }}
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
          <img
            src="/logo-on-dark.png"
            alt="Harry The Piano Mover"
            width={260}
            height={260}
            decoding="async"
            className="w-40 sm:w-52 md:w-64 h-auto mx-auto mb-6 sm:mb-8 float-anim drop-shadow-2xl"
            style={{ color: "transparent" }}
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
            {HERO_STAR}
            {HERO_STAR}
            {HERO_STAR}
            {HERO_STAR}
            {HERO_STAR}
            <span className="ml-1">Reviews!</span>
          </a>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center items-center px-2 sm:px-0">
            <a
              href={SMS_QUOTE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-grape text-white font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-plum hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(107,76,154,0.4)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Text Harry
            </a>
            <a
              href={`tel:${BUSINESS.phoneInternational}`}
              className="inline-flex items-center justify-center gap-2 bg-tangerine text-[#1C1C1C] font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-coral hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(245,140,90,0.4)" }}
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
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

      {/* Below the locked hero: one column of light and dark cards on the
          sunset. Order (Gate 7 r2): introduction, reviews, then pricing and
          coverage as one sequence (map, rates, suburbs), then how it works,
          services, protection, photos, friends, FAQ and the contact card. Dark cards replace the old dark pills behind headings. */}
      <div className="px-4 sm:px-5 pt-12 sm:pt-16 pb-10 sm:pb-12 space-y-8 sm:space-y-12">
        {/* ABOUT */}
        <section id="about" className="card-white sec-card fade-up" style={CARD_SHADOW}>
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <div
              className="relative w-full sm:w-52 h-48 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              <Picture
                src="/harry-piano-1.jpg"
                alt="Harry playing piano with Melbourne skyline"
                width={900}
                height={1200}
                sizes="(max-width: 640px) 100vw, 208px"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 72%" }}
              />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-3 sm:mb-4">
                Hey, I&apos;m Harry
              </h2>
              <p className="body-lg mb-3">
                Trust in your piano being moved by an experienced piano mover &amp; player.
              </p>
              <p className="body-lg mb-3">
                See my rates below for piano relocation around Melbourne.
              </p>
              <p className="body-lg text-gray-600">
                Please enquire via text, phone or email about the piano you need moved, or any
                additional items you need transported along with it. I have a versatile van to
                help move what you need safely. I&apos;m on every move myself, with an assistant on
                most.
              </p>
            </div>
          </div>
        </section>

        {/* REVIEWS: three first, the rest behind "Show more" (works without JS). */}
        <section id="reviews" className="fade-up">
          <ReviewsGrid />
        </section>

        {/* PRICING AND COVERAGE: where I move, the rates, and the suburbs. */}
        <section id="zones" className="panel-dark sec-wide fade-up" style={PANEL_SHADOW}>
          <h2 className={PANEL_H2}>Where I Move</h2>
          <ZonesMap />
          <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center mt-5 sm:mt-6 list-none">
            {[
              { label: "Inner Suburbs & CBD", color: "#F5B742" },
              { label: "Outer Suburbs", color: "#F06681" },
              { label: "Outer Melbourne", color: "#9B4D9E" },
            ].map((z) => (
              <li key={z.label} className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block w-4 h-4 rounded-full" style={{ background: z.color, boxShadow: "0 0 0 1px rgba(255,255,255,0.5)" }} />
                <span className="text-white text-base sm:text-lg">{z.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-white/90 text-base sm:text-lg">
            <MapPin className="inline h-4 w-4 mr-1.5 -mt-0.5" aria-hidden="true" />
            The rings are a rough guide. Anything beyond?{" "}
            <a href="#contact" className="text-gold font-bold underline underline-offset-2 hover:text-white">
              Call or text for a quote.
            </a>
          </p>
        </section>

        <section id="rates" className="card-white sec-card fade-up" style={CARD_SHADOW}>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-grape text-center mb-2 sm:mb-3">Rates</h2>
          <p className="text-center text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8">All prices include GST.</p>
          {/* Three moving zones in one row, disposal full width beneath. Shared
              with the guide pages. */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <RateCards zones={movingZones} />
            <RateCards zones={[disposalRate]} />
          </div>
          <ul className="text-base sm:text-lg text-gray-700 bg-gray-100 rounded-xl p-4 sm:p-5 leading-relaxed space-y-1.5 list-none text-center">
            <li>
              Beyond Outer Melbourne, and for interstate moves, it&apos;s a custom quote, so please{" "}
              <a href="#contact" className="link-grape">
                get in touch for a chat
              </a>
              .
            </li>
            <li>The prices above include up to 4 entry steps, or easy ramp access.</li>
            <li>If a move crosses zones, the higher zone&apos;s rate applies.</li>
            <li>
              Tricky access past that adds <strong className="text-gray-900">${ACCESS_FEES.perStep} per step</strong>. More
              than 4 steps that can&apos;t take a simple ramp need a third person, from{" "}
              <strong className="text-gray-900">${ACCESS_FEES.extraHandsFrom}</strong>.
            </li>
          </ul>
          <p className="mt-4 text-center text-base text-gray-600">Rates confirmed {RATES_CONFIRMED}.</p>
        </section>

        {/* Suburbs I cover, straight after the rates so the named suburbs back them up. */}
        <section id="suburbs" className="card-white sec-card fade-up" style={CARD_SHADOW}>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-grape text-center mb-3 sm:mb-4">Suburbs I cover</h2>
          <p className="body-lg mb-4">
            I move pianos right across Greater Melbourne. Here&apos;s roughly how the rate zones fall:
          </p>
          <p className="body-lg mb-3">
            <strong className="text-grape">Inner suburbs &amp; CBD:</strong> Melbourne CBD, Carlton, Fitzroy,
            Collingwood, Richmond, South Yarra, Prahran, St Kilda, Brunswick, Northcote, Footscray, Yarraville,
            Port Melbourne, Docklands.
          </p>
          <p className="body-lg mb-3">
            <strong className="text-grape">Outer suburbs:</strong> Preston, Coburg, Essendon, Moonee Ponds, Box
            Hill, Camberwell, Hawthorn, Kew, Caulfield, Bentleigh, Brighton, Glen Waverley, Doncaster, Reservoir,
            Heidelberg, Sunshine.
          </p>
          <p className="body-lg mb-4">
            <strong className="text-grape">Outer Melbourne:</strong> Frankston, Dandenong, Werribee, Cranbourne,
            Pakenham, Sunbury, Melton, Berwick, Ringwood, Lilydale, Craigieburn, Point Cook, Mornington.
          </p>
          <p className="body-lg text-gray-600">
            Further out? I also cover Geelong, Ballarat, Bendigo, the Mornington Peninsula, Phillip Island and
            Lakes Entrance, and with enough notice I can move a piano anywhere in Victoria. Interstate, I do
            Melbourne to Sydney and Melbourne to Adelaide myself, by appointment only. Not sure which zone
            you&apos;re in? Call or text and I&apos;ll tell you straight away.
          </p>
        </section>

        {/* HOW A PIANO MOVE WORKS: visible numbered steps. */}
        <section id="how-it-works" className="card-white sec-card fade-up" style={CARD_SHADOW}>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-3 sm:mb-4">How a piano move works</h2>
          <p className="body-lg mb-6">
            Pianos aren&apos;t furniture. They&apos;re heavy, awkward, and sentimental beyond any monetary value.
            Here&apos;s how I work.
          </p>
          <ol className="space-y-5 list-none">
            {HOW_STEPS.map((st, i) => (
              <li key={st.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="step-num"
                >
                  {i + 1}
                </span>
                <p className="body-lg">
                  <strong className="font-heading text-grape">{st.title}</strong> {st.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* SERVICES. Flex-wrap so a short last row sits centred. */}
        <section id="services" className="panel-dark sec-wide fade-up" style={PANEL_SHADOW}>
          <h2 className={PANEL_H2}>Specialty Services</h2>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-5 list-none">
            {SERVICES.map((sv) => (
              <li key={sv.title} className="service-cell">
                <FeatureCard
                  title={sv.title}
                  description={sv.blurb}
                  icon={sv.icon}
                  links={SERVICE_LINKS[sv.icon]}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* PROTECTION */}
        <section id="protection" className="panel-dark rounded-3xl max-w-3xl mx-auto p-6 sm:p-8 md:p-10 fade-up" style={PANEL_SHADOW}>
          <h2 className={PANEL_H2}>Protection</h2>
          <ul className="space-y-4 sm:space-y-5">
            {[
              { t: "Public liability insurance", d: "Covers your home or property during the move." },
              { t: "Goods in transit (carriers) insurance", d: "Covers your piano while it's in my care and while it travels in the van." },
            ].map((p) => (
              <li key={p.t} className="flex items-start gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold text-[#1C1C1C] font-bold"
                >
                  ✓
                </span>
                <div>
                  <p className="font-heading font-bold text-lg sm:text-xl text-white">{p.t}</p>
                  <p className="copy-dim">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* PHOTOS: Harry's own photos, each opening his Instagram profile. */}
        <section id="photos" className="panel-dark sec-wide fade-up" style={PANEL_SHADOW}>
          <h2 className={PANEL_H2}>On Instagram</h2>
          <PhotoGallery />
        </section>

        {/* PARTNERS */}
        <section id="partners" className="panel-dark sec-wide fade-up" style={PANEL_SHADOW}>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-center mb-3 text-white">Friends of Mine</h2>
          <p className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 text-white/90 body-lg">
            For buying or hiring a piano in Melbourne, these are the folks I recommend.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {buyRent.map((p) => (
              <PartnerCard key={p.name} p={p} />
            ))}
          </div>
          <p className="mt-5 text-center text-white/90 text-base">No paid placements.</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="panel-dark rounded-3xl max-w-3xl mx-auto p-5 sm:p-8 md:p-10 fade-up" style={PANEL_SHADOW}>
          <h2 className={PANEL_H2}>Frequently Asked</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details key={item.q} className="glass-dark faq-item group" {...(i === 0 ? { open: true } : {})}>
                <summary className="faq-q">
                  {item.q}
                  {FAQ_PLUS}
                </summary>
                {item.a === "BOOKING_LINKS" ? (
                  <p className="faq-a">
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
                  <p className="faq-a">{item.a}</p>
                )}
                {faqLinks(item).length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-x-5 list-none">
                    {faqLinks(item).map((l) => (
                      <li key={l.href}>
                        <ArrowLink
                          href={l.href}
                          label={l.label}
                          className="faq-more"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT: opaque card, the quote checklist beside the buttons. */}
        <section id="contact" className="card-white rounded-3xl max-w-2xl mx-auto p-5 sm:p-8 md:p-12 fade-up text-center" style={CARD_SHADOW}>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-4 sm:mb-5">Reach Out</h2>
          <p className="body-lg mb-6">
            For a quick quote, text me five things: the piano type and model if you know it, the suburb or town at
            each end, your preferred date, how many steps there are at both ends, and a photo of the piano and any
            tricky access. I&apos;ll get back to you within a few hours.
          </p>
          <CallTextButtons email align="center" />
        </section>
      </div>

      <FadeUpReveal />
    </>
  )
}
