import { StarIcon } from "@/components/icons"
import { BUSINESS, REVIEW_COUNT } from "@/lib/constants"

// "5.0 stars from 107 Google reviews", linked to Harry's Google listing.
// The count comes from REVIEW_COUNT so it moves with the reviews section.
// tone "light" sits on white cards, "dark" on the deep-plum cards.
export function RatingLine({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <a
      href={BUSINESS.googleReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={`${tone === "light" ? "rating-link-light" : "rating-link-dark"} ${className}`}
    >
      <StarIcon className="h-4 w-4 fill-current" />
      5.0 stars from {REVIEW_COUNT} Google reviews
    </a>
  )
}
