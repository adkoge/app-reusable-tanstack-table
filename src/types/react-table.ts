import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  ColumnResizeMode,
  HeaderGroup,
  Header,
  OnChangeFn,
  Row,
  Table,
} from "@tanstack/react-table";

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

export interface Option {
  label: string;
  value: string;
}

type Meta = Record<string, unknown>;

export type TableConfig<T extends object> = {
  columnResizeMode?: ColumnResizeMode;
  columns: ColumnDef<T>[];
  data: T[];
  debugTable?: boolean;
  defaultColumn?: {
    minSize: number;
    maxSize: number;
  };
  filterFns?: {
    fuzzy: (
      row: Row<T>,
      columnId: string,
      value: string,
      addMeta: (meta: Meta) => void
    ) => boolean;
  };
  handleGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>;
  initialState: {
    sorting: { id: string; desc: boolean }[];
    columnVisibility?: {
      [key: string]: boolean;
    };
  };
  state: {
    columnFilters: ColumnFilter[];
    columnOrder: string[];
    columnVisibility?: {
      [key: string]: boolean;
    };
    globalFilter: string;
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
  };
  sortDescFirst?: boolean;
};

export type TableProps<T extends object> = {
  count: number;
  countKey: keyof T;
  countTitle: string;
  customConfiguration?: TableConfig<T>;
  enableSearch: boolean;
  filteredRowCount?: number;
  footerInfo?: {
    link: string;
    text: string;
  } | null;
  globalFilter: string;
  handleColumnFilterChange?: (filterValue: Option | null) => void;
  handleGlobalFilterChange?: (filterValue: string) => void;
  icon: React.ReactNode;
  onColumnOrderChange?: React.Dispatch<React.SetStateAction<string[]>>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onPaginationChange?: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  selectConfig: {
    handleSelectChange?: (option: Option) => void;
    selectedOption: Option | null;
    selectOptions: Option[];
    selectPlaceholder: string;
    showSelect: boolean;
  };
  pageSize?: number;
  paginationConfig?: {
    pageCount: number;
    pageIndex: number;
  };
  table?: Table<T>;
  TableSearch: (props: TableSearchProps) => JSX.Element;
  title: string;
  tooltipText?: string;
  tableView: string;
  viewLevel: string;
};

export interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
}
