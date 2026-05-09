import Link from "next/link"
import { Star } from "lucide-react"
import { BUSINESS } from "@/lib/constants"

export function Footer() {
  return (
    <footer
      className="text-center py-8 px-4 sm:px-5 text-white/55 text-sm relative z-10"
      style={{ background: "rgba(28,28,28,0.5)" }}
    >
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-3">
        <a
          href={BUSINESS.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-tangerine hover:underline transition-colors duration-200 py-2 px-2 inline-flex items-center gap-1.5"
        >
          <Star className="h-3.5 w-3.5 fill-current" />
          Google Reviews
        </a>
        <a
          href={BUSINESS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-gold transition-colors duration-200 py-2 px-2 inline-block"
        >
          Instagram
        </a>
        <Link href="#partners" className="text-white/60 hover:text-gold transition-colors duration-200 py-2 px-2 inline-block">
          Friends of the Keys
        </Link>
      </div>
      <p className="leading-relaxed">
        &copy; {new Date().getFullYear()} {BUSINESS.legalName}. {BUSINESS.location}.
      </p>
      <p className="mt-1.5 leading-relaxed">
        <a href={`tel:${BUSINESS.phoneInternational}`} className="text-gold hover:underline py-1 px-1 inline-block">
          {BUSINESS.phone}
        </a>
        {" "}&bull;{" "}
        <a href={`mailto:${BUSINESS.email}`} className="text-gold hover:underline py-1 px-1 inline-block">
          {BUSINESS.email}
        </a>
      </p>
    </footer>
  )
}
