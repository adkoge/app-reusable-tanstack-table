import { Option } from "../../../types/react-table";
import { SelectContainer, StyledSelect } from "../tableBaseStyles";

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
    <SelectContainer>
      <StyledSelect
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
      </StyledSelect>
    </SelectContainer>
  );
};

export default TableFilter;
