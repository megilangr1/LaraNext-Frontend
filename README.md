# Starter — Frontend (Next.js 16)

The UI + BFF layer of the **Starter** template. A Next.js 16 (App Router) app that renders the interface and proxies all data to a Laravel backend through server-side route handlers.

> Full architecture and the backend relationship: [`PROJECT.md`](./PROJECT.md).
> Backend (Laravel) lives in the sibling folder `../backend` — see [`../backend/PROJECT.md`](../backend/PROJECT.md).

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS v4
- shadcn-style components (`src/components/ui`)
- react-hook-form + Zod for forms/validation
- BFF pattern (`src/app/api/*`) → Laravel at `NEXT_PUBLIC_API_BASE_URL`

## Getting Started

```bash
npm install
cp .env.example .env        # set NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
npm run dev                 # http://localhost:3000
```

The app expects the Laravel backend running and seeded (see `../backend/PROJECT.md`).

## Scripts

```bash
npm run dev       # dev server
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
node ./node_modules/typescript/bin/tsc --noEmit   # typecheck
```

## Project layout

```
src/
├── app/
│   ├── (auth)/login/        # public login
│   ├── (public)/(main)/     # public landing (Starter brand)
│   ├── (private)/           # dashboard + master-data (protected)
│   ├── api/                 # BFF route handlers (bridge to Laravel)
│   └── proxy.ts             # route protection middleware
├── components/ui/           # reusable UI components
├── modules/                 # auth + per-entity (kecamatan, kelurahan, user)
└── shared/                  # table/form/dialog helpers, fetchers, types
```

## Notes

- The browser never calls Laravel directly; all data goes through `src/app/api/*`.
- Public site is the landing page only. Google OAuth and the interactive map were removed during reset.
- See `AGENTS.md` for agent conventions and `PROJECT.md` for the full cross-folder contract.
