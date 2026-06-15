## ADDED Requirements

### Requirement: Companies management page

The system SHALL provide a page that lists companies in a CRUD table with pagination,
search (by name and tax code), and column sorting.

#### Scenario: View the paginated company list

- **WHEN** a user opens the Companies page
- **THEN** companies are shown in a paginated table ordered by a default column

#### Scenario: Search companies

- **WHEN** the user enters a search term
- **THEN** the table shows only companies whose name or tax code matches the term

#### Scenario: Sort by a column

- **WHEN** the user sorts by a sortable column
- **THEN** the list is reordered accordingly and pagination returns to the first page

### Requirement: Add a company

The system SHALL let a user add a company through a form capturing `name` (required) and
optional `taxCode`, `address`, `phone`, and `bankAccount`. On success the company is
persisted and the table refreshes to include it.

#### Scenario: Add with the required field only

- **WHEN** the user submits the add form with only a name
- **THEN** a company is created and appears in the table

#### Scenario: Add with full details

- **WHEN** the user submits a name, tax code, address, phone, and bank account
- **THEN** the company is created with all provided fields

#### Scenario: Reject a missing name

- **WHEN** the user submits the add form without a name
- **THEN** a validation error is shown and no company is created

#### Scenario: Reject a duplicate tax code

- **WHEN** the user submits a tax code already used by another company
- **THEN** creation is rejected and the user sees a clear "tax code already exists" message

### Requirement: Edit a company

The system SHALL let a user edit an existing company's fields, with the changes persisted
and reflected in the table.

#### Scenario: Update company details

- **WHEN** the user edits a company's name or address and saves
- **THEN** the changes are persisted and shown in the table

#### Scenario: Reject a duplicate tax code on edit

- **WHEN** the user changes a company's tax code to one already used by another company
- **THEN** the update is rejected with a clear message and the original value is kept

### Requirement: Delete a company

The system SHALL let a user delete a company, unless it is referenced by a contract as a
buyer or seller, in which case deletion is blocked with a clear message.

#### Scenario: Delete an unreferenced company

- **WHEN** the user deletes a company that no contract references
- **THEN** the company is removed from the directory and the table

#### Scenario: Block deletion of a referenced company

- **WHEN** the user deletes a company referenced by a contract as buyer or seller
- **THEN** deletion is blocked and the user sees a message that the company is in use
