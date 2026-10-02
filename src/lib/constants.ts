export const BASE_URL = "https://harrythepianomover.com.au"

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
    "Melbourne piano movers. Uprights, grands, and digitals moved safely across the city. Piano removals, piano disposal, and Marketplace piano pickups. Five-star reviews.",
  instagram: "https://www.instagram.com/harrythepianomover/",
  googleReviews: "https://maps.app.goo.gl/nscqKmX1AwyyrLmE7",
} as const

export type RateZone = {
  label: string
  upright: number
  grand: number
  toneFrom: string
  toneTo: string
  // Extra line items listed under Upright / Grand (e.g. pianola disposal).
  extras?: readonly { label: string; price: number }[]
  // Small-print clause shown at the bottom of the card.
  note?: string
}

// Rates effective October 2026 (Harry's rate review via the studio).
export const RATES: readonly RateZone[] = [
  { label: "Inner Suburbs & CBD", upright: 290, grand: 530, toneFrom: "#F5B742", toneTo: "#F58C5A" },
  { label: "Outer Suburbs", upright: 380, grand: 630, toneFrom: "#F58C5A", toneTo: "#F06681" },
  { label: "Outer Melbourne", upright: 470, grand: 720, toneFrom: "#F06681", toneTo: "#9B4D9E" },
  {
    label: "Piano Disposal",
    upright: 350,
    grand: 460,
    toneFrom: "#6B4C9A",
    toneTo: "#4A4AA0",
    extras: [{ label: "Upright Pianola*", price: 870 }],
    note: "*Pianolas with the mechanism removed may be assessed as a standard piano depending on dimensions and access. Photos and dimensions required.",
  },
] as const

// "Additional Services" card, shown below the disposal rates.
export const ADDITIONAL_SERVICES = {
  label: "Additional Services",
  toneFrom: "#4A4AA0",
  toneTo: "#2F3A7A",
  items: [
    { label: "Upright Internal", price: 170 },
    { label: "Grand Internal", price: 280 },
    { label: "Extra items", price: 60 },
  ],
  note: "Additional items are charged when moving items alongside a piano. Piano moving is our specialty.",
} as const

export type Service = {
  title: string
  blurb: string
  icon: "piano" | "disposal" | "marketplace" | "band" | "busking"
  image: string
}

export const SERVICES: readonly Service[] = [
  {
    title: "Piano Moving",
    blurb: "Rates vary from Melbourne Metro to outer suburbs & beyond, more info below.",
    icon: "piano",
    image: "/icon-piano-move.png",
  },
  {
    title: "Piano Disposal",
    blurb: "Pianos beyond repair can be either recycled or eliminated.",
    icon: "disposal",
    image: "/icon-disposal.png",
  },
  {
    title: "Marketplace Deliveries",
    blurb: "Pianos purchased on Marketplace or online can be delivered without needing you to attend at the pick-up.",
    icon: "marketplace",
    image: "/icon-marketplace.png",
  },
  {
    title: "Band Equipment Deliveries",
    blurb: "Guitars, amps, drum kits, PA, etc. We pick up your goods to bring to the event, then bring it back after.",
    icon: "band",
    image: "/icon-band.png",
  },
  {
    title: "Piano Busking",
    blurb:
      "My very own kitsched-out acoustic grand piano and humble little upright playing around the streets of Melbourne.",
    icon: "busking",
    image: "/icon-busking.jpg",
  },
] as const

export type Partner = {
  name: string
  category: "buy-rent" | "tuner" | "technician"
  rating: number
  reviews?: number
  blurb: string
  phone?: string
  phoneIntl?: string
  website?: string
  credentials?: readonly string[]
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "Melbourne Piano Sales",
    category: "buy-rent",
    rating: 5.0,
    reviews: 69,
    blurb: "Matt and his father Ross. Family business since 1994. New Kawai plus as-new Yamaha uprights and grands. Showroom in Nunawading.",
    phone: "03 9429 7999",
    phoneIntl: "+61394297999",
    website: "https://www.melbournepianosales.com.au/",
  },
  {
    name: "Melbourne Piano Rentals",
    category: "buy-rent",
    rating: 5.0,
    reviews: 1,
    blurb: "Erin Carrigy, women-owned, piano tuner herself. Long and short-term piano rentals across greater Melbourne. Frankston base. (Newer Google listing; 167+ followers on Facebook.)",
    phone: "0414 644 650",
    phoneIntl: "+61414644650",
    website: "https://melbournepianorentals.com.au/",
  },
  {
    name: "Piano Tuning & Solutions",
    category: "tuner",
    rating: 5.0,
    reviews: 23,
    blurb: "David. \"Professional, prompt, honest, reliable, expert, thorough.\" Newport, services Melbourne-wide.",
    phone: "0412 446 213",
    phoneIntl: "+61412446213",
    website: "http://pianotuningsolutions.com/",
  },
  {
    name: "Chandler Piano Tuning",
    category: "tuner",
    rating: 5.0,
    reviews: 23,
    blurb: "Greater Melbourne mobile service. Strong repeat-client base, customers come back yearly.",
    phone: "0466 719 292",
    phoneIntl: "+61466719292",
    website: "http://chandlerpiano.com/",
  },
  {
    name: "Imlach Tuning",
    category: "tuner",
    rating: 5.0,
    reviews: 7,
    blurb: "Rob Imlach. Nunawading, eastern suburbs. Graduate of the Chicago School for Piano Technology; current contract tuner for Australian Piano Warehouse.",
    phone: "0411 916 536",
    phoneIntl: "+61411916536",
    website: "https://www.imlachtuning.com/",
    credentials: ["Chicago School"],
  },
  {
    name: "Gourley Music",
    category: "tuner",
    rating: 5.0,
    reviews: 30,
    blurb: "Brend Gourley. Yarra Valley base, services east Melbourne. \"Took great care tuning my very flat much loved piano!\"",
    phone: "0433 035 451",
    phoneIntl: "+61433035451",
    website: "http://www.gourleymusic.com/",
  },
  {
    name: "WestEnd Piano Tuning",
    category: "tuner",
    rating: 5.0,
    reviews: 29,
    blurb: "Newport. Servicing inner west, western suburbs, Geelong, and the Bellarine.",
    phone: "0425 782 542",
    phoneIntl: "+61425782542",
    website: "https://www.westendpianotuning.com.au/",
  },
  {
    name: "Max Piano Tuner",
    category: "tuner",
    rating: 5.0,
    reviews: 14,
    blurb: "Max Kourilov. South-east Bayside. \"Took about an hour, fair pricing, and my piano sounds fantastic.\"",
    phone: "0490 334 056",
    phoneIntl: "+61490334056",
    website: "https://maxpianotuner.com.au/",
  },
  {
    name: "Baghdad Piano Shop",
    category: "tuner",
    rating: 4.7,
    reviews: 13,
    blurb: "Roxburgh Park, north Melbourne. Tuning services and a small piano shop. \"Musical genius who tuned my piano perfectly!\"",
    phone: "0474 726 777",
    phoneIntl: "+61474726777",
  },
  {
    name: "Stuart's Piano Tuning",
    category: "tuner",
    rating: 5.0,
    reviews: 3,
    blurb: "Stuart Stevens. Warrandyte Rd, east Melbourne. \"Friendly and does a great job.\"",
    phone: "0402 502 982",
    phoneIntl: "+61402502982",
    website: "https://stuartstevensenter.wixsite.com/stuart-s-piano-tunin",
  },
  {
    name: "Yarra Valley Piano Tuning",
    category: "tuner",
    rating: 5.0,
    reviews: 5,
    blurb: "Edo. Yarra Valley specialist. \"Quality service, low price and friendly.\"",
    phone: "0437 240 590",
    phoneIntl: "+61437240590",
    website: "https://pianotuningyarravalley.wordpress.com/",
  },
  {
    name: "Peninsula Piano Tuning Service",
    category: "tuner",
    rating: 5.0,
    reviews: 2,
    blurb: "Mt Martha, Mornington Peninsula. McLeod Rd. Servicing the Peninsula.",
    phone: "03 5974 3783",
    phoneIntl: "+61359743783",
  },
  {
    name: "Julian Morgan-Smith",
    category: "technician",
    rating: 5.0,
    reviews: 32,
    blurb: "Tuning, regulation, voicing, repairs, restoration. Trusted by artists, schools, and institutions across Melbourne.",
    phone: "0439 039 509",
    phoneIntl: "+61439039509",
    website: "http://www.julianmorgansmith.com/",
  },
  {
    name: "House of Pianos",
    category: "technician",
    rating: 5.0,
    reviews: 57,
    blurb: "Stewart Kelly. Coventry St, South Melbourne. Piano shop, technician services, plus a music academy.",
    phone: "03 9942 0348",
    phoneIntl: "+61399420348",
    website: "http://houseofpianos.com.au/",
  },
  {
    name: "Forte Piano Tuning",
    category: "technician",
    rating: 4.9,
    reviews: 16,
    blurb: "Christine McCrae. Kew. Australian School of Piano Tuning trained.",
    phone: "0467 553 088",
    phoneIntl: "+61467553088",
    website: "https://fortepianotuning.com.au/",
    credentials: ["Yamaha-accredited", "PTGV"],
  },
  {
    name: "The Piano Fellow",
    category: "technician",
    rating: 5.0,
    reviews: 10,
    blurb: "Vincent Tarin, French-Australian technician. Itemm (France) graduated, BDK (Germany) member, Yamaha authorised service agent. Restorations, repairs, adsilent silent-system installer.",
    phone: "0432 885 397",
    phoneIntl: "+61432885397",
    website: "https://pianofellow.com.au/",
    credentials: ["Yamaha", "BDK", "Itemm"],
  },
  {
    name: "Christopher Streader",
    category: "technician",
    rating: 5.0,
    reviews: 4,
    blurb: "Master tuner since 1975, trained by his father Don. ARPT-accredited, PTTGV Life Member (awarded 2017 for outstanding service). Long-term contracts with private/government schools, churches, and Crown Melbourne Casino.",
    phone: "1300 486 797",
    phoneIntl: "+611300486797",
    website: "https://www.pianotuner.melbourne/",
    credentials: ["ARPT", "PTTGV Life Member"],
  },
  {
    name: "Gary Beadell Piano Services",
    category: "technician",
    rating: 5.0,
    reviews: 4,
    blurb: "Point Cook, west Melbourne. Repairs, tuning, voicing, parts replacement, restoration. Supplies the Melbourne Recital Centre and ABC Classic FM.",
    phone: "0427 530 863",
    phoneIntl: "+61427530863",
    website: "http://garybeadellpianoservices.com.au/",
  },
  {
    name: "Andrew Gooden & Co",
    category: "technician",
    rating: 5.0,
    reviews: 33,
    blurb: "Mt Eliza, Mornington Peninsula. Restoration specialist. \"Andrew restored my old piano back to life, was very easy to work with.\"",
    phone: "0439 045 519",
    phoneIntl: "+61439045519",
  },
  {
    name: "Pianos Victoria",
    category: "technician",
    rating: 4.8,
    reviews: 41,
    blurb: "Lachlan Brown. Mt Eliza, Mornington Peninsula. Tuning and restoration. \"His expertise is unmatched and we are very pleased with the results.\"",
    phone: "0434 091 533",
    phoneIntl: "+61434091533",
    website: "https://pianosvictoria.com/",
  },
  {
    name: "Australia Piano World",
    category: "technician",
    rating: 4.8,
    reviews: 149,
    blurb: "Springvale showroom plus technical services. Largest review base on the page, big operation.",
    phone: "03 9125 3938",
    phoneIntl: "+61391253938",
    website: "https://australiapianoworld.com.au/",
  },
  {
    name: "EPG Pianos",
    category: "technician",
    rating: 4.9,
    reviews: 70,
    blurb: "High St, Malvern. Repair service plus a clearance store for stock pianos.",
    phone: "1300 922 902",
    phoneIntl: "+611300922902",
    website: "https://epgpianos.com.au/",
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
