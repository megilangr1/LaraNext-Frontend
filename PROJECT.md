# Frontend — Next.js (`/frontend`)

This is the **UI + BFF layer** for the Starter template. It is a Next.js 16 (App Router) app that renders the interface and proxies all data to the Laravel backend through server-side Route Handlers.

> You are in `/frontend`. The backend lives in the sibling folder `../backend` (see [`../backend/PROJECT.md`](../backend/PROJECT.md)). You do **not** need to open it to build UI, but you must respect the **API contract** described here so the BFF handlers line up with Laravel.

---

## The BFF pattern (most important concept)

The browser **never** calls Laravel. It calls Next.js Route Handlers under `src/app/api/*`, which run on the Node server and forward to Laravel.

```
Browser ──▶ /api/master-data/kecamatan ──▶ fetchBackend('/v1/master-data/kecamatan') ──▶ Laravel
```

- **Backend base URL:** `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000/api`).
- **Helper:** `shared/helpers/server-fetcher.ts → fetchBackend(path, init)`.
  - Reads the `access_token` cookie, sends `Authorization: Bearer <token>` to Laravel.
  - Returns `[status, MainRes<T>]`. On 401 it clears the cookie.
- **Response envelope:** `shared/types/api-response.ts`:
  ```ts
  type MainRes<T> =
    | { success: true;  code: string; message: string; result: T }
    | { success: false; code: string; message: string; errors: Record<string,string[]> | string | null };
  ```
  Paginated results nest `{ data: T[], links, meta }` inside `result`.

### Auth
- `src/lib/sessions.ts` stores/reads the `access_token` cookie.
- `src/app/api/auth/login/route.ts` posts to Laravel `/api/auth/login`, stores the token, returns the `user`.
- `src/modules/auth/components/auth-init.tsx` boots the session; `auth-client-guard.tsx` protects private routes.
- `src/proxy.ts` middleware redirects unauthenticated users away from `/dashboard` and `/master-data`.

---

## Directory structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/login/                 # public login page
│   │   ├── (public)/(main)/              # public landing (Starter brand) — the only public route
│   │   ├── (private)/                     # protected area (AuthClientGuard)
│   │   │   ├── dashboard/                 # welcome screen
│   │   │   ├── master-data/               # kecamatan, kelurahan, users CRUD pages
│   │   │   ├── _components/sidebar/       # AppSidebar, NavMain, NavUser
│   │   │   ├── layout.tsx, error.tsx, loading.tsx
│   │   ├── (stream-file)/                 # BFF document streaming
│   │   ├── api/                           # ← BFF route handlers (the bridge to Laravel)
│   │   │   ├── auth/                      # login, logout, me
│   │   │   └── master-data/               # kecamatan, kelurahan, users (+ [id], page-config)
│   │   ├── layout.tsx, globals.css, proxy.ts
│   ├── components/ui/                     # shadcn-style + decorative components (45+)
│   ├── hooks/                             # use-media-query, use-mobile
│   ├── lib/                               # sessions.ts, utils.ts
│   ├── modules/
│   │   ├── auth/                          # store, schema, components (login)
│   │   └── private/                       # per-entity: kecamatan, kelurahan, user
│   │       └── <domain>/schema/*.schema.ts  # Zod schemas (create/update/base)
│   ├── shared/
│   │   ├── components/                    # table, form, dialog, combo-box, errors, image-helper, lightbox, server-file
│   │   ├── helpers/                       # server-fetcher, client-fetcher, form-helper, extract-request-body, …
│   │   ├── schemas/base.schema.ts         # shared Zod field builders
│   │   ├── stores/delete-dialog-store.ts # Zustand
│   │   └── types/api-response.ts          # MainRes envelope
│   └── trash/example-get.route.ts         # dead-code example of a BFF GET handler
├── public/  docker/  .env(.example)  package.json
```

---

## Conventions for adding a CRUD (copy the `kecamatan` example)

Assume backend `/api/v1/master-data/<domain>` already exists.

1. **Schemas** — `src/modules/private/<domain>/schema/`:
   - `base-<domain>.schema.ts`, `create-<domain>.schema.ts` (extends base + `.omit`/refine), `update-<domain>.schema.ts`.
   - Use `shared/schemas/base.schema.ts` field builders (`stringField`, `numberField`, …).
2. **BFF handlers** — `src/app/api/master-data/<domain>/`:
   - `route.ts` (GET list w/ search+sort+page, POST create), `[id]/route.ts` (GET/PUT/DELETE), `page-config/route.ts` (form config).
   - Inside, call `fetchBackend('/v1/master-data/<domain>?...')` and return `NextResponse.json(data, { status })`.
3. **Pages** — `src/app/(private)/master-data/<domain>/`:
   - `page.tsx` (list + `List<Domain>`), `create/page.tsx`, `[id]/edit/page.tsx`, `_components/form-<domain>.tsx`, `list-<domain>.tsx`.
4. **Sidebar** — register the link in `app/(private)/_components/sidebar/app-sidebar.tsx` under `navAdmin`.
5. **(Optional) reference list** — if other forms need this entity as a dropdown, add a `references` entry in `backend/routes/api.php` and a BFF `list` handler.

### Reusable building blocks (do NOT duplicate)
- Tables: `shared/components/table/dynamic-table.tsx`, `pagination-table.tsx`.
- Forms: `shared/components/form/*`, `shared/helpers/form-helper.ts`.
- Dialogs: `shared/components/dialog/*`, `shared/stores/delete-dialog-store.ts`.
- Combobox: `shared/components/combo-box/*`.

---

## Running

```bash
npm install
cp .env.example .env          # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
npm run dev                   # http://localhost:3000
npm run build                 # production build
node ./node_modules/typescript/bin/tsc --noEmit   # typecheck
```

## Notes
- Public site is the **landing page only** (`(public)/(main)`); the interactive map was removed during reset.
- Google OAuth was removed; login is email/password via Sanctum.
- The `trash/` folder intentionally holds an example BFF route — reference it, don't ship it.
