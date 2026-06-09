/**
 * Singleton Prisma client.
 *
 * In development the module is re-evaluated on every change, so we cache the
 * client on `globalThis` to avoid exhausting the database connection pool.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
