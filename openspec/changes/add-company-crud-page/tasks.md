## 1. Reusable helpers (copied from opilot-pm, kept generic)

- [x] 1.1 Add `app/utils/crud-model.server.ts` — the `createCrudModel({ model, fields, include, mapResponse, fkErrorMessage, overrides })` helper from the design (generates `create`/`update`/`delete`, translates the FK error on delete).
- [x] 1.2 Add `app/utils/handle-data.server.ts` — the `handleData(request, config, { fetch })` wrapper (`parseTableParams` + `mapTableResponse`).
- [x] 1.3 Confirm the exact `TableConfig` / `TableParamsConfig` field names against `node_modules/@aic-kits/remix/dist/*.d.ts` (0.39.1) and reconcile the config interface in task 3.1 (the one spot the 0.39.1↔0.40.0 surface may differ).

## 2. Company model + read service

- [x] 2.1 Extend `app/models/company.model.ts` with `CompanyRow`, `CompanyListParams`, and `CompanyListResult` (re-using `FilterCondition` / generic types from `@aic-kits/react`).
- [x] 2.2 Add `app/services/company.service.ts` — `CompanyService.getAll(params)`: search `OR` on `name`/`taxCode` (insensitive), whitelisted `orderBy`, `findMany` + `count` in parallel, `_count` of buyer/seller contracts, mapped to `CompanyRow[]`. Imports the `~/lib/prisma` singleton.

## 3. Table config, CRUD config, columns

- [x] 3.1 Add `app/config/company-table.ts` — `COMPANY_TABLE` (URL-param names, page/sort defaults, `requiredFields: ['name']`), with the interface reconciled per task 1.3.
- [x] 3.2 Add `app/config/company-table.server.ts` — `getCompanyCrudConfig(prisma)` using `createCrudModel` (fields: name required, taxCode/address/phone/bankAccount nullable; `mapResponse` → `CompanyRow`; `fkErrorMessage` for the delete guard).
- [x] 3.3 Add `app/components/company/columns.tsx` — `buildCompanyColumns(requiredFields)` returning `Column<CompanyRow>[]` (name, taxCode, address, phone, bankAccount editable; contractCount read-only), with `markRequired` stamping `required` from `requiredFields`.

## 4. Route + page

- [x] 4.1 Add `app/routes/companies.tsx` — `loader` (`handleData` + `CompanyService.getAll` → `json`), `action` (`handleCrudRouteAction(request, getCompanyCrudConfig(prisma))`), and the `CompaniesPage` component (`useCrudTable` → spread into `@aic-kits/react`'s `Table`). Open route — no auth gate (no login flow yet).
- [x] 4.2 Add a link/entry point to `/companies` (e.g. from `app/routes/_index.tsx`) so the page is reachable.

## 5. Verify against the spec

- [x] 5.1 `yarn typecheck` passes (resolve any `@aic-kits` 0.39.1 type mismatches surfaced — esp. the config interface and `useCrudTable`/`Table` prop shapes).
- [x] 5.2 Run `yarn dev`, open `/companies`, and exercise the spec scenarios: paginated list renders; search by name/tax code filters; sort reorders; **add** a company (name-only and full); edit; delete an unreferenced company.
- [x] 5.3 Confirm the friendly-error scenarios: a duplicate `taxCode` shows "tax code already exists" (add the `create`/`update` override from the design if `handleCrudRouteAction` does not surface `P2002`), and deleting a company referenced by a contract is blocked with the `fkErrorMessage`.
- [ ] 5.4 (Optional) Add a Vitest unit test for `CompanyService.getAll` (search/sort/pagination → DTO mapping), mirroring the opilot-pm service tests.
