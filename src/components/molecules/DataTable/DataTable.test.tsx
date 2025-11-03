import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  const headers = [
    { id: "id", field: "id", label: "ID" },
    { id: "name", field: "name", label: "Name", sortable: true },
    { id: "section", field: "section", label: "Section" },
  ];

  const rows = [
    { id: "1", name: "Banana", section: "Fruit" },
    { id: "2", name: "Apple", section: "Fruit" },
  ];

  it("renders caption, headers and rows", () => {
    render(
      <DataTable
        caption="Inventory"
        headers={headers}
        rows={rows}
        total={rows.length}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("notifies parent when sorting or paginating", async () => {
    const user = userEvent.setup();
    const onLoadData = vi.fn();

    render(
      <DataTable
        caption="Inventory"
        headers={headers}
        rows={rows}
        total={50}
        onLoadData={onLoadData}
      />
    );

    await waitFor(() => {
      expect(onLoadData).toHaveBeenCalled();
    });
    expect(onLoadData.mock.calls[0]).toEqual([0, 25, null, "asc"]);

    const sortButton = screen.getByRole("button", { name: /Name/ });
    await user.click(sortButton);

    await waitFor(() => {
      const lastCall = onLoadData.mock.calls.at(-1);
      expect(lastCall).toEqual([0, 25, "name", "asc"]);
    });

    await user.click(sortButton);

    await waitFor(() => {
      const lastCall = onLoadData.mock.calls.at(-1);
      expect(lastCall).toEqual([0, 25, "name", "desc"]);
    });

    const nextButton = screen.getByRole("button", { name: "Next page" });
    await user.click(nextButton);

    await waitFor(() => {
      const lastCall = onLoadData.mock.calls.at(-1);
      expect(lastCall).toEqual([25, 25, "name", "desc"]);
    });
  });
});
