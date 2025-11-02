import type { ComponentProps, ReactElement, ReactNode } from "react";

export type DataTableHeaderType = ComponentProps<"th"> & {
  field: string;
  label: ReactNode;
  sortable?: boolean;
  filterFunction?: (
    value: DataTableCellValue,
    filterValue: string | number,
    field: string,
    row: DataTableRowType
  ) => boolean;
  renderFilter?: (
    props: ComponentProps<"input">
  ) => ReactElement<ComponentProps<"input">>;
};

export type DataTableCellValue = string | number | boolean | object;

export type DataTableRowType = Record<string, DataTableCellValue> & {
  id: string | number;
};
