/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors on purpose: static pages with no client router code (Gate 7 r2 O11) */
import type { Metadata } from "next"
import { Picture } from "@/components/picture"
import { starRow } from "@/components/icons"
import { CallTextButtons, type SmsKind } from "@/components/call-text-buttons"
import { RateCards } from "@/components/rate-cards"
import { FadeUpReveal } from "@/components/fade-up-reveal"
import { BASE_URL, BUSINESS, LAST_UPDATED, LLMS_ALTERNATE, REVIEW_SOURCE_LABEL, type RateZone, type Review } from "@/lib/constants"
import { RATES_CONFIRMED } from "@/lib/rates"
import { GUIDE_PHOTOS, type GuideHref } from "@/lib/guides"

// Shared layout for the guide pages (cost, disposal, piano types, regional,
// interstate, stairs, Marketplace). Each page passes plain data; this file
// renders the visible page and the matching Service, BreadcrumbList and
// FAQPage JSON-LD, so the schema is always a word-for-word mirror of the page.

// Text supports inline links written as [label](/path/).
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function plain(text: string): string {
  return text.replace(LINK_RE, "$1")
}

const RICH_LINK = "link-grape"

function Rich({ text, linkClass = RICH_LINK }: { text: string; linkClass?: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK_RE)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    out.push(
      <a key={i} href={m[2]} className={linkClass}>
        {m[1]}
      </a>,
    )
    last = i + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

export type Block =
  | string
  | { list: readonly string[] }
  // footnote: replaces the card's small print with a short pointer (inline
  // [link](#anchor) allowed) when the page explains the note just below.
  // schema: the cards' prices as plain sentences for the FAQPage answer, when
  // the visible answer only points at the cards (the cards are not in it).
  | { rates: readonly RateZone[]; hideNote?: true; footnote?: string; schema?: string }
  | { review: Review }
  | { cta: true }

export type GuideSection = {
  id: string
  q: string
  // One-sentence direct answer, shown first under the question.
  a: string
  body?: readonly Block[]
}

// Related questions share one continuous card (Gate 7 r3), so a one-line
// answer no longer gets the same weight as a price schedule. Each question
// keeps its own heading and anchor id. The card's treatment says what kind of
// help it holds: prices (warm, gold edge), booking (lilac, grape edge) or
// everything else (plain white).
export type GuideKind = "info" | "prices" | "booking"
export type GuideGroup = { kind: GuideKind; items: readonly GuideSection[] }

// Builds the cards from a page's questions: each entry is a kind followed by
// the ids it holds, in order. Every question must be used exactly once, so a
// question can never drop off the page (or out of the FAQPage schema).
export function grouped(qs: readonly GuideSection[], spec: readonly (readonly [GuideKind, ...string[]])[]): GuideGroup[] {
  const byId = new Map(qs.map((q) => [q.id, q]))
  const used = new Set<string>()
  const groups = spec.map(([kind, ...ids]) => ({
    kind,
    items: ids.map((id) => {
      const q = byId.get(id)
      if (!q || used.has(id)) throw new Error(`Guide question missing or used twice: ${id}`)
      used.add(id)
      return q
    }),
  }))
  const left = qs.filter((q) => !used.has(q.id)).map((q) => q.id)
  if (left.length) throw new Error(`Guide questions not placed in a card: ${left.join(", ")}`)
  return groups
}

const KIND_CLASS: Record<GuideKind, string> = {
  info: "card-white",
  prices: "card-prices",
  booking: "card-booking",
}

export type GuideService = {
  // Overrides the default per-page Service @id, so a guide can describe a
  // service that already has a canonical URI elsewhere (e.g. the home page).
  id?: string
  name: string
  serviceType: string
  description: string
  areaServed?: unknown
  offers?: unknown
}

export type GuidePageProps = {
  path: GuideHref
  crumb: string
  h1: string
  intro: readonly string[]
  // Anchor ids for intro paragraphs, by index (a short answer folded into the
  // intro keeps its old anchor).
  introIds?: Readonly<Record<number, string>>
  sections: readonly GuideGroup[]
  service: GuideService
  // Which pre-filled text every "Text Harry" button on the page sends.
  sms?: SmsKind
}

const DEFAULT_AREA = {
  "@type": "City",
  name: "Melbourne",
  containedInPlace: { "@type": "AdministrativeArea", name: "Victoria" },
}

// Each guide has its own 1200 x 630 share card in public/og/ (Harry's photo
// and the page's H1), so a shared link shows which guide it is.
export function guideOgImage(path: string, title: string) {
  return { url: `/og/${path.replace(/\//g, "")}.jpg`, width: 1200, height: 630, alt: title }
}

export function guideMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const og = guideOgImage(path, title)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, types: LLMS_ALTERNATE },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: BUSINESS.name,
      title,
      description,
      url: `${BASE_URL}${path}`,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.url],
    },
  }
}

// FAQPage answer text: the visible answer as plain sentences. A sentence that
// is only a link ("[Full price guide](/...).") is navigation, not answer, so
// it is dropped; an inline link keeps its words. List items become sentences
// (a list of bare names is skipped), so nothing runs together.
function sentenceText(text: string): string {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.replace(LINK_RE, "").replace(/[\s.!?,]/g, "") !== "")
    .map(plain)
    .join(" ")
}

function listText(items: readonly string[]): string {
  const clean = items.map(sentenceText).filter(Boolean)
  // A list of bare names restates the answer above it, so it adds nothing.
  return clean.every((i) => /[.!?]$/.test(i)) ? clean.join(" ") : ""
}

function answerText(s: GuideSection): string {
  const parts = [s.a]
  for (const b of s.body ?? []) {
    if (typeof b === "string") parts.push(sentenceText(b))
    else if ("list" in b) parts.push(listText(b.list))
    else if ("rates" in b && b.schema) parts.push(b.schema)
  }
  return parts.filter(Boolean).join(" ")
}

const cardShadow = { boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }

const GUIDE_BYLINE = "By Harry, pianist and piano mover at Harry The Piano Mover. Updated October 2026."

function BlockView({ block, sms }: { block: Block; sms: SmsKind }) {
  if (typeof block === "string") {
    return (
      <p className="body-lg">
        <Rich text={block} />
      </p>
    )
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2 body-lg list-disc pl-6 marker:text-grape">
        {block.list.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    )
  }
  if ("rates" in block) {
    return (
      <div>
        <RateCards
          zones={block.rates}
          hideNote={block.hideNote}
          footnote={block.footnote ? <Rich text={block.footnote} linkClass="font-bold underline underline-offset-2 hover:opacity-80" /> : undefined}
        />
        <p className="mt-3 text-base text-gray-600">Rates confirmed {RATES_CONFIRMED}.</p>
      </div>
    )
  }
  if ("review" in block) {
    return (
      <figure className="rounded-2xl bg-gray-100 p-4 sm:p-5 border-l-4 border-gold">
        <div className="flex gap-0.5 text-[#B7791F] mb-2" aria-label="5 out of 5 stars" role="img">
          {starRow(5)}
        </div>
        <blockquote className="body-lg italic text-gray-800">
          &ldquo;{block.review.text}&rdquo;
        </blockquote>
        <figcaption className="mt-2 text-base text-gray-600">
          {block.review.name},{" "}
          <a
            href={BUSINESS.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="text-grape underline underline-offset-2 hover:text-plum"
          >
            {REVIEW_SOURCE_LABEL}
          </a>
        </figcaption>
      </figure>
    )
  }
  return <CallTextButtons sms={sms} />
}

export function GuidePage({ path, crumb, h1, intro, introIds, sections, service, sms = "quote" }: GuidePageProps) {
  const url = `${BASE_URL}${path}`
  const questions = sections.flatMap((g) => g.items)
  const photo = GUIDE_PHOTOS[path]

  const serviceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": service.id ?? `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: service.areaServed ?? DEFAULT_AREA,
  }
  if (service.offers) serviceSchema.offers = service.offers

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: h1,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#business` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: `${BASE_URL}${guideOgImage(path, h1).url}`,
    mainEntity: { "@id": service.id ?? `${url}#service` },
    // Matches the visible byline ("By Harry ... Updated October 2026"). No
    // datePublished: these guides are not live yet, so that date is unknown.
    author: { "@id": `${BASE_URL}/#harry` },
    dateModified: LAST_UPDATED[path],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: crumb, item: url },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: questions.map((s) => ({
      "@type": "Question",
      name: s.q,
      acceptedAnswer: { "@type": "Answer", text: answerText(s) },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* data-sms lets the site-wide mobile call/text bar switch to this
          page's text template in CSS (globals.css), with or without JS. */}
      <div className="px-4 sm:px-5 pt-8 sm:pt-12 pb-8 sm:pb-10" data-sms={sms}>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <header className="card-white rounded-3xl p-5 sm:p-8 md:p-12" style={cardShadow}>
            <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-base text-gray-600 list-none">
                <li>
                  <a href="/" className="link-grape">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="flex-1">
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-grape mb-2 sm:mb-3">
                  {h1}
                </h1>
                {/* Who the guidance comes from (Gate 7 r2, copy via Ghostwriter). */}
                <p className="text-base text-gray-600 mb-4 sm:mb-5">{GUIDE_BYLINE}</p>
                <div className="space-y-3 mb-6">
                  {intro.map((p, i) => (
                    <p key={p} id={introIds?.[i]} className="body-lg">
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
                <CallTextButtons sms={sms} />
              </div>
              {/* One of Harry's own photos on every guide (Gate 7 O23). */}
              <figure className="md:w-60 flex-shrink-0">
                <div className="relative aspect-[16/10] md:aspect-[4/5] overflow-hidden rounded-2xl" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                  <Picture
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    priority
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: photo.pos }}
                  />
                </div>
              </figure>
            </div>
          </header>

          {sections.map((g) => (
            <div
              key={g.items[0].id}
              className={`${KIND_CLASS[g.kind]} guide-card fade-up`}
              style={cardShadow}
            >
              {g.items.map((s, n) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-h`}
                  className={`${n > 0 ? "guide-q-next" : ""}`}
                >
                  <h2
                    id={`${s.id}-h`}
                    className={`guide-h2 ${n > 0 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}
                  >
                    {s.q}
                  </h2>
                  <div className="space-y-4">
                    <p className="answer-lead">{s.a}</p>
                    {s.body?.map((b, i) => (
                      <BlockView key={i} block={b} sms={sms} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}

          <section aria-labelledby="quote-h" className="card-final guide-card text-center fade-up" style={cardShadow}>
            <h2 id="quote-h" className="font-heading font-black text-2xl sm:text-3xl text-grape mb-3 sm:mb-4">
              Ready to book?
            </h2>
            <p className="body-lg mb-5">
              {`Text me the details and I'll price it properly. Call or text ${BUSINESS.phone} and I'll get back to you within a few hours.`}
            </p>
            <CallTextButtons email align="center" sms={sms} />
          </section>
        </div>
      </div>
      <FadeUpReveal />
    </>
  )
}
