import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the specified heading level", () => {
    render(
      <Heading mode="h2" className="custom-class">
        Section Title
      </Heading>
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Section Title",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("custom-class");
  });

  it("defaults to h1 when mode is not provided", () => {
    render(<Heading mode="h1">Main Title</Heading>);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Main Title",
    });
    expect(heading).toBeInTheDocument();
  });
});
