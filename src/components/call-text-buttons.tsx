import { Phone, MessageSquare, Mail } from "@/components/icons"
import { BUSINESS, SMS_DISPOSAL_HREF, SMS_QUOTE_HREF, SMS_REHOMING_HREF } from "@/lib/constants"

// Which pre-filled text the Text button sends: the moving quote checklist, or
// the collection-only disposal one.
// "rehoming" is the free-piano page: the wait list form is the primary action
// (/free-pianos/waitlist/, a separate Worker, so a plain anchor), with Text
// Harry as the secondary option. No Call button.
export type SmsKind = "quote" | "disposal" | "rehoming"
export const SMS_HREF: Record<SmsKind, string> = { quote: SMS_QUOTE_HREF, disposal: SMS_DISPOSAL_HREF, rehoming: SMS_REHOMING_HREF }

// Button labels say the outcome (Gate 7 r3). Text is the filled grape primary,
// Call the outlined secondary (globals.css).
export const TEXT_LABEL: Record<SmsKind, string> = {
  quote: "Text for a quote",
  disposal: "Text for a disposal quote",
  rehoming: "Text Harry",
}

// Call / text (and optional email) buttons. Dark ink on the outlined Call and
// white on grape both clear WCAG 1.4.3 (4.5:1) at any size.
// size "sm" is the smaller pair that closes a section; tone "dark" is for a
// dark panel (the Call label turns white).
export function CallTextButtons({
  email = false,
  align = "start",
  sms = "quote",
  size = "md",
  tone = "light",
}: {
  email?: boolean
  align?: "start" | "center"
  sms?: SmsKind
  size?: "md" | "sm"
  tone?: "light" | "dark"
}) {
  const wrap =
    size === "sm"
      ? `btn-pair-sm flex flex-wrap gap-3 justify-center`
      : `flex flex-col sm:flex-row flex-wrap gap-3 ${align === "center" ? "sm:justify-center" : ""}`
  const cls = `${wrap} ${tone === "dark" ? "ctx-dark" : ""}`
  if (sms === "rehoming") {
    return (
      <div className={cls}>
        <a href="/free-pianos/waitlist/" className="btn-text">
          Join the wait list
        </a>
        <a href={SMS_HREF.rehoming} className="btn-secondary">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          {TEXT_LABEL.rehoming}
        </a>
      </div>
    )
  }
  return (
    <div className={cls}>
      <a href={SMS_HREF[sms]} className="btn-text">
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        {TEXT_LABEL[sms]}
      </a>
      <a href={`tel:${BUSINESS.phoneInternational}`} className="btn-call">
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call {BUSINESS.phone}
      </a>
      {email && (
        <a href={`mailto:${BUSINESS.email}`} className="btn-mail">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email Harry
        </a>
      )}
    </div>
  )
}
