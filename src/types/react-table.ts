import { Header, HeaderGroup, Row } from "@tanstack/react-table";

export interface ColumnMetaOptions {
  flexJustify?: "center" | "start" | "end" | "inherit";
  textAlign?: "center" | "left" | "right" | "inherit";
}

export interface TableBodyRowProps<TData> {
  row: Row<TData>;
}

export interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

export interface TableHeaderRowProps<TData> {
  headerGroup: HeaderGroup<TData>;
}

export interface HeaderCellProps<TData> {
  header: Header<TData, unknown>;
}

export interface TableRowProps<TData> {
  row: Row<TData>;
}
