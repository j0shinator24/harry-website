import { ArrowLink } from "@/components/arrow-link"
import { ArrowRight } from "@/components/icons"
import { ServiceIcon } from "@/components/service-icon"
import type { Service } from "@/lib/constants"

type FeatureCardProps = {
  title: string
  description: string
  icon: Service["icon"]
  // Optional links (the rates on this page, the guide page for the service).
  links?: readonly { href: string; label: string }[]
  // Makes the whole card one link (the free piano scheme), with a call to
  // action and a corner badge. A plain anchor: /free-pianos/ is a separate
  // Worker gallery on the same host, not a Next route.
  featured?: Service["featured"]
}

// A tile inside the Specialty Services dark card: white text on the opaque
// card stays well above 4.5:1 (WCAG 1.4.3).
export function FeatureCard({ title, description, icon, links = [], featured }: FeatureCardProps) {
  if (featured) {
    return (
      <a href={featured.href} className="feature-card feature-free group block">
        <span className="feature-badge">{featured.badge}</span>
        <div className="mb-3 sm:mb-4">
          <ServiceIcon icon={icon} />
        </div>
        <h3 className="feature-h">{title}</h3>
        <p className="copy-dim">{description}</p>
        <span className="feature-cta">
          {featured.cta}
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </a>
    )
  }
  return (
    <div
      className="glass-dark feature-card"
    >
      <div className="mb-3 sm:mb-4">
        <ServiceIcon icon={icon} />
      </div>
      <h3 className="feature-h">{title}</h3>
      <p className="copy-dim">{description}</p>
      {links.length > 0 && (
        <ul className="mt-3 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <ArrowLink
                href={l.href}
                label={l.label}
                className="feature-more"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
