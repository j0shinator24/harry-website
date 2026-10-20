import { MessageSquare, Phone } from "@/components/icons"
import { BUSINESS, SMS_DISPOSAL_HREF, SMS_QUOTE_HREF } from "@/lib/constants"
import { StickyCtaHeroWatch } from "@/components/sticky-cta-hero-watch"

// Mobile-only call / text bar fixed to the bottom of the screen. A server
// component: it is in the static HTML and works with JavaScript off. With
// JavaScript on, the tiny watcher below makes it step aside while the
// homepage hero (which has its own call and text buttons) is on screen.
export function StickyCta() {
  return (
    <div
      className="sticky-cta cta-bar"
      style={{ background: "rgba(28,28,28,0.95)", paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={SMS_QUOTE_HREF}
          className="sms-quote bar-text"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text Harry
        </a>
        {/* Shown instead on the disposal guide (globals.css, data-sms). */}
        <a
          href={SMS_DISPOSAL_HREF}
          className="sms-disposal bar-text"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text Harry
        </a>
        <a
          href={`tel:${BUSINESS.phoneInternational}`}
          className="bar-call"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Harry
        </a>
      </div>
      <StickyCtaHeroWatch />
    </div>
  )
}
