import type { CrudActionConfig } from '@aic-kits/remix/server';
import type { PrismaClient } from '@prisma/client';

import { createCrudModel } from '~/utils/crud-model.server';

interface CompanyCountRow {
  id: string;
  name: string;
  taxCode: string | null;
  address: string | null;
  phone: string | null;
  bankAccount: string | null;
  _count: { buyerContracts: number; sellerContracts: number };
  createdAt: Date;
  updatedAt: Date;
}

export function getCompanyCrudConfig(
  prisma: PrismaClient,
): Record<string, CrudActionConfig> {
  return {
    companies: {
      model: createCrudModel({
        model: prisma.company,
        fields: {
          name: true,
          taxCode: { nullable: true },
          address: { nullable: true },
          phone: { nullable: true },
          bankAccount: { nullable: true },
        },
        include: {
          _count: { select: { buyerContracts: true, sellerContracts: true } },
        },
        mapResponse: (r) => {
          const row = r as CompanyCountRow;
          return {
            id: row.id,
            name: row.name,
            taxCode: row.taxCode,
            address: row.address,
            phone: row.phone,
            bankAccount: row.bankAccount,
            contractCount:
              row._count.buyerContracts + row._count.sellerContracts,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          };
        },
      }),
      requiredFields: ['name'],
    },
  };
}
