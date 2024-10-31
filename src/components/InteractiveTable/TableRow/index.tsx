import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import { TableCellStyled, TableRowStyled } from "../tableBaseStyles";
import { ColumnMetaOptions, TableRowProps } from "../../../types/react-table";

const TableRow = <TData,>({ row }: TableRowProps<TData>) => {
  return (
    <TableRowStyled key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const meta = cell.column.columnDef.meta as ColumnMetaOptions;
        return (
          <TableCellStyled
            key={cell.id}
            className={classNames("table-cell")}
            style={{
              width: cell.column.getSize(),
              textAlign: meta.textAlign || "inherit",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCellStyled>
        );
      })}
    </TableRowStyled>
  );
};

export default TableRow;
