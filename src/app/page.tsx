import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Phone, MessageSquare, Mail, Star, MapPin } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { PartnerCard } from "@/components/partner-card"
import { BUSINESS, RATES, SERVICES, PARTNERS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Piano Mover Melbourne | Harry The Piano Mover",
  description: BUSINESS.description,
  alternates: { canonical: "/" },
}

const buyRent = PARTNERS.filter((p) => p.category === "buy-rent")
const tuners = PARTNERS.filter((p) => p.category === "tuner")
const technicians = PARTNERS.filter((p) => p.category === "technician")

// Inline Instagram glyph: lucide-react@1.x doesn't export Instagram.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      {/* HERO with faded piano backdrop. Layered: bg photo + gradient wash + content. */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,28,28,0.6) 0%, rgba(107,76,154,0.4) 50%, rgba(74,74,160,0.6) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl px-4 sm:px-5 pt-16 pb-16 fade-up">
          <Image
            src="/logo-on-dark.png"
            alt="Harry The Piano Mover"
            width={260}
            height={260}
            priority
            className="w-40 sm:w-52 md:w-64 h-auto mx-auto mb-6 sm:mb-8 float-anim drop-shadow-2xl"
          />
          <h1
            className="font-heading font-black text-[2.5rem] sm:text-6xl lg:text-7xl leading-none mb-4 sm:mb-5 text-white"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            Melbourne&apos;s Specialist
            <br />
            <span className="text-gold">Piano Mover</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/90 mb-3 italic leading-relaxed">
            Uprights, grands, and digitals. Moved with care by someone who actually plays.
          </p>
          <a
            href={BUSINESS.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl sm:text-2xl text-gold mb-6 sm:mb-8 py-2 px-1 hover:text-tangerine transition-colors duration-200"
            style={{ textShadow: "0 2px 10px rgba(245,183,66,0.5)" }}
          >
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true" />
            <span className="ml-1">Read the Reviews</span>
          </a>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center items-center px-2 sm:px-0">
            <a
              href={`tel:${BUSINESS.phoneInternational}`}
              className="inline-flex items-center justify-center gap-2 bg-tangerine text-white font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-coral hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(245,140,90,0.4)" }}
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
            <a
              href={`sms:${BUSINESS.phoneInternational}?&body=Hi%20Harry%2C%20I%27d%20like%20a%20quote%20for...`}
              className="inline-flex items-center justify-center gap-2 bg-grape text-white font-heading font-bold text-base w-full sm:w-auto px-7 py-4 rounded-full hover:bg-plum hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              style={{ boxShadow: "0 4px 20px rgba(107,76,154,0.4)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Text Harry
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold text-base text-white border-2 border-white/50 w-full sm:w-auto px-7 py-4 rounded-full hover:border-white hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" />
              Email Harry
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <div
              className="relative w-full sm:w-52 h-48 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              <Image
                src="/harry-piano-1.jpg"
                alt="Harry playing piano with Melbourne skyline"
                fill
                sizes="(max-width: 640px) 100vw, 208px"
                className="object-cover"
                style={{ objectPosition: "center 72%" }}
              />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape mb-3 sm:mb-4">
                Hey, I&apos;m Harry
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                Experienced piano mover. Experienced pianist. Your piano gets handled by someone who
                actually knows what&apos;s inside the case, treated the way I&apos;d want mine treated.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                Rates for inner suburbs, outer suburbs, and disposal are below. Anything further out,
                call or text and we&apos;ll sort a custom quote.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-3">
                Not just pianos. Furniture moving, marketplace pick-ups, band equipment deliveries,
                event drops. If it fits in the van, I&apos;ll get it there.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                One-van operation. You deal with me directly, every job. Got something to move? Call,
                text, or email. I&apos;ll get back within a few hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
        >
          What I Move
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s) => (
            <FeatureCard key={s.title} title={s.title} description={s.blurb} image={s.image} imageAlt={s.title} />
          ))}
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-6 sm:py-8 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 fade-up">
          {[
            { src: "/harry-piano-1.jpg", alt: "Harry playing piano overlooking Melbourne" },
            { src: "/harry-piano-2.jpg", alt: "Grand piano on a Melbourne rooftop at sunset" },
            { src: "/harry-piano-3.jpg", alt: "Piano outdoors with the Melbourne skyline" },
          ].map((p) => (
            <div
              key={p.src}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden h-32 sm:h-52 md:h-72"
              style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.2)" }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* ZONES */}
      <section id="zones" className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12 fade-up text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
        >
          Where I Move
        </h2>
        <div className="max-w-5xl mx-auto fade-up">
          <div
            className="relative rounded-3xl bg-white overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)", aspectRatio: "16 / 9" }}
          >
            <Image
              src="/zones.png"
              alt="Map of Melbourne with three concentric service zones: orange Inner Suburbs (within 10km of CBD), pink Outer Suburbs (10 to 30km), purple Outer Melbourne (30 to 60km). Past the purple ring requires a custom quote."
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mt-5 sm:mt-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#F5B742", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Inner Suburbs &amp; CBD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#F06681", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Outer Suburbs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#9B4D9E", boxShadow: "0 0 0 1px rgba(255,255,255,0.4)" }} />
              <span className="text-white text-sm sm:text-base">Outer Melbourne</span>
            </div>
          </div>
          <p className="text-center text-white/70 text-xs sm:text-sm mt-3 inline-flex items-center gap-1.5 w-full justify-center">
            <MapPin className="h-3.5 w-3.5" />
            Outside the purple ring? <Link href="#contact" className="text-gold hover:underline">Call or text for a custom quote.</Link>
          </p>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-4xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-grape text-center mb-6 sm:mb-10">
            Rates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {RATES.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl p-4 sm:p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${r.toneFrom}, ${r.toneTo})` }}
              >
                <h3 className="font-heading font-bold text-base sm:text-lg mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/30">
                  {r.label}
                </h3>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-sm sm:text-base">Upright Piano</span>
                  <span className="font-heading font-bold text-lg sm:text-xl">${r.upright}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-sm sm:text-base">Grand Piano</span>
                  <span className="font-heading font-bold text-lg sm:text-xl">${r.grand}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm sm:text-base text-gray-600 bg-gray-100 rounded-xl p-4 sm:p-5 leading-relaxed">
            <strong className="text-gray-800">Access note:</strong> Prices above assume 4 or fewer
            steps, or easy ramp access.
            <br />
            Tricky access adds <strong className="text-gray-800">$20 per step</strong>, or{" "}
            <strong className="text-gray-800">$200+</strong> if extra hands are needed.
            <br />
            Outer Melbourne or interstate?{" "}
            <Link href="#contact" className="text-grape font-bold hover:underline py-1 inline-block">
              Get in touch
            </Link>{" "}
            for a custom quote.
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-14 sm:py-20 px-4 sm:px-5">
        <h2
          className="font-heading font-bold text-xl sm:text-2xl text-center mb-6 sm:mb-8 fade-up text-white"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        >
          See the Moves
        </h2>
        <div className="max-w-lg mx-auto fade-up">
          <div className="glass rounded-2xl p-4 sm:p-6 text-center">
            <iframe
              src={`${BUSINESS.instagram}embed`}
              width="100%"
              height={480}
              loading="lazy"
              title="Harry The Piano Mover Instagram feed"
              className="border-0 bg-white rounded-xl block max-w-full"
            />
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 font-heading font-bold text-base sm:text-lg text-gold hover:text-tangerine active:text-coral transition-colors duration-200 py-2 px-2"
            >
              <InstagramIcon className="h-5 w-5" />
              @harrythepianomover
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-14 sm:py-20 px-4 sm:px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <h2
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-3 text-white"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
            >
              Friends of the Keys
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Harry moves them. These folks sell, rent, tune, voice, and restore them. Hand-picked
              from Melbourne&apos;s highest Google ratings, no paid placements.
            </p>
          </div>

          <div className="mb-10 sm:mb-14">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-center mb-5 sm:mb-6 text-gold/90 fade-up">
              Buy or Rent
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {buyRent.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          <div className="mb-10 sm:mb-14">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-center mb-2 text-gold/90 fade-up">
              Mobile Piano Tuners
            </h3>
            <p className="text-center text-white/60 text-sm mb-5 sm:mb-6 fade-up">
              In-home tuning across Melbourne. Sorted by rating, then review count.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {tuners.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-center mb-2 text-gold/90 fade-up">
              Piano Technicians
            </h3>
            <p className="text-center text-white/60 text-sm mb-5 sm:mb-6 fade-up">
              Regulation, voicing, repair, restoration. Workshop-grade work, beyond a tune.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {technicians.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-xl mx-auto text-center text-xs sm:text-sm text-white/55 leading-relaxed border-l-2 border-white/30 pl-3">
            Listings are independent businesses Harry recommends based on public Google reviews. No
            paid placements. Ratings as of May 2026 and may have changed.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-14 sm:py-20 px-4 sm:px-5">
        <div
          className="card-white rounded-3xl max-w-2xl mx-auto p-5 sm:p-8 md:p-12 fade-up"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        >
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-grape text-center mb-5 sm:mb-8">
            Let&apos;s Get It Moving
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            <a
              href={`tel:${BUSINESS.phoneInternational}`}
              className="inline-flex items-center justify-center gap-2 bg-tangerine text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-coral hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <a
              href={`sms:${BUSINESS.phoneInternational}?&body=Hi%20Harry%2C%20I%27d%20like%20a%20quote%20for...`}
              className="inline-flex items-center justify-center gap-2 bg-plum text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-magenta hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <MessageSquare className="h-4 w-4" />
              Text Harry
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center gap-2 bg-grape text-white font-heading font-bold px-5 py-3 sm:py-2.5 rounded-full w-full sm:w-auto hover:bg-indigo hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" />
              Email Harry
            </a>
          </div>
        </div>
      </section>

      <FadeUpReveal />
    </>
  )
}

// Pure-client small component to flip the fade-up from default-visible to
// IntersectionObserver-driven. Same pattern as the original static site:
// content is visible by default if JS never runs (Telegram/Messenger in-app
// browsers); the observer only takes over when JS is present.
function FadeUpReveal() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{
          var fadeUps=document.querySelectorAll('.fade-up');
          var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if(typeof IntersectionObserver!=='undefined'&&!rm&&fadeUps.length){
            document.documentElement.classList.add('can-animate');
            var io=new IntersectionObserver(function(es){
              es.forEach(function(e,i){
                if(e.isIntersecting){
                  setTimeout(function(){e.target.classList.add('visible');},i*70);
                  io.unobserve(e.target);
                }
              });
            },{threshold:0.12});
            fadeUps.forEach(function(el){io.observe(el);});
            setTimeout(function(){fadeUps.forEach(function(el){el.classList.add('visible');});},1500);
          }
        }catch(_){}})();`,
      }}
    />
  )
}
