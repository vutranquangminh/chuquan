import { mapTableResponse, parseTableParams } from '@aic-kits/remix/server';
import type {
  PaginatedServiceResponse,
  TableDataResponse,
  TableParams,
  TableParamsConfig,
  TableParamsConfigWithParams,
} from '@aic-kits/remix/server';

interface FetchHandler<T, P = TableParams> {
  fetch: (params: P) => Promise<PaginatedServiceResponse<T>>;
  postProcess?: (
    result: PaginatedServiceResponse<T>,
  ) => Promise<PaginatedServiceResponse<T>>;
}

/**
 * Parse table params from the request URL, run the loader's fetch, and map the
 * result to the `{ data, total, pagination }` shape the table expects.
 */
export async function handleData<T, P = TableParams>(
  request: Request,
  config: TableParamsConfig | TableParamsConfigWithParams,
  handler: FetchHandler<T, P>,
  isMultiTable = false,
): Promise<TableDataResponse<T>> {
  const params = parseTableParams(
    new URL(request.url).searchParams,
    config,
    isMultiTable,
  );
  let result = await handler.fetch(params as P);
  if (handler.postProcess) result = await handler.postProcess(result);
  return mapTableResponse(result) as TableDataResponse<T>;
}
