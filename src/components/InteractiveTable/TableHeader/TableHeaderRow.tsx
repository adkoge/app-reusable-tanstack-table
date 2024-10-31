import HeaderCell from "./HeaderCell";
import { TableHeaderRowStyled } from "../tableBaseStyles";
import { TableHeaderRowProps } from "../../../types/react-table";

const TableHeaderRow = <TData,>({
  headerGroup,
}: TableHeaderRowProps<TData>) => (
  <TableHeaderRowStyled>
    {headerGroup.headers.map((header) => (
      <HeaderCell key={header.id} header={header} />
    ))}
  </TableHeaderRowStyled>
);

export default TableHeaderRow;
