import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTableCaption } from "./DataTableCaption";
import styles from "./DataTableCaption.module.css";

describe("DataTableCaption", () => {
  it("renders caption with optional before and after content", () => {
    render(
      <table>
        <DataTableCaption
          before={<span>Before</span>}
          after={<span>After</span>}
        >
          Summary
        </DataTableCaption>
      </table>
    );

    const caption = screen.getByText("Summary").closest("caption");
    expect(caption).toBeInTheDocument();
    expect(caption?.className).toContain(styles.dataTableCaption);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });
});
