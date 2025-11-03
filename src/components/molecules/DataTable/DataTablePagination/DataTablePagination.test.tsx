import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTablePagination } from "./DataTablePagination";

describe("DataTablePagination", () => {
  const baseProps = {
    total: 100,
    limit: 25,
    offset: 0,
    onNextPage: vi.fn(),
    onPreviousPage: vi.fn(),
    onRowsPerPageChange: vi.fn(),
  } satisfies Parameters<typeof DataTablePagination>[0];

  it("announces the current range", () => {
    render(<DataTablePagination {...baseProps} offset={50} />);

    expect(screen.getByText("51–75 of 100")).toBeInTheDocument();
  });

  it("disables navigation buttons when at boundaries", () => {
    const { rerender } = render(
      <DataTablePagination {...baseProps} offset={0} total={50} limit={25} />
    );

    expect(
      screen.getByRole("button", { name: "Previous page" })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next page" })
    ).not.toBeDisabled();

    rerender(
      <DataTablePagination {...baseProps} offset={25} total={50} limit={25} />
    );

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("triggers callbacks when navigating and changing page size", async () => {
    const user = userEvent.setup();
    const onNextPage = vi.fn();
    const onPreviousPage = vi.fn();
    const onRowsPerPageChange = vi.fn();

    render(
      <DataTablePagination
        total={200}
        limit={25}
        offset={50}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onNextPage).toHaveBeenCalledWith(75, 25);

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPreviousPage).toHaveBeenCalledWith(25, 25);

    const rowsPerPageTrigger = screen.getByRole("button", {
      name: /rows per page/i,
    });
    await user.click(rowsPerPageTrigger);
    await user.click(screen.getByText("50", { selector: "label" }));

    expect(onRowsPerPageChange).toHaveBeenCalledWith(50);
  });
});
