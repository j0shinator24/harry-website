/* eslint-disable @next/next/no-img-element -- static export with unoptimised images; a plain img ships no client JS */
/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors on purpose: static pages with no client router code (Gate 7 r2 O11) */
import { ChevronDown, Menu, X } from "@/components/icons"
import { GUIDES } from "@/lib/guides"
import { MenuEnhance } from "@/components/layout/menu-enhance"

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#rates", label: "Rates" },
  { href: "/#services", label: "Services" },
  { href: "/#partners", label: "Friends of Mine" },
] as const

// A server component: the menus are native <details> elements and the links
// are plain anchors, so everything works with JavaScript off (in-app
// browsers) and no icon or menu code ships to the browser. Same-page hash
// links scroll with CSS (smooth unless the visitor prefers reduced motion).
// MenuEnhance only adds polish: close on link tap, Escape and outside tap.
// Class names such as nav-link are defined in app/globals.css (@layer components).
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "rgba(28,28,28,0.97)" }}>
      <div className="header-bar">
        <a href="/" className="flex items-center gap-2.5 group min-h-[48px] min-w-0">
          <img
            src="/logo-80.png"
            alt=""
            width={40}
            height={40}
            className="header-logo"
          />
          {/* The business name shows at every width (it used to hide on phones). */}
          <span className="header-name">
            Harry The Piano Mover
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 list-none">
            {navItems.slice(0, 3).map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <details data-menu className="relative group">
                <summary className="nav-link nav-guides">
                  Guides
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul
                  className="nav-guides-panel"
                  style={{ background: "rgba(28,28,28,0.98)", boxShadow: "0 12px 32px rgba(0,0,0,0.35)" }}
                >
                  {GUIDES.map((g) => (
                    <li key={g.href}>
                      <a
                        href={g.href}
                        className="nav-guide-link"
                      >
                        {g.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <a href={navItems[3].href} className="nav-link">
                {navItems[3].label}
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="nav-quote"
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>

        <details data-menu className="lg:hidden group flex-shrink-0">
          <summary
            className="menu-toggle"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 group-open:hidden" aria-hidden="true" />
            <X className="h-6 w-6 hidden group-open:block" aria-hidden="true" />
          </summary>
          <nav
            aria-label="Main"
            className="mnav-panel"
            style={{ background: "rgba(28,28,28,0.98)" }}
          >
            <ul className="list-none">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="mnav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mnav-label">Guides</p>
            <ul className="list-none">
              {GUIDES.map((g) => (
                <li key={g.href}>
                  <a href={g.href} className="mnav-guide-link">
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="mnav-quote"
            >
              Get a Quote
            </a>
          </nav>
        </details>
      </div>
      <MenuEnhance />
    </header>
  )
}
