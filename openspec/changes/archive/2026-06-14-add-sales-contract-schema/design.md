## Context

The source of truth today is a Word document — a bilateral furniture/interior sales
contract (Hợp đồng mua bán nội thất) between a buyer (Bên A) and a seller (Bên B).
See [proposal.md](proposal.md) for motivation. The only existing model is `User`
(`cuid()` id, `createdAt`/`updatedAt`), on PostgreSQL via Prisma. This design defines
the data model that turns that document into structured, reusable data.

Constraints from the project:
- Prisma singleton (`~/lib/prisma`), entity types re-exported from `app/models/*.model.ts`.
- IDs are `String @default(cuid())`; every table carries `createdAt`/`updatedAt`.
- Money is **VND**, which has no fractional subunit — amounts are whole đồng.

## Goals / Non-Goals

**Goals:**
- A pragmatic schema covering the contract core: the two parties, line items, and the
  contract total.
- Reusable company master data (buyers and sellers) referenced by many contracts; product
  detail is entered per contract on line items.
- Correct money handling for VND values that can exceed the 32-bit integer range.

**Non-Goals:**
- Services, loaders/actions, or UI (follow-up change).
- Contract-document PDF/Word generation or e-signing.
- Multi-currency — only VND is supported (no `currency` field).
- Auto-generating the Vietnamese amount-in-words string (stored as a field for now).

## Decisions

### 1. Money: `Decimal @db.Decimal(18, 0)`, not `Int` or `Float`

VND amounts are whole đồng but routinely exceed `Int`'s max (2,147,483,647 ≈ 2.1B VND);
a single project contract can be billions. `Float` is unacceptable for money (rounding).
`Decimal(18, 0)` stores exact integers up to 10^18 đồng. Scale is `0` because there is
no sub-đồng unit. *Alternative considered:* `BigInt` — rejected as it has the same
loader-serialization friction as `Decimal` without Decimal's explicit precision semantics.

### 2. Line items are self-contained — no shared product catalog

Products are entered per contract and never reused across contracts, so there is no
catalog table to reference. `ContractItem` stores its own `name`, `unit`,
`unitPrice`, and `quantity` directly. The line amount (`quantity * unitPrice`) is
**derived on read, not stored** — it is cheap to compute and storing it would add a
column that can drift from its inputs.
*Alternative considered:* a shared `Product` master that line items snapshot from (the
previous design) — rejected; with no cross-contract reuse it adds a redundant table and
join, and there is no shared-catalog mutation to protect signed contracts from.

### 3. Bilateral parties as two FKs to a reusable `Company` table

A sales contract is strictly buyer↔seller. `Contract` carries `buyerId` and `sellerId`
FKs to a shared `Company` table, so the same organization (legal name, tax code, address,
phone, bank account) is entered once and reused across many contracts. The two FK columns
enforce the bilateral invariant directly.
*Alternative considered:* embedding both parties' info as columns on `Contract` —
rejected; companies recur across deals, so a reusable table avoids re-typing and keeps one
source of truth. A `ContractParty` join table is also rejected — it permits invalid states
(0 or 3 parties).

### 4. Bank account is a single free-text string on `Company`

Bank details are low-volume, never queried on, and only need to print as written. So
`Company` carries a single free-text `bankAccount String?` rather than a structured model
— no dedicated `BankAccount` table and no split `accountNumber` / `bankName` /
`accountHolder` / `branch` columns.
*Alternative considered:* a `Company` 1—N `BankAccount` table with structured fields —
deferred; promote `bankAccount` back to a table only when a company needs multiple
accounts that must be validated or selected among.

### 5. Free-text for unit of measure (no enums)

Unit (ĐVT: "Cái", "Bộ", …) is open and data-entry-driven → keep as `String` rather than
an enum. Contract status and type are likewise left out of the schema for now (no
`ContractStatus` / `ContractType` enums); reintroduce them only when a lifecycle
workflow needs them.

### 6. Denormalized total and amount-in-words

`Contract.totalAmount` and `totalAmountInWords` are stored because the contract states
them explicitly and we want to query/sum contract values in SQL; the app keeps
`totalAmount` equal to `sum(quantity * unitPrice)` over line items, **computed
server-side** (never trusted from the client). Per-line amounts are derived and not
stored (Decision 2). `vatIncluded Boolean` records whether the total is VAT-inclusive.

This sum invariant lives in the **application layer** — `totalAmount` is recomputed
inside the same transaction as any line-item mutation — not in the database. A Postgres
`GENERATED` column can't aggregate across child rows (line items are separate rows in a
separate table), and a trigger would sit outside Prisma's schema management; the residual
drift risk is tracked in Risks / Trade-offs.

### Proposed Prisma sketch (subject to refinement in specs/tasks)

```prisma
model Company {
  id          String        @id @default(cuid())
  name        String
  taxCode     String?       @unique          // Mã số thuế
  address     String?
  phone       String?
  bankAccount String?                          // Số tài khoản — free text, not a separate model
  buyerContracts  Contract[] @relation("BuyerCompany")
  sellerContracts Contract[] @relation("SellerCompany")
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Contract {
  id          String   @id @default(cuid())
  number      String   @unique           // Số HĐ

  buyerId     String
  buyer       Company  @relation("BuyerCompany", fields: [buyerId], references: [id])
  sellerId    String
  seller      Company  @relation("SellerCompany", fields: [sellerId], references: [id])

  totalAmount        Decimal  @db.Decimal(18, 0)
  totalAmountInWords String?
  vatIncluded        Boolean  @default(true)

  items      ContractItem[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@index([buyerId])
  @@index([sellerId])
}

model ContractItem {
  id         String  @id @default(cuid())
  contractId String
  contract   Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
  name       String
  unit       String
  quantity   Int
  unitPrice  Decimal @db.Decimal(18, 0)
  // line amount (quantity * unitPrice) is derived, computed server-side — not stored
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@index([contractId])
}
```

## Risks / Trade-offs

- **Prisma `Decimal` across the Remix loader boundary** is not JSON-serializable as a
  number → Mitigation: serialize money with `.toString()` (or a typed `Money` codec) in
  loaders; never `JSON.stringify` a raw `Decimal`. Document in the follow-up service change.
- **Denormalized `totalAmount` can drift** from the line-item sum → Mitigation: compute
  and overwrite it on every line-item mutation inside one transaction; add a check/test.
- **Free-text `unit`** can fragment ("Cái" vs "cái") → accepted now; normalize at input later.

## Migration Plan

1. Add the models above to `prisma/schema.prisma` (additive — existing `User` untouched).
2. `prisma migrate dev --name add_sales_contract_schema` to generate the initial migration.
3. Add `app/models/*.model.ts` re-exporting the new Prisma types (mirroring `user.model.ts`).
4. **Rollback**: the migration only creates new tables, so a down-migration that drops
   them is safe; no existing data is touched.

## Open Questions

- Resolved: **companies** are a reusable master-data table (FK'd from contracts);
  **products** are entered per contract on line items (no `Product` table).
- Is a soft-delete / audit requirement expected on contracts, or is hard delete acceptable?
