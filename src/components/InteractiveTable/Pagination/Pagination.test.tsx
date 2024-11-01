import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PaginationText from "./PaginationText";

describe("Pagination Components", () => {

  it("renders correct pagination text for a non-zero page count", () => {
    render(<PaginationText pageIndex={1} pageCount={10} />);
    expect(screen.getByText("Showing 2 of 10")).toBeInTheDocument();
  });

  it("renders 'Showing 0 of 0' when pageCount is 0", () => {
    render(<PaginationText pageIndex={0} pageCount={0} />);
    expect(screen.getByText("Showing 0 of 0")).toBeInTheDocument();
});
