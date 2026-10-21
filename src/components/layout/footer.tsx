/* eslint-disable @next/next/no-img-element -- static export with unoptimised images; a plain img ships no client JS */
import { StarIcon } from "@/components/icons"
import { BUSINESS, HOURS } from "@/lib/constants"

// Minimal footer (Harry, 17 Oct 2026): Google reviews, socials, copyright and
// contact, then the small web-design credit. The guides live in the header's
// Guides menu, so the footer no longer repeats them.
// Class names such as site-footer are defined in app/globals.css (@layer components).
export function Footer() {
  return (
    <footer
      className="site-footer"
      style={{ background: "#030404" }}
    >
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-3">
        <a
          href={BUSINESS.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="foot-reviews"
        >
          <StarIcon className="h-3.5 w-3.5" />
          Google Reviews
        </a>
        <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="foot-social">
          Instagram
        </a>
        <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="foot-social">
          Facebook
        </a>
      </div>
      <p className="leading-relaxed">
        &copy; {new Date().getFullYear()} {BUSINESS.legalName}. {BUSINESS.location}.
      </p>
      <p className="mt-1.5 leading-relaxed">
        <a href={`tel:${BUSINESS.phoneInternational}`} className="foot-contact">
          {BUSINESS.phone}
        </a>
        {" "}&bull;{" "}
        <a href={`mailto:${BUSINESS.email}`} className="foot-contact">
          {BUSINESS.email}
        </a>
      </p>
      <p className="mt-1.5 leading-relaxed">Hours: {HOURS.text}.</p>
      {/* Web-design credit, approved by Harry and Joshua (17 Oct 2026). The
          compact light-ink lockup at its 24px minimum, on the dark ground. */}
      <p className="mt-4">
        <a
          href="https://waylight.com.au"
          rel="nofollow noopener"
          className="foot-credit"
        >
          <span>Website by</span>
          {/* Lazy: it sits at the foot of the page, so the browser no longer
              preloads it ahead of the hero image. */}
          <img src="/waylight-web-design.svg" alt="Waylight Web Design" width={134} height={24} loading="lazy" decoding="async" className="h-6 w-auto" />
        </a>
      </p>
    </footer>
  )
}
