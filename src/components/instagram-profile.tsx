"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Instagram profile embed with automatic fallback.
 *
 * Desktop browsers render the undocumented /embed iframe fine.
 * iOS Safari blocks it via Intelligent Tracking Prevention, so after a
 * short timeout we swap in a visual card with Harry's photos + a CTA.
 * CSS-first: the fallback is pure HTML/CSS, no third-party scripts.
 */
export function InstagramProfile({ url }: { url: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Give the iframe 4s to load. If it hasn't rendered content by
    // then (iOS blocks it silently), flip to the fallback card.
    const timer = setTimeout(() => {
      try {
        const iframe = iframeRef.current
        // If we can't access contentDocument or it's blank, show fallback.
        // Cross-origin iframes throw on property access, which is fine
        // because that means the iframe *did* navigate to Instagram.
        if (!iframe) {
          setShowFallback(true)
          return
        }
        const doc = iframe.contentDocument
        if (doc && (!doc.body || doc.body.innerHTML.trim() === "")) {
          setShowFallback(true)
        }
      } catch {
        // Cross-origin = iframe loaded Instagram content. Keep it.
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (showFallback) {
    return (
      <div className="glass rounded-2xl p-4 sm:p-6 text-center">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {[
            { src: "/harry-piano-1.jpg", alt: "Harry moving a piano into a truck" },
            { src: "/harry-piano-2.jpg", alt: "Piano safely strapped for transport" },
            { src: "/harry-piano-3.jpg", alt: "Harry delivering a piano to a Melbourne home" },
          ].map((img) => (
            <a
              key={img.src}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </a>
          ))}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-heading font-bold text-lg sm:text-xl text-gold hover:text-tangerine transition-colors duration-200 py-2 px-2"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          @harrythepianomover
        </a>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-6 text-center">
      <iframe
        ref={iframeRef}
        src={`${url}embed`}
        width="100%"
        height={480}
        loading="lazy"
        title="Harry The Piano Mover Instagram feed"
        className="border-0 bg-white rounded-xl block max-w-full"
        onError={() => setShowFallback(true)}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 font-heading font-bold text-lg sm:text-xl text-gold hover:text-tangerine active:text-coral transition-colors duration-200 py-2 px-2"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
        @harrythepianomover
      </a>
    </div>
  )
}
