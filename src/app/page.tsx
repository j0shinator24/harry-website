import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  Mail,
  Star,
  MapPin,
  Music,
} from "lucide-react"

// Instagram icon is not exported by lucide-react@1.x, so inline the official
// glyph here. Same path data as the prior static site.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeatureCard } from "@/components/feature-card"
import { PartnerCard } from "@/components/partner-card"
import { HeroBackground } from "@/components/hero-background"
import { BUSINESS, RATES, SERVICES, PARTNERS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Piano Mover Melbourne | Harry The Piano Mover",
  description: BUSINESS.description,
  alternates: { canonical: "/" },
}

const buyRent = PARTNERS.filter((p) => p.category === "buy-rent")
const tuners = PARTNERS.filter((p) => p.category === "tuner")
const technicians = PARTNERS.filter((p) => p.category === "technician")

export default function HomePage() {
  return (
    <>
      {/* Hero + about share one tinted backdrop so the gradient flows
          through both areas with no banding edge, and the move-log
          row pattern reads as a single visual layer. */}
      <div className="relative bg-gradient-to-b from-primary/8 via-background to-accent/5">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <HeroBackground />
          <div className="relative mx-auto max-w-6xl px-4 md:px-8 pt-16 pb-16 md:pt-24 md:pb-24">
            <div className="max-w-[68ch]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">
                Melbourne piano mover &middot; Five-star reviews
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Melbourne&apos;s specialist <span className="text-primary">piano mover</span>.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[60ch] mb-6">
                Uprights, grands, and digitals. Moved with care by a piano mover who actually plays.
                One-van operation, you deal with Harry directly, every job.
              </p>
              <div className="border-l-2 border-primary/30 pl-3 mb-7 text-sm md:text-base text-muted-foreground italic">
                &ldquo;Prompt, friendly, competitive pricing.&rdquo;
                <span className="not-italic text-foreground/60 ml-1">5.0 / 33 Google reviews</span>
              </div>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/80 mb-8">
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Blanket-wrapped &amp; strapped
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  4 zone-priced rates
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Same-week bookings
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href={`tel:${BUSINESS.phoneInternational}`}>
                  <Button size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call {BUSINESS.phone}
                  </Button>
                </Link>
                <Link href="#rates">
                  <Button size="lg" variant="outline" className="gap-2">
                    See rates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={BUSINESS.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 self-center"
                >
                  <Star className="h-4 w-4 fill-primary" />
                  Read Google reviews
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative">
          <div className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-[280px_1fr] items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border shadow-md">
                <Image
                  src="/harry-piano-1.jpg"
                  alt="Harry playing piano with the Melbourne skyline behind him"
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover"
                  style={{ objectPosition: "center 72%" }}
                />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
                  About
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Hey, I&apos;m Harry.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                  Experienced piano mover. Experienced pianist. Your piano gets handled by someone
                  who actually knows what&apos;s inside the case, treated the way I&apos;d want mine treated.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                  Rates for inner suburbs, outer suburbs, and disposal are below. Anything further
                  out, call or text and we&apos;ll sort a custom quote.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Not just pianos. Furniture moving, marketplace pick-ups, band equipment deliveries,
                  event drops. If it fits in the van, I&apos;ll get it there.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SERVICES */}
      <section id="services" className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What I move</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Pianos are the specialty. Everything else fills the rest of the day.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <FeatureCard
                key={s.title}
                title={s.title}
                description={s.blurb}
                image={s.image}
                imageAlt={s.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {["/harry-piano-1.jpg", "/harry-piano-2.jpg", "/harry-piano-3.jpg"].map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-sm"
              >
                <Image
                  src={src}
                  alt={
                    i === 0
                      ? "Harry playing piano overlooking Melbourne"
                      : i === 1
                      ? "Grand piano on a Melbourne rooftop at sunset"
                      : "Piano outdoors with the Melbourne skyline"
                  }
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section id="zones" className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              Service zones
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Where I move</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Three concentric zones across Greater Melbourne. Anything past the outer ring, call or
              text for a custom quote.
            </p>
          </div>
          <Card className="overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "16 / 7" }}>
              <Image src="/zones.png" alt="Map of Melbourne with three service zones" fill sizes="100vw" className="object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#F5B742" }} />
                  Inner Suburbs &amp; CBD
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#F06681" }} />
                  Outer Suburbs
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#9B4D9E" }} />
                  Outer Melbourne
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 inline-flex items-center gap-1.5 w-full justify-center">
                <MapPin className="h-3.5 w-3.5" />
                Past the purple ring? <Link href="#contact" className="text-primary hover:underline">Call or text for a custom quote.</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Rates</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Zone-priced, no surprises</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Standard pricing for the common cases. Tricky access or interstate? Get a quote.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {RATES.map((r) => (
              <Card key={r.label} className="overflow-hidden border-0 text-white">
                <div
                  className="p-6"
                  style={{
                    background: `linear-gradient(135deg, ${r.toneFrom}, ${r.toneTo})`,
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/30">
                    {r.label}
                  </h3>
                  <div className="flex justify-between items-center py-1.5">
                    <span>Upright Piano</span>
                    <span className="font-bold text-xl">${r.upright}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span>Grand Piano</span>
                    <span className="font-bold text-xl">${r.grand}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5 md:p-6 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Access note:</strong> Prices above assume 4 or fewer
            steps, or easy ramp access. Tricky access adds <strong className="text-foreground">$20 per step</strong>,
            or <strong className="text-foreground">$200+</strong> if extra hands are needed. Outer
            Melbourne or interstate? <Link href="#contact" className="text-primary hover:underline">Get in touch</Link> for a custom quote.
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-20">
          <div className="text-center mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-2">Instagram</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">See the moves</h2>
          </div>
          <Card className="overflow-hidden">
            <iframe
              src={`${BUSINESS.instagram}embed`}
              width="100%"
              height="480"
              loading="lazy"
              title="Harry The Piano Mover Instagram feed"
              className="block bg-white border-0"
            />
          </Card>
          <div className="text-center mt-4">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
            >
              <InstagramIcon className="h-4 w-4" />
              @harrythepianomover
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              Friends of the keys
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Melbourne&apos;s tuners, technicians &amp; piano shops
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Harry moves them. These folks sell, rent, tune, voice, and restore them. Hand-picked
              from the highest Google ratings, no paid placements.
            </p>
          </div>

          {/* Buy or rent */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <Music className="h-4 w-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">Buy or rent</h3>
            </div>
            <div className="grid gap-4 md:gap-5 md:grid-cols-2">
              {buyRent.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          {/* Mobile tuners */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-2">
              <Music className="h-4 w-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">Mobile piano tuners</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5 md:mb-6">
              In-home tuning across Melbourne. Sorted by rating, then review count.
            </p>
            <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tuners.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          {/* Technicians */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Music className="h-4 w-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">Piano technicians</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5 md:mb-6">
              Regulation, voicing, repair, restoration. Workshop-grade work, beyond a tune.
            </p>
            <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {technicians.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-xl mx-auto text-center text-xs text-muted-foreground border-l-2 border-accent/40 pl-3 leading-relaxed">
            Listings are independent businesses Harry recommends based on public Google reviews.
            No paid placements. Ratings as of May 2026 and may have changed.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-20 md:py-28">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Let&apos;s get it moving
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Got something to move?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
                Call, text, or email. I&apos;ll get back within a few hours.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`tel:${BUSINESS.phoneInternational}`}>
                  <Button size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    {BUSINESS.phone}
                  </Button>
                </Link>
                <Link
                  href={`sms:${BUSINESS.phoneInternational}?&body=Hi%20Harry%2C%20I%27d%20like%20a%20quote%20for...`}
                >
                  <Button size="lg" variant="secondary" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Text Harry
                  </Button>
                </Link>
                <Link href={`mailto:${BUSINESS.email}`}>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
