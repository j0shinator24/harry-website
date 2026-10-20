import type { RateZone } from "@/lib/constants"

// The gradient rate cards. Used on the homepage and the guide pages, so the
// price display looks identical everywhere. Three zones sit in one row from
// md up (no orphan card); a single zone (disposal) spans the full width with
// its prices side by side. Text colour follows each zone's `ink`, which is
// paired with its gradient to clear WCAG 1.4.3.
function inkClasses(r: RateZone) {
  return r.ink === "dark"
    ? { text: "text-[#1C1C1C]", rule: "border-black/20", soft: "text-[#1C1C1C]" }
    : { text: "text-white", rule: "border-white/30", soft: "text-white/90" }
}

type CardProps = { r: RateZone; wide: boolean; Heading: "h3" | "h4"; hideNote?: boolean; footnote?: React.ReactNode }

function Card({ r, wide, Heading, hideNote, footnote }: CardProps) {
  const ink = inkClasses(r)
  const rows = [
    { label: "Upright Piano", price: r.upright },
    { label: "Grand Piano", price: r.grand },
    ...(r.extras ?? []).map((e) => ({ label: e.label, price: e.price })),
  ]
  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 ${ink.text}`}
      style={{ background: `linear-gradient(135deg, ${r.toneFrom}, ${r.toneTo})` }}
    >
      <Heading className={`rate-h ${ink.rule}`}>{r.label}</Heading>
      <div className={wide ? "grid grid-cols-1 sm:grid-cols-3 sm:gap-6" : ""}>
        {rows.map((row) => (
          <div key={row.label} className="rate-row">
            <span className="rate-label">{row.label}</span>
            <span className="rate-price">${row.price}</span>
          </div>
        ))}
      </div>
      {r.note && (footnote || !hideNote) && (
        <p className={`mt-3 pt-3 border-t ${ink.rule} text-sm sm:text-base leading-relaxed ${ink.soft}`}>{footnote ?? r.note}</p>
      )}
    </div>
  )
}

// hideNote: leave out the small-print note when the page explains it in its
// own words right below. footnote: show this short pointer in its place, so
// an asterisk in the card always has a note to match (the disposal guide's
// "*Mechanism removed?" link to its pianola answer, Gate 7 r3).
export function RateCards({
  zones,
  headingLevel = 3,
  hideNote,
  footnote,
}: {
  zones: readonly RateZone[]
  headingLevel?: 3 | 4
  hideNote?: boolean
  footnote?: React.ReactNode
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4"
  const wide = zones.length === 1
  const cols = zones.length >= 3 ? "md:grid-cols-3" : zones.length === 2 ? "sm:grid-cols-2" : ""
  return (
    <div className={`grid grid-cols-1 ${cols} gap-3 sm:gap-4`}>
      {zones.map((r) => (
        <Card key={r.label} r={r} wide={wide} Heading={Heading} hideNote={hideNote} footnote={footnote} />
      ))}
    </div>
  )
}
