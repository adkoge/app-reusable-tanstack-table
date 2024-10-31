import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderGroup, Header, Column } from "@tanstack/react-table";
import TableHeader from ".";
import { TableHeaderProps } from "../../../types/react-table";

interface TData {
  id: number;
  name: string;
}

type TValue = string | number;

const mockHeaderGroups: HeaderGroup<TData>[] = [
  {
    id: "group1",
    headers: [
      {
        id: "header1",
        colSpan: 1,
        depth: 1,
        headerGroup: {} as HeaderGroup<TData>,
        index: 0,
        isPlaceholder: false,
        rowSpan: 1,
        subHeaders: [],
        column: {
          getSize: vi.fn().mockReturnValue("100px"),
          getCanSort: vi.fn().mockReturnValue(true),
          getIsSorted: vi.fn().mockReturnValue("asc"),
          getToggleSortingHandler: vi.fn(),
          columnDef: {
            header: "Department",
            meta: {
              flexJustify: "center",
              textAlign: "center",
            },
          },
        } as Partial<Column<TData, TValue>>,
        getContext: vi.fn(),
        getLeafHeaders: vi.fn().mockReturnValue([]),
        getResizeHandler: vi.fn(),
        getSize: vi.fn(),
        getStart: vi.fn(),
      } as Header<TData, TValue>,
      {
        id: "header2",
        colSpan: 1,
        depth: 1,
        headerGroup: {} as HeaderGroup<TData>,
        index: 1,
        isPlaceholder: false,
        rowSpan: 1,
        subHeaders: [],
        column: {
          getSize: vi.fn().mockReturnValue("200px"),
          getCanSort: vi.fn().mockReturnValue(false),
          getIsSorted: vi.fn().mockReturnValue(false),
          getToggleSortingHandler: vi.fn(),
          columnDef: {
            header: "Job Title",
          },
        } as Partial<Column<TData, TValue>>,
        getContext: vi.fn(),
        getLeafHeaders: vi.fn().mockReturnValue([]),
        getResizeHandler: vi.fn(),
        getSize: vi.fn(),
        getStart: vi.fn(),
      } as Header<TData, TValue>,
    ],
    depth: 1,
  },
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

    const header1 = screen.getByText("Department");
    const header2 = screen.getByText("Job Title");

    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();

    const sortIconAsc = screen.getByLabelText("Arrow Up Icon");
    expect(sortIconAsc).toBeInTheDocument();
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

  it("calls the sorting handler on clickable headers", () => {
    renderComponent();
    const header1 = screen.getByText("Department");

    fireEvent.click(header1);
    expect(
      mockHeaderGroups[0].headers[0].column.getToggleSortingHandler
    ).toHaveBeenCalled();
  });

  it("applies 'cursor-pointer select-none' classes for sortable headers", () => {
    mockHeaderGroups[0].headers[0].column.getCanSort = vi
      .fn()
      .mockReturnValue(true);
    renderComponent();

    const header1 = screen
      .getByText("Department")
      .parentElement?.querySelector("div");
    expect(header1).toHaveClass("cursor-pointer select-none");
  });

  it("does not apply 'cursor-pointer select-none' classes for non-sortable headers", () => {
    mockHeaderGroups[0].headers[1].column.getCanSort = vi
      .fn()
      .mockReturnValue(false);
    renderComponent();

    const header2 = screen
      .getByText("Job Title")
      .parentElement?.querySelector("div");
    expect(header2).not.toHaveClass("cursor-pointer select-none");
  });

  it("applies 'flex-start' and 'left' alignment styles for flexJustify and textAlign", () => {
    mockHeaderGroups[0].headers[0].column.columnDef.meta = {
      flexJustify: "start",
      textAlign: "left",
    };
    renderComponent();

    const header1 = screen
      .getByText("Department")
      .parentElement?.querySelector("div");
    expect(header1).toHaveStyle("justify-content: start");
    expect(header1).toHaveStyle("text-align: left");
  });

  it("applies 'flex-end' and 'right' alignment styles for flexJustify and textAlign", () => {
    mockHeaderGroups[0].headers[0].column.columnDef.meta = {
      flexJustify: "end",
      textAlign: "right",
    };
    renderComponent();

    const header1 = screen
      .getByText("Department")
      .parentElement?.querySelector("div");
    expect(header1).toHaveStyle("justify-content: end");
    expect(header1).toHaveStyle("text-align: right");
  });

  it("renders without errors when headerGroups is empty", () => {
    render(
      <table>
        <TableHeader headerGroups={[]} />
      </table>
    );
    const tableHead = screen.getByRole("rowgroup");
    expect(tableHead).toBeInTheDocument();
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
