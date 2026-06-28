import type { PrismaModelDelegate } from '@aic-kits/remix/server';

/**
 * Declarative create/update/delete generator on top of a Prisma model delegate.
 * Each field tells how to coerce the submitted form value. Prisma errors are left
 * to propagate so `handleCrudRouteAction` maps them (P2002 -> 409, P2003 -> 400).
 */
export type FieldDef =
  | true
  | {
      date?: boolean;
      nullable?: boolean;
      default?: unknown;
      createOnly?: boolean;
      extract?: (value: unknown) => unknown;
    };

interface PrismaModelCallable {
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
}

interface CrudModelOptions {
  model: unknown;
  fields: Record<string, FieldDef>;
  include?: unknown;
  mapResponse: (row: unknown) => Record<string, unknown>;
  overrides?: Partial<PrismaModelDelegate>;
}

function extractField(value: unknown, def: FieldDef): unknown {
  if (def === true) return value as string;
  if (def.extract) return def.extract(value);
  if (def.date) return value && value !== '' ? new Date(value as string) : null;
  if (def.nullable) return (value as string) || null;
  if (def.default !== undefined) return (value as string) || def.default;
  return value as string;
}

export function createCrudModel(
  options: CrudModelOptions,
): PrismaModelDelegate {
  const {
    model: raw,
    fields,
    include,
    mapResponse,
    overrides,
  } = options;
  const model = raw as PrismaModelCallable;

  const generated = {
    create: async (args: unknown) => {
      const { data } = args as { data: Record<string, unknown> };
      const createData: Record<string, unknown> = {};
      for (const [key, def] of Object.entries(fields)) {
        if (key in data) createData[key] = extractField(data[key], def);
      }
      return mapResponse(
        await model.create({
          data: createData,
          ...(include ? { include } : {}),
        }),
      );
    },
    update: async (args: unknown) => {
      const { where, data } = args as {
        where: { id: string };
        data: Record<string, unknown>;
      };
      const updateData: Record<string, unknown> = {};
      for (const [key, def] of Object.entries(fields)) {
        if (def !== true && def.createOnly) continue;
        if (key in data) updateData[key] = extractField(data[key], def);
      }
      return mapResponse(
        await model.update({
          where,
          data: updateData,
          ...(include ? { include } : {}),
        }),
      );
    },
    delete: async (args: unknown) => {
      const { where } = args as { where: { id: string } };
      // Let Prisma errors (e.g. P2003 FK violation) propagate; the route handler
      // maps them to clean HTTP responses.
      return model.delete({ where });
    },
  } as PrismaModelDelegate;

  return { ...generated, ...overrides } as PrismaModelDelegate;
}
