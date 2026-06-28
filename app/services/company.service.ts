import { Prisma } from '@prisma/client';

import { prisma } from '~/lib/prisma';
import type {
  CompanyListParams,
  CompanyListResult,
  CompanyRow,
} from '~/models/company.model';

const SORTABLE = new Set(['name', 'taxCode', 'createdAt']);

export class CompanyService {
  static async getAll(params: CompanyListParams): Promise<CompanyListResult> {
    const { page, pageSize, sortBy, sortDirection, search } = params;

    const where: Prisma.CompanyWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { taxCode: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy: Prisma.CompanyOrderByWithRelationInput = SORTABLE.has(sortBy)
      ? { [sortBy]: sortDirection }
      : { name: 'asc' };

    const [rows, total] = await Promise.all([
      prisma.company.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          _count: { select: { buyerContracts: true, sellerContracts: true } },
        },
      }),
      prisma.company.count({ where }),
    ]);

    const data: CompanyRow[] = rows.map((c) => ({
      id: c.id,
      name: c.name,
      taxCode: c.taxCode,
      address: c.address,
      phone: c.phone,
      bankAccount: c.bankAccount,
      contractCount: c._count.buyerContracts + c._count.sellerContracts,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));

    return { data, total, page, pageSize };
  }
}
