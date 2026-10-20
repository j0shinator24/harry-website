import { ACCESS_FEES, RATES, type RateZone } from "@/lib/constants"

// Rate lookups shared by the homepage and the guide pages. Every price on the
// site is read from RATES through these, so nothing can drift from the rate
// table when Harry changes his prices in the studio.
function zone(label: string): RateZone {
  const r = RATES.find((z) => z.label === label)
  if (!r) throw new Error(`Rate zone missing from RATES: ${label}`)
  return r
}

export const INNER = zone("Inner Suburbs & CBD")
export const OUTER_SUB = zone("Outer Suburbs")
export const OUTER_MELB = zone("Outer Melbourne")
export const DISPOSAL = zone("Piano Disposal")
export const PIANOLA_DISPOSAL = DISPOSAL.extras?.[0]

// The three moving zones, in the order they appear in the rate table.
export const MOVING_ZONES: readonly RateZone[] = RATES.filter((r) => r.label !== DISPOSAL.label)

// The pianola clause without its leading asterisk, for use in running text.
export const PIANOLA_CLAUSE = (DISPOSAL.note ?? "").replace(/^\*\s*/, "")

export const MOVING_LOW = Math.min(...MOVING_ZONES.map((z) => z.upright))
export const MOVING_HIGH = Math.max(...MOVING_ZONES.map((z) => z.grand))

const disposalPrices = [DISPOSAL.upright, DISPOSAL.grand, ...(DISPOSAL.extras ?? []).map((e) => e.price)]
export const DISPOSAL_LOW = Math.min(...disposalPrices)
export const DISPOSAL_HIGH = Math.max(...disposalPrices)
export const DISPOSAL_COUNT = disposalPrices.length
// What every disposal price covers (Harry, 17 Oct 2026).
export const DISPOSAL_INCLUDES = "Disposal prices include property insurance, GST and the disposal fee."

// When Harry last confirmed the published rates (shown beside the rate
// tables and stated in the offers below).
export const RATES_CONFIRMED = "October 2026"

// Machine-readable offers. The zone prices are BASE rates, not the total for
// every move: steps past the included entry steps and a third person are
// added on top, and the third person is a minimum ("from"), never a fixed
// price. Harry's facts (17 Oct 2026): up to 4 entry steps included, more than
// 4 steps that can't take a simple ramp need a third person, prices include
// GST, and a move that crosses zones is charged at the higher zone's rate.
export const INCLUDED_STEPS = 4
export const BASE_RATE_NOTE = `Published base zone rates, confirmed ${RATES_CONFIRMED}. Prices include GST. Each base rate covers a move with up to ${INCLUDED_STEPS} entry steps or easy ramp access. Tricky access past that adds $${ACCESS_FEES.perStep} per step, and more than ${INCLUDED_STEPS} steps that can't take a simple ramp need a third person, from $${ACCESS_FEES.extraHandsFrom}, so a move can cost more than its base rate. When a move crosses zones, the higher zone's rate applies. Beyond Outer Melbourne and interstate is a custom quote.`

export function accessOffers() {
  return [
    {
      "@type": "Offer",
      name: "Tricky access, per step past the included entry steps",
      description: `Added to the base rate: $${ACCESS_FEES.perStep} for each step past the ${INCLUDED_STEPS} entry steps (or easy ramp access) the base rate includes. Includes GST.`,
      price: ACCESS_FEES.perStep,
      priceCurrency: "AUD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: ACCESS_FEES.perStep,
        priceCurrency: "AUD",
        unitText: "step",
        valueAddedTaxIncluded: true,
      },
    },
    {
      "@type": "Offer",
      name: `Third person for more than ${INCLUDED_STEPS} steps without a simple ramp`,
      description: `Added to the base rate when more than ${INCLUDED_STEPS} steps can't take a simple ramp and a third person is needed. From $${ACCESS_FEES.extraHandsFrom}, including GST; the final amount depends on the access.`,
      priceCurrency: "AUD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: ACCESS_FEES.extraHandsFrom,
        priceCurrency: "AUD",
        valueAddedTaxIncluded: true,
      },
    },
  ]
}

export function movingOffers() {
  return [
    {
      "@type": "AggregateOffer",
      name: "Base zone rates, upright and grand pianos",
      description: BASE_RATE_NOTE,
      priceCurrency: "AUD",
      lowPrice: MOVING_LOW,
      highPrice: MOVING_HIGH,
      offerCount: MOVING_ZONES.length * 2,
    },
    ...accessOffers(),
  ]
}

export function disposalOffer() {
  return {
    "@type": "AggregateOffer",
    name: "Piano disposal prices",
    description: `Published disposal prices for an upright, a grand${PIANOLA_DISPOSAL ? " and an upright pianola" : ""}, confirmed ${RATES_CONFIRMED}. ${DISPOSAL_INCLUDES}${PIANOLA_CLAUSE ? ` ${PIANOLA_CLAUSE}` : ""}`,
    priceCurrency: "AUD",
    lowPrice: DISPOSAL_LOW,
    highPrice: DISPOSAL_HIGH,
    offerCount: DISPOSAL_COUNT,
  }
}
