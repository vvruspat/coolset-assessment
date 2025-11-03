import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTableHeader } from "./DataTableHeader";
import styles from "./DataTableHeader.module.css";

describe("DataTableHeader", () => {
  const renderHeader = (
    props: Partial<Parameters<typeof DataTableHeader>[0]>
  ) =>
    render(
      <table>
        <thead>
          <tr>
            <DataTableHeader
              field="name"
              label="Name"
              sortable={false}
              {...props}
            >
              Name
            </DataTableHeader>
          </tr>
        </thead>
      </table>
    );

  it("renders a static header when not sortable", () => {
    renderHeader({ sortable: false });

    const header = screen.getByText("Name");
    expect(header.tagName.toLowerCase()).toBe("th");
    expect(header.className).toContain(styles.dataTableHeader);
    expect(screen.queryByRole("button", { name: "Name" })).toBeNull();
  });

  it("calls onSort when sortable header is clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    renderHeader({ sortable: true, onSort });

    const button = screen.getByRole("button", { name: "Name" });
    await user.click(button);

    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it("shows sort indicator when sorted", () => {
    renderHeader({ sortable: true, sorted: true, order: "asc" });

    const button = screen.getByRole("button", { name: "Name" });
    expect(button.querySelector("svg")).not.toBeNull();
  });
});
