import { ArrowLink } from "@/components/arrow-link"
import { ServiceIcon } from "@/components/service-icon"
import type { Service } from "@/lib/constants"

type FeatureCardProps = {
  title: string
  description: string
  icon: Service["icon"]
  // Optional links (the rates on this page, the guide page for the service).
  links?: readonly { href: string; label: string }[]
}

// A tile inside the Specialty Services dark card: white text on the opaque
// card stays well above 4.5:1 (WCAG 1.4.3).
export function FeatureCard({ title, description, icon, links = [] }: FeatureCardProps) {
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
