import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./DataTableCell.module.css";

export interface DataTableCellProps extends ComponentProps<"td"> {
  type?: "string" | "number";
}

export const DataTableCell = ({
  type = "string",
  children,
  ...props
}: DataTableCellProps) => {
  return (
    <td
      className={clsx(
        styles.dataTableCell,
        styles[`${type}Type`],
        props.className
      )}
      {...props}
    >
      {children}
    </td>
  );
};
