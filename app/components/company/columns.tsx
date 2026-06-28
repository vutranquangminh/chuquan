import type { Column } from '@aic-kits/react';

import type { CompanyRow } from '~/models/company.model';

const dash = (v: unknown) => (v as string | null) || '—';

/**
 * Columns double as add/edit form fields via `editable` / `type` / `required`.
 */
export function buildCompanyColumns(): Column<CompanyRow>[] {
  return [
    {
      key: 'name',
      header: 'Tên công ty',
      sortable: true,
      editable: true,
      required: true,
      type: 'text',
      filterType: 'text',
      flex: 2,
    },
    {
      key: 'taxCode',
      header: 'Mã số thuế',
      sortable: true,
      editable: true,
      type: 'text',
      filterType: 'text',
      flex: 1,
      render: dash,
    },
    {
      key: 'address',
      header: 'Địa chỉ',
      editable: true,
      type: 'text',
      flex: 2,
      truncate: true,
      render: dash,
    },
    {
      key: 'phone',
      header: 'Điện thoại',
      editable: true,
      type: 'text',
      flex: 1,
      render: dash,
    },
    {
      key: 'bankAccount',
      header: 'Số tài khoản',
      editable: true,
      type: 'text',
      flex: 1.5,
      render: dash,
    },
    {
      key: 'contractCount',
      header: 'Hợp đồng',
      type: 'number',
      flex: 0.7,
      render: (v) => String(v as number),
    },
  ];
}
