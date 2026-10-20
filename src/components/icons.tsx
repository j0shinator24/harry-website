// The site's line icons, drawn on the server as plain SVG. Same paths, size,
// stroke and caps as the lucide-react icons they replace (lucide v1.14.0, ISC
// licence), so the page looks identical, but no icon code ships to the browser:
// lucide-react's icon component is a client component, so every icon used to
// cost client JavaScript and a client reference in the page payload.
//
// The star, phone and text icons repeat on every page, so they are drawn once
// as <symbol>s (IconSprite, in the root layout) and reused with <use>. The rest
// appear once or twice a page and keep their paths inline.

type Shape = readonly [tag: "path" | "rect" | "circle", attrs: Readonly<Record<string, string>>]

export type IconProps = { className?: string; strokeWidth?: number }

const STAR: readonly Shape[] = [
  ["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }],
]
const PHONE: readonly Shape[] = [
  ["path", { d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }],
]
const MESSAGE: readonly Shape[] = [
  ["path", { d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }],
]

// The stroke settings live on a <g> inside each icon. That draws exactly as
// the same attributes on the outer <svg> did (they are inherited), but the
// <g> is built once per icon, so every use of an icon renders the very same
// element and React's page payload refers back to it instead of repeating
// it. The outer <svg> only carries what changes: the size classes. Every
// icon is sized by its classes (h-4 w-4 and so on), as before.
type Paint = { fill: string; strokeWidth: number }

function body(list: readonly Shape[], { fill, strokeWidth }: Paint) {
  return (
    <g fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {list.map(([Tag, attrs], i) => (
        <Tag key={i} {...attrs} />
      ))}
    </g>
  )
}

const LINE: Paint = { fill: "none", strokeWidth: 2 }

function lineIcon(list: readonly Shape[]) {
  const drawn = new Map<number, React.ReactElement>()
  function Icon({ className, strokeWidth = 2 }: IconProps) {
    let g = drawn.get(strokeWidth)
    if (!g) {
      g = body(list, { fill: "none", strokeWidth })
      drawn.set(strokeWidth, g)
    }
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        {g}
      </svg>
    )
  }
  return Icon
}

function spriteIcon(id: string) {
  const use = <use href={`#${id}`} />
  function Icon({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        {use}
      </svg>
    )
  }
  return Icon
}

// Rendered once, at the top of <body>.
export function IconSprite() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <symbol id="i-star" viewBox="0 0 24 24">
        {body(STAR, { fill: "currentColor", strokeWidth: 2 })}
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        {body(PHONE, LINE)}
      </symbol>
      <symbol id="i-message" viewBox="0 0 24 24">
        {body(MESSAGE, LINE)}
      </symbol>
    </svg>
  )
}

export const Phone = spriteIcon("i-phone")
export const MessageSquare = spriteIcon("i-message")

// The review star: filled and outlined in the text colour. Size comes from
// the class (h-4 w-4 by default).
const starIcon = spriteIcon("i-star")
export function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return starIcon({ className })
}

// A row of n review stars, built once per n, so every five-star review
// renders the same row and the page payload holds it once.
const starRows = new Map<number, React.ReactElement[]>()
export function starRow(n: number) {
  let row = starRows.get(n)
  if (!row) {
    row = Array.from({ length: n }, (_, i) => <StarIcon key={i} />)
    starRows.set(n, row)
  }
  return row
}

export const ArrowRight = lineIcon([
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }],
])
export const ChevronDown = lineIcon([["path", { d: "m6 9 6 6 6-6" }]])
export const ExternalLink = lineIcon([
  ["path", { d: "M15 3h6v6" }],
  ["path", { d: "M10 14 21 3" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }],
])
export const Mail = lineIcon([
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
])
export const MapPin = lineIcon([
  ["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
])
export const Menu = lineIcon([
  ["path", { d: "M4 5h16" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 19h16" }],
])
export const X = lineIcon([
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }],
])

// Specialty Services icons.
export const Piano = lineIcon([
  ["path", { d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8" }],
  ["path", { d: "M2 14h20" }],
  ["path", { d: "M6 14v4" }],
  ["path", { d: "M10 14v4" }],
  ["path", { d: "M14 14v4" }],
  ["path", { d: "M18 14v4" }],
])
export const House = lineIcon([
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
  ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
])
export const Recycle = lineIcon([
  ["path", { d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" }],
  ["path", { d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" }],
  ["path", { d: "m14 16-3 3 3 3" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598" }],
  ["path", { d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" }],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096" }],
])
export const ShoppingBag = lineIcon([
  ["path", { d: "M16 10a4 4 0 0 1-8 0" }],
  ["path", { d: "M3.103 6.034h17.794" }],
  ["path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" }],
])
export const Guitar = lineIcon([
  ["path", { d: "m11.9 12.1 4.514-4.514" }],
  ["path", { d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z" }],
  ["path", { d: "m6 16 2 2" }],
  ["path", { d: "M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" }],
])
export const Music = lineIcon([
  ["path", { d: "M9 18V5l12-2v13" }],
  ["circle", { cx: "6", cy: "18", r: "3" }],
  ["circle", { cx: "18", cy: "16", r: "3" }],
])

export type LineIcon = typeof ArrowRight
