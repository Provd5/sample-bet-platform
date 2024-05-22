import type { FC } from "react";

import { cn } from "~/lib/utils";

import { DataTable } from "../data-table";
import { TableHeader } from "../table-header";

interface TableLoaderProps {
  variant: "games" | "results";
}

export const TableLoader: FC<TableLoaderProps> = ({ variant }) => {
  return (
    <DataTable isData>
      {variant === "results" && <TableHeader />}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`TableLoader-${i}`}
          className={cn(
            "w-full flex items-center justify-center",
            variant === "games" ? "h-[83px]" : "h-[53px]"
          )}
        >
          <div
            className={cn(
              "w-full flex items-center justify-center bg-slate-300 dark:bg-slate-800 animate-pulse",
              variant === "games" ? "h-[55px]" : "h-[24px]"
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        </div>
      ))}
    </DataTable>
  );
};
