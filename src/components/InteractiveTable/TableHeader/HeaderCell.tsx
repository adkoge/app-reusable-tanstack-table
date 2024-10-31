import classNames from "classnames";
import { flexRender, Header } from "@tanstack/react-table";
import ArrowUpIcon from "../../../icons/ArrowUpIcon";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import { ColumnMetaOptions, HeaderCellProps } from "../../../types/react-table";

const getCellMeta = <TData,>(header: Header<TData, unknown>) => {
  const meta: ColumnMetaOptions = header.column.columnDef.meta || {};
  return {
    flexJustify: meta.flexJustify || "inherit",
    textAlign: meta.textAlign || "inherit",
  };
};

const HeaderCell = <TData,>({ header }: HeaderCellProps<TData>) => {
  const { flexJustify, textAlign } = getCellMeta(header);

  return (
    <th className="pr-6 last:pr-0" style={{ width: header.column.getSize() }}>
      <div
        className={classNames("align-items-center", {
          "cursor-pointer select-none": header.column.getCanSort(),
        })}
        style={{
          display: "flex",
          justifyContent: flexJustify,
          textAlign: textAlign,
          whiteSpace: "nowrap",
        }}
        onClick={header.column.getToggleSortingHandler()}
      >
        {header.column.getIsSorted() && (
          <span className="self-start mr-[7.5px]">
            {header.column.getIsSorted() === "asc" ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
          </span>
        )}
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </th>
  );
};

export default HeaderCell;
