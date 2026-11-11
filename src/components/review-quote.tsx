import { starRow } from "@/components/icons"
import { BUSINESS, REVIEW_SOURCE_LABEL, type Review } from "@/lib/constants"

// One verbatim review on a white card, quoted exactly as it is in REVIEWS.
export function ReviewQuote({ review, source = REVIEW_SOURCE_LABEL, className = "" }: { review: Review; source?: string; className?: string }) {
  return (
    <figure className={`rounded-2xl bg-gray-100 p-4 sm:p-5 border-l-4 border-gold ${className}`}>
      <div className="flex gap-0.5 text-[#B7791F] mb-2" aria-label="5 out of 5 stars" role="img">
        {starRow(5)}
      </div>
      <blockquote className="body-lg italic text-gray-800">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-base text-gray-600">
        {review.name},{" "}
        <a
          href={BUSINESS.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="text-grape underline underline-offset-2 hover:text-plum"
        >
          {source}
        </a>
      </figcaption>
    </figure>
  )
}
