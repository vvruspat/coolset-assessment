import {
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

import clsx from "clsx";
import styles from "./DataTable.module.css";
import { AnimatePresence } from "framer-motion";
import type { DataTableHeaderType, DataTableRowType } from "./types";
import { DataTableCaption } from "./DataTableCaption/DataTableCaption";
import { DataTableRow } from "./DataTableRow/DataTableRow";
import { DataTableCell } from "./DataTableCell/DataTableCell";
import { DataTableHeader } from "./DataTableHeader/DataTableHeader";
import { DataTablePagination } from "./DataTablePagination/DataTablePagination";

export interface DataTableProps extends ComponentProps<"table"> {
  caption?: ReactNode;
  headers: DataTableHeaderType[];
  rows?: DataTableRowType[];
  total: number;
  onLoadData?: (
    offset: number,
    limit: number,
    sortBy: string | null,
    sortOrder: "asc" | "desc" | null
  ) => void;
}

/** Primary UI component for user interaction */
export const DataTable = ({
  caption,
  headers,
  rows,
  total,
  onLoadData,
  ...props
}: DataTableProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [limit, setLimit] = useState<number>(25);
  const [offset, setOffset] = useState<number>(0);

  const onNextPage = useCallback((offset: number, limit: number) => {
    setOffset(offset);
    setLimit(limit);
  }, []);

  const onPreviousPage = useCallback((offset: number, limit: number) => {
    setOffset(offset);
    setLimit(limit);
  }, []);

  const onRowsPerPageChange = useCallback((limit: number) => {
    setLimit(limit);
    setOffset(0);
  }, []);

  useEffect(() => {
    onLoadData?.(offset, limit, sortBy, sortOrder);
  }, [onLoadData, offset, limit, sortBy, sortOrder]);

  return (
    <AnimatePresence>
      <table {...props} className={clsx(styles.dataTable, props.className)}>
        {caption && (
          <DataTableCaption
            after={
              <div className={styles.filterWrapper}>
                {headers
                  .filter((header) => header.filter)
                  .map((header) => (
                    <div key={header.field}>{header.filter}</div>
                  ))}
              </div>
            }
            aria-label={`${typeof caption === "string" ? caption : ""}`}
          >
            {caption}
          </DataTableCaption>
        )}

        <thead className={styles.dataTableHead}>
          <DataTableRow>
            {headers.map((header) => (
              <DataTableHeader
                key={header.field}
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
              <DataTableRow key={row.id ?? index}>
                {headers.map((header) => (
                  <DataTableCell key={header.field} type={header.type}>
                    {row[header.field]}
                  </DataTableCell>
                ))}
              </DataTableRow>
            ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={headers.length}>
              <DataTablePagination
                limit={limit}
                offset={offset}
                total={total}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </AnimatePresence>
  );
};
