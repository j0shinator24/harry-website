import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { ACCESS_FEES, BASE_URL } from "@/lib/constants"
import { INNER, MOVING_ZONES, OUTER_MELB, OUTER_SUB } from "@/lib/rates"

const PATH = "/free-piano-melbourne/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Free Pianos Melbourne | Affordable Entry Level Pianos",
  description:
    "Good, tuned pianos that need a new home in Melbourne. Join my wait list for a budget-friendly entry level piano and only pay delivery at standard zone rates.",
})

const qs: GuideSection[] = [
  {
    id: "really-free",
    q: "Are the pianos free?",
    a: "Yes. You only pay for delivery, at my standard zone rates.",
    body: ["All prices include GST, and my usual access charges apply as normal. The rates are below."],
  },
  {
    id: "condition",
    q: "What condition are they in?",
    a: "Good condition. They have been tuned in the last 5 years, and they are perfectly capable instruments.",
  },
  {
    id: "how-to-join",
    q: "How do I join the wait list?",
    a: "Fill in the wait list form with your name, delivery suburb, email, phone and access details.",
    body: [
      "The [wait list form](/free-pianos/waitlist/) asks for five things.",
      {
        list: [
          "Name.",
          "Delivery suburb.",
          "Email.",
          "Phone.",
          "Access. Steps at the entry, stairs, narrow paths or tight turns, and which floor.",
        ],
      },
      "If you'd rather, text me the same details and I'll add you myself.",
      { cta: true },
    ],
  },
  {
    id: "delivery-cost",
    q: "What does delivery cost?",
    a: "Only the delivery rate needs to be covered, and standard zone rates apply.",
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
    id: "hear-back",
    q: "When will I hear from you?",
    a: "I'll reach out when one becomes available.",
  },
  {
    id: "your-details",
    q: "What happens to my details?",
    a: "I only use them to contact you about the wait list.",
    body: ["[Privacy for free pianos](/free-pianos/privacy/) says what I keep, who sees it and when it's deleted."],
  },
]

const sections = grouped(qs, [
  ["info", "really-free", "condition"],
  ["booking", "how-to-join"],
  ["prices", "delivery-cost"],
  ["info", "hear-back", "your-details"],
])

export default function FreePianoMelbournePage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Free pianos"
      h1="Free pianos in Melbourne: join my wait list"
      intro={[
        "I regularly have pianos in good condition that can be rehomed. These pianos have been tuned in the last 5 years, and are perfectly capable instruments. If you are looking for an inspiring and budget-friendly entry level piano for yourself or your kids to learn on, join my wait list and I will reach out to you when one becomes available. Only the delivery rate needs to be covered (standard zone rates apply).",
      ]}
      sms="rehoming"
      closing={{
        heading: "Join the wait list",
        text: "Fill in the wait list form and I'll reach out when one becomes available.",
      }}
      sections={sections}
      service={{
        id: `${BASE_URL}/#service-rehoming`,
        name: "Free Piano Rehoming Melbourne",
        serviceType: "Piano Rehoming",
        description:
          "Wait list for good, tuned pianos in Melbourne that need a new home. Only the delivery is paid, at Harry's standard zone rates, which include GST.",
      }}
    />
  )
}
