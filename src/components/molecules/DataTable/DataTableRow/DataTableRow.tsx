import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./DataTableRow.module.css";

export type DataTableRowProps = ComponentProps<"tr">;

export const DataTableRow = ({ children, ...props }: DataTableRowProps) => {
  return (
    <tr className={clsx(styles.dataTableRow, props.className)} {...props}>
      {children}
    </tr>
  );
};
