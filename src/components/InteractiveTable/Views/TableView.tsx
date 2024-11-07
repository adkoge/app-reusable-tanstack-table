import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import PaginationText from "../Pagination/PaginationText";
import PaginationButtons from "../Pagination/PaginationButtons";
import Filter from "../Filter";
import { TableProps } from "../../../types/react-table";

const TableView = <TData extends object>({
  countTitle,
  filteredRowCount,
  footerInfo,
  handleColumnFilterChange = () => {},
  handleGlobalFilterChange = () => {},
  paginationConfig,
  selectConfig,
  table,
  TableSearch,
  title,
  enableSearch = true,
}: TableProps<TData>) => {
  if (!table) return null;

  const pageIndex = paginationConfig?.pageIndex;
  const pageCount = paginationConfig?.pageCount;

  return (
    <div className="flex flex-col">
      <h1 className="my-3">{title}</h1>
      {enableSearch && (
        <TableSearch
          value={table.getState().globalFilter || ""}
          onChange={handleGlobalFilterChange}
        />
      )}

      {selectConfig?.showSelect && (
        <Filter
          selectOptions={selectConfig?.selectOptions}
          selectedOption={selectConfig?.selectedOption}
          selectPlaceholder={selectConfig?.selectPlaceholder}
          handleColumnFilterChange={handleColumnFilterChange}
        />
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-y-2 mt-4 mb-4 gap-x-4 text-gray-400 text-sm">
        <div>
          {filteredRowCount} {countTitle}
        </div>
        {footerInfo ? (
          <a href={footerInfo.link} className="text-blue-500">
            {footerInfo.text}
          </a>
        ) : null}

        {pageIndex !== undefined && pageCount !== undefined && (
          <>
            <PaginationText pageIndex={pageIndex} pageCount={pageCount} />
            <PaginationButtons
              pageIndex={pageIndex}
              pageCount={pageCount}
              onFirstPageClick={() => table.setPageIndex(0)}
              onLastPageClick={() => table.setPageIndex(pageCount - 1)}
              onNextPageClick={() => table.nextPage()}
              onPreviousPageClick={() => table.previousPage()}
              getCanPreviousPage={table.getCanPreviousPage()}
              getCanNextPage={table.getCanNextPage()}
              onPageClick={(page: number) => {
                table.setPageIndex(page);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TableView;
