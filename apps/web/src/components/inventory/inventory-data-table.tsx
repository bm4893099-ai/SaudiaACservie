import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import type { ProductRecord } from '../../types/erp';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const getInventoryStatus = (product: ProductRecord) => {
  if (product.stockOnHand <= 0) {
    return { label: 'Out of Stock', tone: 'rose' as const };
  }

  if (product.stockOnHand <= product.reorderLevel) {
    return { label: 'Low Stock', tone: 'amber' as const };
  }

  if (product.expiryDate) {
    const remainingDays = Math.ceil(
      (new Date(product.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (remainingDays <= 5) {
      return { label: 'Expiring Soon', tone: 'amber' as const };
    }
  }

  return { label: 'Healthy', tone: 'emerald' as const };
};

type InventoryDataTableProps = {
  products: ProductRecord[];
  onSelectProduct: (product: ProductRecord) => void;
};

export const InventoryDataTable = ({ products, onSelectProduct }: InventoryDataTableProps) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<ProductRecord>[]>(
    () => [
      {
        header: 'Product',
        accessorFn: (row) => row.name.en,
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-white">{row.original.name.en}</p>
            <p className="text-xs text-slate-400">{row.original.name.ar}</p>
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'SKU',
        accessorKey: 'sku',
      },
      {
        header: 'Stock',
        accessorKey: 'stockOnHand',
        cell: ({ row }) => <span>{row.original.stockOnHand.toFixed(1)}</span>,
      },
      {
        header: 'Price',
        accessorKey: 'sellingPrice',
        cell: ({ row }) => <span>SAR {row.original.sellingPrice.toFixed(2)}</span>,
      },
      {
        header: 'Status',
        accessorFn: (row) => getInventoryStatus(row).label,
        cell: ({ row }) => {
          const status = getInventoryStatus(row.original);
          return <Badge tone={status.tone}>{status.label}</Badge>;
        },
      },
      {
        header: 'Labels',
        id: 'labels',
        cell: ({ row }) => (
          <button
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-brand-400/30 hover:text-white"
            onClick={() => onSelectProduct(row.original)}
            type="button"
          >
            Print Label
          </button>
        ),
      },
    ],
    [onSelectProduct],
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const needle = String(filterValue).toLowerCase();
      return [row.original.name.en, row.original.name.ar, row.original.category, row.original.sku]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    },
  });

  return (
    <Card className="rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Inventory</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Inventory Data Table</h2>
        </div>
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-400/40 sm:max-w-sm"
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search products, SKU, or category"
          value={globalFilter}
        />
      </div>
      <div className="mt-6 overflow-x-auto scrollbar-thin">
        <table className="min-w-full border-separate border-spacing-y-3 text-start">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="px-4 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
