import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Table from "./index";

describe("Table Component", () => {
  it("renders ViewMode and TotalEmployeesTable components", () => {
    render(<Table />);

    expect(screen.getByText("My View")).toBeInTheDocument();
    expect(screen.getByText("Admin View")).toBeInTheDocument();
    expect(screen.getByText("Company View")).toBeInTheDocument();
    expect(screen.getByText(/Total Employees/)).toBeInTheDocument();
  });

  it("initially sets the view level to 'My View'", () => {
    render(<Table />);

    const myViewButton = screen.getByText("My View");
    expect(myViewButton).toHaveClass("bg-blue-600 text-white");
  });

  it("changes the view level when a different view button is clicked", () => {
    render(<Table />);

    const adminViewButton = screen.getByText("Admin View");

    fireEvent.click(adminViewButton);

    expect(adminViewButton).toHaveClass("bg-blue-600 text-white");

    const myViewButton = screen.getByText("My View");
    expect(myViewButton).toHaveClass("bg-white border-gray-300");
  });

  it("passes the updated view level to TotalEmployeesTable", () => {
    render(<Table />);

    const adminViewButton = screen.getByText("Admin View");

    fireEvent.click(adminViewButton);

    expect(screen.getByText("Admin Table View")).toBeInTheDocument();
  });
});
