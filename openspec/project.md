# Project Context

## Purpose

chuquan is a Remix application scaffold. This document captures the tech stack
and conventions so AI-assisted, spec-driven changes stay consistent. The folder
structure and tooling are modelled on `opilot-pm`.

## Tech Stack

- TypeScript — Primary language
- React 19 — UI library
- Remix (Vite) — Full-stack web framework
- PostgreSQL — Database
- Prisma — ORM
- styled-components — CSS-in-JS (via @aic-kits/react)
- @aic-kits/react — Custom UI component library + theming
- @aic-kits/remix — CRUD table helpers (`useCrudTable`, `handleCrudRouteAction`)
- @aic-kits/retrieval — Retrieval service
- Tailwind CSS — Utility styling
- dayjs — Date/time (central config in `app/lib/dayjs.ts`)
- Node.js (v20+) — Runtime

## Project Conventions

### Naming Conventions

| Element           | Convention                          | Example                         |
| ----------------- | ----------------------------------- | ------------------------------- |
| Routes            | Dot notation, `_layout` prefix      | `_auth.users._index.tsx`        |
| Components         | PascalCase                          | `UserCard.tsx`                  |
| Services          | PascalCase + `.service.ts`          | `user.service.ts`               |
| Models            | `<entity>.model.ts`                 | `user.model.ts`                 |
| Utils             | kebab-case                          | `format-date.ts`               |
| Hooks             | camelCase, `use` prefix             | `useMounted.ts`                 |
| Constants         | SCREAMING_SNAKE_CASE                | `DEFAULT_PAGE_SIZE`             |
| Functions         | camelCase                           | `formatDate()`                 |
| Boolean variables | `is/has/can` prefix                 | `isMounted`, `canEdit`         |
| Props interfaces  | `ComponentNameProps`                | `UserCardProps`                |

### Layering

Routes → Services → (Prisma) Models. Routes never call Prisma directly; they go
through services. See `app/README.md` for the full folder taxonomy.

### Commits

Conventional Commits, enforced by commitlint on the `commit-msg` hook.
