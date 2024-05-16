import type { FC } from "react";

import { DataLoadError } from "./data-load-error";
import { RefreshButton } from "./refresh-button";

interface DataTableProps {
  children: React.ReactNode;
  isData: boolean;
}

export const DataTable: FC<DataTableProps> = ({ children, isData }) => {
  return (
    <div className="py-12 flex-col flex items-center">
      {!isData ? (
        <DataLoadError />
      ) : (
        <div className="flex flex-col gap-12 w-full">
          <RefreshButton />
          <div className="flex flex-col divide-y divide-y-gray-500/10 w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
