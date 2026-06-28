import { Box, Table } from '@aic-kits/react';
import { useCrudTable, type TableData } from '@aic-kits/remix';
import { handleCrudRouteAction } from '@aic-kits/remix/server';
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { buildCompanyColumns } from '~/components/company/columns';
import { COMPANY_TABLE } from '~/config/company-table';
import { getCompanyCrudConfig } from '~/config/company-table.server';
import { prisma } from '~/lib/prisma';
import type { CompanyListParams, CompanyRow } from '~/models/company.model';
import { CompanyService } from '~/services/company.service';
import { handleData } from '~/utils/handle-data.server';

export const meta: MetaFunction = () => [{ title: 'Công ty · chuquan' }];

interface LoaderData {
  companies: TableData<CompanyRow>;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const companies = await handleData(request, COMPANY_TABLE, {
    fetch: (params: CompanyListParams) => CompanyService.getAll(params),
  });
  return json<LoaderData>({ companies });
};

export async function action({ request }: ActionFunctionArgs) {
  return handleCrudRouteAction(request, getCompanyCrudConfig(prisma));
}

export default function CompaniesPage() {
  const { companies } = useLoaderData<LoaderData>();

  // Drop pagination/options/onAction; spread the rest straight into <Table>.
  const {
    pagination: _pagination,
    options: _options,
    onAction: _onAction,
    ...tableProps
  } = useCrudTable<CompanyRow>({
    config: COMPANY_TABLE,
    loaderData: companies,
    buildColumns: () => buildCompanyColumns(),
  });

  return (
    <Box
      style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '24px auto',
        padding: '0 16px',
      }}
    >
      <Table
        {...tableProps}
        title="Công ty"
        noDataMessage="Chưa có công ty nào"
      />
    </Box>
  );
}
