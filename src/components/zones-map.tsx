"use client"

import dynamic from "next/dynamic"

// Loads the inner map component only on the client. Leaflet touches `window`
// during module init, so it cannot run during SSR / static prerender. The
// dynamic import with ssr:false defers it to hydration time. The static
// export still pre-renders the page; this component reaches the browser
// as a placeholder div, then swaps in the interactive map after hydration.
const ZonesMapInner = dynamic(() => import("./zones-map-inner"), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full h-[420px] rounded-3xl bg-white/5 flex items-center justify-center text-white/50 text-sm"
      role="img"
      aria-label="Loading service zones map"
    >
      Loading map…
    </div>
  ),
})

export function ZonesMap() {
  return <ZonesMapInner />
}
