# Starter — Monorepo Project

A reusable **Starter** template for full-stack web applications, pairing a **Laravel API** (backend) with a **Next.js** frontend, wired together through a Backend-for-Frontend (BFF) layer.

```
Starter/
├── backend/     # Laravel API (source of truth for data, auth, business logic)
└── frontend/    # Next.js 16 app (UI + BFF route handlers)
```

Each folder has its own `PROJECT.md` that explains its internals **and how it relates to the other folder**, so you can work from either side alone.

- Backend → [`backend/PROJECT.md`](./backend/PROJECT.md)
- Frontend → [`frontend/PROJECT.md`](./frontend/PROJECT.md)

---

## Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Backend  | Laravel (latest, v13-era), PHP 8.4, Sanctum, spatie/laravel-permission, attribute routing (`#[Authorize]`) |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn-style components, react-hook-form + Zod |

---

## How the two folders work together

```
Browser
  │  (never talks to Laravel directly)
  ▼
Next.js (frontend)
  src/app/api/*        ← BFF route handlers (Server-side, run on the Node server)
  src/modules/*        ← feature schemas / stores / components
  src/shared/*         ← reusable UI + helpers (fetcher, form, table, dialog…)
  │  fetchBackend() reads the `access_token` cookie,
  │  sends `Authorization: Bearer <token>` to Laravel
  ▼
Laravel (backend)  NEXT_PUBLIC_API_BASE_URL  (default http://localhost:8000/api)
  /api/v1/master-data/*   ← CRUD (kecamatan, kelurahan, user)
  /api/v1/references/*    ← lookups (roles, kecamatan, kelurahan)
  /api/auth/*             ← login / me / logout
  /public-file, /private-file  ← document streaming
```

**Key rule:** the browser only ever calls `/api/*` on the Next.js origin. All Laravel communication happens **server-side** inside the Next.js route handlers. This keeps the auth token out of the client and lets the frontend reshape Laravel's responses.

### Authentication
1. `POST /api/auth/login` (BFF) → Laravel `/api/auth/login`.
2. Laravel returns `{ user, token }` inside the standard envelope.
3. The BFF stores `token` in the `access_token` **HTTP-only cookie** (`lib/sessions.ts`).
4. Every later BFF call uses `shared/helpers/server-fetcher.ts` → reads the cookie → calls Laravel with `Authorization: Bearer <token>`.
5. Laravel protects routes with the `auth:sanctum` middleware and `role:` gates.

### Response contract (shared by both sides)
```ts
type MainRes<T> =
  | { success: true;  code: string; message: string; result: T }
  | { success: false; code: string; message: string; errors: Record<string,string[]> | string | null };
```
Paginated endpoints nest `{ data: T[], links, meta }` **inside** `result`
(`meta` = `{ current_page, last_page, per_page, total, … }`).
Laravel builds this via `BaseController::sendResponse()` + `MainHelper::paginatedResponse()` using `MessageCode` keys (e.g. `KECAMATAN200`).

---

## Current scope (post-reset)

The template was reset to a minimal but complete example set:

| Side     | Kept (examples) | Removed |
| -------- | --------------- | ------- |
| Backend  | `kecamatan`, `kelurahan`, `user` CRUD + `roles` reference + auth | 7 `pendataan-*` domains, Google OAuth (backend uses no Socialite) |
| Frontend | `kecamatan`, `kelurahan`, `user` modules; public landing (Starter); private `dashboard` + `master-data` | `pendataan-area` (7 domains), public map route, `titik-peta` API, Google OAuth |

This gives you a working CRUD reference (simple `kecamatan`/`kelurahan`, plus `user` with auth/roles) to copy when building a new feature.

---

## Local setup (both folders)

```bash
# Backend
cd backend
composer install
cp .env.example .env        # set DB + APP_URL
php artisan key:generate
php artisan migrate --seed
php artisan serve           # http://localhost:8000

# Frontend
cd frontend
npm install
cp .env.example .env        # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
npm run dev                 # http://localhost:3000
```

See each folder's `PROJECT.md` for the full structure and conventions.
