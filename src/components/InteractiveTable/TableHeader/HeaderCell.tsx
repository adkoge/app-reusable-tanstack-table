import classNames from "classnames";
import { flexRender, Header } from "@tanstack/react-table";
import { OrderIconWrapperStyled, TableHeaderStyled } from "../tableBaseStyles";
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
    <TableHeaderStyled style={{ width: header.column.getSize() }}>
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
          <OrderIconWrapperStyled>
            {header.column.getIsSorted() === "asc" ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
          </OrderIconWrapperStyled>
        )}
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </TableHeaderStyled>
  );
};

export default HeaderCell;
