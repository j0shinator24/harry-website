"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

// Loads the inner map component only on the client. Leaflet touches `window`
// during module init, so it cannot run during SSR / static prerender. The
// dynamic import with ssr:false defers it to hydration time, and the
// IntersectionObserver below defers it further: the Leaflet code and the map
// tiles are only fetched once the map is about to scroll into view.
const ZonesMapInner = dynamic(() => import("./zones-map-inner"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
})

function MapPlaceholder() {
  return (
    <div
      className="relative w-full h-[420px] rounded-3xl bg-white/5 flex items-center justify-center text-white/50 text-sm"
      role="img"
      aria-label="Loading service zones map"
    >
      Loading map…
    </div>
  )
}

export function ZonesMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref}>{show ? <ZonesMapInner /> : <MapPlaceholder />}</div>
}
