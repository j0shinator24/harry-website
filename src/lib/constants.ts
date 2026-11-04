export const BASE_URL = "https://harrythepianomover.com.au"

// Google review count and the month it was checked. Shown beside the reviews.
export const REVIEW_COUNT = 88
export const REVIEW_COUNT_AS_OF = "October 2026"

export const BUSINESS = {
  name: "Harry The Piano Mover",
  legalName: "Harry The Piano Mover",
  email: "info@harrythepianomover.com.au",
  emailFallback: "harrythepianomover@gmail.com",
  phone: "0420 687 160",
  phoneInternational: "+61420687160",
  founder: "Harry",
  location: "Melbourne, VIC",
  tagline: "Melbourne's specialist piano mover. Uprights, grands, and digitals.",
  description:
    `Harry The Piano Mover: specialist piano movers in Melbourne. Uprights, grands and digitals. Removals, disposal and Marketplace pick-ups. ${REVIEW_COUNT} Google reviews as of ${REVIEW_COUNT_AS_OF}.`,
  instagram: "https://www.instagram.com/harrythepianomover/",
  // Harry's own music, supplied by Harry 4 Nov 2026.
  spotify: "https://open.spotify.com/artist/3MZ3s1IgR0KUdpkpKXnkrT",
  appleMusic: "https://music.apple.com/us/artist/harry-hodgman/1478006204",
  // Supplied by Joshua, 17 Oct 2026 (page title "Harry The Piano Mover |
  // Melbourne VIC", same handle as the Instagram).
  facebook: "https://www.facebook.com/harrythepianomover/",
  // Every visible Google review / Maps link uses the same full CID URL as the
  // schema (Gate 7 r2 N3). Only the business-level listing exists; there are
  // no per-review links, so links are labelled as Harry's Google reviews.
  googleReviews: "https://maps.google.com/?cid=1784837105748892364",
  // Long forms of the old maps.app.goo.gl shortlink (resolved with curl -I,
  // Oct 2026), for schema sameAs and hasMap.
  googleMapsPlace:
    "https://www.google.com/maps/place/Harry+The+Piano+Mover/data=!4m2!3m1!1s0xa2e941c6c9a22755:0x18c503e426195acc",
  googleMapsCid: "https://maps.google.com/?cid=1784837105748892364",
} as const

// Hours supplied by Harry, 22 Oct 2026. Shown in the footer and the
// MovingCompany schema; Sunday closed.
export const HOURS = {
  text: "Mon to Fri 10am to 5pm, Sat 11am to 4pm, Sun closed",
  spec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:00" },
    { days: ["Saturday"], opens: "11:00", closes: "16:00" },
  ],
} as const

// Shared Open Graph image: a true 1200 x 630 crop of Harry at the piano.
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Harry The Piano Mover playing a grand piano on a Melbourne rooftop",
} as const

// Adds <link rel="alternate" type="text/plain" href="/llms.txt"> to a page.
// Each page sets its own `alternates`, which replaces the parent's, so every
// page spreads this in next to its canonical.
export const LLMS_ALTERNATE = { "text/plain": "/llms.txt" } as const

// Last real content change per page, for the sitemap's <lastmod>. Update the
// date when a page's visible content changes, never on a rebuild.
export const LAST_UPDATED: Record<string, string> = {
  "/": "2026-10-20",
  "/piano-moving-cost-melbourne/": "2026-10-20",
  "/piano-disposal-melbourne/": "2026-10-20",
  "/piano-types/": "2026-10-20",
  "/piano-stairs-difficult-access/": "2026-10-20",
  "/marketplace-piano-delivery/": "2026-10-20",
  "/piano-movers-geelong/": "2026-10-20",
  "/interstate-piano-removals/": "2026-10-20",
  "/free-piano-melbourne/": "2026-10-22",
}

export type RateZone = {
  label: string
  upright: number
  grand: number
  toneFrom: string
  toneTo: string
  // Text colour on the card. Each gradient is paired with the ink that clears
  // WCAG 1.4.3 (4.5:1) at both of its ends: dark on gold/tangerine/coral,
  // white on the deeper magenta, plum and grape tones.
  ink: "dark" | "light"
  // Extra line items listed under Upright / Grand (e.g. pianola disposal).
  extras?: readonly { label: string; price: number }[]
  // Small-print clause shown at the bottom of the card.
  note?: string
}

// Rates effective October 2026 (Harry's rate review via the studio).
export const RATES: readonly RateZone[] = [
  { label: "Inner Suburbs & CBD", upright: 290, grand: 530, toneFrom: "#F5B742", toneTo: "#F58C5A", ink: "dark" },
  { label: "Outer Suburbs", upright: 380, grand: 630, toneFrom: "#F58C5A", toneTo: "#F06681", ink: "dark" },
  { label: "Outer Melbourne", upright: 470, grand: 720, toneFrom: "#B8407E", toneTo: "#8A4390", ink: "light" },
  {
    label: "Piano Disposal",
    upright: 350,
    grand: 460,
    toneFrom: "#6B4C9A",
    toneTo: "#4A4AA0",
    ink: "light",
    extras: [{ label: "Upright Pianola*", price: 870 }],
    note: "*Pianolas with the mechanism removed may be assessed as a standard piano depending on dimensions and access. Photos and dimensions required.",
  },
] as const

// Access fees, as stated in the Rates box and the stairs FAQ (Oct 2026).
// Every page reads these, so a change here updates the whole site.
export const ACCESS_FEES = {
  perStep: 20,
  extraHandsFrom: 200,
} as const

export type Service = {
  title: string
  blurb: string
  icon: "piano" | "inhome" | "disposal" | "marketplace" | "rehoming" | "band" | "busking"
  // A card that is one big link (the free piano scheme): where it goes, the
  // call to action and the corner badge.
  featured?: { href: string; cta: string; badge: string }
}

// Card copy via Ghostwriter (Gate 7 round 1, Oct 2026). Icons are one
// matching line set (lucide), drawn in components/service-icon.tsx.
export const SERVICES: readonly Service[] = [
  {
    // Joshua, 22 Oct 2026: the free piano scheme must be easy to find, so this
    // card goes first. Harry, 1 Nov 2026: softer copy, and the card links to the
    // static explainer page (good for search) rather than the Worker gallery.
    title: "Free Piano Rehoming",
    blurb: "Good, tuned pianos that need a new home. Join my wait list and only pay delivery.",
    icon: "rehoming",
    featured: { href: "/free-piano-melbourne/", cta: "Find out more", badge: "Free" },
  },
  {
    title: "Piano Moving",
    blurb: "Rates are set by zone, from the inner suburbs and CBD out to Outer Melbourne and beyond.",
    icon: "piano",
  },
  {
    // Harry, 17 Oct 2026: moves within the same home (floors). No prices.
    title: "In-Home Piano Moves",
    blurb: "Floors being restored or installed? I move the piano out of the way for a couple of weeks, then put it back. Call or text for a quote.",
    icon: "inhome",
  },
  {
    title: "Piano Disposal",
    blurb: "I take away pianos beyond repair, recycle what's worth saving and dispose of the rest responsibly.",
    icon: "disposal",
  },
  {
    title: "Marketplace Deliveries",
    blurb: "Pianos purchased on Marketplace or online can be delivered without needing you to attend at the pick-up.",
    icon: "marketplace",
  },
  {
    title: "Band Equipment Deliveries",
    blurb: "Guitars, amps, drum kits, PA and more. I pick up your gear, bring it to the event, then bring it back after.",
    icon: "band",
  },
  {
    title: "Piano Busking",
    blurb:
      "My very own kitsched-out acoustic grand piano and humble little upright, played around the streets of Melbourne.",
    icon: "busking",
  },
] as const

// Pre-filled text for every "Text Harry" link: the one quote checklist used
// everywhere (piano type and model, both locations, preferred date, steps at
// each end, photos of the piano and any tricky access). Copy via Ghostwriter.
export const SMS_QUOTE_BODY = encodeURIComponent(
  [
    "Hi Harry, I'd like a quote.",
    "Piano type and model:",
    "From (suburb or town):",
    "To (suburb or town):",
    "Preferred date:",
    "Steps at each end:",
    "I'll send photos of the piano and any tricky access.",
  ].join(String.fromCharCode(10)),
)

// Link text for review sources: the destination is Harry's Google listing,
// not the individual review.
export const REVIEW_SOURCE_LABEL = "Harry's Google reviews"
export const SMS_QUOTE_HREF = `sms:${BUSINESS.phoneInternational}?&body=${SMS_QUOTE_BODY}`

// Disposal pages: collection only, so no "To" line (Gate 7 r3, copy via
// Ghostwriter).
export const SMS_DISPOSAL_BODY = encodeURIComponent(
  [
    "Hi Harry, I'd like a disposal quote.",
    "Piano type and model (if known):",
    "Collection suburb or town:",
    "Preferred date:",
    "Steps at the property:",
    "I'll send a photo of the piano and any tricky access.",
  ].join(String.fromCharCode(10)),
)
export const SMS_DISPOSAL_HREF = `sms:${BUSINESS.phoneInternational}?&body=${SMS_DISPOSAL_BODY}`

// Harry's Piano Rehoming wait list (22 Oct 2026): the text and the email carry
// the same details (name, delivery suburb, email, phone, access). The site
// collects nothing; both open the visitor's own messaging app.
const REHOMING_TEXT = "Free piano wait list. Name: , Suburb: , Email: , Phone: , Access (steps, stairs, tight spots): "
export const SMS_REHOMING_BODY = encodeURIComponent(REHOMING_TEXT)
export const SMS_REHOMING_HREF = `sms:${BUSINESS.phoneInternational}?&body=${SMS_REHOMING_BODY}`
export const EMAIL_REHOMING_HREF = `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Free piano wait list")}&body=${SMS_REHOMING_BODY}`

export type Partner = {
  name: string
  blurb: string
  website?: string
  phone?: string
  phoneIntl?: string
  credentials?: readonly string[]
}

// Friends of Mine, set by Harry on 1 Nov 2026. Text-only cards, in this order.
export const PARTNERS: readonly Partner[] = [
  {
    name: "Eliza Mithen Pianos",
    blurb: "Tuner and technician",
    website: "https://www.elizamithenpianos.com.au/",
  },
  {
    name: "Erin Tunes",
    blurb: "Tuner",
    website: "https://www.erintunes.com.au/",
  },
  {
    name: "Joe Major Pianos",
    blurb: "Tuner",
    website: "https://joemajor.com/",
  },
  {
    name: "Pianos Victoria (with Lachlan Brown)",
    blurb: "Tuning and climate-controlled piano storage",
    website: "https://www.pianosvictoria.com/",
  },
  {
    name: "Melbourne Pianist Calvin",
    blurb: "Piano player for events",
    website: "https://www.melbournepianistcalvin.com/",
  },
  // Kept at Harry's request, 4 Nov 2026.
  {
    name: "Melbourne Piano Sales",
    blurb: "Piano sales",
    website: "https://www.melbournepianosales.com.au/",
  },
  {
    name: "Melbourne Piano Rentals",
    blurb: "Piano rentals",
    website: "https://melbournepianorentals.com.au/",
  },
] as const

export type Review = {
  name: string
  stars: 5
  text: string
}

export const REVIEWS: readonly Review[] = [
  { name: "Rachel F.", stars: 5, text: "Quick to respond, very accommodating to our last minute move. Job done smoothly and with care." },
  { name: "Jen J.", stars: 5, text: "Harry and Jeremy took great care of our Kawai upright on a long move to rural Victoria. Highly recommended." },
  { name: "Luke S.", stars: 5, text: "Able to problem solve on the fly through very narrow passages and over several steps. No damage at all." },
  { name: "Satya R.", stars: 5, text: "Harry was awesome! Quick, careful, and friendly. My son's really happy with the piano!" },
  { name: "Rachael W.", stars: 5, text: "Harry is ace! Safely moved my upright, picked up a bed base, and moved my large plants. Super punctual." },
  { name: "Ali A.", stars: 5, text: "Helped us on short notice, was punctual, fairly priced. Obviously very experienced. Great care." },
  { name: "Adam K.", stars: 5, text: "Excellent job moving my piano! Very flexible, accommodating, and the piano arrived in perfect condition." },
  { name: "Angela V.", stars: 5, text: "Impeccably reliable and trustworthy. Delivered in the necessary time frame with utmost efficiency." },
  { name: "Tatum O.", stars: 5, text: "Insanely knowledgeable and passionate about what he does. The experience was so personable." },
  { name: "Bruce B.", stars: 5, text: "A lot of fun watching Harry weave the piano through impossible situations and up into his truck. Well done!" },
  { name: "Emma C.", stars: 5, text: "Very easy to deal with. Took great care of the piano and very reasonably priced. Highly recommend!" },
  { name: "Tony W.", stars: 5, text: "Totally painless and totally professional. Movers who know how to play the instrument. Quick and good." },
] as const
