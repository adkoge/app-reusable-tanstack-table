import { PaginationStyled } from "../tableBaseStyles";

type PaginationTextProps = {
  pageIndex: number;
  pageCount: number;
};

const PaginationText = ({ pageIndex, pageCount }: PaginationTextProps) => {
  return (
    <PaginationStyled>
      Showing {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
    </PaginationStyled>
  );
};

export default PaginationText;
