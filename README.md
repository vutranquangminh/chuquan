# chuquan

A [Remix](https://remix.run/) (v2 + Vite) application scaffold, set up with the
same stack and tooling as `opilot-pm`:

- **Remix v2** on Vite with the v3 future flags (incl. single fetch)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS** with shadcn-style design tokens (CSS variables)
- **Prisma** (PostgreSQL)
- **ESLint** (flat config) + **Prettier**
- **Husky** + **lint-staged** pre-commit gate (typecheck + lint staged files)
- **Vitest** + Testing Library

## Getting started

```bash
# 1. Install dependencies (also sets up Husky and generates the Prisma client)
yarn install

# 2. Configure your environment
cp .env.example .env
#    then edit DATABASE_URL

# 3. Generate the Prisma client / run migrations
yarn db:generate
yarn db:migrate

# 4. Start the dev server
yarn dev
```

## Scripts

| Script                | Description                                  |
| --------------------- | -------------------------------------------- |
| `yarn dev`            | Start the Remix dev server                   |
| `yarn build`          | Production build                             |
| `yarn start`          | Serve the production build                   |
| `yarn typecheck`      | Run `tsc --noEmit`                           |
| `yarn lint`           | Lint with ESLint (cached)                    |
| `yarn lint:fix`       | Lint and auto-fix                            |
| `yarn format`         | Format with Prettier                         |
| `yarn format:check`   | Check formatting without writing             |
| `yarn test`           | Run Vitest in watch mode                     |
| `yarn test:run`       | Run the test suite once                      |
| `yarn test:coverage`  | Run tests with coverage                      |
| `yarn db:generate`    | Generate the Prisma client                   |
| `yarn db:migrate`     | Run Prisma migrations (dev)                  |
| `yarn db:studio`      | Open Prisma Studio                           |

## Project structure

```
app/
  __tests__/      Vitest setup + tests
  lib/            Shared utilities (e.g. cn())
  routes/         Remix routes
  root.tsx        App shell
  tailwind.css    Tailwind entry + design tokens
prisma/
  schema.prisma   Database schema
```
