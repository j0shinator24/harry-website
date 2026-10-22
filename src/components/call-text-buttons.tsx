import { Phone, MessageSquare, Mail } from "@/components/icons"
import { BUSINESS, SMS_DISPOSAL_HREF, SMS_QUOTE_HREF, SMS_REHOMING_HREF } from "@/lib/constants"

// Which pre-filled text the Text button sends: the moving quote checklist, or
// the collection-only disposal one.
// "rehoming" is the free-piano page: the gallery and the waitlist form come
// first (Harry's Piano Rehoming, /free-pianos/, 22 Oct 2026), with Text Harry
// kept as the secondary option. No Call button.
export type SmsKind = "quote" | "disposal" | "rehoming"
export const SMS_HREF: Record<SmsKind, string> = { quote: SMS_QUOTE_HREF, disposal: SMS_DISPOSAL_HREF, rehoming: SMS_REHOMING_HREF }

// Call / text (and optional email) buttons. Dark text on gold and white text
// on grape both clear WCAG 1.4.3 (4.5:1) at any size.
export function CallTextButtons({
  email = false,
  align = "start",
  sms = "quote",
}: {
  email?: boolean
  align?: "start" | "center"
  sms?: SmsKind
}) {
  if (sms === "rehoming") {
    return (
      <div className={`flex flex-col sm:flex-row flex-wrap gap-3 ${align === "center" ? "sm:justify-center" : ""}`}>
        <a href="/free-pianos/" className="btn-call">
          See the free pianos
        </a>
        <a href="/free-pianos/waitlist/" className="btn-text">
          Join the waitlist
        </a>
        <a href="/free-pianos/give/" className="btn-mail">
          Give a piano away
        </a>
        <a href={SMS_HREF.rehoming} className="link-grape self-center inline-flex items-center gap-2 py-2">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Or text Harry
        </a>
      </div>
    )
  }
  return (
    <div
      className={`flex flex-col sm:flex-row flex-wrap gap-3 ${align === "center" ? "sm:justify-center" : ""}`}
    >
      <a
        href={SMS_HREF[sms]}
        className="btn-text"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Text Harry
      </a>
      <a
        href={`tel:${BUSINESS.phoneInternational}`}
        className="btn-call"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call {BUSINESS.phone}
      </a>
      {email && (
        <a
          href={`mailto:${BUSINESS.email}`}
          className="btn-mail"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email Harry
        </a>
      )}
    </div>
  )
}
