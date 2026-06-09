/**
 * Service layer. Convention: `<domain>.service.ts` (PascalCase exported object
 * or class). Services own data access + business logic; routes call services,
 * never Prisma directly.
 */
import { prisma } from '~/lib/prisma';

export const UserService = {
  list() {
    return prisma.user.findMany();
  },

  getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
