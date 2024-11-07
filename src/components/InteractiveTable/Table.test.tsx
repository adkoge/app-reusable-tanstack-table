import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Cell, Column, Row, RowModel, Table } from "@tanstack/react-table";
import TableLayout from "./Views/TableView";
import { TableProps } from "../../types/react-table";

interface TData {
  id: number;
  name: string;
}

const MockTableSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <input
    data-testid="table-search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const createMockColumn = (id: string, header: string, cellValue: string) =>
  ({
    id,
    columnDef: {
      accessorKey: id,
      header,
      cell: cellValue,
      meta: {
        flexJustify: "center",
        textAlign: "center",
      },
    },
    columns: [],
    depth: 0,
    getFlatColumns: vi.fn(),
    getLeafColumns: vi.fn(),
    getParentColumn: vi.fn(),
    getSize: vi.fn().mockReturnValue("100px"),
    getCanSort: vi.fn().mockReturnValue(false),
    getIsSorted: vi.fn().mockReturnValue(false),
    getToggleSortingHandler: vi.fn(),
    getToggleGroupingProps: vi.fn(),
    getVisibleLeafColumns: vi.fn(),
  } as Partial<Column<TData, unknown>>);

const mockColumns = [
  createMockColumn("department", "Department", "Cell value 1"),
  createMockColumn("jobTitle", "Job Title", "Cell value 2"),
  createMockColumn("location", "Location", "Cell value 3"),
];

const mockRow: Partial<Row<TData>> = {
  id: "row1",
  index: 0,
  depth: 0,
  getValue: vi.fn(),
  getAllCells: vi.fn(() => []),
  getVisibleCells: vi.fn(
    () =>
      mockColumns.map((column) => ({
        id: column.id,
        column,
        getValue: () => column.columnDef?.cell,
        renderValue: () => column.columnDef?.cell,
        row: {} as Row<TData>,
        getContext: vi.fn(),
        getIsAggregated: vi.fn(() => false),
        getIsGrouped: vi.fn(() => false),
        getIsPlaceholder: vi.fn(() => false),
      })) as Cell<TData, unknown>[]
  ),
  getLeafRows: vi.fn(() => []),
  getParentRow: vi.fn(() => undefined),
  getIsSelected: vi.fn(() => false),
  getIsGrouped: vi.fn(() => false),
  getIsExpanded: vi.fn(() => false),
  toggleSelected: vi.fn(),
  toggleExpanded: vi.fn(),
};

const mockRowModel: RowModel<TData> = {
  rows: [mockRow as Row<TData>],
  flatRows: [],
  rowsById: {},
};

const mockTable: Partial<Table<TData>> = {
  getState: vi.fn(() => ({
    globalFilter: "",
    pagination: { pageIndex: 0, pageSize: 10 },
    columnVisibility: {},
    columnOrder: [],
    columnPinning: {},
    rowPinning: {},
    columnFilters: [],
    sorting: [],
    grouping: [],
    expanded: {},
    columnSizing: {},
    columnSizingInfo: {
      startOffset: 0,
      startSize: 0,
      deltaOffset: 0,
      deltaPercentage: 0,
      isResizingColumn: "",
      columnWidths: {},
      columnSizingStart: [] as [string, number][],
    },
    rowSelection: {},
  })),
  getHeaderGroups: vi.fn(() => [
    {
      depth: 1,
      id: "headerGroup1",
      headers: [],
    },
  ]),
  getRowModel: vi.fn(() => mockRowModel),
  setPageIndex: vi.fn(),
  nextPage: vi.fn(),
  previousPage: vi.fn(),
  getCanNextPage: vi.fn(() => true),
  getCanPreviousPage: vi.fn(() => true),
  _features: [],
};

const defaultProps: TableProps<TData> = {
  countTitle: "items",
  count: 0,
  countKey: "id",
  globalFilter: "",
  icon: null,
  filteredRowCount: 1,
  footerInfo: { link: "/link", text: "Footer Link" },
  handleColumnFilterChange: vi.fn(),
  handleGlobalFilterChange: vi.fn(),
  paginationConfig: { pageIndex: 0, pageCount: 10 },
  selectConfig: {
    handleSelectChange: () => {},
    selectedOption: { label: "", value: "" },
    selectOptions: [{ label: "Option 1", value: "1" }],
    selectPlaceholder: "Filter",
    showSelect: true,
  },
  table: mockTable as Table<TData>,
  TableSearch: MockTableSearch,
  title: "Table Title",
  enableSearch: true,
  viewLevel: "table",
  tableView: "list",
};

describe("TableLayout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByText("Table Title")).toBeInTheDocument();
  });

  it("renders the search input when enableSearch is true", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByTestId("table-search")).toBeInTheDocument();
  });

  it("does not render the search input when enableSearch is false", () => {
    render(<TableLayout {...defaultProps} enableSearch={false} />);
    expect(screen.queryByTestId("table-search")).toBeNull();
  });

  it("renders the filter select when selectConfig.showSelect is true", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("does not render the filter select when selectConfig.showSelect is false", () => {
    render(
      <TableLayout
        {...defaultProps}
        selectConfig={{ ...defaultProps.selectConfig, showSelect: false }}
      />
    );
    expect(screen.queryByText("Filter")).toBeNull();
  });

  it("renders table rows based on row data", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByText("Cell value 1")).toBeInTheDocument();
    expect(screen.getByText("Cell value 2")).toBeInTheDocument();
  });

  it("renders footer text with correct link", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByText("Footer Link")).toBeInTheDocument();
    expect(screen.getByText("Footer Link").closest("a")).toHaveAttribute(
      "href",
      "/link"
    );
  });

  it("calls handleGlobalFilterChange on search input change", () => {
    render(<TableLayout {...defaultProps} />);
    fireEvent.change(screen.getByTestId("table-search"), {
      target: { value: "search" },
    });
    expect(defaultProps.handleGlobalFilterChange).toHaveBeenCalledWith(
      "search"
    );
  });

  it("renders pagination text correctly", () => {
    render(<TableLayout {...defaultProps} />);
    expect(screen.getByText("Showing 1 of 10")).toBeInTheDocument();
  });

  it("handles pagination button clicks", () => {
    render(<TableLayout {...defaultProps} />);
    const rightCaretIcon = screen.getByLabelText("Go To Next Page");
    fireEvent.click(rightCaretIcon);
    expect(mockTable.nextPage).toHaveBeenCalled();
    const leftCaretIcon = screen.getByLabelText("Go To Previous Page");
    fireEvent.click(leftCaretIcon);
    expect(mockTable.previousPage).toHaveBeenCalled();
  });

  it("renders filtered row count with correct countTitle", () => {
    render(<TableLayout {...defaultProps} filteredRowCount={3} />);
    expect(screen.getByText("3 items")).toBeInTheDocument();
  });
});
