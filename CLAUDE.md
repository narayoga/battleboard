# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server (Turbopack, default)
npm run build        # production build
npm run db:push      # push schema to MySQL (no migration files)
npm run db:seed      # seed from prisma/data/ CSV + JSON files
npm run db:studio    # open Prisma Studio
npm run db:reset     # drop + re-push + re-seed (--force)
```

Environment variables live in `.env.local`. The `.env` file is the Prisma-generated placeholder — only `.env.local` is used at runtime.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · MySQL · Prisma 5 · JWT cookie auth · Recharts · Leaflet

### Auth flow

`proxy.ts` (root) — in Next.js 16, Middleware was renamed to Proxy. The file must export a named `proxy` function (not `middleware`). It guards `/profile/*` and `/api/*` (except `/api/auth/*`) by verifying the JWT cookie. `lib/auth.ts` handles sign/verify via `jose`. `lib/db.ts` is a singleton Prisma client safe for hot-reload.

### Request path

```
Browser → proxy.ts (JWT check) → app/(auth)/login or app/(dashboard)/profile
                                → app/api/* (Route Handlers)
```

All API routes guard themselves with `getSession(req)` as a second layer — they do not rely solely on proxy.

### Data model

Six tables, all keyed by `(lokasi, tipe)` pairs:

| Model | Purpose |
|---|---|
| `User` | login credentials (bcrypt password) |
| `Location` | master list for Search dropdown |
| `EmployeeProfile` | profile card data keyed by `(lokasi, tipe, bulan, tahun)` |
| `PerformanceMonthly` | monthly metrics (12 float columns) keyed by `(lokasi, tipe, tahun, type)` |
| `OdpPort` | lat/lng points for Leaflet map |
| `OdpHistory` | 11 rows per `(lokasi, tipe, tahun)` for ODP bar chart |

Seeding reads from `prisma/data/` — `locations.json` and `users.csv` are populated; the other four CSVs need real data before `db:seed` is useful.

### UI structure

`ProfileMain` (client component) owns all state: selected `lokasi`/`tipe`, active tab, and fetched profile. It renders `Search` → profile card → tab nav → `Overview | Digital | Alpro`. Each tab fetches its own data independently on mount/lokasi change.

`Alpro` uses `dynamic(() => import('@/components/ui/MapView'), { ssr: false })` — Leaflet requires this; do not remove it.

### Styling

`layout.tsx` imports pre-compiled Bootstrap 5 CSS and `globals.css` (custom Metronic-like utilities). The `styles/` directory contains Metronic SASS sources but they are **not imported** — the custom CSS in `globals.css` is the active stylesheet. `next.config.ts` has `sassOptions.loadPaths` set for potential future SASS use.

### Key constraints

- Turbopack does not support `~package` tilde imports in SCSS — use bare package names instead.
- Turbopack does not support `webpack()` config in `next.config.ts`.
- `ProfileMain` currently hardcodes `bulan: 'sep', tahun: '2022'` — seed data must match these values.
- Leaflet marker icons are loaded from unpkg CDN (patched in `MapView.tsx`).
