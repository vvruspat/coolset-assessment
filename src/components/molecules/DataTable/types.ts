import type { ComponentProps, ReactNode } from "react";

export type DataTableHeaderType = ComponentProps<"th"> & {
  field: string;
  label: ReactNode;
  sortable?: boolean;
  type?: "string" | "number";
  filter?: ReactNode;
};

export type DataTableCellValue = string | number | boolean;

export type DataTableRowType = Record<string, DataTableCellValue> & {
  id: string | number;
};
