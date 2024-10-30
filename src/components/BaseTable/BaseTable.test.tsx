import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from ".";

describe("Table Component", () => {
  it("renders the table structure correctly", () => {
    render(<Table />);

    const columnHeaders = screen.getAllByRole("columnheader");

    expect(columnHeaders.some((header) => header.textContent === "Age")).toBe(
      true
    );
    expect(
      columnHeaders.some((header) => header.textContent === "First Name")
    ).toBe(true);
    expect(
      columnHeaders.some((header) => header.textContent === "Last Name")
    ).toBe(true);
    expect(screen.getByText("tanner")).toBeInTheDocument();
    expect(screen.getByText("linsley")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("renders data rows correctly", () => {
    render(<Table />);

    const firstRowFirstName = screen.getByText("tanner");
    const secondRowLastName = screen.getByText("miller");

    expect(firstRowFirstName).toBeInTheDocument();
    expect(secondRowLastName).toBeInTheDocument();
  });

  it("renders footer content correctly", () => {
    render(<Table />);
    const ageFooter = screen.getByText("age");
    expect(ageFooter).toBeInTheDocument();
  });

  it("re-renders when the button is clicked", () => {
    render(<Table />);
    const rerenderButton = screen.getByRole("button", { name: /Re-render/i });
    fireEvent.click(rerenderButton);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
