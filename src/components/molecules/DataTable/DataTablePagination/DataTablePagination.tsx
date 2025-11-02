import { type ComponentProps } from "react";
import styles from "./DataTablePagination.module.css";
import { Button } from "../../../atoms/Button/Button";
import clsx from "clsx";
import { ChevronLeftIcon } from "../../../atoms/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../atoms/Icons/ChevronRightIcon";
import { DropdownIcon } from "../../../atoms/Icons/DropdownIcon";

export interface DataTablePaginationProps extends ComponentProps<"nav"> {
  total: number;
  limit: number;
  offset: number;
  onNextPage: (offset: number, limit: number) => void;
  onPreviousPage: (offset: number, limit: number) => void;
  onRowsPerPageChange: (limit: number) => void;
}

export const DataTablePagination = ({
  className,
  total,
  limit,
  offset,
  onNextPage,
  onPreviousPage,
  onRowsPerPageChange,
  ...restProps
}: DataTablePaginationProps) => {
  const isPreviousDisabled = offset - limit < 0;
  const isNextDisabled = offset + limit >= total;

  const onNextPageClick = () => {
    onNextPage(offset + limit, limit);
  };

  const onPrevPageClick = () => {
    onPreviousPage(Math.max(offset - limit, 0), limit);
  };

  return (
    <nav
      aria-label="Table pagination"
      className={clsx(styles.pagination, className)}
      {...restProps}
    >
      <div className={styles.rowsPerPage}>
        {/* <label htmlFor={`rows-per-page-${uiniqieId}`}>Rows per page</label>
        <select
          id={`rows-per-page-${uiniqieId}`}
          name={`rows-per-page-${uiniqieId}`}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          aria-label="Rows per page"
        >
          <option value="10" selected>
            10
          </option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select> */}
        <Button
          mode="transparent"
          onClick={() => onRowsPerPageChange(10)}
          before={<div className={styles.rowsPerPageLabel}>Rows per page:</div>}
          after={<DropdownIcon />}
          className={styles.rowsPerPageButton}
        >
          {limit}
        </Button>
      </div>

      <div className={styles.pagesNavigation}>
        <div aria-live="polite" className={styles.pages}>
          {offset}&ndash;{offset + limit} of {total}
        </div>

        <div className={styles.buttons}>
          <Button
            mode="icon"
            aria-label="Previous page"
            onClick={onPrevPageClick}
            disabled={isPreviousDisabled}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            mode="icon"
            aria-label="Next page"
            onClick={onNextPageClick}
            disabled={isNextDisabled}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </nav>
  );
};
