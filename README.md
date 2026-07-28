# Dr. Winnie's Foundation Website

Marketing site + CMS admin for **Dr. Winnie's Foundation** — menstrual health education, mental health awareness, career development, and community outreach in Ghana.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Prisma ORM 7 + PostgreSQL (Neon)
- Cloudinary (images, files, videos)
- Mock payment gateway (no live charges)
- JWT cookie admin auth

## Getting started

```bash
cp .env.example .env.local
# fill DATABASE_URL, ADMIN_*, CLOUDINARY_*
npm install
npm run db:push
npm run db:seed
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin CMS: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Seeded admin credentials

Configured via `.env.local`:

- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`

Default seed values (override in env):

- Email: `dwf@zf.com`
- Password: `SugarBoo`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Generate Prisma client + production build |
| `npm run start` | Serve production build |
| `npm run lint` / `typecheck` | Quality checks |
| `npm run db:push` | Sync Prisma schema to Postgres |
| `npm run db:seed` | Seed admin + starter content |
| `npm run db:studio` | Prisma Studio |

## Admin CMS

Professional blue / blue-black / black / white dashboard at `/admin`:

- Auth: login + register (`ADMIN_OPEN_REGISTRATION`)
- Media library (Cloudinary upload)
- Blog, programs, projects, events, gallery, resources
- Team, testimonials, partners, impact stats
- Donations (mock payments), contact/volunteer/partner messages
- Site settings

## Content

- Static fallback content remains in `src/content/`
- Live CMS content is stored in PostgreSQL via Prisma
- Public blog prefers DB posts, falls back to static content
- Forms POST to `/api/*` and persist in the database

## Payments

Donations use `src/lib/payments.ts` mock gateway and store records with status `MOCK_SUCCESS`. No real charges are made.

## Environment

See `.env.example` for:

- `DATABASE_URL`
- `ADMIN_JWT_SECRET`, `ADMIN_SEED_*`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL`
