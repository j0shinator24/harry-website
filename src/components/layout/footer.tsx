import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { BUSINESS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-8 [&>*]:min-w-[200px] [&>*]:flex-1 [&>*]:basis-[calc((50rem-100%)*999)]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="" width={28} height={28} className="shrink-0 rounded-full" />
              <span className="text-lg font-semibold tracking-tight">{BUSINESS.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {BUSINESS.tagline} Uprights, grands, and digitals across Melbourne. One van, one operator, every job.
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
              <Star className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>Five-star Google reviews. Sole operator, AU-based.</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
              <li><Link href="#rates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rates</Link></li>
              <li><Link href="#zones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Service zones</Link></li>
              <li><Link href="#partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Friends of the Keys</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                {BUSINESS.location}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href={`tel:${BUSINESS.phoneInternational}`} className="hover:text-foreground transition-colors">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Social</h3>
            <ul className="space-y-2">
              <li>
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={BUSINESS.googleReviews} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Google Reviews
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground border-l-2 border-accent/50 pl-2">
              One-van operation. You deal with Harry directly, every job.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{BUSINESS.legalName}</p>
          <p>Melbourne, VIC. Five-star reviews.</p>
          <p>&copy; {new Date().getFullYear()} {BUSINESS.legalName}</p>
        </div>
      </div>
    </footer>
  )
}
