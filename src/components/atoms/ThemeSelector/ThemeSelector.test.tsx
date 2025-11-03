import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeSelector } from "./ThemeSelector";

describe("ThemeSelector", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("initialises from localStorage and toggles theme", async () => {
    localStorage.setItem("theme", "dark");

    const user = userEvent.setup();
    render(<ThemeSelector />);

    expect(await screen.findByText("Dark mode")).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /theme/i });
    await user.click(trigger);

    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(await screen.findByText("Light mode")).toBeInTheDocument();
  });
});
