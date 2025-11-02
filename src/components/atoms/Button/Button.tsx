import { type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";
import styles from "./Button.module.css";

export interface ButtonProps extends ComponentProps<"button"> {
  mode?: "primary" | "transparent";
  before?: ReactNode;
  after?: ReactNode;
}

/** Primary UI component for user interaction */
export const Button = ({
  mode = "primary",
  type = "button",
  before,
  after,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[mode], className)}
      {...props}
    >
      {before && <div className={styles.before}>{before}</div>}
      <div>{children}</div>
      {after && <div className={styles.after}>{after}</div>}
    </button>
  );
};
