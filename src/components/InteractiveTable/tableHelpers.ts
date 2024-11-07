import { Row } from "@tanstack/react-table";

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
