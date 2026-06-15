## Why

The `company-directory` capability defines how companies are stored — the schema is
implemented and migrated — but there is no way to manage companies from the app yet; they
can only be created by touching the database directly. Before contracts can reference a
buyer and a seller, users need a frontend to add and maintain companies. This change adds
a Companies management page built on the `@aic-kits` CrudTable so companies can be added,
listed, edited, and removed from the UI.

## What Changes

- Add a **Companies page** (Remix route) that presents companies in an `@aic-kits`
  **CrudTable** with pagination, search (name / tax code), and column sorting.
- **Add a company** (the headline): a form capturing `name` (required) plus optional
  `taxCode`, `address`, `phone`, and `bankAccount`; on submit the company is created and
  the table refreshes.
- **Edit** and **delete** companies from the table; deletion is blocked when the company is
  referenced by a contract (buyer or seller), with a clear message.
- Add `app/services/company.service.ts` (paginated list + create / update / delete-with-guard)
  following the opilot-pm service pattern (`prisma` singleton, Prisma rows → flat DTO).
- Wire the route **loader** (list via `parseTableParams` + the service) and **action**
  (`handleCrudRouteAction`), plus a table config and column builders, per the aic-kits CRUD
  pattern (`useCrudTable` + `CrudTable`).

No schema change (the `Company` model already exists). No contract UI here — that is a
separate change.

## Capabilities

### New Capabilities

<!-- None — this extends an existing capability. -->

### Modified Capabilities

- `company-directory`: adds **management-page** behaviors — list/search/sort companies, add
  via a form, edit, and delete-with-guard — layered on top of the existing data-model
  requirements (which already cover storage, unique tax code, and free-text bank account).

## Impact

- **Routes**: new companies route (`app/routes/companies.tsx`) with `loader` (list) +
  `action` (`handleCrudRouteAction`).
- **Services**: new `app/services/company.service.ts`.
- **Config / columns**: a table config + column builders for companies (`app/config/*`).
- **Models**: may extend `app/models/company.model.ts` with `CompanyData` /
  pagination-param / paginated-response DTO types.
- **Dependencies**: none new — uses existing `@aic-kits/react` (Table, form controls) and
  `@aic-kits/remix` (`useCrudTable`, `handleCrudRouteAction`).
- **Builds on**: the `Company` Prisma model and migration from the archived
  `add-sales-contract-schema` change.
