/**
 * Model layer. Convention: `<entity>.model.ts`. Models hold entity types and
 * the input/output shapes used by services and routes.
 */
import type { Company } from '@prisma/client';

export type { Company };

export type CreateCompanyInput = Pick<
  Company,
  'name' | 'taxCode' | 'address' | 'phone' | 'bankAccount'
>;

export type UpdateCompanyInput = Partial<CreateCompanyInput>;
