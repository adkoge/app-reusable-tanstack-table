import TableHeaderRow from "./TableHeaderRow";
import { TableHeadStyled } from "../tableBaseStyles";
import { TableHeaderProps } from "../../../types/react-table";

const TableHeader = <TData,>({ headerGroups }: TableHeaderProps<TData>) => (
  <TableHeadStyled>
    {headerGroups.map((headerGroup) => (
      <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
    ))}
  </TableHeadStyled>
);

export default TableHeader;
