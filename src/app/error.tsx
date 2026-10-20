"use client"

import { BUSINESS } from "@/lib/constants"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. If the problem persists, please contact us
        at{" "}
        <a
          href={`mailto:${BUSINESS.email}`}
          className="underline hover:text-foreground transition-colors"
        >
          {BUSINESS.email}
        </a>
        .
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-muted-foreground">
          Error reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 font-heading font-bold text-[#1C1C1C] hover:bg-tangerine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Try again
      </button>
    </section>
  )
}
