import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import { calculateCount } from "./tableHelpers";
import TableView from "./Views/TableView";
import { FuzzyFilterMeta, TableProps } from "../../types/react-table";

const fuzzyFilter = <TData,>(
  row: Row<TData>,
  columnId: string,
  value: string,
  addMeta: (meta: FuzzyFilterMeta) => void
) => {
  const rowValue = row.getValue(columnId);

  if (typeof rowValue === "string") {
    const itemRank = rowValue.toLowerCase().includes(value.toLowerCase());
    addMeta({ itemRank });
    return itemRank;
  }

  return false;
};

const baseTableConfiguration = {
  columns: [],
  data: [],
  debugTable: false, // Change to true when testing
  defaultColumn: {
    minSize: 50,
    maxSize: 400,
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  globalFilterFn: fuzzyFilter,
  sortDescFirst: true,
};

const Table = <T extends object>({
  countKey,
  countTitle,
  enableSearch,
  footerInfo,
  globalFilter,
  handleColumnFilterChange = () => {},
  handleGlobalFilterChange = () => {},
  icon,
  selectConfig,
  paginationConfig,
  customConfiguration,
  TableSearch,
  title,
  tableView = "table",
  viewLevel,
}: TableProps<T>) => {
  const mergedTableConfig = {
    ...baseTableConfiguration,
    ...customConfiguration,
  };

  const table = useReactTable({
    ...mergedTableConfig,
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const filteredRowCount =
    calculateCount({
      rows: table.getFilteredRowModel().rows,
      key: countKey,
    }) || 0;

  return (
    <TableView
      count={filteredRowCount}
      countKey={countKey}
      countTitle={countTitle}
      enableSearch={enableSearch}
      filteredRowCount={filteredRowCount}
      footerInfo={footerInfo}
      globalFilter={globalFilter}
      handleColumnFilterChange={handleColumnFilterChange}
      handleGlobalFilterChange={handleGlobalFilterChange}
      onColumnOrderChange={() => {}}
      onPaginationChange={() => {}}
      icon={icon}
      paginationConfig={
        paginationConfig
          ? { ...paginationConfig, pageIndex, pageCount }
          : undefined
      }
      selectConfig={selectConfig}
      table={table}
      TableSearch={TableSearch}
      title={title}
      tableView={tableView}
      viewLevel={viewLevel}
    />
  );
};

export default Table;
