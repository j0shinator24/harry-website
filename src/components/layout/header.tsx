"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#partners", label: "Partners" },
] as const

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full transition-shadow duration-300"
      style={{ background: "rgba(28,28,28,0.92)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <Link href="/" className="flex items-center gap-2.5 group min-h-[48px]">
          <Image
            src="/logo.png"
            alt="Harry The Piano Mover"
            width={40}
            height={40}
            className="rounded-full transition-transform duration-200 group-hover:scale-110"
          />
          <span className="hidden sm:inline font-heading font-black text-lg text-gold tracking-wide">
            Harry The Piano Mover
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-heading text-sm text-white/80 tracking-wider hover:text-gold transition-colors duration-200 py-2 px-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              className="font-heading text-sm font-bold bg-coral text-white px-5 py-2.5 rounded-full hover:bg-tangerine hover:scale-105 active:scale-95 transition-transform duration-200 inline-block focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 rounded-lg active:bg-white/10 transition-colors duration-150"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-4 pb-2"
          style={{ background: "rgba(28,28,28,0.97)" }}
          role="menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3.5 font-heading text-base text-white/80 hover:text-gold active:text-gold border-b border-white/10 transition-colors duration-150"
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="block py-3.5 font-heading font-bold text-base text-gold active:text-tangerine transition-colors duration-150"
            role="menuitem"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
