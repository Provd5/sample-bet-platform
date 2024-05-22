import type { FC } from "react";

export const TableHeader: FC = ({}) => {
  return (
    <div className="w-full pt-3 pb-0.5 px-2">
      <div className="flex text-sm text-gray-500 justify-between max-w-3xl mx-auto">
        <p className="px-1">Miejsce</p>
        <div className="flex items-center">
          <p className="px-1">Dokładne wyniki</p>
          <p className="w-10 px-1 text-center">Pkt.</p>
        </div>
      </div>
    </div>
  );
};
