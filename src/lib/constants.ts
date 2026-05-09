export const BASE_URL = "https://harrythepianomover.com.au"

export const BUSINESS = {
  name: "Harry The Piano Mover",
  legalName: "Harry The Piano Mover",
  email: "harrythepianomover@gmail.com",
  phone: "0420 687 160",
  phoneInternational: "+61420687160",
  founder: "Harry",
  location: "Melbourne, VIC",
  tagline: "Melbourne's specialist piano mover. Moved with care by someone who actually plays.",
  description:
    "Melbourne piano mover. Uprights, grands, and digitals moved safely across the city. Also piano disposal, furniture moves, Marketplace pickups, and band-equipment deliveries. Five-star reviews.",
  instagram: "https://www.instagram.com/harrythepianomover/",
  googleReviews: "https://maps.app.goo.gl/nscqKmX1AwyyrLmE7",
} as const

export type RateZone = {
  label: string
  upright: number
  grand: number
  toneFrom: string
  toneTo: string
}

export const RATES: readonly RateZone[] = [
  { label: "Inner Suburbs & CBD", upright: 260, grand: 460, toneFrom: "#F5B742", toneTo: "#F58C5A" },
  { label: "Outer Suburbs", upright: 340, grand: 570, toneFrom: "#F58C5A", toneTo: "#F06681" },
  { label: "Outer Melbourne", upright: 420, grand: 650, toneFrom: "#F06681", toneTo: "#9B4D9E" },
  { label: "Piano Disposal", upright: 320, grand: 420, toneFrom: "#6B4C9A", toneTo: "#4A4AA0" },
] as const

export type Service = {
  title: string
  blurb: string
  icon: "piano" | "disposal" | "furniture" | "marketplace" | "band" | "busking"
  image: string
}

export const SERVICES: readonly Service[] = [
  {
    title: "Piano Moving",
    blurb:
      "Uprights, grands, and digitals moved safely across Melbourne. Blanket-wrapped, strapped, and handled by someone who knows what's inside the case.",
    icon: "piano",
    image: "/icon-piano-move.jpg",
  },
  {
    title: "Piano Disposal",
    blurb: "Some pianos can't be saved. I'll handle the removal, recycle what I can, and dispose of the rest properly.",
    icon: "disposal",
    image: "/icon-disposal.png",
  },
  {
    title: "Furniture Moving",
    blurb: "Couch won't fit in the car? Save yourself the truck hire. I'll grab it and get it where it needs to go.",
    icon: "furniture",
    image: "/icon-furniture.png",
  },
  {
    title: "Marketplace Deliveries",
    blurb: "Found something on Facebook Marketplace? Skip the awkward train ride home. I'll pick it up and bring it to your door.",
    icon: "marketplace",
    image: "/icon-marketplace.png",
  },
  {
    title: "Band Equipment Deliveries",
    blurb: "Got a gig? Load-in's a pain. Guitars, amps, drums, PA. I'll grab it, get it to the venue, and bring it back after the show.",
    icon: "band",
    image: "/icon-band.jpg",
  },
  {
    title: "Piano Busking",
    blurb: "I wheel a kitsched-out grand piano through Melbourne's streets. If you hear live keys in a laneway, that's probably me.",
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
    blurb: "Erin Carrigy, women-owned, piano tuner herself. Long and short-term piano rentals across greater Melbourne. Frankston base.",
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
    blurb: "Nunawading, eastern suburbs. \"Quality service and professional advice.\"",
    phone: "0411 916 536",
    phoneIntl: "+61411916536",
    website: "https://www.imlachtuning.com/",
  },
  {
    name: "Flow Piano (Andrew)",
    category: "tuner",
    rating: 5.0,
    blurb: "Box Hill base, all of Melbourne. Online booking via Calendly. Full-ear tuning, regulation, voicing.",
    phone: "0469 353 183",
    phoneIntl: "+61469353183",
    website: "https://flowpiano.com.au/",
  },
  {
    name: "Dr Piano",
    category: "tuner",
    rating: 5.0,
    blurb: "Notting Hill, south-east Melbourne. 40 years of experience in piano repair, service, and tuning.",
    phone: "0414 903 578",
    phoneIntl: "+61414903578",
    website: "https://www.drpiano.com.au/",
  },
  {
    name: "Symphonic Piano Tuning",
    category: "tuner",
    rating: 5.0,
    blurb: "Warrandyte, east Melbourne. Newer entrant, all-five-star reviews so far. Friendly, careful, affordable.",
    phone: "0491 796 076",
    phoneIntl: "+61491796076",
    website: "https://symphonicpianotuning.com.au/",
  },
  {
    name: "WestEnd Piano Tuning",
    category: "tuner",
    rating: 5.0,
    blurb: "Newport. Servicing inner west, western suburbs, Geelong, and the Bellarine.",
    phone: "0425 782 542",
    phoneIntl: "+61425782542",
    website: "https://www.westendpianotuning.com.au/",
  },
  {
    name: "Max Piano Tuner",
    category: "tuner",
    rating: 5.0,
    blurb: "Max Kourilov. South-east Bayside. \"Extremely professional, very talented.\"",
    phone: "0490 334 056",
    phoneIntl: "+61490334056",
    website: "https://maxpianotuner.com.au/",
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
    blurb: "Vincent Tarin, French-Australian technician. Restorations, repairs, plus adsilent silent-system installer.",
    phone: "0432 885 397",
    phoneIntl: "+61432885397",
    website: "https://pianofellow.com.au/",
  },
  {
    name: "Christopher Streader",
    category: "technician",
    rating: 5.0,
    blurb: "Melbourne CBD listing (397/585 Little Collins St). Master tuner since the 1970s, trained by his father Don Streader. Restoration specialist. Note: no pianolas.",
    phone: "1300 486 797",
    phoneIntl: "+611300486797",
    website: "https://www.pianotuner.melbourne/",
  },
  {
    name: "Gary Beadell Piano Services",
    category: "technician",
    rating: 5.0,
    reviews: 4,
    blurb: "Point Cook, west Melbourne. Repairs, tuning, voicing, parts replacement, restoration.",
    phone: "0427 530 863",
    phoneIntl: "+61427530863",
    website: "http://garybeadellpianoservices.com.au/",
  },
  {
    name: "Acacia Piano Tuning",
    category: "technician",
    rating: 5.0,
    reviews: 3,
    blurb: "Peter. Clarinda, south-east. Tunes by ear, technical service work alongside.",
    phone: "03 9543 5246",
    phoneIntl: "+61395435246",
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
