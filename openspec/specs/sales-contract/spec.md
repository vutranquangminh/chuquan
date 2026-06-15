# sales-contract Specification

## Purpose

Model a sales contract (hợp đồng mua bán) with a unique identity, bilateral buyer/seller
parties, self-contained line items, and contract totals stored in whole đồng.

## Requirements

### Requirement: Contract identity

The system SHALL store a sales contract identified by a unique contract number (Số HĐ).

#### Scenario: Create a contract with a unique number

- **WHEN** a contract is created with a number not used by any other contract
- **THEN** the contract is persisted with that number

#### Scenario: Reject a duplicate contract number

- **WHEN** a contract is created with a number already in use
- **THEN** the operation is rejected by a uniqueness constraint

### Requirement: Bilateral parties

A contract SHALL reference exactly one buyer company and one seller company, both required,
each by reference to a `Company` record.

#### Scenario: Create a contract with a buyer and a seller

- **WHEN** a contract is created referencing an existing buyer company and an existing seller company
- **THEN** the contract is persisted linked to both companies

#### Scenario: Reject a contract missing a party

- **WHEN** a contract is created without a buyer or without a seller
- **THEN** the operation is rejected, because both parties are required

### Requirement: Contract line items

A contract SHALL hold zero or more line items, each capturing its own product name, unit of
measure (ĐVT), quantity, and unit price, independent of any shared catalog.

#### Scenario: Add line items to a contract

- **WHEN** line items are added to a contract with name, unit, quantity, and unit price
- **THEN** each item is persisted and linked to that contract

#### Scenario: Line items are self-contained

- **WHEN** a line item is created
- **THEN** its name, unit, and unit price are stored on the item itself, with no reference to a shared product record

### Requirement: Derived line amount

The per-line amount SHALL be derived as quantity × unit price and SHALL NOT be stored as a
column.

#### Scenario: Line amount obtained by computation

- **WHEN** a line item's amount is needed
- **THEN** it is computed from quantity × unit price rather than read from a stored field

### Requirement: Monetary values in whole đồng

All monetary values SHALL be stored as exact whole đồng using fixed-precision decimals with
no fractional unit, supporting values beyond the 32-bit integer range.

#### Scenario: Store a large contract value

- **WHEN** a contract or line item stores a value of several billion đồng
- **THEN** the value is persisted exactly, with no rounding and no overflow

### Requirement: Contract totals

A contract SHALL store a total amount, an amount-in-words string, and a flag indicating
whether the total is VAT-inclusive.

#### Scenario: Store contract totals

- **WHEN** a contract is saved with a total amount, an amount-in-words string, and a VAT-inclusive flag
- **THEN** all three values are persisted on the contract

### Requirement: Line items deleted with their contract

When a contract is deleted, its line items SHALL be deleted with it.

#### Scenario: Cascade delete

- **WHEN** a contract is deleted
- **THEN** every line item belonging to that contract is removed
