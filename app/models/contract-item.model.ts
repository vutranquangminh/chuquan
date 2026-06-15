/**
 * Model layer. Convention: `<entity>.model.ts`. Models hold entity types and
 * the input/output shapes used by services and routes.
 */
import type { ContractItem } from '@prisma/client';

export type { ContractItem };

export type CreateContractItemInput = Pick<
  ContractItem,
  'contractId' | 'name' | 'unit' | 'quantity' | 'unitPrice'
>;

export type UpdateContractItemInput = Partial<CreateContractItemInput>;
