import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";
import styles from "./Select.module.css";

describe("Select", () => {
  const options = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
  ];

  it("toggles dropdown visibility and handles single selection", async () => {
    const user = userEvent.setup();
    const handleChoose = vi.fn();

    render(
      <Select options={options} multiselect={false} onChoose={handleChoose}>
        Choose option
      </Select>
    );

    const trigger = screen.getByRole("button", { name: /choose option/i });
    const dropdown = trigger.parentElement?.querySelector(
      `.${styles.dropdown}`
    ) as HTMLDivElement;

    expect(dropdown.className).not.toContain(styles.dropdownOpened);

    await user.click(trigger);
    expect(dropdown.className).toContain(styles.dropdownOpened);

    const optionTwo = screen.getByLabelText("Two") as HTMLInputElement;
    await user.click(screen.getByText("Two", { selector: "label" }));

    expect(handleChoose).toHaveBeenCalledWith("two");
    expect(optionTwo.checked).toBe(true);
    expect(dropdown.className).not.toContain(styles.dropdownOpened);
  });

  it("supports multiselect and keeps dropdown open", async () => {
    const user = userEvent.setup();
    const handleChoose = vi.fn();

    render(
      <Select options={options} multiselect onChoose={handleChoose}>
        Multi select
      </Select>
    );

    const trigger = screen.getByRole("button", { name: /multi select/i });
    const dropdown = trigger.parentElement?.querySelector(
      `.${styles.dropdown}`
    ) as HTMLDivElement;

    await user.click(trigger);
    expect(dropdown.className).toContain(styles.dropdownOpened);

    const optionOne = screen.getByLabelText("One") as HTMLInputElement;
    const optionTwo = screen.getByLabelText("Two") as HTMLInputElement;

    await user.click(screen.getByText("One", { selector: "label" }));
    await user.click(screen.getByText("Two", { selector: "label" }));

    expect(optionOne.checked).toBe(true);
    expect(optionTwo.checked).toBe(true);
    expect(handleChoose).toHaveBeenCalledTimes(2);
    expect(handleChoose).toHaveBeenLastCalledWith(["one", "two"]);
    expect(dropdown.className).toContain(styles.dropdownOpened);
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Select options={options} multiselect={false} onChoose={vi.fn()}>
          Choice
        </Select>
        <button type="button">Outside</button>
      </div>
    );

    const trigger = screen.getByRole("button", { name: /choice/i });
    const dropdown = trigger.parentElement?.querySelector(
      `.${styles.dropdown}`
    ) as HTMLDivElement;

    await user.click(trigger);
    expect(dropdown.className).toContain(styles.dropdownOpened);

    const outside = screen.getByRole("button", { name: "Outside" });
    await user.click(outside);

    expect(dropdown.className).not.toContain(styles.dropdownOpened);
  });
});
