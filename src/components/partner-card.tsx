import { Phone, Star, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Partner } from "@/lib/constants"

export function PartnerCard({ p }: { p: Partner }) {
  return (
    <Card className="group relative h-full transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
      {p.website && (
        <a
          href={p.website}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-[1] [text-indent:-9999px] overflow-hidden"
          aria-label={`Visit ${p.name} website`}
        >
          {p.name}
        </a>
      )}
      <CardContent className="p-5 relative z-[2] pointer-events-none">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-base sm:text-lg font-semibold tracking-tight">{p.name}</h4>
          <span className="flex-shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" />
            {p.rating.toFixed(1)}
            {typeof p.reviews === "number" && (
              <span className="text-xs font-normal text-muted-foreground">({p.reviews})</span>
            )}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.blurb}</p>
        {p.credentials && p.credentials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.credentials.map((c) => (
              <Badge key={c} variant="secondary" className="text-[10px] uppercase tracking-wider">
                {c}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-sm pointer-events-auto">
          {p.phoneIntl && (
            <a
              href={`tel:${p.phoneIntl}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 font-medium hover:bg-primary/90 transition-colors relative z-[3]"
            >
              <Phone className="h-3.5 w-3.5" />
              {p.phone}
            </a>
          )}
          {p.website && (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium px-2 py-1.5 relative z-[3]"
            >
              Website <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
