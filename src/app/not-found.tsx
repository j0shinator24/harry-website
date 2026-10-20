/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors on purpose: static pages with no client router code (Gate 7 r2 O11) */
import type { Metadata } from "next"
import { ArrowRight } from "@/components/icons"
import { GUIDES } from "@/lib/guides"

// Own title and description, no canonical; Next adds the single noindex
// robots tag itself.
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page isn't here, but the Harry The Piano Mover homepage has rates, guides and ways to get in touch.",
}

// One arrow element reused by every link in the list (the page payload holds it once).
const LIST_ARROW = <ArrowRight className="h-4 w-4 flex-shrink-0" />

export default function NotFound() {
  return (
    <div className="px-4 sm:px-5 py-14 sm:py-20">
      <section className="card-white rounded-3xl max-w-2xl mx-auto p-6 sm:p-10 text-center" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
        <p className="font-heading font-black text-5xl sm:text-6xl text-grape mb-2" aria-hidden="true">
          404
        </p>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-grape mb-3">Page not found</h1>
        <p className="body-lg mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="nf-home"
        >
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <nav aria-label="Piano moving guides" className="mt-8 text-left">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 list-none">
            {[{ href: "/#rates", label: "Rates" }, ...GUIDES].map((g) => (
              <li key={g.href}>
                <a href={g.href} className="nf-link">
                  {LIST_ARROW}
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  )
}
