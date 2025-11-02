import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import styles from "./DataTableCaption.module.css";

export interface DataTableCaptionProps extends ComponentProps<"caption"> {
  before?: ReactNode;
  after?: ReactNode;
}

export const DataTableCaption = ({
  children,
  before,
  after,
  className,
  ...restProps
}: DataTableCaptionProps) => {
  return (
    <caption
      className={clsx(styles.dataTableCaption, className)}
      {...restProps}
    >
      <div className={styles.dataTableCaptionContainer}>
        {before && <div>{before}</div>}
        <div className={styles.dataTableCaptionContent}>{children}</div>
        {after && <div>{after}</div>}
      </div>
    </caption>
  );
};
