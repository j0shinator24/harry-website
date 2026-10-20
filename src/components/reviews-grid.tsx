import { StarIcon, starRow } from "@/components/icons"
import { BUSINESS, REVIEWS, REVIEW_COUNT, REVIEW_COUNT_AS_OF, REVIEW_SOURCE_LABEL, type Review } from "@/lib/constants"

// Static review grid in a dark card, placed right after "Hey, I'm Harry".
// Three show; the rest sit behind a native <details>, so it works with
// JavaScript off. Each card links to Harry's Google listing, which is where
// the reviews live (there are no per-review links), and says so.
const FIRST = 3

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="glass-dark review">
      <div className="review-stars" role="img" aria-label={`${r.stars} out of 5 stars`}>
        {starRow(r.stars)}
      </div>
      <blockquote className="review-quote">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className="review-cite">
        <span className="font-heading font-bold">{r.name}</span>,{" "}
        <a href={BUSINESS.googleReviews} target="_blank" rel="noopener noreferrer" className="review-src">
          {REVIEW_SOURCE_LABEL}
        </a>
      </figcaption>
    </figure>
  )
}

export function ReviewsGrid() {
  const first = REVIEWS.slice(0, FIRST)
  const rest = REVIEWS.slice(FIRST)
  return (
    <div className="panel-dark sec-wide" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
      <h2 className="font-heading font-black text-3xl sm:text-4xl text-center mb-2 text-white">What Customers Say</h2>
      <p className="text-center mb-6 sm:mb-8 text-white/90 text-lg">From my {REVIEW_COUNT} Google reviews ({REVIEW_COUNT_AS_OF}).</p>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none">
        {first.map((r) => (
          <li key={r.name}>
            <ReviewCard r={r} />
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="group mt-4">
          <summary className="list-none [&::-webkit-details-marker]:hidden flex justify-center cursor-pointer select-none rounded-full focus-visible:outline-none group-open:hidden">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-heading font-bold text-white hover:text-gold hover:border-gold">
              Show {rest.length} more reviews
            </span>
          </summary>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 list-none">
            {rest.map((r) => (
              <li key={r.name}>
                <ReviewCard r={r} />
              </li>
            ))}
          </ul>
        </details>
      )}
      <p className="text-center mt-5">
        <a
          href={BUSINESS.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 text-gold hover:text-white font-heading font-bold text-base sm:text-lg underline underline-offset-4 transition-colors duration-200"
        >
          <StarIcon />
          See all of {REVIEW_SOURCE_LABEL}
        </a>
      </p>
    </div>
  )
}
