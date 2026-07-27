# Dr. Winnie's Foundation Website

Production-ready marketing site for **Dr. Winnie's Foundation** — menstrual health education, mental health awareness, career development, and community outreach in Ghana.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React
- Mock content architecture ready for a future CMS

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Content

All copy, stats, team, events, blog posts, and contact details live under `src/content/`. Impact figures and partner names are **illustrative placeholders** (`isIllustrative` / `isPlaceholder`) — replace before public launch.

Images are centralized in `src/content/images.ts` (Unsplash placeholders marked `REPLACE_ME`).

## Donations

The donation UI is complete, but payments use a **mock service** in `src/lib/payments.ts`. No live charges are processed. Wire a provider (Paystack, Flutterwave, Stripe, etc.) behind that layer before going live.

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for SEO/sitemap
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` — optional contact-page map embed

## Routes

Home, About, Programs (+ 3 detail pages), Projects (+ campaign pages), Impact, Resources, Get Involved, Volunteer, Partner, Donate, Events, Gallery, Blog (+ posts), Contact, Privacy, Terms.
# DWF
