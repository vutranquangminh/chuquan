# app/ folder structure

Folder taxonomy mirroring `opilot-pm`, seeded with minimal placeholders to be
refactored as the app grows. Each `*` folder below holds an example file
demonstrating the naming convention.

| Folder             | Purpose                                                        | Naming convention                  |
| ------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `auth/`            | Auth providers, session/user helpers, identity SDK wiring     | `*.client.ts`, `*.server.ts`       |
| `components/`      | React components, grouped by feature; shared primitives in `ui/` | `PascalCase.tsx`                |
| `config/`          | App config + aic-kits CRUD `TableConfig` objects              | `*.config.ts`, `*-tables.ts`       |
| `contexts/`        | React context providers (+ `index.ts` barrel)                 | `PascalCaseContext.tsx`            |
| `email-templates/` | Email templates                                               | —                                  |
| `hooks/`           | Custom React hooks (+ `index.ts` barrel)                      | `useXxx.ts`                        |
| `lib/`             | Third-party client setup / cross-cutting infra                | `kebab-or-domain.ts`               |
| `models/`          | Entity types + input/output shapes                            | `*.model.ts`                       |
| `routes/`          | Remix routes (flat, dot-notation; `_layout` prefix)           | `_auth.section.page.tsx`           |
| `rules/`           | Business rule engine                                          | `PascalCase.ts`                    |
| `services/`        | Data access + business logic (the layer routes call)          | `*.service.ts`                     |
| `themes/`          | styled-components theme overrides for `@aic-kits/react`        | `*.theme.ts`                       |
| `utils/`           | Pure, framework-agnostic helpers                              | `kebab-case.ts`                    |
| `__tests__/`       | Vitest setup + shared test utilities                          | `*.test.ts`                        |

## Root files

- `root.tsx` — app shell; wraps children in `@aic-kits/react` `ThemeProvider`.
- `entry.client.tsx` / `entry.server.tsx` — Remix hydration / SSR entries.
- `sessions.server.tsx` — cookie session storage.
- `tailwind.css` — Tailwind entry + design tokens.
- `styled.d.ts` — styled-components `DefaultTheme` augmentation.

## Other naming conventions (from opilot-pm)

- Functions: `camelCase`; booleans prefixed `is/has/can`.
- Constants: `SCREAMING_SNAKE_CASE`.
- Props interfaces: `ComponentNameProps`.
