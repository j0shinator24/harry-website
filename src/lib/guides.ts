import { REVIEWS, type Review } from "@/lib/constants"

// The guide pages, in one list so the Guides menu, the sitemap and the 404
// page can never fall out of step.
export const GUIDES = [
  { href: "/piano-moving-cost-melbourne/", label: "Piano moving costs in Melbourne" },
  { href: "/piano-disposal-melbourne/", label: "Piano disposal in Melbourne" },
  { href: "/piano-types/", label: "Grand, upright and digital pianos" },
  { href: "/piano-stairs-difficult-access/", label: "Stairs and difficult access" },
  { href: "/marketplace-piano-delivery/", label: "Marketplace piano delivery" },
  { href: "/piano-movers-geelong/", label: "Geelong and regional Victoria" },
  { href: "/interstate-piano-removals/", label: "Interstate piano removals" },
] as const

export type GuideHref = (typeof GUIDES)[number]["href"]

// Harry's own photos, one per guide page. Alt text is factual (via
// Ghostwriter): none of these shows a move in progress. No visible captions
// (Harry, 17 Oct 2026).
type Photo = { src: string; w: number; h: number; alt: string; pos: string }
const P1: Photo = { src: "/harry-piano-1.jpg", w: 900, h: 1200, alt: "Harry at the piano on a Melbourne rooftop", pos: "center 72%" }
const P2: Photo = { src: "/harry-piano-2.jpg", w: 900, h: 1200, alt: "A grand on a rooftop terrace at sunset", pos: "center 70%" }
const P3: Photo = { src: "/harry-piano-3.jpg", w: 900, h: 1200, alt: "A grand overlooking Melbourne's parkland", pos: "center 62%" }
const P4: Photo = { src: "/harry-busking.jpg", w: 900, h: 900, alt: "Harry busking on a Melbourne street", pos: "center" }
export const GUIDE_PHOTOS: Record<GuideHref, Photo> = {
  "/piano-moving-cost-melbourne/": P1,
  "/piano-disposal-melbourne/": P2,
  "/piano-types/": P3,
  "/piano-stairs-difficult-access/": P4,
  "/marketplace-piano-delivery/": P2,
  "/piano-movers-geelong/": P3,
  "/interstate-piano-removals/": P1,
}

// Reviews are quoted exactly as they appear in REVIEWS, never edited.
export function reviewBy(name: string): Review {
  const r = REVIEWS.find((x) => x.name === name)
  if (!r) throw new Error(`Review missing from REVIEWS: ${name}`)
  return r
}
