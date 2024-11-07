import { useState, useEffect, useMemo } from "react";
import InteractiveTable from "../InteractiveTable";
import Search from "../InteractiveTable/Search";
import useTotalEmployeesColumnConfig from "./useTotalEmployeesColumnConfig";
import useTotalEmployees from "./useTotalEmployees";
import { dataView, userView as userViewMode } from "../../config/viewModes";
import { Option, EmployeeData } from "../../types/react-table";
import { ColumnFilter } from "@tanstack/react-table";
import { renderTitle } from "../InteractiveTable/tableHelpers";

const TotalEmployeesTable = ({ userView = userViewMode.ME }) => {
  // Data Fetching
  const { data, count, options } = useTotalEmployees({ viewLevel: userView });

  // Table Config
  const countKey = "hoursWorkedThisMonth";
  const { columns } = useTotalEmployeesColumnConfig(data as EmployeeData[]);
  const selectPlaceholder = "Select a department";

  const [columnOrder, setColumnOrder] = useState<string[]>([
    "employeeName",
    "employeeId",
    "department",
    "jobTitle",
    "performanceRating",
    "projectsCompleted",
    "hoursWorkedThisMonth",
    "lastPromotionDate",
  ]);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const handleSelectChange = (option: Option | null) => {
    setGlobalFilter("");

    if (!option) {
      setSelectedOption(null);
      setColumnFilters([{ id: "department", value: "" }]);
      return;
    }

    setSelectedOption(option);
    setColumnFilters([{ id: "department", value: option.label }]);
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: dataView.LIST ? 50 : 10,
    pageCount: 0,
  });

  const baseColumnVisibility = {
    employeeName: true,
    employeeId: false,
    department: true,
    jobTitle: true,
    hoursWorkedThisMonth: true,
    projectsCompleted: false,
    performanceRating: false,
    lastPromotionDate: false,
  };

  const companyColumnVisibility = {
    projectsCompleted: true,
    performanceRating: true,
    lastPromotionDate: true,
  };

  const adminColumnVisibility = {
    employeeId: true,
  };

  const mergedColumnVisibility = useMemo(() => {
    return {
      ...baseColumnVisibility,
      ...(userView === userViewMode.COMPANY && companyColumnVisibility),
      ...(userView === userViewMode.ADMIN && adminColumnVisibility),
    };
  }, [userView]);

  const [columnVisibility, setColumnVisibility] = useState(
    mergedColumnVisibility
  );

  useEffect(() => {
    setColumnVisibility(mergedColumnVisibility);
  }, [mergedColumnVisibility]);

  const customConfiguration = {
    columns: columns || [],
    data: data || [],
    initialState: {
      sorting: [
        {
          id: "performanceRating",
          desc: true,
        },
      ],
    },
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setSelectedOption,
    handleGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters: columnFilters || [],
      columnOrder,
      columnVisibility: columnVisibility,
      globalFilter,
      pagination,
    },
  };

  if (!data || !columns) return null;

  const selectConfig = {
    handleSelectChange: handleSelectChange,
    selectedOption: selectedOption,
    selectOptions: options,
    selectPlaceholder: selectPlaceholder,
    showSelect: true,
  };

  const pageSize = pagination.pageSize ?? 10;
  const tooltipText = "Total number of employees";

  return (
    <div>
      <h1>Total Employees Table</h1>
      <InteractiveTable
        count={count}
        countKey={countKey}
        countTitle="Total Hours Worked"
        customConfiguration={customConfiguration}
        enableSearch
        footerInfo={null}
        globalFilter={globalFilter}
        handleColumnFilterChange={handleSelectChange}
        handleGlobalFilterChange={setGlobalFilter}
        icon={null}
        paginationConfig={pagination}
        pageSize={pageSize}
        selectConfig={selectConfig}
        TableSearch={(props) => <Search {...props} debounce={300} />}
        tableView="table"
        title={renderTitle(userView)}
        tooltipText={tooltipText}
        viewLevel={userView}
      />
    </div>
  );
};

export default TotalEmployeesTable;
