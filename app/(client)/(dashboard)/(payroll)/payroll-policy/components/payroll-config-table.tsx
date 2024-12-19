"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PayrollPolicy, usePayrollStore } from "../../payroll-store";
import { Icon } from "@iconify/react/dist/iconify.js";

export const columns: ColumnDef<PayrollPolicy>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "pol_type",
    id: "pol_type",
    header: "Policy Type",
    cell: ({ row }) => <div>{row.getValue("pol_type")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({}) => {
      // const policy = row.original;

      // const openEditModal = (id: Number) => {
      //   // Implement logic for opening the edit modal
      // };

      // const openDeleteModal = (id: Number) => {
      //   // Implement logic for opening the delete confirmation modal
      // };

      return (
        <div className="flex items-center gap-1">
          <Icon
            icon="mage:edit"
            className="h-6 w-6 cursor-pointer text-blue-500"
            aria-label="Edit policy"
            // onClick={() => openEditModal(policy.id)}
          />
          <Icon
            icon="weui:delete-outlined"
            className="h-6 w-6 cursor-pointer text-red-500"
            aria-label="Delete policy"
            // onClick={() => openDeleteModal(policy.id)}
          />
        </div>
      );
    },
  },
];

export default function PayrollConfigTable() {
  const { payrollPolicies: data, fetchPayrollPolicy } = usePayrollStore();
  const payrollPoliciesData = Array.isArray(data) ? data : [];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: payrollPoliciesData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    if (payrollPoliciesData.length === 0) {
      fetchPayrollPolicy();
    }
  }, [payrollPoliciesData]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-2 py-4">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => {
              table
                .getColumn("pol_type")
                ?.setFilterValue(
                  e.target.value === "all" ? "" : e.target.value,
                );
            }}
          >
            <option value="all">All</option>
            <option value="Benefit">Benefit</option>
            <option value="Deduction">Deduction</option>
          </select>
        </div>
      </div>
      <div className="rounded-md border">
        <table className="table table-lg rounded border border-base-300 bg-base-100">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
