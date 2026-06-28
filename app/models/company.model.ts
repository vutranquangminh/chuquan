/**
 * Model layer. Convention: `<entity>.model.ts`. Models hold entity types and
 * the input/output shapes used by services and routes.
 */
import type { Company } from '@prisma/client';

export type { Company };

/** Flat row the table renders and the add/edit form binds to. */
export interface CompanyRow {
  id: string;
  name: string;
  taxCode: string | null;
  address: string | null;
  phone: string | null;
  bankAccount: string | null;
  contractCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Service input — a subset of the parsed table params. */
export interface CompanyListParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  search: string;
}

export interface CompanyListResult {
  data: CompanyRow[];
  total: number;
  page: number;
  pageSize: number;
}
