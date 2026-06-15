# company-directory Specification

## Purpose

Maintain reusable `Company` records so an organization's details (legal name, tax code,
address, phone, bank account) are entered once and referenced by many contracts.

## Requirements

### Requirement: Reusable company records

The system SHALL store organizations as reusable `Company` records, each with a required
legal name and optional tax code (mã số thuế), address, phone, and bank account. A single
company SHALL be referenceable by many contracts so its details are entered only once.

#### Scenario: Create a company with name only

- **WHEN** a company is created with only a legal name
- **THEN** the record is persisted with that name and all optional fields null

#### Scenario: Create a company with full details

- **WHEN** a company is created with a name, tax code, address, phone, and bank account
- **THEN** all provided fields are persisted on the company

#### Scenario: Reuse one company across multiple contracts

- **WHEN** the same company is referenced by several contracts as buyer or seller
- **THEN** each contract points to the single company record without duplicating its details

### Requirement: Unique tax code

The system SHALL ensure a company tax code (mã số thuế), when provided, is unique across
companies. Companies without a tax code SHALL be allowed.

#### Scenario: Reject a duplicate tax code

- **WHEN** a company is saved with a tax code already used by another company
- **THEN** the operation is rejected by a uniqueness constraint

#### Scenario: Allow multiple companies without a tax code

- **WHEN** several companies are created without a tax code
- **THEN** all are persisted, because the uniqueness constraint does not apply to an absent tax code

### Requirement: Bank account as free text

The system SHALL store a company's bank account as a single free-text string, not as
structured account-number / bank-name / account-holder / branch fields.

#### Scenario: Store a bank account string

- **WHEN** a company is saved with a bank account such as "Vietcombank — 0123456789 — Công ty A"
- **THEN** the value is stored verbatim in the single bank-account field
