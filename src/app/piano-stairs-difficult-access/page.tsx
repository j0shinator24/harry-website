import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { ACCESS_FEES } from "@/lib/constants"
import { reviewBy } from "@/lib/guides"
import { INNER, accessOffers } from "@/lib/rates"

const PATH = "/piano-stairs-difficult-access/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Pianos on Stairs & Tight Access | Harry The Piano Mover",
  description: `Moving a piano up or down stairs in Melbourne. Ramp for 4 or fewer steps, custom equipment for more. $${ACCESS_FEES.perStep} per step past base access, a third person from $${ACCESS_FEES.extraHandsFrom}.`,
})

const qs: GuideSection[] = [
  {
    id: "stairs",
    q: "Can you move a piano up or down stairs?",
    a: "Of course: I use a ramp for 4 or fewer steps and custom-made equipment to go up or down more than 4.",
    body: [
      "The piano is lifted onto my custom-made piano dolly and wheeled safely into the van, where it's secured and ready to go.",
      { review: reviewBy("Luke S.") },
    ],
  },
  {
    id: "stairs-cost",
    q: "How much extra do stairs cost?",
    a: `My base rates include up to 4 entry steps or easy ramp access, and tricky access past that adds $${ACCESS_FEES.perStep} per step.`,
    body: [
      `So an upright in the inner suburbs with easy access is $${INNER.upright}, and tricky steps past the base access are added at $${ACCESS_FEES.perStep} each. [See every zone rate](/piano-moving-cost-melbourne/).`,
      "All prices include GST.",
    ],
  },
  {
    id: "extra-hands",
    q: "When do you need a third person?",
    a: `More than 4 steps that can't take a simple ramp need a third person, for an additional fee from $${ACCESS_FEES.extraHandsFrom}.`,
    body: [
      "When you book, I confirm what the access is like: stairs, narrow paths or anything difficult. The more I know up front, the better I can plan it.",
    ],
  },
  {
    id: "narrow-paths",
    q: "What about narrow hallways and tight side paths?",
    a: "I plan narrow hallways and tight side paths from your photos before moving day, and protect anywhere the piano could come close to touching.",
    body: [
      "When you ask for a quote, a photo of the tightest spot is worth more than a description.",
      { review: reviewBy("Bruce B.") },
    ],
  },
  {
    id: "floors",
    q: "How do you protect my floors?",
    a: "Before the piano moves, I protect your floors and anywhere the piano could come close to touching.",
    body: [
      "Once it's in place, I'll also give advice on long-term protection for your floors.",
    ],
  },
  {
    id: "placement",
    // Harry's own wording (17 Oct 2026), punctuation only.
    q: "Where should the piano go in a room?",
    a: "Pianos should be kept away from outside walls and windows, but wherever you want it, pedantry included! I can give advice on the room's environmental factors and where it will look and sound best.",
    body: [
      "I play as well as move pianos, so I'm happy to talk through the spot with you.",
    ],
  },
  {
    id: "within-home",
    q: "Can you move my piano out of the way while the floors are done?",
    a: "Yes. I move pianos within the same home, for example while floors are being restored or installed. Out of the way for a couple of weeks, then back in place.",
    body: [
      "A grand can sometimes stay on my equipment in between, so it doesn't need fully setting up twice. Call or text for a quote.",
    ],
  },
  {
    id: "insurance",
    q: "Are you insured if something goes wrong?",
    a: "Yes, your home or property is insured during the move, and your piano is insured while it's in my care and while it travels in the van.",
    body: [
      "Public liability insurance covers your home or property during the move. Goods in transit (carriers) insurance covers the piano while it's in my care and in the van. Both are active and current.",
      { cta: true },
    ],
  },
]

const sections = grouped(qs, [
  ["info", "stairs"],
  ["prices", "stairs-cost", "extra-hands"],
  ["info", "narrow-paths"],
  ["info", "floors", "placement", "within-home"],
  ["info", "insurance"],
])

export default function PianoStairsPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Stairs and difficult access"
      h1="Moving a piano up stairs and through tight spaces"
      intro={[
        "Stairs, narrow hallways and tight side paths are where a piano move gets interesting, and they're where Harry The Piano Mover earns his keep. For 4 or fewer steps I use a ramp. Past that, my custom-made equipment comes out.",
        `My base rates include up to 4 entry steps or easy ramp access. Past that, it's $${ACCESS_FEES.perStep} a step. More than 4 steps that can't take a simple ramp need a third person, from $${ACCESS_FEES.extraHandsFrom}.`,
      ]}
      sections={sections}
      service={{
        name: "Piano Moving on Stairs and Difficult Access",
        serviceType: "Piano Moving",
        description: `Piano moves with stairs, narrow paths and difficult access in Melbourne, plus moves within the same home while floors are done. Up to 4 entry steps included; ramp for 4 or fewer steps, custom-made equipment for more. $${ACCESS_FEES.perStep} per step past that, a third person from $${ACCESS_FEES.extraHandsFrom} for more than 4 steps without a simple ramp. Prices include GST.`,
        offers: accessOffers(),
      }}
    />
  )
}
