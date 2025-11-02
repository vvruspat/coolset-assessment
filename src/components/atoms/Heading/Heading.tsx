import clsx from "clsx";
import { type ComponentProps, createElement } from "react";
import styles from "./Heading.module.css";

type HeadingProps = ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> & {
  mode: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading = ({
  children,
  mode = "h1",
  className,
  ...restProps
}: HeadingProps) => {
  const Component = createElement(
    mode,
    { className: clsx(styles.heading, className), ...restProps },
    children
  );

  return Component;
};

export default Heading;
