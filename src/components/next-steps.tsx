import { NEXT_STEPS } from "@/lib/constants"

// "What happens next": the same three steps on the home contact card and the
// closing card of every guide (Gate 7 r3). Class names are in app/globals.css.
export function NextSteps({ className = "", steps = NEXT_STEPS }: { className?: string; steps?: readonly string[] }) {
  return (
    <div className={`rounded-2xl bg-gray-100 p-4 sm:p-6 ${className}`}>
      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3">What happens next</h3>
      <ol className="space-y-3 list-none">
        {steps.map((t, i) => (
          <li key={t} className="next-step">
            <span aria-hidden="true" className="step-num">
              {i + 1}
            </span>
            <p className="body-lg">{t}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
