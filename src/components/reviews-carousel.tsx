"use client"

import { useEffect, useRef } from "react"
import { Star } from "lucide-react"
import { REVIEWS, BUSINESS } from "@/lib/constants"

export function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Auto-scroll: advances one card every 4s, pauses on hover/touch.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let paused = false
    const pause = () => { paused = true }
    const resume = () => { paused = false }

    track.addEventListener("pointerenter", pause)
    track.addEventListener("pointerleave", resume)

    const id = setInterval(() => {
      if (paused || !track) return
      const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? 300
      const gap = 16
      const maxScroll = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        track.scrollBy({ left: cardWidth + gap, behavior: "smooth" })
      }
    }, 4000)

    return () => {
      clearInterval(id)
      track.removeEventListener("pointerenter", pause)
      track.removeEventListener("pointerleave", resume)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h3
        className="font-heading font-bold text-xl sm:text-2xl text-center mb-5 sm:mb-6 text-white"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
      >
        What Customers Say
      </h3>

      {/* CSS scroll-snap carousel. Works without JS in WebViews. */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 px-1"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",          /* Firefox */
          msOverflowStyle: "none",         /* IE/Edge */
        }}
      >
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="glass rounded-2xl p-5 sm:p-6 flex-shrink-0 w-[280px] sm:w-[320px]"
            style={{
              scrollSnapAlign: "start",
              boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-gold fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-4 italic">
              &ldquo;{r.text}&rdquo;
            </p>
            <p className="text-white/60 text-sm sm:text-base font-heading font-bold">
              {r.name}
            </p>
          </div>
        ))}
      </div>

      {/* Hide scrollbar for Webkit (Chrome/Safari) */}
      <style>{`
        div[style*="scroll-snap-type"]::-webkit-scrollbar { display: none; }
      `}</style>

      <p className="text-center mt-4 sm:mt-5">
        <a
          href={BUSINESS.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold hover:text-tangerine font-heading font-bold text-base sm:text-lg transition-colors duration-200 py-2 px-2"
        >
          <Star className="h-4 w-4 fill-current" aria-hidden="true" />
          See all reviews on Google
        </a>
      </p>
    </div>
  )
}
