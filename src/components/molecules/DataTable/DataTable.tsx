import { useState, type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";
import styles from "./DataTable.module.css";
import { AnimatePresence } from "framer-motion";
import type { DataTableHeaderType, DataTableRowType } from "./types";
import { DataTableCaption } from "./DataTableCaption/DataTableCaption";
import { Button } from "../../atoms/Button/Button";
import { FilterIcon } from "../../atoms/Icons/FilterIcon";
import { DataTableRow } from "./DataTableRow/DataTableRow";
import { DataTableCell } from "./DataTableCell/DataTableCell";
import { DataTableHeader } from "./DataTableHeader/DataTableHeader";
import { DataTablePagination } from "./DataTablePagination/DataTablePagination";

export interface DataTableProps extends ComponentProps<"table"> {
  caption?: ReactNode;
  headers: DataTableHeaderType[];
  rows?: DataTableRowType[];
}

/** Primary UI component for user interaction */
export const DataTable = ({
  caption,
  headers,
  rows,
  ...props
}: DataTableProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  return (
    <AnimatePresence>
      <table {...props} className={clsx(styles.dataTable, props.className)}>
        {caption && (
          <DataTableCaption
            after={<Button before={<FilterIcon />}>Filter by section</Button>}
          >
            {caption}
          </DataTableCaption>
        )}

        <thead className={styles.dataTableHead}>
          <DataTableRow>
            {headers.map((header, index) => (
              <DataTableHeader
                key={index}
                scope="col"
                {...header}
                sorted={sortBy === header.field}
                order={sortOrder}
                onSort={() => {
                  if (sortBy === header.field) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy(header.field);
                    setSortOrder("asc");
                  }
                }}
              >
                {header.label}
              </DataTableHeader>
            ))}
          </DataTableRow>
        </thead>

        <tbody>
          {rows &&
            rows.map((row, index) => (
              <DataTableRow key={index}>
                <DataTableCell>name</DataTableCell>
                <DataTableCell type="number">0.76</DataTableCell>
                <DataTableCell>role</DataTableCell>
              </DataTableRow>
            ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3}>
              <DataTablePagination
                limit={25}
                offset={0}
                total={42}
                onNextPage={() => {}}
                onPreviousPage={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </AnimatePresence>
  );
};
