import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PaginationText from "./PaginationText";
import PaginationButtons from "./PaginationButtons";

describe("Pagination Components", () => {
  const defaultProps = {
    onFirstPageClick: vi.fn(),
    onLastPageClick: vi.fn(),
    onNextPageClick: vi.fn(),
    onPreviousPageClick: vi.fn(),
    onPageClick: vi.fn(),
    getCanPreviousPage: true,
    getCanNextPage: true,
    pageCount: 10,
    pageIndex: 2,
  };

  it("renders correct pagination text for a non-zero page count", () => {
    render(<PaginationText pageIndex={1} pageCount={10} />);
    expect(screen.getByText("Showing 2 of 10")).toBeInTheDocument();
  });

  it("renders 'Showing 0 of 0' when pageCount is 0", () => {
    render(<PaginationText pageIndex={0} pageCount={0} />);
    expect(screen.getByText("Showing 0 of 0")).toBeInTheDocument();
  });

  it("renders pagination buttons correctly", () => {
    render(<PaginationButtons {...defaultProps} />);
    expect(screen.getByLabelText("Go to First Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to Last Page")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables first and previous buttons on the first page", () => {
    render(
      <PaginationButtons
        {...defaultProps}
        pageIndex={0}
        getCanPreviousPage={false}
      />
    );
    expect(screen.getByLabelText("Go to First Page")).toBeDisabled();
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables next and last buttons on the last page", () => {
    render(
      <PaginationButtons
        {...defaultProps}
        pageIndex={9}
        getCanNextPage={false}
      />
    );
    expect(screen.getByLabelText("Go to Last Page")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onFirstPageClick when the first page button is clicked", () => {
    render(<PaginationButtons {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Go to First Page"));
    expect(defaultProps.onFirstPageClick).toHaveBeenCalled();
  });

  it("calls onPreviousPageClick when the previous button is clicked", () => {
    render(<PaginationButtons {...defaultProps} />);
    const leftCaretIcon = screen.getByLabelText("Go To Previous Page");
    fireEvent.click(leftCaretIcon);
    expect(defaultProps.onPreviousPageClick).toHaveBeenCalled();
  });

  it("calls onNextPageClick when the next button is clicked", () => {
    render(<PaginationButtons {...defaultProps} />);
    const rightCaretIcon = screen.getByLabelText("Go To Next Page");
    fireEvent.click(rightCaretIcon);
    expect(defaultProps.onNextPageClick).toHaveBeenCalled();
  });

  it("calls onLastPageClick when the last page button is clicked", () => {
    render(<PaginationButtons {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Go to Last Page"));
    expect(defaultProps.onLastPageClick).toHaveBeenCalled();
  });

  it("renders the correct page numbers", () => {
    render(<PaginationButtons {...defaultProps} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onPageClick with correct page index when a page number is clicked", () => {
    render(<PaginationButtons {...defaultProps} />);
    fireEvent.click(screen.getByText("5"));
    expect(defaultProps.onPageClick).toHaveBeenCalledWith(4);
  });
});
