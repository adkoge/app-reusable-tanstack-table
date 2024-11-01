type PaginationTextProps = {
  pageIndex: number;
  pageCount: number;
};

const PaginationText = ({ pageIndex, pageCount }: PaginationTextProps) => {
  return (
    <div className="text-gray-400 text-xs font-normal mb-0">
      Showing {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
    </div>
  );
};

export default PaginationText;
