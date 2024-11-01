import { Option } from "../../../types/react-table";

interface TableFilterProps {
  selectedOption: Option | null;
  selectOptions: Option[];
  selectPlaceholder: string;
  handleColumnFilterChange: (option: Option | null) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  selectedOption,
  selectOptions,
  selectPlaceholder,
  handleColumnFilterChange,
}) => {
  return (
    <div className="mt-4 mb-4">
      <select
        className="w-full max-w-xs p-2 text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedOption?.value || ""}
        onChange={(e) => {
          const selectedOption = selectOptions.find(
            (option) => option.value === e.target.value
          );
          handleColumnFilterChange(selectedOption || null);
        }}
      >
        <option value="">{selectPlaceholder}</option>
        {selectOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilter;
