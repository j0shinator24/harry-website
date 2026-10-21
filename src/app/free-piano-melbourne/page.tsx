import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { ACCESS_FEES, BASE_URL } from "@/lib/constants"
import { INNER, MOVING_ZONES, OUTER_MELB, OUTER_SUB } from "@/lib/rates"

const PATH = "/free-piano-melbourne/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Free Pianos Melbourne | Harry's Piano Rehoming Waitlist",
  description:
    "Harry The Piano Mover rehomes free pianos in Melbourne. The piano is free, you pay delivery at standard rates. Join the waitlist by text or email.",
})

const qs: GuideSection[] = [
  {
    id: "how-to-join",
    q: "How to join the waitlist",
    a: "Text or email me these five things and I'll add you to the waitlist.",
    body: [
      {
        list: [
          "Name.",
          "Delivery suburb.",
          "Email.",
          "Phone.",
          "Access. Steps at the entry, stairs, narrow paths or tight turns, and which floor.",
        ],
      },
      { cta: true },
    ],
  },
  {
    id: "delivery-cost",
    q: "What does delivery cost?",
    a: "The piano is free. You pay delivery at my standard zone rates.",
    body: [
      "All prices include GST.",
      {
        rates: MOVING_ZONES,
        schema: `An upright costs $${INNER.upright} in the Inner Suburbs and CBD, $${OUTER_SUB.upright} in the Outer Suburbs and $${OUTER_MELB.upright} in Outer Melbourne, and a grand costs $${INNER.grand}, $${OUTER_SUB.grand} or $${OUTER_MELB.grand} across the same three zones.`,
      },
      "If a move crosses zones, the higher zone's rate applies.",
      `My usual access charges apply too. Tricky access past the 4 entry steps included in the base rate adds $${ACCESS_FEES.perStep} per step, and more than 4 steps that can't take a simple ramp need a third person, from $${ACCESS_FEES.extraHandsFrom}. [Stairs, ramps and difficult access](/piano-stairs-difficult-access/). [Every zone rate and what changes the price](/piano-moving-cost-melbourne/).`,
    ],
  },
  {
    id: "really-free",
    q: "Is the piano really free?",
    a: "Yes. The piano is free, and you only pay for delivery.",
  },
  {
    id: "faq-how-to-join",
    q: "How do I join?",
    a: "Text or email me your name, delivery suburb, email, phone and access details.",
    body: ["The list is under [how to join the waitlist](#how-to-join)."],
  },
  {
    id: "hear-back",
    q: "When will I hear back?",
    a: "I'll get in touch when a piano is available for you.",
  },
  {
    id: "your-details",
    q: "What happens to my details?",
    a: "I only use them to contact you about the waitlist.",
  },
]

const sections = grouped(qs, [
  ["booking", "how-to-join"],
  ["prices", "delivery-cost"],
  ["info", "really-free", "faq-how-to-join", "hear-back", "your-details"],
])

export default function FreePianoMelbournePage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Free pianos"
      h1="Free pianos in Melbourne: Harry's Piano Rehoming waitlist"
      intro={[
        "I have two pianos that need a new home right now. The piano is free, and you only pay delivery at my standard zone rates.",
        "Join the waitlist by text or email and I'll get in touch when a piano is available for you.",
      ]}
      sms="rehoming"
      closing={{
        heading: "Join the waitlist",
        text: "Text or email me your name, delivery suburb, email, phone and access details, and I'll get in touch when a piano is available for you.",
      }}
      sections={sections}
      service={{
        id: `${BASE_URL}/#service-rehoming`,
        name: "Free Piano Rehoming Melbourne",
        serviceType: "Piano Rehoming",
        description:
          "Harry's Piano Rehoming waitlist for free pianos in Melbourne. The piano is free and the person taking it pays delivery at Harry's standard zone rates, which include GST.",
      }}
    />
  )
}
