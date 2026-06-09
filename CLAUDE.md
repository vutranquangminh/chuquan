# chuquan

Remix (Vite) + React 19 + Prisma + Tailwind + `@aic-kits/*`, structured after
`opilot-pm`. This file orients AI agents; humans should read [README.md](README.md)
and [app/README.md](app/README.md).

## Stack

Remix v2 on Vite · React 19 · TypeScript (strict) · Prisma (PostgreSQL) ·
Tailwind + styled-components (via `@aic-kits/react`) · dayjs · Vitest.

## Layering

Routes → Services (`app/services/*.service.ts`) → Prisma. Routes never touch
Prisma directly. Entity types live in `app/models/*.model.ts`. See
[app/README.md](app/README.md) for the full folder taxonomy and naming rules.

## Conventions

- Services `*.service.ts`, models `*.model.ts`, hooks `useX.ts`, utils
  kebab-case, components PascalCase, constants `SCREAMING_SNAKE_CASE`.
- Central dayjs instance: `import dayjs from '~/lib/dayjs'` (UTC + timezone
  preconfigured, default `Asia/Ho_Chi_Minh`).
- Prisma singleton: `import { prisma } from '~/lib/prisma'`.
- Path alias `~/*` → `app/*`.

## Tooling

- `yarn dev` / `build` / `start`, `yarn typecheck`, `yarn lint`, `yarn test`.
- Pre-commit (Husky): typecheck + lint-staged. Commit-msg: commitlint
  (Conventional Commits).
- Spec-driven work lives in `openspec/` — run `yarn spec` (`npx @fission-ai/openspec`).
