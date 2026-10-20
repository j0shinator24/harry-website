import { Guitar, House, Music, Piano, Recycle, ShoppingBag, type LineIcon } from "@/components/icons"
import type { Service } from "@/lib/constants"

// One matching icon set for the Specialty Services cards: the same line icon
// family, size, stroke and sunset tile for every service (Gate 7 O7).
const ICONS: Record<Service["icon"], LineIcon> = {
  piano: Piano,
  inhome: House,
  disposal: Recycle,
  marketplace: ShoppingBag,
  band: Guitar,
  busking: Music,
}

// One style object for every tile, so the page payload holds it once.
const TILE_STYLE = { background: "linear-gradient(135deg, #F5B742, #F58C5A)", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }

export function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const Icon = ICONS[icon]
  return (
    <span
      aria-hidden="true"
      className="service-tile"
      style={TILE_STYLE}
    >
      <Icon className="service-glyph" strokeWidth={1.75} />
    </span>
  )
}
