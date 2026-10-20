import { Phone, ExternalLink, MessageSquare } from "@/components/icons"
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
      className="relative glass-dark rounded-2xl p-5 sm:p-6 hover:border-gold/60 transition-colors duration-200"
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
        {/* No star ratings or review counts: copied third-party ratings go
            stale and are not ours to publish (Gate 7 O16). */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">{p.name}</h3>
        <p className="text-white/90 text-base leading-relaxed mb-3">{p.blurb}</p>
        {p.credentials && p.credentials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.credentials.map((c) => (
              <span
                key={c}
                className="inline-block text-xs font-bold tracking-wider uppercase bg-gold/20 text-gold px-2 py-0.5 rounded-full"
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
              className="action-link relative z-[3] inline-flex items-center gap-1.5 bg-gold hover:bg-tangerine text-[#1C1C1C] font-heading font-bold px-3.5 py-2 rounded-full transition-colors duration-150"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {p.phone}
            </a>
          )}
          {mobile && p.phoneIntl && (
            <a
              href={`sms:${p.phoneIntl}`}
              className="action-link relative z-[3] inline-flex items-center gap-1.5 bg-grape hover:bg-plum text-white font-heading font-bold px-3.5 py-2 rounded-full transition-colors duration-150"
              aria-label={`Text ${p.name}`}
            >
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Text
            </a>
          )}
          {p.website && (
            <a
              href={p.website}
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="action-link relative z-[3] inline-flex items-center gap-1 text-gold hover:text-white font-heading font-bold px-2 py-2"
            >
              Website <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
