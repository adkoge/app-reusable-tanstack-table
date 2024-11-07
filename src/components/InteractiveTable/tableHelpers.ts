import { Row } from "@tanstack/react-table";
import { userView } from "../../config/viewModes";

type CalculateCountProps<TData> = {
  rows: Row<TData>[];
  key: keyof TData;
};

export const calculateCount = <TData>({
  rows,
  key,
}: CalculateCountProps<TData>): number | undefined => {
  if (!rows || !key) return;

  return rows.reduce((total, row) => {
    return total + (row.getValue(key as string) as number);
  }, 0);
};

export const renderTitle = (view: string) => {
  switch (view) {
    case userView.ADMIN:
      return "Admin Table View";
    case userView.COMPANY:
      return "Company Table View";
    case userView.ME:
      return "My Table View";
    default:
      return "My Table View";
  }
};
