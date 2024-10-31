import TableHeaderRow from "./TableHeaderRow";
import { TableHeaderProps } from "../../../types/react-table";

const TableHeader = <TData,>({ headerGroups }: TableHeaderProps<TData>) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
    ))}
  </thead>
);

export default TableHeader;
