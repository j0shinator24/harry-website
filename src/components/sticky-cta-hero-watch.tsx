"use client"

import { useEffect } from "react"

// Hides the mobile call / text bar while the page's own opening buttons are on
// screen: the homepage hero (its design is locked) or a guide's opening card
// (#guide-cta), so a page never shows two sets of Text buttons at once. Works on
// the DOM after hydration. The CSS starts the bar off-screen (no flash over the
// buttons) and this adds .cta-on to slide it in; other pages show it always.
export function StickyCtaHeroWatch() {
  useEffect(() => {
    const hero = document.getElementById("hero") ?? document.getElementById("guide-cta")
    const bar = document.querySelector<HTMLElement>(".sticky-cta")
    if (!hero || !bar) return
    // No IntersectionObserver: show the bar rather than leave it hidden for good.
    if (typeof IntersectionObserver === "undefined") {
      bar.classList.add("cta-on")
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        // On screen, or still below the fold: the page's own buttons are what
        // the visitor should use. Only once they have scrolled up and out does
        // the bar slide in.
        const over = e.isIntersecting || e.boundingClientRect.bottom > 0
        bar.classList.toggle("translate-y-full", over)
        bar.classList.toggle("cta-on", !over)
        if (over) {
          bar.setAttribute("aria-hidden", "true")
          bar.setAttribute("inert", "")
        } else {
          bar.removeAttribute("aria-hidden")
          bar.removeAttribute("inert")
        }
      },
      { threshold: 0 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return null
}
