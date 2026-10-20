import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"

const PATH = "/interstate-piano-removals/"

export const metadata = guideMetadata({
  path: PATH,
  title: "Interstate Piano Removals | Harry The Piano Mover",
  description:
    "Interstate piano removals from Melbourne to Sydney and Melbourne to Adelaide, done by Harry himself, by appointment only. Every trip is a custom quote.",
})

const qs: GuideSection[] = [
  {
    id: "interstate",
    q: "Do you move pianos interstate?",
    a: "Yes, I do Melbourne to Sydney and Melbourne to Adelaide myself, by appointment only.",
    body: [
      "Tell me where the piano is now, where it's going and when, and I'll put a quote together for you.",
    ],
  },
  {
    id: "interstate-plan",
    q: "When should I book an interstate move, and how do you plan it?",
    a: "Book as early as you can, because interstate moves are by appointment only.",
    body: [
      "Planning starts the same way as any move. I confirm where the piano is going from and to, its size, brand and model, the access at each end, and when you'd like it moved. Moving within Victoria instead? [Geelong and regional Victoria](/piano-movers-geelong/) has the details.",
    ],
  },
  {
    id: "interstate-cost",
    q: "How much does an interstate piano removal cost?",
    a: "Every interstate move is a custom quote.",
    body: [
      "My Melbourne zone rates are published if you want a feel for local pricing. [Melbourne piano moving costs](/piano-moving-cost-melbourne/).",
    ],
  },
  {
    id: "interstate-quote",
    q: "What do you need from me for an interstate quote?",
    a: "Text me these five things for an interstate quote.",
    body: [
      {
        list: [
          "Piano type. The model too, if you know it.",
          "Both locations. The suburb or town at each end.",
          "Preferred date. The day you'd like the piano moved.",
          "Steps. How many at each end.",
          "Photos. One of the piano, and one of any tricky access.",
        ],
      },
      "If there's a narrow hallway or a tight turn at either end, mention that too.",
      { cta: true },
    ],
  },
  {
    id: "interstate-arrival",
    q: "What should I do once it arrives?",
    a: "Give it three to four weeks before you have it tuned in its new home.",
    body: ["Tuning isn't one of my skills, but I can help you find a good tuner near you."],
  },
]

const sections = grouped(qs, [
  ["info", "interstate", "interstate-plan"],
  ["prices", "interstate-cost"],
  ["booking", "interstate-quote"],
  ["info", "interstate-arrival"],
])

export default function InterstatePianoRemovalsPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Interstate piano removals"
      h1="Interstate piano removals"
      intro={[
        "Harry The Piano Mover does Melbourne to Sydney and Melbourne to Adelaide piano moves himself, by appointment only. Here's how an interstate quote works.",
      ]}
      sections={sections}
      service={{
        name: "Interstate Piano Removals",
        serviceType: "Interstate Piano Moving",
        description:
          "Interstate piano moves from Melbourne to Sydney and from Melbourne to Adelaide, done personally by Harry, by appointment only. Custom quote for every interstate move.",
        areaServed: [
          { "@type": "City", name: "Melbourne" },
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Adelaide" },
        ],
      }}
    />
  )
}
