import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Row, Cell, CellContext, Column } from "@tanstack/react-table";
import TableRow from ".";
import { TableRowProps } from "../../../types/react-table";

interface TData {
  id: number;
  name: string;
}

const createMockColumn = <TData, TValue>(
  id: string,
  textAlign: "left" | "right" | "center",
  width: string
): Partial<Pick<Column<TData, TValue>, "id" | "getSize" | "columnDef">> => ({
  id,
  getSize: vi.fn().mockReturnValue(width),
  columnDef: {
    header: "Column Header",
    meta: { textAlign },
    cell: (info: CellContext<TData, TValue>) => info.getValue(),
  },
});

const createMockCell = <TData, TValue>(
  id: string,
  value: TValue,
  column: Partial<Column<TData, TValue>>
): Partial<
  Pick<Cell<TData, TValue>, "id" | "column" | "getContext" | "getValue">
> => ({
  id,
  column: column as Column<TData, TValue>,
  getContext: vi.fn().mockReturnValue({
    getValue: () => value,
    column,
    row: {},
    table: {},
  }),
  getValue: vi.fn().mockReturnValue(value),
});

const createMockRow = <TData,>(
  data: TData
): Partial<Pick<Row<TData>, "id" | "original" | "getVisibleCells">> => {
  const column1 = createMockColumn("column1", "left", "100px");
  const column2 = createMockColumn("column2", "right", "200px");

  return {
    id: "row1",
    original: data,
    getVisibleCells: vi
      .fn()
      .mockReturnValue([
        createMockCell("cell1", "Value 1", column1),
        createMockCell("cell2", "Value 2", column2),
      ]),
  };
};

const mockRow = createMockRow({ id: 1, name: "John Doe" });

const renderComponent = (props?: Partial<TableRowProps<TData>>) =>
  render(
    <table>
      <thead>
        <TableRow<TData> row={mockRow as Row<TData>} {...props} />
      </thead>
    </table>
  );

describe("TableRow Component", () => {
  it("renders each cell with the correct text alignment", () => {
    renderComponent();

    const cell1 = screen.getByText("Value 1").closest("td");
    const cell2 = screen.getByText("Value 2").closest("td");

    expect(cell1).toHaveStyle("text-align: left");
    expect(cell2).toHaveStyle("text-align: right");
  });

  it("applies correct width to each cell", () => {
    renderComponent();

    const cell1 = screen.getByText("Value 1").closest("td");
    const cell2 = screen.getByText("Value 2").closest("td");

    expect(cell1).toHaveStyle("width: 100px");
    expect(cell2).toHaveStyle("width: 200px");
  });
});
