## Why

chuquan needs to digitize furniture/interior sales contracts (Hợp đồng mua bán nội
thất) that are currently authored as Word documents. Without a structured data
model, contracts cannot be searched, totaled, or reused across deals — every document
re-types the same buyer and seller by hand, which is slow and error-prone. This change
establishes the
foundational database schema so the rest of the application can manage contracts as
data rather than documents.

## What Changes

- Introduce a **reusable company directory** for organizations (buyers and sellers), so
  the same company is entered once and referenced as buyer or seller by many contracts.
- The **sales-contract aggregate** references a buyer and a seller company, holds line
  items, and stores the contract total (with amount-in-words and a VAT-inclusive flag).
- Line items carry their own product detail (name, unit, quantity, unit price) — products
  are entered per contract, not shared across contracts.
- Money is stored as **exact whole đồng** (`Decimal(18,0)` — VND has no sub-unit); line
  totals are derived on read and the contract total is stored and maintained server-side.
  Amount-in-words is stored as a denormalized field.
- Adds the corresponding Prisma models, an initial migration, and `*.model.ts` entity
  types. No service/route layer in this change (follow-up).

This is **not** a breaking change — there is no existing schema; these are net-new
tables.

### Design assumptions (open for revision in design.md)

- Resolved: **companies are reusable master data** (a `Company` table referenced by
  contracts as buyer/seller).
- Resolved: **products are per-contract**, embedded on line items (no shared `Product`
  table).

## Capabilities

### New Capabilities

- `company-directory`: Reusable organizations that act as contract parties — legal name,
  address, tax code (mã số thuế), phone, and a bank account (free text). Covers both
  Bên A (buyer) and Bên B (seller).
- `sales-contract`: The contract aggregate — number, buyer & seller company references,
  line items, and the contract total (amount-in-words, VAT-inclusive flag).

### Modified Capabilities

<!-- None — no existing specs in openspec/specs/. -->

## Impact

- **Schema**: new Prisma models (`prisma/schema.prisma`) — Company, Contract, and
  ContractItem. `Contract` references a buyer and seller `Company` via FKs and stores
  the contract total (amount-in-words, VAT-inclusive flag); line items hold their own
  product detail; `Company` carries a
  free-text `bankAccount`. One initial migration. No enums and no `BankAccount`, `Product`,
  `ContractParty`, or `HandoverRecord` tables (see design Decisions 2, 3, 4).
- **Types**: new `app/models/*.model.ts` entity types mirroring the Prisma models.
- **Dependencies**: none new — uses existing Prisma + PostgreSQL stack.
- **Downstream (out of scope here)**: services (`app/services/*.service.ts`) and
  routes that read/write contracts will build on these models in a later change.
