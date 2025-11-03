import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChevronLeftIcon } from "./ChevronLeftIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import { DropdownIcon } from "./DropdownIcon";
import { FilterIcon } from "./FilterIcon";
import { VerticalArrowIcon } from "./VerticalArrowIcon";

describe("Icons", () => {
  const icons = [
    { name: "chevron-left", Component: ChevronLeftIcon },
    { name: "chevron-right", Component: ChevronRightIcon },
    { name: "dropdown", Component: DropdownIcon },
    { name: "filter", Component: FilterIcon },
    { name: "vertical-arrow", Component: VerticalArrowIcon },
  ];

  it.each(icons)("renders %s icon", ({ name, Component }) => {
    render(<Component data-testid={`icon-${name}`} />);

    const icon = screen.getByTestId(`icon-${name}`);
    expect(icon.tagName.toLowerCase()).toBe("svg");
  });
});
