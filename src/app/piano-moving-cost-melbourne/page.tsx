import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { ACCESS_FEES, BASE_URL, BUSINESS } from "@/lib/constants"
import { reviewBy } from "@/lib/guides"
import {
  DISPOSAL,
  DISPOSAL_INCLUDES,
  INNER,
  MOVING_HIGH,
  MOVING_LOW,
  MOVING_ZONES,
  OUTER_MELB,
  OUTER_SUB,
  PIANOLA_CLAUSE,
  PIANOLA_DISPOSAL,
  movingOffers,
} from "@/lib/rates"

const PATH = "/piano-moving-cost-melbourne/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Piano Moving Cost Melbourne | Harry The Piano Mover",
  description: `What a piano move costs in Melbourne: uprights from $${INNER.upright}, grands from $${INNER.grand}. Zone rates incl. GST, step fees, disposal prices and how to get a quick quote.`,
})

const qs: GuideSection[] = [
  {
    id: "zone-rates",
    q: "How much does it cost to move a piano in Melbourne?",
    // Gate 7 r4: the cards show all six prices, so the bold answer no longer
    // recites them; the FAQPage answer keeps them (schema below).
    a: "It depends on your zone and the type of piano, and every rate is below.",
    body: [
      "All prices include GST.",
      {
        rates: MOVING_ZONES,
        schema: `An upright costs $${INNER.upright} in the Inner Suburbs and CBD, $${OUTER_SUB.upright} in the Outer Suburbs and $${OUTER_MELB.upright} in Outer Melbourne, and a grand costs $${INNER.grand}, $${OUTER_SUB.grand} or $${OUTER_MELB.grand} across the same three zones.`,
      },
      "Not sure which zone you're in? The [suburb list on my homepage](/#suburbs) shows roughly where the lines fall. Or text me your suburb and I'll tell you straight away. If a move crosses zones, the higher zone's rate applies.",
    ],
  },
  {
    id: "base-rate",
    q: "What does the base rate cover?",
    a: "Each base rate covers a move with up to 4 entry steps, or easy ramp access.",
    body: [
      "Every move gets the same care. I protect your floors and anywhere the piano could come close to touching, lift it onto my custom-made piano dolly, and wheel it into the van where it's secured for the trip.",
    ],
  },
  {
    id: "what-changes-the-price",
    q: "What makes a piano move cost more?",
    a: "Four things change the price: extra steps, access tricky enough to need more hands, distance, and the type of piano.",
    body: [
      {
        list: [
          `Steps. Tricky access past the 4 included entry steps adds $${ACCESS_FEES.perStep} per step. [Stairs, ramps and step fees explained](/piano-stairs-difficult-access/).`,
          `A third person. More than 4 steps that can't take a simple ramp need a third person, from $${ACCESS_FEES.extraHandsFrom}.`,
          "Distance. Each zone further out costs more, and anything past Outer Melbourne is a custom quote. That covers Geelong, regional Victoria and interstate moves.",
          `Piano type. A grand costs $${INNER.grand - INNER.upright} more than an upright in the inner suburbs. With a grand I remove the lyre, legs, music stand and lid before it moves.`,
        ],
      },
    ],
  },
  {
    id: "disposal-cost",
    q: "How much does piano disposal cost?",
    a: `Disposal is $${DISPOSAL.upright} for an upright and $${DISPOSAL.grand} for a grand${PIANOLA_DISPOSAL ? `, and $${PIANOLA_DISPOSAL.price} for an upright pianola` : ""}.`,
    body: [
      ...(PIANOLA_CLAUSE ? [PIANOLA_CLAUSE] : []),
      DISPOSAL_INCLUDES,
      "In my experience, it's often cheaper than a restoration quote that would never break even.",
    ],
  },
  {
    id: "quick-quote",
    q: "How do I get a quick quote?",
    a: `Text ${BUSINESS.phone} with these five things and I'll get back to you within a few hours.`,
    body: [
      {
        list: [
          "Piano type. Upright, grand, digital or pianola, plus the brand and model if you know it.",
          "Both locations. The suburb or town it's coming from, and the one it's going to.",
          "Preferred date. The day you'd like the piano moved.",
          "Steps. How many at each end, and anything narrow or awkward along the way.",
          "Photos. One of the piano, and one of any tricky access, like the tightest spot it has to get through.",
        ],
      },
      { cta: true },
      { review: reviewBy("Emma C.") },
    ],
  },
]

// Prices first, then what the base rate covers and what changes it, then
// disposal prices and the quick-quote checklist (Gate 7 r3 card groups).
const sections = grouped(qs, [
  ["prices", "zone-rates"],
  ["info", "base-rate", "what-changes-the-price"],
  ["prices", "disposal-cost"],
  ["booking", "quick-quote"],
])

export default function PianoMovingCostPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Piano moving costs"
      h1="Piano moving costs in Melbourne"
      intro={[
        `My rates at Harry The Piano Mover are set by zone and piano type, and they're all here. An upright in the inner suburbs or CBD is $${INNER.upright}. A grand is $${INNER.grand}.`,
        "Steps, tricky access and distance can add to that. Text me a few details and I'll tell you the real number.",
      ]}
      sections={sections}
      service={{
        // Same canonical Service node as the home page (SERVICES icon "piano").
        id: `${BASE_URL}/#service-piano`,
        name: "Piano Moving Melbourne",
        serviceType: "Piano Moving",
        description: `Piano moving across Greater Melbourne priced by zone: uprights $${MOVING_LOW} to $${OUTER_MELB.upright}, grands $${INNER.grand} to $${MOVING_HIGH}. Prices include GST. Up to 4 entry steps included, steps past that $${ACCESS_FEES.perStep} each, a third person from $${ACCESS_FEES.extraHandsFrom} for more than 4 steps without a simple ramp. A move that crosses zones is charged at the higher zone's rate.`,
        offers: movingOffers(),
      }}
    />
  )
}
