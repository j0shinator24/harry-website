# Harry The Piano Mover

Marketing site for [Harry The Piano Mover](https://harrythepianomover.com.au), Melbourne's specialist piano mover. Built as a Next.js 16 app with Tailwind v4, shadcn/ui, and a light/dark theme toggle. Same architectural patterns as the Waylight Data sister project.

## Stack

- Next.js 16 (Turbopack, app router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Base UI primitives)
- next-themes (light/dark)
- lucide-react icons

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
  app/
    layout.tsx       # Fonts, theme provider, header/footer wrapper, JSON-LD schema
    page.tsx         # Homepage: hero, about, services, zones, rates, instagram, partners, contact
    globals.css      # Design tokens, glow system, layout primitives
  components/
    layout/          # Header, Footer
    ui/              # shadcn primitives (button, card, sheet, etc.)
    hero-background.tsx   # Decorative move-log table behind the hero
    feature-card.tsx      # Service card pattern
    partner-card.tsx      # Tuner / technician / shop card pattern
    theme-provider.tsx
    theme-toggle.tsx
  lib/
    constants.ts     # BUSINESS info, RATES, SERVICES, PARTNERS list
    utils.ts         # cn() class-merge helper
public/              # logo, hero photos, service icons, zone map
```

## Editing partner listings

The "Friends of the Keys" directory pulls from `PARTNERS` in `src/lib/constants.ts`. Each entry has a category (`buy-rent`, `tuner`, `technician`), Google rating, optional review count, blurb, phone, website, and optional credentials list. Add or update entries there; the homepage re-renders automatically.

## Deployment

The site deploys to `harrythepianomover.com.au`. Update `BASE_URL` in `src/lib/constants.ts` if the domain ever changes.
