"use client"

import { useEffect } from "react"

// Hides the mobile call / text bar while the homepage hero is on screen (the
// hero has its own buttons and its design is locked). Works on the DOM after
// hydration, so the static HTML keeps the bar visible with JavaScript off.
export function StickyCtaHeroWatch() {
  useEffect(() => {
    const hero = document.getElementById("hero")
    const bar = document.querySelector<HTMLElement>(".sticky-cta")
    if (!hero || !bar || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([e]) => {
        const over = e.isIntersecting
        bar.classList.toggle("translate-y-full", over)
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
