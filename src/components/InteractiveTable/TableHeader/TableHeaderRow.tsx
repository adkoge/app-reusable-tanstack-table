import HeaderCell from "./HeaderCell";
import { TableHeaderRowProps } from "../../../types/react-table";

const TableHeaderRow = <TData,>({
  headerGroup,
}: TableHeaderRowProps<TData>) => (
  <tr className="border-b border-gray-300 w-full">
    {headerGroup.headers.map((header) => (
      <HeaderCell key={header.id} header={header} />
    ))}
  </tr>
);

export default TableHeaderRow;
