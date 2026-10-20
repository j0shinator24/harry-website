import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { ACCESS_FEES } from "@/lib/constants"
import { reviewBy } from "@/lib/guides"
import {
  INNER,
  MOVING_ZONES,
  PIANOLA_CLAUSE,
  PIANOLA_DISPOSAL,
  movingOffers,
} from "@/lib/rates"

const PATH = "/piano-types/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Grand & Upright Piano Movers Melbourne | Harry The Piano Mover",
  description: `Grand and upright piano movers in Melbourne. How I move uprights, grands, digitals and pianolas. Uprights from $${INNER.upright}, grands from $${INNER.grand}.`,
})

const qs: GuideSection[] = [
  {
    id: "upright",
    q: "How do you move an upright piano?",
    a: "I lift the upright onto my custom-made piano dolly, wheel it into the van and secure it there.",
    body: [
      "Before it moves, I protect your floors and anywhere the piano could come close to touching. For steps I use a ramp when there are 4 or fewer, and custom-made equipment when there are more.",
      { review: reviewBy("Jen J.") },
    ],
  },
  {
    id: "grand",
    q: "How do you move a grand piano?",
    a: "A grand moves the same way as an upright, except I remove the lyre, legs, music stand and lid first to be as careful as possible.",
    body: [
      "Once it's in, I'll give advice on the room, long-term protection for your floors, and where it will sound best.",
    ],
  },
  {
    id: "type-prices",
    q: "How much does it cost to move an upright or a grand?",
    // Two starting prices only: the six cards right below show the rest.
    a: `Moving an upright costs from $${INNER.upright} and a grand from $${INNER.grand} in the Inner Suburbs and CBD, and the price rises by zone out to Outer Melbourne. Every base rate includes up to 4 entry steps or easy ramp access.`,
    body: [
      { rates: MOVING_ZONES },
      "All prices include GST. If a move crosses zones, the higher zone's rate applies.",
      `Access charges are extra. Each base rate covers up to 4 entry steps, tricky access past that adds $${ACCESS_FEES.perStep} per step, and more than 4 steps that can't take a simple ramp need a third person, from $${ACCESS_FEES.extraHandsFrom}.`,
      "[Full price guide](/piano-moving-cost-melbourne/).",
    ],
  },
  {
    id: "digital",
    q: "Do you move digital pianos?",
    a: "Digital pianos are on my list, along with acoustic uprights and grands.",
    body: ["Call or text me the make and model and I'll give you a price."],
  },
  {
    id: "pianola",
    q: "Do you move pianolas?",
    a: "I do, and every pianola gets its own quote, so call or text me with photos and dimensions if you can.",
    body: [
      ...(PIANOLA_DISPOSAL
        ? [`If the pianola is going for good rather than moving house, upright pianola disposal is $${PIANOLA_DISPOSAL.price}.`]
        : []),
      ...(PIANOLA_CLAUSE ? [PIANOLA_CLAUSE] : []),
      "[More on piano disposal](/piano-disposal-melbourne/).",
    ],
  },
  {
    id: "brands",
    q: "Which pianos do you specialise in?",
    a: "I specialise in Japanese, Chinese and European pianos, from brand-new to new-to-you.",
  },
  {
    id: "tuning",
    q: "When should I tune my piano after a move?",
    a: "Wait 3-4 weeks before having your piano tuned in the new space.",
    body: [
      "Tuning isn't one of my skills, but I can help you find a good tuner near you.",
    ],
  },
]

const sections = grouped(qs, [
  ["info", "upright", "grand"],
  ["prices", "type-prices"],
  ["info", "digital", "pianola", "brands"],
  ["info", "tuning"],
])

export default function PianoTypesPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Piano types"
      h1="Grand and upright piano movers in Melbourne"
      intro={[
        "I'm Harry The Piano Mover, and I move uprights, grands and digitals, and pianolas too. I play them as well, so I know what's inside the case.",
        `Uprights start at $${INNER.upright} and grands at $${INNER.grand}.`,
      ]}
      sections={sections}
      service={{
        name: "Grand and Upright Piano Moving Melbourne",
        serviceType: "Piano Moving",
        description: `Upright, grand and digital piano moving in Melbourne by a pianist. Grands have the lyre, legs, music stand and lid removed for the move. Uprights from $${INNER.upright}, grands from $${INNER.grand}.`,
        offers: movingOffers(),
      }}
    />
  )
}
