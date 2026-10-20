import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { reviewBy } from "@/lib/guides"
import { INNER } from "@/lib/rates"
import { ACCESS_FEES } from "@/lib/constants"

const PATH = "/marketplace-piano-delivery/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Marketplace Piano Delivery Melbourne | Harry The Piano Mover",
  description:
    "Bought a piano on Marketplace or online? I collect it from the seller and deliver it to you in Melbourne, without you needing to attend the pick-up.",
})

const qs: GuideSection[] = [
  {
    id: "without-you",
    q: "Can you collect a Marketplace piano without me being there?",
    a: "Yes, pianos bought on Marketplace or online can be delivered without you needing to attend the pick-up.",
    body: [
      "You bought the piano. I'll collect it from the seller and bring it to you.",
      { review: reviewBy("Satya R.") },
    ],
  },
  {
    id: "marketplace-cost",
    q: "How much does Marketplace piano delivery cost?",
    a: "Text me both suburbs and the piano type and I'll quote your delivery.",
    body: [
      `For a reference point, my standard moving rates start at $${INNER.upright} for an upright in the Inner Suburbs and CBD. [See every zone rate](/piano-moving-cost-melbourne/).`,
    ],
  },
  {
    id: "what-to-send",
    q: "What should I send you before the pick-up?",
    a: "Text me these five things before the pick-up.",
    body: [
      {
        list: [
          "Piano type. Upright, grand, digital or pianola, plus the brand and model if you know it.",
          "Both locations. The suburb or town at each end.",
          "Preferred date. The day you'd like the pick-up.",
          "Steps. How many at each end.",
          "Photos. One of the piano, and one of any tricky access.",
        ],
      },
    ],
  },
  {
    id: "extra-items",
    q: "Can you bring other items along with the piano?",
    a: "Yes, I can take additional items alongside your piano.",
    body: ["Just mention them when you ask for a quote.", { cta: true }],
  },
  {
    id: "stairs-at-home",
    q: "What if there are stairs at my place?",
    a: `Tell me how many when you text, because tricky access past the 4 entry steps included in the base rate adds $${ACCESS_FEES.perStep} per step.`,
    body: [
      `More than 4 steps that can't take a simple ramp need a third person, for an additional fee from $${ACCESS_FEES.extraHandsFrom}.`,
      "For 4 or fewer steps I use a ramp, and for more than 4 I bring custom-made equipment. [Stairs, ramps and difficult access](/piano-stairs-difficult-access/).",
    ],
  },
]

// Booking is one block: what to send, anything extra, then the buttons.
const sections = grouped(qs, [
  ["info", "without-you"],
  ["prices", "marketplace-cost"],
  ["booking", "what-to-send", "extra-items"],
  ["info", "stairs-at-home"],
])

export default function MarketplacePianoDeliveryPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Marketplace piano delivery"
      h1="Marketplace piano delivery in Melbourne"
      intro={[
        "Found the right piano on Marketplace or online, but it's on the other side of town? Harry The Piano Mover can pick it up and deliver it to you, without you needing to attend the pick-up.",
      ]}
      sections={sections}
      service={{
        name: "Marketplace Piano Delivery Melbourne",
        serviceType: "Marketplace Deliveries",
        description:
          "Pianos purchased on Marketplace or online delivered across Melbourne without the buyer needing to attend the pick-up.",
      }}
    />
  )
}
