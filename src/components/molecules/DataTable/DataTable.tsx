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
            {/* <th scope="col">
            <button
              type="button"
              aria-label="Sort by name"
              aria-sort="ascending"
            >
              Name <span aria-hidden="true">▲</span>
            </button>
          </th>
          <th scope="col">Email</th>
          <th scope="col">Role</th> */}
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
              <nav aria-label="Table pagination" className="table-pagination">
                <div className="pagination-controls">
                  <label htmlFor="rows-per-page" className="visually-hidden">
                    Rows per page
                  </label>
                  <select
                    id="rows-per-page"
                    name="rows-per-page"
                    aria-label="Rows per page"
                  >
                    <option value="10" selected>
                      10
                    </option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>

                  <ul className="pagination">
                    <li>
                      <button type="button" aria-label="Previous page">
                        Previous
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label="Page 1"
                        aria-current="page"
                      >
                        1
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Page 2">
                        2
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Next page">
                        Next
                      </button>
                    </li>
                  </ul>

                  <div aria-live="polite" className="sr-only" id="table-status">
                    Showing 1–10 of 45 users
                  </div>
                </div>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </AnimatePresence>
  );
};
