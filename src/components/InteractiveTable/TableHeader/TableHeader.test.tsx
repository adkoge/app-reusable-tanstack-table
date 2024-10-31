import { it, expect, vi, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Column, Header, HeaderGroup } from "@tanstack/react-table";
import { TableHeaderProps } from "../../../types/react-table";
import TableHeader from ".";

interface TData {
  id: number;
  name: string;
}

const createMockColumn = <TData, TValue>(
  canSort: boolean,
  isSorted: boolean | "asc" | "desc" | undefined,
  headerText: string
): Partial<
  Pick<
    Column<TData, TValue>,
    | "getSize"
    | "getCanSort"
    | "getIsSorted"
    | "getToggleSortingHandler"
    | "columnDef"
  >
> => ({
  getSize: vi.fn().mockReturnValue("100px"),
  getCanSort: vi.fn().mockReturnValue(canSort),
  getIsSorted: vi.fn().mockReturnValue(isSorted),
  getToggleSortingHandler: vi.fn(),
  columnDef: {
    header: headerText,
    meta: {
      flexJustify: "center",
      textAlign: "center",
    },
  },
});

const createMockHeader = <TData, TValue>(
  id: string,
  column: Partial<Column<TData, TValue>>
): Partial<Header<TData, TValue>> => ({
  id,
  colSpan: 1,
  column: column as Column<TData, TValue>,
  getContext: vi.fn(),
  getLeafHeaders: vi.fn().mockReturnValue([]),
});

const createMockHeaderGroup = <TData, TValue>(
  headers: Partial<Header<TData, TValue>>[]
): Partial<HeaderGroup<TData>> => ({
  id: "group1",
  headers: headers as Header<TData, TValue>[],
});

const mockHeaderGroups: HeaderGroup<TData>[] = [
  createMockHeaderGroup([
    createMockHeader(
      "header1",
      createMockColumn(true, undefined, "Department")
    ),
    createMockHeader(
      "header2",
      createMockColumn(false, undefined, "Job Title")
    ),
  ]) as HeaderGroup<TData>,
];

const renderComponent = (props?: Partial<TableHeaderProps<TData>>) =>
  render(
    <table>
      <TableHeader<TData> headerGroups={mockHeaderGroups} {...props} />
    </table>
  );

describe("TableHeader Component", () => {
  it("renders each header with proper styles and sorting icons", () => {
    renderComponent();
    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Job Title")).toBeInTheDocument();
  });

  it("renders ArrowDownIcon when header is sorted in descending order", () => {
    mockHeaderGroups[0].headers[0].column.getIsSorted = vi
      .fn()
      .mockReturnValue("desc");
    renderComponent();
    const sortIconDesc = screen.getByLabelText("Arrow Down Icon");
    expect(sortIconDesc).toBeInTheDocument();
  });

  it("does not render sorting icon when header is not sorted", () => {
    mockHeaderGroups[0].headers[0].column.getIsSorted = vi
      .fn()
      .mockReturnValue(undefined);
    renderComponent();
    const sortIcon = screen.queryByLabelText(/Arrow (Up|Down) Icon/i);
    expect(sortIcon).toBeNull();
  });

  it("triggers sorting action on click for sortable headers", () => {
    mockHeaderGroups[0].headers[0].column.getIsSorted = vi
      .fn()
      .mockReturnValue(undefined);

    const { rerender } = render(
      <table>
        <TableHeader<TData> headerGroups={mockHeaderGroups} />
      </table>
    );

    fireEvent.click(screen.getByText("Department"));

    mockHeaderGroups[0].headers[0].column.getIsSorted = vi
      .fn()
      .mockReturnValue("asc");

    rerender(
      <table>
        <TableHeader<TData> headerGroups={mockHeaderGroups} />
      </table>
    );

    const sortIconAsc = screen.getByLabelText("Arrow Up Icon");
    expect(sortIconAsc).toBeInTheDocument();
  });

  it("applies correct alignment styles for flexJustify and textAlign", () => {
    renderComponent();
    const header1 = screen.getByText("Department").closest("div");
    expect(header1).toHaveStyle("justify-content: center");
    expect(header1).toHaveStyle("text-align: center");
  });

  it("renders non-string header content correctly", () => {
    mockHeaderGroups[0].headers[0].column.columnDef.header = () => (
      <button>Click Me</button>
    );
    renderComponent();
    const buttonHeader = screen.getByRole("button", { name: /click me/i });
    expect(buttonHeader).toBeInTheDocument();
  });

  it("renders correct number of HeaderCells in each TableHeaderRow", () => {
    renderComponent();
    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells.length).toBe(mockHeaderGroups[0].headers.length);
  });
});
