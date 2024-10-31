import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import { ColumnMetaOptions, TableRowProps } from "../../../types/react-table";

const TableRow = <TData,>({ row }: TableRowProps<TData>) => {
  return (
    <tr className="border-b border-gray-300 w-full" key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const meta = cell.column.columnDef.meta as ColumnMetaOptions;
        return (
          <td
            key={cell.id}
            className={classNames("whitespace-nowrap", {
              "pr-6": !cell.column.getIsLastColumn,
            })}
            style={{
              width: cell.column.getSize(),
              textAlign: meta.textAlign || "inherit",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
