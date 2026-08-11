<!-- BEGIN:nextjs-agent-rules -->

# Starter (Next.js 16) — Agent Guide

This project is a **Starter** template: a Next.js 16 frontend paired with a Laravel API backend (see `../backend/PROJECT.md`). It was reset to a minimal example set so it can be reused for any app title.

> The full cross-folder architecture lives in [`PROJECT.md`](./PROJECT.md). Read it if you only have this folder open.

---

# Next.js 16 Standards

This project uses Next.js 16 and React 19.

Follow current App Router conventions.

Prefer Server Components whenever possible.

Respect project architecture before introducing new patterns.

Keep up with deprecation notices and modern React APIs.

---

# Tech Stack

## Core

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Data / Backend

- Laravel API in `../backend` (sibling folder)
- BFF pattern: `src/app/api/*` route handlers proxy to Laravel
- Auth: Laravel Sanctum (token in HTTP-only `access_token` cookie)
- Validation: Zod (frontend) + Laravel Form Requests (backend)

---

# Architecture — Backend Relationship (important)

The browser **never** calls Laravel directly. All data flows through the BFF:

```
Browser → /api/* (Next.js Route Handler) → fetchBackend('/v1/...') → Laravel
```

- Backend base URL: `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000/api`).
- `shared/helpers/server-fetcher.ts → fetchBackend()` reads the `access_token` cookie and sends `Authorization: Bearer <token>`.
- Response envelope (`shared/types/api-response.ts`):
  ```ts
  type MainRes<T> =
    | { success: true;  code: string; message: string; result: T }
    | { success: false; code: string; message: string; errors: Record<string,string[]> | string | null };
  ```
  Paginated results nest `{ data, links, meta }` inside `result`.

When you add a frontend feature, the matching Laravel endpoint must already exist (or you add it per `../backend/PROJECT.md`). Keep route names consistent: `GET /api/master-data/kecamatan` ↔ Laravel `GET /api/v1/master-data/kecamatan`.

---

# Project Structure

Use `src/` as application root.

```
src/
├── app/
│   ├── (auth)/login/              # public login
│   ├── (public)/(main)/           # public landing (Starter brand) — only public route
│   ├── (private)/                 # protected (AuthClientGuard)
│   │   ├── dashboard/
│   │   ├── master-data/           # kecamatan, kelurahan, users
│   │   └── _components/sidebar/   # AppSidebar, NavMain, NavUser
│   ├── (stream-file)/             # BFF file streaming
│   ├── api/                        # BFF handlers: auth/*, master-data/*
│   ├── layout.tsx, globals.css, proxy.ts
├── components/ui/                 # shadcn-style + decorative components
├── hooks/
├── lib/                           # sessions.ts, utils.ts
├── modules/
│   ├── auth/                      # store, schema, components
│   └── private/                   # per-entity: kecamatan, kelurahan, user
│       └── <domain>/schema/*.schema.ts
├── shared/
│   ├── components/                # table, form, dialog, combo-box, errors, server-file
│   ├── helpers/                   # server-fetcher, client-fetcher, form-helper, …
│   ├── schemas/base.schema.ts
│   ├── stores/delete-dialog-store.ts
│   └── types/api-response.ts
└── trash/                         # dead-code example (example-get.route.ts)
```

Kept CRUD examples: **kecamatan, kelurahan, user** (master-data) + **roles** reference + auth.
Removed during reset: `pendataan-area` (7 domains), public interactive map, `titik-peta` API, Google OAuth.

---

# Import Style

Prefer alias imports.

```ts
import MapPicker from "@/shared/components/maps/map-picker";
```

Avoid deep relative imports whenever possible.

---

# Component Organization

Reusable components belong in `src/components/`.

Feature-specific components stay close to their routes (e.g. `src/app/(private)/master-data/<domain>/_components/`).

---

# Server Components First

Use Server Components whenever possible.

Client Components only when necessary: browser APIs, user interaction, forms, animations.

Keep client boundaries minimal.

---

# Naming Conventions

## Files
kebab-case (e.g. `form-kecamatan.tsx`).

## Components
PascalCase (e.g. `FormKecamatan`).

## Variables
camelCase.

---

# Engineering Principles

Prioritize maintainability, predictability, simplicity, scalability.

Avoid tight coupling, massive components, deep prop drilling, premature optimization.

---

# Reusable building blocks (do not duplicate)

- Tables: `shared/components/table/dynamic-table.tsx`, `pagination-table.tsx`
- Forms: `shared/components/form/*`, `shared/helpers/form-helper.ts`
- Dialogs: `shared/components/dialog/*`, `shared/stores/delete-dialog-store.ts`
- Combobox: `shared/components/combo-box/*`

Copy the `kecamatan` module when scaffolding a new CRUD.

<!-- END:nextjs-agent-rules -->
