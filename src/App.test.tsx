import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders BaseTable component by default (v1)", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "Table v1",
      })
    ).toBeInTheDocument();
  });

  it("switches to V2 Table when 'Version 2' button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Version 2"));
    expect(screen.getByText("My Table View")).toBeInTheDocument();
  });

  it("switches back to BaseTable (version v1) when 'Version 1' button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Version 2"));
    fireEvent.click(screen.getByText("Version 1"));
    expect(
      screen.getByRole("heading", {
        name: "Table v1",
      })
    ).toBeInTheDocument();
  });

  it("applies correct styling to buttons", () => {
    render(<App />);
    const version1Button = screen.getByText("Version 1");
    const version2Button = screen.getByText("Version 2");

    expect(version1Button).toHaveClass("bg-blue-500 text-white");
    expect(version2Button).toHaveClass("bg-green-500 text-white");
  });
});
