"use client"

import { useEffect } from "react"

// Fade-up reveal driver. Same pattern as the original static site:
//   - Default state: every .fade-up element is visible (the CSS rule
//     `html.can-animate .fade-up:not(.visible) { opacity: 0 }` only
//     applies once `can-animate` is on <html>).
//   - JS-blocked viewers (Telegram / Messenger / Instagram in-app
//     browsers) never reach this useEffect, so .can-animate is never
//     added, and content stays visible. Graceful degradation.
//   - JS-enabled viewers run the effect AFTER React hydration, so
//     mutating <html>'s className doesn't cause a hydration mismatch.
//     (The previous inline-script implementation ran during HTML
//     parsing, mutating <html> before React hydrated, which produced
//     "A tree hydrated but some attributes didn't match" warnings.)
export function FadeUpReveal() {
  useEffect(() => {
    try {
      const fadeUps = document.querySelectorAll<HTMLElement>(".fade-up")
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      if (typeof IntersectionObserver === "undefined" || reduceMotion || fadeUps.length === 0) return

      document.documentElement.classList.add("can-animate")

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("visible"), i * 70)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 },
      )
      fadeUps.forEach((el) => observer.observe(el))

      // Safety sweep: if something hasn't been revealed within 1.5s
      // (because it's already in view, or the observer missed), force visible.
      const safety = setTimeout(() => fadeUps.forEach((el) => el.classList.add("visible")), 1500)

      return () => {
        clearTimeout(safety)
        observer.disconnect()
      }
    } catch {
      // CSS default already shows everything; nothing to do.
    }
  }, [])

  return null
}
