import { useEffect, useState } from "react";
import { employeeData } from "./data";
// import { userView as userViewMode } from "../../config/viewModes";

// const useTotalEmployees = ({ viewLevel = userViewMode.ME }) => {
const useTotalEmployees = () => {
  const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
  const [departmentOptions, setDepartmentOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // let query = "";

  // switch (viewLevel) {
  //   case userViewMode.ME:
  //     query = "MY_QUERY";
  //     break;
  //   case userViewMode.COMPANY:
  //     query = "COMPANY_QUERY";
  //     break;
  //   case userViewMode.ADMIN:
  //     query = "ADMIN_QUERY";
  //     break;
  //   default:
  //     query = "MY_QUERY";
  // }

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

  // Replace with actual API query in the future

  return {
    data: employeeData,
    count: totalEmployeesCount,
    options: departmentOptions,
  };
};

export default useTotalEmployees;
