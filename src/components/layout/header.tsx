"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#partners", label: "Partners" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="shrink-0 transition-transform group-hover:scale-105 logo-candle rounded-full"
          />
          <div>
            <span className="text-xl font-semibold tracking-tight text-foreground block">
              Harry The Piano Mover
            </span>
            <span className="dark-reveal block text-[18px] font-handwritten text-primary/70 -mt-1 leading-none tracking-wide">
              moves with care
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <ThemeToggle />
            <span className="light-hint absolute -bottom-7 left-1/2 -translate-x-1/2 font-handwritten text-2xl text-muted-foreground/60 -rotate-3 whitespace-nowrap pointer-events-none select-none">
              try dark mode
            </span>
          </div>
          <Link href="#contact">
            <Button variant="default" size="default" className="ml-2">
              Get a quote
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center gap-1 rounded-md h-11 px-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="#contact" onClick={() => setOpen(false)}>
                  <Button variant="default" className="w-full mt-2">
                    Get a quote
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
