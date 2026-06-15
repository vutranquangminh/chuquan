/**
 * Model layer. Convention: `<entity>.model.ts`. Models hold entity types and
 * the input/output shapes used by services and routes.
 */
import type { Contract } from '@prisma/client';

export type { Contract };

export type CreateContractInput = Pick<
  Contract,
  | 'number'
  | 'buyerId'
  | 'sellerId'
  | 'totalAmount'
  | 'totalAmountInWords'
  | 'vatIncluded'
>;

export type UpdateContractInput = Partial<CreateContractInput>;
