import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTableCell } from "./DataTableCell";
import styles from "./DataTableCell.module.css";

describe("DataTableCell", () => {
  const setup = (type?: "string" | "number") =>
    render(
      <table>
        <tbody>
          <tr>
            <DataTableCell type={type}>42</DataTableCell>
          </tr>
        </tbody>
      </table>
    );

  it("uses string styling by default", () => {
    setup();

    const cell = screen.getByText("42");
    expect(cell).toBeInTheDocument();
    expect(cell.className).toContain(styles.stringType);
  });

  it("applies number styling", () => {
    setup("number");

    const cell = screen.getByText("42");
    expect(cell.className).toContain(styles.numberType);
  });
});
