/* eslint-disable @next/next/no-img-element -- static export with unoptimised images; a plain img ships no client JS */
// The Melbourne skyline silhouette, standing on top of the footer. Gate 7 r2
// (N4): the band between the last card and the footer is now short (about
// 115 px on a laptop, 56 px on a phone), so the footer sits close to the
// content. Only the dense base of the city fills the band; the towers rise
// behind the last cards (which are opaque), and the solid bottom of the
// silhouette tucks behind the footer's matching near-black. Loaded lazily, and
// never preloaded: it is decoration.
export function SkylineBand() {
  return (
    <div aria-hidden="true" className="relative pointer-events-none" style={{ height: "clamp(56px, 9vw, 130px)" }}>
      <img
        src="/skyline.png"
        alt=""
        aria-hidden="true"
        width={1842}
        height={1578}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 w-full h-auto -z-[5]"
        style={{ mixBlendMode: "darken", bottom: "calc(-1 * min(20vw, 240px))" }}
      />
    </div>
  )
}
