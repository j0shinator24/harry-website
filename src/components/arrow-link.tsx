import { ArrowRight } from "@/components/icons"

// A text link that ends in an arrow. The last word and the arrow share one
// no-wrap span, so when the label wraps the arrow stays on the line with its
// word instead of floating off on its own (Gate 7 r3 N7).
export function ArrowLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  const cut = label.lastIndexOf(" ")
  const head = cut === -1 ? "" : label.slice(0, cut + 1)
  const tail = cut === -1 ? label : label.slice(cut + 1)
  return (
    <a href={href} className={`group inline-block py-2 ${className}`}>
      {head}
      <span className="whitespace-nowrap">
        {tail}
        <ArrowRight
          className="inline-block h-4 w-4 ml-1.5 align-[-0.125em] transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </a>
  )
}
