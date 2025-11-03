import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTableRow } from "./DataTableRow";
import styles from "./DataTableRow.module.css";

describe("DataTableRow", () => {
  it("renders table row with provided children", () => {
    render(
      <table>
        <tbody>
          <DataTableRow>
            <td>Cell</td>
          </DataTableRow>
        </tbody>
      </table>
    );

    const row = screen.getByText("Cell").closest("tr");
    expect(row).toBeInTheDocument();
    expect(row?.className).toContain(styles.dataTableRow);
  });
});
