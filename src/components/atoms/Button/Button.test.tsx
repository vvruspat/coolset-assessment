import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import styles from "./Button.module.css";

describe("Button", () => {
  it("applies default mode styles", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain(styles.button);
    expect(button.className).toContain(styles.primary);
  });

  it("renders before and after content", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button
        mode="transparent"
        before={<span>Before</span>}
        after={<span>After</span>}
        onClick={handleClick}
      >
        Action
      </Button>
    );

    const button = screen.getByRole("button", { name: /Action/ });
    expect(button.className).toContain(styles.transparent);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
