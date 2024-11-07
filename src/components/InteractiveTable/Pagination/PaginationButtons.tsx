import CaretDoubleRightIcon from "../../../icons/CaretDoubleRightIcon";
import CaretDoubleLeftIcon from "../../../icons/CaretDoubleLeftIcon";
import CaretLeftIcon from "../../../icons/CaretLeftIcon";
import CaretRightIcon from "../../../icons/CaretRightIcon";

interface PaginationButtonProps {
  onFirstPageClick: () => void;
  onLastPageClick: () => void;
  onNextPageClick: () => void;
  onPreviousPageClick: () => void;
  onPageClick: (pageIndex: number) => void;
  getCanPreviousPage: boolean;
  getCanNextPage: boolean;
  pageCount: number;
  pageIndex: number;
}

export default function InteractiveTablePagination({
  onFirstPageClick,
  onLastPageClick,
  onNextPageClick,
  onPreviousPageClick,
  onPageClick,
  getCanPreviousPage,
  getCanNextPage,
  pageCount,
  pageIndex,
}: PaginationButtonProps) {
  const maxVisiblePages = 5;
  const currentGroup = Math.floor(pageIndex / maxVisiblePages);
  const startPage = currentGroup * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    for (let index = startPage; index <= endPage; index++) {
      pages.push(
        <button
          key={index}
          onClick={() => onPageClick(index - 1)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            pageIndex === index - 1
              ? "bg-indigo-600 text-white"
              : "text-gray-900 hover:bg-gray-50"
          } ring-1 ring-inset ring-gray-300`}
        >
          {index}
        </button>
      );
    }

    return pages;
  };

  const handleNextGroup = () => {
    const firstPageOfNextGroup = Math.min(endPage + 1, pageCount - 1);
    onPageClick(firstPageOfNextGroup - 1);
  };

  const handlePreviousGroup = () => {
    const lastPageOfCurrentGroup = Math.max(startPage - 1, 0);
    onPageClick(lastPageOfCurrentGroup - 1);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={onFirstPageClick}
            disabled={!getCanPreviousPage}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !getCanPreviousPage
                ? "cursor-not-allowed text-gray-300"
                : "text-blue-500"
            }`}
          >
            <CaretDoubleLeftIcon
              color={!getCanPreviousPage ? "text-gray-300" : "text-blue-500"}
            />
          </button>
          <button
            onClick={onPreviousPageClick}
            disabled={!getCanPreviousPage}
            className={`ml-3 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !getCanPreviousPage
                ? "cursor-not-allowed text-gray-300"
                : "text-blue-500"
            }`}
          >
            <CaretLeftIcon
              color={!getCanPreviousPage ? "text-gray-300" : "text-blue-500"}
              label="Go To Previous Page"
            />
          </button>
          <button
            onClick={onNextPageClick}
            disabled={!getCanNextPage}
            className={`ml-3 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !getCanNextPage
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-900"
            }`}
          >
            <CaretRightIcon
              color={!getCanNextPage ? "text-gray-300" : "text-gray-900"}
              label="Go To Next Page"
            />
          </button>
          <button
            onClick={onLastPageClick}
            disabled={!getCanNextPage}
            className={`ml-3 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !getCanNextPage
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-900"
            }`}
          >
            <CaretDoubleRightIcon
              color={!getCanNextPage ? "text-gray-300" : "text-gray-900"}
            />
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={onFirstPageClick}
              disabled={!getCanPreviousPage}
              aria-label="Go to First Page"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">First</span>
              <CaretLeftIcon aria-hidden="true" />
            </button>
            <button
              onClick={handlePreviousGroup}
              disabled={startPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              Previous
            </button>

            {renderPageNumbers()}

            <button
              onClick={handleNextGroup}
              disabled={endPage === pageCount}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              Next
            </button>
            <button
              onClick={onLastPageClick}
              disabled={!getCanNextPage}
              aria-label="Go to Last Page"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Last</span>
              <CaretRightIcon aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
