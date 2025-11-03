import { type ComponentProps } from "react";
import styles from "./DataTablePagination.module.css";
import { Button } from "../../../atoms/Button/Button";
import clsx from "clsx";
import { ChevronLeftIcon } from "../../../atoms/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../atoms/Icons/ChevronRightIcon";
import { Select } from "../../../atoms/Select/Select";

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
      <Select
        mode="transparent"
        aria-label="Rows per page selector"
        before={<div className={styles.rowsPerPageLabel}>Rows per page:</div>}
        className={styles.rowsPerPageButton}
        multiselect={false}
        onChoose={(value) => onRowsPerPageChange(Number(value))}
        options={[5, 10, 25, 50].map((num) => ({
          value: num.toString(),
          label: num.toString(),
        }))}
      >
        {limit}
      </Select>

      <div className={styles.pagesNavigation}>
        <div
          aria-live="polite"
          className={styles.pages}
          aria-label={`Rows from ${offset + 1} to ${Math.min(
            offset + limit,
            total
          )} of ${total}`}
        >
          {offset + 1}&ndash;{Math.min(offset + limit, total)} of {total}
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
