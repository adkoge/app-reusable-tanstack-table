import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from ".";

describe("Search Component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input with the correct placeholder", () => {
    render(<Search value="" onChange={mockOnChange} debounce={200} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("updates the input value on user input", () => {
    render(<Search value="" onChange={mockOnChange} debounce={200} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  it("calls onChange with the debounced value", async () => {
    render(<Search value="" onChange={mockOnChange} debounce={200} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "debounce" } });

    await new Promise((r) => setTimeout(r, 200));
    expect(mockOnChange).toHaveBeenCalledWith("debounce");
  });

  it("does not call onChange immediately on typing", () => {
    render(<Search value="" onChange={mockOnChange} debounce={200} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "quick" } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
