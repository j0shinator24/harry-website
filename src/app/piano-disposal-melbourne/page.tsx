import { GuidePage, grouped, guideMetadata, type GuideSection } from "@/components/guide-page"
import {
  DISPOSAL,
  DISPOSAL_INCLUDES,
  disposalOffer,
  INNER,
  PIANOLA_DISPOSAL,
} from "@/lib/rates"

const PATH = "/piano-disposal-melbourne/"

const pianolaPart = PIANOLA_DISPOSAL ? `, and $${PIANOLA_DISPOSAL.price} for an upright pianola` : ""

export const metadata = guideMetadata({
  path: PATH,
  title: "Piano Disposal Melbourne | Harry The Piano Mover",
  description: `Piano disposal in Melbourne: $${DISPOSAL.upright} upright, $${DISPOSAL.grand} grand. I remove the piano, recycle what's worth saving and dispose of the rest responsibly.`,
})

const qs: GuideSection[] = [
  {
    id: "disposal-cost",
    q: "How much does piano disposal cost in Melbourne?",
    a: `Piano disposal is $${DISPOSAL.upright} for an upright and $${DISPOSAL.grand} for a grand${pianolaPart}.`,
    body: [
      PIANOLA_DISPOSAL
        ? { rates: [DISPOSAL], footnote: "*Mechanism removed? [See how I price pianolas](#pianola)." }
        : { rates: [DISPOSAL], hideNote: true },
      DISPOSAL_INCLUDES,
    ],
  },
  ...(PIANOLA_DISPOSAL
    ? [
        {
          id: "pianola",
          q: "How is an upright pianola priced for disposal?",
          a: `Disposing of an upright pianola costs $${PIANOLA_DISPOSAL.price}.`,
          body: [
            "If the mechanism has been removed, it may be assessed as a standard piano depending on its dimensions and access, so send me photos and measurements and I'll tell you which price applies.",
          ],
        },
      ]
    : []),
  {
    id: "what-happens",
    q: "What happens to the piano after you take it away?",
    a: "I recycle what's worth saving and dispose of the rest responsibly.",
  },
  {
    id: "restore-or-dispose",
    q: "Is it worth restoring an old piano instead?",
    a: "Not always: in my experience, disposal is often cheaper than a piano restoration quote that would never break even.",
    body: [
      "If yours is beyond repair, letting it go is usually the sensible call. If you're replacing it, the [Melbourne piano sales and rental folks I recommend](/#partners) are on my homepage.",
      `When the new one is ready, I can move it in too. Moves start at $${INNER.upright} for an upright in the inner suburbs. [See every moving rate](/piano-moving-cost-melbourne/).`,
    ],
  },
  {
    id: "book-disposal",
    q: "How do I book a piano disposal?",
    a: "Text me these five things and I'll get back to you within a few hours.",
    body: [
      {
        list: [
          "Piano type. The model too, if you know it.",
          "Location. The suburb or town it's in.",
          "Preferred date. The day you'd like it removed.",
          "Steps. How many there are.",
          "Photos. One of the piano, and one of any tricky access.",
        ],
      },
      "Lots of steps or a tight path? Mention it up front.",
      { cta: true },
    ],
  },
]

// "What happens" is its own question again (Gate 7 r4 N10), sharing the
// white card with the restoration question; the intro no longer says it.
const sections = grouped(qs, [
  ["prices", "disposal-cost", ...(PIANOLA_DISPOSAL ? ["pianola"] : [])],
  ["info", "what-happens", "restore-or-dispose"],
  ["booking", "book-disposal"],
])

export default function PianoDisposalPage() {
  return (
    <GuidePage
      path={PATH}
      crumb="Piano disposal"
      h1="Piano disposal in Melbourne"
      intro={[
        "Some pianos are past saving. If yours is beyond repair, Harry The Piano Mover will handle the removal.",
        `It costs $${DISPOSAL.upright} for an upright and $${DISPOSAL.grand} for a grand, and I do all the lifting.`,
      ]}
      sections={sections}
      sms="disposal"
      service={{
        name: "Piano Disposal Melbourne",
        serviceType: "Piano Disposal",
        description: `Piano removal and disposal in Melbourne. Pianos beyond repair are recycled where worth saving and the rest disposed of responsibly. Upright $${DISPOSAL.upright}, grand $${DISPOSAL.grand}${pianolaPart}. ${DISPOSAL_INCLUDES}`,
        offers: disposalOffer(),
      }}
    />
  )
}
