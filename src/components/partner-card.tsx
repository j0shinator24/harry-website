import { Phone, Star, ExternalLink, MessageSquare } from "lucide-react"
import type { Partner } from "@/lib/constants"

// Australian mobile numbers all start with +614 (the trunk-prefix-removed
// form of 04xx xxx xxx). Landlines (+612, +613, +617, +618) and 13/1300/1800
// service numbers can't receive SMS, so we only render the Text button when
// the international form starts with +614.
function isAuMobile(intl: string | undefined): boolean {
  return !!intl && intl.startsWith("+614")
}

export function PartnerCard({ p }: { p: Partner }) {
  const mobile = isAuMobile(p.phoneIntl)
  return (
    <div
      className="relative glass rounded-2xl p-5 sm:p-6 hover:-translate-y-1 active:scale-[0.98] transition-transform duration-200 fade-up"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
    >
      {p.website && (
        <a
          href={p.website}
          target="_blank"
          rel="noopener nofollow noreferrer"
          aria-label={`Visit ${p.name} website`}
          className="absolute inset-0 z-[1] [text-indent:-9999px] overflow-hidden rounded-2xl"
        >
          {p.name}
        </a>
      )}
      <div className="relative z-[2] pointer-events-none">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="font-heading font-bold text-xl sm:text-2xl text-white">{p.name}</h4>
          <span className="flex-shrink-0 inline-flex items-center gap-1 text-gold font-heading font-bold text-base sm:text-lg">
            <Star className="h-3.5 w-3.5 fill-current" />
            {p.rating.toFixed(1)}
            {typeof p.reviews === "number" && (
              <span className="text-white/60 font-normal">({p.reviews})</span>
            )}
          </span>
        </div>
        <p className="text-white/85 text-sm sm:text-[0.95rem] leading-relaxed mb-3">{p.blurb}</p>
        {p.credentials && p.credentials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.credentials.map((c) => (
              <span
                key={c}
                className="inline-block text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-gold/20 text-gold px-2 py-0.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-sm pointer-events-auto">
          {p.phoneIntl && (
            <a
              href={`tel:${p.phoneIntl}`}
              className="action-link relative z-[3] inline-flex items-center gap-1.5 bg-tangerine/90 hover:bg-coral text-white font-heading font-bold px-3 py-1.5 rounded-full transition-colors duration-150"
            >
              <Phone className="h-3.5 w-3.5" />
              {p.phone}
            </a>
          )}
          {mobile && p.phoneIntl && (
            <a
              href={`sms:${p.phoneIntl}`}
              className="action-link relative z-[3] inline-flex items-center gap-1.5 bg-grape/90 hover:bg-plum text-white font-heading font-bold px-3 py-1.5 rounded-full transition-colors duration-150"
              aria-label={`Text ${p.name}`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Text
            </a>
          )}
          {p.website && (
            <a
              href={p.website}
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="action-link relative z-[3] inline-flex items-center gap-1 text-gold/90 hover:text-gold font-heading font-medium px-2 py-1.5"
            >
              Website <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
