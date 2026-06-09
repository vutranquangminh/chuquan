/**
 * Model layer. Convention: `<entity>.model.ts`. Models hold entity types and
 * the input/output shapes used by services and routes.
 */
import type { User } from '@prisma/client';

export type { User };

export type CreateUserInput = Pick<User, 'email' | 'name'>;

export type UpdateUserInput = Partial<CreateUserInput>;
