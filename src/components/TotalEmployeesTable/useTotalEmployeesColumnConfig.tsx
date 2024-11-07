import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeeData } from "../../types/react-table";

const useTotalEmployeesColumnConfig = (data: EmployeeData[]) => {
  const totalHoursWorked = useMemo(() => {
    if (!data) return 0;
    return data.reduce((total, curr) => total + curr.hoursWorkedThisMonth, 0);
  }, [data]);

  const columns: ColumnDef<EmployeeData>[] = useMemo(
    () => [
      {
        accessorKey: "employeeId",
        displayName: "Employee ID",
        minSize: 220,
        maxSize: 250,
        header: () => <span>Employee ID</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Employee ID",
      },
      {
        accessorKey: "employeeName",
        displayName: "Employee",
        minSize: 220,
        maxSize: 250,
        header: () => <span>Employee</span>,
        cell: (info) => (
          <span>
            <a href={`/employees/profile/${info.row.original.employeeName}`}>
              {info.getValue() as string}
            </a>
          </span>
        ),
        footer: () => "Employee",
      },
      {
        accessorKey: "department",
        displayName: "Department",
        maxSize: 350,
        header: () => <span>Department</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Department",
      },
      {
        accessorKey: "hoursWorkedThisMonth",
        displayName: "Hours Worked",
        meta: {
          textAlign: "right",
          flexJustify: "end",
        },
        maxSize: 140,
        header: () => (
          <span>
            <div className="flex flex-col items-end">
              <span className="text-left">Hours Worked This Month</span>
            </div>
          </span>
        ),
        cell: (info) => <span>{info.getValue() as number}</span>,
        footer: () => "Total Views",
      },
      {
        accessorKey: "jobTitle",
        displayName: "Job Title",
        maxSize: 350,
        header: () => <span>Job Title</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Job Title",
      },
      {
        accessorKey: "lastPromotionDate",
        displayName: "Last Promotion Date",
        maxSize: 350,
        meta: {
          textAlign: "right",
          flexJustify: "end",
        },
        header: () => <span>Last Promotion Date</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Last Promotion Date",
      },
      {
        accessorKey: "performanceRating",
        displayName: "Performance Rating",
        maxSize: 350,
        header: () => <span>Performance Rating</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Performance Rating",
      },
      {
        accessorKey: "projectsCompleted",
        displayName: "Projects Completed",
        maxSize: 350,
        header: () => <span>Projects Completed</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        footer: () => "Projects Completed",
      },
    ],
    [totalHoursWorked]
  );

  return { columns };
};

export default useTotalEmployeesColumnConfig;
