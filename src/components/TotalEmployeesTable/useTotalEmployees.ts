import { useEffect, useState } from "react";
import { employeeData } from "./data";
import { userView as userViewMode } from "../../config/viewModes";

const useTotalEmployees = ({ viewLevel = userViewMode.ME }) => {
  const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
  const [departmentOptions, setDepartmentOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (employeeData.length === 0) return;

    const departmentMap: Record<string, number> = {};
    employeeData.forEach((employee) => {
      departmentMap[employee.department] = employee.departmentId;
    });

    const uniqueCompanies = Object.entries(departmentMap)
      .map(([department, departmentId]) => ({
        label: department,
        value: String(departmentId),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setDepartmentOptions(uniqueCompanies);

    const uniqueEmployeeIds = new Set(
      employeeData.map((item) => item.employeeId)
    );
    setTotalEmployeesCount(uniqueEmployeeIds.size);
  }, []);

  return {
    data: employeeData,
    count: totalEmployeesCount,
    options: departmentOptions,
  };

  // Replace with actual API query in the future
  // let query = "";

  // switch (viewType) {
  //   case userView.ME:
  //     query = "MY_PROPERTIES_QUERY";
  //     break;
  //   case userView.COMPANY:
  //     query = "COMPANY_PROPERTIES_QUERY";
  //     break;
  //   case userView.ADMIN:
  //     query = "ADMIN_PROPERTIES_QUERY";
  //     break;
  //   default:
  //     query = "MY_PROPERTIES_QUERY";
  // }

  // Static data return for now
};

export default useTotalEmployees;
