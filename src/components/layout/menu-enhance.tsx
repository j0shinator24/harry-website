"use client"

import { useEffect } from "react"

// Polish for the header's native <details> menus (they already open and close
// with JavaScript off): close on a link tap, on Escape and on a tap outside,
// and mark the current guide in the menus. Renders nothing.
export function MenuEnhance() {
  useEffect(() => {
    const menus = () => [...document.querySelectorAll<HTMLDetailsElement>("details[data-menu]")]
    const closeAll = () => menus().forEach((m) => (m.open = false))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll()
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element
      for (const m of menus()) {
        if (!m.open) continue
        if (!m.contains(t) || t.closest("a")) m.open = false
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("click", onClick)
    const here = window.location.pathname
    document.querySelectorAll<HTMLAnchorElement>("details[data-menu] a").forEach((a) => {
      if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page")
    })
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onClick)
    }
  }, [])
  return null
}
