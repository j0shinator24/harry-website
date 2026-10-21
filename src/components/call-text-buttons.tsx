import { Phone, MessageSquare, Mail } from "@/components/icons"
import { BUSINESS, EMAIL_REHOMING_HREF, SMS_DISPOSAL_HREF, SMS_QUOTE_HREF, SMS_REHOMING_HREF } from "@/lib/constants"

// Which pre-filled text the Text button sends: the moving quote checklist, or
// the collection-only disposal one.
// "rehoming" is the free-piano waitlist: Text and Email only (no Call), and
// both carry the waitlist details.
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
      {sms !== "rehoming" && (
        <a
          href={`tel:${BUSINESS.phoneInternational}`}
          className="btn-call"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {BUSINESS.phone}
        </a>
      )}
      {(email || sms === "rehoming") && (
        <a
          href={sms === "rehoming" ? EMAIL_REHOMING_HREF : `mailto:${BUSINESS.email}`}
          className="btn-mail"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email Harry
        </a>
      )}
    </div>
  )
}
