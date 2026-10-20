import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import { reviewBy } from "@/lib/guides"
import { OUTER_MELB } from "@/lib/rates"

const PATH = "/piano-movers-geelong/"

const VIC = { "@type": "AdministrativeArea", name: "Victoria" }

export const metadata = guideMetadata({
  path: PATH,
  title: "Piano Movers Geelong & Regional VIC | Harry The Piano Mover",
  description:
    "Piano movers for Geelong, Ballarat, Bendigo, the Mornington Peninsula, Phillip Island and Lakes Entrance. Anywhere in Victoria with notice. Custom quotes.",
})

const qs: GuideSection[] = [
  {
    id: "geelong",
    q: "Do you move pianos to and from Geelong?",
    a: "Geelong is one of the regional areas I cover outside Greater Melbourne.",
    body: [
      "Whether the piano is heading down the highway to Geelong or coming back up to Melbourne, text me both suburbs and I'll work out a price with you.",
    ],
  },
  {
    id: "regional-areas",
    q: "Which other parts of Victoria do you cover?",
    a: "Besides Geelong, I cover Ballarat, Bendigo, the Mornington Peninsula, Phillip Island and Lakes Entrance, and anywhere else in Victoria with enough notice.",
  },
  {
    id: "plan",
    q: "How do you plan a regional move?",
    a: "When you book, I confirm where the piano is going from and to, its size, brand and model, what the access is like at each end, and when you'd like it moved.",
  },
  {
    id: "long-drive",
    q: "How is the piano kept safe on a long drive?",
    a: "It's lifted onto my custom-made piano dolly, wheeled into the van and secured there before the trip starts.",
    body: [
      "Goods in transit (carriers) insurance covers the piano while it's in my care and in the van, and public liability covers your home or property during the move.",
      { review: reviewBy("Jen J.") },
    ],
  },
  {
    id: "arrival",
    q: "What happens when the piano arrives?",
    a: "I place it where you want it, and give advice on the room, your floors and where it will sound best.",
    body: [
      "Give it three to four weeks before you have it tuned in its new home. Tuning isn't one of my skills, but I can help you find a good tuner near you.",
    ],
  },
  {
    id: "regional-cost",
    q: "How much does a piano move to Geelong or regional Victoria cost?",
    a: "Anything past Outer Melbourne is a custom quote, so text me the details and I'll work it out with you.",
    body: [
      `For a reference point, my Outer Melbourne rate is $${OUTER_MELB.upright} for an upright and $${OUTER_MELB.grand} for a grand. [See every zone and what changes the price](/piano-moving-cost-melbourne/).`,
      { cta: true },
    ],
  },
  {
    id: "notice",
    q: "Do you need notice for a regional move?",
    a: "Yes, with enough notice I can reach anywhere in Victoria, so tell me the date as soon as you have it.",
    body: [
      "If there are stairs or a tricky path at either end, mention that too.",
    ],
  },
  {
    id: "beyond-victoria",
    q: "Can you move a piano interstate?",
    a: "Yes, I do Melbourne to Sydney and Melbourne to Adelaide myself, by appointment only.",
    body: ["[Read about interstate piano removals](/interstate-piano-removals/)."],
  },
]

const sections = grouped(qs, [
  ["info", "geelong", "regional-areas"],
  ["info", "plan", "notice"],
  ["info", "long-drive", "arrival"],
  ["prices", "regional-cost"],
  ["info", "beyond-victoria"],
])

export default function PianoMoversGeelongPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Geelong and regional Victoria"
      h1="Piano movers for Geelong and regional Victoria"
      intro={[
        "Not every piano lives in Melbourne. Besides the metro area, Harry The Piano Mover takes pianos to and from Geelong, Ballarat, Bendigo, the Mornington Peninsula, Phillip Island and Lakes Entrance.",
      ]}
      sections={sections}
      service={{
        name: "Piano Moving Geelong and Regional Victoria",
        serviceType: "Piano Moving",
        description:
          "Piano moving to and from Geelong, Ballarat, Bendigo, the Mornington Peninsula, Phillip Island and Lakes Entrance, and anywhere in Victoria with enough notice. Custom quote beyond Outer Melbourne.",
        areaServed: [
          { "@type": "City", name: "Geelong", containedInPlace: VIC },
          { "@type": "City", name: "Ballarat", containedInPlace: VIC },
          { "@type": "City", name: "Bendigo", containedInPlace: VIC },
          { "@type": "Place", name: "Mornington Peninsula" },
          { "@type": "Place", name: "Phillip Island" },
          { "@type": "Place", name: "Lakes Entrance" },
          VIC,
        ],
      }}
    />
  )
}
