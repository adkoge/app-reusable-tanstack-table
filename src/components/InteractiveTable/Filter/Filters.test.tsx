import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import TableFilter from ".";
import { Option } from "../../../types/react-table";

describe("TableFilter Component", () => {
  const mockOptions: Option[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const defaultProps = {
    selectedOption: null,
    selectOptions: mockOptions,
    selectPlaceholder: "Select an option",
    handleColumnFilterChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the select with placeholder text", () => {
    render(<TableFilter {...defaultProps} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("displays options from selectOptions correctly", () => {
    render(<TableFilter {...defaultProps} />);
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls handleColumnFilterChange with selected option on change", () => {
    render(<TableFilter {...defaultProps} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
    expect(defaultProps.handleColumnFilterChange).toHaveBeenCalledWith({
      label: "Option 2",
      value: "2",
    });
  });

  it("calls handleColumnFilterChange with null when cleared", () => {
    render(<TableFilter {...defaultProps} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });
    expect(defaultProps.handleColumnFilterChange).toHaveBeenCalledWith(null);
  });

  it("selects the correct option when selectedOption is provided", () => {
    render(
      <TableFilter
        {...defaultProps}
        selectedOption={{ label: "Option 2", value: "2" }}
      />
    );
    expect(screen.getByRole("combobox")).toHaveValue("2");
  });
});
