## 1. Prisma schema (`prisma/schema.prisma`)

- [ ] 1.1 Add the `Company` model: `id` cuid, `name` (required), `taxCode String? @unique` (mã số thuế), optional `address` / `phone` / `bankAccount`, `buyerContracts` / `sellerContracts` back-relations, and `createdAt` / `updatedAt`.
- [ ] 1.2 Add the `Contract` model: `number String @unique` (Số HĐ), `buyerId` / `sellerId` with `buyer` / `seller` FKs to `Company` using named relations `"BuyerCompany"` / `"SellerCompany"`, `totalAmount Decimal @db.Decimal(18, 0)`, `totalAmountInWords String?`, `vatIncluded Boolean @default(true)`, `items ContractItem[]`, timestamps, and `@@index([buyerId])` + `@@index([sellerId])`.
- [ ] 1.3 Add the `ContractItem` model: `contractId` + `contract` FK with `onDelete: Cascade`, `name`, `unit`, `quantity Int`, `unitPrice Decimal @db.Decimal(18, 0)`, timestamps, and `@@index([contractId])`. Do not add a stored line-amount column — it is derived (Decision 2).
- [ ] 1.4 Run `npx prisma validate` and `npx prisma format` to confirm the schema parses and the named buyer/seller relations resolve.

## 2. Migration

- [ ] 2.1 Run `yarn db:migrate` (`prisma migrate dev --name add_sales_contract_schema`) to generate and apply the initial migration.
- [ ] 2.2 Verify the generated SQL: unique constraints on `Contract.number` and `Company.taxCode`; non-null FKs `buyerId` / `sellerId` → `Company`; `ContractItem.contractId` → `Contract` with `ON DELETE CASCADE`; `numeric(18,0)` for `totalAmount` and `unitPrice`. Confirm the existing `User` table is untouched.

## 3. Entity types (`app/models/`)

- [ ] 3.1 Add `app/models/company.model.ts` re-exporting `Company` from `@prisma/client`, with `CreateCompanyInput` / `UpdateCompanyInput` (mirroring `user.model.ts`).
- [ ] 3.2 Add `app/models/contract.model.ts` re-exporting `Contract`, with `CreateContractInput` / `UpdateContractInput`.
- [ ] 3.3 Add `app/models/contract-item.model.ts` re-exporting `ContractItem`, with `CreateContractItemInput` / `UpdateContractItemInput`.

## 4. Verify

- [ ] 4.1 Run `yarn db:generate` so the Prisma client exposes `Company`, `Contract`, and `ContractItem`.
- [ ] 4.2 Run `yarn typecheck` — the new `*.model.ts` modules compile against the generated client.
- [ ] 4.3 Spot-check against the specs (via `yarn db:studio` or a scratch script): a duplicate `number` or `taxCode` is rejected, a `Contract` cannot be created without a buyer and a seller, and deleting a `Contract` cascades to its `ContractItem` rows.
