import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./DataTableHeader.module.css";
import type { DataTableHeaderType } from "../types";
import { Button } from "../../../atoms/Button/Button";
import { VerticalArrowIcon } from "../../../atoms/Icons/VerticalArrowIcon";
import { motion } from "framer-motion";

export type DataTableHeaderProps = ComponentProps<"th"> &
  DataTableHeaderType & {
    sorted?: boolean;
    order?: "asc" | "desc";
    onSort?: () => void;
  };

export const DataTableHeader = ({
  sortable,
  sorted,
  order,
  onSort,
  children,
  ...props
}: DataTableHeaderProps) => {
  return (
    <th className={clsx(styles.dataTableHeader, props.className)} {...props}>
      {sortable ? (
        <div className={styles.dataTableHeaderSortableWrapper}>
          <Button
            mode="transparent"
            className={styles.dataTableHeaderSortable}
            before={
              sorted && (
                <motion.div
                  style={{ perspective: "1000px" }}
                  animate={{
                    rotateX: order === "asc" ? 180 : 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <VerticalArrowIcon />
                </motion.div>
              )
            }
            onClick={onSort}
          >
            {children}
          </Button>
        </div>
      ) : (
        children
      )}
    </th>
  );
};
