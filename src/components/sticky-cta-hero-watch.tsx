"use client"

import { useEffect } from "react"

// Hides the mobile call / text bar while the homepage hero is on screen (the
// hero has its own buttons and its design is locked). Works on the DOM after
// hydration. On the homepage the CSS starts the bar off-screen (no flash over
// the hero buttons) and adds .cta-on to slide it in; other pages show it always.
export function StickyCtaHeroWatch() {
  useEffect(() => {
    const hero = document.getElementById("hero")
    const bar = document.querySelector<HTMLElement>(".sticky-cta")
    if (!hero || !bar || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([e]) => {
        const over = e.isIntersecting
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
      { threshold: 0.15 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return null
}
