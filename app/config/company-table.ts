import type { TableConfig } from '@aic-kits/remix';
import type { TableParamsConfig } from '@aic-kits/remix/server';

/**
 * Single source of truth for the Companies table: URL-param names + defaults.
 * Satisfies both `TableConfig` (client, for `useCrudTable`) and
 * `TableParamsConfig` (server, for `parseTableParams`).
 */
export type CompanyTableConfig = TableConfig & TableParamsConfig;

export const COMPANY_TABLE: CompanyTableConfig = {
  name: 'companies',
  pageParam: 'page',
  pageSizeParam: 'pageSize',
  sortByParam: 'sortBy',
  sortDirectionParam: 'sortDirection',
  defaultPageSize: 20,
  defaultSortBy: 'name',
  defaultSortDirection: 'asc',
  pageDefault: 1,
  pageSizeDefault: 20,
  sortByDefault: 'name',
  sortDirectionDefault: 'asc',
};
