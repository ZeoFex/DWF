import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-200 bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#F8FAFC]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-[#F8FAFC]/80">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3 text-gray-700", col.className)}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
