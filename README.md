# Battle Room

> **Planning Access Supervision** — a read-only monitoring dashboard for access-network and sales performance.

Battle Room is a **read-only** web application. It does **not** capture or edit data of its own — every number, chart, and map point it shows is read straight from a MySQL database that a **manager fills in beforehand** (via seeding or the database tools). Users sign in, pick a location, and review the prepared figures. There is no create/update/delete flow in the UI; the app's only job is to present the manager's data clearly.

---

## Table of Contents

- [Purpose](#purpose)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [User Flow](#user-flow)
- [How to Read the Main Page](#how-to-read-the-main-page)
- [Data Model](#data-model)
- [Project Scripts](#project-scripts)
- [Project Structure](#project-structure)

---

## Purpose

The application gives supervisors a single screen to watch how each location is performing across the year.

- **Read-only by design.** The dashboard never writes back to the database. The manager prepares the data (employee profiles, monthly performance, ODP points and history) and loads it into the database. Users can only view it.
- **One location at a time.** A user searches for a location, and the dashboard renders that location's profile card plus three tabs of visualizations.
- **Year-long context.** Most charts show all 12 months so trends — not just a single month — are visible at a glance.

> [!NOTE]
> Because the app only reads data, a location with no prepared data will show an empty state. If you select a location and see *"Data belum diinput, silahkan cari pilihan lain"*, it means the manager has not loaded data for that location yet.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) · React 19 |
| Language | TypeScript |
| Database | MySQL |
| ORM | [Prisma 5](https://www.prisma.io) |
| Auth | JWT in an HTTP-only cookie (`jose`) · `bcryptjs` for password hashing |
| Charts | [Recharts](https://recharts.org) |
| Maps | [Leaflet](https://leafletjs.com) + React Leaflet |
| Styling | Bootstrap 5 + custom `globals.css` (Metronic-style utilities, glassmorphism dark theme) |
| HTTP | Axios |

> [!IMPORTANT]
> This project targets **Next.js 16**, where _Middleware_ has been renamed to **Proxy**. Route protection lives in `proxy.ts` at the project root, which must export a named `proxy` function. See `CLAUDE.md` and `AGENTS.md` for version-specific constraints before changing framework code.

---

## Getting Started

### Prerequisites

- Node.js 20+
- A MySQL database

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure the database connection
#    Put DATABASE_URL and the JWT secret in .env.local
#    (.env is only the Prisma placeholder; .env.local is used at runtime)

# 3. Push the schema to MySQL
npm run db:push

# 4. Seed the data (the "manager fills the database" step)
npm run db:seed

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/profile`; if you are not signed in, the proxy sends you to `/login` first.

---

## User Flow

```
Login  →  Search a location  →  Read the profile card  →  Switch between tabs
```

1. **Sign in.** The login screen ("Battle Room — Planning Access Supervision") authenticates against the `User` table. A successful login sets a JWT cookie and redirects to `/profile`.
2. **Search a location.** The search box at the top filters the master location list. When the box is empty and focused, it shows quick-pick chips for locations that already have data loaded (e.g. `BRU · STO`, `MKM · STO`, `KJN · HERO`).
3. **Read the profile card.** Selecting a location loads its profile card (name, role, size badge, headline stats).
4. **Explore the tabs.** Below the card, three tabs — **Overview**, **Digital**, **Alpro** — each fetch and render their own data for the selected location.

> [!NOTE]
> Authentication is enforced in two layers: `proxy.ts` guards `/profile/*` and `/api/*`, and every API route additionally checks the session itself. A user cannot reach the data without a valid login.

---

## How to Read the Main Page

After you select a location, the page is organized top to bottom like this.

### 1. Profile card (top)

| Element | Meaning |
|---|---|
| **Name** | The location's profile name |
| **Color badge** | Location size — <kbd>BESAR</kbd> (large, green), <kbd>SEDANG</kbd> (medium, yellow), <kbd>KECIL</kbd> (small, red) |
| **Role** | The associated job title / position (`jabatan`) |
| **Subscribers** | Total subscribers (`LIS`) |
| **Monthly Revenue** | Billing amount in IDR |
| **Sales** | New sales for the period |

### 2. Overview tab

Line charts of monthly performance across all 12 months (`Jan`–`Des`). Read each line left-to-right as the trend over the year. The tab is split into two sections:

- **Kwadran Performance** — `LIS` (full-width), then `Kw 1`–`Kw 4` in a 2×2 grid.
- **Operational Performance** — `Billing`, `PranPc`, `Sales`, and `C3mr`.

> Hover any point to see the exact value for that month.

### 3. Digital tab

A **bar chart** of the **Digital Addon** metric, one bar per month. Use it to compare digital add-on volume month over month.

### 4. Alpro tab

Access-network ("Alat Produksi") view, in two cards:

- **ODP Map** — a Leaflet map plotting every ODP (Optical Distribution Point) for the location. The header shows the count, e.g. *"… 120 titik"* ("points").
- **ODP History** — a grouped bar chart over 11 periods (`M1`–`M11`) with three bars each:
  - **Total** (blue) — total ports
  - **Avai** (teal) — available ports
  - **Used** (red) — ports in use

> Reading tip: where **Used** approaches **Total**, that location is running low on available capacity.

---

## Data Model

Six Prisma models, most keyed by a `(lokasi, tipe)` pair (`tipe` ∈ `STO | DATEL | WITEL | HERO`):

| Model | Purpose |
|---|---|
| `User` | Login credentials (bcrypt-hashed password) |
| `Location` | Master list backing the search dropdown |
| `EmployeeProfile` | Profile-card data, keyed by `(lokasi, tipe, bulan, tahun)` |
| `PerformanceMonthly` | Monthly metrics — 12 month columns, keyed by `(lokasi, tipe, tahun, type)` |
| `OdpPort` | `lat/lng` points for the Leaflet map |
| `OdpHistory` | 11 rows per `(lokasi, tipe, tahun)` for the ODP history chart |

Seed data is read from `prisma/data/` (CSV + JSON). The manager populates these files (or the database directly) before users view the dashboard.

> [!NOTE]
> The profile fetch currently uses a fixed period of `bulan: 'sep', tahun: '2022'`, and the charts query `tahun: '2022'`. Seeded data must match these values to appear.

---

## Project Scripts

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run db:push      # push the Prisma schema to MySQL (no migration files)
npm run db:seed      # seed from prisma/data/ CSV + JSON files
npm run db:studio    # open Prisma Studio to inspect the database
npm run db:reset     # drop + re-push + re-seed (--force)
```

---

## Project Structure

```
app/
  (auth)/login/         # login screen
  (dashboard)/profile/  # main dashboard page
  api/                  # route handlers (auth, profile, performance, odp, locations)
  layout.tsx            # imports Bootstrap + globals.css
components/
  layout/               # Header, Footer
  profile/              # ProfileMain, Search
    tabs/               # Overview, Digital, Alpro
  ui/MapView.tsx        # Leaflet map (loaded client-side only)
lib/
  auth.ts               # JWT sign/verify (jose)
  db.ts                 # singleton Prisma client
prisma/
  schema.prisma         # data model
  data/                 # seed CSV + JSON
  seed.ts               # seed script
proxy.ts                # route protection (Next.js 16 "Proxy")
```
